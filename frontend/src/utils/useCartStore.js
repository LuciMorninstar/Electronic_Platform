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
    }

    
}))