import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import { filterSearchItems } from '../data/searchIndex'
import { useNotifications } from '../context/NotificationsContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import NotificationsDropdown from './NotificationsDropdown'

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const { unreadCount } = useNotifications()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const searchResults = filterSearchItems(searchQuery)

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

  const handleNotificationsClick = () => {
    setShowUserMenu(false)
    setShowSearchResults(false)

    if (isMobile) {
      navigate('/notifications')
      return
    }

    setShowNotifications((prev) => !prev)
  }

  if (isMobile && location.pathname === '/notifications') {
    return null
  }

  return (
    <header className="sticky top-0 bg-white/60 dark:bg-dark-900/60 backdrop-blur-md shadow-xl border-b border-white/30 dark:border-dark-700/50 z-40">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden flex-shrink-0 rounded-md p-2 text-dark-400 hover:bg-dark-100 hover:text-dark-600"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="input-search-wrap min-w-0 flex-1">
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
              className="input-search w-full"
            />

            {showSearchResults && searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-xl border border-white/30 dark:border-dark-600/50 bg-white/95 dark:bg-dark-800/95 shadow-2xl backdrop-blur-md z-[60]">
                {searchResults.length > 0 ? (
                  <ul className="max-h-72 overflow-y-auto py-2">
                    {searchResults.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSearchSelect(item.path)}
                          className="w-full px-4 py-2.5 text-left transition-colors hover:bg-purple-50 dark:hover:bg-dark-700"
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

          <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={handleNotificationsClick}
                className="p-2 text-dark-400 hover:text-dark-600 hover:bg-dark-100 rounded-lg relative"
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && !isMobile && (
                <NotificationsDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(false)
                  setShowSearchResults(false)
                  setShowUserMenu((prev) => !prev)
                }}
                className="flex items-center space-x-3 p-2 text-dark-700 hover:text-dark-900 hover:bg-dark-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-dark-500">Admin</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-dark-400 sm:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white/90 dark:bg-dark-800/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 dark:border-dark-600/50 z-[60]">
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
                    <Link
                      to="/notifications"
                      className="flex items-center w-full px-4 py-2 text-sm text-dark-700 hover:bg-white/50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bell className="w-4 h-4 mr-3" />
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <div className="border-t border-white/20" />
                    <button type="button" className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-white/50">
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

      {(showUserMenu || showNotifications || showSearchResults) && (
        <div
          className="fixed inset-0 z-50"
          onClick={closeDropdowns}
          aria-hidden="true"
        />
      )}
    </header>
  )
}

export default Header
