import React from 'react'
import {Link} from "react-router-dom"
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaFacebook, FaTiktok } from 'react-icons/fa6';
import { BsInstagram, BsTwitterX } from "react-icons/bs";






const Footer = () => {

  const footerItems = [
    {topic:"Reach Us",
       links:[
        {title:"+977 9876423432", to:"tel:+9779876423432", icon:<FiPhoneCall />},
        {title:"techhive21@gmail.com", to:"mailto:techhive21@gmail.com", icon:<MdEmail />},
        {title:"Near BridgeWater College, Kathmandu", to:"https://maps.app.goo.gl/YbZXheNXBQKeYPeR6", icon:<MdOutlineLocationOn />},
      ]
    },
    {topic:"Legal",
       links:[
        {title:"Privacy Policy", to:"/privacy-policy"},
        {title:"Terms & Services", to:"/terms-services"},
        {title:"Terms of Use", to:"/terms-of-use"},
      ]
    },

  ]



const socialMedias = [
  
  {name:"Instagram", icon:<BsInstagram/>, link:"https://www.instagram.com/kpbibek/"},
  {name:"X", icon:<BsTwitterX/>,link:"https://x.com/stars_winn69101"},
  {name:"Tiktok", icon:<FaTiktok/>, link:"www.tiktok.com"},
  ]


  return (
   <section className="mt-10 px-10 py-10 lg:py-15 lg:px-26 w-full dark:bg-dark-secondary-color flex flex-col gap-15 justify-center items-center">

    <div className = " border-t-2 border-gray-600 w-full">
{/* This is a border at top */}
    </div>
  
  {/* links top section */}
  <div className = "grid grid-cols-2 gap-15 sm:gap-20 md:gap-30 lg:gap-40 xl:gap-60 w-full sm:w-max  mx-auto  ">
{
  footerItems.map((item,i)=>(
    <div  key ={i} className = "  flex flex-col gap-5">
      <h4>{item.topic}</h4>
      {item.links.map((link,i)=>(
        <div key={i} className = " group flex flex-row gap-2 items-center">
          {link.icon && (<span className = "footer_icons">{link.icon}</span>)}
          
        <Link to ={link.to} className = {`${link.icon?"footer_links":"cursor-pointer footer_links"}`}>{link.title}</Link>
        </div>
      ))}
    </div>
  ))


}
  

  </div>
 

  {/* social medias bottom section */}
  <div className="flex flex-row gap-5 w-full items-center justify-center ">
    {socialMedias.map((social, i) => (
      <div className = "group hover:bg-font-white active:bg-font-white bg-black p-3  rounded-full cursor-pointer transition-all duration-200 ease-in-out ">
      <Link to = {social.link} key={i} className="text-xl lg:text-2xl  text-white group-hover:text-black active:text-black transition-all duration-300 ease-in-out ">
        {social.icon}
      </Link>
      </div>
    ))}
  </div>

</section>

  )
}


export default Footer