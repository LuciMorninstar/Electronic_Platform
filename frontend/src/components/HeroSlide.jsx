import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import { SplitText } from 'gsap/all';


const HeroSlide = ({item}) => {

  
  
  
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

      <div className = "relative  w-full h-full drop-shadow-2xl flex justify-end ">
        

        {/* slide image */}
          <div id="image-wrapper" className = " w-full lg:w-10/12 h-full  ">
          <img className = "w-full h-full object-cover object-center" src={item.image} alt="product-image"/>
          </div>
         {/* blur background on left of big screen */}
          <div className = "bg-black max-lg:hidden lg:block absolute top-0 z-10 left-[20%] h-full w-3/12 blur-xl opacity-20 ">
          </div>
          
           {/* slide details */}
          <div  className = " pb-5 lg:pb-7 xl:pb-10 absolute   left-1/2 max-lg:-translate-x-1/2 bottom-0 lg:bottom-0 lg:left-0 flex flex-col  lg:gap-2 max-lg:items-center content-center w-full lg:w-1/2 px-5 lg:px-10 ">
            <h1 className = " title ">{item.name}</h1>
            <span className ="flex flex-row gap-2 items-center">
              <FaStar className = "text-yellow-500" />
              <span>{item.rating}/5</span>
              </span>
              <div className = "hidden lg:block">
                <p className = "description text-xs lg:text-lg line-clamp-2 lg:line-clamp-3 text-font-light-white">{item.description}</p>
              </div>
            <div className = "flex flex-row gap-5">
              <button className = " px-3 text-sm lg:text-base py-2 border-t rounded-xl ">{item.category}</button>
              <button className = " px-3 text-sm lg:text-base py-2 border-t rounded-xl ">{item.brand}</button>
            </div>
            <div className = "flex flex-row gap-5 items-center">
           
           
              <button className = "group flex flex-row gap-2 items-center  bg-secondary-color dark:bg-dark-secondary-color px-2 py-2 lg:px-4 lg:py-3  rounded-2xl lg:rounded-r-2xl cursor-pointer">

                <span className = "font-semibold text-lg lg:text-xl xl:2xl">Add to Cart</span>
                <IoMdCart className = "text-xl lg:text-2xl xl:text-3xl focus:hover:rotate-30 active:rotate-30 group-hover:rotate-30 transition-transform duration-300"/>
                </button>
                <button className = "group bg-secondary-color dark:bg-dark-secondary-color p-4 rounded-full cursor-pointer">
                <FaRegBookmark className = "text-lg lg:text-xl xl:text-2xl cursor-pointer group-hover:text-yellow-500 transition-colors duration-300 ease-in-out " />
                </button>
            </div>

          </div>


        

      </div>

    </>


    
    
  )
}

export default HeroSlide