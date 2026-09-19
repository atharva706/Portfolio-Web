// Experience Section
// Vertical timeline of work experience.
// Scroll-triggered animations, full dark/light theme support.

import { motion } from 'framer-motion'
import experience from '../data/experience'
import TimelineItem from '../components/ui/TimelineItem'
import SectionTitle from '../components/ui/SectionTitle'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  },
})

const VIEWPORT = { once: true, margin: '-70px' }

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">

      {/* Background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0
                   w-[360px] h-[360px] rounded-full
                   bg-primary/10 dark:bg-primary/8 blur-[110px]"
      />

      <div className="max-w-3xl mx-auto relative z-10">

        <SectionTitle
          label="Where I've Worked"
          title="Experience"
          subtitle="Still early in my career — but I've shipped real code in a real product environment."
        />

        {/* ── Timeline ── */}
        <div>
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp(index * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <TimelineItem
                item={item}
                isLast={index === experience.length - 1}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Open to work callout ── */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 dark:bg-darkCard bg-white rounded-2xl p-6
                     border border-primary/20 dark:border-primary/15
                     shadow-sm shadow-primary/5
                     flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-primary/15 flex-shrink-0
                          flex items-center justify-center">
            <span className="text-lg">🚀</span>
          </div>
          <div>
            <p className="font-bold text-sm dark:text-white text-lightText">
              Currently open to work
            </p>
            <p className="text-xs dark:text-textLight text-[#4B5563] mt-0.5 leading-relaxed">
              Recently graduated B.Tech 2026. Looking for full-stack or frontend roles — I'm a fast learner, I write clean code, and I ship.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Experience
