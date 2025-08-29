import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const InventoryLog = sequelize.define(
    "InventoryLog",
    {
        log_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        change_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "tbl_products_inventory_logs",
        underscored: true,
        timestamps: true,
    }
);
