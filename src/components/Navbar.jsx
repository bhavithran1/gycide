import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, FlaskConical } from 'lucide-react'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Problem', href: '#problem' },
    { label: 'Research', href: '#research' },
    { label: 'AI Lab', href: '#ai-lab' },
    { label: 'Team', href: '#team' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 24px',
      background: scrolled
        ? 'rgba(var(--nav-bg, 8, 13, 22), 0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68, gap: 32 }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FlaskConical size={18} color="#000" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            gycide
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 2, marginLeft: 'auto', alignItems: 'center' }}
             className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
              padding: '8px 14px', borderRadius: 8, textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.background = 'var(--accent-dim)' }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent' }}>
              {l.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            marginLeft: 8, width: 38, height: 38, borderRadius: 9,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile menu btn */}
        <button onClick={() => setMenuOpen(o => !o)} style={{
          marginLeft: 'auto', width: 38, height: 38, borderRadius: 9,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)',
        }} className="mobile-menu-btn">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
          padding: '12px 24px 20px',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '10px 0',
              fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border)', textDecoration: 'none',
            }}>{l.label}</a>
          ))}
          <button onClick={toggleTheme} style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500,
          }}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
