import logger from "../logger/logger.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ProductImage from "../models/productImage.model.js";
import { ApiError } from "../utilities/ApiError.js";

export const addProductToCart = async (userId, productId) => {
    try {
        if (!userId || !productId) {
            logger.error("User ID or Product ID is missing");
            throw new ApiError(400, "User ID and Product ID are required");
        }

        // Check if already in cart
        const existingItem = await Cart.findOne({
            where: { user_id: userId, product_id: productId },
        });

        if (existingItem) {
            logger.warn(`Product ${productId} already exists in cart for user ${userId}`);
            throw new ApiError(400, "Product already in cart");
        }

        // Add product to cart
        await Cart.create({ product_id: productId, user_id: userId });
        logger.info(`Product ${productId} added to cart for user ${userId}`);
    } catch (error) {
        logger.error(`Error at addProductToCart: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};


export const getUserCart = async (userId) => {
    try {
        if (!userId) throw new ApiError(400, "Something went wrong");

        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    attributes: [
                        "product_id",
                        "product_name",
                        "product_price",
                    ],
                    include: [
                        {
                            model: ProductImage,
                            attributes: ["image_id", "image_url", "is_primary"],
                            where: { is_primary: true }, // only primary image
                            required: false // if no primary image, still return product
                        }
                    ]
                }
            ]
        });

        return cartItems;
    } catch (error) {
        logger.error(`Error at getUserCart: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};


export const removeProductFromCart = async (userId, cartId) => {
    try {
        if (!userId || !cartId) {
            logger.error("User ID or Product ID is missing");
            throw new ApiError(400, "Something went wrong");
        }

        const existingItem = await Cart.findOne({
            where: { user_id: userId, id: cartId },
        });

        if (!existingItem) {
            logger.warn(`Product ${cartId} not found in cart for user ${userId}`);
            throw new ApiError(404, "Product not found in cart");
        }

        await existingItem.destroy();
        logger.info(`Product ${cartId} removed from cart for user ${userId}`);
    } catch (error) {
        logger.error(`Error at removeProductFromCart: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};