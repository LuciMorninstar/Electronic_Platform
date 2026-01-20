import React, { useEffect } from 'react'
import Invoice from "../components/Invoice"
import { useParams } from 'react-router-dom'
import { useOrderStore } from '../utils/useOrderStore';
import toast from 'react-hot-toast';

const InvoicePage = () => {

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
    <div className="mt-20">
      <Invoice order={order} loading={loading}/>
    </div>
  )
}

export default InvoicePage;
