import React from 'react'
import ProductWidthWrapper from '../components/ProductWidthWrapper'
import laptop from "../assets/laptop.webp";
import monitor from "../assets/monitor.webp"
import { FaHtml5, FaStar, FaUser } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";



import { IoMdAdd, IoMdHeart, IoMdSend, IoMdStar } from 'react-icons/io';
import ProductGallery from '../components/ProductGallery';
import { useState } from 'react';
import Specs from '../components/Specs';

const ProductPage = () => {

  const [iscommentSectionActive, setIsCommentSectionActive] = useState(false);
  console.log("active",iscommentSectionActive);

  // comment value stored
  const [comment, setComment] = useState("");
  console.log("comment",comment);

  // for like value store

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked,setIsDisliked] = useState(false);
  
  // when liked disliked should be off
  const likingFunction =()=>{
    setIsLiked(true);
    setIsDisliked(false);

  }
  const disLikingFunction =()=>{
    setIsDisliked(true);
    setIsLiked(false);

  }

  // to submit comment by user

  const submitComment = ()=>{

    // Here is where i want to store to the express Database.

    console.log("Data submitted to the mongodb", comment)


  }


  

  const product =  {
  "id": "lap-0001",
  "name": "Legion 7i Gen 10 (16' Intel) Gaming Laptop",
  "brand": "Lenovo",
  "category": "laptop",
  "type":"gaming",
  "price": 120499,
  "currency": "USD",
  "discountPercent": 10,
  "finalPrice": 1169.99,
  "rating": 4.6,
  "reviewsCount": 842,
  "stock": 34,
  "sku": "NT-ABX15-2025",
  "releaseDate": "2025-08-15",
  "shortDescription": "High-performance 15.6\" gaming laptop with RTX-class graphics and ultra-fast 240Hz display.",
  "description": "The NebulaTech AeroBlade X15 pairs a powerful CPU with next-gen GPU performance, a 240Hz IPS display, advanced cooling, and a lightweight aluminum chassis — designed for gamers and content creators who need speed and portability.",
  "features": [
    "NVIDIA RTX 4070 Laptop GPU",
    "AMD Ryzen 9 7845HS",
    "16GB DDR5 (expandable to 64GB)",
    "1TB NVMe SSD (PCIe 4.0)",
    "15.6\" 240Hz IPS, 3ms response",
    "Advanced vapor chamber cooling",
    "Wi-Fi 6E, Bluetooth 5.3",
    "RGB per-key keyboard",
    "Thunderbolt 4, HDMI 2.1",
    "Windows 11 Home"
  ],
  "specs": {
    "display": {
      "size": "15.6 inch",
      "panel": "IPS",
      "resolution": "1920x1080",
      "refreshRateHz": 240,
      "responseTimeMs": 3
    },
    "cpu": {
      "model": "AMD Ryzen 9 7845HS",
      "cores": 8,
      "threads": 16,
      "baseClockGHz": 3.3,
      "boostClockGHz": 5.0
    },
    "gpu": {
      "model": "NVIDIA GeForce RTX 4070 (Laptop)",
      "vramGB": 8
    },
    "memory": {
      "sizeGB": 16,
      "type": "DDR5-5200",
      "slots": 2,
      "maxSupportedGB": 64
    },
    "storage": {
      "type": "NVMe SSD",
      "capacityGB": 1000,
      "interface": "PCIe 4.0",
      "slots": 2
    },
    "battery": {
      "capacityWh": 76,
      "estimatedHours": 6
    },
    "ports": [
      "2x USB-A 3.2",
      "1x USB-C / Thunderbolt 4",
      "1x HDMI 2.1",
      "1x 3.5mm combo audio",
      "1x RJ45 Ethernet"
    ],
    "connectivity": [
      "Wi-Fi 6E (802.11ax)",
      "Bluetooth 5.3"
    ],
    "dimensions": {
      "widthMm": 356,
      "depthMm": 245,
      "heightMm": 18.9
    },
    "weightKg": 1.78,
    "os": "Windows 11 Home"
  },
  "colors": ["Meteor Black", "Stellar Silver"],
  "images": [
    "https://example.com/images/aeroblade-x15-front.jpg",
    "https://example.com/images/aeroblade-x15-back.jpg",
    "https://example.com/images/aeroblade-x15-side.jpg",
    "https://example.com/images/aeroblade-x15-open-keyboard.jpg"
  ],
  "imageGallery": [
    {
      "id": "img1",
      "url": "https://example.com/images/aeroblade-x15-front.jpg",
      "alt": "AeroBlade X15 front view"
    },
    {
      "id": "img2",
      "url": "https://example.com/images/aeroblade-x15-open-keyboard.jpg",
      "alt": "AeroBlade X15 keyboard and screen"
    },
    {
      "id": "img3",
      "url": "https://example.com/images/aeroblade-x15-ports.jpg",
      "alt": "Ports and sides of AeroBlade X15"
    },
    {
      "id": "img4",
      "url": "https://example.com/images/aeroblade-x15-backlit.jpg",
      "alt": "Backlit keyboard close-up"
    }
  ],
  "warrantyMonths": 24,
  "tags": ["gaming", "portable", "high-refresh", "ray-tracing"],
  "createdAt": "2025-12-09T00:00:00Z",
  "updatedAt": "2025-12-09T00:00:00Z"
}


  return (
    <section className = " mt-16 lg:mt-20 ">
      <ProductWidthWrapper>


   {/* hero section */}
        <div className = "  w-full flex flex-col lg:flex-row gap-10">
          {/* 1st div */}
          <div className = " w-full lg:w-1/2 flex flex-col justify-center items-center  ">

          <ProductGallery/>
         



          </div>

          {/* 2nd div */}

          <div className="w-full  lg:w-1/2 " >
          {/* first part */}
          <div className = "flex flex-col  border-b-2 border-gray-500  py-5  gap-3">
            <h4 className = "text-teal-400">Fuel Your Future, Power Your Passions.</h4>
           
            <h1>{product.name}</h1>

               <div className = "w-full flex flex-row gap-3 lg:gap-5">
            {product.tags.slice(0,2).map((tag)=>(
              <div className = "px-5 py-1 shadow-md dark:bg-dark-secondary-color text-black dark:text-white rounded-xl w-max">{tag}</div>
            ))}
          </div>

            <div className = "flex flex-row gap-2 items-center ">
              <IoMdStar className = "text-2xl"/>
              <span>{product.rating}</span>
            </div>

            <p>Stocks Left : <span className = "text-red-500">{product.stock}</span> </p>

            <div className = "flex flex-col gap-2 font-semibold">
              <span className = "">Starting at</span>
              <span className = "text-3xl font-poppins">Rs. {product.price}</span>
            </div>

            <button className = "w-max flex flex-row gap-2 rounded-md px-6 py-3 outline-none dark:bg-primary-color bg-dark-primary-color cursor-pointer">
              <span className = "  text-sm md:text-base lg:text-lg xl:text-lg font-semibold  text-white dark:text-black font-poppins">Add to Cart</span>
            </button>
            
         </div>

            {/* /first part */}

            {/* 2nd part */}
            <div className = "flex flex-col gap-3 py-5  ">

              <h6 className = "font-semibold">Powerful Features at a glance !</h6>

            <div className = "grid sm:grid-cols-2 gap-y-1 gap-x-2 ">
              {product.features.map((feature,i)=>(
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
   <Specs product = {product}/>

{/* comment section */}


<div className = "flex flex-col gap-4 border-t-2 border-gray-500 pt-5 ">

  <h3>Comments</h3>

{/* No. of comments  showing  */}

  <span className = "text-sm lg:text-base text-font-light-white">322 comments</span> 
{/* write comment section */}
  <div className = "relative w-full rounded-md bg-tertiary-color dark:bg-dark-secondary-color ">
    {/* profile pic */}
    <div className = " absolute -top-10 left-1/2 -translate-x-1/2 lg:-top-5 lg:-left-12 w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
      <FaUser className = "text-lg lg:text-xl"/>
      {/* <span className ="absolute bottom-0 left-0 ">username</span> */}
    </div>
    <textarea onClick={()=>setIsCommentSectionActive(true)} className = "w-full h-[] text-font-light-white rounded-md outline-none px-5 py-2 resize-none caret-color-teal-500 overflow-y-auto" type="text" name="comment" id='comment'  value={comment} onChange={(e)=>setComment(e.target.value)}  placeholder="Write a comment"/>  
      {/* comment button ko lagi */}

      {iscommentSectionActive &&(
          <div className ={`${iscommentSectionActive?"transition-all duration-300 ease-in  opacity-100":"opacity-0"} w-full flex flex-row gap-5  justify-end pb-2 pr-2`}>
  <button className="text-sm text-font-light-white cursor-pointer">cancel</button>
      <button onClick={submitComment} className=" text-black bg-color-teal-500 dark:text-black px-4 py-2 rounded-md text-xl font-poppins cursor-pointer"><IoMdSend/></button>
    </div>
      )}
 
    {/* /comment button ko lagi */}

    {/* actual comments */}

    <div>
 

    </div>
    
      


  </div>

  {/* /write comment section ends */}

{/* all user commetn showing */}
     <div className ="flex flex-row gap-5 items-center">

  {/* user picture */}
      <div className = "w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
          <FaUser className = "text-lg lg:text-xl"/>
      </div>
      {/* user picture */}
      {/* user name and date of the comment */}
      <div className = "flex flex-col gap-1">
        <span className = "text-black dark:text-primary-color max-lg:text-sm text-base">User Name</span>
        <span className = "text-font-light-white text-xs">2004/05/06 </span>
      </div>


    </div>
{/* actual thing written by user */}
    <div className = "flex flex-col gap-2 w-full pl-14">
      <span className = "text-font-light-white">This is the comment written by user.</span>
      <div className = "flex flex-row gap-5">
        <span className = "flex flex-row gap-2 items-center justify-center">
        <AiOutlineLike onClick={likingFunction} className = {`${isLiked &&"text-color-teal-500"} text-lg cursor-pointer`} />
        {/* for the number of likes */}
        <p className ="text-xs text-font-light-white">12</p>
        </span>

        <span className = "flex flex-row gap-2 items-center justify-center">

        <AiOutlineDislike onClick={disLikingFunction} className = {`${isDisliked &&"text-color-teal-500"} text-lg cursor-pointer`} />
          {/* for the number of dislikes */}
        <p className ="text-xs text-font-light-white">10</p>
        </span>
      </div>
    </div>








</div>


    

          
          
       
  

      </ProductWidthWrapper>

    </section>
  )
}

export default ProductPage