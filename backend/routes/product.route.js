    import express from "express"
    import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
    import { addProduct, getAllProducts, getFeaturedProducts, updateProduct } from "../controllers/product.controllers.js";
    import upload from "../middlewares/multer.middleware.js"

    const router = express.Router();

    router.get("/", protectRoute, adminRoute, getAllProducts);
    router.get("/featured",  getFeaturedProducts);
    router.post("/", protectRoute, adminRoute, upload.array("images",10), addProduct);
    router.patch("/:id", protectRoute, adminRoute, upload.array("images",10), updateProduct);





    export default router;