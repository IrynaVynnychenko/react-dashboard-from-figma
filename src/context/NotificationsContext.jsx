import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { INITIAL_NOTIFICATIONS } from '../data/notifications'

const STORAGE_KEY = 'dashboard-notifications'

const NotificationsContext = createContext(null)

const loadNotifications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return INITIAL_NOTIFICATIONS
}

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(loadNotifications)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  )

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const dismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const reset = () => {
    setNotifications(INITIAL_NOTIFICATIONS)
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        dismiss,
        clearAll,
        reset,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return context
}
