import { axiosInstance as axios } from "./axios";
import {create} from "zustand"
import {toast} from "react-hot-toast"
import { useNotificationStore } from "./useNotification";


export const useOrderStore = create((set,get)=>({
    loading:false,
    order:null,
    placingOrder: false,
    orders:[],
    gettingAllOrders:false,

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

    getAllOrders: async()=>{
        set({gettingAllOrders:true});

        try {
            const response = await axios.get("/order/all-orders");
            set({gettingAllOrders:false, orders:response.data?.orders || []});
            
        } catch (error) {
            set({gettingAllOrders:false});
            toast.error(error.response?.data?.message || "Failed to fetch all orders");
            
        }
    },

    getInvoiceByOrderId: async(orderId)=>{
        set({loading:true})

        try {
            const response = await axios.get(`/order/admin/invoice/${orderId}`);
            set({loading:false, orderDetailsByInvoice:response.data?.orderDetailsByInvoice || null});
            toast.success("fetched invoice details of order");
            
        } catch (error) {
            set({loading:false});
            toast.error(error.response?.data?.message || "Failed to get invoice details of order");
            
        }


    },

    updateOrderStatus: async(id,status)=>{
        set({updatingStatus:true})

        try {
            const response = await axios.patch(`/order/status/${id}`,
                {status}
            );
            const updatedOrder = response.data?.order;

            const orders = get().orders.map(order=>
                order._id === id? updatedOrder:order
            );

            // get().orders takes the current state value of orders and if orderid matches chnage just that thing in the orders

            set({orders:orders, updatingStatus:false});
            toast.success(`Updated order status to ${status} `);

            
        } catch (error) {
            set({ updatingStatus: false });
            toast.error(error.response?.data?.message || "Failed to get invoice details of order");
            
        }
        

    }


    
}))
