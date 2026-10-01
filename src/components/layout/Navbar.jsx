// Navbar — 3-theme picker + all existing behaviour preserved
//
// Theme switcher replaces the old binary toggle:
//   Desktop → pill dropdown that opens below, shows all 3 options
//   Mobile  → same 3 options inline in the overlay menu
//
// Themes: dark-dev | dark-glass | light  (from ThemeContext)

import { useState, useEffect, useRef } from 'react'
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

// ─── Theme icons as tiny SVGs so we avoid react-icons dep ─────────────
const ThemeIcons = {
  'dark-dev': (
    // Terminal / code bracket
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'dark-glass': (
    // Hexagon (represents crystalline glass)
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  'light': (
    // Sun
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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

// Accent dot colour per theme
const THEME_DOT = {
  'dark-dev':   'bg-[#6C63FF]',
  'dark-glass': 'bg-sky-400',
  'light':      'bg-amber-400',
}

// ─── Desktop theme dropdown ────────────────────────────────────────────
function ThemeDropdown({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = THEMES.find(t => t.id === theme)

  // Close on outside click
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(p => !p)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2 px-3 py-[7px] rounded-lg text-[12px] font-semibold
                   transition-all duration-200"
        style={{
          border: '1px solid var(--t-border)',
          background: 'var(--t-card)',
          color: 'var(--t-text)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Select theme"
        aria-expanded={open}
      >
        {/* Accent dot */}
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${THEME_DOT[theme]}`} />
        {/* Icon */}
        <span style={{ color: 'var(--t-primary)' }}>
          {ThemeIcons[theme]}
        </span>
        {/* Label */}
        <span className="hidden lg:inline">{current?.label}</span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          style={{ color: 'var(--t-text-faint)' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </motion.svg>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-2xl
                       overflow-hidden z-50 shadow-2xl"
            style={{
              border: '1px solid var(--t-border)',
              background: 'var(--t-nav-bg)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
            }}
          >
            {/* Header label */}
            <div className="px-4 pt-3 pb-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.20em]"
                style={{ color: 'var(--t-text-faint)' }}>
                Appearance
              </p>
            </div>

            <div className="px-2 pb-2 flex flex-col gap-0.5">
              {THEMES.map(t => {
                const isActive = theme === t.id
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setOpen(false) }}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                               text-left transition-all duration-150"
                    style={isActive ? {
                      background: `rgba(var(--t-primary-rgb), 0.12)`,
                      border: '1px solid rgba(var(--t-primary-rgb), 0.25)',
                    } : {
                      background: 'transparent',
                      border: '1px solid transparent',
                    }}
                  >
                    {/* Accent dot */}
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${THEME_DOT[t.id]}`} />

                    {/* Icon */}
                    <span className="flex-shrink-0 transition-colors duration-150"
                      style={{ color: isActive ? 'var(--t-primary)' : 'var(--t-text-faint)' }}>
                      {ThemeIcons[t.id]}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold leading-none"
                        style={{ color: isActive ? 'var(--t-text)' : 'var(--t-text-muted)' }}>
                        {t.label}
                      </p>
                      <p className="text-[10px] mt-0.5 leading-none"
                        style={{ color: 'var(--t-text-faint)' }}>
                        {t.description}
                      </p>
                    </div>

                    {/* Active checkmark */}
                    {isActive && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        className="flex-shrink-0"
                        style={{ color: 'var(--t-primary)' }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── NAVBAR ────────────────────────────────────────────────────────────
export default function Navbar() {
  const isScrolled    = useNavScroll(60)
  const activeSection = useScrollSpy(SECTION_IDS)
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 32 })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  // Nav text colour adapts to theme
  const navLinkStyle = (isActive) => ({
    color: isActive
      ? 'var(--t-heading)'
      : 'var(--t-text-muted)',
  })

  return (
    <>
      {/* Noise grain */}
      <div className="noise" aria-hidden />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg,var(--t-shimmer-a),var(--t-shimmer-b),var(--t-shimmer-c),var(--t-shimmer-b),var(--t-shimmer-a))',
          backgroundSize: '200% 100%',
        }}
      />

      {/* ── Header bar ── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                    ${isScrolled ? 'nav-glass' : ''}`}
        style={!isScrolled ? { background: 'transparent' } : {}}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-10 h-[64px]
                        flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <motion.button
            onClick={() => go('hero')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="relative shrink-0 w-[38px] h-[38px] rounded-xl overflow-hidden
                       flex items-center justify-center select-none
                       font-display font-extrabold text-[14px] text-white"
            style={{ background: 'linear-gradient(135deg,var(--t-shimmer-a),var(--t-shimmer-b))' }}
            aria-label="Home"
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-xl"
              style={{ background: 'radial-gradient(circle at 60% 40%,rgba(255,255,255,0.35),transparent 65%)' }}
            />
            <span className="relative z-10">AK</span>
          </motion.button>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, id }, i) => {
              const isActive = activeSection === id
              return (
                <motion.button
                  key={id}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`nav-btn relative px-[14px] py-2 text-[13px] font-medium
                              tracking-[0.01em] rounded-lg transition-colors duration-200
                              ${isActive ? 'active' : ''}`}
                  style={navLinkStyle(isActive)}
                >
                  {/* Active glow pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `rgba(var(--t-primary-rgb), 0.15)`,
                        boxShadow: `0 0 20px rgba(var(--t-primary-rgb), 0.22), inset 0 0 0 1px rgba(var(--t-primary-rgb), 0.28)`,
                      }}
                      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                  <span className="nav-underline" />
                </motion.button>
              )
            })}
          </nav>

          {/* ── Right controls ── */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Theme dropdown */}
            <ThemeDropdown theme={theme} setTheme={setTheme} />

            {/* Resume CTA */}
            <motion.a
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="relative btn-shine text-[12px] font-semibold px-4 py-[7px]
                         rounded-lg transition-colors duration-200"
              style={{
                border: `1px solid rgba(var(--t-primary-rgb), 0.45)`,
                background: `rgba(var(--t-primary-rgb), 0.08)`,
                color: 'var(--t-text)',
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute inset-0 rounded-lg"
                style={{ boxShadow: `0 0 12px rgba(var(--t-primary-rgb), 0.30)` }}
              />
              <span className="relative z-10">Resume ↗</span>
            </motion.a>
          </motion.div>

          {/* ── Mobile right ── */}
          <div className="md:hidden flex items-center gap-2">
            {/* Compact theme dot picker on mobile */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl"
              style={{ border: '1px solid var(--t-border)', background: 'var(--t-card)' }}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  aria-label={t.label}
                  className={`w-5 h-5 rounded-full transition-all duration-200
                              ${THEME_DOT[t.id]}
                              ${theme === t.id
                                ? 'scale-110 ring-2 ring-offset-1 ring-offset-transparent ring-white/40'
                                : 'opacity-40 hover:opacity-70'}`}
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
                animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: 'var(--t-text)' }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                transition={{ duration: 0.18 }}
                className="block w-3.5 h-[1.5px] rounded-full"
                style={{ background: 'var(--t-text)' }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-[1.5px] rounded-full origin-center"
                style={{ background: 'var(--t-text)' }}
              />
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 3%)' }}
            exit={{    opacity: 0, clipPath: 'circle(0% at 95% 3%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-2"
            style={{
              background: theme === 'light'
                ? 'rgba(248,249,252,0.97)'
                : theme === 'dark-glass'
                  ? 'rgba(7,11,20,0.97)'
                  : 'var(--t-bg)',
              backdropFilter: 'blur(32px)',
            }}
          >
            {/* Aurora bg */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full aurora-1 pointer-events-none"
              style={{ background: `radial-gradient(circle,rgba(var(--t-primary-rgb),0.15),transparent 70%)` }} />
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full aurora-2 pointer-events-none"
              style={{ background: `radial-gradient(circle,rgba(var(--t-primary-rgb),0.10),transparent 70%)` }} />

            {/* Nav links */}
            {NAV_LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: 16  }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => go(id)}
                className={`relative group text-[2.8rem] font-display font-extrabold
                            tracking-[-0.02em] py-1 transition-all duration-200
                            ${activeSection === id ? 'gradient-shimmer' : ''}`}
                style={activeSection !== id ? { color: 'var(--t-text-muted)' } : {}}
              >
                {label}
                <span className="absolute -bottom-0 left-0 h-[2px] w-0 rounded-full
                                 group-hover:w-full transition-all duration-350"
                  style={{ background: 'var(--t-primary)' }} />
              </motion.button>
            ))}

            {/* Theme selector row in overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
              className="flex items-center gap-2 mt-4 p-2 rounded-2xl"
              style={{ border: '1px solid var(--t-border)', background: 'var(--t-card)' }}
            >
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl
                              text-[11px] font-semibold transition-all duration-200`}
                  style={theme === t.id ? {
                    background: `rgba(var(--t-primary-rgb), 0.15)`,
                    border: `1px solid rgba(var(--t-primary-rgb), 0.30)`,
                    color: 'var(--t-text)',
                  } : {
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: 'var(--t-text-muted)',
                  }}
                >
                  <span style={{ color: theme === t.id ? 'var(--t-primary)' : 'var(--t-text-faint)' }}>
                    {ThemeIcons[t.id]}
                  </span>
                  {t.label}
                </button>
              ))}
            </motion.div>

            {/* Resume */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.12 }}
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 text-sm font-semibold px-8 py-3 rounded-xl
                         transition-all duration-200"
              style={{
                border: `1px solid rgba(var(--t-primary-rgb), 0.40)`,
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
