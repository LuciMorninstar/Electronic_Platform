import React from 'react'

const ProductWidthWrapper = ({children}) => {
  return (
   <div className = " max-lg:px-5 max-xl:px-20 xl:max-w-7xl flex flex-col gap-y-10 py-5 lg:py-10 mx-auto">
    {children}
   </div>
  )
}

export default ProductWidthWrapper