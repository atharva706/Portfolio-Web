// sendEmail.js
// Sends contact form emails via EmailJS — no backend needed.
// Template variables used:
//   {{from_name}}  — sender's name
//   {{from_email}} — sender's email
//   {{message}}    — the message
//
// .env keys required:
//   VITE_EMAILJS_SERVICE_ID
//   VITE_EMAILJS_TEMPLATE_ID
//   VITE_EMAILJS_PUBLIC_KEY

import emailjs from '@emailjs/browser'

export const sendEmail = async ({ name, email, message }) => {
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const templateParams = {
    from_name:  name,
    from_email: email,
    message,
  }

  const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
  return response
}
