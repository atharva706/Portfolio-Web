// useHideOnScroll.js
// Hides the navbar when scrolling down, reveals it when scrolling up.
// Returns true when the navbar should be visible.
//
// Usage:
//   const isVisible = useHideOnScroll()

import { useState, useEffect, useRef } from 'react'

const useHideOnScroll = (threshold = 10) => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY.current

      if (currentScrollY < 80) {
        // Always show near the top of the page
        setIsVisible(true)
      } else if (diff > threshold) {
        // Scrolling down — hide
        setIsVisible(false)
      } else if (diff < -threshold) {
        // Scrolling up — show
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isVisible
}

export default useHideOnScroll
