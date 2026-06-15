import { ExternalLink, Github, Globe, MapPinned, Microscope, ShieldCheck, Sprout } from 'lucide-react'

const principles = [
  {
    icon: <Microscope size={22} />,
    title: 'Molecular accountability',
    desc: 'Every recommendation starts with target binding, off-target toxicity, and persistence behavior.',
  },
  {
    icon: <MapPinned size={22} />,
    title: 'Malaysia-first context',
    desc: 'The research lens stays grounded in local crops, worker conditions, highland farms, and water systems.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Safety before novelty',
    desc: 'Candidate design is treated as a risk-reduction workflow, not a shortcut around validation.',
  },
  {
    icon: <Sprout size={22} />,
    title: 'Practical transition',
    desc: 'The end goal is safer farming practice that remains usable for growers and measurable for regulators.',
  },
]

export default function About() {
  return (
    <section id="team" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Our Team</span>
          <h2 className="section-title">A focused research initiative for safer agriculture.</h2>
          <p className="section-subtitle">
            Gycide combines computational chemistry, machine learning, toxicology review,
            and field context to make pesticide risk easier to understand and redesign.
          </p>
        </div>

        <div className="about-layout">
          <article className="card profile-card reveal scroll-rise">
            <div className="profile-head">
              <span className="avatar">B</span>
              <div>
                <h3>Bhavithran</h3>
                <div className="profile-role">Founder and lead researcher</div>
                <span className="tag tag-green">Research lead</span>
              </div>
            </div>

            <p>
              Bhavithran leads Gycide as an independent research project focused on pesticide
              safety reform in Malaysian agriculture. The work brings computational biology
              together with field-facing evidence so safer compound design can be discussed
              clearly and responsibly.
            </p>

            <div className="profile-actions">
              <a
                href="https://bhavithran1.github.io/personal-website/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Globe size={16} />
                Personal site
                <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/bhavithran1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </article>

          <div>
            <div className="principles-grid">
              {principles.map((item, index) => (
                <article key={item.title} className={`card principle-card reveal scroll-rise ${index % 2 ? 'reveal-delay-1' : ''}`}>
                  {item.icon}
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="project-metrics">
              <div className="card project-metric reveal reveal-delay-1">
                <strong>5</strong>
                <span>compounds modeled</span>
              </div>
              <div className="card project-metric reveal reveal-delay-2">
                <strong>6</strong>
                <span>evidence briefs</span>
              </div>
              <div className="card project-metric reveal reveal-delay-3">
                <strong>70%</strong>
                <span>targeted risk reduction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
