import { ApiError } from '../utilities/ApiError.js';

export const validate = (schema) => (req, res, next) => {
    const data = { ...req.query, ...req.body }; // merge both
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new ApiError(400, errorMessages.join(", "));
    }
    next();
};
