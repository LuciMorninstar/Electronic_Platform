import express from "express"
import { addToCart,getAllCartProducts, incQuantityOfAProductInCart,
   decQuantityOfAProductInCart, removeFromCart } from "../controllers/cart.controller.js";
  import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,getAllCartProducts);
router.patch("/:id",protectRoute,addToCart);
router.delete("/:id",protectRoute,removeFromCart);
router.patch("/increment/:id",protectRoute,incQuantityOfAProductInCart);
router.patch("/decrement/:id",protectRoute,decQuantityOfAProductInCart);







export default router;