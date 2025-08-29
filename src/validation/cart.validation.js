export const addCartProduct = Joi.object({
    productId: Joi.number().required()
});

export const removeCartProduct = Joi.object({
    productId: Joi.number().required()
});
