import { Link } from 'react-router-dom'
import { ExternalLink, FlaskConical } from 'lucide-react'

const hashLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Research', href: '#research-areas' },
  { label: 'Evidence', href: '#research' },
  { label: 'Binding Lab', href: '#ai-lab' },
  { label: 'Team', href: '#team' },
]

export default function Footer() {
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
          {hashLinks.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
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
