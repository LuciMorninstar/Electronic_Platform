import { axiosInstance as axios } from "./axios";

import { create } from "zustand"
import {toast} from "react-hot-toast"





export const useCartStore = create((set)=>({
    loading:false,

    addToCart : async(id)=>{
            set({loading:true});

            try {
                const response = await axios.patch(`/cart/${id}`);
                set({loading:false})
                toast.success("Successfully Added to cart");

                
            } catch (error) {
                set({loading:false});
                toast.error(error.response?.data?.message || "Failed to add product to cart");
                
            }


    },

    getAllCartProducts : async()=>{
        set({loading:true});

        try {
            const response = await axios.get("/cart");
            set({loading:false, cartItems:response.data?.cartItems});
            // toast.success("Successfully fetched cart products");
            
        } catch (error) {
             set({loading:false});
                toast.error(error.response?.data?.message || "Failed to fetch cart products");
                
            
        }
    },

        removeFromCart : async(id)=>{
        set({loading:true});

        try {
            const response = await axios.delete(`/cart/${id}`);
            set({loading:false});
            toast.success("Successfully deleted cart product");
            
        } catch (error) {
             set({loading:false});
                toast.error(error.response?.data?.message || "Failed to delete the cart product");
                
            
        }

     

    },

    
        incQuantityOfAProductInCart : async(id)=>{
        set({loading:true});

        try {
            const response = await axios.patch(`/cart/increment/${id}`);
            set({loading:false});
            toast.success("Increased Quantity");
            
        } catch (error) {
             set({loading:false});
                toast.error(error.response?.data?.message || "Failed to increase the quantity");
                
            
        }

     

    },

    decQuantityOfAProductInCart : async(id)=>{
        set({loading:true});

        try {
            const response = await axios.patch(`/cart/decrement/${id}`);
            set({loading:false});
            toast.success("Decreased Quantity");
            
            
        } catch (error) {
              set({loading:false});
                toast.error(error.response?.data?.message || "Failed to decrease the quantity");
            
        }
    }

    

    



    
}))