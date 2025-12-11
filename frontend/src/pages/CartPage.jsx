import React from 'react'
import Cart from '../components/Cart'
import OrderSummary from '../components/OrderSummary'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const CartPage = () => {
  return (
    <section className = "w-full xl:w-7xl   mx-auto mt-30 lg:mt-32 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
       


      

        <Cart/>
        <OrderSummary/>



     </section>
  )
}

export default CartPage