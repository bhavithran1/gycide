import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X, FlaskConical } from 'lucide-react'

const sections = [
  { label: 'Problem', id: 'problem' },
  { label: 'Research', id: 'research-areas' },
  { label: 'Evidence', id: 'research' },
  { label: 'Binding Lab', id: 'ai-lab' },
  { label: 'Team', id: 'team' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="Gycide home">
          <span className="brand-mark">
            <FlaskConical size={18} strokeWidth={2.4} />
          </span>
          <span>gycide</span>
        </Link>

        <div className="nav-links">
          {isHome ? (
            sections.map(s => (
              <button
                type="button"
                className="nav-link"
                key={s.id}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
              </button>
            ))
          ) : (
            <Link className="nav-link" to="/">Home</Link>
          )}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="icon-btn mobile-menu"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container mobile-panel">
          {isHome ? (
            sections.map(s => (
              <button
                type="button"
                className="nav-link"
                key={s.id}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
              </button>
            ))
          ) : (
            <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          )}
          <button type="button" className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
        </div>
      )}
    </nav>
  )
}
