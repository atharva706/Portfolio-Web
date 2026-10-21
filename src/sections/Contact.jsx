// Contact — dark editorial, synced with Hero/Navbar
//
// Synced:
//   • hero-grid overlay for visual continuity
//   • Same aurora blobs as all sections
//   • section-label + gradient-shimmer headline
//   • Info cards: border-glow-card + same glass style as Hero identity card
//   • Form card: same glass backdrop as Hero right panel
//   • Inputs: dark glass bg, primary border focus ring
//   • Submit button: Hero primary CTA gradient + btn-shine sweep
//   • Social icon chips: match Hero social icons sizing/hover
//   • Text opacity scale: /85 titles, /35 body, /25 muted

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail, FiMapPin, FiGithub, FiLinkedin,
  FiSend, FiCheck, FiAlertCircle, FiArrowUpRight,
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { sendEmail } from '../utils/sendEmail'
import personalInfo from '../data/personalInfo'

// ─── Reveal wrapper ────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, x = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 36, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-72px' }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// ─── Info card ─────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`border-glow-card group flex items-center gap-4 p-4 rounded-2xl
                  border border-white/[0.07]
                  ${href ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}
    >
      <div
        className="icon-badge w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg,rgba(var(--t-primary-rgb),0.30),var(--t-glow-2))',
          border: '1px solid rgba(var(--t-primary-rgb),0.25)',
        }}
      >
        <Icon size={16} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/28">{label}</p>
        <p className="text-[13px] font-semibold text-white/75 leading-snug mt-0.5 truncate">{value}</p>
      </div>
      {href && (
        <FiArrowUpRight
          size={14}
          className="shrink-0 text-white/20 group-hover:text-primary/60
                     transition-colors duration-200"
        />
      )}
    </motion.a>
  )
}

// ─── Input / Textarea field ────────────────────────────────────────────
function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-400 flex items-center gap-1"
          >
            <FiAlertCircle size={11} /> {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = `w-full px-4 py-3 rounded-xl text-[13px] text-white/80
  border border-white/[0.08] bg-white/[0.04]
  placeholder-white/20
  focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15
  hover:border-white/[0.14]
  transition-all duration-200`

// ─── CONTACT ───────────────────────────────────────────────────────────
export default function Contact() {
  const { email, location, social } = personalInfo

  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message is too short'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    try {
      await sendEmail(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28 px-5 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--t-bg)' }}
    >
      {/* Hero-matched grid */}
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none opacity-50" />

      {/* Aurora blobs */}
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '-5%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-1) 0%,transparent 65%)',
          filter: 'blur(80px)' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ bottom: '0%', right: '-8%', width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-2) 0%,transparent 65%)',
          filter: 'blur(70px)', animationDelay: '4s' }} />
      <div aria-hidden className="section-glow absolute pointer-events-none"
        style={{ top: '45%', left: '42%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle,var(--t-glow-3) 0%,transparent 60%)',
          filter: 'blur(60px)', animationDelay: '8s' }} />

      <div className="max-w-[1360px] mx-auto relative z-10">

        {/* ═══ HEADER ═══ */}
        <Reveal className="text-center mb-16">
          <div className="section-label justify-center mb-5">Get In Touch</div>
          <h2
            className="font-display font-extrabold text-white leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            Let's <span className="gradient-shimmer">Work Together</span>
          </h2>
          <p className="mt-5 text-white/35 max-w-[480px] mx-auto leading-[1.9]"
            style={{ fontSize: '14.5px' }}>
            Got a role, a project, or just want to talk tech? My inbox is open.
          </p>
        </Reveal>

        {/* ═══ GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ════ LEFT — Info cards ════ */}
          <Reveal delay={0.05} x={-30} className="flex flex-col gap-3">

            <InfoCard icon={FiMail}    label="Email"    value={email}            href={`mailto:${email}`} />
            <InfoCard icon={FiMapPin}  label="Location" value={location}         href={null} />
            {social.github   && <InfoCard icon={FiGithub}   label="GitHub"   value="github.com/atharva706"            href={social.github}   />}
            {social.linkedin && <InfoCard icon={FiLinkedin} label="LinkedIn" value="Atharva Kulkarni"                 href={social.linkedin} />}
            {social.leetcode && <InfoCard icon={SiLeetcode} label="LeetCode" value="leetcode.com/u/atharva706"        href={social.leetcode} />}

            {/* Availability note — mirrors About "beyond the code" card */}
            <div
              className="mt-2 rounded-2xl p-5 border border-primary/20"
              style={{ background: 'rgba(var(--t-primary-rgb),0.06)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">💬</span>
                <p className="text-[12.5px] text-white/35 leading-[1.85]">
                  I reply within{' '}
                  <span className="text-primary font-semibold">24 hours</span>.
                  Whether it's a full-time role, a freelance gig, or just a
                  conversation — drop me a message.
                </p>
              </div>
            </div>

          </Reveal>

          {/* ════ RIGHT — Form ════ */}
          <Reveal delay={0.12} x={30}>
            <form
              onSubmit={handleSubmit}
              noValidate
              data-lenis-prevent
              className="border-glow-card rounded-2xl p-7 border border-white/[0.07]
                         flex flex-col gap-5"
              style={{ background: 'var(--t-card)', backdropFilter: 'blur(20px)' }}
            >
              <Field label="Your Name" id="name" error={errors.name}>
                <input
                  id="name" name="name" type="text"
                  placeholder="Atharva Kulkarni"
                  value={form.name} onChange={handleChange}
                  className={inputCls} autoComplete="name"
                />
              </Field>

              <Field label="Email Address" id="email" error={errors.email}>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  className={inputCls} autoComplete="email"
                />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="What's on your mind?"
                  value={form.message} onChange={handleChange}
                  className={`${inputCls} resize-none`}
                  data-lenis-prevent
                />
              </Field>

              {/* Submit — Hero primary CTA style */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.02, y: -1 } : {}}
                whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                className={`btn-shine w-full flex items-center justify-center gap-2
                            px-6 py-3.5 rounded-xl text-[13px] font-semibold text-white
                            transition-all duration-300
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                            disabled:opacity-75 disabled:cursor-not-allowed
                            ${status === 'success' ? 'bg-emerald-500'
                              : status === 'error'   ? 'bg-red-500'
                              : ''}`}
                style={status === 'idle' || status === 'sending' ? {
                  background: 'linear-gradient(135deg,#2563EB,#3B82F6)',
                  boxShadow: '0 0 32px rgba(var(--t-primary-rgb),0.40), 0 4px 20px rgba(var(--t-primary-rgb),0.28)',
                } : {}}
              >
                {status === 'sending' && (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                )}
                {status === 'success' && <><FiCheck size={16} />Message Sent!</>}
                {status === 'error'   && <><FiAlertCircle size={16} />Failed — Try Again</>}
                {status === 'idle'    && (
                  <>
                    <FiSend size={14} />
                    Send Message
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </>
                )}
              </motion.button>

              <p className="text-[11px] text-white/25 text-center">
                Your message goes directly to my inbox. No spam, ever.
              </p>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
