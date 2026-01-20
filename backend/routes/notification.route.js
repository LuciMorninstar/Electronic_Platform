import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getNotificationsById } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute,getNotificationsById);




export default router;
