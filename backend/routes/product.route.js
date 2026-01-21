    import express from "express"
    import { adminRoute, protectRoute, optionalAuth } from "../middlewares/auth.middleware.js";
    import { addProduct, compareTo, deleteProduct,  filterProducts, getAllProducts, getFeaturedProducts, getProductDetails, getProductsByCategory, getRecommendationProducts, getSimilarProducts, getTopRatedRecentProducts, searchProductByName, toggleFeaturedProduct, updateProduct } from "../controllers/product.controllers.js";
    import upload from "../middlewares/multer.middleware.js"


    const router = express.Router();

    router.get("/",  getAllProducts);
    router.get("/featured",  getFeaturedProducts);
    router.post("/", protectRoute, adminRoute, upload.array("images",10), addProduct);
    router.get("/recommendations",optionalAuth,getRecommendationProducts);
    router.get("/topRatedRecentProducts", getTopRatedRecentProducts );
 router.get("/filter",filterProducts);
      //here optionalAuth used so as to not be blocked if user is not logged in and show him recommendations
    router.get("/similar/:productId",getSimilarProducts);
    router.get("/compareTo/:id",compareTo)
  
    router.get("/search", searchProductByName);
    router.get("/:id", getProductDetails);
    router.patch("/:id", protectRoute, adminRoute, upload.array("images",10), updateProduct);
    router.delete("/:id", protectRoute, adminRoute, deleteProduct);
    router.get("/category/:category", getProductsByCategory);
    router.patch("/toggle-featured/:id",protectRoute, adminRoute, toggleFeaturedProduct );
 
    
 

    //------------------- remember---------------
    // for search in react 
    //      const response = await fetch(`/api/products/search?productName=${encodeURIComponent(name)}`);
    //     we send the query string here by wrapping it wiht encodeURICompoenent. ProductName because we desctruct it as productName in controller check it.

    // always remember that static routes like /search should be at top than dynamic routes like :id /:category because it might confuse the server and may take search as dynamic name for category





    export default router;