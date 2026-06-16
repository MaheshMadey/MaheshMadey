import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useIsMobile } from '../hooks/useIsMobile'

const companies = [
  {
    company: 'Siemens Technology and Services',
    location: 'Bengaluru, India',
    accent: '#6366f1',
    totalPeriod: 'Aug 2024 – Present',
    roles: [
      {
        role: 'Software Engineer — Full Stack & GenAI',
        period: 'Aug 2025 – Present',
        type: 'Full-time',
        accent: '#6366f1',
        highlights: [
          'Developed REST APIs with Java Spring Boot — layered service architecture, Spring Data JPA, and Hibernate ORM — adopted by 3+ engineering teams and integrated into the company-wide platform release pipeline.',
          'Contributed React + TypeScript UI components with retry logic and error-state handling, reducing client-side error rates by ~30% across three product surfaces.',
          'Implemented GenAI agentic workflows using Semantic Kernel and MCP (Model Context Protocol), enabling LLM-to-backend context exchange deployed via CI/CD on Azure.',
          'Added LLM guardrail pipelines — input validation, response filtering, output schema enforcement — eliminating prompt-injection vectors across all AI endpoints.',
          'Documented GenAI system runbooks across Agile sprints, cutting new-engineer ramp-up time by ~20%.',
        ],
        stack: ['Java', 'Spring Boot 3', 'React', 'TypeScript', 'Semantic Kernel', 'MCP', 'Azure', 'CI/CD'],
      },
      {
        role: 'Graduate Engineer Trainee — MLOps & Backend Integration',
        period: 'Aug 2024 – Jul 2025',
        type: 'Full-time',
        accent: '#06b6d4',
        highlights: [
          'Developed YOLOv8 CV pipelines for factory safety monitoring via NVIDIA DeepStream, reaching ~90% detection accuracy across 5+ live camera feeds.',
          'Containerised inference services with Docker; connected ML outputs to backend REST APIs, shrinking end-to-end integration time by ~40%.',
          'Supported the MLOps lifecycle — data preparation, fine-tuning, validation, and benchmarking — across three model iterations in a distributed Agile squad.',
        ],
        stack: ['Python', 'YOLOv8', 'NVIDIA DeepStream', 'Docker', 'REST APIs', 'MLOps'],
      },
    ],
  },
  {
    company: 'Aity, Inc',
    location: 'USA (Remote)',
    accent: '#8b5cf6',
    totalPeriod: 'Apr 2024 – Jun 2024',
    roles: [
      {
        role: 'Software Development Intern — AI Automation',
        period: 'Apr 2024 – Jun 2024',
        type: 'Internship',
        accent: '#8b5cf6',
        highlights: [
          'Built Python pipelines for AI dataset generation and model fine-tuning, cutting manual processing time by ~35%.',
          'Implemented agentic workflows with LangChain and CrewAI, automating multi-step AI tasks end-to-end.',
          'Containerised all environments in Docker, reducing setup errors to zero across the engineering team.',
        ],
        stack: ['Python', 'LangChain', 'CrewAI', 'Docker', 'Fine-tuning'],
      },
    ],
  },
]

export default function Experience() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  const isMobile = useIsMobile()

  return (
    <section id="experience" className="section">
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
            }}>02 / EXPERIENCE</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Where I've made an{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>impact</span>
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Vertical timeline line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isVisible ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              style={{
                position: 'absolute',
                left: isMobile ? 8 : 20,
                top: 8,
                width: 1,
                background: 'linear-gradient(to bottom, #6366f1, #06b6d4, #8b5cf6)',
                transformOrigin: 'top',
              }}
            />

            <div style={{ paddingLeft: isMobile ? 36 : 60 }}>
              {companies.map((co, ci) => (
                <motion.div
                  key={co.company}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: ci * 0.2 + 0.3 }}
                  style={{ marginBottom: 56, position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: isMobile ? -28 : -48,
                    top: 18,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: co.accent,
                    boxShadow: `0 0 16px ${co.accent}80`,
                    border: '3px solid var(--bg-primary)',
                  }} />

                  <div
                    style={{
                      padding: isMobile ? 20 : 32,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 20,
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${co.accent}30`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                  >
                    {/* Company header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 28,
                      paddingBottom: 20,
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${co.accent}18`,
                        border: `1px solid ${co.accent}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        flexShrink: 0,
                      }}>
                        {co.company === 'Siemens Technology and Services' ? '⚡' : '🤖'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17, fontWeight: 700, color: co.accent }}>{co.company}</div>
                        <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.45)', marginTop: 2 }}>
                          {co.location} · {co.totalPeriod}
                        </div>
                      </div>
                      {co.roles.length > 1 && (
                        <span style={{
                          padding: '3px 10px',
                          background: `${co.accent}12`,
                          border: `1px solid ${co.accent}25`,
                          borderRadius: 20,
                          fontSize: 11,
                          color: co.accent,
                          fontFamily: 'JetBrains Mono, monospace',
                          whiteSpace: 'nowrap',
                        }}>{co.roles.length} roles</span>
                      )}
                    </div>

                    {/* Roles */}
                    {co.roles.map((exp, ri) => (
                      <div key={exp.role}>
                        {ri > 0 && (
                          <div style={{
                            height: 1,
                            background: 'rgba(255,255,255,0.05)',
                            margin: '24px 0',
                          }} />
                        )}

                        {/* Role header */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: 10,
                          marginBottom: 16,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {co.roles.length > 1 && (
                              <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: exp.accent,
                                boxShadow: `0 0 8px ${exp.accent}80`,
                                flexShrink: 0,
                              }} />
                            )}
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{exp.role}</h3>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: 12,
                              color: 'rgba(148,163,184,0.5)',
                            }}>{exp.period}</span>
                            <span style={{
                              padding: '3px 10px',
                              background: `${exp.accent}15`,
                              border: `1px solid ${exp.accent}30`,
                              borderRadius: 20,
                              fontSize: 11,
                              color: exp.accent,
                            }}>{exp.type}</span>
                          </div>
                        </div>

                        <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                          {exp.highlights.map((h, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isVisible ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.4, delay: ci * 0.2 + ri * 0.1 + j * 0.06 + 0.5 }}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                marginBottom: 10,
                                fontSize: 13.5,
                                color: 'rgba(148,163,184,0.75)',
                                lineHeight: 1.6,
                              }}
                            >
                              <span style={{ color: exp.accent, marginTop: 4, flexShrink: 0 }}>▸</span>
                              {h}
                            </motion.li>
                          ))}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {exp.stack.map(s => (
                            <span key={s} style={{
                              padding: '4px 12px',
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: 6,
                              fontSize: 11,
                              fontFamily: 'JetBrains Mono, monospace',
                              color: 'rgba(148,163,184,0.6)',
                            }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
