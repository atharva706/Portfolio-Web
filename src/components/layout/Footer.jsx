// Footer — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • Same #000 background + hero-grid overlay (25% opacity)
//   • Top divider glow matches Navbar scroll-progress gradient colours
//   • Logo badge: identical to Navbar AK badge (gradient + conic pulse)
//   • Social icon pills match Hero social icon style + whileHover spring
//   • Quick-link hover: same underline-grow as Navbar nav-underline
//   • Status card mirrors Hero availability chip + About "open to work" card
//   • gradient-shimmer on brand name
//   • Back-to-top button: same spring config as Hero CTAs

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import personalInfo from '../../data/personalInfo'

const NAV_LINKS = [
  { label: 'Home',       id: 'hero'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
]

const scrollTo = id =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  const { name, email, social } = personalInfo
  const year = new Date().getFullYear()

  const socialLinks = [
    social.github   && { href: social.github,           icon: FiGithub,   label: 'GitHub'   },
    social.linkedin && { href: social.linkedin,         icon: FiLinkedin, label: 'LinkedIn' },
    social.leetcode && { href: social.leetcode,         icon: SiLeetcode, label: 'LeetCode' },
    {                   href: `mailto:${email}`,        icon: FiMail,     label: 'Email'    },
  ].filter(Boolean)

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Grid overlay — 25% so it's subtle */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-25" />

      {/* Top divider — same gradient colours as Navbar scroll-progress bar */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(var(--t-primary-rgb),0.45),rgba(168,85,247,0.35),rgba(var(--t-primary-rgb),0.45),transparent)',
        }}
      />

      {/* Faint aurora top-right */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '-30%', right: '-10%', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(var(--t-primary-rgb),0.08) 0%,transparent 65%)',
          filter: 'blur(70px)' }} />

      <div className="max-w-[1360px] mx-auto px-5 md:px-12 lg:px-20 py-14 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5">
            {/* Logo — identical to Navbar badge */}
            <motion.button
              onClick={() => scrollTo('hero')}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-[38px] h-[38px] rounded-xl overflow-hidden
                         flex items-center justify-center
                         font-display font-extrabold text-[14px] text-white"
              style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)' }}
              aria-label="Scroll to top"
            >
              <motion.span
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-xl"
                style={{ background: 'radial-gradient(circle at 60% 40%,rgba(255,255,255,0.35),transparent 65%)' }}
              />
              <span className="relative z-10">AK</span>
            </motion.button>

            <div>
              {/* gradient-shimmer on name */}
              <button
                onClick={() => scrollTo('hero')}
                className="font-display font-extrabold text-[17px] gradient-shimmer mb-1 block"
                aria-label="Scroll to top"
              >
                Atharva Kulkarni
              </button>
              <p className="text-[12.5px] text-white/35 leading-[1.85] max-w-[220px]">
                Full-stack developer. Clean code, real products, ships fast.
              </p>
            </div>

            {/* Social icons — matches Hero social row style */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.22 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="text-white/25 hover:text-primary transition-colors duration-200"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-white/28">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="group relative text-[12.5px] text-white/35
                               hover:text-white/80 transition-colors duration-200 text-left"
                  >
                    {label}
                    {/* underline-grow — same as Navbar nav-underline */}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary rounded-full
                                     group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Status card ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-white/28">
              Status
            </p>

            <div
              className="rounded-2xl p-5 border border-primary/20 flex flex-col gap-3"
              style={{ background: 'rgba(var(--t-primary-rgb),0.06)', backdropFilter: 'blur(12px)' }}
            >
              {/* Availability chip — mirrors Hero exactly */}
              <span className="flex items-center gap-2 text-[11px] font-semibold
                               uppercase tracking-[0.14em] text-white/50">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="ping-dot absolute inset-0 rounded-full bg-emerald-400" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Open to opportunities
              </span>

              <p className="text-[12px] text-white/35 leading-[1.85]">
                Graduated B.Tech 2026. Looking for full-stack or frontend roles.
                Fast learner, ships clean code.
              </p>

              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className="text-[11.5px] font-semibold text-primary/70 hover:text-primary
                           transition-colors duration-200 text-left"
              >
                Let's talk →
              </motion.button>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4
                     pt-8 border-t border-white/[0.05]"
        >
          <p className="text-[11px] text-white/22 text-center sm:text-left font-mono">
            © {year} {name} · Built with React &amp; Tailwind CSS
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => scrollTo('hero')}
            aria-label="Back to top"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="group flex items-center gap-2 text-[11.5px] font-semibold
                       text-white/28 hover:text-white/75 transition-colors duration-200"
          >
            Back to top
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center
                         border border-white/[0.08] group-hover:border-primary/50
                         group-hover:bg-primary/12 transition-all duration-200"
            >
              <FiArrowUp size={12} />
            </span>
          </motion.button>
        </div>

      </div>
    </footer>
  )
}
