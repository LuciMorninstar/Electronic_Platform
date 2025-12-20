import React from 'react'
import { TfiAlignLeft } from "react-icons/tfi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";


import Search from "../Search"
import ToggleDarkMode from "../ToggleDarkMode"




const AdminNavbar = ({setOpenSidebar}) => {



  const adminNavItems = [
    {name:"Hamburgere", icon:<RxHamburgerMenu />},
    {name:"Notification", icon:<IoMdNotificationsOutline />},
    {name:"User", icon:<FiUser />}
    
  ]

  return (
    <nav className = "flex flex-row justify-between bg-secondary dark:bg-dark-secondary-color items-center px-3 sm:px-5 lg:px-8 py-4 dark:border-b border-b-gray-800 shadow-md">
      {/* 1st part */}

    <div className = "flex flex-row gap-2 sm:gap-4  lg:gap-10 items-center ">
      {/* button icon */}
      <div className ="flex flex-row  ">
        {adminNavItems.slice(0,1).map((item)=>(
          <div onClick={()=>setOpenSidebar(prev => !prev)} className = "text-icon-text-color  bg-navbar-and-sidebar-background-color dark:bg-transparent rounded-lg p-2 text-xl lg:text-2xl border border-border-color cursor-pointer dark:border-gray-800 dark:hover:text-font-white hover:text-black active:text-font-white"> 
            <span className = "" >{item.icon}</span>
          </div>
        ))}

      </div>
  
    </div>

    {/* 1st part end */}

       {/* for search bar */}
      
        <Search/> 

    {/* 2nd part */}

    <div className = "flex flex-row items-center gap-2 sm:gap-4 lg:gap-5">

   
    

      <div className = "flex flex-row gap-2 sm:gap-4 lg:gap-5">
        {
          adminNavItems.slice(1).map((item)=>(
            <div className = "adminNavIconStyle ">
              <span className = "">{item.icon}</span>
            </div>

          ))
        }
      </div>


     

    </div>


    </nav>
  )
}

export default AdminNavbar