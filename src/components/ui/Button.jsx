// Button Component
// Reusable button with variants — 'primary' (filled purple) and 'outline' (bordered).
// Renders as <a> when href is provided, otherwise as <button>.
// Fully supports dark / light theme.
//
// Props:
//   label      — button text
//   onClick    — click handler (button only)
//   variant    — 'primary' | 'outline'
//   href       — renders as <a> if provided
//   ...rest    — any extra props (target, rel, aria-*, etc.) passed through

const Button = ({ label = 'Click Me', onClick, variant = 'primary', href, ...rest }) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]',
    outline:
      'border-2 border-primary text-primary dark:hover:bg-primary/10 hover:bg-primary/10 active:scale-[0.97]',
  }

  const className = `${base} ${variants[variant]}`

  if (href) {
    return (
      <a href={href} className={className} {...rest}>
        {label}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={className} {...rest}>
      {label}
    </button>
  )
}

export default Button
