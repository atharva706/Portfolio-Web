// useWindowSize.js
// Returns the current window dimensions and updates on resize.
// Used by: Navbar (to detect mobile and toggle hamburger menu)
//
// Usage:
//   const { width, height } = useWindowSize()
//   const isMobile = width < 768

import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
