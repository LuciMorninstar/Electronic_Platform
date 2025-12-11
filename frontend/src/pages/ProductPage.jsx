import React from 'react'
import laptop from "../assets/laptop.webp";
import monitor from "../assets/monitor.webp"
import { FaHtml5, FaStar, FaUser } from "react-icons/fa6";



import { IoMdAdd, IoMdHeart, IoMdSend, IoMdStar } from 'react-icons/io';
import ProductWidthWrapper from '../components/ProductComponents/ProductWidthWrapper'
import ProductGallery from '../components/ProductGallery';

import Specs from '../components/ProductComponents/Specs';
import ProductComment from '../components/ProductComponents/ProductComment';

const ProductPage = () => {



  

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

   {/* /specs section */}


{/* comment section */}


<ProductComment/>

{/* /comment section */}


    

          
          
       
  

      </ProductWidthWrapper>

    </section>
  )
}

export default ProductPage