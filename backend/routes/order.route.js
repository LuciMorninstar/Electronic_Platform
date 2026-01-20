import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { cashOnDelivery, getMyOrders, getOrderDetailsById } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/",protectRoute,cashOnDelivery);
router.get("/",protectRoute,getMyOrders);
router.get("/:id",protectRoute,getOrderDetailsById);



export default router;