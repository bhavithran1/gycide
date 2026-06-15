import { ArrowRight, Dna, Atom, Leaf } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 24px 80px',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        opacity: 0.5,
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,232,122,0.07) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: 760 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent-dim)', border: '1px solid var(--border)',
            borderRadius: 100, padding: '6px 14px', marginBottom: 32,
            animation: 'fadeUp 0.5s ease forwards',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--accent)', display: 'inline-block',
              boxShadow: '0 0 8px var(--accent)',
              animation: 'pulse-glow 2s infinite',
            }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)',
            }}>
              AI-Powered Pesticide Research
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800,
            lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em',
            animation: 'fadeUp 0.6s 0.1s ease both',
          }}>
            Redesigning{' '}
            <span style={{
              color: 'var(--accent)',
              textShadow: '0 0 40px rgba(0,232,122,0.3)',
            }}>
              pesticides
            </span>
            <br />for a safer world.
          </h1>

          <p style={{
            fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.75,
            maxWidth: 560, marginBottom: 40,
            animation: 'fadeUp 0.6s 0.2s ease both',
          }}>
            We combine molecular biology with artificial intelligence to analyze
            pesticide binding mechanisms — and engineer safer alternatives for
            Malaysian agriculture.
          </p>

          {/* CTA row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            animation: 'fadeUp 0.6s 0.3s ease both',
          }}>
            <a href="#ai-lab" className="btn btn-primary" style={{ fontSize: 15 }}>
              Explore AI Lab <ArrowRight size={16} />
            </a>
            <a href="#research" className="btn btn-outline" style={{ fontSize: 15 }}>
              Read Research
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 40, marginTop: 64, flexWrap: 'wrap',
            animation: 'fadeUp 0.6s 0.4s ease both',
          }}>
            {[
              { val: '3.8', unit: '/100k', label: 'Poisoning incidence rate' },
              { val: '44%', unit: '', label: 'Cases from herbicides' },
              { val: '27+', unit: '', label: 'Pesticides analyzed' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                    {stat.val}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
                    {stat.unit}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating icons */}
        <FloatingIcon icon={<Atom size={22} />} style={{ top: 80, right: '8%', animationDelay: '0s' }} />
        <FloatingIcon icon={<Dna size={20} />} style={{ top: 200, right: '18%', animationDelay: '1s' }} />
        <FloatingIcon icon={<Leaf size={18} />} style={{ top: 320, right: '6%', animationDelay: '2s' }} />
      </div>
    </section>
  )
}

function FloatingIcon({ icon, style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 48, height: 48, borderRadius: 14,
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--accent)', animation: 'float 4s ease-in-out infinite',
      boxShadow: 'var(--shadow-glow)', ...style,
    }}>
      {icon}
    </div>
  )
}
