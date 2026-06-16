import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const TERMINAL_LINES = [
  { delay: 0, text: '$ ssh mahesh@siemens-portfolio --connect', color: 'rgba(148,163,184,0.5)' },
  { delay: 400, text: '> loading mahesh.config...', color: '#6366f1' },
  { delay: 800, text: '✓ role: Full Stack & GenAI Engineer @ Siemens', color: '#10b981' },
  { delay: 1100, text: '✓ location: Bengaluru, India 🇮🇳', color: '#10b981' },
  { delay: 1400, text: '✓ available for: Full-time | Senior Roles | Consulting', color: '#10b981' },
  { delay: 1700, text: '✓ open to: Remote | Hybrid | Relocate', color: '#10b981' },
  { delay: 2100, text: '$ ready_to_connect = true', color: '#06b6d4' },
]

function TerminalLines({ visible }: { visible: boolean }) {
  const [shown, setShown] = useState<number[]>([])

  useEffect(() => {
    if (!visible) return
    TERMINAL_LINES.forEach(({ delay }, i) => {
      setTimeout(() => setShown(prev => [...prev, i]), delay)
    })
  }, [visible])

  return (
    <div style={{
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      padding: 28,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 13,
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(148,163,184,0.3)' }}>
          mahesh@portfolio ~ %
        </span>
      </div>

      {TERMINAL_LINES.map(({ text, color }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={shown.includes(i) ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          style={{ color, marginBottom: 8, lineHeight: 1.6 }}
        >
          {text}
        </motion.div>
      ))}

      {shown.length === TERMINAL_LINES.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}
        >
          <span style={{ color: '#10b981' }}>$</span>
          <span style={{ color: 'rgba(148,163,184,0.4)' }}>_</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ width: 8, height: 16, background: '#6366f1', display: 'inline-block' }}
          />
        </motion.div>
      )}
    </div>
  )
}

const links = [
  { icon: '📧', label: 'Email', value: 'maheshmadey24@gmail.com', href: 'mailto:maheshmadey24@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/maheshmadey', href: 'https://linkedin.com/in/maheshmadey' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/maheshmadey', href: 'https://github.com/maheshmadey' },
  { icon: '📍', label: 'Location', value: 'Bengaluru, India', href: '#' },
]

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formState
    window.location.href = `mailto:maheshmadey24@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13, color: '#6366f1', marginBottom: 16, letterSpacing: '0.1em',
            }}>05 / CONTACT</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Let's build something{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>remarkable</span>
            </h2>
            <p style={{ color: 'rgba(148,163,184,0.6)', maxWidth: 480, margin: '0 auto', fontSize: 15 }}>
              Open to senior engineering roles, consulting engagements, and ambitious projects.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            {/* Left — terminal + links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <TerminalLines visible={isVisible} />

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 20px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 12,
                      transition: 'border-color 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 14, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {submitted ? (
                <div style={{
                  padding: 48,
                  background: 'rgba(16,185,129,0.06)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: 20,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>
                    Message sent!
                  </h3>
                  <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: 15 }}>
                    Your email client should have opened. I'll reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    padding: 32,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  {[
                    { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label style={{
                        display: 'block', fontSize: 12, fontWeight: 600,
                        color: 'rgba(148,163,184,0.6)', marginBottom: 8, letterSpacing: '0.05em',
                      }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={formState[key as 'name' | 'email']}
                        onChange={e => setFormState(prev => ({ ...prev, [key]: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 10,
                          color: '#e2e8f0',
                          fontSize: 14,
                          fontFamily: 'Inter, sans-serif',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#6366f1')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{
                      display: 'block', fontSize: 12, fontWeight: 600,
                      color: 'rgba(148,163,184,0.6)', marginBottom: 8, letterSpacing: '0.05em',
                    }}>Message</label>
                    <textarea
                      placeholder="Tell me about your project or opportunity..."
                      value={formState.message}
                      onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: '#e2e8f0',
                        fontSize: 14,
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#6366f1')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: '14px 32px',
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      border: 'none',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 0 24px rgba(99,102,241,0.3)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(99,102,241,0.4)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(99,102,241,0.3)'
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              marginTop: 80,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center',
              color: 'rgba(148,163,184,0.3)',
              fontSize: 13,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            Built with React + Three.js + Framer Motion · Designed & engineered by Mahesh Madey © 2024
          </motion.div>
        </div>
      </div>
    </section>
  )
}
