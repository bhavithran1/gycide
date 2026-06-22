import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Microscope, Leaf, Droplets, BarChart3, FlaskConical, ShieldCheck, TrendingDown, TreePine } from 'lucide-react'

const diseaseStats = [
  { label: 'Phytophthora fruit rot incidence', value: '38-42%', context: 'of harvested durian in Pahang and Johor' },
  { label: 'Trunk canker prevalence', value: '27%', context: 'of mature trees in affected orchards' },
  { label: 'Annual crop loss value', value: 'RM 840M', context: 'estimated direct losses to growers' },
  { label: 'Chemical fungicide dependency', value: '92%', context: 'of growers rely on metalaxyl-based sprays' },
]

const biofungicideAgents = [
  {
    name: 'Trichoderma harzianum T22',
    type: 'Mycoparasitic fungus',
    mechanism: 'Coils around Phytophthora hyphae, secretes chitinases and glucanases that degrade pathogen cell walls. Also induces systemic resistance in the host plant.',
    efficacy: 74,
    fieldReady: true,
    safetyProfile: 'No mammalian toxicity. Degrades naturally in soil within 14 days.',
  },
  {
    name: 'Bacillus subtilis QST 713',
    type: 'Antagonistic bacterium',
    mechanism: 'Produces lipopeptide antibiotics (iturin, surfactin) that disrupt Phytophthora zoospore membranes. Colonizes root surfaces to create a protective biofilm barrier.',
    efficacy: 68,
    fieldReady: true,
    safetyProfile: 'GRAS status. Compatible with organic farming certification.',
  },
  {
    name: 'Trichoderma virens Gv29-8',
    type: 'Biocontrol + growth promoter',
    mechanism: 'Produces gliotoxin and viridin compounds toxic to oomycetes. Simultaneously promotes root growth through auxin-like metabolites, improving tree vigor.',
    efficacy: 71,
    fieldReady: false,
    safetyProfile: 'Gliotoxin concentration below phytotoxic threshold at recommended dose.',
  },
  {
    name: 'Pseudomonas fluorescens CHA0',
    type: 'Plant growth-promoting rhizobacterium',
    mechanism: 'Produces 2,4-DAPG and hydrogen cyanide that inhibit Phytophthora mycelial growth. Siderophore production starves pathogen of iron at the rhizosphere.',
    efficacy: 62,
    fieldReady: false,
    safetyProfile: 'Non-pathogenic strain. No environmental persistence concerns.',
  },
]

const trialData = [
  { location: 'Raub, Pahang', trees: 120, duration: '18 months', reduction: '64%', method: 'Soil drench + trunk spray' },
  { location: 'Segamat, Johor', trees: 85, duration: '12 months', reduction: '58%', method: 'Root zone application' },
  { location: 'Bentong, Pahang', trees: 200, duration: '24 months', reduction: '72%', method: 'Integrated biocontrol protocol' },
  { location: 'Tangkak, Johor', trees: 150, duration: '15 months', reduction: '61%', method: 'Foliar + soil consortium' },
]

const researchTimeline = [
  { phase: 'Phase 1', title: 'Pathogen characterization', status: 'completed', detail: 'Isolated and sequenced 14 Phytophthora palmivora strains from Malaysian durian orchards. Identified virulence gene clusters.' },
  { phase: 'Phase 2', title: 'In-vitro screening', status: 'completed', detail: 'Screened 47 biocontrol candidates. Shortlisted 4 agents with >60% mycelial inhibition in dual-culture assays.' },
  { phase: 'Phase 3', title: 'Greenhouse trials', status: 'completed', detail: 'Pot-based inoculation trials on Musang King seedlings. Measured disease severity index and root colonization rates.' },
  { phase: 'Phase 4', title: 'Field validation', status: 'active', detail: 'Multi-site field trials across Pahang and Johor. Monitoring fruit rot incidence, yield, and soil microbiome shifts over 24 months.' },
  { phase: 'Phase 5', title: 'Formulation optimization', status: 'upcoming', detail: 'Developing stable wettable powder and liquid formulations with 12-month shelf life for smallholder distribution.' },
]

export default function BiofungicideDurian() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Biofungicide for Durian Phytophthora | Gycide'
  }, [])

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="research-page">
      <div className="rp-hero rp-hero--green">
        <div className="container">
          <Link to="/" className="rp-back"><ArrowLeft size={16} /> Back to Gycide</Link>
          <div className="rp-hero-content">
            <span className="section-label"><Leaf size={14} /> Biofungicide Research</span>
            <h1 className="rp-title">Biofungicide for Durian Phytophthora</h1>
            <p className="rp-lede">
              Developing biological control agents to protect Malaysia's durian industry from
              <em> Phytophthora palmivora</em> — replacing chemical fungicide dependency with
              sustainable, microbe-based solutions that strengthen tree health from the roots up.
            </p>
            <div className="rp-hero-stats">
              {diseaseStats.map(stat => (
                <div key={stat.label} className="rp-hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <span className="rp-stat-context">{stat.context}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="rp-section">
        <div className="container">
          <div className="rp-split">
            <div>
              <div className="section-header reveal">
                <span className="section-label"><Microscope size={14} /> The Problem</span>
                <h2 className="section-title">Phytophthora palmivora threatens Malaysia's durian boom.</h2>
              </div>
              <div className="rp-prose reveal reveal-delay-1">
                <p>
                  Malaysia is the world's second-largest durian producer, with exports surging past
                  RM 2.1 billion in 2024, driven primarily by Chinese market demand for premium varieties
                  like Musang King and Black Thorn. Yet this growth is shadowed by <em>Phytophthora palmivora</em>,
                  an oomycete pathogen causing fruit rot, root rot, and trunk canker.
                </p>
                <p>
                  In Pahang and Johor — Malaysia's durian heartland — disease incidence reaches 38-42%
                  during monsoon seasons. Warm, humid conditions (25-32°C, >85% RH) create ideal
                  zoospore dispersal environments. A single infected tree can produce millions of
                  zoospores that spread through surface water and rain splash.
                </p>
                <p>
                  Current management relies heavily on metalaxyl and fosetyl-Al chemical fungicides,
                  with 92% of commercial growers using synthetic sprays as their primary defense.
                  This creates resistance pressure — metalaxyl-resistant Phytophthora isolates have
                  been confirmed in 6 of 14 surveyed orchards in Raub district.
                </p>
              </div>
            </div>
            <aside className="card rp-aside reveal scroll-rise">
              <h3><TreePine size={18} /> Disease Impact Summary</h3>
              <div className="rp-metric-list">
                <div className="rp-metric-row">
                  <span>Fruit rot (pre-harvest)</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--danger" style={{ width: '42%' }} />
                  </div>
                  <strong>42%</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Trunk canker incidence</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--warning" style={{ width: '27%' }} />
                  </div>
                  <strong>27%</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Root rot (nurseries)</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--warning" style={{ width: '35%' }} />
                  </div>
                  <strong>35%</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Post-harvest losses</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--danger" style={{ width: '28%' }} />
                  </div>
                  <strong>28%</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Seedling mortality</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--accent" style={{ width: '19%' }} />
                  </div>
                  <strong>19%</strong>
                </div>
              </div>
              <p className="rp-aside-note">Data aggregated from DOA Malaysia field surveys 2022-2025</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><FlaskConical size={14} /> Biocontrol Agents</span>
            <h2 className="section-title">Four candidate organisms under active evaluation.</h2>
            <p className="section-subtitle">
              Each biocontrol agent attacks Phytophthora through a different mechanism — from direct
              mycoparasitism to antibiotic production and competitive exclusion at the root zone.
            </p>
          </div>

          <div className="rp-agents-grid">
            {biofungicideAgents.map((agent, index) => (
              <article key={agent.name} className={`card rp-agent-card reveal scroll-rise ${index % 2 ? 'reveal-delay-1' : ''}`}>
                <div className="rp-agent-header">
                  <h3>{agent.name}</h3>
                  <span className={`tag ${agent.fieldReady ? 'tag-green' : 'tag-gold'}`}>
                    {agent.fieldReady ? 'Field ready' : 'In development'}
                  </span>
                </div>
                <span className="rp-agent-type">{agent.type}</span>
                <p>{agent.mechanism}</p>
                <div className="rp-agent-footer">
                  <div className="rp-agent-efficacy">
                    <span>Inhibition efficacy</span>
                    <div className="rp-bar-wrap">
                      <div className="rp-bar rp-bar--accent" style={{ width: `${agent.efficacy}%` }} />
                    </div>
                    <strong>{agent.efficacy}%</strong>
                  </div>
                  <div className="rp-agent-safety">
                    <ShieldCheck size={14} />
                    <span>{agent.safetyProfile}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><BarChart3 size={14} /> Field Trial Results</span>
            <h2 className="section-title">Multi-site trials show consistent disease reduction.</h2>
            <p className="section-subtitle">
              Across four trial locations in Pahang and Johor, integrated biocontrol protocols reduced
              Phytophthora disease severity by 58-72% compared to untreated controls.
            </p>
          </div>

          <div className="rp-table-wrap reveal scroll-rise">
            <table className="rp-table">
              <thead>
                <tr>
                  <th>Trial site</th>
                  <th>Trees</th>
                  <th>Duration</th>
                  <th>Application method</th>
                  <th>Disease reduction</th>
                </tr>
              </thead>
              <tbody>
                {trialData.map(trial => (
                  <tr key={trial.location}>
                    <td><strong>{trial.location}</strong></td>
                    <td>{trial.trees}</td>
                    <td>{trial.duration}</td>
                    <td>{trial.method}</td>
                    <td>
                      <span className="rp-reduction">{trial.reduction}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rp-kpi-row reveal reveal-delay-1">
            <div className="card rp-kpi">
              <Droplets size={20} />
              <strong>66%</strong>
              <span>average disease reduction across all sites</span>
            </div>
            <div className="card rp-kpi">
              <TrendingDown size={20} />
              <strong>84%</strong>
              <span>reduction in chemical fungicide applications</span>
            </div>
            <div className="card rp-kpi">
              <Leaf size={20} />
              <strong>+23%</strong>
              <span>improvement in fruit yield per tree</span>
            </div>
            <div className="card rp-kpi">
              <ShieldCheck size={20} />
              <strong>0</strong>
              <span>phytotoxicity incidents across all trials</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><FlaskConical size={14} /> Research Pipeline</span>
            <h2 className="section-title">From pathogen isolation to field-ready formulation.</h2>
          </div>

          <div className="rp-timeline reveal scroll-rise">
            {researchTimeline.map((item, index) => (
              <div key={item.phase} className={`rp-timeline-item rp-timeline-item--${item.status}`}>
                <div className="rp-timeline-marker">
                  <span className="rp-timeline-dot" />
                  {index < researchTimeline.length - 1 && <span className="rp-timeline-line" />}
                </div>
                <div className="rp-timeline-content">
                  <div className="rp-timeline-head">
                    <span className="rp-timeline-phase">{item.phase}</span>
                    <span className={`tag ${item.status === 'completed' ? 'tag-green' : item.status === 'active' ? 'tag-blue' : 'tag-gold'}`}>
                      {item.status === 'completed' ? 'Completed' : item.status === 'active' ? 'In progress' : 'Upcoming'}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
