import React from 'react'
import accept from "../assets/accept.png"
import cancelled from "../assets/cancelled.png"
import outForDelivery from "../assets/outfordelivery.webp"
import delivered from "../assets/delivered.png"
import ordered from "../assets/ordered.png"
import { Check } from 'lucide-react'
import { Ban } from 'lucide-react'
import gsap from "gsap"
import { useLayoutEffect } from 'react'
import { useRef } from 'react'



const OrderTrack = ({order}) => {

    const approvedAt = order?.statusHistory?.find(item=> item.state === "approved")?.at ;
    const outForDeliveryAt = order?.statusHistory?.find(item=> item.state === "outForDelivery")?.at;
    const deliveredAt = order?.statusHistory?.find(item=> item.state === "delivered")?.at ;
                           
    const cancelledAt = order?.statusHistory?.find(item=> item.state === "cancelled")?.at ;


    // gsap

    const topRef = useRef(null);
    const trackingRef = useRef(null);
    const shippingRef = useRef(null);
    const productRef = useRef(null);
    const noteRef = useRef(null);

    useLayoutEffect(()=>{

  if(!order || order.length<=0) return;

  const ctx = gsap.context(()=>{

    const tl = gsap.timeline({defaults:{ease:"power3.out"}})

    tl.fromTo(topRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,scale:1}
    )
    tl.fromTo(trackingRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.7"
    )
    tl.fromTo(shippingRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.5"
    )
    tl.fromTo(productRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.5"
    )
    tl.fromTo(noteRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.3"
    )

  })
  return ()=> ctx.revert();


},[order])


                           

    
  return (
    <section className='w-full bg-tertiary-color dark:bg-dark-secondary-color px-5 py-5 flex flex-col gap-5'>
        <div ref={topRef} className='flex flex-col gap-3 between bg-secondary-color dark:bg-dark-search-bar-bg px-5 py-3 rounded-lg'>

            <div className='flex flex-col justify-between gap-3'>
            <span className='font-bold text-lg'>Order ID: {order?.orderNo}</span>
            <span className='font-bold text-lg'>Total Amount : Rs. {order?.payment?.amountPaid.toLocaleString()}</span>

            </div>
            
        </div>

    <div className='w-full flex flex-col lg:flex-row gap-5'>   

      <aside ref={trackingRef} className = " w-full lg:w-1/2 bg-secondary-color dark:bg-dark-search-bar-bg p-5">
            {cancelledAt ?
            <div className='h-screen w-full flex flex-col gap-5 items-center justify-center pb-30'>
                <Ban className=' text-red-500 size-60' />
                <h4>Order Cancelled on {cancelledAt} by admin.</h4>

            </div> :
           
         <div className='flex  flex-col gap-10'>
            <h4>Tracking Details</h4>
                
                {/* Ordered */}
                <div className='relative pl-16 flex flex-col gap-4'>
                    <div className='flex flex-row gap-20 items-center '>
                        <div className=''>
                            <img src={ordered} className='w-20 h-20'/>
                        </div>
                        <span>Ordered at {order?.createdAt}</span> 
                    </div>
                    <span>Ordered </span>

                    <p className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 bg-green-500 flex flex-row items-center justify-center'><Check />
                    </p>

                </div>
                {/* oredered ends */}

                {/* accept */}

                

                <div className='relative pl-16 flex flex-col gap-4'>
                    <div className='flex flex-row gap-20 items-center '>
                        <div className=''>
                            <img src={accept} className='w-20 h-20'/>
                        </div>
                        {approvedAt ?
                         <span>
                            Approved at {approvedAt}
                        </span> :""}
                       
                    </div>
                    <span>Approved </span>

                    <p className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-8 h-8  flex flex-row items-center justify-center ${approvedAt? "bg-green-500":"bg-gray-200"}`}><Check />
                    </p>

                </div>
                {/* accept ends */}

                {/* outFordelivery */}
                <div className='relative pl-16 flex flex-col gap-4'>
                    <div className='flex flex-row gap-20 items-center '>
                        <div className=''>
                            <img src={outForDelivery} className='w-20 h-20'/>
                        </div>
                        {outForDeliveryAt ?
                         <span>
                            Out For Delivery at {outForDeliveryAt}
                        </span> :""}
                       
                    </div>
                    <span>Out For Delivery </span>

                    <p className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-8 h-8  flex flex-row items-center justify-center ${outForDeliveryAt? "bg-green-500":"bg-gray-200"}`}><Check />
                    </p>

                </div>
                {/* outFordelivery ends */}
                
                {/* delivered */}
              <div className='relative pl-16 flex flex-col gap-4'>
                    <div className='flex flex-row gap-20 items-center '>
                        <div className=''>
                            <img src={delivered} className='w-20 h-20'/>
                        </div>
                        {deliveredAt ?
                         <span>
                            Delivered/ Order Completed at {deliveredAt}
                        </span> :""}
                       
                    </div>
                    <span>Delivered </span>

                    <p className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-8 h-8  flex flex-row items-center justify-center ${deliveredAt? "bg-green-500":"bg-gray-200"}`}><Check />
                    </p>

                </div>
                {/* delivered ends */}

            

          </div>

           }


      </aside>

   
      

      <aside className='flex flex-col gap-5'>
            <div ref={shippingRef} className='flex flex-col gap-4 bg-secondary-color dark:bg-dark-search-bar-bg p-5'>
                    <h4>Shipping Info</h4> 

                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold'>{order?.deliveryDetails?.phoneNo || ""}</span>
                        <span className='font-semibold'>{order?.deliveryDetails?.fullName || ""}</span>
                    <span>{[order?.deliveryDetails?.region, order?.deliveryDetails?.city, order?.deliveryDetails?.area, order?.deliveryDetails?.colony, order?.deliveryDetails?.houseNo, order?.deliveryDetails?.address].filter(Boolean).join(', ')}</span>

                    </div>


                </div>

                {/* product summary */}

                                
    <div ref={productRef} className = "flex flex-col gap-0 bg-primary-color dark:bg-dark-search-bar-bg px-3 lg:px-10 py-8 rounded-lg ">
        <h4 className = "pb-5" >Product Overview</h4>
    {
        order?.items?.map((item,i)=>(
            // card
            <div key={i} className = "relative overflow-hidden group w-full  flex flex-row items-center  even:bg-tertiary-color odd:bg-secondary-color dark:even:bg-dark-secondary-color dark:odd:bg-dark-tertiary-color py-3 px-5  ">
            
            

                    {/* left div   */}
                <div className = " w-full  flex flex-row gap-3 items-center">
                        {/* for image */}
                {/* <div className = "w-20 h-16 rounded-lg overflow-hidden ">
                    <img className = "w-full group-hover:scale-120 transition-all duration-300 ease-in h-full object-cover object-center" src={item.product?.images?.[0]?.url} alt="image"/>
                </div> */}
                {/* /for image */} 
                <div>
                    <span className = "text-sm sm:text-base lg:text-sm font-semibold font-poppins">{item.name.slice(0,27)+"..."}</span>
                </div>

                </div>
                {/* /left div */}

                {/* right div */}
                <div className = "flex flex-row gap-5 items-center">
                    {/* for quantity */}
                    <div className='flex flex-row gap-0'>
                    

                   <span className = " text-sm lg:text-sm">{item?.quantity} </span>
                    
                
                    </div>
                    {/* quantity ends */}

                    {/* for price */}
                    <span className = "text-sm lg:text-sm">Rs. {item?.price.toLocaleString()}</span>
                    {/* /for price */}

                    {/* for total price */}
                    <span className = "text-sm lg:text-sm">Rs.{(item.total).toLocaleString() }</span>

s
                    


                </div>

                {/* /right div */}

                


            </div>
        ))

    }
    </div>

        

      </aside>

    </div>   

    <span ref={noteRef} className='font-semibold mt-10 flex mx-auto text-center px-5 py-2 bg-color-teal-500 w-max rounded-lg'>* Inside valley 1-2 days for delivery. Outside valley may take 3-5 business days for Delivery</span>

    </section>
  )
}

export default OrderTrack