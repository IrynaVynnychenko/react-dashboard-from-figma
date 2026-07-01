import { createContext, useContext, useEffect, useState } from 'react'
import { applyTheme, getStoredTheme, resolveTheme, THEME_STORAGE_KEY } from '../utils/theme'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return undefined

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme('system')

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme)
  }

  const resolvedTheme = resolveTheme(theme)

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
