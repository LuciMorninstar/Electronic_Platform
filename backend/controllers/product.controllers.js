import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  try {
    if (!products) {
      const err = new Error("No products found!");
      err.statusCode = 400;
      return next(err);
    }

    return res.status(200).json({
        success:true,
        products
    })


  } catch (error) {
    console.log("Error in the getAllProducts controller", error.message);
    next(error);
  }
};


export const AddProduct = async(req,res,next)=>{
    const {name, category, brand, releaseDate, sku, features, shortDescription, images, specs, weightKg, warrantyMonths, operatingSystem, tags, colors, stock, price } = req.body;

    if(images){
        

    }


}
