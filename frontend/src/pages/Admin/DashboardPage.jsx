import React from 'react'
import { PiUsersThreeLight } from "react-icons/pi";
import { RiBox3Line } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCoinRupee } from "react-icons/tb";
import WidthWrapper from '../../components/WidthWrapper'
import DashboardCard from '../../components/AdminComponents/DashboardCard'
import { useUserStore } from '../../utils/useUserStore';
import { useOrderStore } from '../../utils/useOrderStore';
import { FcPaid } from "react-icons/fc";


import { useProductStore } from '../../utils/useProductStore';


const DashboardPage = () => {

  const {gettingUsers, users, paidUsers, gettingPaidUsers} = useUserStore();
  const {gettingAllOrders, orders} = useOrderStore();
  const {products} = useProductStore();
  

  const totalInventory = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  const totalRevenue = orders.reduce((total,order)=>{
    return total + order.payment.amountPaid;
  },0)

  
      const adminCards = [
        {name:"Customers", icon:<PiUsersThreeLight />, value:users?.length || null},
        {name:"Orders", icon:<RiBox3Line />, value:orders?.length || null},
        {name:"Total Inventory", icon:<MdOutlineProductionQuantityLimits />, value:totalInventory || null},
        {name:"Total Revenue", icon:<TbCoinRupee />, 
          value:`Rs ${totalRevenue.toLocaleString()}`
        },
        {name:"Total Paid Users", icon:<FcPaid />, 
          value:paidUsers?.length || null
        },
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