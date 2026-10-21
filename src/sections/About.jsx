// About — dark editorial, visually continuous with Hero
//
// Synced to Hero:
//   • Same aurora blob sizes / opacities / section-glow animation
//   • Same hero-grid background (fade bottom) so the two sections bleed together
//   • Same border-glow-card, gradient-shimmer, section-label, noise-layer opacity
//   • Text opacity scale matches Hero: body copy → /35, muted labels → /25–/28
//   • data-reveal scroll system (main.jsx IntersectionObserver)
//   • MagBtn → replaced with motion.button using same spring config
//   • Same font sizes / tracking / weight as Hero identity card

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiCode, FiServer, FiCpu, FiMapPin, FiCalendar,
  FiAward, FiArrowUpRight, FiBookOpen, FiHeart,
  FiDownload,
} from 'react-icons/fi'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si'
import personalInfo from '../data/personalInfo'

// ─── Data ──────────────────────────────────────────────────────────────
const FOCUS = [
  {
    icon: FiCode,
    color: 'var(--t-primary)',
    title: 'Frontend Engineering',
    desc: 'React 18 + Tailwind — pixel-perfect, accessible UIs that feel alive across every viewport.',
  },
  {
    icon: FiServer,
    color: '#3B82F6',
    title: 'Backend & APIs',
    desc: 'Node.js, Express, REST APIs — clean architecture, fast response times, built to scale.',
  },
  {
    icon: FiCpu,
    color: '#93C5FD',
    title: 'Problem Solving',
    desc: '100+ DSA problems solved. Strong OOP and systems thinking — I debug fast and design for edge cases.',
  },
]

const STATS = [
  { end: 5,   suffix: '+', label: 'Projects Shipped', icon: FiAward    },
  { end: 2,   suffix: '+', label: 'Years Coding',     icon: FiCalendar },
  { end: 100, suffix: '+', label: 'DSA Problems',     icon: FiCpu      },
  { end: 1,   suffix: '',  label: 'Internship',        icon: FiAward    },
]

const STACK_ICONS = [
  { Icon: SiReact,     color: '#61DAFB', label: 'React'   },
  { Icon: SiNodedotjs, color: '#68A063', label: 'Node.js' },
  { Icon: SiMongodb,   color: '#4DB33D', label: 'MongoDB' },
  { Icon: SiExpress,   color: '#aaaaaa', label: 'Express' },
]

// ─── Animated counter (same as Hero) ──────────────────────────────────
function Counter({ end, suffix = '', duration = 1800 }) {
  const [val, setVal]   = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = now => {
          const p = Math.min((now - t0) / duration, 1)
          setVal(Math.floor((1 - Math.pow(2, -10 * p)) * end))
          if (p < 1) requestAnimationFrame(tick); else setVal(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Reveal wrapper — mirrors Hero's whileInView pattern ───────────────
const Reveal = ({ children, delay = 0, x = 0, y = 36, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-72px' }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// ─── ABOUT ─────────────────────────────────────────────────────────────
export default function About() {
  const { bio, education, location, resumeUrl } = personalInfo

  return (
    <section id="about"
      className="relative py-28 px-5 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--t-bg)' }}>

      {/* ── Hero-matched grid (fade bottom) — visual continuity ── */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* ── Aurora glows — same radii / opacity scale as Hero ── */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{
          top: '-5%', right: '-8%', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-1) 0%,transparent 65%)',
          filter: 'blur(80px)',
        }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{
          bottom: '0%', left: '-10%', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-2) 0%,transparent 65%)',
          filter: 'blur(70px)', animationDelay: '4s',
        }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{
          top: '45%', left: '38%', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter: 'blur(60px)', animationDelay: '8s',
        }} />

      <div className="max-w-[1360px] mx-auto relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <Reveal className="text-center mb-20">
          {/* same section-label as Hero's identity card labels */}
          <div className="section-label justify-center mb-5">About Me</div>

          <h2
            className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
            The person behind<br />
            <span className="gradient-shimmer">the code</span>
          </h2>

          <p className="mt-5 text-white/35 max-w-[480px] mx-auto leading-[1.9]"
            style={{ fontSize: '14.5px' }}>
            Full-stack developer who genuinely enjoys solving hard problems
            and shipping things that matter.
          </p>
        </Reveal>

        {/* ═══ MAIN GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ════ LEFT ════ */}
          <div className="flex flex-col gap-5">

            {/* Bio card — mirrors Hero's identity card */}
            <Reveal delay={0.05}>
              <div className="border-glow-card rounded-2xl p-7 border border-white/[0.07]"
                style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}>

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="icon-badge w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg,rgba(var(--t-primary-rgb),0.30),var(--t-glow-2))',
                        border: '1px solid rgba(var(--t-primary-rgb),0.25)',
                      }}>
                      <FiBookOpen size={17} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-white/85 text-[14px]">My Story</h3>
                  </div>

                  {/* Location chip — same style as Hero availability chip */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full
                                  text-[10.5px] font-semibold text-white/40
                                  border border-white/[0.08]"
                    style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}>
                    <FiMapPin size={10} className="text-primary/70" />
                    {location}
                  </div>
                </div>

                {/* Bio text — /35 matches Hero paragraph opacity */}
                <p className="text-[13.5px] leading-[1.92] text-white/35">{bio}</p>

                {/* Core stack strip */}
                <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
                    Core stack
                  </span>
                  <div className="flex items-center gap-3">
                    {STACK_ICONS.map(({ Icon, color, label }) => (
                      <motion.div key={label}
                        whileHover={{ y: -3, scale: 1.18 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        title={label}
                        className="cursor-default"
                        style={{ color }}>
                        <Icon size={18} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Education card */}
            <Reveal delay={0.12}>
              <div className="border-glow-card rounded-2xl p-7 border border-white/[0.07]"
                style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}>

                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-badge w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(var(--t-primary-rgb),0.15))',
                      border: '1px solid rgba(59,130,246,0.22)',
                    }}>
                    <FiCalendar size={17} className="text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white/85 text-[14px]">Education</h3>
                </div>

                {/* Timeline — same .timeline-line class used here */}
                <div className="relative pl-8">
                  <div className="timeline-line" />
                  <div className="absolute left-0 top-1 w-[11px] h-[11px] rounded-full bg-primary
                                  ring-4 ring-primary/20 z-10" />

                  <p className="font-bold text-white/85 text-[13.5px] leading-snug mb-1">
                    {education.degree}
                  </p>
                  <p className="text-primary font-semibold text-[13px] mb-1">
                    {education.institution}
                  </p>
                  {/* matches Hero right-card sub-text: /35 */}
                  <p className="text-[11.5px] text-white/35 mb-3">{education.location}</p>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                   text-[10.5px] font-semibold text-primary/80
                                   border border-primary/25"
                    style={{ background: 'rgba(var(--t-primary-rgb),0.10)' }}>
                    <FiCalendar size={10} />
                    {education.startYear} — {education.endYear}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Internship card */}
            <Reveal delay={0.19}>
              <div className="border-glow-card rounded-2xl p-6 border border-white/[0.07]"
                style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="icon-badge w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(var(--t-primary-rgb),0.15))',
                        border: '1px solid rgba(59,130,246,0.22)',
                      }}>
                      <FiAward size={17} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/85">
                        Software Developer Trainee
                      </p>
                      <p className="text-[11.5px] text-primary/70 font-medium mt-0.5">
                        TPG · Fitness Startup, Nanded
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-semibold
                                   text-white/35 border border-white/[0.07]"
                    style={{ background: 'var(--t-card)' }}>
                    6 Months
                  </span>
                </div>

                <p className="mt-4 text-[12.5px] leading-[1.85] text-white/35">
                  MERN stack internship focused on frontend under a Senior Developer.
                  Deepened core JavaScript knowledge and built responsive React UI
                  components for a fitness-focused platform.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'UI Dev'].map(t => (
                    <span key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium text-white/35
                                 border border-white/[0.07]"
                      style={{ background: 'var(--t-card)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>

          {/* ════ RIGHT ════ */}
          <div className="flex flex-col gap-5">

            {/* Stat counters — same gradient-shimmer + Counter as Hero */}
            <Reveal delay={0.08} x={30}>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ end, suffix, label, icon: Icon }, i) => (
                  <motion.div key={label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="border-glow-card rounded-2xl p-5 border border-white/[0.07] cursor-default"
                    style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}>
                    <Icon size={15} className="text-primary/60 mb-3" />
                    <p className="gradient-shimmer font-display font-extrabold leading-none mb-1.5"
                      style={{ fontSize: '2.2rem', animationDelay: `${i * 0.4}s` }}>
                      <Counter end={end} suffix={suffix} />
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/28">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Focus area cards — same x-slide + FiArrowUpRight as Hero featured-work rows */}
            <div className="flex flex-col gap-3">
              {FOCUS.map(({ icon: Icon, color, title, desc }, i) => (
                <Reveal key={title} delay={0.15 + i * 0.08} x={30}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className="border-glow-card group rounded-2xl p-5 border border-white/[0.07]
                               flex items-start gap-4 cursor-default"
                    style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}>

                    <div className="icon-badge shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}30`,
                      }}>
                      <Icon size={18} style={{ color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-semibold text-white/80 text-[13px]">{title}</p>
                        <FiArrowUpRight size={14} className="text-white/20 group-hover:text-primary/50
                                                              transition-colors duration-200" />
                      </div>
                      <p className="text-[12px] leading-[1.8] text-white/35">{desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Personality strip */}
            <Reveal delay={0.38} x={30}>
              <div className="border-glow-card rounded-2xl p-5 border border-white/[0.07]"
                style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}>

                <div className="flex items-center gap-2 mb-4">
                  <FiHeart size={14} className="text-rose-400" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/28">
                    Beyond the code
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { emoji: '🎯', text: 'Competitive Programmer' },
                    { emoji: '🚀', text: 'Building in public'     },
                    { emoji: '📚', text: 'Continuous learner'     },
                    { emoji: '⚡', text: 'Ships fast & clean'     },
                  ].map(({ emoji, text }) => (
                    <div key={text}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                 border border-white/[0.06] text-[11.5px] text-white/45"
                      style={{ background: 'var(--t-card)' }}>
                      <span className="text-[14px]">{emoji}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Resume CTA — mirrors Hero's "View full résumé" card */}
            <Reveal delay={0.44} x={30}>
              <motion.a
                href={resumeUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-between rounded-2xl px-5 py-4
                           border transition-all duration-300"
                style={{
                  background: 'rgba(var(--t-primary-rgb),0.07)',
                  borderColor: 'rgba(var(--t-primary-rgb),0.22)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 44px rgba(var(--t-primary-rgb),0.22)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div>
                  <p className="text-[12.5px] font-semibold text-white/80 mb-0.5">
                    View full résumé
                  </p>
                  <p className="text-[11px] text-white/30">PDF · Updated 2026</p>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center
                                border border-primary/25 bg-primary/15
                                group-hover:bg-primary group-hover:border-primary
                                group-hover:shadow-lg group-hover:shadow-primary/35
                                transition-all duration-250">
                  <FiDownload size={14} className="text-primary group-hover:text-white transition-colors duration-200" />
                </div>
              </motion.a>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}
