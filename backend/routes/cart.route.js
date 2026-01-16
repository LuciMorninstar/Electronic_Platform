import express from "express"
import { addToCart,getAllCartProducts } from "../controllers/cart.controller.js";
  import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,getAllCartProducts);
router.patch("/:id",protectRoute,addToCart);







export default router;