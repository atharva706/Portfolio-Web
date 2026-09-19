// About Section
// Two-column layout: bio + education (left), stats + focus cards (right)
// Scroll-triggered fade-in animations via framer-motion
// Full dark / light theme support

import { motion } from 'framer-motion'
import { FiCode, FiServer, FiCpu, FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi'
import personalInfo from '../data/personalInfo'
import SectionTitle from '../components/ui/SectionTitle'

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  },
})

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  },
})

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  },
})

const VIEWPORT = { once: true, margin: '-80px' }

// ── Focus area cards ──────────────────────────────────────────────────────────
const FOCUS_AREAS = [
  {
    icon: FiCode,
    title: 'Frontend',
    desc: 'React + Tailwind — building UIs that look sharp and feel smooth across every screen size.',
  },
  {
    icon: FiServer,
    title: 'Backend',
    desc: 'Node.js, Express, REST APIs — designing systems that are clean, fast, and easy to maintain.',
  },
  {
    icon: FiCpu,
    title: 'Problem Solving',
    desc: 'Strong DSA and OOP foundation. I think in systems, not just syntax.',
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '3+',   label: 'Projects Shipped' },
  { value: '2+',   label: 'Years Coding'     },
  { value: 'MERN', label: 'Core Stack'       },
  { value: '2026', label: 'Graduating'       },
]

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => {
  const { name, bio, education, location } = personalInfo

  return (
    <section id="about" className="section-padding relative overflow-hidden">

      {/* Background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0
                   w-[350px] h-[350px] rounded-full
                   bg-primary/10 dark:bg-primary/8 blur-[110px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        <SectionTitle
          label="Who I Am"
          title="About Me"
          subtitle="Recently graduated full-stack developer who genuinely enjoys solving hard problems with clean code."
        />

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-8">

            {/* Bio */}
            <motion.div
              variants={fadeLeft(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="dark:bg-darkCard bg-white rounded-2xl p-7
                         border dark:border-white/5 border-primary/10
                         shadow-sm shadow-primary/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <FiBookOpen className="text-primary" size={17} />
                </div>
                <h3 className="font-bold text-base dark:text-white text-lightText">
                  My Story
                </h3>
              </div>
              <p className="dark:text-textLight text-[#4B5563] leading-relaxed text-sm sm:text-base">
                {bio}
              </p>

              {/* Location pill */}
              <div className="mt-5 flex items-center gap-2 text-xs dark:text-textLight text-lightMuted">
                <FiMapPin size={13} className="text-primary" />
                <span>{location}</span>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={fadeLeft(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="dark:bg-darkCard bg-white rounded-2xl p-7
                         border dark:border-white/5 border-primary/10
                         shadow-sm shadow-primary/5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <FiCalendar className="text-primary" size={17} />
                </div>
                <h3 className="font-bold text-base dark:text-white text-lightText">
                  Education
                </h3>
              </div>

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 dark:ring-primary/20 ring-primary/15 flex-shrink-0" />
                  <div className="w-px flex-1 bg-primary/20 mt-2" />
                </div>

                <div className="pb-2">
                  <p className="font-bold text-sm dark:text-white text-lightText leading-snug">
                    {education.degree}
                  </p>
                  <p className="text-primary font-semibold text-sm mt-1">
                    {education.institution}
                  </p>
                  <p className="text-xs dark:text-textLight text-lightMuted mt-1">
                    {education.location}
                  </p>
                  <span className="inline-block mt-3 text-[11px] font-semibold px-3 py-1 rounded-full
                                   bg-primary/10 text-primary border border-primary/20">
                    {education.startYear} — {education.endYear}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-8">

            {/* Stats grid */}
            <motion.div
              variants={fadeRight(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="dark:bg-darkCard bg-white rounded-2xl p-5
                             border dark:border-white/5 border-primary/10
                             shadow-sm shadow-primary/5
                             flex flex-col items-center justify-center text-center
                             hover:border-primary/40 transition-colors duration-300"
                >
                  <span className="text-3xl font-extrabold gradient-text leading-none">
                    {value}
                  </span>
                  <span className="text-xs dark:text-textLight text-[#4B5563] mt-2 font-medium leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Focus area cards */}
            <div className="flex flex-col gap-4">
              {FOCUS_AREAS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeRight(i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  className="dark:bg-darkCard bg-white rounded-2xl p-5
                             border dark:border-white/5 border-primary/10
                             shadow-sm shadow-primary/5
                             flex items-start gap-4
                             hover:border-primary/40 transition-all duration-300
                             group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/15
                                  flex items-center justify-center flex-shrink-0
                                  group-hover:bg-primary/25 transition-colors duration-300">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm dark:text-white text-lightText mb-1">
                      {title}
                    </h4>
                    <p className="text-xs dark:text-textLight text-[#4B5563] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
