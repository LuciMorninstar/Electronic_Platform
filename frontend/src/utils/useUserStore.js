import {axiosInstance as axios}   from "./axios"
import {create} from "zustand"
import {toast} from "react-hot-toast"

export const useUserStore = create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    signUp : async({fullName, email, password, confirmPassword})=>{

        set({loading:true})
        if(password !== confirmPassword){
            set({loading:false});
            return toast.error("Passwords do not match!");
        }

        try {
            const response = await axios.post("/auth/signup", {fullName, email, password, confirmPassword});
            set({user:response.data.user, loading:false});
            toast.success("Successfully created an account");
            

            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message ||"An error occured while signing up" );
            
        }

    },

    signIn : async({email, password})=>{
        set({loading:true})

        try {
            const response = await axios.post("/auth/login", {email,password});
            set({user:response.data.user, loading:false});
            toast.success("Logged In Successfully");

            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "An error occured while logging In");
            
        }

    },

    signOut : async()=>{
        set({loading:true})

        try {
            const response = await axios.post("/auth/logout");
            set({user:null, loading:false});
            toast.success("Logged Out Successfully");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "An error occured while logging out");
            
        }
    }






}))



