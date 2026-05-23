import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/Ranit2004a' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ranitmmondal/' },
  { icon: FaInstagram, href: 'https://www.instagram.com/____r_a_n_i_t_____/' },
  { icon: Mail, href: 'mailto:ranitmondal197@gmail.com' }
]

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' })
    setStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields.')
      setStatus('error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/ranitmondal197@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New Portfolio Message from ${formData.name.trim()}`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.')
      }

      const result = await response.json()

      if (result.success === 'true' || result.success === true) {
        setStatus('success')
      } else {
        throw new Error(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error: any) {
      console.error('Submission error:', error)
      setErrorMessage(error.message || 'Failed to send message. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-primary"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Ready to Work?</h2>
            <div className="h-[1px] w-12 bg-primary"></div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
          >
            Let's create something<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              extraordinary.
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-16 max-w-2xl"
          >
            ranitmondal197@gmail.com
          </motion.p>

          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative min-h-[400px] flex items-center justify-center">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-[1.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full flex flex-col items-center text-center py-6"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Message Sent!</h4>
                  <p className="text-muted-foreground mb-8 max-w-md text-base leading-relaxed">
                    Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. Your message has been sent successfully. I'll get back to you soon!
                  </p>
                  <MagneticButton>
                    <button
                      onClick={handleReset}
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full overflow-hidden transition-transform border border-border hover:bg-secondary/80"
                    >
                      <span className="relative z-10">Send Another Message</span>
                    </button>
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative w-full flex flex-col gap-6"
                >
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-destructive/15 border border-destructive/30 rounded-2xl text-destructive text-sm font-medium"
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground disabled:opacity-50"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground disabled:opacity-50"
                        placeholder="hello@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left mt-4">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      rows={4}
                      className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground resize-none disabled:opacity-50"
                      placeholder="Tell me about your vision..."
                      required
                    ></textarea>
                  </div>

                  <MagneticButton className="mt-8 self-center">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden transition-transform disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === 'submitting' ? (
                          <>
                            Sending...
                            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </>
                        ) : (
                          <>
                            Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center mt-24 gap-8"
          >
            <div className="flex gap-6">
              {socialLinks.map((link, i) => (
                <MagneticButton key={i}>
                  <a
                    href={link.href}
                    target={link.href !== '#' && !link.href.startsWith('mailto:') ? "_blank" : undefined}
                    rel={link.href !== '#' && !link.href.startsWith('mailto:') ? "noreferrer" : undefined}
                    className="p-4 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                </MagneticButton>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Ranit Mondal. {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MagneticButton({ children, className = "" }: { children: React.ReactElement, className?: string }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = buttonRef.current!.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
