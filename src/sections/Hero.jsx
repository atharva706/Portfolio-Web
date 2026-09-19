// Hero Section
// First section visible on load. Contains:
//  - Greeting + name headline
//  - Typing animation cycling through roles
//  - Tagline
//  - CTA buttons (View Projects + Download Resume)
//  - Social links (GitHub, LinkedIn, Email)
//  - Avatar placeholder (initials) — swap src once you have a photo
//  - Floating background blobs for depth
//  - Animated scroll indicator
//  - Full dark / light theme support

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import personalInfo from '../data/personalInfo'
import Button from '../components/ui/Button'
import useTypingEffect from '../hooks/useTypingEffect'

const ROLES = [
  'Full Stack Developer',
  'React Developer',
  'Node.js Engineer',
  'Open Source Enthusiast',
  'Problem Solver',
]

// ── Animation variants ──────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.25 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const avatarVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: 'easeOut', delay: 0.2 },
  },
}

// ── Social link component ────────────────────────────────────────────────────
const SocialLink = ({ href, label, icon: Icon, mail = false }) => (
  <a
    href={mail ? `mailto:${href}` : href}
    target={mail ? undefined : '_blank'}
    rel={mail ? undefined : 'noopener noreferrer'}
    aria-label={label}
    className="group flex items-center justify-center w-10 h-10 rounded-full
               dark:border-white/10 border-black/10 border
               dark:bg-white/5 bg-black/5
               dark:text-textLight text-lightMuted
               dark:hover:border-primary/60 hover:border-primary/60
               dark:hover:bg-primary/10 hover:bg-primary/10
               hover:text-primary
               transition-all duration-300"
  >
    <Icon size={18} />
  </a>
)

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { name, tagline, social, email, avatar } = personalInfo
  const { text: typedRole, isTyping } = useTypingEffect(ROLES)

  // Initials for avatar placeholder
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >

      {/* ── Background blobs ── */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        {/* Primary large glow — top center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[560px] h-[560px] rounded-full
                        bg-primary/20 dark:bg-primary/15
                        blur-[130px]" />
        {/* Secondary — bottom left */}
        <div className="absolute bottom-1/4 -left-20
                        w-[320px] h-[320px] rounded-full
                        bg-purple-400/15 dark:bg-purple-500/10
                        blur-[100px]" />
        {/* Tertiary — top right */}
        <div className="absolute top-10 right-0
                        w-[260px] h-[260px] rounded-full
                        bg-primary/10 dark:bg-primary/8
                        blur-[90px]" />
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-6xl w-full mx-auto
                   flex flex-col-reverse md:flex-row
                   items-center gap-12 md:gap-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        {/* ── Left: text ── */}
        <div className="flex-1 text-center md:text-left">

          {/* Greeting badge */}
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
                             dark:bg-primary/10 bg-primary/10
                             text-primary
                             dark:border-primary/20 border-primary/25 border">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4
                       dark:text-white text-lightText"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{name.split(' ')[0]}</span>
            <br />
            <span className="dark:text-white text-lightText">{name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            variants={item}
            className="flex items-center justify-center md:justify-start
                       gap-2 mb-5 h-9"
          >
            <span className="text-xl sm:text-2xl font-semibold dark:text-textLight text-[#4B5563]">
              {typedRole}
            </span>
            {/* blinking cursor */}
            <span
              className={`inline-block w-[2px] h-6 bg-primary rounded-full transition-opacity duration-100 ${
                isTyping ? 'opacity-100' : 'opacity-0'
              } animate-[blink_1s_step-end_infinite]`}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8
                       dark:text-textLight text-[#4B5563]"
          >
            {tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
          >
            <Button
              label="See My Work"
              onClick={scrollToProjects}
              variant="primary"
            />
            <Button
              label="Grab My Resume"
              href="/Atharva_Kulkarni_Resume.pdf"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            {social.github && (
              <SocialLink href={social.github} label="GitHub" icon={FiGithub} />
            )}
            {social.linkedin && (
              <SocialLink href={social.linkedin} label="LinkedIn" icon={FiLinkedin} />
            )}
            {social.leetcode && (
              <SocialLink href={social.leetcode} label="LeetCode" icon={SiLeetcode} />
            )}
            <SocialLink href={email} label="Email" icon={FiMail} mail />
          </motion.div>
        </div>

        {/* ── Right: avatar ── */}
        <motion.div
          variants={avatarVariant}
          className="flex-shrink-0 relative"
        >
          {/* Outer ring — animated spin */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_18s_linear_infinite]" />
          {/* Glow behind avatar */}
          <div className="absolute inset-4 rounded-full bg-primary/20 blur-2xl" />

          {/* Avatar circle */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full
                          border-2 border-primary/40
                          dark:bg-darkCard bg-white
                          overflow-hidden
                          shadow-2xl shadow-primary/20
                          flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={`${name} profile photo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 select-none">
                <span className="text-5xl lg:text-6xl font-extrabold gradient-text">
                  {initials}
                </span>
                <span className="text-xs dark:text-textLight text-lightMuted tracking-widest uppercase">
                  {name.split(' ')[0]}
                </span>
              </div>
            )}
          </div>

          {/* Floating badge — experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -bottom-3 -right-4
                       dark:bg-darkCard bg-white
                       border dark:border-white/10 border-primary/15
                       rounded-xl px-4 py-2.5
                       shadow-lg shadow-primary/10
                       flex items-center gap-2"
          >
            <span className="text-xl">💻</span>
            <div>
              <p className="text-xs font-bold dark:text-white text-lightText leading-none">
                MERN Stack
              </p>
              <p className="text-[10px] dark:text-textLight text-lightMuted leading-none mt-0.5">
                Full Stack Dev
              </p>
            </div>
          </motion.div>

          {/* Floating badge — location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute -top-3 -left-4
                       dark:bg-darkCard bg-white
                       border dark:border-white/10 border-primary/15
                       rounded-xl px-4 py-2.5
                       shadow-lg shadow-primary/10
                       flex items-center gap-2"
          >
            <span className="text-xl">📍</span>
            <div>
              <p className="text-xs font-bold dark:text-white text-lightText leading-none">
                Pune, India
              </p>
              <p className="text-[10px] dark:text-textLight text-lightMuted leading-none mt-0.5">
                Open to remote
              </p>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2
                   dark:text-textLight text-lightMuted
                   hover:text-primary transition-colors duration-300
                   group cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="group-hover:text-primary text-current"
        >
          <FiArrowDown size={16} strokeWidth={2.5} />
        </motion.div>
      </motion.button>

    </section>
  )
}

export default Hero
