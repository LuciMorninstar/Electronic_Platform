import React, { useEffect, useState } from 'react'
import laptop from "../assets/laptop.webp";
import monitor from "../assets/monitor.webp"
import { FaCodeCompare, FaHtml5, FaStar, FaUser } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';



import { IoMdAdd, IoMdHeart, IoMdSend, IoMdStar } from 'react-icons/io';
import ProductWidthWrapper from '../components/ProductComponents/ProductWidthWrapper'
import ProductGallery from '../components/ProductGallery';

import Specs from '../components/ProductComponents/Specs';
import ProductComment from '../components/ProductComponents/ProductComment';
import { useProductStore } from '../utils/useProductStore';
// import Loading from "../components/Loading"
import { Loader } from 'lucide-react';
import Loading from "../components/Loading"
import { useCartStore } from '../utils/useCartStore';
import SimilarProducts from '../components/SimilarProducts';

const ProductPage = () => {

  // for rating

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log("rating", rating);

  const {rateProduct } = useProductStore();





  

  const {id} = useParams();
  console.log(id);

    const {loading,getProductDetails, product} = useProductStore();
     const {addToCart} = useCartStore();
  // console.log(id);
useEffect(()=>{
  if(id){
    getProductDetails(id);
  }
},[id, getProductDetails]) //renders in each id change

console.log(product)


 const addingToCart = (e,id)=>{
  e.stopPropagation();

  addToCart(id);


 }




  return (

    
    
    
    <section className = " mt-16 lg:mt-20 ">

      {loading? <Loading/>:
   
      <ProductWidthWrapper>


   {/* hero section */}
        <div className = "  w-full flex flex-col lg:flex-row gap-10">
          {/* 1st div */}
          <div className = " w-full lg:w-1/2 flex flex-col justify-center items-center  ">

          <ProductGallery images ={product?.images || []} />
         



          </div>

          {/* 2nd div */}

          <div className="w-full  lg:w-1/2 " >
          {/* first part */}
          <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
           <div className = "flex flex-row justify-between">
            <h4 className = "text-teal-400">Fuel Your Future, Power Your Passions.</h4>
            <Link to = {`/compare/${product?._id}`} className = "group relative flex flex-col bg-color-teal-500 items-center p-3 rounded-full cursor-pointer">
              <FaCodeCompare/>
              <span className=' group-hover:block hidden absolute -bottom-8 text-xs px-2 py-1 bg-secondary-color dark:bg-dark-search-bar-bg rounded-xl'>Compare</span>
              </Link>
            </div> 
           
            <h1>{product?.name}</h1>

               <div className = "w-full flex flex-row gap-3 lg:gap-5">
            {product?.tags?.slice(0,2).map((tag)=>(
              <div className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
            ))}
          </div>

            {/* <div className = "flex flex-row gap-2 items-center ">
              <IoMdStar className = "text-2xl"/>
              <span>{product?.rating}</span>
            </div> */}

                    {/* Rating Stars */}
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex flex-row gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`transition-all duration-300 ease-in ${
                    star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={async () => {
              
                    setRating(star);

              
                    const updated = await rateProduct(product._id, star);

                    if (updated) {
              
                      setRating(updated.myRating || star);
                    }
                  }}
                >
                  <IoMdStar className="text-2xl cursor-pointer" />
                </span>
              ))}
            </div>

            {/* Average rating display */}
            <div className="flex flex-row items-center gap-2 text-sm mt-1">
              <span className="font-semibold">Rating:</span>
              <span>{product?.averageRating?.toFixed(1) || 0} / 5</span>
              <span>({product?.ratings?.length || 0} users)</span>
            </div>
          </div>


            <p>Stocks Left : <span className ={`${product?.stock < 5 ? "text-red-500" : "text-color-teal-500" }`}>{product?.stock}</span> </p>

            <div className = "flex flex-col gap-2 font-semibold">
              <span className = "">Starting at</span>
              <span className = "text-3xl font-poppins">Rs. {product?.price}</span>
            </div>

            <button onClick={(e)=>addingToCart(e,product?._id)} className = "w-max flex flex-row gap-2 rounded-md px-6 py-3 outline-none dark:bg-primary-color bg-dark-primary-color cursor-pointer">
              <span className = "  text-sm md:text-base lg:text-lg xl:text-lg font-semibold  text-white dark:text-black font-poppins">Add to Cart</span>
            </button>
            
         </div>

            {/* /first part */}

            {/* 2nd part */}
            <div className = "flex flex-col gap-3 py-5  ">

              <h6 className = "font-semibold">Powerful Features at a glance !</h6>

            <div className = "grid sm:grid-cols-2 gap-y-1 gap-x-2 ">
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

    {/* /hero section ends       */}

{/* specs sectiion */}
   {product?.specs && <Specs product = {product}/>}

   {/* /specs section */}


   {/* <SimilarProducts/> */}


{/* comment section */}


<ProductComment/>

{/* /comment section */}


    

          
          
       
  

      </ProductWidthWrapper>
         }

    </section>
  )
}

export default ProductPage