import { useState } from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'

const papers = [
  {
    id: 'R01',
    category: 'Toxicology',
    title: 'Paraquat ban efficacy and residual exposure pathways in Malaysia',
    abstract: 'A review of mortality and exposure data before and after the national ban shows a sharp reduction in pesticide-related fatalities, while informal trade keeps residual risk alive. The brief identifies molecular replacement criteria for herbicidal activity with lower mammalian toxicity.',
    year: 2023,
    tags: ['Paraquat', 'Herbicide', 'Policy'],
    highlight: 'Illegal access persists after bans, so replacement chemistry matters as much as enforcement.',
  },
  {
    id: 'R02',
    category: 'Environmental',
    title: 'Residue runoff and biodiversity loss in Cameron Highlands watersheds',
    abstract: 'Water sampling across highland rivers points to repeated pesticide loading in catchments near intensive farms. The synthesis connects runoff risk with compound persistence, rainfall, slope, and spray timing.',
    year: 2024,
    tags: ['Runoff', 'Watershed', 'Biodiversity'],
    highlight: 'Persistence and timing shape environmental risk beyond application dose alone.',
  },
  {
    id: 'R03',
    category: 'Modeling',
    title: 'Graph models for pesticide binding affinity prediction',
    abstract: 'Molecular graphs can estimate binding affinity against target pest receptors and off-target mammalian enzymes. The model outputs are used as comparison signals, not final safety claims.',
    year: 2024,
    tags: ['Molecular graph', 'AChE', 'Prediction'],
    highlight: 'Binding predictions help prioritize safer scaffolds before lab validation.',
  },
  {
    id: 'R04',
    category: 'Occupational health',
    title: 'Chronic exposure outcomes in oil palm estate workers',
    abstract: 'Longitudinal worker data shows elevated biomarkers among handlers with frequent organophosphate exposure. The review highlights training access, language barriers, and inconsistent PPE availability as practical safety constraints.',
    year: 2023,
    tags: ['Exposure', 'PPE', 'Organophosphate'],
    highlight: 'Design and policy both fail if worker conditions are treated as an afterthought.',
  },
  {
    id: 'R05',
    category: 'Food safety',
    title: 'Multi-residue analysis of highland vegetables',
    abstract: 'Market sampling of leafy vegetables identifies multiple residue classes and uneven compliance with maximum residue limits. The brief separates surface residues from systemic residues when discussing mitigation.',
    year: 2024,
    tags: ['MRL', 'Residue', 'Food safety'],
    highlight: 'Residue control depends on compound behavior, not only washing or handling.',
  },
  {
    id: 'R06',
    category: 'Modeling',
    title: 'Generative design constraints for safer pesticide candidates',
    abstract: 'Candidate generation is constrained by selectivity, predicted persistence, solubility, and known toxicophores. Gycide uses the workflow as a research lens for comparing redesign options.',
    year: 2025,
    tags: ['Candidate design', 'ADMET', 'Selectivity'],
    highlight: 'The goal is to narrow possibilities into testable, safer design hypotheses.',
  },
]

const categoryColors = {
  Toxicology: 'tag-red',
  Environmental: 'tag-green',
  Modeling: 'tag-blue',
  'Occupational health': 'tag-orange',
  'Food safety': 'tag-gold',
}

export default function Research() {
  return (
    <section id="research" className="research-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><BookOpen size={14} /> Evidence Library</span>
          <h2 className="section-title">Research that connects field risk to molecular behavior.</h2>
          <p className="section-subtitle">
            The library brings together toxicology, environment, worker safety, residue studies,
            and computational modeling so each design choice has a visible chain of reasoning.
          </p>
        </div>

        <div className="research-shell">
          <div className="paper-list">
            {papers.map((paper, index) => (
              <PaperCard key={paper.id} paper={paper} index={index} />
            ))}
          </div>

          <aside className="research-aside reveal scroll-rise">
            <h3>How the evidence is used</h3>
            <p>
              Each brief feeds a practical comparison: what the compound targets, where it persists,
              and which off-target systems create unacceptable risk.
            </p>
            <div className="research-metrics">
              <div className="research-metric">
                <span>Research categories</span>
                <strong>5</strong>
              </div>
              <div className="research-metric">
                <span>Current briefs</span>
                <strong>6</strong>
              </div>
              <div className="research-metric">
                <span>Study window</span>
                <strong>2023-25</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function PaperCard({ paper, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const delayClass = index % 3 === 1 ? 'reveal-delay-1' : index % 3 === 2 ? 'reveal-delay-2' : ''

  return (
    <article
      className={`card paper-card reveal scroll-rise ${delayClass} ${expanded ? 'is-expanded' : ''}`}
      onClick={() => setExpanded(open => !open)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setExpanded(open => !open)
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <div className="paper-top">
        <span className="paper-id">{paper.id}</span>
        <div>
          <div className="paper-meta">
            <span className={`tag ${categoryColors[paper.category] || 'tag-blue'}`}>{paper.category}</span>
            <span className="paper-year">{paper.year}</span>
          </div>

          <h3>{paper.title}</h3>
          <div className="paper-highlight">
            <ChevronRight className="paper-chevron" size={15} />
            <span>{paper.highlight}</span>
          </div>

          {expanded && (
            <div className="paper-abstract">
              <p>{paper.abstract}</p>
              <div className="paper-tags">
                {paper.tags.map(tag => (
                  <span key={tag} className="tag tag-blue">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
