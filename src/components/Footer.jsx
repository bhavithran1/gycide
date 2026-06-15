import { FlaskConical, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: '40px 24px',
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 20,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FlaskConical size={15} color="#000" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            gycide
          </span>
        </div>

        {/* Center links */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Problem', href: '#problem' },
            { label: 'Research', href: '#research' },
            { label: 'AI Lab', href: '#ai-lab' },
            { label: 'Team', href: '#team' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
          <div>© 2025 Gycide. Research initiative.</div>
          <a
            href="https://bhavithran1.github.io/personal-website/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4 }}
          >
            by Bhavithran <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </footer>
  )
}
