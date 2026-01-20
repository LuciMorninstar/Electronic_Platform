import User from "../models/user.model.js";

export const getNotificationsById = async(req,res,next)=>{
    try {
        const userId = req.user?._id;

        const user = await User.findById(userId).select("notifications");

        if(!user){
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            notifications:user.notifications
        })

        
        
    } catch (error) {
        console.log("Error in getMyNotifications:", error.message);
    next(error);
        
    }
}