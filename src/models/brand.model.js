import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const Brand = sequelize.define(
    "Brand",
    {
        brand_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        logo_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "tbl_products_brands",
        underscored: true,
        timestamps: true,
    }
);


