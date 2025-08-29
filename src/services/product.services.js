import logger from "../logger/logger.js"
import Product from "../models/product.model.js";
import { ApiError } from "../utilities/ApiError.js";
import { Op } from "sequelize";

export const addProductData = async (productDetails, transaction) => {
    try {
        const {
            productName: product_name,
            productDesc: product_desc,
            sku,
            productPrice: product_price,
            productDiscountPrcentage: product_discount_percentage,
            productStock: product_stock_quantity,
            categoryId: category_id,
            brandId: brand_id,
            status,
            sellerId: seller_id
        } = productDetails;

        await Product.create(
            {
                product_name,
                product_desc,
                sku,
                product_price,
                product_discount_percentage,
                product_stock_quantity,
                status,
                brand_id,
                category_id,
                seller_id
            },
            { transaction }
        );

        logger.info("✅ Product added successfully");
    } catch (error) {
        logger.error(`❌ Error in addProductData: ${error}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};


export const checkProductExist = async (productId) => {
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new ApiError(400, "Invalid productId");
        }
        return product;
    } catch (error) {
        logger.error(`Error in checkProductExist: ${error}`);
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};


export const updateProductData = async (productDetails, transaction) => {
    try {
        const {
            productId,
            productName: product_name,
            productDesc: product_desc,
            sku,
            productPrice: product_price,
            productDiscountPrcentage: product_discount_percentage,
            productStock: product_stock_quantity,
            categoryId: category_id,
            brandId: brand_id,
            status
        } = productDetails;

        const updatePayload = {};
        if (product_name !== undefined) updatePayload.product_name = product_name;
        if (product_desc !== undefined) updatePayload.product_desc = product_desc;
        if (sku !== undefined) updatePayload.sku = sku;
        if (product_price !== undefined) updatePayload.product_price = product_price;
        if (product_discount_percentage !== undefined) updatePayload.product_discount_percentage = product_discount_percentage;
        if (product_stock_quantity !== undefined) updatePayload.product_stock_quantity = product_stock_quantity;
        if (category_id !== undefined) updatePayload.category_id = category_id;
        if (brand_id !== undefined) updatePayload.brand_id = brand_id;
        if (status !== undefined) updatePayload.status = status;

        const [updatedCount] = await Product.update(updatePayload, {
            where: { product_id: productId },
            transaction
        });

        if (updatedCount === 0) {
            throw new ApiError(400, "Invalid productId or no changes provided");
        }

        logger.info("✅ Product updated successfully");
    } catch (error) {
        logger.error(`Error in updateProductData: ${error}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
}

export const deleteProductData = async (productId, transaction) => {
    try {
        const deletedCount = await Product.destroy({ where: { product_id: productId }, transaction });
        if (deletedCount === 0) {
            throw new ApiError(400, "Invalid productId or already deleted");
        }
        logger.info("✅ Product deleted successfully");
    } catch (error) {
        logger.error(`Error in deleteProductData: ${error}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};

export const getProductsData = async ({ page = 1, limit = 10, search = null }) => {
    try {
        const offset = (Number(page) - 1) * Number(limit);

        const where = {};
        if (search) {
            where[Op.or] = [
                { product_name: { [Op.iLike]: `%${search}%` } },
                { sku: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count: total, rows } = await Product.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            order: [["created_at", "DESC"]]
        });

        return {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit)),
            data: rows
        };
    } catch (error) {
        logger.error(`Error in getProductsData: ${error}`);
        throw new ApiError(error.status || 500, error.message || "Internal Server Error");
    }
};