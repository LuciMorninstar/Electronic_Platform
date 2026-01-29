import React from 'react'
import WidthWrapper from './WidthWrapper'
import { useState } from 'react'
import { useCartStore } from '../utils/useCartStore'
import { useEffect } from 'react'
import CheckoutProducts from './CheckoutProducts'
import OrderSummary from './OrderSummary'
import { Link, useNavigate } from 'react-router-dom'
import { useOrderStore } from '../utils/useOrderStore'
import gsap from "gsap"
import { useLayoutEffect } from 'react'
import { useRef } from 'react'



const CheckoutPage = () => {

  const [formData, setFormData] = useState({fullName:"",region:"",phoneNo:"",city:"", area:"", colony:"",houseNo:"",address:""})

  const regions = ["Koshi Province", "Madhesh Province", "Bagmati Province", "Gandaki Province", "Lumbini Province", "Karnali Province", "Sudurpashchim Province"];

  const districtsByRegion = {
  "Koshi Province": [
    "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", 
    "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", 
    "Sunsari", "Taplejung", "Terhathum"
  ],
  "Madhesh Province": [
    "Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", 
    "Saptari", "Sarlahi", "Siraha"
  ],
  "Bagmati Province": [
    "Bhaktapur", "Kathmandu", "Chitwan", "Dhading", "Dolakha", "Kavrepalanchok", 
    "Khotang", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", 
    "Rasuwa", "Sindhuli", "Sindhupalchok"
  ],
  "Gandaki Province": [
    "Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", 
    "Mustang", "Myagdi", "Parbat", "Syangja", "Tanahun"
  ],
  "Lumbini Province": [
    "Arghakhanchi", "Gulmi", "Kapilvastu", "Palpa", "Nawalparasi East", 
    "Nawalparasi West", "Rupandehi", "Dang", "Banke", "Bardiya"
  ],
  "Karnali Province": [
    "Dailekh", "Dolpa", "Jajarkot", "Humla", "Kalikot", 
    "Mugu", "Salyan", "Surkhet", "Jumla"
  ],
  "Sudurpashchim Province": [
    "Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", 
    "Darchula", "Doti", "Kailali", "Kanchanpur"
  ]
};


    const {getAllCartProducts,loading, cartItems} = useCartStore();
  
  
      useEffect(()=>{
      getAllCartProducts();
      },[])

      const grandTotal = cartItems?.reduce(
  (total, item) => total + (item.product?.price || 0) * item.quantity,
  0
);

const freeCities = ["Kathmandu", "Lalitpur", "Bhaktapur"];
const shippingCharges = freeCities.includes(formData.city) ? 0 : 150;

const grandTotalWithShipping = grandTotal + shippingCharges;


const totalQuantity = cartItems?.reduce((sum,item)=> sum + item.quantity , 0);

const navigate = useNavigate();

const {cashOnDelivery,order} = useOrderStore();
        

const cashingOnDelivery =async(e,formData,shippingCharges)=>{
  e.preventDefault();
  e.stopPropagation();


  await cashOnDelivery({formData,shippingCharges});
  navigate("/myOrders");


}


// gsap

const deliveryRef = useRef(null);
const productRef = useRef(null);
const summaryRef = useRef(null);



useLayoutEffect(()=>{

  if(!cartItems || cartItems.length<=0) return;

  const ctx = gsap.context(()=>{

    const tl = gsap.timeline({defaults:{ease:"power3.out"}})

    tl.fromTo(deliveryRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,scale:1}
    )
    tl.fromTo(productRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.8"
    )
    tl.fromTo(summaryRef.current,
      {opacity:0,y:30,scale:0.7},
      {opacity:1,y:0, duration:0.8,delay:0.2,scale:1},"-=0.4"
    )

  })
  return ()=> ctx.revert();


},[cartItems])

        
  


  



  return (

    <WidthWrapper>
        <section className = "w-full min-h-screen flex flex-col items-center  mt-26 ">

          <div className = " max-w-8xl flex flex-col xl:flex-row gap-5 sm:px-10 lg:px-20 ">
              {/* first div */}
              <div  className = "flex flex-col gap-10 max-sm:text-xs">
                <form ref={deliveryRef} className='bg-secondary-color shadow-xl dark:bg-dark-secondary-color max-sm:px-10 sm:px-20 lg:px-10 xl:px-10 rounded-xl  py-10 '>
                  <div className = "flex flex-col gap-5">

                    <div className='text-center '>
                      <h4>Delivery Information</h4>
                    </div>
                    {/* form starts */}
                    <div className = "flex flex-col gap-3 items-center"> 
                      {/* one row input */}
                      <div className = "flex flex-col lg:flex-row gap-5 lg:gap-10">
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Full Name</span>
                            <input className = "admin_form_small_input_style " type="text" id="fullName" name="fullName" placeholder = "Enter your name" 
                        onChange = {(e)=>setFormData({...formData, fullName:e.target.value})} value = {formData.fullName}/>
                          
                        </div>
                        {/* /one input */}
                        {/* one input */}
                         <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Region</span>
                       <select className = "admin_form_small_input_style" value ={formData.region} onChange ={(e)=>setFormData({...formData, region:e.target.value})}>
                        <option value=""  hidden >Choose a region</option>
                        {regions.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                        {/* /one input */}

                      </div>
                      {/* one row input ends */}
                      {/* one row input */}
                      <div className = "flex flex-col lg:flex-row gap-5 lg:gap-10">
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Phone Number</span>
                            <input className = "admin_form_small_input_style hide-number-spin " type="number" id="phoneNo" name="phoneNo" placeholder = "Ex. 987234234" 
                        onChange = {(e)=>setFormData({...formData, phoneNumber:e.target.value})} value = {formData.phoneNumber}/>
                          
                        </div>
                        {/* /one input */}
                        {/* one input */}
                       <div className = "flex flex-col gap-1">
                        <span className = "heading_style">City</span>
                       <select className = "admin_form_small_input_style" value ={formData.city} onChange ={(e)=>setFormData({...formData, city:e.target.value})} disabled={!formData.region}>
                        <option value=""  hidden >Choose a city</option>
                        {formData.region && districtsByRegion[formData.region]?.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                        {/* /one input */}

                      </div>
                      {/* one row input ends */}
                      {/* one row input */}
                      <div className = "flex flex-col lg:flex-row gap-5 lg:gap-10">
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Area</span>
                            <input className = "admin_form_small_input_style " type="text" id="area" name="area" placeholder = "Enter your area" 
                        onChange = {(e)=>setFormData({...formData, area:e.target.value})} value = {formData.area}/>
                          
                        </div>
                        {/* /one input */}
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Colony</span>
                            <input className = "admin_form_small_input_style " type="text" id="colony" name="colony" placeholder = "Enter your colony" 
                        onChange = {(e)=>setFormData({...formData, colony:e.target.value})} value = {formData.colony}/>
                          
                        </div>
                        {/* /one input */}

                      </div>
                      {/* one row input ends */}
                      {/* one row input */}
                      <div className = "flex flex-col lg:flex-row gap-5 lg:gap-10">
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Building / HouseNo / Floor / Street</span>
                            <input className = "admin_form_small_input_style " type="text" id="houseNo" name="houseNo" placeholder = "Enter your house No." 
                        onChange = {(e)=>setFormData({...formData, houseNo:e.target.value})} value = {formData.houseNo}/>
                          
                        </div>
                        {/* /one input */}
                        {/* one input */}
                        <div className = 'flex flex-col gap-1'>
                          <span className='heading_style'>Address</span>
                            <input className = "admin_form_small_input_style " type="text" id="address" name="address" placeholder = "Ex. House# 123, Street# 123" 
                        onChange = {(e)=>setFormData({...formData, address:e.target.value})} value = {formData.address}/>
                          
                        </div>
                        {/* /one input */}

                      </div>
                      {/* one row input ends */}
                      
                      

                    </div>

                  </div>


                </form>

                 <div ref={productRef}>     
                <CheckoutProducts/>
                </div>  
                


              </div>
              
              {/* first div finished*/}
              
                {/* second div */}
                <div ref={summaryRef} className='w-full  px-5  '>
                

                  <aside className = " w-full  lg:w-full flex flex-col gap-y-7 rounded-lg  items-center  max-lg:px-4 text-xs sm:text-sm lg:text-base ">
                        
                        <div className = "w-full  flex flex-row justify-between  border-b-1 py-5 border-gray-500 ">
                            <h4 className='mx-auto'>Order Summary</h4>
                            
                        </div>
                            {/* card */}
                        <div className = "w-full flex flex-col gap-5 px-10 py-5 bg-tertiary-color shadow-md dark:bg-dark-secondary-color rounded-lg">
                          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
                            <span>Total Quantity</span>
                            <span>{totalQuantity}</span>
                
                          </div>
                
                          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
                            <span>Original Price</span>
                            <span>{grandTotal}</span>
                
                          </div>
                          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
                            <span>Shipping Charges </span>
                            <span>{shippingCharges} </span>
                        
                
                          </div>
                          <div className = "flex flex-row justify-between items-center border-b-1 border-font-light-white py-2">
                            <span>Total Price</span>
                            <span>{grandTotalWithShipping}</span>
                
                          </div>

                          <div className = "flex flex-col gap-3 items-center justify-center">
                
                          <Link to ="/checkout" className = "w-full outline-none bg-color-teal-500 hover:bg-teal-600 transition-colors duration-200 ease-in cursor-pointer text-font-white text-center px-3 py-3 rounded-lg">
                            Payment Via Khalti
                
                          </Link>
                          <div className='relative w-full flex items-center justify-center'>
                            {/* absolutes */}
                            <div className ="absolute left-3 w-1/3
                             h-[1px] bg-white">
                            </div>
                            <div className ="absolute right-3 w-1/3
                             h-[1px] bg-white">
                            </div>
                            {/* /absolutes */}
                          <span className = "w-full  text-center">or</span>
                          </div>
                          <button onClick={(e)=>cashingOnDelivery(e,formData,shippingCharges)} to ="/checkout" className = "w-max outline-none bg-color-teal-500 hover:bg-teal-600 transition-colors duration-200 ease-in cursor-pointer text-font-white text-center px-3 py-3 rounded-lg">
                            Cash on Delivery
                          </button>
                          </div>

                          <span className="text-color-teal-400">* No shipping charges inside Kathmandu valley</span>
                
                       
                        </div>
                        {/* card */}
                
                        </aside>
                
                </div>
           
              {/* second div  finished*/}

          </div>

        </section>

    </WidthWrapper>
    
 
  )
}

export default CheckoutPage