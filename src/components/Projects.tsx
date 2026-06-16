import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useIsMobile } from '../hooks/useIsMobile'

const projects = [
  {
    title: 'Smart Financial Planner & Investment Platform',
    description:
      'Spring Boot 3 / Java 21 backend with Spring Security, Spring Data JPA, and Hibernate ingests bank statements, categorises transactions, and computes financial health scores. Kafka-driven async pipelines with Redis caching cut p95 latency under load. Gemini API powers an AI financial assistant surfaced through a React + TypeScript dashboard.',
    tags: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'Kafka', 'React', 'TypeScript', 'Gemini API'],
    accent: '#6366f1',
    icon: '💰',
    metrics: ['Kafka event pipelines', 'p95 latency cut', 'AI investment engine'],
    featured: true,
  },
  {
    title: 'Multi-Document AI Assistant',
    description:
      'Node.js/Express APIs for document ingestion with a full RAG pipeline — Gemini LLM, HuggingFace embeddings, and FAISS vector search. Delivers sub-second queries over a 1,000+ document corpus with SSE streaming for 50+ concurrent users.',
    tags: ['Node.js', 'RAG', 'PostgreSQL', 'FAISS', 'Gemini LLM', 'HuggingFace', 'SSE'],
    accent: '#8b5cf6',
    icon: '📚',
    metrics: ['1,000+ docs indexed', 'Sub-second retrieval', '50+ concurrent users'],
    featured: true,
  },
  {
    title: 'GenAI Agentic Workflows @ Siemens',
    description:
      'Implemented LLM agentic workflows using Semantic Kernel and MCP (Model Context Protocol), enabling LLM-to-backend context exchange deployed via CI/CD on Azure. Added full LLM guardrail pipelines — input validation, response filtering, output schema enforcement — eliminating prompt-injection vectors.',
    tags: ['Semantic Kernel', 'MCP', 'Azure', 'LLM Guardrails', 'CI/CD', 'Spring Boot'],
    accent: '#06b6d4',
    icon: '🤖',
    metrics: ['Prompt-injection eliminated', 'Azure CI/CD', '3+ teams adopted'],
    featured: false,
  },
  {
    title: 'YOLOv8 Factory Safety CV Pipeline',
    description:
      'Computer vision pipelines for real-time factory safety monitoring via NVIDIA DeepStream, reaching ~90% detection accuracy across 5+ live camera feeds. Containerised inference services with Docker and connected ML outputs to backend REST APIs, cutting end-to-end integration time by ~40%.',
    tags: ['YOLOv8', 'NVIDIA DeepStream', 'Docker', 'Python', 'REST APIs', 'MLOps'],
    accent: '#10b981',
    icon: '👁️',
    metrics: ['~90% accuracy', '5+ live feeds', '~40% faster integration'],
    featured: false,
  },
  {
    title: 'Spring Boot REST API Platform @ Siemens',
    description:
      'Developed production REST APIs with Java Spring Boot — layered service architecture, Spring Data JPA, Hibernate ORM — adopted by 3+ engineering teams and integrated into the company-wide platform release pipeline. React + TypeScript UI contributions reduced client-side error rates by ~30%.',
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'React', 'TypeScript'],
    accent: '#f59e0b',
    icon: '⚡',
    metrics: ['3+ teams adopted', '~30% error rate drop', 'Platform release pipeline'],
    featured: false,
  },
  {
    title: 'AI Dataset Pipeline & Fine-tuning @ Aity',
    description:
      'Built Python pipelines for AI dataset generation and model fine-tuning, cutting manual processing time by ~35%. Implemented agentic workflows with LangChain and CrewAI and containerised all environments in Docker, reducing setup errors to zero across the team.',
    tags: ['Python', 'LangChain', 'CrewAI', 'Docker', 'Fine-tuning', 'MLOps'],
    accent: '#ec4899',
    icon: '🔬',
    metrics: ['~35% time saved', 'Zero setup errors', 'LangChain + CrewAI'],
    featured: false,
  },
]

function TiltCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`)
    setGlowPos({ x: `${(x / rect.width) * 100}%`, y: `${(y / rect.height) * 100}%` })
  }

  const onLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        padding: 28,
        background: 'rgba(15,15,26,0.8)',
        border: `1px solid ${hovered ? project.accent + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20,
        transition: 'transform 0.15s ease, border-color 0.3s',
        transform,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        cursor: 'default',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Moving glow */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x} ${glowPos.y}, ${project.accent}18 0%, transparent 60%)`,
            pointerEvents: 'none',
            transition: 'background 0.05s',
          }}
        />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ fontSize: 32 }}>{project.icon}</div>
        {project.featured && (
          <span style={{
            padding: '3px 10px',
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}40`,
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            color: project.accent,
            fontFamily: 'JetBrains Mono, monospace',
          }}>FEATURED</span>
        )}
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#e2e8f0' }}>{project.title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(148,163,184,0.7)', marginBottom: 20, flex: 1 }}>
        {project.description}
      </p>

      {/* Metrics */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {project.metrics.map(m => (
          <span key={m} style={{
            padding: '4px 10px',
            background: `${project.accent}10`,
            border: `1px solid ${project.accent}25`,
            borderRadius: 6,
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            color: project.accent,
          }}>{m}</span>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 6,
            fontSize: 11,
            color: 'rgba(148,163,184,0.6)',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  const isMobile = useIsMobile()

  return (
    <section id="projects" className="section">
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
            }}>04 / PROJECTS</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Things I've{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>built</span>
            </h2>
            <p style={{ color: 'rgba(148,163,184,0.6)', maxWidth: 480, margin: '0 auto', fontSize: 15 }}>
              Production-grade systems across the full stack — backend, frontend, and AI/ML.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ display: 'flex', height: '100%' }}
              >
                <TiltCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
