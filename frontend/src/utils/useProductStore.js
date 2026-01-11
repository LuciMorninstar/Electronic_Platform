import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"

export const useProductStore = create((set)=>({
    loading:false,

    addProduct: async(formData)=>{
        set({loading:true})

        try {
            const response = await axios.post("/product", formData );
            set({loading:false});
            toast.success("Product Added Successfully");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to add product");
            
        }

    },

    getAllProducts:async()=>{
        set({loading:true})

        try {
            const response = await axios.get("/product");
            set({loading:false, products:response.data.products});
            // toast.success("Successfully fetched all products");

            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to fetch all products");
            
        }
    },

    updateProduct:async(id)=>{
        set({loading:true})

        try {
            const response = await axios.patch(`/product/${id}`);
            set({loading:false, product:response.data.product});
            toast.success("Successfully updated the product");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to update the product");
            
        }

    },

    deleteProduct:async(id)=>{
        set({loading:true})

        try {
            const response = await axios.delete(`/product/${id}`);
            set({loading:false, product:response.data.product});
            toast.success("Successfully deleted the product");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to delete the product");
            
        }
    },

    getProductDetails : async(id)=>{
          set({loading:true})

        try {
            const response = await axios.get(`/product/${id}`);
            set({loading:false, product:response.data.product});
            // toast.success("Successfully retrieved details of the product");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to retrieve details of the product");
            
        }

    }
    
}))
