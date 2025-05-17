import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';
import SideBar from './Sidebar';

const Layout = () => {
  return (
    <div>
      <Header/>
      <SideBar/>
      <Outlet/>

    </div>
  )
}

export default Layout
