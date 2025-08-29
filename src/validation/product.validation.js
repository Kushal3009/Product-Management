import Joi from "joi";

export const addProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discountPrcentage: Joi.number().min(0).max(100).default(0),
    stock: Joi.number().integer().min(0).required(),
    categoryId: Joi.number().required(),
    brandId: Joi.number().required(),
    status: Joi.string().valid('active', 'inactive').default('active'),
});

export const updateProductSchema = Joi.object({
    productId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discountPrcentage: Joi.number().min(0).max(100).default(0),
    stock: Joi.number().integer().min(0).required(),
    categoryId: Joi.number().required(),
    brandId: Joi.number().required(),
    status: Joi.string().valid('active', 'inactive').default('active'),
});

export const deleteProductSchema = Joi.object({
    productId: Joi.number().required(),
});
