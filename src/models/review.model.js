import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Review = sequelize.define(
    "Review",
    {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        review_images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        }
    },
    {
        tableName: "tbl_products_reviews",
        underscored: true,
        timestamps: true,
    }
);

export default Review;
