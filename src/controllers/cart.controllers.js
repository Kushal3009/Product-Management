import logger from "../logger/logger.js"
import { addProductToCart, removeProductFromCart } from "../services/cart.services.js";
import { ApiResponse } from "../utilities/ApiResponse.js"

export const addToCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const { id: userId } = req.user;

        // Logic to add the product to the user's cart
        logger.info(`Adding product ${productId} to cart for user ${userId}`);
        await addProductToCart(userId, productId);

        return res.status(200).json(new ApiResponse(200, "Product added to cart successfully"));
    } catch (error) {
        logger.error(`Error at addToCart: ${error.message}`);
        next(error);
    }
}


export const getCartData = async (req, res, next) => {
    try {
        const { id: userId } = req.user;

        // Logic to retrieve the user's cart data
        logger.info(`Retrieving cart data for user ${userId}`);
        const cartData = await getCartDataForUser(userId); // Assume this function is defined elsewhere

        if (!cartData) {
            logger.warn(`No cart data found for user ${userId}`);
            return res.status(200).json(new ApiResponse(200, {}, "No cart data found"));
        }

        return res.status(200).json(new ApiResponse(200, cartData, "Cart data retrieved successfully"));
    } catch (error) {
        logger.error(`Error at getCartData: ${error.message}`);
        next(error);
    }
}


export const removeFromCart = async (req, res, next) => {
    try {
        const { cartId } = req.query;
        const { id: userId } = req.user;

        // Logic to remove the product from the user's cart
        logger.info(`Removing product ${cartId} from cart for user ${userId}`);
        await removeProductFromCart(userId, cartId); // Assume this function is defined elsewhere

        return res.status(200).json(new ApiResponse(200, "Product removed from cart successfully"));
    } catch (error) {
        logger.error(`Error at removeFromCart: ${error.message}`);
        next(error);
    }
}