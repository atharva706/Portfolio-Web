// useNavScroll.js
// Detects if the user has scrolled past a threshold — used to add a
// background/shadow to the Navbar once the hero is out of view.
//
// Usage:
//   const isScrolled = useNavScroll(50)  // true after scrolling 50px

import { useState, useEffect } from 'react'

const useNavScroll = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

export default useNavScroll
