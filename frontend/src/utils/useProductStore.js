import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"

export const useProductStore = create((set)=>({
    loading:false,
    isSearching:false,
    products:[],
    recommendations:[],
    similarProducts:[],
    topRatedRecentProducts:[],
    filteredProducts:[],
    filtering:false,
    comparing:false,

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
    toggleFeaturedProduct : async(id)=>{
        set({loading:true})

        try {
            const response = await axios.patch(`/product/toggle-featured/${id}`);
            const updatedProduct = response.data?.toggledProduct;

            set((state)=>({
                loading:false,
                products:state.products.map((product)=>
                product._id === id? {...product, isFeatured:updatedProduct.isFeatured}:product
            ),
            }));
            toast.success("Toggled featured product successfully");

       
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to  toggle featured product");
            
        }
    },

    
    isFeaturedProduct : async(id)=>{
        set({loading:true})

        try {
            const response = await axios.get(`/product/isFeaturedProduct/${id}`);
            set({loading:false, isFeaturedProduct:response.data?.isFeaturedProduct || []});
            toast.success("Is featured Product");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Is featured product check failed");
            
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
    getRecommendationProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/product/recommendations");

      // Ensure recommendations is always an array
      const recommendationsArray = response.data?.recommendations || [];

      set({
        loading: false,
        recommendations: recommendationsArray,
      });

    //   toast.success("Recommendations fetched successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to fetch recommendations"
      );
    }
  },

   getSimilarProducts: async (productId) => {
  set({ loading: true, similarProducts: [] });

  try {
    const response = await axios.get(`/product/similar/${productId}`);
    console.log("API response for similar Products:", response.data?.similarProducts);
    set({ loading: false, similarProducts: response.data?.similarProducts || [] });
  } catch (error) {
    console.log("Error fetching similar products:", error);
    set({ loading: false, similarProducts: [] });
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
    },

     filterProducts: async(filters)=>{
        set({filtering:true, filteredProducts:[]});
        try {
            const response = await axios.get("/product/filter",{params:filters});
            set({filtering:false, filteredProducts:response.data?.filteredProducts || []})

            
        } catch (error) {
            set({filtering:false, filteredProducts:[]})
              toast.error(error.response?.data?.message || `Failed to filter Products`)
            
        }
    },

  compareTo: async (id) => {
  set({
    comparing: true,
    compareToId: id,        
    compareToProduct: null 
  });

  try {
    const response = await axios.get(`/product/compareTo/${id}`);

    set({
      comparing: false,
      compareToProduct: response.data?.compareToProduct || null
    });

    toast.success("Compare product fetched");
  } catch (error) {
    set({
      comparing: false,
      compareToProduct: null
    });

    toast.error(
      error.response?.data?.message || "Failed to get compare product"
    );
  }
},

//just some err


    
}))


