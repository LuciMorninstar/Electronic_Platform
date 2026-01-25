import Product from "../models/product.model.js";
import redis from "../utils/redis.js";
import cloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

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
        products:products
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

          // Parse JSON strings if they come as strings
      const parsedSpecs = typeof specs === 'string' ? JSON.parse(specs) : specs;
      const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;

      const product = await Product.create({
        name,
        category,
        brand,
        releaseDate,
        sku, 
        features:parsedFeatures,
        shortDescription,
        images:imageURLs ,
        specs:parsedSpecs,
        weightKg,
        warrantyMonths,
        operatingSystem,
        tags:parsedTags,
        colors:parsedColors,
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
//cant understand the logic of parsing for string to objects or array
      const dataToUpdate = {...req.body};

        // Parse JSON fields if they come as strings
    const fieldsToParse = ["specs", "features", "tags", "colors"];
    fieldsToParse.forEach((field) => {
      if (dataToUpdate[field] && typeof dataToUpdate[field] === "string") {
        try {
          dataToUpdate[field] = JSON.parse(dataToUpdate[field]);
        } catch (err) {
          // Invalid JSON, you can either ignore or throw error
          dataToUpdate[field] = dataToUpdate[field]; // keep as is
        }
      }
    });

    // can't under/

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

export const getProductDetails = async(req,res,next)=>{
  const {id} = req.params;

  try {
    if(!id){
      const err = new Error("No id provided to get details");
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.findById(id);

    if(!product){
      const err = new Error("No product found");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({
      success:true,
      product:product
    })

    
  } catch (error) {
    console.log("Erorr in getProductDetails controller", error.message);
    next(error);
    
  }
}


export const getProductsByCategory = async(req,res,next)=>{

  const {category} = req.params;

  try {
    if(!category){
      const err = new Error("No category to find products with");
      err.statusCode = 400;
      return next(err);

    }
    
    const productByCategory = await Product.find({category});

    if(productByCategory.length === 0){
      const err = new Error("There are no products available in this category");
      err.statusCode = 404;
      return next(err);


    }

    return res.status(200).json({
      success:true,
      products:productByCategory

    })

    
  } catch (error) {

    console.log("Error in the getProductByCategory controller", error.message);
    next(error);
    
  }

}

export const searchProductByName = async(req,res,next)=>{
  const {productName} = req.query; // we can customize name by productName:name
  const name = productName.trim();

  try {


  const productBySearch = await Product.find({name:{$regex:name, $options:"i"}});  //so it will search where name let's say Asus is the name tehn regex helps in pattern. if user searches asus instead of Asus it shows still because of regex no need to match exact word and options:"i" make it case insensitive that is A to a no difference.
  
  if(productBySearch.length === 0){
    const err = new Error(`No product found with the name of ${name} `);
    err.statusCode = 404;
    return next(err);

  }

  return res.status(200).json({
    success:true,
    products:productBySearch
    
  })

    
  } catch (error) {
    console.log("Error in the searchProductByName controller", error.message);
    next(error);

    
  }










}


//toggleFeatured Product starts
export const toggleFeaturedProduct = async(req,res,next)=>{

  const {id} = req.params;

  try {

    if(!id){
      const err = new Error("No id provided to toggle featuerd Products");
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.findById(id);
    if(!product){

      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err);

    }

      product.isFeatured = !product.isFeatured; // if true false if false true
      const updatedProduct = await product.save();

      // since product is toggled and saved mongodb is updated . Now we also need to update the redis cache for that

      await updateFeaturedProductsCache(); //this is a function to created
      res.status(200).json({
        success:true,
        toggledProduct:updatedProduct
      })



   
   
  } catch (error) {

    console.log("Error in toggleFeaturedProduct controller", error.message);
    next(error);
    
  }
}

async function updateFeaturedProductsCache(){
  try {

    const featuredProduct = await Product.find({isFeatured:true}).lean(); //since the mongodb is updated so set this as new redis featured product
    await redis.set("featured_products", JSON.stringify(featuredProduct));
    
  } catch (error) {
    console.log("Erorr while updating the toggleFeaturedProduct cache in Redis", error.message);

    
  }
}

//toggleFeatured Product ends


//  save these to redis with userId along with it 
// Logged-in user with wishlist or cartItems
//  recommend based on his wishlist + cartItems

// Logged-in user without both
//  recommend based on all users’ wishlists

// Guest user
//  recommend based on all users’ wishlists


export const isFeaturedProduct = async(req,res,next)=>{
  const {id} = req.params;
  try {
    if(!id){
      const err = new Error("No id provided to check featured status");
      err.statusCode = 400;
      return next(err);
    }
    const product = await Product.findById(id);

    if(!product){
      const err = new Error("No product found");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({
      success:true,
      isFeaturedProduct:product
    })

    

  
    
  } catch (error) {
    console.log("Error in the isFeaturedProduct controller", error.message);
    next(error);
    
  }
}

export const getRecommendationProducts = async(req,res,next)=>{


  try {
      const LIMIT = 10;
      const userId = req.user?._id;

      
    // for redis
      const redisKey = userId ? `recommendations:${userId}`:`recommendations:guest`

      // fetching from redis if any
      const redisData = await redis.get(redisKey);
      if(redisData){
        return res.status(200).json(JSON.parse(redisData));
      }

      // fetch from mongodb database

      let recommendations = []; 
      // let because every user has different products recommendations

      // if user is logged in

      if(userId){
        const user = await User.findById(userId)
        .populate("wishlist").populate("cartItems.product"); 
        // turning them into readable mongodb document
        // no dealing with cartItems.quantity 

        // check if user has wishlist or any cart products if he has show the products based on those wihlist or cart products categories and brands if user doesnt have any wishlist or any cart products then show products based on all users wishlist or cart products

        const hasData = user.wishlist.length >0 || user.cartItems.length>0;
          // user has data starts
        if(hasData){
          const categories = new Set();
          const brands = new Set();
          const excludingProductIds = new Set();
          // this is to not show the user the same product that he has in his cart or wishlist 

        // for wishlist
        user.wishlist.forEach(product=>{
          categories.add(product.category);
          brands.add(product.brand);
          excludingProductIds.add(product._id);
        })

        //for cartItems

        user.cartItems.forEach(item=>{
          categories.add(item.product.category);
          brands.add(item.product.brand);
          excludingProductIds.add(item.product._id)
        })


        
        // now for recommending products to the user who has wishlist or cart items

        recommendations = await Product.find(
          {$or:[
            {category:{$in:[...categories]}},
            {brand:{$in:[...brands]}}
          ],
          _id:{$nin:[...excludingProductIds]}
        }
        ).limit(LIMIT);

        

        

        }

        // user has data ends

        // if user doesnt have data then show based on all users

        else{

          recommendations = await getGlobalWishlistBasedProducts(LIMIT);

        }


      }

      // user logged in finished

      // now for those who are not user or signed in

      else{
        recommendations = await getGlobalWishlistBasedProducts(LIMIT);

      }
//so here in recommendationProducts i was getting error of sometime getting data in recommendations:[{},{}] sometimes without recommendations: just [{}.{}] array of objects and that was due to the redis data was stored without recommendations name give so reponsedata is built and sent to the  as response of redis so same (.map error)
      const responseData ={
        recommendations:recommendations,
        success:true,
      }

      // now to store those in redis for 10 minutes

      await redis.set(redisKey,JSON.stringify(responseData),"EX",600);

      return res.status(200).json({
        success:true,
        recommendations:recommendations
      }
      );


      
  } catch (error) {
    console.log("Error in the getRecommendationProducts controller", error.message);
    next(error);
    
  }


}


// now here for global using only wishlist no carts
const getGlobalWishlistBasedProducts = async(LIMIT)=>{
  return await User.aggregate(
      [
        {$unwind:"$wishlist"},  //kholeko  $ means it is a field

        {
          $group:{
            _id:"$wishlist",  //grouping them by _id
            count:{$sum:1}   // adding how many wishlists
          }
        },

        {$sort:{count:-1}},
        {$limit:LIMIT},

        {
          $lookup:{
            from:"products",   //doing left join user with the        products (products because collection name in mongodb)
            localField:"_id", //the name of column from user which is used to connect
            foreignField:"_id", //the name which is going to be joint with products
            as:"product"  //naming it as product field

          }
        },

        {$unwind:"$product"},
        {$replaceRoot:{newRoot:"$product"}}


      ]
  )
}


export const getSimilarProducts = async(req,res,next)=>{
  const {productId} = req.params;

  try {

    const clickedProduct = await Product.findById(productId);

    if(!clickedProduct){
      const err = new Error("Product Not Found");
      err.statusCode = 404;
      return next(err);
    }

    const similarProducts = await Product.find(
      {category:clickedProduct.category, _id:{$ne:productId}}
      //to exclude the clickedProduct
    ).limit(6);

    res.status(200).json({
      success:true,
      similarProducts:similarProducts
    })


    
  } catch (error) {
    console.log("Error in the getSimilarProducts",error.message);
    next(error);
    
  }


}



export const getTopRatedRecentProducts = async(req,res,next)=>{
  try {

    const redisData = await redis.get("topRatedRecentProducts");
    if(redisData){
      return res.status(200).json({
        success:true,
        topRatedRecentProducts:JSON.parse(redisData),
        
      })

    }


    const topRatedRecentProducts = await Product.find().sort(
      {averageRating:-1, createdAt:-1} //new first
    ).limit(10);

    await redis.set("topRatedRecentProducts",JSON.stringify(topRatedRecentProducts),"EX",300)

    return res.status(200).json({
      success:true,
      topRatedRecentProducts:topRatedRecentProducts

    })

    
  } catch (error) {
    console.log("Error in the getTopRatedRecentProducts controller", error.message);
    next(error);
    
  }
}



export const filterProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, rating } = req.query;

    let filter = {};

    // Case-insensitive match for category
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // Case-insensitive match for brand
    if (brand) {
      filter.brand = { $regex: new RegExp(`^${brand}$`, "i") };
    }

    // Rating filter (>=)
    if (rating) {
      filter.averageRating  = { $gte: Number(rating) };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Fetch products from DB
    const filteredProducts = await Product.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: filteredProducts.length,
      filteredProducts
    });

  } catch (error) {
    console.log("Error in filterProducts controller:", error.message);
    next(error);
  }
};


//for the compareTo

export const compareTo = async(req,res,next)=>{
  try {
    const {id} = req.params;

    if(!id){
      const err = new Error("No id provided");
      err.statusCode = 400;
      return next(err);
    }

    const product = await Product.findById(id);

    if(!product ){
      const err = new Error("No product found");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({
      success:true,
      compareToProduct:product
    })





    
  } catch (error) {
    console.log("Error in the compareTo controller", error.message);
    next(error);
    
  }

}


export const rateProduct = async(req,res,next)=>{
  
  const {id:productId} = req.params;
  const {rating} = req.body;
  const userId = req.user?._id;

  try {

    const product = await Product.findById(productId);
    if(!product){
      const err = new Error("No product found to rate");
      err.statusCode = 404;
      return next(err);
    }

    if (!product.ratings) product.ratings = [];
    // checking if user already rated the product
    

    const existingRating = product.ratings.find(r=> r.userId.toString() === userId.toString());

    if(existingRating){
      // update the rating
      existingRating.value = rating;
    }
    else{
      product.ratings.push({userId, value:Number(rating)})
    }

    //calculating the average ratings of all users and putting in averageRating field

    const totalRating = product.ratings.reduce((sum, rating)=>
    sum + rating.value,0);

   product.averageRating =
  product.ratings.length > 0
    ? Number((totalRating / product.ratings.length).toFixed(1))
    : 0;
  await product.save();

const myRatingObj = product.ratings.find(r => r.userId.toString() === userId.toString());
const myRating = myRatingObj ? myRatingObj.value : 0;

return res.status(200).json({
  success: true,
  message: `You have rated ${rating} stars`,
  averageRating: product.averageRating,
  totalRatings: product.ratings.length,
  ratings: product.ratings,
  myRating
});





    
  } catch (error) {
    console.log("Error in the rateProduct controller", error.message);
    next(error);
    
  }

}










