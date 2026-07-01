import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CheckCheck, RotateCcw, Trash2 } from 'lucide-react'
import clsx from 'clsx'
import { useNotifications } from '../context/NotificationsContext'
import NotificationItem from '../components/NotificationItem'
import { getDateGroup } from '../data/notifications'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
]

const Notifications = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
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

      <div className="card p-4">
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
      </div>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
            <Bell className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            {filter === 'unread'
              ? 'You have read all your notifications. Nice work!'
              : 'When something happens, you will see it here.'}
          </p>
          {filter === 'unread' && (
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              View all notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {groupOrder.map((group) => {
            const items = grouped[group]
            if (!items?.length) return null

            return (
              <div key={group}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {group}
                </h2>
                <div className="card divide-y divide-gray-100 overflow-hidden">
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
      )}
    </div>
  )
}

export default Notifications
