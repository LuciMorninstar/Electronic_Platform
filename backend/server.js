import express from "express"
import "dotenv/config";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.route.js"
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8000;
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Hello");
})



app.use("/api/auth",authRoutes);


app.use(errorMiddleware);
app.listen(PORT , async()=>{
  
    console.log(`Server has been established at http://localhost:${PORT}`);
    
    await connectDB();

})