import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useIsMobile } from '../hooks/useIsMobile'

const traits = [
  { icon: '⚡', label: 'Performance', desc: 'Building systems that scale to millions' },
  { icon: '🧠', label: 'AI Integration', desc: 'Embedding intelligence into every layer' },
  { icon: '🔒', label: 'Security-First', desc: 'Clean architecture with zero shortcuts' },
  { icon: '🎯', label: 'Product Focus', desc: 'Engineering with business outcomes in mind' },
]

function CountUp({ to, duration = 2000 }: { to: number; duration?: number }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered || !spanRef.current) return
    const el = spanRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * to).toString()
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, to, duration])

  return <span ref={spanRef}>0</span>
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60])

  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLDivElement>()

  return (
    <section id="about" className="section" ref={containerRef}>
      <div className="container">
        <div ref={sectionRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 13,
                color: '#6366f1',
                marginBottom: 16,
                letterSpacing: '0.1em',
              }}>01 / ABOUT</p>

              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
                Engineering systems that{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>think and scale</span>
              </h2>

              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(148,163,184,0.8)', marginBottom: 20 }}>
                I'm a Full Stack Software Engineer at <strong style={{ color: '#e2e8f0' }}>Siemens</strong> with 2+ years building
                Java Spring Boot backends, React + TypeScript frontends, and GenAI-powered systems.
                I've shipped REST APIs adopted by 3+ engineering teams, LLM agentic workflows via
                Semantic Kernel & MCP, and YOLOv8 computer vision pipelines for factory safety monitoring.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(148,163,184,0.8)', marginBottom: 40 }}>
                I care deeply about the full picture — clean service architecture, LLM guardrail safety,
                MLOps lifecycle, and frontend performance. B.Tech in CS (Big Data Analytics) from SRM
                with a 8.8 GPA; 3rd place at CINTELS Next Gen AI Ideathon (200+ participants).
              </p>

              <div style={{ display: 'flex', gap: 32 }}>
                {[
                  { label: 'Years Experience', suffix: '+', value: 2 },
                  { label: 'Technologies', suffix: '+', value: 20 },
                  { label: 'Coffee/Day', suffix: '☕', value: 4 },
                ].map(({ label, suffix, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#6366f1' }}>
                      <CountUp to={value} />{suffix}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — trait cards */}
          <motion.div style={{ y }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {traits.map(({ icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                  style={{
                    padding: 24,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    transition: 'border-color 0.2s, transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#e2e8f0' }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)', lineHeight: 1.5 }}>{desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                marginTop: 16,
                padding: '20px 24px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              {[
                { prompt: '~', cmd: 'whoami', result: 'mahesh-madey @ siemens' },
                { prompt: '~', cmd: 'cat stack.txt', result: 'java · spring · react · python · genai' },
                { prompt: '~', cmd: 'cat location.txt', result: 'bengaluru, india 🇮🇳' },
                { prompt: '~', cmd: 'echo $STATUS', result: 'open to opportunities 🟢' },
              ].map(({ prompt, cmd, result }, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>
                    <span style={{ color: '#10b981' }}>{prompt}</span>
                    <span style={{ color: 'rgba(148,163,184,0.3)' }}> $ </span>
                    <span style={{ color: '#e2e8f0' }}>{cmd}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6366f1', paddingLeft: 16 }}>{result}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
