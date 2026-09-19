// Footer Component
// Bottom of the page — logo, nav links, social icons, copyright, back-to-top button.
// Full dark / light theme support.

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import personalInfo from '../../data/personalInfo'

const NAV_LINKS = [
  { label: 'Home',       id: 'hero'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const Footer = () => {
  const { name, email, social } = personalInfo
  const year = new Date().getFullYear()

  return (
    <footer className="relative dark:bg-darkCard bg-white
                       dark:border-t dark:border-white/5 border-t border-primary/10">

      {/* ── Top divider glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2
                   w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left w-fit font-bold text-lg dark:text-white text-lightText
                         hover:text-primary transition-colors duration-200"
              aria-label="Scroll to top"
            >
              Atharva <span className="text-primary">Kulkarni</span>
            </button>
            <p className="text-xs dark:text-textLight text-[#4B5563] leading-relaxed max-w-xs">
              Full-stack developer. I write clean code, ship real products, and pick things up fast.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             dark:border-white/10 border-primary/15 border
                             dark:text-textLight text-[#4B5563]
                             hover:text-primary hover:border-primary/50
                             dark:hover:bg-primary/10 hover:bg-primary/5
                             transition-all duration-200"
                >
                  <FiGithub size={15} />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             dark:border-white/10 border-primary/15 border
                             dark:text-textLight text-[#4B5563]
                             hover:text-primary hover:border-primary/50
                             dark:hover:bg-primary/10 hover:bg-primary/5
                             transition-all duration-200"
                >
                  <FiLinkedin size={15} />
                </a>
              )}
              {social.leetcode && (
                <a
                  href={social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             dark:border-white/10 border-primary/15 border
                             dark:text-textLight text-[#4B5563]
                             hover:text-primary hover:border-primary/50
                             dark:hover:bg-primary/10 hover:bg-primary/5
                             transition-all duration-200"
                >
                  <SiLeetcode size={15} />
                </a>
              )}
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full flex items-center justify-center
                           dark:border-white/10 border-primary/15 border
                           dark:text-textLight text-[#4B5563]
                           hover:text-primary hover:border-primary/50
                           dark:hover:bg-primary/10 hover:bg-primary/5
                           transition-all duration-200"
              >
                <FiMail size={15} />
              </a>
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold dark:text-white text-lightText tracking-widest uppercase">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-xs dark:text-textLight text-[#4B5563]
                               hover:text-primary transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Availability card ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold dark:text-white text-lightText tracking-widest uppercase">
              Status
            </p>
            <div className="p-4 rounded-2xl
                            dark:bg-dark bg-[#F1F0FF]
                            border dark:border-white/5 border-primary/15
                            flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold dark:text-white text-lightText">
                  Open to opportunities
                </span>
              </div>
              <p className="text-xs dark:text-textLight text-[#4B5563] leading-relaxed">
                Graduated B.Tech 2026. Looking for full-stack or frontend roles. Fast learner, ships clean code.
              </p>
              <button
                onClick={() => scrollTo('contact')}
                className="mt-1 text-xs font-semibold text-primary hover:text-primary/80
                           transition-colors duration-200 text-left"
              >
                Let's talk →
              </button>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                        pt-6 border-t dark:border-white/5 border-primary/10">
          <p className="text-xs dark:text-textLight/60 text-lightMuted text-center sm:text-left">
            © {year} {name}. Built with React & Tailwind CSS.
          </p>

          {/* Back to top */}
          <button
            onClick={() => scrollTo('hero')}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs
                       dark:text-textLight text-[#4B5563]
                       hover:text-primary transition-colors duration-200"
          >
            Back to top
            <span className="w-7 h-7 rounded-full flex items-center justify-center
                             dark:border-white/10 border-primary/15 border
                             group-hover:border-primary/50 group-hover:bg-primary/10
                             transition-all duration-200">
              <FiArrowUp size={13} />
            </span>
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer
