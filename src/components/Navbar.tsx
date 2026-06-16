import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = ['About', 'Experience', 'Stack', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
          zIndex: 10000,
          width: progressWidth,
          transformOrigin: '0%',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '8px 20px',
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
          borderRadius: 50,
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ marginRight: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
            color: '#fff',
          }}>M</div>
        </a>

        {links.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 500,
              color: activeSection === link.toLowerCase() ? '#6366f1' : 'rgba(226,232,240,0.6)',
              background: activeSection === link.toLowerCase() ? 'rgba(99,102,241,0.1)' : 'transparent',
              borderRadius: 20,
              transition: 'color 0.2s, background 0.2s',
              letterSpacing: '0.01em',
            }}
          >
            {link}
          </a>
        ))}

        <a
          href="/Mahesh_Madey_Resume.pdf"
          download
          style={{
            marginLeft: 4,
            padding: '7px 16px',
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(226,232,240,0.7)',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            transition: 'color 0.2s, border-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
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
        <a
          href="mailto:maheshmadey24@gmail.com"
          style={{
            marginLeft: 4,
            padding: '7px 18px',
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            borderRadius: 20,
            transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: '0 0 20px rgba(99,102,241,0.3)',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Hire Me
        </a>
      </motion.nav>
    </>
  )
}
