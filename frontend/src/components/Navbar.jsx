import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoIosHeart } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

import { IoMdCart } from "react-icons/io";
import Search from "./Search";
import { useState } from "react";
import ToggleDarkMode from "./ToggleDarkMode";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const OnSearchIconClick = (iconname) => {
    if (iconname === "search") {
      setShowSearchBar((prev) => !prev);
      // console.log("searchbar status", showSearchBar);
    }
  };

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

    { name: "User", link: "", icon: <FiUser />, showNumber: false },
  ];

  const largeScreenLinksForTopNav = [
    {
      name: "dashboard",
      link: "",
      icon: <RxHamburgerMenu />,
      showNumber: false,
    },
    {
      name: "Wishlist",
      link: "",
      icon: <IoIosHeart />,
      showNumber: false,
    },
    {
      name: "Orders",
      link: "",
      icon: <IoIosHeart />,
      showNumber: false,
    },
    {
      name: "Cart",
      link: "",
      icon: <IoMdCart />,
      showNumber: true,
    },

    {
      name: "Notification",
      link: "",
      icon: <IoMdNotifications />,
      showNumber: true,
    },

    { name: "", link: "", icon: <FiUser />, showNumber: false, onlyIcon: true },
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
      link: "",
      icon: <IoMdHeart />,
      showNumber: false,
    },
    {
      name: "Cart",
      link: "",
      icon: <IoMdCart />,
      showNumber: true,
    },
  ];

  return (
    <>
      <nav className=" absolute z-50 top-6 w-full  lg:hidden opacity-100  ">
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
              <span className="logo">TechHive</span>
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
                  <span className="icon-style">{item.icon} </span>
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

      {/* for large screen lg and up(1024px and up) */}

      <nav className=" absolute top-7 w-full z-50 max-lg:hidden opacity-95  ">
        {/* For small screens */}
        <div className="flex flex-row justify-between items-center lg:mx-4 xl:mx-6 px-6 xl:px-8 py-2 bg-secondary-color dark:bg-dark-secondary-color  rounded-2xl ">
          {/* 1st part   */}
          <div className="flex flex-row gap-1 items-center sm:gap-4 lg:gap-6 ">
            {/* hamburger */}
            <div>
              {largeScreenLinksForTopNav.slice(0, 1).map((item) => (
                <div className=" group icon-wrapper" key={item.name}>
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
              <span className="logo">TechHive</span>
            </div>
          </div>

          {/* 2nd part */}

          <div className="flex flex-row items-center gap-1  lg:gap-4 xl:gap-8 ">
            <div>
              <Search />
            </div>

            <div className="flex flex-row gap-1 items-center  lg:gap-6 xl:gap-8 ">
              {largeScreenLinksForTopNav.slice(1).map((item) => (
                <div
                  className="flex flex-row gap-1 items-center "
                  key={item.name}
                >
                  {/* add the border animation on bottom for the icon names */}
                  {item.name && (
                    <span className="lg:text-md xl:text-lg  uppercase text-white font-poppins">
                      {item.name}
                    </span>
                  )}

                  {item.showNumber && (
                    <div className="relative flex flex-row">
                      <span className="icon-style  ">{item.icon}</span>
                      <span className="absolute flex flex-row justify-center items-center top-0 right-0 bg-color-teal-500 rounded-full w-4 h-4 text-xs text-white font-semibold">
                        1
                      </span>
                    </div>
                  )}

                  {item.onlyIcon && (
                    <span className="icon-style">{item.icon}</span>
                  )}
                </div>
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
            <div key={item.name} className="relative  py-4 sm:py-6 md:py-8  flex-1 flex justify-center items-center">
              {item.icon && (
                <div className = " relative flex flex-row">
                  <span className="icon-style text-3xl ">{item.icon}</span>
                  {item.showNumber && (
                    <span className="absolute flex flex-row justify-center items-center -top-3 -right-3 bg-color-teal-500 rounded-full w-4 h-4 text-xs text-white font-semibold">
                      1
                    </span>
                  )}
                </div>
              )}
            </div>
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
