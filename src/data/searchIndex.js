export const SEARCH_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', group: 'Pages', keywords: ['dashboard', 'home', 'overview'] },
  { id: 'analytics', label: 'Analytics', path: '/analytics', group: 'Pages', keywords: ['analytics', 'charts', 'metrics', 'performance'] },
  { id: 'users', label: 'Users', path: '/users', group: 'Pages', keywords: ['users', 'people', 'team', 'members'] },
  { id: 'messages', label: 'Messages', path: '/messages', group: 'Pages', keywords: ['messages', 'chat', 'inbox'] },
  { id: 'calendar', label: 'Calendar', path: '/calendar', group: 'Pages', keywords: ['calendar', 'events', 'schedule'] },
  { id: 'profile', label: 'Profile', path: '/profile', group: 'Pages', keywords: ['profile', 'account'] },
  { id: 'settings', label: 'Settings', path: '/settings', group: 'Pages', keywords: ['settings', 'preferences', 'config'] },
  { id: 'user-john', label: 'John Doe', subtitle: 'john.doe@example.com', path: '/users?q=john', group: 'Users', keywords: ['john', 'doe', 'admin'] },
  { id: 'user-jane', label: 'Jane Smith', subtitle: 'jane.smith@example.com', path: '/users?q=jane', group: 'Users', keywords: ['jane', 'smith'] },
  { id: 'user-bob', label: 'Bob Johnson', subtitle: 'bob.johnson@example.com', path: '/users?q=bob', group: 'Users', keywords: ['bob', 'johnson', 'moderator'] },
  { id: 'user-alice', label: 'Alice Brown', subtitle: 'alice.brown@example.com', path: '/users?q=alice', group: 'Users', keywords: ['alice', 'brown'] },
  { id: 'chat-sarah', label: 'Sarah Johnson', subtitle: 'Messages', path: '/messages', group: 'Chats', keywords: ['sarah', 'johnson', 'chat'] },
  { id: 'chat-mike', label: 'Mike Chen', subtitle: 'Messages', path: '/messages', group: 'Chats', keywords: ['mike', 'chen', 'meeting'] },
]

export function filterSearchItems(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return SEARCH_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.keywords.some((keyword) => keyword.includes(q))
  ).slice(0, 8)
}
