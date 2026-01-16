import React, { useEffect } from "react";
import laptop from "../assets/laptop.webp";
import monitor from "../assets/monitor.webp"

import { HiPlus } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import WidthWrapper from "./WidthWrapper";


import { Link } from "react-router-dom";
import { useUserStore } from "../utils/useUserStore";
import CryingAnimation from "./CryingAnimation";
import Loading from "./loading";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";







const WishList = () => {

  const {products, getWishlistProducts, loading} = useUserStore();

  useEffect(()=>{
    getWishlistProducts();
  },[])

  const {removeFromWishlist} = useUserStore();

const removingFromWishlist = async (e,id)=>{
  e.stopPropagation();
  // console.log("removeWishlistId", id);
try {
    
  await removeFromWishlist(id);
  getWishlistProducts();

} catch (error) {
  console.log("Error removing from wishlist item", error);
  
}

}





 

  return (
   <>
   <WidthWrapper className = "">
    <section className = " section_style">
{
  products?.length >0?
    <h3 className = "w-full  uppercase ">  Wishlists</h3>:
    ""

}
  


     {/* cards container */}
     {
      loading?
       (<Loading/>)
      :
     
    
products?.length > 0 ?
       (
       <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4">
      {(products || []).map((item,i) => (
        // card wrapper
        <div key={i} className=" relative group flex flex-col w-full rounded-xl bg-secondary-color dark:bg-dark-secondary-color overflow-hidden cursor-pointer shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_5px_rgba(0,255,255,0.35)]
 ">
          <div  className="absolute z-10 top-2 right-2">
            <MdCancel onClick={(e)=>removingFromWishlist(e,item._id)} className="text-2xl sm:text-3xl rounded-lg text-dark-primary-color dark:text-secondary-color  hover:text-red-400 transition-colors duration-300 ease-in-out " />
          </div>
          {/* first div (image) */}
          <Link to = {`/product/${item._id}`} className="relative  w-full h-[200px] overflow-hidden">
            <img
              className="group-hover:scale-120 transition-transform duration-300 ease-in-out w-full h-full object-cover object-center"
              src={item.images?.[0]?.url || laptop}
              alt="product-image"
            />
            {/* rating */}
            <div className = "absolute bottom-0 right-0 flex flex-row items-center justify-center gap-1 border-t  shadow-lg  border-white rounded-xl px-2 py-2 cursor-auto">
              <FaStar className = "text-yellow-500"/>
              <span className = "text-xs">{item.rating}</span>
              </div>
          </Link>
          {/* 2nd div (descriptions) */}
          <div className = " flex flex-col gap-2 px-3 py-3 items-center">
            <div className="  relative overflow-x-hidden flex flex-row gap-7 ">
              {/* <span className=" ">
              </span>  this was for dot before title*/ }
               <span className = " line-clamp-1 font-semibold overflow-hidden font-poppins">{item.name}</span>
            </div>

            <span className = "">NRs.{item.price}</span>

      <div className = "w-full  flex flex-row justify-evenly items-center">
     
    
        
          <button className = " card-button rounded-xl flex flex-row  items-center gap-2 cursor-pointer ">
         
             <span className = "font-semibold text-sm ">Add To Cart</span>
              <IoMdCart className ="text-xl"/>  
             
            
             
            </button>

      </div>
          
 
      

      
            
          </div>
        </div>
      ))}
      </div>
       )
       :
       
          
      <div className = "h-screen pb-50 w-full flex flex-col gap-5 justify-center items-center">
        <h2 className = "">No products added in the wishlist</h2>
        <CryingAnimation/>
      </div>
      
      


     }
    
    </section>
   </WidthWrapper>
   
   </>
    
  );
};

export default WishList;
