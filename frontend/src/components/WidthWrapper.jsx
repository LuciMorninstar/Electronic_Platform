import React from 'react'

const WidthWrapper = ({children}) => {
  return (

    <div className = " w-full px-5 py-4 lg:px-6 lg:py-5 mx-auto ">
        {children}
    </div>
   
  )
}

export default WidthWrapper