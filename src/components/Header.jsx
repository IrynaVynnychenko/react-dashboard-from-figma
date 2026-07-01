import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import clsx from 'clsx'
import { filterSearchItems } from '../data/searchIndex'

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const searchResults = filterSearchItems(searchQuery)

  const notifications = [
    { id: 1, message: 'New message from John Doe', time: '2 min ago', unread: true },
    { id: 2, message: 'System update completed', time: '1 hour ago', unread: true },
    { id: 3, message: 'Weekly report is ready', time: '3 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const handleSearchSelect = (path) => {
    navigate(path)
    setSearchQuery('')
    setShowSearchResults(false)
  }

  const closeDropdowns = () => {
    setShowUserMenu(false)
    setShowNotifications(false)
    setShowSearchResults(false)
  }

  return (
    <header className="sticky top-0 bg-white/60 backdrop-blur-md shadow-xl border-b border-white/30 z-40">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md text-dark-400 hover:text-dark-600 hover:bg-dark-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search bar */}
            <div className="hidden md:block ml-4">
              <div className="input-search-wrap">
                <Search className="input-search-icon" />
                <input
                  type="text"
                  placeholder="Search pages, users..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSearchResults(true)
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  className="input-search w-48 lg:w-64"
                />

                {showSearchResults && searchQuery.trim() && (
                  <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 z-[60] overflow-hidden">
                    {searchResults.length > 0 ? (
                      <ul className="py-2 max-h-72 overflow-y-auto">
                        {searchResults.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => handleSearchSelect(item.path)}
                              className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors"
                            >
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-500">
                                {item.subtitle ?? item.group}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500">No results found</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-dark-400 hover:text-dark-600 hover:bg-dark-100 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 z-[60]">
                  <div className="p-4 border-b border-white/20">
                    <h3 className="text-lg font-medium text-dark-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={clsx(
                          'p-4 border-b border-white/20 hover:bg-white/50 cursor-pointer',
                          notification.unread && 'bg-purple-50'
                        )}
                      >
                        <p className="text-sm text-dark-900 break-words">{notification.message}</p>
                        <p className="text-xs text-dark-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 text-dark-700 hover:text-dark-900 hover:bg-dark-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-dark-500">Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-dark-400" />
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 z-[60]">
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center w-full px-4 py-2 text-sm text-dark-700 hover:bg-white/50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center w-full px-4 py-2 text-sm text-dark-700 hover:bg-white/50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <div className="border-t border-white/20"></div>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-white/50">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showUserMenu || showNotifications || showSearchResults) && (
        <div
          className="fixed inset-0 z-50"
          onClick={closeDropdowns}
        />
      )}
    </header>
  )
}

export default Header
