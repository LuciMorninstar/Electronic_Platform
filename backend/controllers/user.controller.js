
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";


export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();

        if(!users){
            const err = new Error("No users found");
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success:true,
            users:users

        })
        
    } catch (error) {
        console.log("Error in getAllUsers controller", error.message);
        next(error);
        
    }

}

export const getCurrentUser = async(req,res,next)=>{

    try {
        const userId = req.user?._id;
        if(!userId){
            const err = new Error("Not logged in");
            err.statusCode = 401;
            return next(err);
        }

        const user = await User.findById(userId).select("-password");
        if(!user){
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            user:user
        })
        
    } catch (error) {
        next(error);
        
    }
}

export const getPaidUsers = async(req,res,next)=>{
    try {
        const paidOrders = await Order.find({"payment.status":"completed"}).populate("userId");

    const paidUsers = paidOrders
            .filter(order => order.userId) // remove orders with null users
            .map(order => ({
                userId: order.userId._id,
                name: order.userId.fullName || order.userId.name || "N/A",
                email: order.userId.email || "N/A",
                amountPaid: order.payment.amountPaid || 0,
                paidAt: order.payment.paidAt || null,
                method: order.payment.method || "N/A",
                fullName: order.deliveryDetails?.fullName || "N/A",
                phoneNo: order.deliveryDetails?.phoneNo || "N/A",
                fullAddress: order.deliveryDetails
                    ? `${order.deliveryDetails.houseNo}, ${order.deliveryDetails.colony}, ${order.deliveryDetails.area}, ${order.deliveryDetails.city}, ${order.deliveryDetails.region}`
                    : "N/A",
                orderNo: order.orderNo
            }));

        return res.status(200).json({
            success:true,
            paidUsers:paidUsers
        })
        
    } catch (error) {
        console.log("Error in getPaidUsers controller", error.message);
        next(error);
        
    }
}

export const deleteUser = async(req,res,next)=>{
    const {id:userId} = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);

        if(!user){
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
        
    } catch (error) {
        console.log("Error in deleteUser controller", error.message);
        next(error);
        
    }
}

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
