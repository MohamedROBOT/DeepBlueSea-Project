"use client";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {  HiChartPie,  HiTable, HiUser } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import {  FaSignal, FaHeartbeat, FaFire } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png"
import { useState } from "react";
import { IoCloseSharp, IoList } from "react-icons/io5";


export function SidebarComponent() {
const [sidebarToggle, setSidebarToggle] = useState(false)
  const NavbarItems = [
    {
      label: 'Dashboard',
      path: '/',
      navicon: HiChartPie
    }, 
    {
      label: 'Live map',
      path: '/livemap',
      navicon: FaLocationDot
    },
    {
      label: 'Tag details',
      path: '/tagdetails',
      navicon: FaSignal
    },
    {
      label: 'Activity log',
      path: '/dashlogs',
      navicon: HiUser
    },
    {
      label: 'Predictions',
      path: '/predictions',
      navicon: FaHeartbeat
    },
    {
      label: 'AI Chatbot',
      path: '/chatbot',
      navicon: FaFire
    },

  ]



  const {pathname} = useLocation();
// -translate-x-4/5
  return (
    <Sidebar className={`max-h-screen  overflow-hidden my-nav z-50 transition-width duration-300 ${!sidebarToggle ? "translate-x-0 fixed lg:sticky inset-0" : "-translate-x-4/5  fixed "}`}>
      <span onClick={() => setSidebarToggle(!sidebarToggle)} className="text-silver max-w-max flex ms-auto items-center cursor-pointer">
        {
          sidebarToggle ? <IoList className="text-2xl" /> : <IoCloseSharp className="text-2xl" />
        }
      </span>
     {
      !sidebarToggle && <div className="ms-4">
      <div className="logo text-teal-400 flex items-center gap-x-2 mt-5 mb-10">
          <img src={Logo} className="w-7.5 h-9.5" alt="" />
          <div className="text-2xl">
            SharkGuid
          </div>
        </div>
       <SidebarItems className="flex flex-col gap-y-2">
        
        <SidebarItemGroup  >
         {
          NavbarItems.map((item,index) => {
          return   <SidebarItem
          
          onClick={() => setSidebarToggle(true)}
          key={index} as={Link} to={item.path} icon={item.navicon} 
          className={`${pathname === item.path? "bg-teal !text-white" :"!text-silver"}`}
          >
            {item.label}
          </SidebarItem>
          })
         }
        
        </SidebarItemGroup>
        <SidebarItemGroup>

            <SidebarItem   as={Link} icon={HiTable}>
            Settings
          </SidebarItem>
          <SidebarItem as={Link}  icon={HiTable}>
            Help center
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
     </div>
     }
    </Sidebar>
  );
}
