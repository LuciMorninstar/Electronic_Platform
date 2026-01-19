import React from 'react'
import HeroSection from '../components/HeroSection'
import Products from '../components/Products'
import Categories from '../components/Categories'
import Partners from '../components/Partners'
import { useEffect } from 'react'
import Recommendations from '../components/Recommendations'
import TopProducts from '../components/TopProducts'


const HomePage = () => {
    useEffect(()=>{


    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          // console.log("intersection successfull")
        }
        else{
          entry.target.classList.remove("show");
        }
      })
    },{threshold:0.3});



  const elements = document.querySelectorAll(".productCard");
  elements.forEach((el)=>observer.observe(el));

  return()=>{
    elements.forEach((el)=>observer.unobserve(el));
  }

  },[]);
  return (
    <>
      <HeroSection/>
  <Categories/>
  <div className = "flex flex-row w-full ">
 <Products/>
 <TopProducts className ="max-xl:hidden "  />
  </div>
 
  <Recommendations/>
  <Partners/>
  <div className = "px-5">
   <TopProducts className = "xl:hidden" />
   </div>

  </>

  )
}

export default HomePage