import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minLength:[2, "Product Name must exceed 2 characters long"],
        maxLength:[50, "Product Name must not exceed 50 characters long"],
    },
    category:{
        type:String,
        required:true,
        enum:["laptop", "headphone", "monitor", "mouse", "mobile"],
        required:true    
    },
    brand:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false

    },
    releaseDate:{
        type:Date,
    },
    sku:{
        type:String,
        unique:true
    },
    features:{
        type:[String],
        default:[]
    },
    shortDescription:{
        type:String,
     
        default:"No description"
    },
    images:[
        {
            url:String,
            public_id:String  // need for id "ing" the uploaded images in the cloudinary
        }
    ],
    price:{
        type:Number,
        default:0
    },
    ratings:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            value:{
                type:Number,
                min:1,
                max:5,
                
            },    
        }

    ],

    averageRating:{
        type:Number,
        default:0
    },

    stock:{
        type:Number,
        required:true,
        default:1
    },
    specs:{
        type:Object,
        default:{},
        required:true
    },
    weightKg:{
        type:Number,
        min:0,
        default:0
    },
    warrantyMonths:{
        min:0,
        type:Number,

    },
    operatingSystem:{
        type:String,
    },
    tags:{
        type:[String],
        default:[]
    },
    colors:{
        type:[String],
        default:[]
    },

    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
 

},{timestamps:true})

const Product = mongoose.model("Product", productSchema);

export default Product;