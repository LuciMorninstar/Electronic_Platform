import React from 'react'
import { useProductStore } from '../utils/useProductStore';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const SearchForCompare = () => {

    const {searchProductByName, products,isSearching} = useProductStore(); 
    
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(()=>{
    
      const timeout =  setTimeout(()=>{
        searchProductByName(searchTerm);
    
      },300);
    
      return ()=> clearTimeout(timeout);
      
    
    },[searchTerm])

    // compare to

    const {compareTo, compareToProduct} = useProductStore();

    const comparingTo = (e,id)=>{

         compareTo(id);



    }






  return (
   <div className='relative'>
      
        <span className = "text-xl dark:text-white  absolute top-1/2 -translate-y-1/2 left-3 "><FiSearch/></span>
        <input className = "searchbar" type="text" placeholder='Search Products' name="search" id="search"
        value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value)}/>

       


        
      
        <div id="searchBar" className ={searchTerm && products?.length >0 ?"absolute top-12 left-0 w-full max-h-[360px] overflow-auto flex flex-col   rounded-lg bg-gray-200 dark:bg-dark-secondary-color transition-all duration-300 ease-in z-50":"hidden"}>
          {
            (products || []).map((item)=>(


              

              <button onClick ={(e)=>comparingTo(e,item?._id)} key ={item._id} className = "relative  group flex flex-row gap-5  odd:bg-tertiary-color even:bg-secondary-color dark:even:bg-dark-search-bar-bg dark:odd:bg-dark-tertiary-color  items-center">
                    {/* absolute */}
                  <div className ="absolute bottom-2 right-1 flex justify-end  pr-3 w-full flex-row gap-1 items-center">
                    <FaStar className = "text-yellow-500 text-sm"/>
                  <span className = "  overflow-hidden text-sm font-poppins">{item.rating}</span>
                  </div>
                  {/* absolute */}

                    {/* left */}

              <div className = " w-25 h-20 sm:w-30 sm:h-22    overflow-hidden ">
                <img className='w-full h-full object-cover  object-center group-hover:scale-110 transition-all duration-200 ease-in' src={item.images?.[0]?.url} alt={item.name}/>
              </div>
              {/* left */}


              {/* right */}
              <div className= "flex flex-col gap-1 w-full">
                <span className='line-clamp-1 font-semibold overflow-hidden font-poppins text-sm sm:text-sm'>{item.name}</span>
                <div className = "flex flex-row  gap-5"> 

                  <span className ="max-sm:hidden overflow-hidden font-poppins px-4 py-1 bg-primary-color dark:bg-dark-secondary-color rounded-lg text-xs ">{item.category}</span>
                  <span className ="max-sm:hidden overflow-hidden font-poppins px-4 py-1 bg-primary-color dark:bg-dark-secondary-color rounded-lg text-xs ">{item.brand}</span>
 

                
                </div>
              </div>

              {/* right */}
              


            </button>
            
              

            ))
          }
          
      

        

        </div>
          
        
    </div>
  )
}

export default SearchForCompare