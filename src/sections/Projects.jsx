// Projects Section
// Responsive grid of ProjectCards.
// Scroll-triggered stagger animations, full dark/light theme support.

import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import projects from '../data/projects'
import ProjectCard from '../components/ui/ProjectCard'
import SectionTitle from '../components/ui/SectionTitle'

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ── Projects ──────────────────────────────────────────────────────────────────
const Projects = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">

      {/* Background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0
                   w-[400px] h-[400px] rounded-full
                   bg-primary/10 dark:bg-primary/8 blur-[120px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        <SectionTitle
          label="What I've Built"
          title="Projects"
          subtitle="Real things I've shipped — not just tutorials. Each one taught me something new."
        />

        {/* ── Cards grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariant}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/atharva706"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2
                       px-6 py-3 rounded-xl text-sm font-semibold
                       dark:border-white/10 border-primary/20 border
                       dark:text-textLight text-[#4B5563]
                       dark:hover:border-primary/50 hover:border-primary/50
                       hover:text-primary
                       dark:hover:bg-primary/5 hover:bg-primary/5
                       transition-all duration-300"
          >
            More projects on GitHub
            <FiArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Projects
