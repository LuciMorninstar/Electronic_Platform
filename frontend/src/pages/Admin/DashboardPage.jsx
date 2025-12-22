import React from 'react'
import { PiUsersThreeLight } from "react-icons/pi";
import { RiBox3Line } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCoinRupee } from "react-icons/tb";
import WidthWrapper from '../../components/WidthWrapper'
import DashboardCard from '../../components/AdminComponents/DashboardCard'


const DashboardPage = () => {
  
      const adminCards = [
        {name:"Customers", icon:<PiUsersThreeLight />, value:24},
        {name:"Orders", icon:<RiBox3Line />, value:10},
        {name:"Total Inventory", icon:<MdOutlineProductionQuantityLimits />, value:89},
        {name:"Total Revenue", icon:<TbCoinRupee />, value: "Rs. 234876"
}
      ]

  return (
    <WidthWrapper>
      <section className = "flex flex-col gap-5 ">
        <DashboardCard adminCards = {adminCards}/>
  
      </section>

    </WidthWrapper>
  )
}

export default DashboardPage