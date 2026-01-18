import express from "express"
 import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { addComment, addLike, addUnLike, getAllComments, removeComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:productId", protectRoute, addComment);
router.delete("/:productId/:commentId", protectRoute, removeComment);
router.get("/:productId", getAllComments);

router.post("/like/:commentId", protectRoute, addLike)
router.post("/unLike/:commentId", protectRoute, addUnLike)






export default router;