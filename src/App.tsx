import { Suspense, lazy } from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

const ParticleBackground = lazy(() => import('./components/ParticleBackground'))

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />

      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <TechStack />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}
