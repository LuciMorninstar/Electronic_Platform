import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.api_secretCLOUDINARY_API_SECRET
})



//after a localfile path is provided then upload
const uploadOnCloudinary = async(localFilepath)=>{
    // a localfilepath of the images stored in server is provided
    try {
        if(!localFilepath){
            const err = new Error("No local file path provided!");
            err.status(404);
            return next(err);

        }

        const response = await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        })

        console.log("Successfully uploaded  on cloudinary", response.original_filename);
        return response; //provides response to the user
        
    } catch (error) {
    //if there is any error while uploading . We don't want the server to hold the images right in that case we need to delete it use unlinkSync which means it must happen.
        fs.unlinkSync(localFilepath);
        return null;
        
    }

}

export default uploadOnCloudinary;
