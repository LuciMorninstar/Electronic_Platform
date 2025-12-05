import React from 'react'
import {useState} from "react"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import techhive from "../assets/techhive.png"
import {Link} from "react-router-dom"
''



const SignIn = () => {

  const [formdata, setFormData] = useState("");
  // const [showPasswordToggle, setShowPasswordToggle] = useState(false);

  return (

    <section className = "w-full h-screen flex flex-row items-center justify-center">

        <form className = "  relative z-50 overflow-hidden p-10 bg-secondary-color dark:bg-dark-secondary-color rounded-xl">
          <div className ="absolute bg-teal-500 -top-1/2 -translate-y-2/8 left-0 -translate-x-[27px] w-[450px] h-[450px] rounded-full flex flex-row justify-center items-end">
            <img className = " w-12 h-12 border-3 mb-8 border-white rounded-md" src={techhive} alt='logo'/>

          </div>

          <div className = "flex mt-26 mb-16 flex-col items-center gap-5">
          <h4>Sign In To Your Account</h4>
            <div className = "flex flex-col gap-3">
              <input className = " form-input-style " type="email" name="email" id="email" value="" placeholder='Email'></input>
              <div className ="relative w-full">
              <input className = " form-input-style " type="password" name="password" id="password" value="" placeholder='password'></input>

            
              {/* <span onClick={()=>setShowPasswordToggle(prev => !prev)} className = "text-2xl absolute top-1/2 -translate-1/2 right-0 cursor-pointer ">
                {showPasswordToggle?(<IoIosEye/>):(<IoIosEyeOff/>)}
              
                </span> */}

              </div>


            </div>
            <button className = "w-full rounded-lg p-2 bg-color-teal-400 font-semibold font-poppins cursor-pointer  ">Sign In</button>
            <span className = "flex flex-row gap-2">Don't have an account? <Link to ="/signUp" className = "text-color-teal-400 hover:text-color-teal-200">Sign up</Link></span>

            </div>

{/* two little circles osr one
            <div className = " absolute -bottom-12 -right-12  bg-teal-300 opacity-80 w-40 h-40 rounded-full "></div>
            <div className = " absolute bottom-8 right-8  bg-teal-300 w-26 h-26 rounded-full "></div> */}

            <div className = " absolute -bottom-20 -left-16  bg-teal-500 w-40 h-40 rounded-full "></div>
            <div className = " absolute -bottom-20 -right-16  bg-teal-500 w-40 h-40 rounded-full "></div>

        </form>


        

    </section>

   
  )
}

export default SignIn