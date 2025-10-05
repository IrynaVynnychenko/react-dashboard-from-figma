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
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
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
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <Icon className={clsx(
                      'mr-3 w-5 h-5',
                      isActive ? 'text-primary-700' : 'text-gray-400'
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
