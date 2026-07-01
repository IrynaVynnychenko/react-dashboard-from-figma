import {
  Bell,
  Calendar,
  FileText,
  Mail,
  Shield,
  UserPlus,
  X,
} from 'lucide-react'
import clsx from 'clsx'
import { formatRelativeTime, NOTIFICATION_TYPES } from '../data/notifications'

const TYPE_ICONS = {
  message: Mail,
  system: Bell,
  report: FileText,
  user: UserPlus,
  calendar: Calendar,
  security: Shield,
}

const NotificationItem = ({
  notification,
  onClick,
  onDismiss,
  compact = false,
  showDismiss = false,
}) => {
  const Icon = TYPE_ICONS[notification.type] ?? Bell
  const typeConfig = NOTIFICATION_TYPES[notification.type]

  return (
    <div
      className={clsx(
        'group relative flex gap-3 transition-colors',
        compact ? 'p-3' : 'p-4',
        !notification.read && 'bg-purple-50/80',
        onClick && 'cursor-pointer hover:bg-white/60'
      )}
    >
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-0 z-0 rounded-lg"
          aria-label={`Open: ${notification.title}`}
        />
      )}

      <div
        className={clsx(
          'relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg',
          typeConfig?.color ?? 'bg-gray-100 text-gray-700'
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
          {!notification.read && (
            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
          )}
        </div>
        <p className={clsx('text-gray-600', compact ? 'text-xs line-clamp-2' : 'text-sm')}>
          {notification.message}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {formatRelativeTime(notification.createdAt)}
          </span>
          {typeConfig && (
            <span className={clsx('rounded-full px-1.5 py-0.5 text-[10px] font-medium', typeConfig.color)}>
              {typeConfig.label}
            </span>
          )}
        </div>
      </div>

      {showDismiss && onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          className="relative z-20 rounded-lg p-1 text-gray-400 opacity-0 transition-all hover:bg-gray-100 hover:text-gray-600 group-hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default NotificationItem
