import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useIsMobile } from '../hooks/useIsMobile'

const floatingCode = [
  { text: '@SpringBootApplication', x: '6%', y: '18%', delay: 0 },
  { text: 'semantic_kernel.invoke()', x: '72%', y: '14%', delay: 0.4 },
  { text: 'useEffect(() => {}, [])', x: '78%', y: '68%', delay: 0.8 },
  { text: 'model.fit(X_train, y_train)', x: '4%', y: '72%', delay: 1.2 },
  { text: 'docker compose up -d', x: '58%', y: '84%', delay: 1.6 },
  { text: 'llm.add_guardrail(pipeline)', x: '14%', y: '86%', delay: 2 },
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

  // Subtle animated gradient orb using canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      const t = frame * 0.005

      // Primary orb — indigo
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(t) * 80,
        canvas.height * 0.4 + Math.cos(t * 0.7) * 60,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.45
      )
      g1.addColorStop(0, 'rgba(99,102,241,0.18)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Secondary orb — cyan
      const g2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(t * 0.8) * 100,
        canvas.height * 0.6 + Math.sin(t * 0.6) * 80,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.35
      )
      g2.addColorStop(0, 'rgba(6,182,212,0.12)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Floating code snippets — hidden on mobile */}
      {!isMobile && floatingCode.map(({ text, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: delay + 1.5, duration: 0.6 },
            y: { delay: delay + 1.5, duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(99,102,241,0.45)',
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.12)',
            borderRadius: 6,
            padding: '4px 10px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 20,
            fontSize: 13,
            color: '#6366f1',
            fontFamily: 'JetBrains Mono, monospace',
            marginBottom: 32,
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 6px #10b981',
            animation: 'pulse 2s infinite',
          }} />
          Software Engineer @ Siemens · Open to Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}
        >
          Mahesh
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Madey
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 400,
            color: 'rgba(148,163,184,0.85)',
            marginBottom: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: 'rgba(226,232,240,0.4)' }}>{'>'}</span>
          <TypeAnimation
            sequence={[
              'Full Stack Engineer', 2200,
              'GenAI Systems Builder', 2200,
              'Spring Boot Architect', 2200,
              'LLM Pipeline Engineer', 2200,
              'MLOps Practitioner', 2200,
            ]}
            repeat={Infinity}
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#e2e8f0' }}
          />
          <span style={{ color: '#6366f1', animation: 'blink 1s infinite' }}>_</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            maxWidth: 580,
            margin: '0 auto 48px',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'rgba(148,163,184,0.7)',
          }}
        >
          Full Stack Engineer at <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Siemens</span> — building Java Spring Boot backends,
          React frontends, and GenAI agentic workflows with Semantic Kernel & MCP.
          From LLM guardrail pipelines to YOLOv8 CV systems, I ship end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          <MagneticButton href="#projects" primary>
            View Projects
          </MagneticButton>
          <MagneticButton href="mailto:maheshmadey24@gmail.com">
            Get In Touch
          </MagneticButton>
          <a
            href="/Mahesh_Madey_Resume.pdf"
            download
            style={{
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 50,
              background: 'transparent',
              color: 'rgba(226,232,240,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#e2e8f0'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(226,232,240,0.7)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            ↓ Resume
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, auto)',
            gap: isMobile ? '24px 16px' : '0 48px',
            justifyContent: isMobile ? undefined : 'center',
            marginTop: 64,
            paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { value: '2+', label: 'Years @ Siemens' },
            { value: '8.8', label: 'GPA / 10.0' },
            { value: '90%', label: 'CV Detection Acc.' },
            { value: '∞', label: 'Lines of Code' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 28,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{value}</div>
              <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', letterSpacing: '0.1em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)',
          }}
        />
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

function MagneticButton({
  children,
  href,
  primary,
}: {
  children: React.ReactNode
  href: string
  primary?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0) scale(1)'
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        padding: '14px 32px',
        fontSize: 15,
        fontWeight: 600,
        borderRadius: 50,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        ...(primary
          ? {
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(99,102,241,0.35)',
            }
          : {
              background: 'transparent',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,0.12)',
            }),
      }}
    >
      {children}
    </a>
  )
}
