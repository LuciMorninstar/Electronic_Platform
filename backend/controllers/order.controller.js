
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
// import { axiosInstance as axios } from "./axios.js";


export const cashOnDelivery = async(req,res,next)=>{
    try {
        const {formData, shippingCharges} = req.body;
        const userId = req.user?._id;

        if(!formData || shippingCharges === undefined){
            const err = new Error("No formData or shippingCharges");
            err.statusCode = 400;
            return next(err);
        }

        const user = await User.findById(userId).populate("cartItems.product");
        //now it is in the document format and 
        const cartItems = user.cartItems;

        if(!cartItems.length){
            const err = new Error("Cart is empty");
            err.statusCode = 400;
            return next(err);
        }
        
         //if there are cartItems then i will need to add them to items of order model  (check the getAllCart items to understand if not understandable . Basically each product has a quanityt and product object with id inside so product.price and quantity has just cartItem.quantity)

//  1️⃣ Check stock availability
    for (const cartItem of cartItems) {
      if (cartItem.quantity > cartItem.product.stock) {
        const err = new Error(
          `Not enough stock for ${cartItem.product.name}. Available: ${cartItem.product.stock}`
        );
        err.statusCode = 400;
        return next(err);
      }
    }

         const items = cartItems.map(cartItem=>({
            productId:cartItem.product._id,
            name:cartItem.product.name,
            quantity:cartItem.quantity,
            price:cartItem.product.price,
            total:cartItem.product.price * cartItem.quantity
         }))


         //This is to add the shipping charges if any to the total amount
         const totalAmount = items.reduce((acc,item)=>acc+item.total,0) + shippingCharges;

        //  now create the order 

        const order = await Order.create({
            userId:userId,
            items:items,
            payment:{
                paymentId:null,//because this is cash on delivery
                method:"Cash On Delivery",
                amountPaid:totalAmount,
                status:"pending",
                paidAt:null,  //because this is cash on delivery
            },

            status:"processing",
            
            deliveryDetails:formData

            //orderNo is created by pre(save function) in schema
          
        });

        
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }, // decrement stock
      });
    }

        await User.findByIdAndUpdate(userId,{cartItems:[]});//clear

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                notifications: {
                    message: `Your order ${order.orderNo} has been placed successfully`,
                    type: "order",
                    link: `/invoice/${order._id}`,
                },
            },
        },
        { new: true, useFindAndModify: false } // ensures updated document is returned
    );

        // also need to send the notification to the admins right

        const admins = await User.find({role:"admin"});

        for(const admin of admins){
            await User.findByIdAndUpdate(admin._id,
                {$push:{
                    notifications:{
                        message:`A new order ${order.orderNo} has been placed by ${user.name || user.email}`,
                        type:"order",
                        link:`/admin/invoice/${order._id}`
                    }
                }},
                {new:true}
            )
        }

console.log("Updated User Notifications:", updatedUser.notifications);

        return res.status(201).json({
            success:true,
            message:"Order placed Successfully",
            order:order
        })      

        
    } catch (error) {
        console.log("Error in the cashOnDelivery controller",error.message);
        next(error);
        
    }






}


export const getMyOrders = async(req,res,next)=>{
    const userId = req.user?._id;

    try {

        const orders = await Order.find({userId:userId}).populate("items.productId","name price images") //kholeko product
        .sort({createdAt: -1});

        return res.status(200).json({
            success:true,
            orders:orders
        })

        
    } catch (error) {
        console.log("Error in the getMyOrders controller", error.message);
        next(error);
        
    }
}


export const getOrderDetailsById = async(req,res,next)=>{

try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("items.productId");

    if(!order){
        const err = new Error("No order found!");
        err.statusCode = 404;
        return next(err);
    }

    return res.status(200).json({
        success:true,
        order:order
    })


    
} catch (error) {
    console.log("Error in the getInvoiceByOrderId",error.message);
    next(error);
    
}

}

export const getAllOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find().sort({createdAt:-1});

        if(!orders){
            const err = new Error("No orders found");
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success:true,
            orders:orders
        })
        
    } catch (error) {
        console.log("Error in the getAllOrders controller", error.message);
        next(error);
        
    }
}

export const getInvoiceByOrderId = async(req,res,next)=>{

    const {orderId} = req.params;

    try {
        if(!orderId){
            const err = new Error("No order id provided");
            err.statusCode = 400;
            return next(err);
        }

        const order = await Order.findOne({_id:orderId});
        if(!order){
            const err = new Error("No order found");
            err.statusCode = 404;
            return next(err);
        }
        return res.status(200).json({
            success:true,
            orderDetailsByInvoice:order
        })

        
        
    } catch (error) {
        console.log("Error in getInvoiceByOrderId controller", error.message);
        next(error);
        
    }


} 





// export const KhaltiPaymentInit = async(req,res,next)=>{
//     try {
//        const {formData, shippingCharges} = req.body;
//         const userId = req.user?._id;

//         if(!formData || shippingCharges === undefined){
//             const err = new Error("No formData or shippingCharges");
//             err.statusCode = 400;
//             return next(err);
//         }

//         const user = await User.findById(userId).populate("cartItems.product");
//         //now it is in the document format and 
//         const cartItems = user.cartItems;

//         if(!cartItems.length){
//             const err = new Error("Cart is empty");
//             err.statusCode = 400;
//             return next(err);
//         }

//          const items = cartItems.map(cartItem=>({
//             productId:cartItem.product._id,
//             name:cartItem.product.name,
//             quantity:cartItem.quantity,
//             price:cartItem.product.price,
//             total:cartItem.product.price * cartItem.quantity
//          }))


//          //This is to add the shipping charges if any to the total amount
//          const totalAmount = items.reduce((acc,item)=>acc+item.total,0) + shippingCharges;

//            //  now create the order 

//             const order = await Order.create({
//             userId:userId,
//             items:items,
//             payment:{
//                 paymentId:null,//because this is cash on delivery
//                 method:"Khalti",
//                 amountPaid:totalAmount,
//                 status:"initiated",
//                 paidAt:null,  //because this is cash on delivery
//             },

//             status:"pending",
            
//             deliveryDetails:formData

//             //orderNo is created by pre(save function) in schema
          
//         });

//         //besides cashOnDelivery controller

//         const payload ={
//             return_url:`localhost:5173/payment-success/${order._id}`,
//             website_url:"localhost:5173",
//             amount:totalAmount * 100,
//             purchase_order_id:order._id.toString(),
//             purchase_order_name:`Order-${order.orderNo}`,
//             customer_info:{
//                 name:formData.fullName,
//                 email:"stars.winner1121@gmail.com",
//                 phone:formData.phoneNo
//             }       
//         };

//        const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       payload,
//       {
//         headers: {
//           Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     //not finished





        
//     } catch (error) {
//         next(error);
        
//     }
// }