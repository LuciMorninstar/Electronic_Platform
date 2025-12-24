import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from "./pages/HomePage"
import Error from './components/Error'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Privacy from "./pages/Privacy"
import Terms from './pages/Terms'
import TermsOfUse from './pages/TermsOfUse'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import AdminLayout from './layouts/AdminLayout'
import DashboardPage from './pages/Admin/DashboardPage'
import AdminProductPage from './pages/Admin/AdminProductPage'
import AddProductPage from './pages/Admin/AddProductPage'
import InvoicePage from './pages/InvoicePage'

// import { useEffect } from 'react'


const App = () => {


  
  

  return (

    <Router>
      <Routes>

        <Route path = "/" element = {<MainLayout/>}>

         <Route index element = {<HomePage/>}/>  
         <Route path="/privacy-policy" element = {<Privacy/>}/>  
         <Route path="/terms-services" element = {<Terms/>}/>  
         <Route path="/terms-of-use" element = {<TermsOfUse/>}/>    
         <Route path="/signIn" element = {<SignIn/>}/>  
         <Route path="/signUp" element = {<SignUp/>}/>  
         <Route path="/category" element = {<CategoryPage/>}/>  
         <Route path="/category/categoryname/product" element = {<ProductPage/>}/>  
         <Route path="/cart" element = {<CartPage/>}/>  

         {/* after placing order invoice is made */}

         <Route path = "/invoice" element = {<InvoicePage/>}/>
        

        </Route>

        {/* For Admin */}

        <Route path = "/admin" element ={<AdminLayout/>}>
        <Route index element={<DashboardPage/>}/>
        <Route path = "/admin/product" element={<AdminProductPage/>}/>
        <Route path = "/admin/product/add-product" element={<AddProductPage/>}/>
       

        </Route>
         <Route path="*" element={<Error/>}/>

      </Routes>
    </Router>
    
  )
}

export default App