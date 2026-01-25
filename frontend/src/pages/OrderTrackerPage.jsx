import React from 'react'
import WidthWrapper from '../components/WidthWrapper'
import OrderTrack from '../components/OrderTrack'

import { useOrderStore } from '../utils/useOrderStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useUserStore } from '../utils/useUserStore';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderTrackerPage = () => {

  const {id} = useParams();
  const {order, loading, getOrderDetailsById} = useOrderStore();

  useEffect(() => {
  if (id) {
    getOrderDetailsById(id)
      .then((fetchedOrder) => console.log(fetchedOrder, "Fetched order from store"));
  } else {
    toast.error('No ID provided');
  }
}, [id, getOrderDetailsById]);

useEffect(() => {
  if (order) console.log(order, "Order updated in state");
}, [order]);


  return (
        <WidthWrapper>
              <section className = " max-w-7xl mx-auto min-h-screen flex flex-col gap-5 items-center  mt-20 ">
            
             {order && (
                <Link
                    to={`/invoice/${order._id}`}
                    className="mt-1 bg-color-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                    View Details
                </Link>
                )}


                <OrderTrack order = {order}/>

              </section>

        </WidthWrapper>
  
  )
}

export default OrderTrackerPage