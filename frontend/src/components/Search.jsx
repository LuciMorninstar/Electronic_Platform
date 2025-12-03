import React from 'react'
import { FiSearch } from "react-icons/fi";


const Search = () => {
  return (

    <div className='relative'>
        <span className = "text-xl dark:text-white  absolute top-1/2 -translate-y-1/2 left-3 "><FiSearch/></span>
        <input className = "searchbar" type="text" placeholder='Search Products' name="search" id="search"/>
    </div>
    
  )
}

export default Search