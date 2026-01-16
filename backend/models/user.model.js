import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minLength:[4, "Name must be at least 4 characters long"],
        maxLength:[25, "Password must not exceed 25 characters"]


    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate:{
            validator: (v)=> v.includes("@"),
            message:"Email must contain @"
        } 
    },
    password:{
        type:String,
        required:true,
        minLength:[4, "Password must be at least 4 characters long"],
        maxLength:[25, "Password must not exceed 25 characters"]
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    wishlist:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                }
             ],
             
    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }

        }
        
    ]


}, {timestamps:true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return ;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    
    } catch (error) {
        console.log("Error hashing password",error.message);
        next(error);
        
    }

    

})

userSchema.methods.comparePassword = async function(typedPassword){
    return await bcrypt.compare(typedPassword, this.password);

}

const User = mongoose.model("User", userSchema);

export default User;