import express from "express";
import morganMiddleware from "./logger/morgan.js";
import logger from "./logger/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/dbLodder.js";
import product from './routes/products.routes.js'
import cart from './routes/cart.routes.js'


dotenv.config();

const app = express();

// db connection
await connectDB();

// Security middleware
app.use(helmet());
app.use(cors());

// Use morgan middleware for HTTP request logging, sending logs to winston
app.use(morganMiddleware);

// routes
app.use('/api/v1/products', product);
app.use('/api/v1/cart', cart);

// Example route
app.get("/", (req, res) => {
    logger.info("Root endpoint was hit");
    res.json({ msg: "Hello, world!" });
});

// Remove the old error middleware and use the custom errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});