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

const Compare = () => {

    
    const {id} = useParams();
    console.log(id);

      const {loading,getProductDetails, product,compareToProduct,comparing} =  useProductStore();

      useEffect(()=>{
        if(id){
          getProductDetails(id);
        }
      },[id, getProductDetails])


  return (
    <section className='max-w-7xl w-full flex flex-col xl:flex-row justify-between max-xl:items-center gap-0 max-xl:px-10 max-sm:px-0'>


           {/* left div  */}
        <div className=' w-full xl:w-7/15 transition-all duration-300 ease-in'>
            {loading ? <Loading/>:


            // gallery upto features

             <div className = "  w-full flex flex-col  gap-10">
                      {/* 1st div */}
                      <div className = " w-full  flex flex-col justify-center items-center  ">
            
                      <ProductGallery images ={product?.images || []} />
                     
            
            
            
                      </div>
            
                      {/* 2nd div */}
            
                      <div className="w-full " >
                      {/* first part */}
                      <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
                       <div className = "flex flex-row justify-between">
                       
                     
                        </div> 
                       
                        <h2>{product?.name}</h2>
            
                           <div className = "w-full flex flex-row gap-3 lg:gap-5">
                        {product?.tags?.slice(0,2).map((tag)=>(
                          <div className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
                        ))}
                      </div>
            
                        <div className = "flex flex-row gap-2 items-center ">
                          <IoMdStar className = "text-2xl"/>
                          <span>{product?.averageRating}</span>
                        </div>
            
                        <p>Stocks Left : <span className = "text-red-500">{product?.stock}</span> </p>
            
                        <div className = "flex flex-col gap-2 font-semibold">
                          <span className = "">Starting at</span>
                          <span className = "text-3xl font-poppins">Rs. {product?.price}</span>
                        </div>
            
                  
                        
                     </div>
            
                        {/* /first part */}
            
                        {/* 2nd part */}
                        <div className = "flex flex-col gap-3 py-5  ">
            
                          <h6 className = "font-semibold">Powerful Features at a glance !</h6>
            
                        <div className = "grid grid-cols-1 gap-y-1 gap-x-2 ">
                          {product?.features?.map((feature,i)=>(
                           <div key={i} className ="overflow-hidden shadow-md dark:text-font-white   text-black  relative text-sm  px-5 py-2 rounded-xl before:content-[''] before:absolute before:top-1/2 before:-translate-1/2 before:left-0 before:h-10 before:w-5 before:rounded-full before:bg-teal-500">
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
        <img className='h-20 max-xl:w-40 flex flex-row max-xl:my-5 xl:mt-70' src={versus} alt='image'/>
        {/* middle versus */}



        {/* right div */}

<div className="w-full xl:w-7/15">
  {comparing ? (
    <Loading />
  ) : (

    <div className="w-full  flex justify-center items-center">
      {!compareToProduct ? (
   
        <div className="flex flex-col gap-5 mt-40 items-center">
          <h5>Search a product to compare with..</h5>
          <SearchForCompare />
        </div>
      ) : (<>
        
      

        <div className = "  w-full flex flex-col  gap-10">
                    {/* 1st div */}
                    <div className = " w-full  flex flex-col justify-center items-center  ">
        
                    <ProductGallery images ={compareToProduct?.images || []} />
                    
        
        
        
                    </div>
        
                    {/* 2nd div */}
        
                    <div className="w-full " >
                    {/* first part */}
                    <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
                    <div className = "flex flex-row justify-between">
                 
                    
                    </div> 
                    
                    <h2>{compareToProduct?.name}</h2>
        
                        <div className = "w-full flex flex-row gap-3 lg:gap-5">
                    {compareToProduct?.tags?.slice(0,2).map((tag)=>(
                        <div className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
                    ))}
                    </div>
        
                    <div className = "flex flex-row gap-2 items-center ">
                        <IoMdStar className = "text-2xl"/>
                        <span>{compareToProduct?.averageRating}</span>
                    </div>
        
                    <p>Stocks Left : <span className = "text-red-500">{compareToProduct?.stock}</span> </p>
        
                    <div className = "flex flex-col gap-2 font-semibold">
                        <span className = "">Starting at</span>
                        <span className = "text-3xl font-poppins">Rs. {compareToProduct?.price}</span>
                    </div>
        
                
                    
                    </div>
        
                    {/* /first part */}
        
                    {/* 2nd part */}
                    <div className = "flex flex-col gap-3 py-5  ">
        
                        <h6 className = "font-semibold">Powerful Features at a glance !</h6>
        
                    <div className = "grid grid-cols-1 gap-y-1 gap-x-2 ">
                        {compareToProduct?.features?.map((feature,i)=>(
                        <div key={i} className ="overflow-hidden shadow-md dark:text-font-white   text-black  relative text-sm  px-5 py-2 rounded-xl before:content-[''] before:absolute before:top-1/2 before:-translate-1/2 before:left-0 before:h-10 before:w-5 before:rounded-full before:bg-teal-500">
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