import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import useScrollSpy from '../../hooks/useScrollSpy'
import useNavScroll from '../../hooks/useNavScroll'
import { useTheme, THEMES } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',       id: 'hero'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
]
const SECTION_IDS = NAV_LINKS.map(l => l.id)

const THEME_DOT = {
  'dark-dev':   'bg-blue-600',
  'dark-glass': 'bg-blue-400',
  'light':      'bg-blue-500',
}

// Simple sun / moon / code icons
const ThemeIcons = {
  'dark-dev': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'dark-glass': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  'light': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  ),
}

function ThemeToggle({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const current = THEMES.find(t => t.id === theme)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className="relative" onMouseDown={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[12px]
                   font-medium transition-colors duration-200"
        style={{
          border: '1px solid var(--t-border)',
          background: 'var(--t-card)',
          color: 'var(--t-text-muted)',
        }}
        aria-label="Select theme"
      >
        <span style={{ color: 'var(--t-primary)' }}>{ThemeIcons[theme]}</span>
        <span className="hidden lg:inline" style={{ color: 'var(--t-text-muted)' }}>
          {current?.label}
        </span>
        <svg
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--t-text-faint)',
          }}
          width="9" height="9" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-[calc(100%+6px)] w-48 rounded-xl
                       overflow-hidden z-50"
            style={{
              border: '1px solid var(--t-border)',
              background: 'var(--t-nav-bg)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          >
            <div className="p-1.5 flex flex-col gap-0.5">
              {THEMES.map(t => {
                const isActive = theme === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setOpen(false) }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg
                               text-left transition-colors duration-150"
                    style={isActive ? {
                      background: `rgba(var(--t-primary-rgb), 0.10)`,
                      color: 'var(--t-text)',
                    } : {
                      color: 'var(--t-text-muted)',
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${THEME_DOT[t.id]}`} />
                    <span style={{ color: isActive ? 'var(--t-primary)' : 'var(--t-text-faint)' }}>
                      {ThemeIcons[t.id]}
                    </span>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium leading-none">{t.label}</p>
                      <p className="text-[10px] mt-0.5 leading-none"
                        style={{ color: 'var(--t-text-faint)' }}>{t.description}</p>
                    </div>
                    {isActive && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        style={{ color: 'var(--t-primary)', flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const isScrolled    = useNavScroll(60)
  const activeSection = useScrollSpy(SECTION_IDS)
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      {/* Noise grain */}
      <div className="noise" aria-hidden />

      {/* Scroll progress — thin, single-colour, no shimmer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
        style={{
          scaleX,
          background: 'var(--t-primary)',
          opacity: 0.7,
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400
                    ${isScrolled ? 'nav-glass' : ''}`}
        style={!isScrolled ? { background: 'transparent' } : {}}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-10 h-16
                        flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => go('hero')}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                       font-display font-bold text-[13px] text-white select-none
                       transition-opacity duration-200 hover:opacity-80"
            style={{ background: 'linear-gradient(135deg, var(--t-shimmer-a), var(--t-shimmer-b))' }}
            aria-label="Home"
          >
            AK
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, id }, i) => {
              const isActive = activeSection === id
              return (
                <motion.button
                  key={id}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.45 }}
                  className={`nav-btn relative px-3.5 py-2 text-[13px] font-medium
                              rounded-lg transition-colors duration-200
                              ${isActive ? 'active' : ''}`}
                  style={{ color: isActive ? 'var(--t-heading)' : 'var(--t-text-muted)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `rgba(var(--t-primary-rgb), 0.10)`,
                        boxShadow: `inset 0 0 0 1px rgba(var(--t-primary-rgb), 0.20)`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                  <span className="nav-underline" />
                </motion.button>
              )
            })}
          </nav>

          {/* Right controls */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <a
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              className="text-[12px] font-medium px-4 py-[7px] rounded-lg
                         transition-all duration-200 hover:opacity-90"
              style={{
                border: `1px solid rgba(var(--t-primary-rgb), 0.35)`,
                background: `rgba(var(--t-primary-rgb), 0.07)`,
                color: 'var(--t-text)',
              }}
            >
              Resume ↗
            </a>
          </motion.div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            {/* Dot picker */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl"
              style={{ border: '1px solid var(--t-border)', background: 'var(--t-card)' }}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  aria-label={t.label}
                  className={`w-4 h-4 rounded-full transition-all duration-200
                              ${THEME_DOT[t.id]}
                              ${theme === t.id ? 'scale-110 ring-2 ring-offset-1 ring-white/30' : 'opacity-35 hover:opacity-60'}`}
                />
              ))}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(p => !p)}
              aria-label="Menu"
              className="w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: 'var(--t-text)' }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="block w-3.5 h-[1.5px] rounded-full"
                style={{ background: 'var(--t-text)' }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: 'var(--t-text)' }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-1"
            style={{
              background: theme === 'light'
                ? 'rgba(248,249,252,0.97)'
                : 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {NAV_LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => go(id)}
                className="text-[2.6rem] font-display font-bold tracking-tight py-1
                           transition-colors duration-150"
                style={{
                  color: activeSection === id ? 'var(--t-primary)' : 'var(--t-text-muted)',
                }}
              >
                {label}
              </motion.button>
            ))}

            {/* Theme row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              className="flex items-center gap-1.5 mt-6 p-1.5 rounded-xl"
              style={{ border: '1px solid var(--t-border)', background: 'var(--t-card)' }}
            >
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg
                              text-[11px] font-medium transition-all duration-150`}
                  style={theme === t.id ? {
                    background: `rgba(var(--t-primary-rgb), 0.12)`,
                    color: 'var(--t-text)',
                  } : { color: 'var(--t-text-muted)' }}
                >
                  <span style={{ color: theme === t.id ? 'var(--t-primary)' : 'var(--t-text-faint)' }}>
                    {ThemeIcons[t.id]}
                  </span>
                  {t.label}
                </button>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 text-sm font-medium px-8 py-3 rounded-xl"
              style={{
                border: `1px solid rgba(var(--t-primary-rgb), 0.35)`,
                color: 'var(--t-text)',
              }}
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
