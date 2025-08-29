import { DataTypes } from 'sequelize';
import { sequelize } from "../config/dbConnection.js"


const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true, // adds createdAt and updatedAt
    tableName: 'tbl_cart'
});

export default Cart;