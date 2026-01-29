import React from 'react'
import { useCartStore } from '../utils/useCartStore'
import { useEffect } from 'react'

const CheckoutProducts = () => {

    const {getAllCartProducts,loading, cartItems} = useCartStore();
useEffect(()=>{
        getAllCartProducts();
      },[])

  return (



                
    <div className = "flex flex-col gap-0 bg-primary-color dark:bg-dark-secondary-color px-10 py-8 rounded-lg ">
        <h4 className = "pb-5 text-center" >Product Overview</h4>
    {
        cartItems?.map((item,i)=>(
            // card
            <div key={i} className = "relative overflow-hidden group w-full  flex flex-row items-center  even:bg-tertiary-color odd:bg-secondary-color dark:odd:bg-dark-secondary-color dark:even:bg-dark-search-bar-bg  ">
            
            

                    {/* left div   */}
                <div className = " w-1/2  flex flex-row gap-3 items-center">
                        {/* for image */}
                <div className = "w-20 h-16 rounded-lg overflow-hidden ">
                    <img className = "w-full group-hover:scale-120 transition-all duration-300 ease-in h-full object-cover object-center" src={item.product?.images?.[0]?.url} alt="image"/>
                </div>
                {/* /for image */} 
                <div>
                    <span className = "text-xs sm:text-base lg:text-xs font-semibold font-poppins">{item.product?.name.slice(0,27)+"..."}</span>
                </div>

                </div>
                {/* /left div */}

                {/* right div */}
                <div className = "flex flex-row gap-5 items-center">
                    {/* for quantity */}
                    <div className='flex flex-row gap-0'>
                    

                    <input className = " text-xs sm:text-sm border-2 border-font-light-white w-8 h-8 text-center rounded-lg" type="text" id="quantity" onChange={(e)=>e.target.value } value={item.quantity} />
                    
                
                    </div>
                    {/* quantity ends */}

                    {/* for price */}
                    <span className = "text-xs sm:text-sm">Rs. {item.product?.price.toLocaleString()}</span>
                    {/* /for price */}

                    {/* for total price */}
                    <span className = " text-xs sm:text-sm">Rs.{(item.quantity * item.product?.price).toLocaleString() }</span>


                    


                </div>

                {/* /right div */}

                


            </div>
        ))

    }
    </div>



                


  
  )
}

export default CheckoutProducts