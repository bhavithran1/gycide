import { ExternalLink, Github, Globe } from 'lucide-react'

export default function About() {
  return (
    <section id="team" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 600 }}>
          <span className="section-label">Our Team</span>
          <h2 className="section-title">Built by researchers,<br />for safer agriculture.</h2>
          <p className="section-subtitle">
            Gycide is an independent research initiative combining computational chemistry,
            machine learning, and field data to engineer pesticides that protect crops
            without harming people or the planet.
          </p>
        </div>

        {/* Founder card */}
        <div style={{ maxWidth: 480 }}>
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 32,
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-hover)'
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 68, height: 68, borderRadius: 18,
                background: 'linear-gradient(135deg, var(--accent) 0%, #0099ff 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, fontWeight: 800, color: '#000',
                flexShrink: 0, letterSpacing: '-0.02em',
              }}>
                B
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Bhavithran</div>
                <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>
                  Founder & Lead Researcher
                </div>
                <span className="tag tag-green">Founder</span>
              </div>
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              Driving Gycide's mission to leverage artificial intelligence for pesticide safety
              reform in Malaysian agriculture. Combining computational biology with field research
              to develop data-driven, evidence-based solutions for a healthier food system.
            </p>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://bhavithran1.github.io/personal-website/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: 13, padding: '9px 18px' }}
              >
                <Globe size={14} />
                Personal Site
                <ExternalLink size={12} />
              </a>
              <a
                href="https://bhavithran1.github.io/personal-website/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: 13, padding: '9px 18px' }}
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Mission callout */}
        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {[
            { num: '5', label: 'Pesticides analyzed', sub: 'with AI binding models' },
            { num: '6', label: 'Research studies', sub: 'reviewed & synthesized' },
            { num: '~70%', label: 'Toxicity reduction', sub: 'projected via AI redesign' },
          ].map(item => (
            <div key={item.num} style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 14, padding: '20px 24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                {item.num}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
