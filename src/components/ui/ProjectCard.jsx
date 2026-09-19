// ProjectCard Component
// Displays a single project with image/placeholder, description, tech badges, and links.
// Props: project { title, description, image, tags[], liveUrl, githubUrl }
// Full dark / light theme support.

import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi'
import Badge from './Badge'

const ProjectCard = ({ project }) => {
  const { title, description, image, tags = [], liveUrl, githubUrl } = project

  return (
    <div className="group flex flex-col
                    dark:bg-darkCard bg-white rounded-2xl overflow-hidden
                    border dark:border-white/5 border-primary/10
                    shadow-sm shadow-primary/5
                    hover:border-primary/40 hover:-translate-y-1.5
                    hover:shadow-lg hover:shadow-primary/10
                    transition-all duration-300">

      {/* ── Image / Placeholder ── */}
      <div className="relative w-full h-48 dark:bg-primary/5 bg-primary/5 overflow-hidden flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <FiCode className="text-primary" size={26} />
            </div>
            <span className="text-xs dark:text-textLight text-lightMuted font-medium">
              Preview coming soon
            </span>
          </div>
        )}

        {/* Overlay gradient on image hover */}
        {image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Title */}
        <h3 className="font-bold text-base dark:text-white text-lightText leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm dark:text-textLight text-[#4B5563] leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tech badges */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-1 border-t dark:border-white/5 border-primary/10">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="flex items-center gap-1.5 text-xs font-semibold
                         dark:text-textLight text-[#4B5563]
                         hover:text-primary transition-colors duration-200"
            >
              <FiGithub size={14} />
              Code
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs dark:text-textLight/40 text-lightMuted/60 cursor-not-allowed select-none">
              <FiGithub size={14} />
              Code
            </span>
          )}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="flex items-center gap-1.5 text-xs font-semibold
                         text-primary hover:text-primary/80 transition-colors duration-200 ml-auto"
            >
              Live Demo
              <FiExternalLink size={13} />
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs dark:text-textLight/40 text-lightMuted/60 cursor-not-allowed select-none ml-auto">
              Live Demo
              <FiExternalLink size={13} />
            </span>
          )}
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
