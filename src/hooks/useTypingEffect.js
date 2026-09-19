// useTypingEffect.js
// Cycles through an array of strings with a typing + deleting animation.
// Returns the current display string and a boolean indicating if it's currently typing.
//
// Usage:
//   const { text, isTyping } = useTypingEffect(['Full Stack Developer', 'React Developer', 'Problem Solver'])

import { useState, useEffect, useRef } from 'react'

const useTypingEffect = (words = [], typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) => {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const wordIndex = useRef(0)
  const charIndex = useRef(0)

  useEffect(() => {
    if (!words.length) return

    let timeout

    const tick = () => {
      const currentWord = words[wordIndex.current]

      if (isTyping) {
        // Still characters left to type
        if (charIndex.current < currentWord.length) {
          charIndex.current += 1
          setText(currentWord.slice(0, charIndex.current))
          timeout = setTimeout(tick, typingSpeed)
        } else {
          // Word fully typed — pause then start deleting
          timeout = setTimeout(() => {
            setIsTyping(false)
          }, pauseMs)
        }
      } else {
        // Still characters to delete
        if (charIndex.current > 0) {
          charIndex.current -= 1
          setText(currentWord.slice(0, charIndex.current))
          timeout = setTimeout(tick, deletingSpeed)
        } else {
          // Word fully deleted — move to next word and start typing
          wordIndex.current = (wordIndex.current + 1) % words.length
          setIsTyping(true)
          timeout = setTimeout(tick, typingSpeed)
        }
      }
    }

    timeout = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeout)
  }, [isTyping, words, typingSpeed, deletingSpeed, pauseMs])

  return { text, isTyping }
}

export default useTypingEffect
