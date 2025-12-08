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
import LaptopsPage from './pages/LaptopsPage'

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
         <Route path="/category/laptops" element = {<LaptopsPage/>}/>  
         <Route path="*" element={<Error/>}/>

        </Route>
      </Routes>
    </Router>
    
  )
}

export default App