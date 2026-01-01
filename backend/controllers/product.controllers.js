import Product from "../models/product.model.js";
import redis from "../utils/redis.js";
import cloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js"
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  try {
    if ( products.length === 0 ) {
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


export const getFeaturedProducts = async(req,res,next)=>{
  try {
    let featuredProducts = await redis.get("featured_products");

    if(featuredProducts){
      return res.status(200).json({
        success:true,
        featuredProducts:JSON.parse(featuredProducts), // storing is different from the condesistency
      });
      
    }

    //if featruredProducts not found in redis then get it from mongodb.



    featuredProducts = await Product.find({isFeatured:true}).lean();
    //.lean() returns  a plain javascript object instead of a mongodb document which increases performance.
    if(featuredProducts.length === 0){
      const err = new Error("No featured Products found!");
      err.statusCode = 404;
      return next(err);
    }

    //set the featuredProducts in the redis for quick access and caching to improve performance.

    await redis.set("featured_products",JSON.stringify(featuredProducts));

// this is how we set for just a limit of time
       // cache for 1 hour
    // await redis.set("featured_products",JSON.stringify(featuredProducts),"EX", 60 * 60
    // );

    return res.status(200).json({
      success:true,
      featuredProducts
    })
    
    
  } catch (error) {
    console.log("Error in the getFeaturedProducts controller", error.message);
    next(error);
    
  }
}





export const addProduct = async(req,res,next)=>{
    const {name, category, brand, releaseDate, sku, features, shortDescription, images, specs, weightKg, warrantyMonths, operatingSystem, tags, colors, stock, price } = req.body;

    try {
      let imageURLs = []; //since images is an array


      if(req.files && req.files.length > 0){ //req.files comes from the multer middleware being placed before the addProduct in route so it let's us use the req.files like req.user and to get the times we use req.filess[0] to get first so for multiple we need to map through each and upload 
        for(const file of req.files){
          const result = await uploadOnCloudinary(file.path); //uploadOnCloudinary takes the file ko path we send it here and then these paths are being stored in cloudinary and then it is unlinksync and files are deleted from the public/temp folder  which is defined in the uploadonCloudinary function utils
          if(result){
            imageURLs.push({
              url:result.secure_url,
              public_id:result.public_id
            }); // if images are uploaded in cloudinary then push the secure_url of images to teh imageURl so the example of imageURl will be  imageURL:[url1, url2];
          }
        }
      }

      const product = await Product.create({
        name,
        category,
        brand,
        releaseDate,
        sku, 
        features,
        shortDescription,
        images:imageURLs ,
        specs,
        weightKg,
        warrantyMonths,
        operatingSystem,
        tags,
        colors,
        stock,
        price

      })

      return res.status(201).json({
        success:true,
        product:product
      })

      
    } catch (error) {
      console.log("Error in the addProduct controller", error.message);
      next(error);
      
    }

}


  export const updateProduct = async(req,res,next)=>{
    const {id} = req.params;

    try {

      if(!id){
        const err = new Error("No id provided to update");
        err.statusCode = 400;
        return next(err);
      }


      const product = await Product.findById(id);
      if(!product){
        const err = new Error("No product found with that id");
        err.statusCode = 404;
        return next(err);
      }

      const dataToUpdate = req.body;

      if(!dataToUpdate){
        const err = new Error("No data proided to update");
        err.statusCode = 400;
        return next(err);
      }

    

      if(req.files && req.files.length >0){

        // delete from cloudinary using public_id
        for (const img of product.images){ //product.images to get images
          await deleteOnCloudinary(img.public_id);
        }

        // // so instead of this mapping technique for deleting or uploading we can use promise.all for bettery processing

        // if(req.files?.length >0){
        //   await Promise.all(
        //     product.images.map(img=> deleteOnCloudinary(img.public_id))
        //   )

        // }

        
    //now to upload the new updated images
          let newImages = [];

        for(const file of req.files){
          const result = await uploadOnCloudinary(file.path);

          if(result){
          newImages.push({
            url:result.secure_url,
            public_id:result.public_id
          });
        }
        }

        dataToUpdate.images = newImages;  //replaces the data of images array with new images


      }
      

    const updatedProduct = await Product.findByIdAndUpdate(id, dataToUpdate, {new:true});

      return res.status(200).json({
              success:true,
              product:updatedProduct
      })


      
    } catch (error) {
      console.log("Erorr in the updateProduct controller", error.message);
      next(error);
      
    }

  }


export const deleteProduct = async(req,res,next)=>{

  try {

      const {id} = req.params;
      if(!id){
        const err = new Error("No id provided to delete");
        err.statusCode = 400;
        return next(err);
      }

      // if(req.files && req.files.length >0){
      //   for (const file of req.files){
      

      //   }
      // }

      const product = await Product.findById(id);

  

      if(!product){
        const err = new Error("No product found with that id");
        err.statusCode = 404;
        return next(err);
      }

         if(product.images?.length >0 ){
    for(const img of product.images){

      const response = await deleteOnCloudinary(img.public_id);
      // return response;

    }
     }

     await Product.findByIdAndDelete(id);

    

      return res.status(200).json({
        success:true,
        message:"Successfully Deleted the product"
        
      })

    
  } catch (error) {
    console.log("Error in the deleteProduct controller", error.message);
    next(error);
    
  }


}