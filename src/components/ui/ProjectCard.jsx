// ProjectCard — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • border-glow-card gradient border on hover + lift (-5px)
//   • Same glass backdrop style as Hero identity card
//   • btn-shine sweep on Live Demo button
//   • Tag badges match Hero's featured-work row tag style
//   • Text opacity scale: titles /85, body /35, muted /25
//   • FiArrowUpRight reveal on hover (same as About focus cards)
//   • Image placeholder uses primary gradient — matches Hero AK avatar

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiCode, FiArrowUpRight } from 'react-icons/fi'

const ProjectCard = ({ project }) => {
  const { title, description, image, tags = [], liveUrl, githubUrl } = project

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="border-glow-card group flex flex-col rounded-2xl overflow-hidden
                 border border-white/[0.07] h-full"
      style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}
    >
      {/* ── Image / Placeholder ── */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0"
        style={{ background: 'rgba(var(--t-primary-rgb),0.07)' }}>
        {image ? (
          <>
            <img
              src={image}
              alt={`${title} screenshot`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            {/* Same style as Hero AK avatar */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#2563EB,#3B82F6)' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'conic-gradient(from 0deg,transparent 70%,rgba(255,255,255,0.35) 100%)' }}
              />
              <div className="absolute inset-[3px] rounded-[9px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a0a2e)' }}>
                <FiCode size={22} className="text-white/70" />
              </div>
            </div>
            <span className="text-[11px] font-medium text-white/25 tracking-wide">
              Preview coming soon
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[14px] text-white/85 leading-snug">{title}</h3>
          <FiArrowUpRight
            size={15}
            className="shrink-0 mt-0.5 text-white/20 group-hover:text-primary/60
                       transition-colors duration-200"
          />
        </div>

        {/* Description — /35 matches Hero/About body copy */}
        <p className="text-[12.5px] text-white/35 leading-[1.85] line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tech tags — matches Hero featured-work row tag style */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="flex items-center gap-1.5 text-[11.5px] font-semibold
                         text-white/35 hover:text-white/75 transition-colors duration-200"
            >
              <FiGithub size={13} />
              Code
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-[11.5px] text-white/18
                             cursor-not-allowed select-none">
              <FiGithub size={13} />
              Code
            </span>
          )}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="btn-shine ml-auto flex items-center gap-1.5 text-[11.5px] font-semibold
                         px-3 py-1.5 rounded-lg text-white
                         transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg,#2563EB,#3B82F6)',
                boxShadow: '0 0 16px rgba(var(--t-primary-rgb),0.35)',
              }}
            >
              Live Demo
              <FiExternalLink size={11} />
            </a>
          ) : (
            <span className="ml-auto flex items-center gap-1.5 text-[11.5px]
                             text-white/18 cursor-not-allowed select-none">
              Live Demo
              <FiExternalLink size={11} />
            </span>
          )}
        </div>

      </div>
    </motion.div>
  )
}

export default ProjectCard
