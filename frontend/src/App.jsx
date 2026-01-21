import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
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
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './utils/useUserStore'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './components/CheckoutPage'
import OrderPage from './pages/OrderPage'
import NotificationPanel from './components/NotificationPanel'
import FilterPage from './pages/FilterPage'


// import { useEffect } from 'react'


const App = () => {

  const {user} = useUserStore();


  
  

  return (

    <Router>
      <Toaster position='top-right'/>
      
      <Routes>

        <Route path = "/" element = {<MainLayout/>}>

         <Route index element = {<HomePage/>}/>  
         <Route path="/privacy-policy" element = {<Privacy/>}/>  
         <Route path="/terms-services" element = {<Terms/>}/>  
         <Route path="/terms-of-use" element = {<TermsOfUse/>}/>    
         <Route path="/signIn" element = {!user ? <SignIn/> : <Navigate to = "/"/>}/>  
         <Route path="/signUp" element = {<SignUp/>}/>  
         <Route path="/category/:category" element = {<CategoryPage/>}/>  
         {/* <Route path="/category/categoryname/product" element = {<ProductPage/>}/>   */}
         <Route path="/product/:id" element = {<ProductPage/>}/>  
         
         <Route path="/wishlist/products" element = {user?<WishlistPage/>: <Navigate to = "/" replace/>}/>  
         
         <Route path="/cart" element = {user?<CartPage/>:<Navigate to = "/" replace/>}/>  

         {/* after placing order invoice is made */}

         <Route path = "/checkout" element = {user?<CheckoutPage/>:<Navigate to="/" replace/>}/>
         <Route path = "/myOrders" element = {user?<OrderPage/>:<Navigate to ="/" replace/>}/>
         <Route path = {`/invoice/:id`} element = {<InvoicePage/>}/>
         {/* <Route path = {"/notification"} element = {<NotificationPanel/>}/>
         */}
         <Route path = "/filter" element={<FilterPage/>}/>

        </Route>

        {/* For Admin */}

        <Route path = "/admin" element ={user?.role == "admin" &&<AdminLayout/>}>
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