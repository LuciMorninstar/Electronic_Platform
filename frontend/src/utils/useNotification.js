import { axiosInstance as axios } from "./axios";

import { create } from "zustand"
import {toast} from "react-hot-toast"


export const useNotificationStore = create((set)=>({

    loading:false,
      notifications: [],

    
    getNotificationsById : async()=>{
        set({loading:true});

        try {
            const response = await axios.get("/notification");
            set({loading:false, notifications:response.data?.notifications || []});
            // toast.success("Successfully fetched notifications");
            
        } catch (error) {
             set({loading:false});
                toast.error(error.response?.data?.message || "Failed to fetch notifications");
                
            
        }
    },

}))
