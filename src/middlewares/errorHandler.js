import logger from "../logger/logger.js";
import { ApiError } from "../utilities/ApiError.js"; // Import ApiError

const errorHandler = (err, req, res, next) => {
    // If the error is not an instance of ApiError, convert it
    if (!(err instanceof ApiError)) {
        err = new ApiError(500, err.message || "Internal Server Error", err);
    }
    const statusCode = err.statusCode;
    const message = err.message;
    const stack = err.stack || null;
    const user = req.user?.branch_code
        ? `${req.user.branch_code}-${req.user.user_type?.toUpperCase?.() || ''}`
        : "anonymous";

    logger.error(
        `${req.method} ${req.originalUrl} → ${statusCode} :: ${message} :: user=${user}${stack ? ` :: stack=${stack}` : ''}`
    );

    return res.status(statusCode).json({
        status: statusCode,
        message,
        data: null,
        error: {
            name: err.name,
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
    });
};

export { errorHandler };
