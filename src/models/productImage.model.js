import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const ProductImage = sequelize.define(
    "ProductImage",
    {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_primary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "tbl_product_images",
        underscored: true,
        timestamps: true,
    }
);

export default ProductImage;
