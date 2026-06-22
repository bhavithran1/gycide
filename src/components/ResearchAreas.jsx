import { Link } from 'react-router-dom'
import { Microscope, Smartphone, Bug, ArrowRight } from 'lucide-react'

const areas = [
  {
    icon: <Microscope size={28} />,
    tag: 'Biofungicide',
    tagColor: 'tag-green',
    title: 'Biofungicide for Durian Phytophthora',
    desc: 'Developing Trichoderma and Bacillus-based biocontrol agents to combat Phytophthora palmivora — the leading cause of durian fruit rot and trunk canker in Malaysian orchards.',
    stats: [
      { value: '40%', label: 'durian crop loss from Phytophthora' },
      { value: 'RM 2.1B', label: 'annual durian export value at risk' },
      { value: '78%', label: 'biocontrol efficacy in field trials' },
    ],
    link: '/research/biofungicide-durian',
  },
  {
    icon: <Smartphone size={28} />,
    tag: 'AI Diagnostics',
    tagColor: 'tag-blue',
    title: 'AI Crop Disease Diagnostics via Smartphone',
    desc: 'A convolutional neural network deployed on mobile devices for real-time identification of oil palm and paddy diseases — from Ganoderma basal stem rot to rice blast.',
    stats: [
      { value: '94.2%', label: 'detection accuracy across 23 diseases' },
      { value: '<3s', label: 'inference time on mid-range phones' },
      { value: '12K+', label: 'annotated field images in training set' },
    ],
    link: '/research/ai-crop-diagnostics',
  },
  {
    icon: <Bug size={28} />,
    tag: 'RNA Biopesticide',
    tagColor: 'tag-orange',
    title: 'RNA Biopesticide for Oil Palm Pests',
    desc: 'Designing dsRNA constructs that silence essential genes in rhinoceros beetle and bagworm — two of the most destructive pests in Malaysian oil palm plantations.',
    stats: [
      { value: '67%', label: 'pest mortality in lab bioassays' },
      { value: '0', label: 'off-target effects on beneficial insects' },
      { value: '5.2M ha', label: 'oil palm area that could benefit' },
    ],
    link: '/research/rna-biopesticide',
  },
]

export default function ResearchAreas() {
  return (
    <section id="research-areas" className="research-areas-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><Microscope size={14} /> Research Focus</span>
          <h2 className="section-title">Three research pillars driving safer Malaysian agriculture.</h2>
          <p className="section-subtitle">
            Each research area tackles a critical gap in pest and disease management —
            from biological fungicides to AI-powered diagnostics and next-generation RNA biopesticides.
          </p>
        </div>

        <div className="ra-grid">
          {areas.map((area, index) => (
            <Link
              key={area.link}
              to={area.link}
              className={`card ra-card reveal scroll-rise ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}
            >
              <div className="ra-icon">{area.icon}</div>
              <span className={`tag ${area.tagColor}`}>{area.tag}</span>
              <h3>{area.title}</h3>
              <p>{area.desc}</p>

              <div className="ra-stats">
                {area.stats.map(stat => (
                  <div key={stat.label} className="ra-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <span className="ra-link">
                View full research <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
