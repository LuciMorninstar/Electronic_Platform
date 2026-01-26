import express from "express"
import "dotenv/config";
import path from "path"
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import connectDB from "./utils/connectDB.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import cartRoutes from "./routes/cart.route.js"
import commentRoutes from "./routes/comment.route.js"
import orderRoutes from "./routes/order.route.js"
import notificationRoutes from "./routes/notification.route.js"


const PORT = process.env.PORT || 8000;
const app = express();

const __dirname = path.resolve();
console.log("directory name", __dirname);

app.use(cors({
    origin:["http://localhost:5173", "https://techHive.com"],
    credentials:true  //to send cookies
}))



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/", (req,res)=>{
    res.send("Hello");
})


app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/comment",commentRoutes);
app.use("/api/order",orderRoutes)
app.use("/api/notification", notificationRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/:anyPath(*)", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
}


app.use(errorMiddleware);
app.listen(PORT , async()=>{
  
    console.log(`Server has been established at http://localhost:${PORT}`);
    
    await connectDB();

})