import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import redis from "../utils/redis.js"





const generateTokens = (userId)=>{

    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN} );

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN});

    return {accessToken, refreshToken};
}


const storeRefreshTokenInRedis = async (userId, refreshToken)=>{
 try {
       await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 7*24*60*60);
 } catch (error) {
    console.error("Failed to store refresh token to redis database", error)
    
 }


}

const setCookies = (res,accessToken, refreshToken) =>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:15*60*1000
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

}

export const signup = async (req,res,next)=>{

    const {fullName, email, password, confirmPassword} = req.body;

    try {
        if(!fullName || !email || !password || !confirmPassword){
            const err = new Error("All fields are required");
            err.statusCode = 400;
            return next(err);
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            const err = new Error("User with that email already exists!");
            err.statusCode = 400;
            return next(err);
        }

        if(password != confirmPassword){
            const err = new Error("Password Fields do not match");
            err.statusCode = 400;
            return next(err);
        }

        const newUser = await User.create({
            fullName,
            email,
            password, 
          
        })


    

        const {accessToken, refreshToken } = generateTokens(newUser._id);

       await storeRefreshTokenInRedis(newUser._id, refreshToken);

        setCookies(res, accessToken, refreshToken);


        newUser.password = undefined;
        res.status(201).json({
            success:true,
            message:"New User created Successfully",
            data:newUser
        })

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        next(error);
        
    }

    
}



