import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next)=>{

    const accessToken = req.cookies.accessToken;

    try {
        if(!accessToken){
            const err = new Error("UnAuthorized! No access token provided");
            err.statusCode = 401;
            return next(err);
        }
      try {
           const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
   
           const user = await User.findById(decoded.userId).select("-password");

           if(!user){
            const err = new Error("User not found!");
            err.statusCode = 401;
            return next(err);

           }

           req.user = user;

           next();



      } catch (error) {
        if(error.name === "TokenExpiredError"){
            const err = new Error("UnAuthorized! Access Token Expired");
            err.statusCode = 401;
            return next(err);
        }
        else{
            throw error;
        }
        
     }
        
    } catch (error) {
        console.log("Error in the protectRoute middleware", error.message);
        next(error);
    }


}

export const adminRoute = (req,res,next)=>{  //no need of async since not dealing with await for database checks
    try {
        if( req.user?.role === "admin"){
           return next();   //calls the next function in the route
           //also return is important as it will not continue below after this.
        }

        const err = new Error("UnAuthorized Access! You are not the admin");
        err.statusCode = 403;  //403 means user is authenticated but no an admin just a user
        return next(err);
    

        
    } catch (error) {
        console.log("Error in the adminRoute controller", error.message);
        return next(error);
        
    }
}