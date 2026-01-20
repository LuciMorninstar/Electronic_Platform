import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"
import { useNotificationStore } from "./useNotification";


export const useOrderStore = create((set)=>({
    loading:false,
    order:null,
    placingOrder: false,

    cashOnDelivery: async({formData,shippingCharges})=>{
        set({loading:true});
          set({ placingOrder: true });

           try {
            const response = await axios.post("/order",{formData,shippingCharges});
            set({loading:false, order:response.data?.order});
            toast.success("Order created Successfully");
            useNotificationStore.getState().getNotificationsById();
              set({ placingOrder: false });

        } catch (error) {
            set({loading:false, placingOrder:false});
            toast.error(error.response?.data?.message || "Failed to create an order");

            
        }


    },

    getMyOrders: async()=>{
        set({loading:true})

           try {
            const response = await axios.get("/order");
            set({loading:false, orders:response.data?.orders});
            toast.success("fetched My orders");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to get My Orders");

            
        }


    },

    getOrderDetailsById: async(id)=>{
        set({loading:true})

           try {
            const response = await axios.get(`/order/${id}`);
            set({loading:false, order:response.data?.order});
            toast.success("fetched deatils of order");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to get details of order");

            
        }


    },


    
}))
