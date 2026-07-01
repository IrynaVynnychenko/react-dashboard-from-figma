const minutesAgo = (m) => new Date(Date.now() - m * 60 * 1000).toISOString()
const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString()
const daysAgo = (d) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString()

export const NOTIFICATION_TYPES = {
  message: { label: 'Message', color: 'bg-purple-100 text-purple-700' },
  system: { label: 'System', color: 'bg-gray-100 text-gray-700' },
  report: { label: 'Report', color: 'bg-blue-100 text-blue-700' },
  user: { label: 'User', color: 'bg-green-100 text-green-700' },
  calendar: { label: 'Calendar', color: 'bg-orange-100 text-orange-700' },
  security: { label: 'Security', color: 'bg-red-100 text-red-700' },
}

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'message',
    title: 'New message',
    message: 'Sarah Johnson sent you a message about the analytics dashboard',
    createdAt: minutesAgo(2),
    read: false,
    path: '/messages',
  },
  {
    id: 'n2',
    type: 'system',
    title: 'System update',
    message: 'Dashboard v2.1 deployed successfully — all services are online',
    createdAt: hoursAgo(1),
    read: false,
    path: '/settings',
  },
  {
    id: 'n3',
    type: 'report',
    title: 'Weekly report ready',
    message: 'Your analytics report for June 23–30 is available to download',
    createdAt: hoursAgo(3),
    read: false,
    path: '/analytics',
  },
  {
    id: 'n4',
    type: 'user',
    title: 'New user registered',
    message: 'Charlie Wilson joined the team and is awaiting approval',
    createdAt: hoursAgo(5),
    read: true,
    path: '/users?q=charlie',
  },
  {
    id: 'n5',
    type: 'calendar',
    title: 'Upcoming event',
    message: 'Team Meeting starts tomorrow at 10:00 AM in Conference Room A',
    createdAt: hoursAgo(8),
    read: true,
    path: '/calendar',
  },
  {
    id: 'n6',
    type: 'security',
    title: 'New login detected',
    message: 'Your account was accessed from Kyiv, Ukraine — was this you?',
    createdAt: daysAgo(1),
    read: true,
    path: '/settings',
  },
  {
    id: 'n7',
    type: 'message',
    title: 'New message',
    message: 'Mike Chen shared the meeting agenda for Sprint Planning',
    createdAt: daysAgo(1),
    read: true,
    path: '/messages',
  },
  {
    id: 'n8',
    type: 'report',
    title: 'Revenue milestone',
    message: 'Monthly revenue crossed $50k — view the breakdown in Analytics',
    createdAt: daysAgo(2),
    read: true,
    path: '/analytics',
  },
]

export function formatRelativeTime(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`

  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`

  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function getDateGroup(isoDate) {
  const date = new Date(isoDate)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return 'Earlier'
}
