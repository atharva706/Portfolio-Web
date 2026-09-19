// Navbar Component
// Fixed top navigation with:
//  - Full name logo (smooth scroll to top)
//  - Nav links with scroll spy active highlight + animated underline
//  - Sun/moon theme toggle
//  - Filled purple Resume button
//  - Hide on scroll down / reveal on scroll up
//  - Scroll progress bar pinned at the very top
//  - Mobile hamburger drawer
//  - Full dark/light theme support via dark: variants

import { useState } from 'react'
import useNavScroll from '../../hooks/useNavScroll'
import useScrollSpy from '../../hooks/useScrollSpy'
import useHideOnScroll from '../../hooks/useHideOnScroll'
import useScrollProgress from '../../hooks/useScrollProgress'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',       id: 'hero'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

// ── Sun icon ──
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3"  />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>
)

// ── Moon icon ──
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// ── Download icon ──
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20"
    fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd" />
  </svg>
)

const Navbar = () => {
  const isScrolled    = useNavScroll(50)
  const activeSection = useScrollSpy(SECTION_IDS)
  const isVisible     = useHideOnScroll()
  const progress      = useScrollProgress()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 w-full z-[60] h-[3px] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary rounded-r-full transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'dark:bg-dark/90 bg-white/95 backdrop-blur-md shadow-md dark:shadow-black/30 shadow-primary/5 dark:border-b-0 border-b border-primary/10'
            : 'bg-transparent'
        }`}
      >
        {/* 3px spacer so content clears the progress bar */}
        <div className="h-[3px]" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('hero')}
            className="dark:text-white text-lightText font-bold text-lg tracking-wide hover:text-primary dark:hover:text-primary transition-colors duration-200"
            aria-label="Scroll to top"
          >
            Atharva{' '}
            <span className="text-primary">Kulkarni</span>
          </button>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    activeSection === id
                      ? 'text-primary'
                      : 'dark:text-textLight text-[#4B5563] dark:hover:text-white hover:text-primary'
                  }`}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full transition-all duration-200 ${
                      activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right side: theme toggle + Resume ── */}
          <div className="hidden md:flex items-center gap-3">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:text-textLight text-[#4B5563] dark:hover:text-white hover:text-primary dark:hover:bg-white/10 hover:bg-primary/10 transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Resume */}
            <a
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
            >
              Resume
              <DownloadIcon />
            </a>
          </div>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:text-textLight text-[#4B5563] dark:hover:text-white hover:text-primary transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger */}
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block h-[2px] w-6 dark:bg-textLight bg-[#4B5563] rounded-full transition-all duration-300 dark:group-hover:bg-white group-hover:bg-primary ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-6 dark:bg-textLight bg-[#4B5563] rounded-full transition-all duration-300 dark:group-hover:bg-white group-hover:bg-primary ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[2px] w-6 dark:bg-textLight bg-[#4B5563] rounded-full transition-all duration-300 dark:group-hover:bg-white group-hover:bg-primary ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } dark:bg-dark/95 bg-white/98 backdrop-blur-md dark:border-white/5 border-primary/10 border-t`}
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col px-6 py-4 gap-1" role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left py-3 text-sm font-medium dark:border-white/5 border-primary/10 border-b transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-primary'
                      : 'dark:text-textLight text-[#4B5563] dark:hover:text-white hover:text-primary'
                  }`}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}

            <li className="pt-3">
              <a
                href="/Atharva_Kulkarni_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 w-full"
                onClick={() => setMenuOpen(false)}
              >
                Resume
                <DownloadIcon />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
