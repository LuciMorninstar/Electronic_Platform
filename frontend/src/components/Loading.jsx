import React from 'react'
import { useState, CSSProperties } from "react";
import { HashLoader } from "react-spinners";




const Loading = () => {


    //   let [loading, setLoading] = useState(true);
    // const [color, setColor] = useState("#00bba7")
  return (
    <div className = "flex flex-row h-screen justify-center items-center w-full ">
         <HashLoader
        color="#00bba7"
        loading={true}

     
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading