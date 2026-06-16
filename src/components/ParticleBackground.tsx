import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { mouse } = useThree()

  const COUNT = 180

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      vel[i * 3] = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004
    }
    return { positions: pos, velocities: vel }
  }, [])

  const linePositions = useMemo(() => new Float32Array(COUNT * COUNT * 6), [])
  const lineColors = useMemo(() => new Float32Array(COUNT * COUNT * 6), [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    return g
  }, [linePositions, lineColors])

  useFrame(() => {
    const pos = positions
    const vel = velocities

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2]

      if (Math.abs(pos[i * 3]) > 10) vel[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 6) vel[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 4) vel[i * 3 + 2] *= -1

      // subtle mouse influence
      const dx = mouse.x * 8 - pos[i * 3]
      const dy = mouse.y * 5 - pos[i * 3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3) {
        vel[i * 3] += dx * 0.00004
        vel[i * 3 + 1] += dy * 0.00004
      }
    }

    if (pointsRef.current) {
      ;(pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }

    // Build connection lines
    let lineIdx = 0
    const maxDist = 3.5
    const lp = linePositions
    const lc = lineColors

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (d < maxDist && lineIdx < linePositions.length - 6) {
          const alpha = 1 - d / maxDist
          lp[lineIdx] = pos[i * 3]
          lp[lineIdx + 1] = pos[i * 3 + 1]
          lp[lineIdx + 2] = pos[i * 3 + 2]
          lp[lineIdx + 3] = pos[j * 3]
          lp[lineIdx + 4] = pos[j * 3 + 1]
          lp[lineIdx + 5] = pos[j * 3 + 2]
          // indigo tint
          lc[lineIdx] = 0.39 * alpha
          lc[lineIdx + 1] = 0.4 * alpha
          lc[lineIdx + 2] = 0.95 * alpha
          lc[lineIdx + 3] = 0.39 * alpha
          lc[lineIdx + 4] = 0.4 * alpha
          lc[lineIdx + 5] = 0.95 * alpha
          lineIdx += 6
        }
      }
    }

    // zero out unused
    for (let k = lineIdx; k < linePositions.length; k++) {
      lp[k] = 0
      lc[k] = 0
    }

    if (linesRef.current) {
      ;(linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
      ;(linesRef.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true
    }
  })

  return (
    <>
      <points ref={pointsRef} geometry={geo}>
        <pointsMaterial
          color="#6366f1"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.35} />
      </lineSegments>
    </>
  )
}

export default function ParticleBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
