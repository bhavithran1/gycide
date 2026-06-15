import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, FlaskConical } from 'lucide-react'

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'Evidence', href: '#research' },
  { label: 'Binding Lab', href: '#ai-lab' },
  { label: 'Team', href: '#team' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="brand" href="#hero" aria-label="Gycide home">
          <span className="brand-mark">
            <FlaskConical size={18} strokeWidth={2.4} />
          </span>
          <span>gycide</span>
        </a>

        <div className="nav-links">
          {links.map(link => (
            <a className="nav-link" key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
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
          {links.map(link => (
            <a
              className="nav-link"
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button type="button" className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
        </div>
      )}
    </nav>
  )
}
