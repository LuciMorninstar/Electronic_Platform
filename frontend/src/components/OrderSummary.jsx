import React from 'react'
import Loading from './loading';
import { Link } from 'react-router-dom';

const OrderSummary = ({cartItems, loading}) => {

const grandTotal = cartItems?.reduce(
  (total, item) => total + (item.product?.price || 0) * item.quantity,
  0
);

const totalQuantity = cartItems?.reduce((sum,item)=> sum + item.quantity , 0);
     // 0 is initial value here total is an accumulator

//     // start
// total = 0

// // first item
// total = 0 + (price * quantity)

// // second item
// total = previousTotal + (price * quantity)

  
  return   loading? <Loading/> :(
       <aside className = " w-full  lg:w-4/10 flex flex-col gap-y-7 rounded-lg  items-center  max-lg:px-4 ">
        
        <div className = "w-full  flex flex-row justify-between  border-b-1 py-5 border-gray-500 ">
            <h4>Order Summary</h4>
            
        </div>
            {/* card */}
        <div className = "w-full flex flex-col gap-5 px-10 py-5 bg-tertiary-color shadow-md dark:bg-dark-secondary-color rounded-lg">
          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>

          </div>

          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
            <span>Original Price</span>
            <span>{grandTotal}</span>

          </div>
       
          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
            <span>Total Price</span>
            <span>{grandTotal}</span>

          </div>

          <Link to ="/checkout" className = "w-full outline-none bg-color-teal-500 hover:bg-teal-600 transition-colors duration-200 ease-in cursor-pointer text-font-white text-center px-3 py-3 rounded-lg">
            Proceed to Checkout

          </Link>

       
        </div>
        {/* card */}

        </aside>
  )
}

export default OrderSummary