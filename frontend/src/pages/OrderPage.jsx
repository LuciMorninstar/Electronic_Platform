import React from 'react'
import WidthWrapper from '../components/WidthWrapper'
import MyOrders from '../components/MyOrders'

const OrderPage = () => {
  return (
   <WidthWrapper>
      <section className = " w-full flex flex-col items-center  mt-26 ">

        <MyOrders/>


      </section>

   </WidthWrapper>
  )
}

export default OrderPage