import { useState } from 'react'
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Calendar, 
  FileText, 
  Mail,
  X,
  ChevronDown
} from 'lucide-react'
import clsx from 'clsx'

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [expandedItems, setExpandedItems] = useState({})

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
    { id: 'users', label: 'Users', icon: Users, href: '/users' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
    { id: 'documents', label: 'Documents', icon: FileText, href: '/documents' },
    { id: 'messages', label: 'Messages', icon: Mail, href: '/messages' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ]

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-dark-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-white/60 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/20 flex-shrink-0">
          <h1 className="text-xl font-bold text-dark-900">Dashboard</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-dark-400 hover:text-dark-600 hover:bg-dark-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id)
                      if (item.children) {
                        toggleExpanded(item.id)
                      }
                    }}
                    className={clsx(
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-800 shadow-lg transform scale-105'
                        : 'text-dark-700 hover:bg-white/50 hover:text-dark-900 hover:transform hover:scale-105'
                    )}
                  >
                    <Icon className={clsx(
                      'mr-3 w-5 h-5',
                      isActive ? 'text-purple-700' : 'text-dark-400'
                    )} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={clsx(
                        'w-4 h-4 transition-transform duration-200',
                        expandedItems[item.id] && 'rotate-180'
                      )} />
                    )}
                  </button>
                  
                  {/* Submenu items would go here if needed */}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section at bottom */}
        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-dark-900">User Name</p>
              <p className="text-xs text-dark-500">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
