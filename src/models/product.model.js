import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Product = sequelize.define(
    "Product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_desc: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        product_price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
        product_discount_percentage: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: true,
        },
        product_stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active",
            validate: {
                isIn: [["active", "inactive", "out_of_stock"]],
            },
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "tbl_products",
        underscored: true,
        timestamps: true,
    }
);

export default Product;
