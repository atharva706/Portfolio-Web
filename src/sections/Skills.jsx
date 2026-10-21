// Skills — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • hero-grid overlay (50% opacity) for visual continuity
//   • Same aurora blob radii/opacity as Hero and About
//   • section-label pattern from Hero
//   • border-glow-card + gradient-shimmer for stat strip
//   • Filter tabs use same spring config as Navbar active-pill
//   • SkillCard: colored bottom-bloom glow + border flash on hover
//   • Same Reveal wrapper pattern (whileInView, [0.16,1,0.3,1])
//   • max-w-[1360px] to match Hero content width

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiCplusplus, SiJavascript, SiC, SiMysql,
  SiReact, SiNodedotjs, SiExpress,
  SiMongodb, SiGit, SiGithub, SiPostman, SiVercel,
} from 'react-icons/si'
import { TbBinaryTree, TbBoxModel } from 'react-icons/tb'
import skills from '../data/skills'

// ─── Icon map ──────────────────────────────────────────────────────────
const ICON_MAP = {
  SiCplusplus:  <SiCplusplus  />,
  SiJavascript: <SiJavascript />,
  SiC:          <SiC          />,
  SiMysql:      <SiMysql      />,
  SiReact:      <SiReact      />,
  SiNodedotjs:  <SiNodedotjs  />,
  SiExpress:    <SiExpress    />,
  SiMongodb:    <SiMongodb    />,
  SiGit:        <SiGit        />,
  SiGithub:     <SiGithub     />,
  SiPostman:    <SiPostman    />,
  SiVercel:     <SiVercel     />,
  TbBinaryTree: <TbBinaryTree />,
  TbBoxModel:   <TbBoxModel   />,
}
const resolveIcon = name =>
  ICON_MAP[name] ?? <span className="font-bold text-sm">{name.slice(0, 2)}</span>

const enriched = skills.map(g => ({
  ...g,
  items: g.items.map(s => ({ ...s, icon: resolveIcon(s.icon) })),
}))

const ALL = 'All'
const CATEGORIES = [ALL, ...enriched.map(g => g.category)]

// ─── Reveal wrapper ────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, x = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 36, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-72px' }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// ─── Single skill card ─────────────────────────────────────────────────
function SkillCard({ name, icon, color = 'var(--t-primary)' }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl
                 border border-white/[0.07] cursor-default overflow-hidden"
      style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}55`
        e.currentTarget.style.boxShadow   = `0 12px 36px ${color}25, 0 0 0 1px ${color}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Bottom bloom glow — same technique as Hero aurora orbs */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   w-16 h-16 rounded-full opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 pointer-events-none"
        style={{ background: color, filter: 'blur(20px)' }}
      />

      {/* Icon */}
      <div
        className="relative z-10 text-[2rem] leading-none
                   transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        {icon}
      </div>

      {/* Name — /35 → /80 on hover, matches Hero text opacity scale */}
      <span className="relative z-10 text-[11px] font-semibold text-center
                       text-white/35 group-hover:text-white/80
                       transition-colors duration-200 leading-tight">
        {name}
      </span>
    </motion.div>
  )
}

// ─── SKILLS ────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState(ALL)

  const visible = active === ALL
    ? enriched
    : enriched.filter(g => g.category === active)

  return (
    <section
      id="skills"
      className="relative py-28 px-5 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Hero-matched grid — visual continuity */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Aurora blobs */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ bottom: '-5%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-1) 0%,transparent 65%)',
          filter: 'blur(80px)' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '5%', right: '-5%', width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-2) 0%,transparent 65%)',
          filter: 'blur(70px)', animationDelay: '3s' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '50%', left: '50%', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter: 'blur(60px)', animationDelay: '7s' }} />

      <div className="max-w-[1360px] mx-auto relative z-10">

        {/* ═══ HEADER ═══ */}
        <Reveal className="text-center mb-16">
          <div className="section-label justify-center mb-5">What I Work With</div>
          <h2
            className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            Skills &amp; <span className="gradient-shimmer">Tech Stack</span>
          </h2>
          <p className="mt-5 text-white/35 max-w-[440px] mx-auto leading-[1.9]"
            style={{ fontSize: '14.5px' }}>
            Languages, frameworks, and tools I reach for when building full-stack products.
          </p>
        </Reveal>

        {/* ═══ FILTER TABS ═══ */}
        <Reveal delay={0.08} className="flex flex-wrap justify-center gap-2 mb-14">
          {CATEGORIES.map(cat => {
            const isActive = active === cat
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2 rounded-full text-[12px] font-semibold
                           border transition-all duration-250 overflow-hidden"
                style={isActive ? {
                  background: 'linear-gradient(135deg,#2563EB,#3B82F6)',
                  borderColor: 'transparent',
                  color: '#fff',
                  boxShadow: '0 0 22px rgba(var(--t-primary-rgb),0.50)',
                } : {
                  background: 'var(--t-card)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.40)',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(var(--t-primary-rgb),0.45)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.40)'
                  }
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: 'linear-gradient(135deg,#2563EB,#3B82F6)' }}
                    transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                  />
                )}
                {cat}
              </motion.button>
            )
          })}
        </Reveal>

        {/* ═══ SKILL GROUPS ═══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            {visible.map((group, gi) => (
              <div key={group.category}>

                {/* Category divider — All view only */}
                {active === ALL && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: gi * 0.05 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"
                      style={{ boxShadow: '0 0 8px rgba(37,99,235,0.8)' }} />
                    <span className="text-[12px] font-bold text-white/55 uppercase tracking-[0.16em]">
                      {group.category}
                    </span>
                    <div className="flex-1 h-px"
                      style={{ background: 'linear-gradient(to right,rgba(var(--t-primary-rgb),0.35),transparent)' }} />
                    <span className="text-[10px] text-white/22 font-mono shrink-0">
                      {group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </motion.div>
                )}

                {/* Cards grid */}
                <motion.div
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.055 } },
                  }}
                >
                  {group.items.map(skill => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden:  { opacity: 0, y: 22, scale: 0.88 },
                        visible: { opacity: 1, y: 0,  scale: 1,
                          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <SkillCard name={skill.name} icon={skill.icon} color={skill.color} />
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ═══ BOTTOM STAT STRIP — same as About counters ═══ */}
        <Reveal delay={0.15} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: '5+',  label: 'Categories',    sub: 'mastered across the stack' },
              { value: '14',  label: 'Skills Listed',  sub: 'across the full stack'     },
              { value: '1',   label: 'Internship',     sub: 'MERN stack experience'     },
              { value: '2+',  label: 'Years',          sub: 'writing production code'   },
            ].map(({ value, label, sub }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className="border-glow-card rounded-2xl p-5 border border-white/[0.07]
                           text-center cursor-default"
                style={{ background: 'var(--t-card)', backdropFilter: 'blur(12px)' }}
              >
                <p className="gradient-shimmer font-display font-extrabold leading-none mb-1.5"
                  style={{ fontSize: '2rem' }}>
                  {value}
                </p>
                <p className="text-[12px] font-semibold text-white/60 mb-0.5">{label}</p>
                <p className="text-[10px] text-white/25">{sub}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
