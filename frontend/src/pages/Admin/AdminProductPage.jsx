import React from 'react'

import laptop from "../../assets/laptop.webp";
import monitor from "../../assets/monitor.webp"

import { HiPlus } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdOutlineStarBorder } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";







import WidthWrapper from '../../components/WidthWrapper';

const AdminProductPage = () => {

   const productItems = [
      {
        name: "Asus Rog strix g15",
        rating: 4.5,
        category: "laptop",
        brand: "Asus",
        price: 90000,
        image: laptop,
      },
      {
        name: "Lenovo Legion",
        rating: 4.2,
        category: "laptop",
        brand: "Asus",
        price: 90000,
        image: monitor,
      },
      {
        name: "Logitech",
        rating: 4,
        category: "Mouse",
        brand: "Logitech",
        price: 9000,
        image: laptop,
      },
      {
        name: "Asus Rog strix g15",
        rating: 4.5,
        category: "laptop",
        brand: "Asus",
        price: 90000,
        image: monitor,
      },
      {
        name: "Lenovo Legion",
        rating: 4.2,
        category: "laptop",
        brand: "Asus",
        price: 90000,
        image: laptop,
      },
      {
        name: "Logitech",
        rating: 4,
        category: "Mouse",
        brand: "Logitech",
        price: 9000,
        image: monitor,
      },
    ];

    const categories = ["Laptop","Headphone","Monitor","Mouse","Mobile" ];
  
  return (

<section className = "max-w-7xl mx-auto py-10 px-5 flex flex-col gap-8 items-center min-h-screen ">

  
 

  <h3 className = "uppercase w-full text-center ">Products</h3>


 <table className = "w-full">
  <thead className = "">
    <tr className = "bg-tertiary-color dark:bg-dark-secondary-color rounded-2xl ">
      <th className = "text-left py-3 px-6">Product</th>
      <th className = "text-left py-3 px-6">Price</th>
      <th className = "text-left py-3 px-6">Category</th>
      <th className = "text-left py-3 px-6">Featured</th>
      <th className = "text-left py-3 px-6">Actions</th>
    </tr>
  </thead>

  <tbody>
    {productItems.map((product,i)=>(
      <tr key={i} className = "  shadow-sm dark:even:bg-dark-search-bar-bg dark:odd:bg-dark-tertiary-color transition-all duration-300 ease-in">
        <td className = " px-4 py-4 flex flex-row gap-5 items-center">
          <div className = "w-14 h-14 rounded-full overflow-hidden">
            <img className = "w-full object-cover object-center h-full" src={product.image} alt = {product.name}/>
          </div>
          <span className = "text-sm lg:text-base  font-semibold">{product.name}</span>
        </td>

        <td className = "text-start">
          <span className = "text-sm lg:text-base">Rs. {product.price}</span>
        </td>

        <td className = "text-start px-8">
          <span className = "text-sm  lg:text-base">{product.category}</span>
        </td>
        <td className = "px-10">
          <div className = "p-2 w-max rounded-full cursor-pointer bg-white hover:bg-yellow-500 active:bg-yellow-500 transition-all duration">
          <MdOutlineStarBorder className = "text-2xl text-black" />
          </div>
        </td>
        <td className = "flex flex-row gap-5 items-center px-2">
          <Link to ={`/admin/product/${product.id}`}  className = "p-2 w-max rounded-full bg-white cursor-pointer hover:bg-teal-400 active:bg-teal-400 transition-all duration-300 ease-in">
          <MdOutlineSystemUpdateAlt className = "text-2xl text-black" />
          </Link>
          <Link to = {`/admin/product/${product.id}`} className = "p-2 w-max rounded-full bg-white cursor-pointer hover:bg-red-400 active:bg-red-400 transition-all duration-300 ease-in">
          <AiOutlineDelete className = "text-2xl text-black" />
          </Link>
        </td>
        
        
      </tr>

    ))}
  </tbody>

 </table>

 {/* add a product section */}

  <div className = "w-full  flex flex-col gap-5 items-center mt-5">

    {/* <span className = "font-audiowide text-base lg:text-xl xl:text-2xl font-semibold">Looking to Add a Product !</span> */}

    <Link to = "/admin/product/add-product" className = "w-max px-6 py-3 bg-teal-400 cursor-pointer rounded-md text-base lg:text-lg xl:text-xl font-poppins font-semibold"> Add a Product</Link>
  
    
  </div>

   {/* add a product section ends */}


</section>
     

 

  )
}

export default AdminProductPage