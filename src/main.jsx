import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App'

// ─────────────────────────────────────────────
// LENIS — buttery smooth scroll
// ─────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.25,           // scroll duration multiplier
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.8,
  infinite: false,
})

// RAF loop
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Expose on window so any component can call lenis.scrollTo(...)
window.__lenis = lenis

// ─────────────────────────────────────────────
// SCROLL-REVEAL  (IntersectionObserver)
// Watches elements with [data-reveal] and adds
// the 'is-visible' class when they enter viewport
// ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Once revealed, stop watching
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

// Observe existing + future [data-reveal] elements via MutationObserver
function observeRevealElements() {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el)
  })
}

// Run after DOM is painted, and again when new nodes are added
const mutationObserver = new MutationObserver(observeRevealElements)

// Wait for React to mount
const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Start observing after React's first paint
requestAnimationFrame(() => {
  observeRevealElements()
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

// ─────────────────────────────────────────────
// CURSOR — custom dot + ring + page-wide glow
// ─────────────────────────────────────────────

// Only run on pointer-fine devices (desktop)
if (window.matchMedia('(pointer: fine)').matches) {

  // Create elements
  const dot  = document.createElement('div')
  const ring = document.createElement('div')
  const glow = document.createElement('div')
  dot.className  = 'cursor-dot'
  ring.className = 'cursor-ring'
  glow.className = 'cursor-glow'
  document.body.appendChild(dot)
  document.body.appendChild(ring)
  document.body.appendChild(glow)

  let mouseX = -999, mouseY = -999
  let ringX  = -999, ringY  = -999
  let raf

  // Dot follows cursor instantly; ring lerps behind
  const lerp = (a, b, t) => a + (b - a) * t

  const tick = () => {
    ringX = lerp(ringX, mouseX, 0.14)
    ringY = lerp(ringY, mouseY, 0.14)
    dot.style.left  = `${mouseX}px`
    dot.style.top   = `${mouseY}px`
    ring.style.left = `${ringX}px`
    ring.style.top  = `${ringY}px`
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  // Track mouse
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    // Update page-wide glow CSS vars
    glow.style.setProperty('--cx', `${e.clientX}px`)
    glow.style.setProperty('--cy', `${e.clientY}px`)
  })

  // Hover state — detect interactive elements
  const INTERACTIVE = 'a,button,[role="button"],input,textarea,select,label,[tabindex]'
  document.addEventListener('mouseover', e => {
    if (e.target.closest(INTERACTIVE)) {
      dot.classList.add('is-hovering')
      ring.classList.add('is-hovering')
    }
  })
  document.addEventListener('mouseout', e => {
    if (e.target.closest(INTERACTIVE)) {
      dot.classList.remove('is-hovering')
      ring.classList.remove('is-hovering')
    }
  })

  // Click pulse
  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking')
    ring.classList.add('is-clicking')
  })
  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking')
    ring.classList.remove('is-clicking')
  })

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0'
    ring.style.opacity = '0'
  })
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1'
    ring.style.opacity = '1'
  })
}
