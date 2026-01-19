import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"

export const useProductStore = create((set)=>({
    loading:false,
    isSearching:false,
    recommendations:[],
    similarProducts:[],
    topRatedRecentProducts:[],

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

    },

    getFeaturedProducts : async()=>{
        set({loading:true})

        try {
            const response = await axios.get("/product/featured");
            set({loading:false, featuredProducts:response.data?.featuredProducts || []});
            // toast.success("Fetched featured Products");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to retrieve featured products");
            
        }
    },

    searchProductByName : async(productName)=>{

        set({isSearching:true})

        try {
            const response = await axios.get(`/product/search?productName=${productName}`);
            set({isSearching:false, products:response.data?.products || []})
            
        } catch (error) {
              set({isSearching:false});
            toast.error(error.response?.data?.message || "Failed to retrieve products");

            
        }
        

    },

    getProductsByCategory : async(category)=>{
        set({loading:true, products:[]}) 
        // products:[] so that old data are cleared

        try {
            const response = await axios.get(`/product/category/${category}`);
            set({loading:false, products:response.data?.products || []})

            
        } catch (error) {
            set({loading:false, products:[]}) 
            // here products:[] clears products on error
            toast.error(error.response?.data?.message || `Failed to retrieve ${category} products`)
            
        }


    },
    getRecommendationProducts : async()=>{
        set({loading:true, recommendations:[]}) 
        // products:[] so that old data are cleared

        try {
            const response = await axios.get("/product/recommendations");
                console.log("API response for recommendations:", response.data); 

            set({loading:false, recommendations:response.data || []})

            
        } catch (error) {
              console.log("Recommendation API error:", error);
            set({loading:false, recommendations:[]}) 
            // here products:[] clears products on error
            toast.error(error.response?.data?.message || `Failed to retrieve recommendation products`)
            
        }


    },

      getSimilarProducts : async(productId)=>{
        set({loading:true, similarProducts:[]}) 
        // products:[] so that old data are cleared

        try {
            const response = await axios.get(`/product/similar/${productId}`);
                console.log("API response for similar Products:", response.data?.similarProducts); 

            set({loading:false, similarProducts:response.data?.similarProducts || []})

            
        } catch (error) {
              console.log("Similar Products API error:", error);
            set({loading:false, similarProducts:[]}) 
            // here products:[] clears products on error
            toast.error(error.response?.data?.message || `Failed to retrieve similar products`)
            
        }


    },

    getTopRatedRecentProducts: async()=>{
        set({loading:false, topRatedRecentProducts:[]});
        try {
            const response = await axios.get("/product/topRatedRecentProducts");
            set({loading:false, topRatedRecentProducts:response.data?.topRatedRecentProducts || []})

            
        } catch (error) {
            set({loading:false, topRatedRecentProducts:[]})
              toast.error(error.response?.data?.message || `Failed to retrieve top products`)
            
        }
    }


    
}))
