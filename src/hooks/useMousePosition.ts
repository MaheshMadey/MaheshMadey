import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMoving(false), 150)
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      clearTimeout(timeout)
    }
  }, [])

  return { position, isMoving }
}
