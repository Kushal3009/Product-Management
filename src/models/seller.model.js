import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Seller = sequelize.define(
    "Seller",
    {
        seller_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "tbl_product_sellers",
        underscored: true,
        timestamps: true,
    }
);

export default Seller;
