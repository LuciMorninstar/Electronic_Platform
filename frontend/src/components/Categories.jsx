import React, { useEffect } from 'react'
import WidthWrapper from "../components/WidthWrapper"
import macbook from "../assets/macbook.png"
import headphones from "../assets/headphones.png"
import monitor from "../assets/mon-cat.png"
import mouse from "../assets/mouse-cat.png"
import phone from "../assets/phone.png"
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const Categories = () => {




  


const categories = [
  {
    name: "headphone",
    image:headphones
  },

  {
    name: "mouse",
    image: mouse
  },

  {
    name: "laptop",
    image: macbook
  },
  {
    name: "monitor",
    image: monitor
  },


  {
    name: "mobile",
    image: phone
  },
    {
    name: "refrigerator",
    image: macbook
  },
];



  return (
   <WidthWrapper>
    
    <section className = "section_style">
        <h3 className = "uppercase text-most-important-color font-poppins ">Categories</h3>
        {/* cards conatiner */}
        <div className = "carousel  overflow-x-auto ">

            <div className = " group animation-loop duration-400 infinite linear  gap-5 flex flex-row ">
            {categories.map((category,i)=>(
                // card wrapper (z-5 to show under the text and over the blurry white also fixed height and fixed width)
                <div  key={i} className ="gsapCategories shrink-0 overflow-hidden relative w-[280px] h-[350px] flex flex-col items-center justify-center gap-5 rounded-3xl bg-teal-500  py-8 z-5 cursor-pointer">
                    {/* absoluting the details so to get over the blurry bg */}
                    <div className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10  flex flex-col items-center justify-center gap-5">
                     <div className = "w-full h-[150px]  ">
                        <img className = "w-full h-full  object-center object-contain" src={category.image} alt="categories_image"/>
                    </div>

                    <span className = "text-lg sm:text-xl lg:text-2xl xl:text-3xl font text-dark-primary-color font-poppins ">{category.name.charAt(0).toUpperCase()+ category.name.slice(1)}</span>
                    <Link to ={`/category/${category.name}`} className = "category_button_style ">
                        <span className= "font-poppins font-semibold "> Shop Now</span>
                    </Link>
                    </div>
                   

                    {/* absolute white blurry z=-10 */}
                    <div className = "absolute -bottom-1/2 -z-10 -right-1/4 bg-white h-full rotate-60 w-full blur-2xl">
                    </div>


                </div>
            ))}
            </div>


        </div>
        

    </section>

   </WidthWrapper>
  )
}

export default Categories