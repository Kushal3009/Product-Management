import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

export const sequelize = new Sequelize(
    process.env.DB_NAME,   // Database name
    process.env.DB_USER,   // Username
    process.env.DB_PASSWORD,   // Password
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT), // 3306 for MySQL, 1433 for MSSQL
        dialect: process.env.DB_DIALECT || "mssql",
        logging: false, // set true if you want SQL logs
    }
);