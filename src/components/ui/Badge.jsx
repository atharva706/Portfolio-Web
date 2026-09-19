// Badge Component
// Small pill tag for tech stack labels.
// Props: label (string)
// Used in: ProjectCard

const Badge = ({ label }) => (
  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full
                   bg-primary/10 text-primary border border-primary/20
                   dark:bg-primary/10 dark:border-primary/20">
    {label}
  </span>
)

export default Badge
