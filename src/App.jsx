import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { NotificationsProvider } from './context/NotificationsContext'
import { ThemeProvider } from './context/ThemeContext'
import { useMediaQuery } from './hooks/useMediaQuery'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Users from './pages/Users'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isMobileNotifications = isMobile && location.pathname === '/notifications'

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Layout>
      {!isMobileNotifications && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main
          className={clsx(
            'flex-1 overflow-x-hidden overflow-y-auto',
            isMobileNotifications && 'overflow-hidden'
          )}
        >
          <div
            className={clsx(
              'container mx-auto px-4 py-8 sm:px-6',
              isMobileNotifications && 'p-0'
            )}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter basename="/react-dashboard-from-figma">
      <ThemeProvider>
        <NotificationsProvider>
          <AppContent />
        </NotificationsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
