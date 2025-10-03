import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SidebarComponent } from './Sidebar'
import Chatbot from '../Chatbot/Chatbot'

export default function Layout() {
  const currLocation = useLocation()

  return (
    <div className='flex flex-row min-h-screen'>
     {
      (currLocation.pathname !== '/studentmode' && currLocation.pathname !== '/studentmode/sharkquiz') && <SidebarComponent />
     }
       
        {currLocation.pathname !== '/studentmode/sharkquiz' && <Chatbot />}
      
      <main className={`${currLocation.pathname !== '/livemap' ? 'flex-grow-1 ms-10 p-10' : 'flex-grow-1'}`}>
        <Outlet />
      </main>
    </div>
  )
}
