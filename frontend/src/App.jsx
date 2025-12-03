import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from "./pages/HomePage"
import Error from './components/Error'


const App = () => {
  return (

    <Router>
      <Routes>

        <Route path = "/" element = {<MainLayout/>}>

         <Route index element = {<HomePage/>}/>  
         <Route path="*" element={<Error/>}/>

        </Route>
      </Routes>
    </Router>
    
  )
}

export default App