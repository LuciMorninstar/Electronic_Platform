import mongoose from "mongoose"

const connectDB = async()=>{
    try {

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Sucessfully connected to the MongoDB database");
        
    } catch (error) {
        console.log("Error connecting to the database");
        process.exit(1);
    }


}

export default connectDB;