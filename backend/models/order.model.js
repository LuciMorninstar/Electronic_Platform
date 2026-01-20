    import mongoose from "mongoose"
    import bcrypt from "bcryptjs"


    const orderSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                name:String,
                quantity:Number,
                price:Number,
                total:Number
            }
        ],

        payment:{
            paymentId:String,
            method:String,
            amountPaid:Number,
            status:{
                type:String,
                enum:["pending","completed","failed"],
                default:"pending"
            },
            paidAt:Date
        },

        status:{
            type:String,
            default:"processing"
        },

        deliveryDetails:{
            fullName:String,
            region:String,
            phoneNo:String,
            city:String,
            area:String,
            colony:String,
            houseNo:String,
            address:String
        },

        orderNo:String



    },{timestamps:true})


 orderSchema.pre("save", function () {
  if (!this.orderNo) {
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const randomPart = Math.floor(100 + Math.random() * 900);

    this.orderNo = `ORD-${datePart}-${randomPart}`;
  }
});

    const Order = mongoose.model("Order", orderSchema);

    export default Order;