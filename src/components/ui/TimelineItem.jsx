// TimelineItem Component
// A single entry in the Experience timeline.
// Props: item { role, company, companyDesc, period, description, tags[] }, isLast
// Full dark / light theme support.

import { FiBriefcase } from 'react-icons/fi'
import Badge from './Badge'

const TimelineItem = ({ item, isLast = false }) => {
  const { role, company, companyDesc, period, description, tags = [] } = item

  return (
    <div className="relative flex gap-5 sm:gap-8">

      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Icon dot */}
        <div className="w-10 h-10 rounded-full bg-primary/15 border-2 border-primary/40
                        flex items-center justify-center z-10 flex-shrink-0">
          <FiBriefcase className="text-primary" size={16} />
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div className="w-px flex-1 mt-2 dark:bg-white/10 bg-primary/15" />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={`flex-1 ${!isLast ? 'pb-10' : 'pb-2'}`}>
        <div className="dark:bg-darkCard bg-white rounded-2xl p-6
                        border dark:border-white/5 border-primary/10
                        shadow-sm shadow-primary/5
                        hover:border-primary/30 transition-colors duration-300">

          {/* Period badge */}
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase
                           px-3 py-1 rounded-full mb-4
                           bg-primary/10 text-primary border border-primary/20">
            {period}
          </span>

          {/* Role */}
          <h3 className="font-bold text-base dark:text-white text-lightText leading-snug">
            {role}
          </h3>

          {/* Company */}
          <p className="text-primary font-semibold text-sm mt-0.5">
            {company}
          </p>

          {/* Company description */}
          {companyDesc && (
            <p className="text-xs dark:text-textLight text-lightMuted mt-0.5">
              {companyDesc}
            </p>
          )}

          {/* Description */}
          <p className="text-sm dark:text-textLight text-[#4B5563] leading-relaxed mt-4">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <Badge key={tag} label={tag} />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default TimelineItem
