import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Research from './components/Research'
import ResearchAreas from './components/ResearchAreas'
import MoleculeVisualizer from './components/MoleculeVisualizer'
import About from './components/About'
import Footer from './components/Footer'
import BiofungicideDurian from './pages/BiofungicideDurian'
import AICropDiagnostics from './pages/AICropDiagnostics'
import RNABiopesticide from './pages/RNABiopesticide'

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <div className="divider" />
      <Problem />
      <div className="divider" />
      <ResearchAreas />
      <div className="divider" />
      <Research />
      <div className="divider" />
      <MoleculeVisualizer />
      <div className="divider" />
      <About />
    </main>
  )
}

export default function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      document.documentElement.style.setProperty('--scroll-progress', Math.min(progress, 1).toFixed(4))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research/biofungicide-durian" element={<BiofungicideDurian />} />
        <Route path="/research/ai-crop-diagnostics" element={<AICropDiagnostics />} />
        <Route path="/research/rna-biopesticide" element={<RNABiopesticide />} />
      </Routes>
      <Footer />
    </>
  )
}
