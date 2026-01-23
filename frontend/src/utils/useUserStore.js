import {axiosInstance as axios}   from "./axios"
import {create} from "zustand"
import {toast} from "react-hot-toast"



export const useUserStore = create((set,get)=>({
    gettingUsers:false,
    users:[],
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
    },


    getAllUsers:async()=>{
        set({gettingUsers:true})

        try {
            const response = await axios.get("/user/all-users");
            set({users:response.data?.users, gettingUsers:false});
            // toast.success("Successfully fetched all users");
            
        } catch (error) {
            set({gettingUsers:false});
            toast.error(error.response?.data?.message || "Failed to fetch users");
            
        }



    },

    deleteUser:async(id)=>{
        set({deletingUser:true});

        try {
            await axios.delete(`/user/delete-user/${id}`);
            set({deletingUser:false});
            toast.success("User deleted successfully");
            get().getAllUsers();
            
            
        } catch (error) {
            set({deletingUser:false});
            toast.error(error.response?.data?.message || "Failed to delete user");
            
        }
    },

    getPaidUsers:async()=>{
        set({gettingPaidUsers:true, paidUsers:[]})

        try {
            const response = await axios.get("/user/paid-users");
            set({paidUsers:response.data?.paidUsers || [], gettingPaidUsers:false});
            // toast.success("Successfully fetched all paidUsers");
            
        } catch (error) {
            set({gettingPaidUsers:false});
            toast.error(error.response?.data?.message || "Failed to fetch paid users");
            
        }



    },

        getCurrentUser:async()=>{

            try {
                const response = await axios.get("/user/getCurrentUser");
                set({ user:response.data?.user ,currentUser:response.data?.user});

                //so to make the user not get null (looks like user is logout but we set cookie for the accessToken so user is still there but after refreshing the user gets erased from zustand memeory and gets null value so what we are doing here is that in app.jsx i am fetching the getCurrentUser in useEffect on app mount to get the currentUser right. so that user is then stored in the user: to get the user, hence solves the user logout problem )
                
            } catch (error) {
                console.log("No logged-in user or error fetching",error.message);
                set({user:null, currentUser: null });
                
            }

        },


    addToWishlist: async(id)=>{
            set({loading:true})

            try {
                 await axios.patch(`/user/wishlist/add/${id}`);
                set({loading:false});
                toast.success("Added to wishlist");

                
            } catch (error) {
                set({loading:false});
                toast.error(error.response?.data?.message || "Failed to add to wishlist");
                
            }

    },

    removeFromWishlist: async(id)=>{
            set({loading:true})

            try {
                 await axios.patch(`/user/wishlist/remove/${id}`);
                set({loading:false});
                toast.success("Removed from wishlist items");

                
            } catch (error) {
                set({loading:false});
                toast.error(error.response?.data?.message || "Failed to remove from wishlist");
                
            }

    },

    getWishlistProducts : async()=>{
        set({loading:true});
        try {
            const response = await axios.get("/user/wishlist/products");
            set({loading:false,products:response.data.products});
            // toast.success("Successfully fetched wishlist items");
            
            
        } catch (error) {
            set({loading:false});
            toast.error(error.reponse?.data?.message || "Failed to fetch wishlist items");
            
        }

    }






}))



