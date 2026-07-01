export const THEME_STORAGE_KEY = 'dashboard-theme'

export const THEMES = ['light', 'dark', 'system']

export const getStoredTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved && THEMES.includes(saved)) return saved
  } catch {
    localStorage.removeItem(THEME_STORAGE_KEY)
  }
  return 'light'
}

export const resolveTheme = (theme) => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export const applyTheme = (theme) => {
  const resolved = resolveTheme(theme)
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.dataset.theme = theme
}
