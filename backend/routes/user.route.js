import express from "express"
import { addToWishlist, removeFromWishlist,getWishlistProducts } from "../controllers/user.controller.js";
  import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/wishlist/products",protectRoute,getWishlistProducts);
router.patch("/wishlist/add/:id",protectRoute,addToWishlist);
router.patch("/wishlist/remove/:id",protectRoute,removeFromWishlist);







export default router;