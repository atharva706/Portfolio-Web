// helpers.js
// Pure utility functions — no React dependency.
// Import only what you need to keep bundles lean.

// Truncate long text with an ellipsis
// truncateText('Hello World', 5) → 'Hello...'
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

// Filter projects by featured flag
// Usage: getFeaturedProjects(projects) → [...]
export const getFeaturedProjects = (projects = []) => {
  return projects.filter((p) => p.featured)
}

// Validate contact form fields — returns an errors object
// Usage: const errors = validateContactForm({ name, email, message })
export const validateContactForm = ({ name, email, message }) => {
  const errors = {}
  if (!name || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.'
  if (!message || message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.'
  return errors
}
