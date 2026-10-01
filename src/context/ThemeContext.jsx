// ThemeContext.jsx
// Manages three themes: 'dark-dev' | 'dark-glass' | 'light'
//
// Applied via data-theme="..." on <html> so all CSS custom-property
// definitions in index.css activate automatically.
// Also keeps 'dark' class in sync so existing Tailwind dark: variants
// keep working for the two dark themes.

import { createContext, useContext, useEffect, useState } from 'react'

export const THEMES = [
  {
    id: 'dark-dev',
    label: 'Dark Dev',
    description: 'Pure black · editorial',
    icon: '◼',
    accentClass: 'bg-[#6C63FF]',
  },
  {
    id: 'dark-glass',
    label: 'Dark Glass',
    description: 'Deep navy · glassmorphic',
    icon: '◈',
    accentClass: 'bg-[#38bdf8]',
  },
  {
    id: 'light',
    label: 'Light',
    description: 'Clean white · minimal',
    icon: '◻',
    accentClass: 'bg-[#6C63FF]',
  },
]

const ThemeContext = createContext(undefined)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('portfolio-theme')
    if (stored && THEMES.find(t => t.id === stored)) return stored
    return 'dark-dev'
  })

  useEffect(() => {
    const root = document.documentElement
    // Set data-theme for CSS variable switching
    root.setAttribute('data-theme', theme)
    // Keep dark class for any remaining Tailwind dark: utilities
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Backward-compat shim — old code uses isDark / toggleTheme
  const isDark = theme !== 'light'
  const toggleTheme = () =>
    setTheme(t => (t === 'dark-dev' ? 'light' : 'dark-dev'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

export default ThemeContext
