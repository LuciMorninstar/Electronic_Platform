
import { RiSubtractFill } from "react-icons/ri";
import { IoAdd, IoArrowBack } from 'react-icons/io5';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';


import { Loader } from "lucide-react";
import { useCartStore } from "../utils/useCartStore";
import { useState } from "react";
import Loading from "./Loading";
import gsap from "gsap"
import { useLayoutEffect } from "react";
import { useRef } from "react";





const Cart = ({cartItems, loading}) => {

    


    const {removeFromCart, getAllCartProducts,incQuantityOfAProductInCart, decQuantityOfAProductInCart} = useCartStore(); 

    const removingFromCart =async (e,id)=>{
        e.preventDefault();
       await removeFromCart(id);
       getAllCartProducts();



    }

    const increasingQuantityOfAProductInCart =async (e,id)=>{
        e.preventDefault();
       await incQuantityOfAProductInCart(id);
       getAllCartProducts();



    }
    const decreasingQuantityOfAProductInCart =async (e,id)=>{
        e.preventDefault();
       await decQuantityOfAProductInCart(id);
       getAllCartProducts();



    }

    // gsap

    const upperRef = useRef(null);
    const headingRef = useRef(null);
    const cartRefs = useRef([]);


    const addToCartRef = (el)=>{
        if(el && !cartRefs.current.includes(el)){
            cartRefs.current.push(el);
        }
    }

    useLayoutEffect(()=>{

        if(!cartItems || cartItems.length<=0) return;

        const ctx = gsap.context(()=>{

            const tl = gsap.timeline({defaults:{ease:"power2.in"}});

            tl.fromTo(upperRef.current,
                {opacity:0,y:18},
                {opacity:1,y:0, duration:0.4}
            )
            .fromTo(headingRef.current,
                {opacity:0,y:18},
                {opacity:1,y:0, duration:0.4},"-=0.1"
            )
            .fromTo(cartRefs.current,
                {opacity:0,y:18},
                {opacity:1,y:0,stagger:0.3, duration:0.6},"-=1.8"
            )
            

        })
        return ()=>ctx.revert();

    },[cartItems])





  return (

    loading? ( <Loading/>):
    (
    
    <aside className = " w-full xl:w-6/10 max-xl:px-5 flex flex-col gap-y-7 rounded-lg min-h-screen ">
        
        <div ref={upperRef} className = "w-full flex flex-row justify-between  border-b-1 py-5 border-gray-500 ">
            <h4 className="max-sm:text-sm">Shopping Cart</h4>
            <h4 className = 'flex max-sm:text-sm flex-row gap-1'>{cartItems?.length} Items
            </h4>
        </div>

<div ref={headingRef} className = " max-sm:hidden flex flex-row">
        <div className = "w-1/2">
            <span className = "uppercase max-sm:text-sm ">Product Details</span>
        </div>
        <div className = "w-1/2 flex flex-row gap-10 pr-12 justify-center">
            <span className = "uppercase ">quantity</span>
            <span className = "uppercase ">price</span>
            <span className = "uppercase ">Total</span>
        </div>
</div>



      <div className = "flex flex-col gap-2">
        {
            cartItems?.map((item,i)=>(
                // card
                <div ref={addToCartRef} key={i} className = "relative overflow-hidden group w-full rounded-xl flex flex-row max-sm:flex-col items-center shadow-md bg-tertiary-color dark:bg-dark-secondary-color ">
                    {/* absolute delete */}
                  <button onClick={(e)=>removingFromCart(e,item.product?._id)} className ="absolute top-3 right-3 cursor-pointer hover:text-red-500 active:text-red-500">
                  <AiOutlineDelete className = "text-base lg:text-xl" />
                  </button>

                      {/* left div   */}
                    <div className = " w-1/2  flex flex-row max-sm:flex-col gap-3 items-center">
                           {/* for image */}
                    <div className = "w-50 h-40  rounded-lg overflow-hidden ">
                        <img className = "w-full sm:group-hover:scale-120 transition-all duration-300 ease-in h-full object-cover object-center" src={item.product?.images?.[0]?.url} alt="image"/>
                    </div>
                    {/* /for image */} 
                    <div>
                        <span className = "max-sm:text-xs text-sm sm:text-base lg:text-md font-semibold font-poppins">{item.product?.name.slice(0,27)+"..."}</span>
                    </div>

                    </div>
                    {/* /left div */}

                    {/* right div */}
                    <div className = "flex flex-row max-sm:py-2 gap-5 items-center">
                        {/* for quantity */}
                        <div className='flex flex-row gap-0'>
                        <button onClick = {(e)=>decreasingQuantityOfAProductInCart(e,item.product?._id)} className = "px-3 py-2 text-xl cursor-pointer">
                            <RiSubtractFill/>
                        </button>

                        <input className = " text-sm border-2 border-font-light-white w-8 h-8 text-center rounded-lg" type="text" id="quantity" onChange={(e)=>e.target.value } value={item.quantity} />
                       
                        <button onClick={(e)=>increasingQuantityOfAProductInCart(e,item.product?._id)}  className = "px-3 py-2 text-xl cursor-pointer">
                            <IoAdd/>
                        </button>
                        </div>
                        {/* quantity ends */}

                        {/* for price */}
                        <span className = "text-sm max-sm:text-xs">Rs. {item.product?.price.toLocaleString()}</span>
                        {/* /for price */}

                        {/* for total price */}
                        <span className = "text-sm max-sm:text-xs">Rs.{(item.quantity * item.product?.price).toLocaleString() }</span>


                       


                    </div>

                    {/* /right div */}

                 


                </div>
            ))

        }
        </div>

        {/* /card finished */ }


          {/* link of backing */}
        <Link to ="/" className = "group w-max flex flex-row gap-2 items-center cursor-pointer">
          <span><IoArrowBack className ="group-hover:text-color-teal-400 active:text-color-teal-400 group-hover:-translate-x-3 animation-all duration-100 ease-in"/></span>
          <span className = "group-hover:text-color-teal-400 active:text-color-teal-400">Continue Shopping</span>
        </Link>



        
    </aside>
    )
  )
}

export default Cart