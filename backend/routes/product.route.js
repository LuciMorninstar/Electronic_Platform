import express from "express"
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { getAllProducts } from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
// router.post("/", AddProduct);




export default router;