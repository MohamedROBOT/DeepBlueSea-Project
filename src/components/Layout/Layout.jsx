import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarComponent } from './Sidebar'
import Chatbot from '../Chatbot/Chatbot'

export default function Layout() {
  return (
    <div className='flex flex-row min-h-screen'>
     
        <SidebarComponent />
      <Chatbot />
      <main className='flex-grow-1 ms-10 p-10'>
        <Outlet />
      </main>
    </div>
  )
}
