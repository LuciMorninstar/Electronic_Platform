import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <main className = "w-full min-h-screen flex flex-col">
        <Navbar/>
        <div className = "flex flex-col w-full ">
            <Outlet/>
        </div>
        <Footer/>
    </main>
  )
}

export default MainLayout