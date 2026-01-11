import React from 'react'
import HeroSection from '../components/HeroSection'
import Products from '../components/Products'
import Categories from '../components/Categories'
import Partners from '../components/Partners'
import { useEffect } from 'react'


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
  <Products/>
  <Partners/>
  </>

  )
}

export default HomePage