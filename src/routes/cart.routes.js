import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { validate } from "../middlewares/valiation.js";
import { addToCart, getCartData, removeFromCart } from "../controllers/cart.controllers.js";
import { addCartProduct, removeCartProduct } from "../validation/cart.validation.js";

const router = express.Router();

router.route("/add-to-cart").post(verifyUser, validate(addCartProduct), addToCart);

router.route("/get-cart-data").get(verifyUser, getCartData);

router.route("/remove-from-cart").delete(verifyUser, validate(removeCartProduct), removeFromCart)

export default router;