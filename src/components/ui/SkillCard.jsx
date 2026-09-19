// SkillCard Component
// Displays a single skill with a colored icon, name, and hover lift effect.
// Props: skill { name, icon (React element), color }
// Used in: Skills section

const SkillCard = ({ skill }) => {
  const { name, icon, color = '#6C63FF' } = skill

  return (
    <div
      className="flex flex-col items-center gap-3 p-5
                 dark:bg-darkCard bg-white rounded-2xl
                 border dark:border-white/5 border-primary/10
                 shadow-sm shadow-primary/5
                 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-md hover:shadow-primary/10
                 transition-all duration-300 cursor-default group"
    >
      {/* Icon wrapper with subtle glow on hover */}
      <div
        className="text-[2.2rem] leading-none transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        {icon}
      </div>
      <span className="text-xs font-semibold dark:text-textLight text-[#4B5563] text-center leading-tight">
        {name}
      </span>
    </div>
  )
}

export default SkillCard
