import React, { useEffect } from 'react'
import { useState } from 'react'
import { GiLightningFlame } from "react-icons/gi";
import { GiMoonBats } from "react-icons/gi";



const ToggleDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(()=>{

           if(isDarkMode){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }

    },[isDarkMode])
   
     
    


  return (

    <div onClick={()=>setIsDarkMode(prev=>!prev)} className ="">
        {isDarkMode ?(<GiLightningFlame className ="text-5xl rounded-full px-2 py-2 dark:text-black bg-gray-200 cursor-pointer shadow-md" />) :(<GiMoonBats className = "text-5xl rounded-full px-2 py-2 bg-gray-200 cursor-pointer shadow-md" />)
}
    </div>
   
  )
}

export default ToggleDarkMode



