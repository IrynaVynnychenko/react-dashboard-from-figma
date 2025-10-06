import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <BrowserRouter basename="/react-dashboard-from-figma">
      <Layout>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <Header onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </Layout>
    </BrowserRouter>
  )
}

export default App
