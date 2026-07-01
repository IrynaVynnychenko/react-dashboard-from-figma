import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  MoreVertical,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import clsx from 'clsx'
import { useNotifications } from '../context/NotificationsContext'
import NotificationItem from '../components/NotificationItem'
import { getDateGroup } from '../data/notifications'
import { useMediaQuery } from '../hooks/useMediaQuery'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
]

const Notifications = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [filter, setFilter] = useState('all')
  const [showActions, setShowActions] = useState(false)
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismiss,
    clearAll,
    reset,
  } = useNotifications()

  const filtered = useMemo(() => {
    const list = filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications
    return [...list].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }, [notifications, filter])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach((notification) => {
      const group = getDateGroup(notification.createdAt)
      if (!groups[group]) groups[group] = []
      groups[group].push(notification)
    })
    return groups
  }, [filtered])

  const groupOrder = ['Today', 'Yesterday', 'Earlier']

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    navigate(notification.path)
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    if (!isMobile) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobile])

  const filterTabs = (
    <div className="flex gap-2">
      {FILTERS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setFilter(item.id)}
          className={clsx(
            'rounded-lg px-4 py-2 text-sm font-medium transition-all',
            filter === item.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {item.label}
          {item.id === 'unread' && unreadCount > 0 && (
            <span className="ml-1.5 rounded-full bg-white/25 px-1.5 text-xs">
              {unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  )

  const notificationList = filtered.length === 0 ? (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
        <Bell className="h-8 w-8 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {filter === 'unread'
          ? 'You have read all your notifications.'
          : 'When something happens, you will see it here.'}
      </p>
      {filter === 'unread' && (
        <button
          type="button"
          onClick={() => setFilter('all')}
          className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
        >
          Show all
        </button>
      )}
    </div>
  ) : (
    <div className="space-y-5 md:space-y-6">
      {groupOrder.map((group) => {
        const items = grouped[group]
        if (!items?.length) return null

        return (
          <div key={group}>
            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray-500 md:mb-3">
              {group}
            </h2>
            <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white md:card md:rounded-xl md:border-white/30">
              {items.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  showDismiss
                  onClick={() => handleNotificationClick(notification)}
                  onDismiss={() => dismiss(notification.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[80] flex flex-col bg-gray-50">
        <header className="flex-shrink-0 border-b border-gray-200 bg-white pt-[env(safe-area-inset-top)]">
          <div className="flex items-center justify-between gap-2 px-3 py-3">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1 text-center">
              <h1 className="text-base font-semibold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowActions((prev) => !prev)}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                aria-label="More actions"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showActions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowActions(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          markAllAsRead()
                          setShowActions(false)
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <CheckCheck className="h-4 w-4" />
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          clearAll()
                          setShowActions(false)
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear all
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        reset()
                        setShowActions(false)
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset demo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 px-4 py-3">{filterTabs}</div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {notificationList}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'You are all caught up'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {unreadCount > 0 && (
            <button type="button" onClick={markAllAsRead} className="btn btn-secondary text-sm">
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button type="button" onClick={clearAll} className="btn btn-secondary text-sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </button>
          )}
          <button type="button" onClick={reset} className="btn btn-secondary text-sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset demo
          </button>
        </div>
      </div>

      <div className="card p-4">{filterTabs}</div>

      {notificationList}
    </div>
  )
}

export default Notifications
