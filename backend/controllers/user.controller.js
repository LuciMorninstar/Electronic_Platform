
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addToWishlist = async(req,res,next)=>{
    const {id:productID} = req.params;
    const userId = req.user._id;


    try {
        if(!productID){
            const err = new Error("No product Id found to add to wishlist");
            err.statusCode = 400;
            return next(err);
        }

        const user = await User.findById(userId);

        if(!user){
            const err = new Error("User not found");
            err.statusCode = 400;
            return next(err);
        }

        const itemAlreadyExists = user.wishlist.some((id)=>id.toString() === productID);
        //can also use include 
        //also since wishlist is an array need to convert them to string first
        if(itemAlreadyExists)
        {
            const err = new Error("Product already exists in wishlist");
            err.statusCode = 400;
            return next(err);
        }
        
        

        //can also use the user.wihlist.includes(productId) to check and then to push the product use user.wishlist.push(productId)

        const updatedUser = await User.findByIdAndUpdate(userId,{$addToSet:{wishlist:productID}}, {new:true});

    

        return res.status(200).json({
            success:true,
            message:"Added item to the wishlist"
        })


    
       
    } catch (error) {
        console.log("Error in the addToWishList controller", error.message);
        next(error)
        
    }


}

export const removeFromWishlist = async(req,res,next)=>{
    const {id:productId} = req.params;
    const userId = req.user._id;

  try {
      if(!productId){
          const err = new Error("No product id provided");
          err.statusCode = 400;
          return next(err);
  
      }

      const updatedUser = await User.findByIdAndUpdate(userId,{$pull:{wishlist:productId}},{new:true});

      //also works with filtering the user.wishlist to remove the item from database and save it.
    

      if(!updatedUser){
        const err = new Error("No user found");
        err.statusCode = 400;
        return next(err);
      }

      return res.status(200).json({
        success:true,
        message:"Removed from wishlist"
      })


  
  } catch (error) {
    console.log("Error in removeFromWishlist controller", error.message);
    next(error);
    
  }





}

export const getWishlistProducts = async(req,res,next)=>{
    try {

        const wishlistIds = req.user.wishlist;

        // wishlistIds = [0iodsfskh, 0dbish32432]; returns an array

        const products = await Product.find({_id:{$in:wishlistIds}});
        // $in returns the full document of the product, so it will show all details for each id
        res.status(200).json({
            success:true,
            products
        });

        
    } catch (error) {
        console.log("Error in getWishlistProducts", error.message);
        next(error);
    }

}
