import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = React.useState(300);

  return (
    <div>
      <Header/>
      <Sidebar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />
      <div
        className="main-content"
        style={{
          marginLeft: sidebarWidth +50, // <-- This keeps content out from behind the sidebar
          transition: "margin-left 0.1s"
        }}
      >
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout