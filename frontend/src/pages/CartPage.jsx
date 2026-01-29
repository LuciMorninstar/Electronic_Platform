import React from 'react'
import Cart from '../components/Cart'
import OrderSummary from '../components/OrderSummary'
import { useEffect } from 'react';
import { useCartStore } from '../utils/useCartStore';
import CryingAnimation from '../components/CryingAnimation';



const CartPage = () => {

      const {getAllCartProducts,loading, cartItems} = useCartStore();

          useEffect(()=>{
            getAllCartProducts();
          },[])
      
  
  return (
    <section className = "w-full xl:w-7xl   mx-auto mt-30 lg:mt-32 flex flex-col lg:flex-row gap-5 lg:gap-10 lg:px-5 ">
       


      
{
  !cartItems || cartItems.length === 0 ?
  <div className = "w-full h-screen flex flex-col gap-10 justify-center items-center pb-60">
    <CryingAnimation/>
    <h3>No cart items yet!</h3>
    </div>:

  <>
        <Cart cartItems={cartItems} loading = {loading}/>
        <OrderSummary cartItems={cartItems} loading={loading}/>
        </>

}
        



     </section>
  )
}

export default CartPage