import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"


export const useCommentStore = create((set)=>({

    loading:false,
    comments:[],
    


    addComment : async(productId,text)=>{
        set({loading:true})

        try {
            const response = await axios.post(`/comment/${productId}`,text);
            set({loading:false, comment:response.data.comment});
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to add a comment");

            
        }



    },

    removeComment : async(productId,commentId)=>{
        set({loading:true})

        try {
            const response = await axios.delete(`/comment/${productId}/${commentId}`);
            set({loading:false});
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to remove  comment");

            
        }



    },

     getAllComments : async(productId)=>{
        set({loading:true, comments:[]})

        try {
            const response = await axios.get(`/comment/${productId}`);
            set({loading:false, comments:response.data.comments || []});
            
        } catch (error) {
            set({loading:false, comments:[]});
            toast.error(error.response?.data?.message || "Failed to fetch all comments");

            
        }



    },

        addLike : async(commentId)=>{
        set({loading:true})

        try {
            const response = await axios.post(`/comment/like/${commentId}`);
            set({loading:false});
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to Like");

            
        }


    },

      addunLike : async(commentId)=>{
        set({loading:true})

        try {
            const response = await axios.post(`/comment/unLike/${commentId}`);
            set({loading:false});
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to Like");

            
        }


    },






}))