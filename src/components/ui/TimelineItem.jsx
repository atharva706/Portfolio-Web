// TimelineItem — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • border-glow-card gradient border + lift on hover
//   • Same glass backdrop as Hero identity card
//   • Text opacity scale: titles /85, body /35, muted /25
//   • Period badge uses primary/10 bg + primary/25 border (same as About edu badge)
//   • Tag style matches Hero featured-work row tags
//   • Icon dot: gradient fill + ring glow (same as About timeline dot)
//   • Connecting line: gradient fade to transparent (same as About .timeline-line)

import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'

const TimelineItem = ({ item, isLast = false }) => {
  const { role, company, companyDesc, period, description, tags = [] } = item

  return (
    <div className="relative flex gap-6">

      {/* ── Spine ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Icon dot — matches About section dot */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg,rgba(var(--t-primary-rgb),0.35),var(--t-glow-2))',
            border: '1px solid rgba(var(--t-primary-rgb),0.40)',
            boxShadow: '0 0 14px rgba(var(--t-primary-rgb),0.30)',
          }}
        >
          <FiBriefcase size={15} className="text-primary" />
        </div>
        {/* Connecting line — gradient fade like .timeline-line */}
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: 'linear-gradient(to bottom,rgba(var(--t-primary-rgb),0.50),rgba(37,99,235,0.0))' }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div className={`flex-1 ${!isLast ? 'pb-10' : 'pb-2'}`}>
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="border-glow-card rounded-2xl p-6 border border-white/[0.07]"
          style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}
        >
          {/* Period badge */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4
                       text-[10.5px] font-semibold text-primary/80 border border-primary/25"
            style={{ background: 'rgba(var(--t-primary-rgb),0.10)' }}
          >
            {period}
          </span>

          {/* Role */}
          <h3 className="font-bold text-[14px] text-white/85 leading-snug">{role}</h3>

          {/* Company */}
          <p className="text-primary font-semibold text-[13px] mt-0.5">{company}</p>

          {/* Company desc — /35 body copy scale */}
          {companyDesc && (
            <p className="text-[11.5px] text-white/35 mt-0.5">{companyDesc}</p>
          )}

          {/* Description */}
          <p className="text-[13px] text-white/35 leading-[1.85] mt-4">{description}</p>

          {/* Tags — matches Hero featured-work row + About internship tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-medium text-white/35
                             border border-white/[0.07]"
                  style={{ background: 'var(--t-card)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default TimelineItem
