import { Link, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useNotifications } from '../context/NotificationsContext'
import NotificationItem from './NotificationItem'

const PREVIEW_LIMIT = 5

const NotificationsDropdown = ({ onClose }) => {
  const navigate = useNavigate()
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismiss } = useNotifications()

  const preview = notifications.slice(0, PREVIEW_LIMIT)

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    onClose()
    navigate(notification.path)
  }

  return (
    <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 z-[60] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-medium text-purple-600 hover:text-purple-700"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {preview.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Bell className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">All caught up</p>
            <p className="mt-1 text-xs text-gray-500">No notifications right now</p>
          </div>
        ) : (
          preview.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              compact
              showDismiss
              onClick={() => handleNotificationClick(notification)}
              onDismiss={() => dismiss(notification.id)}
            />
          ))
        )}
      </div>

      <div className="border-t border-gray-100 p-3">
        <Link
          to="/notifications"
          onClick={onClose}
          className="block w-full rounded-lg py-2 text-center text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50"
        >
          View all notifications
        </Link>
      </div>
    </div>
  )
}

export default NotificationsDropdown
