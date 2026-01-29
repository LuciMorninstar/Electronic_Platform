import React, { useEffect } from 'react'
import { useOrderStore } from '../utils/useOrderStore'
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import CryingAnimation from './CryingAnimation';
import gsap from "gsap"
import { useLayoutEffect } from 'react';
import { useRef } from 'react';

const MyOrders = () => {

    const {getMyOrders, loading,orders} = useOrderStore();

    useEffect(()=>{
        getMyOrders();
    },[])

    // gsap

    const headingRef = useRef(null);
    const ordersRef = useRef([]);

    const addToOrdersRef = (el)=>{
      if(el && !ordersRef.current.includes(el)){
        ordersRef.current.push(el);
      }
    }

    useLayoutEffect(()=>{

      const ctx = gsap.context(()=>{

        const tl = gsap.timeline({defaults:{ease:"power2.inOut"}});

        tl.fromTo(headingRef.current,
          {opacity:0,y:30},
          {opacity:1,y:0,duration:0.6,ease:"power2.in"}
        )
        .fromTo(ordersRef.current,
          {opacity:0,x:-300},
          {opacity:1,x:0,duration:0.6,stagger:0.4},"-=0.1"
        )
        


      })

      return ()=> ctx.revert();

    },[orders])


    



  return (
    <div className = "flex flex-col gap-5">

    <h3 ref={headingRef} className = "text-center">My Orders</h3>

{
    !orders || orders.length === 0?
    
    <div className = "w-full h-screen flex flex-col gap-10 justify-center items-center pb-60">
    <CryingAnimation/>
    <h3>No orders yet!</h3>
    </div>
    :

     <div className="max-w-7xl mx-auto p-4 flex flex-col gap-2 overflow-hidden min-h-screen">
      {orders.map(order => (
        <div
          ref={addToOrdersRef}
          key={order?._id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-xl transition-shadow duration-300"
        >
          {/* Product preview */}
          <div className="flex items-center gap-4">
            {order?.items?.length > 0 && order.items[0]?.productId?.images?.length > 0 && (
            <img
              src={order.items[0].productId.images[0].url}
              alt={order.items[0].name}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border"
            />
          )}
            <div>
              <p className="font-semibold text-lg">{order?.items[0]?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Qty: {order?.items[0]?.quantity} | Rs {order?.items[0]?.total}
              </p>
            </div>
          </div>

          {/* Order info */}
          <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            <p className="font-medium">Order No: {order?.orderNo}</p>
            <p className="text-sm">Placed: {new Date(order?.createdAt).toLocaleDateString()}</p>
            <p className="text-sm">Total: Rs {order?.payment?.amountPaid}</p>
          </div>

          {/* Status & button */}
          <div className="flex flex-col md:items-end gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold 
                ${order?.currentStatus === "approved" ? "bg-yellow-200 text-yellow-800" :
                  order?.currentStatus === "delivered" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}
            >
              {order?.currentStatus}
            </span>
            {/* <Link
              to={`/invoice/${order._id}`}
              className="mt-1 bg-color-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-lg font-medium transition-colors"
            >
              View Details
            </Link> */}
            <Link
              to={`/track-order/${order?._id}`}
              className="mt-1 bg-color-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-lg font-medium transition-colors"
            >
              Track Order
            </Link>
          </div>
        </div>
      ))}
    </div>

    }

    </div>
  )

    


  
  
}

export default MyOrders