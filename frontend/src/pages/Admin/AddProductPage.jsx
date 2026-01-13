import React from 'react'
import { IoMdLaptop } from "react-icons/io";
import { TfiHeadphone } from "react-icons/tfi";
import { PiMonitorLight } from "react-icons/pi"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TfiMouse } from "react-icons/tfi";
import AddLaptopForm from '../../components/AdminComponents/AddLaptopForm';
import { useState } from 'react';
import AddMobileForm from '../../components/AdminComponents/AddMobileForm';




const AddProductPage = () => {

    const [active, setActive] = useState("laptop");
    
   const categories = [
    {name:"laptop", icon:<IoMdLaptop />},
    {name:"headphone", icon:<TfiHeadphone />},
    {name:"monitor", icon:<PiMonitorLight />},
    {name:"mouse", icon:<TfiMouse />},
    {name:"mobile", icon:<HiMiniDevicePhoneMobile />},
    ];


console.log(active);


  return (
    <section className = "max-w-7xl mx-auto py-10 px-5 flex flex-col items-center ">
        <div className = "flex flex-col gap-8 items-center">
        <h4 className = "uppercase">Choose a category</h4>
        <div  className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xl:gap-8  px-4 py-2  ">
            {categories.map((category)=>(
                <div onClick ={()=>setActive(category.name)} key = {category.name} className = " flex flex-row gap-4 items-center justify-center px-8 py-3 font-semibold outline-none border-none bg-tertiary-color dark:bg-dark-search-bar-bg shadow-md rounded-md cursor-pointer text-base lg:text-lg font-poppins hover:bg-color-teal-500 transition-colors duration-300 ease-in ">
                    <span className = "">{category.icon}</span>
                    <span className = "">{category.name.charAt().toUpperCase()+category.name.slice(1)}</span>
                </div>
            ))}

        </div>
             {active === "laptop" &&<AddLaptopForm/>}
             {active === "mobile" &&<AddMobileForm/>}
        </div>

   

    </section>
  )
}

export default AddProductPage