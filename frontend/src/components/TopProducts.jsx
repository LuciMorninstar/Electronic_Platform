import React from 'react'
import WidthWrapper from './WidthWrapper'
import { useProductStore } from '../utils/useProductStore'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { Trophy } from 'lucide-react';
import claw from "../assets/clawteal2.png"
import Loading from './loading';

const TopProducts = ({className}) => {

    const {getTopRatedRecentProducts, loading, topRatedRecentProducts} = useProductStore();

    useEffect(()=>{
        getTopRatedRecentProducts();

    },[])

      useEffect(() => {
        console.log("topRatedRecentProducts updated:", topRatedRecentProducts);
      }, [topRatedRecentProducts]);


  return (


   
            <div className = {`mt-5 flex flex-col gap-5 bg-tertiary-color dark:bg-dark-search-bar-bg py-3 px-5 rounded-xl h-max ${className} `}>
                <div className='flex flex-row gap-2 items-center'>
                    <span className = "h-10 w-10 rounded-full bg-color-teal-500 flex items-center justify-center"><Trophy /></span>
                   <h3>Top Rated</h3> 
                </div>

                {loading?
                <Loading/>:
                
        <div className = "flex flex-col gap-2">     
            {
                (topRatedRecentProducts || []).map((item,i)=>(

               <Link  to ={`/product/${item._id}`} key ={item._id} className = "relative  group rounded-lg flex flex-row gap-1 shadow-md bg-tertiary-color  dark:bg-dark-tertiary-color  items-center overflow-hidden ">
                    {/* absolute */}
                    
                    {/* absolute of rating */}
                  <div className ="absolute bottom-2 left-1 flex justify-center pl-10   w-full flex-row gap-1 items-center">
                    <FaStar className = "text-yellow-500 text-sm"/>
                  <span className = "  overflow-hidden text-sm font-poppins">{item.rating}</span>
                  </div>
                  {/* absolute of raing ends */}

                    {/* for top 3 only */}
            {i<3 &&
                    (
                  <div className='absolute -left-5 -top-2 h-full group-hover:-translate-x-5 group-hover:translate-y-5 transition-all duration-100 ease-in brightness-60 group-hover:brightness-110 z-0 '>
                    <img className = "h-full w-full scale-140" src={claw} alt="claw"/>
                    
                  </div>
            )}
            {/* for top3 only ends             */}

            {/* for numbering */}

            

            <div className = "absolute left-2 size-9  rounded-full flex items-center justify-center border border-gray-700 group-hover:bg-color-teal-500 transition-all duration-100 ease-in group-hover:border-0">
                <span>{i+1}</span>

            </div>



                  {/* absolute */}



            


              {/* left */}
              <div className= "relative z-10 flex flex-col gap-1 w-full pl-12">
                <span className='line-clamp-1 font-semibold overflow-hidden font-poppins text-sm sm:text-sm pl-3'>{item.name}</span>
                <div className = "flex flex-row  gap-3"> 

                  <span className ="max-sm:hidden overflow-hidden font-poppins px-4 py-1 bg-primary-color dark:bg-dark-secondary-color rounded-lg text-xs ">{item.category}</span>
                  <span className ="max-sm:hidden overflow-hidden font-poppins px-4 py-1 bg-primary-color dark:bg-dark-secondary-color rounded-lg text-xs ">{item.brand}</span>
 

                
                </div>
              </div>

              {/* left */}

                      {/* right */}

              <div className = " w-30 h-25 sm:w-45 sm:h-25    overflow-hidden ">
                <img className='w-full h-full object-cover  object-center group-hover:scale-110 transition-all duration-200 ease-in' src={item.images?.[0]?.url} alt={item.name}/>
              </div>
              {/* right */}
              

                
                

          
              





            </Link>            
                    

                ))
            }

        </div>   
                }

</div>
         





    


  )
}

export default TopProducts