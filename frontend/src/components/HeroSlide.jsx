import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import { SplitText } from 'gsap/all';
import Loading from './Loading';
import { useUserStore } from '../utils/useUserStore';
import { useCartStore } from '../utils/useCartStore';



const HeroSlide = ({item, loading}) => {

  const {addToWishlist} = useUserStore();
  const{addToCart} = useCartStore();

 const addingtoWishlist = (e,id)=>{
  e.stopPropagation();

  addToWishlist(id);


 }
 const addingToCart = (e,id)=>{
  e.stopPropagation();

  addToCart(id);


 }
  
  
  
  // useGSAP(()=>{
    
  //   gsap.registerPlugin(SplitText);

  //   document.fonts.ready.then(()=>{
  //         let SplitHeroTitle = new SplitText(".title",{
  //     type:"words"
  //   });
  //     gsap.from(SplitHeroTitle.words,{
  //    opacity:0,
  //   y:200,
  //   stagger:0.3,
  //   ease:"power1.in"
  // })

  //   })

  // },[])



  // useGSAP(()=>{

  //   const HeroTitleSplit = new SplitText(".title", {type:'words,chars'});
  //   const HeroDescriptionSplit = new SplitText(".description", {type:'line'})

  //   gsap.from(HeroTitleSplit.words,{
  //     opacity:0,
  //     duration:1.5,
  //     ease:'power1.inOut',
  //     stagger:0.04

  //   });

  //   gsap.from(HeroDescriptionSplit.lines,{
  //     opacity:0,
  //     duration:1.8,
  //     ease:'expo.out',
  //     stagger:0.06,

  //   })

  // },[])



  return (

    <>

{
  loading? <Loading/>:

      <div className = "relative  w-full h-full drop-shadow-2xl flex justify-end ">
        

        {/* slide image */}
          <div id="image-wrapper" className = " w-full lg:w-10/12 h-full  ">
          <img className = "w-full h-full object-cover object-center" src={item.images?.[0]?.url} alt="product-image"/>
          </div>
         {/* blur background on left of big screen */}
          <div className = "bg-black blur-3xl max-lg:hidden lg:block absolute top-0 z-10 left-0 h-full w-5/12 brightness-90 opacity-20 ">
          </div>
          
           {/* slide details */}
          <div  className = " pb-5 lg:pb-7 xl:pb-25 absolute   left-1/2 max-lg:-translate-x-1/2 bottom-0 lg:bottom-0 lg:left-0 flex flex-col  lg:gap-2 max-lg:items-center content-center w-full lg:w-1/2 px-5 lg:px-10 z-20 ">
            <h1 className = " title ">{item.name}</h1>
            {/* rating */}
                <div className='flex flex-row gap-2 items-center'>
                  <span className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${
                        star <= Math.round(item.averageRating) ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
              </span>
              <span className='text-sm max-sm:hidden'>{item.ratings?.length} reviews</span>
            </div>

            {/* /rating */}

              <div className = "hidden lg:block">
                <p className = "description text-xs lg:text-lg line-clamp-2 lg:line-clamp-3 text-font-light-white">{item.description}</p>
              </div>
            <div className = "flex flex-row gap-5">
              <button className = " px-3 text-sm lg:text-base py-2 border-t rounded-xl ">{item.category}</button>
              <button className = " px-3 text-sm lg:text-base py-2 border-t rounded-xl ">{item.brand}</button>
            </div>
            <div className = "flex flex-row gap-5 items-center">
           
           
              <button onClick={(e)=>addingToCart(e,item._id)} className = "group flex flex-row gap-2 items-center  bg-secondary-color dark:bg-dark-secondary-color p-4 max-lg:rounded-full lg:px-4 lg:py-3  rounded-2xl lg:rounded-r-2xl cursor-pointer">

                <span className = "hidden lg:block font-semibold text-lg lg:text-xl xl:2xl p-2">Add to Cart</span>
                <IoMdCart className = "text-xl lg:text-xl xl:text-2xl focus:hover:rotate-30 active:rotate-30 group-hover:rotate-30 transition-transform duration-300 ease-in-out"/>
                </button>
                <button onClick={(e)=>addingtoWishlist(e,item._id)} className = "group bg-secondary-color dark:bg-dark-secondary-color p-4 rounded-full cursor-pointer">
                <FaRegBookmark className = "text-lg lg:text-xl xl:text-2xl cursor-pointer group-hover:text-yellow-500 transition-colors duration-300 ease-in-out " />
                </button>
            </div>

          </div>


        

      </div>
      }

    </>


    
    
  )
}

export default HeroSlide