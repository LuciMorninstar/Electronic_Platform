import React from 'react'
import {useState} from "react"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import techhive from "../assets/techhive.png"
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap"
import { useGSAP } from '@gsap/react';

import {Link, useNavigate} from "react-router-dom";
import { useUserStore } from '../utils/useUserStore';
import { Navigate } from 'react-router-dom';




const SignUp = () => {

  

  useGSAP(()=>{

    gsap.from("#gsapform",{
      y:200,
      opacity:0,
      duration:1,
      ease:"power2.out",
      delay:0.2

    

    })

    gsap.from("#gsapImage",{
      y:200,
      opacity:0,
      duration:1,
      ease:"power1.out",
      delay:0.3
    })

    gsap.from(".gsapFormCorner",{
      y:100,
      opacity:0,
      duration:1,
      ease:"power1.in",
      delay:0.4
    })
    gsap.from("#gsapFormContent",{
      y:100,
      opacity:0,
      duration:0.8,
      ease:"power1.in",
      delay:0.2
    })

    

  },[])

  const [formData, setFormData] = useState({fullName:"",email:"", password:"", confirmPassword:""});
  // const [loading, setLoading] = useState(true);
  // const [showPasswordToggle, setShowPasswordToggle] = useState(false);

  const {signUp, loading } = useUserStore();


const navigate = useNavigate();

  const handleFormSubmit = async (e) =>{
    e.preventDefault();

    console.log("SignUp", formData);
    const success = await signUp(formData);

    if(success){
      navigate("/signIn");
      
    }
  
  }
  

  return (

    <section className = "w-full h-screen flex flex-row items-center justify-center">

        <form onSubmit={handleFormSubmit} id="gsapform" className = "  relative z-50 overflow-hidden p-10 bg-secondary-color shadow-xl dark:bg-dark-secondary-color rounded-xl  ">
          <div className ="absolute bg-teal-500 -top-1/2 -translate-y-16 left-0 -translate-x-[27px] w-[450px] h-[450px] rounded-full flex flex-row justify-center items-end">
            <img id="gsapImage" className = " w-12 h-12 border-3 mb-5 border-white rounded-md" src={techhive} alt='logo'/>

          </div>

          <div id="gsapFormContent" className = "flex mt-20 mb-16 flex-col items-center gap-5">
          <h4>Create an Account</h4>
            <div className = "flex flex-col gap-3">
              <input className = " form-input-style " type="text" name="fullName" id="fullName" value={formData.fullName} placeholder='FullName' onChange = {(e)=>setFormData((prev)=>({...prev, fullName:e.target.value}))}></input>
              <input className = " form-input-style " type="email" name="email" id="email" value={formData.email} placeholder='Email' onChange = {(e)=>setFormData((prev)=>({...prev, email:e.target.value}))}></input>
            
              <div className ="relative w-full">
              <input className = " form-input-style " type="password" name="password" id="password" value={formData.password} placeholder='password' onChange = {(e)=> setFormData((prev)=> ({...prev, password:e.target.value}))}></input>
            </div>
              <div className ="relative w-full">
              <input className = " form-input-style " type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} placeholder='Re-Type your password' onChange = {(e)=> setFormData((prev)=> ({...prev, confirmPassword:e.target.value}))}></input>
            </div>

          

             


            </div>
            <button type="submit" className = " group w-full rounded-lg p-2 bg-color-teal-400 font-semibold font-poppins cursor-pointer flex flex-row gap-3 items-center justify-center hover:bg-color-teal-300   ">
              {loading ? <span>loading...</span> :
              <>
              <span className = " font-poppins text-font-white">Sign Up</span> <FaArrowRight className = "group-hover:translate-x-5 transition-all duration-300ms ease-in-out" />
              </>
              }
         
</button>
            <span className = "flex flex-row gap-2 text-font-white">Already have an account? <Link to ="/signIn" className = "text-color-teal-300 hover:text-color-teal-500 "><span className = "font-poppins text-teal-400 hover:text-color-teal-400">Sign In</span></Link></span>
            

            </div>

{/* two little circles osr one
            <div className = " absolute -bottom-12 -right-12  bg-teal-300 opacity-80 w-40 h-40 rounded-full "></div>
            <div className = " absolute bottom-8 right-8  bg-teal-300 w-26 h-26 rounded-full "></div> */}

            <div className = "gsapFormCorner absolute -bottom-20 -left-16  bg-teal-500 w-40 h-40 rounded-full "></div>
            <div className = "gsapFormCorner absolute -bottom-20 -right-16  bg-teal-500 w-40 h-40 rounded-full "></div>

        </form>


        

    </section>

   
  )
}

export default SignUp