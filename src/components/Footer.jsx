import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ExternalLink, FlaskConical } from 'lucide-react'

const sections = [
  { label: 'Problem', id: 'problem' },
  { label: 'Research', id: 'research-areas' },
  { label: 'Evidence', id: 'research' },
  { label: 'Binding Lab', id: 'ai-lab' },
  { label: 'Team', id: 'team' },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const scrollToSection = (id) => {
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
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link className="brand" to="/" aria-label="Gycide home">
          <span className="brand-mark">
            <FlaskConical size={16} strokeWidth={2.4} />
          </span>
          <span>gycide</span>
        </Link>

        <div className="footer-links">
          {sections.map(s => (
            <button type="button" key={s.id} onClick={() => scrollToSection(s.id)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="footer-meta">
          <div>© 2026 Gycide. Research initiative.</div>
          <a
            href="https://bhavithran1.github.io/personal-website/"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Bhavithran <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}
