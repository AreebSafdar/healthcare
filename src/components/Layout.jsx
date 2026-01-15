import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore, useAppStore } from '../store'
import Navigation from './Navigation'
import NotificationCenter from './NotificationCenter'
import { Menu, X, Bell } from 'lucide-react'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadAlerts, setUnreadAlerts] = useState(0)
  const alerts = useAppStore(state => state.alerts)
  const user = useAuthStore(state => state.user)
  
  useEffect(() => {
    const unresolvedCount = alerts.filter(a => !a.resolved).length
    setUnreadAlerts(unresolvedCount)
  }, [alerts])
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Navigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex-1 px-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {user?.clinic}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {user?.name} • {user?.role}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationCenter unreadCount={unreadAlerts} />
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=0F6BFF&color=fff`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
