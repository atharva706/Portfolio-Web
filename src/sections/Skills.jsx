// Skills Section
// Grouped skill cards by category with category filter tabs.
// Scroll-triggered animations, full dark/light theme support.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  SiCplusplus, SiJavascript, SiC, SiMysql,
  SiReact, SiNodedotjs, SiExpress,
  SiMongodb, SiGit, SiGithub, SiPostman, SiVercel,
} from 'react-icons/si'
import { TbBinaryTree, TbBoxModel } from 'react-icons/tb'

import skills from '../data/skills'
import SkillCard from '../components/ui/SkillCard'
import SectionTitle from '../components/ui/SectionTitle'

// ── Icon map: string name → React element ─────────────────────────────────────
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

// Resolve icon string → element, fallback to name initials
const resolveIcon = (iconName) => ICON_MAP[iconName] ?? <span className="text-sm font-bold">{iconName.slice(0, 2)}</span>

// Enrich skill items with resolved icon elements
const enrichedSkills = skills.map((group) => ({
  ...group,
  items: group.items.map((skill) => ({
    ...skill,
    icon: resolveIcon(skill.icon),
  })),
}))

const ALL_LABEL = 'All'
const CATEGORIES = [ALL_LABEL, ...enrichedSkills.map((g) => g.category)]

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ── Skills ────────────────────────────────────────────────────────────────────
const Skills = () => {
  const [active, setActive] = useState(ALL_LABEL)

  const visibleGroups =
    active === ALL_LABEL
      ? enrichedSkills
      : enrichedSkills.filter((g) => g.category === active)

  return (
    <section id="skills" className="section-padding relative overflow-hidden">

      {/* Background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0
                   w-[380px] h-[380px] rounded-full
                   bg-primary/10 dark:bg-primary/8 blur-[120px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        <SectionTitle
          label="What I Work With"
          title="Skills & Tech Stack"
          subtitle="Languages, frameworks, and tools I use to build full-stack products."
        />

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                active === cat
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                  : 'dark:border-white/10 border-primary/15 dark:text-textLight text-[#4B5563] dark:hover:border-primary/40 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Skill groups ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-10"
          >
            {visibleGroups.map((group) => (
              <div key={group.category}>

                {/* Category label — only shown in "All" view */}
                {active === ALL_LABEL && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 mb-5"
                  >
                    <span className="text-sm font-bold dark:text-white text-lightText tracking-wide">
                      {group.category}
                    </span>
                    <div className="flex-1 h-px dark:bg-white/5 bg-primary/10" />
                    <span className="text-xs dark:text-textLight text-lightMuted">
                      {group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </motion.div>
                )}

                {/* Cards grid */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
                >
                  {group.items.map((skill) => (
                    <motion.div key={skill.name} variants={cardVariant}>
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

export default Skills
