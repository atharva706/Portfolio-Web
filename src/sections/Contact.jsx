// Contact Section
// Left: contact info cards (email, location, social links)
// Right: contact form powered by EmailJS (no backend needed)
// Full dark / light theme support, scroll-triggered animations.
//
// EmailJS setup (one-time):
//   1. Create a free account at https://emailjs.com
//   2. Add a service, email template, and get your keys
//   3. Create .env in project root with:
//      VITE_EMAILJS_SERVICE_ID=your_service_id
//      VITE_EMAILJS_TEMPLATE_ID=your_template_id
//      VITE_EMAILJS_PUBLIC_KEY=your_public_key

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { sendEmail } from '../utils/sendEmail'
import personalInfo from '../data/personalInfo'
import SectionTitle from '../components/ui/SectionTitle'

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const VIEWPORT = { once: true, margin: '-70px' }

// ── Input field component ─────────────────────────────────────────────────────
const Field = ({ label, id, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold dark:text-textLight text-[#4B5563] tracking-wide">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-xs text-red-400 flex items-center gap-1">
        <FiAlertCircle size={11} /> {error}
      </span>
    )}
  </div>
)

const inputClass = `w-full px-4 py-3 rounded-xl text-sm
  dark:bg-dark bg-[#F1F0FF]
  dark:border-white/10 border-primary/15 border
  dark:text-white text-lightText
  dark:placeholder-textLight/40 placeholder-[#9CA3AF]
  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
  transition-all duration-200`

// ── Contact info card ─────────────────────────────────────────────────────────
const InfoCard = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    className={`flex items-center gap-4 p-4 rounded-2xl
                dark:bg-darkCard bg-white
                border dark:border-white/5 border-primary/10
                shadow-sm shadow-primary/5
                hover:border-primary/40 transition-all duration-300 group
                ${href ? 'cursor-pointer' : 'cursor-default'}`}
  >
    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0
                    group-hover:bg-primary/25 transition-colors duration-300">
      <Icon className="text-primary" size={17} />
    </div>
    <div>
      <p className="text-[11px] dark:text-textLight text-lightMuted font-medium">{label}</p>
      <p className="text-sm font-semibold dark:text-white text-lightText leading-snug">{value}</p>
    </div>
  </a>
)

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => {
  const { email, location, social } = personalInfo

  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const formRef = useRef(null)

  // ── Validation ──
  const validate = () => {
    const e = {}
    if (!form.name.trim())                          e.name    = 'Name is required'
    if (!form.email.trim())                         e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim())                       e.message = 'Message is required'
    else if (form.message.trim().length < 10)       e.message = 'Message is too short'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

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
    <section id="contact" className="section-padding relative overflow-hidden">

      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full
                        bg-primary/10 dark:bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full
                        bg-purple-400/10 dark:bg-purple-500/8 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        <SectionTitle
          label="Get In Touch"
          title="Contact Me"
          subtitle="Got a role, a project, or just want to talk tech? My inbox is open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: info ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-4"
          >
            <InfoCard
              icon={FiMail}
              label="Email"
              value={email}
              href={`mailto:${email}`}
            />
            <InfoCard
              icon={FiMapPin}
              label="Location"
              value={location}
            />
            {social.github && (
              <InfoCard
                icon={FiGithub}
                label="GitHub"
                value="github.com/atharva706"
                href={social.github}
              />
            )}
            {social.linkedin && (
              <InfoCard
                icon={FiLinkedin}
                label="LinkedIn"
                value="Atharva Kulkarni"
                href={social.linkedin}
              />
            )}
            {social.leetcode && (
              <InfoCard
                icon={SiLeetcode}
                label="LeetCode"
                value="leetcode.com/u/atharva706"
                href={social.leetcode}
              />
            )}

            {/* Availability note */}
            <div className="mt-2 p-4 rounded-2xl
                            dark:bg-primary/5 bg-primary/5
                            border border-primary/15
                            flex items-start gap-3">
              <span className="text-xl mt-0.5">💬</span>
              <p className="text-xs dark:text-textLight text-[#4B5563] leading-relaxed">
                I reply within <span className="text-primary font-semibold">24 hours</span>.
                Whether it's a full-time role, a freelance gig, or just a conversation — drop me a message.
              </p>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="dark:bg-darkCard bg-white rounded-2xl p-7
                         border dark:border-white/5 border-primary/10
                         shadow-sm shadow-primary/5
                         flex flex-col gap-5"
            >
              <Field label="Your Name" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Atharva Kulkarni"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="name"
                />
              </Field>

              <Field label="Email Address" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full flex items-center justify-center gap-2
                            px-6 py-3 rounded-xl text-sm font-semibold
                            transition-all duration-300 focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                            ${status === 'success'
                              ? 'bg-green-500 text-white cursor-not-allowed'
                              : status === 'error'
                              ? 'bg-red-500 text-white'
                              : 'bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]'
                            }
                            disabled:opacity-80`}
              >
                {status === 'sending' && (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <FiCheck size={16} />
                    Message Sent!
                  </>
                )}
                {status === 'error' && (
                  <>
                    <FiAlertCircle size={16} />
                    Failed — Try Again
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <FiSend size={15} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-[11px] dark:text-textLight/50 text-lightMuted text-center">
                Your message goes directly to my inbox. No spam, ever.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
