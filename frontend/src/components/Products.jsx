import React, { useEffect } from "react";
import laptop from "../assets/laptop.webp";
import monitor from "../assets/monitor.webp"

import { HiPlus } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import { FaRegBookmark, FaStar } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import WidthWrapper from "./WidthWrapper";
import gsap from "gsap"
import { useRef } from "react";
import { useProductStore } from "../utils/useProductStore";
import { Link } from "react-router-dom";
import { useUserStore } from "../utils/useUserStore";
import { useCartStore } from "../utils/useCartStore";
import { Loader } from "lucide-react";
import Loading from "./Loading"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";


gsap.registerPlugin(ScrollTrigger); // ✅ register ScrollTrigger



const Products = () => {

  const {products, loading} = useProductStore();
  const {addToWishlist} = useUserStore();
  const {addToCart} = useCartStore();
  const {getAllCartProducts} = useCartStore();





const addingToWishlist = async(e,id)=>{
  e.stopPropagation();
  // console.log("WishlistId", id);s
  await addToWishlist(id);
  

}

const addingToCart =async (e,id)=>{
  e.stopPropagation();
  console.log("CartItemId", id);
  await addToCart(id);
  getAllCartProducts();

}


  const cardRefs = useRef([]);

  // attach each card ref
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  // GSAP animation 
  useLayoutEffect(() => {
    if (cardRefs.current.length > 0) {

      cardRefs.current.forEach((card)=>{
        gsap.fromTo(card,{
          opacity:0,
          y:80,
          scale:0.8
        },
          {
          opacity:1,
          y:0,
          scale:1,
          duration:0.8,
          ease:"power2.inOut",
          scrollTrigger:{
            trigger:card,
            // grid:[4,4],
        start: "top bottom-=100",
        toggleActions:"play none none reverse"
        //  scrub: true,  
        // markers:true

          }

        })
      })

    
    }
  }, [products]);





  return (
   <>
   <WidthWrapper className = "">
    <section className = " section_style">
    <h3 className = "uppercase ">Products</h3>
     {/* cards container */}
     <div  className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-3 xl:gap-x-2 gap-y-4">
      {(products || []).map((item,i) => (
        // card wrapper
        <div ref={addToRefs} key={i} className=" relative group flex flex-col w-full rounded-sm bg-secondary-color dark:bg-dark-secondary-color overflow-hidden cursor-pointer shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_5px_rgba(0,255,255,0.35)]
 ">
          {/* <div className="absolute z-10 top-3 right-3">
            <HiPlus className="card-icon" />
          </div> */}
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
              <span className = "text-xs">{item.averageRating}</span>
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

            <button onClick={(e)=>addingToWishlist(e,item._id)} disabled={loading} className = " card-button rounded-full flex flex-row  items-center gap-2 cursor-pointer ">
            {loading? <Loading/> :
              <span className = "font-semibold text-md "><FaRegBookmark/></span>
            }
             
            </button>
     
    
          <button onClick={(e)=>addingToCart(e,item._id)} className = " card-button rounded-xl flex flex-row  items-center gap-2 cursor-pointer ">
            {loading?
            <Loading/>:
            <>
             <span className = "font-semibold text-sm ">Add To Cart</span>
              <IoMdCart className ="text-xl"/>  
              </>
            }
             
            </button>

            
      

      </div>
          
 
      

      
            
          </div>
        </div>
      ))}
    </div>
    </section>
   </WidthWrapper>
   
   </>
    
  );
};

export default Products;
