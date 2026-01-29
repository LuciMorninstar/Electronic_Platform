import React from 'react'
import ProductPage from '../pages/ProductPage'
import { useProductStore } from '../utils/useProductStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Loading from "./Loading"
import ProductGallery from './ProductGallery';
import { IoMdStar } from 'react-icons/io';
import Specs from './ProductComponents/Specs';
import SearchForCompare from './SearchForCompare';
import versus from "../assets/versus.png"
import { useRef } from 'react';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';

const Compare = () => {

    
    const {id} = useParams();
    console.log(id);

      const {loading,getProductDetails, product,compareToProduct,comparing} =  useProductStore();

      useEffect(()=>{
        if(id){
          getProductDetails(id);
        }
      },[id, getProductDetails])


      // gsap

      // left div

      const headingRef = useRef(null);
      const titleRef = useRef(null);
      const tagRef = useRef(null);
      const ratingRef = useRef(null);
      const stockRef = useRef(null);
      const priceRef = useRef(null);
      const subHeadingRef = useRef(null);
      const featureRef = useRef([]);
      const imageRef = useRef(null);
      const buttonRef = useRef(null);
      const versusRef = useRef(null);
     const searchBarRef = useRef(null);

      
      const title2Ref = useRef(null);
      const tag2Ref = useRef(null);
      const rating2Ref = useRef(null);
      const stock2Ref = useRef(null);
      const price2Ref = useRef(null);
      const subHeading2Ref = useRef(null);
      const feature2Refs = useRef([]);
      const image2Ref = useRef(null);


      
const addFeatureRef = (el)=>{
  if(el && !featureRef.current.includes(el)){
    featureRef.current.push(el);
  }
}
const addFeature2Ref = (el)=>{
  if(el && !feature2Refs.current.includes(el)){
    featureRef.current.push(el);
  }
}

useLayoutEffect(() => {
  if (!product) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });


    tl.fromTo(imageRef.current, { y: 26, opacity: 0,scale:0.4 }, { y: 0, opacity: 1, duration: 0.75,scale:1 })
    .fromTo(headingRef.current, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 },"-=0.6")
      .fromTo(titleRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.4")
      .fromTo(tagRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.45 }, "-=0.3")
      .fromTo(ratingRef.current, { scale: 0.8,x:-100, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45,x:0 }, "-=0.25")
      .fromTo(stockRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.25")
      .fromTo(priceRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
      .fromTo(buttonRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.60 }, "-=0.22")
      .fromTo(subHeadingRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=0.2")
      .fromTo(featureRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=0.2")
      .fromTo(versusRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=2.4")
      .fromTo(searchBarRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=1.8");

      
      // for div2

      // so conditionally we can operate animation and also for it i needed to add the compareToProduct to dependency array as well

      if(compareToProduct){

      const tl2 = gsap.timeline({
      defaults:{ease:"power2.inOut"}
    })
      
    tl2.fromTo(image2Ref.current, { y: 26, opacity: 0,scale:0.4 }, { y: 0, opacity: 1, duration: 0.75,scale:1 })
      .fromTo(title2Ref.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.4")
      .fromTo(tag2Ref.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.45 }, "-=0.3")
      .fromTo(rating2Ref.current, { scale: 0.8,x:-100, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45,x:0 }, "-=0.25")
      .fromTo(stock2Ref.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.25")
      .fromTo(price2Ref.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
      .fromTo(subHeading2Ref.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=0.2")
      .fromTo(feature2Refs.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.35 }, "-=0.2")


      }
      
  });


  return () => ctx.revert();
}, [product,compareToProduct]);




  return (
    <section className='max-w-7xl w-full flex flex-col xl:flex-row justify-between max-xl:items-center gap-0 max-xl:px-10 max-sm:px-0'>


           {/* left div  */}
        <div className=' w-full xl:w-7/15 transition-all duration-300 ease-in'>
            {loading ? <Loading/>:


            // gallery upto features

             <div className = "  w-full flex flex-col  gap-10">
                      {/* 1st div */}
                      <div ref={imageRef} className = " w-full  flex flex-col justify-center items-center  ">
            
                      <ProductGallery images ={product?.images || []} />
                     
            
            
            
                      </div>
            
                      {/* 2nd div */}
            
                      <div className="w-full " >
                      {/* first part */}
                      <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
                       <div className = "flex flex-row justify-between">
                       
                     
                        </div> 
                       
                        <h2 ref={titleRef}>{product?.name}</h2>
            
                           <div className = "w-full flex flex-row gap-3 lg:gap-5">
                        {product?.tags?.slice(0,2).map((tag)=>(
                          <div ref={tagRef} className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
                        ))}
                      </div>
            
                        <div ref={ratingRef} className = "flex flex-row gap-2 items-center ">
                          <IoMdStar className = "text-2xl"/>
                          <span>{product?.averageRating}</span>
                        </div>
            
                        <p ref={stockRef}>Stocks Left : <span className = "text-red-500">{product?.stock}</span> </p>
            
                        <div ref={priceRef} className = "flex flex-col gap-2 font-semibold">
                          <span className = "">Starting at</span>
                          <span className = "text-3xl font-poppins">Rs. {product?.price}</span>
                        </div>
            
                  
                        
                     </div>
            
                        {/* /first part */}
            
                        {/* 2nd part */}
                        <div className = "flex flex-col gap-3 py-5  ">
            
                          <h6 ref={subHeadingRef} className = "font-semibold">Powerful Features at a glance !</h6>
            
                        <div className = "grid grid-cols-1 gap-y-1 gap-x-2 ">
                          {product?.features?.map((feature,i)=>(
                           <div ref={addFeatureRef} key={i} className ="overflow-hidden shadow-md dark:text-font-white   text-black  relative text-sm  px-5 py-2 rounded-xl before:content-[''] before:absolute before:top-1/2 before:-translate-1/2 before:left-0 before:h-10 before:w-5 before:rounded-full before:bg-teal-500">
                            {feature}
            x
                            
                           </div>
                          ))}
            
                        </div>
            
                        </div>
                        
                       
            
            
            
                      </div>
            
                    
            
            </div>
           
           //gallery upto features
            
            }

             {product?.specs && <Specs product = {product}/>}
            
        </div>
        {/* /left div */}

            {/* middle versus */}
        {/* <div className='w-[1px] bg-gray-400 dark:bg-gray-800'>
        </div> */}
        <img ref={versusRef} className='h-20 max-xl:w-40 flex flex-row max-xl:my-5 xl:mt-70' src={versus} alt='image'/>
        {/* middle versus */}




        {/* right div */}

<div className="w-full xl:w-7/15">
  {comparing ? (
    <Loading />
  ) : (

    <div className="w-full  flex justify-center items-center">
      {!compareToProduct ? (
   
        <div ref={searchBarRef} className="flex flex-col gap-5 mt-40 items-center">
          <h5>Search a product to compare with..</h5>
          <SearchForCompare />
        </div>
      ) : (<>
        
      

        <div className = "  w-full flex flex-col  gap-10">
                    {/* 1st div */}
                    <div ref={image2Ref} className = " w-full  flex flex-col justify-center items-center  ">
        
                    <ProductGallery images ={compareToProduct?.images || []} />
                    
        
        
        
                    </div>
        
                    {/* 2nd div */}
        
                    <div className="w-full " >
                    {/* first part */}
                    <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
                    <div className = "flex flex-row justify-between">
                 
                    
                    </div> 
                    
                    <h2 ref={title2Ref}>{compareToProduct?.name}</h2>
        
                        <div className = "w-full flex flex-row gap-3 lg:gap-5">
                    {compareToProduct?.tags?.slice(0,2).map((tag)=>(
                        <div ref={tag2Ref} className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
                    ))}
                    </div>
        
                    <div ref={rating2Ref} className = "flex flex-row gap-2 items-center ">
                        <IoMdStar className = "text-2xl"/>
                        <span>{compareToProduct?.averageRating}</span>
                    </div>
        
                    <p ref={stock2Ref}>Stocks Left : <span className = "text-red-500">{compareToProduct?.stock}</span> </p>
        
                    <div ref={price2Ref} className = "flex flex-col gap-2 font-semibold">
                        <span className = "">Starting at</span>
                        <span className = "text-3xl font-poppins">Rs. {compareToProduct?.price}</span>
                    </div>
        
                
                    
                    </div>
        
                    {/* /first part */}
        
                    {/* 2nd part */}
                    <div className = "flex flex-col gap-3 py-5  ">
        
                        <h6 ref={subHeading2Ref} className = "font-semibold">Powerful Features at a glance !</h6>
        
                    <div className = "grid grid-cols-1 gap-y-1 gap-x-2 ">
                        {compareToProduct?.features?.map((feature,i)=>(
                        <div ref={addFeature2Ref} key={i} className ="overflow-hidden shadow-md dark:text-font-white   text-black  relative text-sm  px-5 py-2 rounded-xl before:content-[''] before:absolute before:top-1/2 before:-translate-1/2 before:left-0 before:h-10 before:w-5 before:rounded-full before:bg-teal-500">
                        {feature}
        x
                        
                        </div>
                        ))}
        
                    </div>
        
                    </div>
                       {compareToProduct?.specs && <Specs product = {compareToProduct}/>}
                    
        
        
        
                    </div>
                    
         
        
                
        
        </div>
           



           </>

           


      )}
    </div>
    
  )}
</div>



     

        {/* /right div */}
        
    </section>
  )
}

export default Compare