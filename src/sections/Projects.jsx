// Projects — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • hero-grid overlay for visual continuity
//   • Same aurora blob pattern as Hero/About/Skills
//   • section-label + gradient-shimmer headline
//   • Staggered whileInView card grid — same spring config
//   • GitHub CTA mirrors Hero's "Get in touch" secondary button
//   • max-w-[1360px] content width

import { motion } from 'framer-motion'
import { FiGithub, FiArrowRight } from 'react-icons/fi'
import projects from '../data/projects'
import ProjectCard from '../components/ui/ProjectCard'

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

// ─── PROJECTS ──────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 px-5 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Hero-matched grid */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Aurora blobs */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '-5%', right: '-8%', width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-1) 0%,transparent 65%)',
          filter: 'blur(80px)' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ bottom: '0%', left: '-10%', width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-2) 0%,transparent 65%)',
          filter: 'blur(70px)', animationDelay: '5s' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '40%', left: '35%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter: 'blur(60px)', animationDelay: '10s' }} />

      <div className="max-w-[1360px] mx-auto relative z-10">

        {/* ═══ HEADER ═══ */}
        <Reveal className="text-center mb-16">
          <div className="section-label justify-center mb-5">What I've Built</div>
          <h2
            className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            Featured <span className="gradient-shimmer">Projects</span>
          </h2>
          <p className="mt-5 text-white/35 max-w-[480px] mx-auto leading-[1.9]"
            style={{ fontSize: '14.5px' }}>
            Real things I've shipped — not just tutorials. Each one taught me something new.
          </p>
        </Reveal>

        {/* ═══ CARDS GRID ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.10 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={{
                hidden:  { opacity: 0, y: 36, scale: 0.96 },
                visible: { opacity: 1, y: 0,  scale: 1,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ GITHUB CTA — mirrors Hero secondary button ═══ */}
        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <motion.a
            href="https://github.com/atharva706"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2.5 text-[13px] font-semibold
                       px-7 py-3.5 rounded-xl text-white/55 hover:text-white
                       border border-white/[0.1] hover:border-primary/40
                       hover:bg-primary/[0.06] transition-all duration-200"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <FiGithub size={15} />
            More on GitHub
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowRight size={13} strokeWidth={2.5} />
            </motion.span>
          </motion.a>
        </Reveal>

      </div>
    </section>
  )
}
