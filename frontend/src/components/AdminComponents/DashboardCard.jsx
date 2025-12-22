import React from 'react'





const DashboardCard = ({adminCards}) => {



  
  return (
      <div className= " grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {adminCards.map((card)=>(
            <div key ={card.name} className = "flex flex-col gap-4 lg:gap-7 items-center justify-center bg-tertiary-color dark:bg-dark-secondary-color shadow-md dark:border-gray-800 rounded-2xl p-8">
                <div className = "dark:text-font-white text-xl lg:text-2xl rounded-lg p-3 bg-secondary-color dark:bg-dark-search-bar-bg ">
                      <span className = "">{card.icon}</span>
                </div>
              
                <span className =" text-base lg:text-lg xl:text-xl font-semibold">{card.name}</span>
                <span className = "text-base lg:text-lg xl:text-xl">{card.value}</span>
            </div>
        ))}

      </div>

    
  )
}

export default DashboardCard