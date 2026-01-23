import React from 'react'
import logo from "../../assets/techhive.png"
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import ToggleDarkMode from '../ToggleDarkMode';
import { Link } from 'react-router-dom';
import { PiUsersThreeLight } from 'react-icons/pi';








const AdminSidebar = ({openSidebar}) => {

  const adminSidebarItems = [
    {name:"Dashboard", to:"/admin", icon:<LuLayoutDashboard />},
    {name:"Product",to:"/admin/product", icon:<AiFillProduct />}, /*add, update, delete pages inside it also show all products and feature it*/
    {name:"Orders",to:"/admin/orders", icon:<GiCheckMark />}, /* total orders ko card 3 grids slider components change pending completed, ongoing order id arrival dates, departure dates address,of route status see in logistics*/
    {name:"Users",to:"/admin/users",icon:<PiUsersThreeLight />}, /* Show only stocks available*/
    {name:"Invoice",to:"/admin/invoices", icon:<LiaFileInvoiceSolid />}
    
  ]

  return (


    <div className = "flex flex-col py-7 px-5 items-center justify-between min-h-screen overflow-hidden ">

    <div className = "flex flex-col gap-5 items-center">

     
      {/* 1st part logo */}
      <div className = "flex flex-row gap-2 items-center">
        <div className = "w-12 h-12">
          <img className = "w-full h-full" src={logo}/>
        </div>
        <span className ={`${openSidebar ? "block text-xl sm:text-2xl  font-audiowide text-color-teal-400 transition-all duration-300 ease-in ":"hidden"} `}>TechHive</span>
      </div>

      {/* 1st part ends */}

      {/* 2nd part pages  */}
      <div className = " flex flex-col  ">
        {
          adminSidebarItems.map((item)=>(
          <Link to ={item.to} className ={`${openSidebar ? "px-5":"px-4"} group flex flex-row gap-4 items-center   py-3 cursor-pointer hover:bg-color-teal-500 rounded-md transition-all duration-100 ease-in`}>
            <span className = "dark:text-font-white text-xl lg:text-2xl   rounded-lg  transition-all duration-300 ease-in   ">{item.icon}</span>
            <span className = {`${openSidebar ?"block":"hidden"} transition-all duration-300 ease-in text-sm sm:text-base  dark:text-font-white  `}>{item.name}</span>
          </Link>
          ))
        }

      </div>

      {/* 2nd part ends */}


    </div>
    

    <ToggleDarkMode/>
     </div>
  )
}

export default AdminSidebar