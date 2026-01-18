import User from "../models/user.model.js";
import Comment from "../models/comment.model.js"
import Product from "../models/product.model.js";



export const addComment = async(req,res,next)=>{
    const {text} = req.body;
    const {productId} = req.params;
    const userId = req.user._id;


    try {
        if(!text){
            const err = new Error("No comment written");
            err.statusCode = 400;
            return next(err);
        }

        const user = await User.findById(userId);
        if(!user){
            const err = new Error("No user found");
            err.statusCode = 404;
            return next(err);
        }

        const comment = await Comment.create({
            user:userId,
            text:text

        })
        //added to the comment model


        await Product.findByIdAndUpdate(productId,
            {$push:{comment:comment._id}},
            {new:true}
        )
        //then added the id to the product model

        res.status(201).json({
            success:true,
            message:"Comment added",
            comment:comment

        })




        
    } catch (error) {
        console.log("Erorr in the addComment controller", error.message);
        next(error);
    }

}



export const getAllComments = async(req,res,next)=>{

    const {productId} = req.params;

    try {
        if(!productId){
            const err = new Error("No product Id found to get comments");
            err.statusCode = 400;
            return next(err);
        }

        const product = await Product.findById(productId).populate(
            {path:"comment", select:"text date like unlike createdAt", options:{sort:{createdAt:-1}},
            populate:{
                path:"user",select:"fullName"
            }
        }
        );

        // i am finding the product using the productId and since the product model saves the comment as an array of objectid referencing to the comment model so i  need to populate the comment to get the comment so for that i am using path:"comment" to get to the comment first and select: "text like unlike" helps to select the fields inside the comment model now options is helping to sort and we are again populating inside to the path user that means now inside the comment model we are saving the userId as referecne to teh user model so we need to populate it that's why using the path:"user" and selecting fullName means taking the field value of fullName inside user model

        if(!product){
            const err = new Error("Product Not Found");
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            success:true,
            comments:product.comment
        })

       
   
    } catch (error) {
        console.log("Error in the getAllComments controller", error.message);
         next(error);
        
    }



}


export const removeComment = async(req,res,next)=>{

    const userId = req.user._id;
    const {productId} = req.params;
    const {commentId} = req.params;

    try {
        if(!productId || !commentId){
            const err = new Error("ProductId or CommentId Not found ");
            err.statusCode = 400;
            return next(err);
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
      const err = new Error("Comment not found");
      err.statusCode = 404;
      return next(err);
    }

    if(comment.user.toString() !== userId.toString()){
        const err = new Error("Not authorized to delete this comment");
        err.statusCode = 403;
        return next(err);
        
    }

     await Comment.findByIdAndDelete(commentId);

         await Product.findByIdAndUpdate(productId,
            {$pull:{comment:commentId}}

        )

        return res.status(200).json({
            success:true,
            message:"Comment Deleted"

        })




        
    } catch (error) {
        console.log("Error in the removeCOmment controller", error.message);
        next(error);
        
    }





}


export const addLike = async(req,res,next)=>{

    // const {productId} = req.params;
    const {commentId} = req.params;
    const userId = req.user._id;

    try {
        if( !commentId){
            const err = new Error("No  commentId found");
            err.statusCode = 400;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
        if(!comment){
            const err = new Error("Comment not found");
            err.statusCode = 400;
            return next(err);
        }

         
        //   if user has already unliked and he clicks the like pull means delete that means userId from array of unlike and like it
        if(comment.unlike.includes(userId)){
         await Comment.findByIdAndUpdate(commentId,
            {$pull:{unlike:userId}}
         )
         return res.status(200).json({
            success:true,
            message:"Reversed",
            user:userId

            
         })
        }

        

        await Comment.findByIdAndUpdate(commentId,
            {$addToSet:{like:userId}}
            // $addToSet adds the value only if it does not exist in the array.It prevents duplicates automatically. that's why not using the push becase duplication can be an issues in like and dislikes.
        )
    

        // comment.like.push(userId);
        // await comment.save();
        // can also use this

        const user = await User.findById(userId);

  
        return res.status(200).json({
            success:true,
            message:"Liked",
            user:user.fullName

        })

     
    } catch (error) {
        console.log("Eror in the addLike controller", error.message);
        next(error);
        
    }



}


export const addUnLike = async(req,res,next)=>{

    // const {productId} = req.params;
    const {commentId} = req.params;
    const userId = req.user._id;

    try {
        if( !commentId){
            const err = new Error("No  commentId found");
            err.statusCode = 400;
            return next(err);
        }

        const comment = await Comment.findById(commentId);
        if(!comment){
            const err = new Error("Comment not found");
            err.statusCode = 400;
            return next(err);
        }

        //   if user has already liked and he clicks the unlike pull means delete that userId from array of like and dislike it
        if(comment.like.includes(userId)){
               await Comment.findByIdAndUpdate(commentId,
            {$pull:{like:userId}}
         )
         return res.status(200).json({
            success:true,
            message:"Reversed",
            user:userId

            
         })
             
        }

        await Comment.findByIdAndUpdate(commentId,
            {$addToSet:{unlike:userId}}
            // $addToSet adds the value only if it does not exist in the array.It prevents duplicates automatically. that's why not using the push becase duplication can be an issues in like and dislikes.
        )
    

        // comment.like.push(userId);
        // await comment.save();
        // can also use this

        const user = await User.findById(userId);

  
        return res.status(200).json({
            success:true,
            message:"Unliked",
            user:user.fullName

        })

     
    } catch (error) {
        console.log("Error in the unLike controller", error.message);
        next(error);
        
    }



}

