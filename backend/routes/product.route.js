    import express from "express"
    import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
    import { addProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, searchProductByName, updateProduct } from "../controllers/product.controllers.js";
    import upload from "../middlewares/multer.middleware.js"

    const router = express.Router();

    router.get("/", protectRoute, adminRoute, getAllProducts);
    router.get("/featured",  getFeaturedProducts);
    router.post("/", protectRoute, adminRoute, upload.array("images",10), addProduct);
    router.get("/search", searchProductByName);
    router.patch("/:id", protectRoute, adminRoute, upload.array("images",10), updateProduct);
    router.delete("/:id", protectRoute, adminRoute, deleteProduct);
    router.get("/:category", getProductsByCategory);
 

    //------------------- remember---------------
    // for search in react 
    //      const response = await fetch(`/api/products/search?productName=${encodeURIComponent(name)}`);
    //     we send the query string here by wrapping it wiht encodeURICompoenent. ProductName because we desctruct it as productName in controller check it.

    // always remember that static routes like /search should be at top than dynamic routes like :id /:category because it might confuse the server and may take search as dynamic name for category





    export default router;