// SectionTitle Component
// Consistent section heading with label, title, subtitle, and decorative underline.
// Props: label (string, optional), title (string), subtitle (string, optional)
// Used in: About, Skills, Projects, Experience, Contact

const SectionTitle = ({ label, title, subtitle }) => {
  return (
    <div className="text-center mb-14">
      {label && (
        <span className="inline-block text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="dark:text-textLight text-[#4B5563] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-12 h-1 bg-primary rounded-full" />
    </div>
  )
}

export default SectionTitle
