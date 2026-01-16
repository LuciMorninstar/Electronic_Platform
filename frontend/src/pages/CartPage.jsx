import React from 'react'
import Cart from '../components/Cart'
import OrderSummary from '../components/OrderSummary'
import { useEffect } from 'react';
import { useCartStore } from '../utils/useCartStore';



const CartPage = () => {

      const {getAllCartProducts,loading, cartItems} = useCartStore();

          useEffect(()=>{
            getAllCartProducts();
          },[])
      
  
  return (
    <section className = "w-full xl:w-7xl   mx-auto mt-30 lg:mt-32 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
       


      

        <Cart cartItems={cartItems} loading = {loading}/>
        <OrderSummary cartItems={cartItems} loading={loading}/>



     </section>
  )
}

export default CartPage