import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoIosHeart } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import {Link} from "react-router-dom"
import { IoMdCart } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";


import Search from "./Search";
import { useState } from "react";
import ToggleDarkMode from "./ToggleDarkMode";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useUserStore } from "../utils/useUserStore";
import toast from "react-hot-toast"
import { useCartStore } from "../utils/useCartStore";
import { useEffect } from "react";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {

  //notificationsPanel

  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const toggleNotificationPanel = ()=>{
    setShowNotificationPanel((prev)=>!prev);
  }


  const {signOut} = useUserStore();
  
  const {user} = useUserStore();
  const {getAllCartProducts, cartItems} = useCartStore();

  useEffect(()=>{

    getAllCartProducts();
  },[getAllCartProducts])
  



  useGSAP(()=>{

    gsap.from(".gsapNav",{
      opacity:0,
      // z:-200,
      duration:1,
      ease:"power1.in",
      delay:0.3,
    })

  },[])



  const [showSearchBar, setShowSearchBar] = useState(false);

  const OnSearchIconClick = (iconname) => {
    if (iconname === "search") {
      setShowSearchBar((prev) => !prev);
      // console.log("searchbar status", showSearchBar);
    }
  };

  const handleWishListClick =(e)=>{
    if(!user){
      e.preventDefault();

      toast.error(<div className = "flex flex-row gap-0"><span>You must signIn to use Wishlist</span><Link to ="/signIn" className ="underline text-teal-400">Sign In</Link></div>)

    }
  }

  const handleCartClick =(e)=>{
    if(!user){
      e.preventDefault();

      toast.error(<div className = "flex flex-row gap-3"><span>You must signIn to use Cart</span><Link to ="/signIn" className ="underline text-teal-400">Sign In</Link></div>)

    }
  }

  const smallScreenLinksForTopNav = [
    {
      name: "Dashboard",
      link: "",
      icon: <RxHamburgerMenu />,
      showNumber: false,
    },
    { name: "search", link: "", icon: <FiSearch />, showNumber: false },
    {
      name: "Notification",
      link: "",
      icon: <IoMdNotifications />,
      showNumber: false,
    },

    {  name: "", link: user?.role === "admin"? "/admin" : user?.role === "user"? "/" : "/signUp", icon:user?.role ==="admin"?<MdAdminPanelSettings /> : user?.role === "user"?
<MdOutlineLogout />:<FiUser />, showNumber: false, onlyIcon: true,onClick : user?.role === "user" && signOut },
  ];

  const largeScreenLinksForTopNav = [
    {
      name: "dashboard",
      link: "/track-order",
      icon: <RxHamburgerMenu />,
      showNumber: false,
    },
    {
      name: "Wishlist",
      link: "/wishlist/products",
      icon: <IoIosHeart />,
      showNumber: false,
      onClick:handleWishListClick
    },
    {
      name: "Orders",
      link: "/myOrders",
      icon: <IoIosHeart />,
      showNumber: false,
    },
    {
      name: "Cart",
      link: "/cart",
      icon: <IoMdCart />,
      showNumber: true,
      onClick:handleCartClick
    },

    {
      name: "",
      link: "",
      icon: <IoMdNotifications />,
      showNumber: true,
      onClick:toggleNotificationPanel
    },

    { 
      name: "", link: user?.role === "admin"? "/admin" : user?.role === "user"? "/" : "/signUp", icon:user?.role ==="admin"?<MdAdminPanelSettings /> : user?.role === "user"?
<MdOutlineLogout />:<FiUser />, showNumber: false, onlyIcon: true,onClick : user?.role === "user" && signOut },
  ];
  

  const smallScreenLinksForBottomNav = [
    {
      name: "Home",
      link: "",
      icon: <FaHome />,
      showNumber: false,
    },
    {
      name: "Wishlist",
      link: "/wishlist/products",
      icon: <IoMdHeart />,
      showNumber: false,
      onClick:handleWishListClick
      
    },
    {
      name: "Cart",
      link: "/cart",
      icon: <IoMdCart />,
      showNumber: true,
      onClick:handleCartClick
    },
  ];

  return (
    <>
      <nav className="gsapNav absolute z-50 top-6 w-full  lg:hidden opacity-100  ">
        {/* For small screens upto lg:1024px */}
        <div className=" relative flex flex-row justify-between items-center mx-4 px-4 py-2  bg-secondary-color dark:bg-dark-secondary-color  rounded-2xl ">
          {/* 1st part   */}
          <div className="flex flex-row gap-2 items-center sm:gap-4 lg:gap-6 ">
            {/* hamburger */}
            <div>
              {smallScreenLinksForTopNav.slice(0, 1).map((item) => (
                <div className=" group" key={item.name}>
                  {item.icon ? (
                    <span className="icon-style">{item.icon}</span>
                  ) : (
                    "null"
                  )}
                </div>
              ))}
            </div>
            {/* logo */}
            <div>
              <Link to ="/" className="logo">TechHive</Link>
            </div>
          </div>

          {/* 2nd part */}

          <div className="flex flex-row gap-1 items-center sm:gap-5 lg:gap-6 xl:gap-8 ">
            {smallScreenLinksForTopNav.slice(1).map((item) => (
              <div
                onClick={() => OnSearchIconClick(item.name)}
                className=" group icon-wrapper"
                key={item.name}
              >
                {item.icon ? (
                  <Link to = {item.link} className="icon-style hover:text-font-light-white active:text-font-light-white">{item.icon} </Link>
                ) : (
                  "null"
                )}
              </div>
            ))}
          </div>
        </div>

        {/* for searchbutton clicked on small screens */}

        {showSearchBar && (
          <div className="absolute top-16 px-5 sm:top-18 left-0  w-full transition-all duration-300 ease-in-out">
            <Search />
          </div>
        )}
      </nav>

      {/* absolute of notificationPanel */}

      <NotificationPanel state = {showNotificationPanel} />


      {/* for large screen lg and up(1024px and up) */}

      <nav className="gsapNav absolute top-7 w-full z-50 max-lg:hidden opacity-95  ">
        {/* For small screens */}
        <div className="flex flex-row justify-between items-center lg:mx-4 xl:mx-6 px-6 xl:px-8 py-2 shadow-xl bg-secondary-color dark:bg-dark-secondary-color  rounded-2xl ">
          {/* 1st part   */}
          <div className="flex flex-row gap-1 items-center sm:gap-4 lg:gap-6 ">
            {/* hamburger */}
            <div>
              {largeScreenLinksForTopNav.slice(0, 1).map((item) => (
                <div className=" group icon-wrapper" key={item.name}>
                  {item.icon ? (
                    <Link to ={item.link} className="icon-style">{item.icon}</Link>
                  ) : (
                    "null"
                  )}
                </div>
              ))}
            </div>
            {/* logo */}
            <div>
              <Link to ="/" className="logo">TechHive</Link>
            </div>
          </div>

          {/* 2nd part */}

          <div className="flex flex-row items-center gap-1  lg:gap-4 xl:gap-8 ">
            <div>
              <Search />
            </div>

            <div className="flex flex-row gap-1 items-center  lg:gap-6 xl:gap-8 ">
              {largeScreenLinksForTopNav.slice(1).map((item) => (
                <Link to ={item.link}
                  className="flex flex-row gap-1 items-center "
                  key={item.name}
                >
                  {/* add the border animation on bottom for the icon names */}
                  {item.name && (
                    <span onClick={item.onClick ? item.onClick : undefined} className="group lg:text-md xl:text-lg  uppercase text-black hover:text-font-light-white dark:text-font-white dark:hover:text-font-light-white transition-colors duration-300 ease-in-out cursor-pointer  font-poppins">
                      {item.name}
                    </span>
                  )}

                  {item.showNumber && (
                    <div onClick={item.onClick ? item.onClick : undefined} className="relative flex flex-row">
                      <span className=" icon-style  ">{item.icon}</span>
                      <span className="absolute flex flex-row justify-center items-center top-0 right-0 bg-color-teal-500 rounded-full w-4 h-4 text-xs text-white font-semibold">
                      {item.name === "Cart"? <span>{user?(cartItems?.length || 0) : 0}</span>:<span>1</span>}
                     
                      </span>
                    </div>
                  )}

                  {item.onlyIcon && (
                    <span onClick={item.onClick ? item.onClick : undefined} className="hover:text-font-light-white cursor-pointer icon-style">{item.icon}</span>
                  )}

                 
                </Link>
              ))}

              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </nav>



      {/* bottom nav for small screens below 1024px ie. below lg */}

        <div className = "lg:hidden w-full fixed z-50 bottom-0 border-t rounded-full dark:border-tertiary-color border-dark-secondary-color  flex flex-row items-center">
        {/* 1st div */}
       
          {smallScreenLinksForBottomNav.map((item) => ( 
            <Link to ={item.link} key={item.name} className="relative  py-4 sm:py-6 md:py-8  flex-1 flex justify-center items-center">
              {item.icon && (
                <div onClick={item.onClick ? item.onClick : undefined} className = " relative flex flex-row">
                  <span className="icon-style hover:text-font-light-white active:text-font-light-white text-3xl cursor-pointer ">{item.icon}</span>
                  {item.showNumber && (
                    <span onClick={item.onClick ? item.onClick : undefined} className="absolute flex flex-row justify-center items-center -top-3 -right-3 bg-color-teal-500 rounded-full w-4 h-4 text-xs text-white font-semibold">
                       {item.name === "Cart"? <span>{user?(cartItems?.length || 0) : 0}</span>:<span>1</span>}
                       {/* if item.name is Cart and is a user and has cartItems.length show that else show 0 and if he is not a user show 0 */}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
           {/* 2nd div for dark mode */}
         <div className = "flex-1  flex justify-center">
            <ToggleDarkMode/>
         </div>

       
        

         </div>

    </>
  );
};

export default Navbar;
