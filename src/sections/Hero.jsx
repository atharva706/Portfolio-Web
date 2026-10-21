import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowDown } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import personalInfo from '../data/personalInfo'

// ─── Role cycler — simple fade swap, no scramble ─────────────────────
const ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React Developer',
  'Node.js Developer',
]

function RoleCycler() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % ROLES.length)
        setVisible(true)
      }, 320)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="gradient-shimmer font-semibold"
      style={{
        display: 'inline-block',
        minWidth: '22ch',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.32s ease, transform 0.32s ease',
      }}
      aria-label={ROLES[idx]}
    >
      {ROLES[idx]}
    </span>
  )
}

// ─── Fade-up stagger helper ───────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

// ─── HERO ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { name, bio, social, email } = personalInfo

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const socials = [
    social.github   && { href: social.github,      icon: <FiGithub   size={17} />, label: 'GitHub'   },
    social.linkedin && { href: social.linkedin,     icon: <FiLinkedin size={17} />, label: 'LinkedIn'  },
    social.leetcode && { href: social.leetcode,     icon: <SiLeetcode size={16} />, label: 'LeetCode'  },
                       { href: `mailto:${email}`,   icon: <FiMail     size={17} />, label: 'Email'     },
  ].filter(Boolean)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Subtle grid */}
      <div className="hero-grid" aria-hidden />

      {/* Single soft glow behind content — not animated, just ambient */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(var(--t-primary-rgb), 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center
                      px-5 md:px-12 lg:px-20 pt-24 pb-12
                      max-w-[860px] w-full mx-auto">
        <div className="w-full flex flex-col">

          {/* Availability badge */}
          <motion.div {...fadeUp(0.1)} className="mb-7">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                         text-[11px] font-medium tracking-wide"
              style={{
                border: '1px solid var(--t-border)',
                color: 'var(--t-text-muted)',
                background: 'var(--t-card)',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-dot absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-display font-extrabold text-white leading-[0.95] tracking-tight mb-5 select-none"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
          >
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          {/* Role line */}
          <motion.div
            {...fadeUp(0.32)}
            className="flex flex-wrap items-baseline gap-2 mb-6"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            <span style={{ color: 'var(--t-text-muted)' }}>I build as a</span>
            <RoleCycler />
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.42)}
            className="max-w-[540px] leading-[1.85] mb-9"
            style={{ fontSize: '14.5px', color: 'var(--t-text-muted)' }}
          >
            {bio}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.52)} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 text-[13px] font-semibold
                         px-6 py-3 rounded-xl text-white transition-opacity duration-200
                         hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, var(--t-shimmer-a), var(--t-shimmer-b))',
                boxShadow: '0 4px 24px rgba(var(--t-primary-rgb), 0.30)',
              }}
            >
              View Projects
              <FiArrowRight size={14} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 text-[13px] font-medium
                         px-6 py-3 rounded-xl transition-all duration-200
                         hover:border-opacity-50"
              style={{
                border: '1px solid var(--t-border)',
                color: 'var(--t-text-muted)',
                background: 'var(--t-card)',
              }}
            >
              Get in touch
            </button>

            <a
              href="/Atharva_Kulkarni_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium
                         px-6 py-3 rounded-xl transition-all duration-200"
              style={{
                border: '1px solid var(--t-border)',
                color: 'var(--t-text-muted)',
                background: 'var(--t-card)',
              }}
            >
              Resume ↗
            </a>
          </motion.div>

          {/* Socials + location */}
          <motion.div {...fadeUp(0.62)} className="flex items-center gap-5">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors duration-200 hover:text-primary"
                style={{ color: 'var(--t-text-faint)' }}
              >
                {icon}
              </a>
            ))}
            <span className="w-px h-4 mx-1" style={{ background: 'var(--t-border)' }} />
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--t-text-faint)' }}
            >
              Pune · India
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-1.5 pb-8 scroll-bounce"
      >
        <span
          className="text-[9px] font-mono uppercase tracking-[0.22em]"
          style={{ color: 'var(--t-text-faint)' }}
        >
          scroll
        </span>
        <FiArrowDown size={11} style={{ color: 'var(--t-text-faint)' }} />
      </motion.div>
    </section>
  )
}
