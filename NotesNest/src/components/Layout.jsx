import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
       <div className="main-content">

      <Outlet />
       </div>
      <Footer/>
    </div>
  )
}

export default Layout
