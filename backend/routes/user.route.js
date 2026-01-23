import express from "express"
import { addToWishlist, removeFromWishlist,getWishlistProducts, getAllUsers, getPaidUsers, deleteUser, getCurrentUser } from "../controllers/user.controller.js";
  import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/all-users",protectRoute,adminRoute,getAllUsers);
router.get("/getCurrentUser", protectRoute,getCurrentUser);
router.get("/paid-users",protectRoute,adminRoute,getPaidUsers);
router.delete("/delete-user/:id",protectRoute,adminRoute,deleteUser);


router.get("/wishlist/products",protectRoute,getWishlistProducts);
router.patch("/wishlist/add/:id",protectRoute,addToWishlist);
router.patch("/wishlist/remove/:id",protectRoute,removeFromWishlist);







export default router;