import { ApiResponse } from "../utilities/ApiResponse.js";
import logger from "../logger/logger.js";
import { addProductData, checkProductExist, updateProductData, deleteProductData, getProductsData } from "../services/product.services.js";
import { sequelize } from "../config/dbConnection.js";
import { ApiError } from "../utilities/ApiError.js";

export const addProduct = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            productName,
            productDesc,
            sku,
            productPrice,
            productDiscountPrcentage,
            productStock,
            categoryId,
            brandId,
            status
        } = req.body;

        const { id: userId } = req.user;

        const productDetails = {
            productName,
            productDesc,
            sku,
            productPrice,
            productDiscountPrcentage,
            productStock,
            categoryId,
            brandId,
            status,
            sellerId: userId
        };

        logger.info("Adding product...");
        await addProductData(productDetails, transaction);

        await transaction.commit();

        return res
            .status(200)
            .json(new ApiResponse(200, "Product added successfully"));
    } catch (error) {
        await transaction.rollback();
        logger.error(`Error in addProduct: ${error}`);
        next(error);
    }
};


export const updateProduct = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            productId,
            productName,
            productDesc,
            sku,
            productPrice,
            productDiscountPrcentage,
            productStock,
            categoryId,
            brandId,
            status
        } = req.body;

        if (!productId) {
            // invalid input
            throw new ApiError("productId is required");
        }

        // check existence first
        await checkProductExist(productId);

        const productDetails = {
            productId,
            productName,
            productDesc,
            sku,
            productPrice,
            productDiscountPrcentage,
            productStock,
            categoryId,
            brandId,
            status
        };

        logger.info("Updating product...");
        await updateProductData(productDetails, transaction);

        await transaction.commit();

        return res
            .status(200)
            .json(new ApiResponse(200, "Product updated successfully"));
    } catch (error) {
        await transaction.rollback();
        logger.error(`Error in updateProduct: ${error}`);
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { productId } = req.query;

        if (!productId) {
            logger.error("productId is required");
            throw new ApiError(400, "productId is required");
        }

        // ensure product exists
        logger.info("Checking if product exists...");
        await checkProductExist(productId);

        logger.info("Deleting product...");
        await deleteProductData(productId, transaction);

        logger.info("Product deleted successfully");
        await transaction.commit();

        return res
            .status(200)
            .json(new ApiResponse(200, "Product deleted successfully"));
    } catch (error) {
        await transaction.rollback();
        logger.error(`Error in deleteProduct: ${error}`);
        next(error);
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = null } = req.query;

        const result = await getProductsData({ page, limit, search });

        return res.status(200).json(new ApiResponse(200, result, "Products fetched successfully"));
    } catch (error) {
        logger.error(`Error in getProduct: ${error}`);
        next(error);
    }
}
