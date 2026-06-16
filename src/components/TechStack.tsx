import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const categories = [
  {
    label: 'Backend',
    color: '#6366f1',
    techs: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot 3', level: 93 },
      { name: 'Spring Security', level: 88 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'REST APIs', level: 95 },
      { name: 'Microservices', level: 87 },
    ],
  },
  {
    label: 'AI & GenAI',
    color: '#8b5cf6',
    techs: [
      { name: 'LLM Guardrails', level: 90 },
      { name: 'RAG Pipelines', level: 88 },
      { name: 'Semantic Kernel', level: 85 },
      { name: 'LangChain / CrewAI', level: 83 },
      { name: 'YOLOv8 / DeepStream', level: 80 },
      { name: 'Gemini / OpenAI API', level: 88 },
    ],
  },
  {
    label: 'Frontend',
    color: '#06b6d4',
    techs: [
      { name: 'React', level: 88 },
      { name: 'TypeScript', level: 86 },
      { name: 'SSE Streaming', level: 82 },
      { name: 'Performance Rendering', level: 80 },
      { name: 'Python', level: 87 },
      { name: 'FastAPI', level: 80 },
    ],
  },
  {
    label: 'Infra & Data',
    color: '#10b981',
    techs: [
      { name: 'PostgreSQL / Redis', level: 88 },
      { name: 'Kafka', level: 83 },
      { name: 'Docker', level: 87 },
      { name: 'Azure / AWS', level: 80 },
      { name: 'FAISS / MongoDB', level: 82 },
      { name: 'CI/CD / Jenkins', level: 78 },
    ],
  },
]

function SkillBar({ name, level, color, animate }: { name: string; level: number; color: string; animate: boolean }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{name}</span>
        <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(148,163,184,0.5)' }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={animate ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            height: '100%',
            borderRadius: 2,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()

  const category = categories[activeTab]

  return (
    <section id="stack" className="section">
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
            }}>03 / TECH STACK</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Tools of the{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>trade</span>
            </h2>
            <p style={{ color: 'rgba(148,163,184,0.6)', maxWidth: 480, margin: '0 auto', fontSize: 15 }}>
              A full arsenal across the stack — from database design to ML deployment.
            </p>
          </motion.div>

          {/* Tab bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}>
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 50,
                  border: '1px solid',
                  borderColor: activeTab === i ? cat.color : 'rgba(255,255,255,0.08)',
                  background: activeTab === i ? `${cat.color}18` : 'transparent',
                  color: activeTab === i ? cat.color : 'rgba(148,163,184,0.6)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 40,
            }}
          >
            <div>
              {category.techs.slice(0, 3).map(({ name, level }) => (
                <SkillBar key={name} name={name} level={level} color={category.color} animate={isVisible} />
              ))}
            </div>
            <div>
              {category.techs.slice(3).map(({ name, level }) => (
                <SkillBar key={name} name={name} level={level} color={category.color} animate={isVisible} />
              ))}
            </div>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: 56,
              padding: 32,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
            }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: 'rgba(148,163,184,0.4)',
              marginBottom: 20, letterSpacing: '0.08em',
            }}>ALSO WORKED WITH</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Hibernate', 'Spring Data JPA', 'JWT', 'OAuth 2.0', 'OIDC', 'MCP', 'HuggingFace',
            'Scikit-learn', 'Pandas', 'NVIDIA DeepStream', 'ELK Stack', 'CloudWatch',
            'Kubernetes', 'Git', 'Jenkins', 'SQL', 'NoSQL', 'Salesforce / Apex'].map(tech => (
                <span
                  key={tech}
                  style={{
                    padding: '5px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20,
                    fontSize: 12,
                    color: 'rgba(148,163,184,0.7)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
