import { sequelize } from "./dbConnection.js";
import logger from "../logger/logger.js";
import Product from "../models/product.model.js";

const syncModels = async () => {
    try {
        await Product.sync({ alter: true });
        logger.info("Models synced successfully");
    } catch (error) {
        logger.error(`"Models sync failed:", ${error}`);
        process.exit(1); // optional: stop app on failure
    }
};


export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info("SQL database connected successfully");
        // syncModels();
    } catch (error) {
        logger.error(`"SQL database connection failed:", ${error}`);
        process.exit(1); // optional: stop app on failure
    }
};
