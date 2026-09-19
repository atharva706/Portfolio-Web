// useScrollSpy.js
// Tracks which section is currently in the viewport as the user scrolls.
// Used by: Navbar — to highlight the active nav link.
//
// Usage:
//   const activeSection = useScrollSpy(['hero', 'about', 'skills', 'projects', 'experience', 'contact'])

import { useState, useEffect } from 'react'

const useScrollSpy = (sectionIds = [], offset = 100) => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          return
        }
      }

      setActiveSection(sectionIds[0] || '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}

export default useScrollSpy
