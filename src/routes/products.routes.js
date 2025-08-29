import express from 'express';
import { verifyUser } from "../middlewares/verifyUser.js";
import { addProductSchema, deleteProductSchema, updateProductSchema } from '../validation/product.validation.js';
import { validate } from '../middlewares/valiation.js';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../controllers/products.controllers.js';

const router = express.Router();

router.route('/add-product').get(verifyUser, validate(addProductSchema), addProduct);

router.route('/update-product').get(verifyUser, validate(updateProductSchema), updateProduct);

router.route('/delete-product').get(verifyUser, validate(deleteProductSchema), deleteProduct);

router.route('/get-product').get(verifyUser, getProduct);


export default router;

