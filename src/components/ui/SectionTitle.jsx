// SectionTitle — dark editorial, synced with Hero/About section headers
//
// Replaces the old light-theme SectionTitle with the Hero/About pattern:
//   • section-label (CSS class from index.css with :: decorators)
//   • gradient-shimmer on title
//   • /35 body copy opacity
//   • Same clamp() font-size range used in Hero/About/Skills/Projects/Experience/Contact
//
// Still accepts: label, title, subtitle — fully backward-compatible.
// Optional: highlightTitle (bool) — applies gradient-shimmer to full title
//           or pass title as JSX to highlight part of it yourself.

import { motion } from 'framer-motion'

const SectionTitle = ({ label, title, subtitle, highlightTitle = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-16"
    >
      {label && (
        <div className="section-label justify-center mb-5">{label}</div>
      )}

      <h2
        className={`font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]
                    ${highlightTitle ? 'gradient-shimmer' : ''}`}
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-5 text-white/35 max-w-[480px] mx-auto leading-[1.9]"
          style={{ fontSize: '14.5px' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
