import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function CustomCursor() {
  const isMobile = useIsMobile()
  if (isMobile) return null
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    let raf: number
    let mouse = { x: 0, y: 0 }
    let ring = { x: 0, y: 0 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`
      }

      ring.x += (mouse.x - ring.x) * 0.12
      ring.y += (mouse.y - ring.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 20}px, ${ring.y - 20}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => setIsHovering(true)
    const onLeaveLink = () => setIsHovering(false)
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isClicking ? '#06b6d4' : '#6366f1',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'background 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? '#06b6d4' : '#6366f1'}`,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isClicking ? 0.4 : 0.6,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
