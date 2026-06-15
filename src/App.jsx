import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Research from './components/Research'
import MoleculeVisualizer from './components/MoleculeVisualizer'
import About from './components/About'
import Footer from './components/Footer'

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

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <div className="divider" />
        <Problem />
        <div className="divider" />
        <Research />
        <div className="divider" />
        <MoleculeVisualizer />
        <div className="divider" />
        <About />
      </main>
      <Footer />
    </>
  )
}
