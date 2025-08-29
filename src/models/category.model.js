import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const Category = sequelize.define(
    "Category",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "tbl_products_categories",
        underscored: true,
        timestamps: true,
    }
);