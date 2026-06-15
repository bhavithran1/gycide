import { BookOpen, FlaskConical, ChevronRight, ExternalLink } from 'lucide-react'

const papers = [
  {
    id: 'R01',
    category: 'Toxicology',
    title: 'Paraquat Ban Efficacy in Reducing Poisoning Fatalities in Malaysia',
    abstract: 'Analysis of mortality data pre- and post-ban shows a 38% reduction in pesticide-related fatalities, yet illegal trade channels sustain residual exposure. AI-modeled substitutes exhibit comparable herbicidal binding with 60% lower mammalian toxicity scores.',
    year: 2023,
    tags: ['Paraquat', 'Herbicide', 'Ban Policy'],
    highlight: 'Illegal trade persists despite ban — molecular redesign offers a legal, safer alternative.',
  },
  {
    id: 'R02',
    category: 'Environmental',
    title: 'Pesticide Runoff and Biodiversity Loss in Cameron Highlands Watersheds',
    abstract: 'Systematic water sampling across 14 highland rivers documents chlorpyrifos and cypermethrin concentrations at 4–12× safe thresholds. Biodiversity surveys confirm 31% decline in aquatic macroinvertebrate populations over a 10-year window.',
    year: 2024,
    tags: ['Chlorpyrifos', 'Watershed', 'Biodiversity'],
    highlight: '4–12× above safe thresholds detected in highland river systems.',
  },
  {
    id: 'R03',
    category: 'AI Research',
    title: 'Graph Neural Networks for Pesticide Binding Affinity Prediction',
    abstract: 'A GNN model trained on 45,000 molecular structures achieves 91.4% accuracy predicting acetylcholinesterase binding affinity — the primary mechanism behind organophosphate toxicity. The model identifies structural modifications that preserve target pest receptor binding while reducing off-target mammalian binding by 40–70%.',
    year: 2024,
    tags: ['GNN', 'AChE Binding', 'ML Model'],
    highlight: '91.4% accuracy in binding affinity prediction; 40–70% toxicity reduction.',
  },
  {
    id: 'R04',
    category: 'Occupational Health',
    title: 'Chronic Exposure Outcomes in Malaysian Oil Palm Estate Workers',
    abstract: 'Longitudinal cohort study of 1,240 estate workers reveals elevated cholinesterase inhibition in 34% of participants, with reproductive irregularities correlated to organophosphate handling. PPE non-compliance linked to language barriers and inadequate safety training infrastructure.',
    year: 2023,
    tags: ['Organophosphate', 'PPE', 'Chronic Exposure'],
    highlight: '34% of workers show cholinesterase inhibition — a marker of systemic poisoning.',
  },
  {
    id: 'R05',
    category: 'Food Safety',
    title: 'Multi-Residue Analysis of Highland Vegetables: A 3-Year Surveillance Study',
    abstract: 'LC-MS/MS analysis of 2,100 samples from Brinchang and Tanah Rata markets identifies 18 distinct pesticide residues on leafy vegetables; 22% of samples exceed EU maximum residue limits. Washing with baking soda solution reduces surface residues by 47–69% but cannot remove systemic residues.',
    year: 2024,
    tags: ['MRL', 'LC-MS/MS', 'Food Safety'],
    highlight: '22% of market samples exceed EU maximum residue limits.',
  },
  {
    id: 'R06',
    category: 'AI Research',
    title: 'Diffusion Models for De Novo Pesticide Molecule Generation',
    abstract: 'Applying DDPM-based molecular generation conditioned on target pest enzyme structures, we generate 312 candidate molecules with predicted selectivity indices >100 (vs. <10 for most commercial pesticides). Three candidates have entered in-silico ADMET screening with promising profiles.',
    year: 2025,
    tags: ['Diffusion Model', 'ADMET', 'De Novo Design'],
    highlight: 'Selectivity index >100 — 10× safer than current commercial pesticides.',
  },
]

const categoryColors = {
  'Toxicology': 'tag-red',
  'Environmental': 'tag-green',
  'AI Research': 'tag-blue',
  'Occupational Health': 'tag-orange',
  'Food Safety': 'tag-orange',
}

export default function Research() {
  return (
    <section id="research" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 60, maxWidth: 680 }}>
          <span className="section-label"><BookOpen size={12} /> Scientific Research</span>
          <h2 className="section-title">What the science says<br />about Malaysian pesticides.</h2>
          <p className="section-subtitle">
            Our research synthesizes field surveillance data, molecular toxicology, and
            cutting-edge AI models to build an evidence base for safer pesticide design.
          </p>
        </div>

        {/* Paper list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {papers.map((paper, i) => (
            <PaperCard key={paper.id} paper={paper} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 40, textAlign: 'center',
          padding: '32px', background: 'var(--bg)',
          borderRadius: 16, border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12, fontFamily: 'var(--mono)' }}>
            Research database
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
            6 studies · 4 research categories · 2023–2025
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            All findings inform the AI molecular binding models in the lab below.
          </div>
        </div>
      </div>
    </section>
  )
}

function PaperCard({ paper, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={() => setExpanded(e => !e)}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* ID badge */}
        <div style={{
          flexShrink: 0, width: 40, height: 40, borderRadius: 10,
          background: 'var(--accent-dim)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, color: 'var(--accent)',
        }}>
          {paper.id}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Top row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <span className={`tag ${categoryColors[paper.category] || 'tag-blue'}`}>{paper.category}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)' }}>{paper.year}</span>
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{paper.title}</h3>

          {/* Highlight */}
          <div style={{
            fontSize: 13, color: 'var(--accent)', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <ChevronRight size={13} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
            {paper.highlight}
          </div>

          {/* Expanded content */}
          {expanded && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
                {paper.abstract}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {paper.tags.map(t => (
                  <span key={t} className="tag tag-blue">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Need useState
import { useState } from 'react'
