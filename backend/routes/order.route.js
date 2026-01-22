import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { cashOnDelivery, getInvoiceByOrderId, getMyOrders, getOrderDetailsById } from "../controllers/order.controller.js";
import { adminRoute } from "../middlewares/auth.middleware.js";
import { getAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/",protectRoute,cashOnDelivery);
router.get("/",protectRoute,getMyOrders);
router.get("/all-orders", protectRoute,adminRoute, getAllOrders) // this here can be taken as /:id dynamic value so it is upper than that route
router.get("/admin/invoice/:orderId",protectRoute,adminRoute,getInvoiceByOrderId);
router.get("/:id",protectRoute,getOrderDetailsById);



export default router;