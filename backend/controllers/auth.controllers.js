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
            user:newUser
        })

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        next(error);
        
    }

    
}


export const logout = async (req,res,next)=>{

    try {

        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
            await redis.del(`refreshToken:${decoded.userId}`);

        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })

     

    
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log("Error in the logout controller");
        next(error);

        
    }


}

export const login = async(req,res,next)=>{
    const {email, password} = req.body;

    try {
        
    if(!email || !password){
        const err = new Error("All fields are required");
        err.statusCode = 400;
        return next(err);
    }

    const existingUser = await User.findOne({email});

    if(!existingUser){
        const err = new Error("User with that email doesnot exist");
        err.statusCode = 400;
        return next(err);
    }

    const isMatch = await existingUser.comparePassword(password);

    if(!isMatch){
        const err = new Error("Email or Password do not match!");
        err.statusCode = 400;
        return next(err);

    }

    const {refreshToken, accessToken} = generateTokens(existingUser._id);

    await storeRefreshTokenInRedis(existingUser._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    return res.status(200).json({
        success:true,
        message:"Logged In Successfully",
        user:{
            id:existingUser._id,
            fullName:existingUser.fullName,
            email:existingUser._email,
            role:existingUser.role

        }
    })

        
    } catch (error) {
        console.log("Error in the login controller", error.message);
      next(error);
       
        
    }

}

export const refreshToken = async(req,res,next)=>{

    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            const err = new Error("No refresh Token provided");
            err.statusCode = 401;
           return  next(err);
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

        const storedRefreshToken = await redis.get(`refreshToken:${decoded.userId}`);

        if(storedRefreshToken !== refreshToken){
            const err = new Error("Invalid refresh Token");
            err.statusCode = 401;
            return next(err);
        }

        const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN});

        res.cookie("accessToken", accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:15*60*1000,
        })

        return res.json({success:true, message:"Token refresh Successfully"})

        
    } catch (error) {

        console.log("Erorr in refreshToken controller", error.message);
        next(error);
        
    }
    
}







