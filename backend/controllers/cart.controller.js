
import Product from "../models/product.model.js";
import User from "../models/user.model.js";



export const addToCart = async(req,res,next)=>{

    const {id:productID} = req.params;
    const userId = req.user._id;


    try {
        
            if(!productID){
                const err = new Error("No id provided to add product to cart items");
                err.statusCode = 400;
                return next(err);
            }

    

            const user = await User.findById(userId);

            if(!user){
                const err = new Error("No user found");
                err.statusCode = 400;
                return next(err);
            }

          const itemAlreadyExists = user.cartItems.find((item)=>item.product.toString() === productID); 
          

          if(itemAlreadyExists){

            const updatedQuantity = await User.updateOne(
                {_id:userId, "cartItems.product":productID},
                {$inc:{"cartItems.$.quantity":1}}
                //"cartItems.product because mongodb only understand the inside of it if wrapped in"" , Not like js where cartItems.product can be used it needs """ 
                // $ in between inc is to show quanity is the one to incremenet

//                 Key rule

// Whenever a MongoDB key contains dots (.) or $, always wrap it in quotes in JS:
            
            );

            return res.status(200).json({
                success:true,
                message:"Cart Quantity updated"

            })

       
          }

          if(!itemAlreadyExists){

            const updatedCartItem = await User.updateOne(
                {_id:userId},
                {$push:{cartItems:{product:productID, quantity:1}}}
            );

            return res.status(200).json({
                success:true,
                message:"Product Added to cartItem"
            })

          }

  
    } catch (error) {
        console.log("Error in the addToCart controller",error.message);
        next(error);
        
    }

}

export const getAllCartProducts = async(req,res,next)=>{

    const userId = req.user._id;

    try {
     

        const user = await User.findById(userId).populate("cartItems.product" , "name category brand images price stock");

        //  Only cartItems.product is converted into a document
//  quantity stays exactly the same (it’s already data, not a reference) since we stored the cartItems.product as  a ref to the  product model and quantity as 1 taht's why we first need to populate and to select specific fields we use , and then "category name"

        if(!user){
            const err = new Error("No user found");
            err.statusCode = 400;
            return next(err);

        }
        return res.status(200).json({
            success:true,
            cartItems:user.cartItems || []
        })






        
    } catch (error) {
        console.log("Error in the getAllCartProducts", error.message);
        next(error);
        
    }

}