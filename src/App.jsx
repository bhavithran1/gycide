import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Research from './components/Research'
import MoleculeVisualizer from './components/MoleculeVisualizer'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
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
