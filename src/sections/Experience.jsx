// Experience — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • hero-grid overlay for visual continuity
//   • Same aurora blob pattern as all other sections
//   • section-label + gradient-shimmer headline
//   • "Open to work" callout mirrors Hero availability chip + About stat card
//   • Staggered whileInView on timeline items
//   • max-w-[1360px] content width, centered timeline at max-w-2xl

import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'
import experience from '../data/experience'
import TimelineItem from '../components/ui/TimelineItem'

// ─── Reveal wrapper ────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-72px' }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// ─── EXPERIENCE ────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-5 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Hero-matched grid */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Aurora blobs */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ bottom: '0%', right: '-8%', width: 540, height: 540, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-1) 0%,transparent 65%)',
          filter: 'blur(80px)' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '5%', left: '-8%', width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-2) 0%,transparent 65%)',
          filter: 'blur(70px)', animationDelay: '4s' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '50%', left: '40%', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter: 'blur(60px)', animationDelay: '9s' }} />

      <div className="max-w-[1360px] mx-auto relative z-10">

        {/* ═══ HEADER ═══ */}
        <Reveal className="text-center mb-16">
          <div className="section-label justify-center mb-5">Where I've Worked</div>
          <h2
            className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            Work <span className="gradient-shimmer">Experience</span>
          </h2>
          <p className="mt-5 text-white/35 max-w-[480px] mx-auto leading-[1.9]"
            style={{ fontSize: '14.5px' }}>
            Still early in my career — but I've shipped real code in a real product environment.
          </p>
        </Reveal>

        {/* ═══ TIMELINE ═══ */}
        <div className="max-w-2xl mx-auto">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.10 }}
            >
              <TimelineItem item={item} isLast={i === experience.length - 1} />
            </motion.div>
          ))}

          {/* ═══ OPEN TO WORK CALLOUT ═══
               Mirrors Hero availability chip + About emerald badge styling */}
          <Reveal delay={0.18}>
            <div
              className="mt-4 border-glow-card rounded-2xl p-6 border"
              style={{
                background: 'rgba(var(--t-primary-rgb),0.06)',
                borderColor: 'rgba(var(--t-primary-rgb),0.22)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 44px rgba(var(--t-primary-rgb),0.18)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* Icon — same gradient as Hero CTA button */}
                <div
                  className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)',
                    boxShadow: '0 0 24px rgba(var(--t-primary-rgb),0.40)' }}
                >
                  <FiZap size={18} className="text-white" />
                </div>

                <div className="flex-1">
                  {/* Availability chip — identical to Hero's "Open to opportunities" */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="ping-dot absolute inset-0 rounded-full bg-emerald-400" />
                      <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <p className="text-[13px] font-bold text-white/85">
                      Currently open to work
                    </p>
                  </div>
                  <p className="text-[12.5px] text-white/35 leading-[1.85]">
                    Graduated B.Tech 2026. Looking for full-stack or frontend roles —
                    I'm a fast learner, I write clean code, and I ship.
                  </p>
                </div>

                {/* CTA scroll button */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="shrink-0 btn-shine text-[12px] font-semibold px-5 py-2.5 rounded-xl
                             text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg,#6C63FF,#a855f7)',
                    boxShadow: '0 0 20px rgba(var(--t-primary-rgb),0.35)',
                  }}
                >
                  Let's talk →
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
