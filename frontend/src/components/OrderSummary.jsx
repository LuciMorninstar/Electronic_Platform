import React from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import gsap from "gsap"
import { useLayoutEffect } from 'react';
import { useRef } from 'react';

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

// gsap

    const upper2Ref = useRef(null);
    const summaryBoxRef = useRef(null);
    const buttonRef = useRef(null);
    const summaryDetailRefs = useRef([]);

    const addToSummaryRef = (el)=>{
        if(el && !summaryDetailRefs.current.includes(el)){
            summaryDetailRefs.current.push(el);
        }
    }


       useLayoutEffect(()=>{

        if(!cartItems || cartItems.length<=0) return;

        const ctx = gsap.context(()=>{

            const tl = gsap.timeline({defaults:{ease:"power2.in"}});

            tl.fromTo(upper2Ref.current,
                {opacity:0,y:18},
                {opacity:1,y:0, duration:0.4}
            )
            tl.fromTo(summaryBoxRef.current,
                {opacity:0,y:18},
                {opacity:1,y:0, duration:0.4},
            )
            .fromTo(summaryDetailRefs.current,
                {opacity:0,y:18},
                {opacity:1,y:0,stagger:0.3, duration:0.6},"-=1.2"
            )
         
            .fromTo(buttonRef.current,
                {opacity:0,y:18,scale:0.4},
                {opacity:1,y:0, duration:0.6,scale:1},"-=0.2"
            )
            

        })
        return ()=>ctx.revert();

    },[cartItems])



  
  return   loading? <Loading/> :(
       <aside className = " w-full  lg:w-4/10 flex flex-col gap-y-7 rounded-lg  items-center  max-lg:px-4 ">
        
        <div className = "w-full  flex flex-row justify-between  border-b-1 py-5 border-gray-500 ">
            <h4 ref={upper2Ref} className='max-sm:text-sm'>Order Summary</h4>
            
        </div>
            {/* card */}
        <div ref={summaryBoxRef}  className = "w-full flex flex-col gap-5 px-10 py-5 bg-tertiary-color shadow-md dark:bg-dark-secondary-color rounded-lg">
          <div ref={addToSummaryRef} className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2 max-sm:text-xs">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>

          </div>

          <div ref={addToSummaryRef} className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2 max-sm:text-xs">
            <span>Original Price</span>
            <span>{grandTotal}</span>

          </div>
       
          <div ref={addToSummaryRef} className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2 max-sm:text-xs">
            <span>Total Price</span>
            <span>{grandTotal}</span>

          </div>

          <Link ref={buttonRef} to ="/checkout" className = "w-full outline-none bg-color-teal-500 hover:bg-teal-600 transition-colors duration-200 ease-in cursor-pointer text-font-white text-center px-3 py-3 rounded-lg">
            Proceed to Checkout

          </Link>

       
        </div>
        {/* card */}

        </aside>
  )
}

export default OrderSummary