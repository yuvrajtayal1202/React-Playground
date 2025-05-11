import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom"
import { useAuth } from "../AuthContext";

const Layout = () => {
  const { user } = useAuth();
  const [sidebarWidth, setSidebarWidth] = React.useState(300);

  return (
    <div>
      <Header/>
      <Sidebar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />
      <div
        className="main-content"
        style={{
          marginLeft: sidebarWidth + 50,
          transition: "margin-left 0.1s"
        }}
      >
        <Outlet key={user?.uid || "guest"} />
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout