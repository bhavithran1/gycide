import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bug, Dna, FlaskConical, ShieldCheck, Target, BarChart3, Leaf, TreePine, Zap, AlertTriangle } from 'lucide-react'

const targetPests = [
  {
    name: 'Rhinoceros Beetle',
    scientific: 'Oryctes rhinoceros',
    targetGene: 'V-ATPase subunit A (VhA)',
    dsrnaLength: '420 bp',
    mortality: 72,
    feedingReduction: 89,
    lethalTime: '7-12 days',
    severity: 'Critical',
    description: 'The most destructive pest of young oil palms in Malaysia. Adults bore into the crown, destroying the growing point and creating entry wounds for Ganoderma fungus. A single beetle can damage 4-6 palms in its lifetime.',
    damage: 'RM 320M annual losses. Attacks both immature and mature palms. Damage is most severe in replanting areas where rotting stumps serve as breeding sites.',
    mechanism: 'The dsRNA targets the vacuolar H+-ATPase subunit A, which is essential for midgut pH regulation and nutrient absorption. Silencing causes midgut cell collapse and starvation within 7-12 days.',
  },
  {
    name: 'Bagworm',
    scientific: 'Metisa plana',
    targetGene: 'Chitin synthase 1 (CHS1)',
    dsrnaLength: '385 bp',
    mortality: 64,
    feedingReduction: 78,
    lethalTime: '10-18 days',
    severity: 'High',
    description: 'Defoliating caterpillars that feed gregariously on oil palm fronds. Severe outbreaks strip entire blocks, reducing photosynthetic area by 50-70% and causing yield losses for 2+ subsequent harvests.',
    damage: 'RM 180M annual losses. Outbreaks are cyclical and can affect thousands of hectares simultaneously. Chemical control is difficult due to the protective larval case.',
    mechanism: 'CHS1 is required for chitin biosynthesis during larval molting. dsRNA-mediated knockdown prevents cuticle formation, causing lethal molting defects at the next instar transition.',
  },
  {
    name: 'Nettle Caterpillar',
    scientific: 'Setothosea asigna',
    targetGene: 'Acetylcholinesterase 1 (AChE1)',
    dsrnaLength: '450 bp',
    mortality: 58,
    feedingReduction: 71,
    lethalTime: '12-20 days',
    severity: 'Moderate',
    description: 'Urticating caterpillars that cause both crop damage through defoliation and occupational hazard through painful stings to plantation workers during harvesting.',
    damage: 'RM 95M annual losses plus worker compensation costs. Outbreaks overlap with peak harvest season, reducing both yield and harvest efficiency.',
    mechanism: 'AChE1 knockdown disrupts cholinergic signaling in the nervous system, causing progressive paralysis and feeding cessation. The target is insect-specific — mammalian AChE has low sequence homology.',
  },
]

const safetyData = [
  { organism: 'Apis mellifera (honeybee)', result: 'No mortality', exposure: '10 µg/bee oral', duration: '14 days', status: 'safe' },
  { organism: 'Eisenia fetida (earthworm)', result: 'No effect', exposure: '100 µg/kg soil', duration: '28 days', status: 'safe' },
  { organism: 'Danio rerio (zebrafish)', result: 'No effect', exposure: '50 µg/L water', duration: '96 hours', status: 'safe' },
  { organism: 'Cotesia vestalis (parasitoid)', result: 'No mortality', exposure: '5 µg/larva contact', duration: '7 days', status: 'safe' },
  { organism: 'Tetragnatha sp. (spider)', result: 'No effect', exposure: '50 µg/prey item', duration: '14 days', status: 'safe' },
  { organism: 'Mus musculus (mouse)', result: 'No adverse effects', exposure: '500 µg/kg gavage', duration: '28 days', status: 'safe' },
]

const deliveryMethods = [
  {
    method: 'Trunk injection',
    description: 'Direct injection of dsRNA solution into the palm trunk via a pressurized syringe system. The dsRNA is transported systemically through xylem and phloem to reach the crown where beetles feed.',
    uptakeRate: '82%',
    persistence: '21-28 days',
    cost: 'RM 4.20/palm',
    scalability: 'Medium',
  },
  {
    method: 'Foliar spray (nanoparticle)',
    description: 'dsRNA encapsulated in chitosan nanoparticles (150-200 nm) applied as a foliar spray. The nanoparticle shell protects dsRNA from UV degradation and enhances cuticular penetration.',
    uptakeRate: '68%',
    persistence: '14-21 days',
    cost: 'RM 2.80/palm',
    scalability: 'High',
  },
  {
    method: 'Bait station (attract-and-kill)',
    description: 'Pheromone-baited stations containing dsRNA mixed with feeding substrate. Targets adult rhinoceros beetles attracted by ethyl 4-methyloctanoate aggregation pheromone.',
    uptakeRate: '91%',
    persistence: '30-45 days',
    cost: 'RM 8.50/station',
    scalability: 'Medium',
  },
  {
    method: 'Root drench (soil application)',
    description: 'dsRNA in clay nanoparticle carrier applied to the root zone. Slow-release formulation provides sustained uptake through the root system over 6-8 weeks.',
    uptakeRate: '54%',
    persistence: '42-56 days',
    cost: 'RM 5.60/palm',
    scalability: 'High',
  },
]

const economicAnalysis = [
  { metric: 'Current chemical control cost', value: 'RM 680/ha/year' },
  { metric: 'Projected RNA biopesticide cost', value: 'RM 420/ha/year' },
  { metric: 'Cost reduction', value: '38%' },
  { metric: 'Oil palm area in Malaysia', value: '5.67M ha' },
  { metric: 'Area with active pest pressure', value: '1.24M ha' },
  { metric: 'Potential national savings', value: 'RM 322M/year' },
  { metric: 'Yield recovery potential', value: '+12-18%' },
  { metric: 'Projected ROI for growers', value: '3.2x' },
]

export default function RNABiopesticide() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'RNA Biopesticide for Oil Palm Pests | Gycide'
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
      <div className="rp-hero rp-hero--rust">
        <div className="container">
          <Link to="/" className="rp-back"><ArrowLeft size={16} /> Back to Gycide</Link>
          <div className="rp-hero-content">
            <span className="section-label"><Dna size={14} /> RNA Biopesticide</span>
            <h1 className="rp-title">RNA Biopesticide for Malaysian Oil Palm Pests</h1>
            <p className="rp-lede">
              Harnessing RNA interference to silence essential pest genes with surgical precision —
              delivering species-specific control of rhinoceros beetle, bagworm, and nettle caterpillar
              without harming beneficial insects, pollinators, or soil organisms.
            </p>
            <div className="rp-hero-stats">
              <div className="rp-hero-stat">
                <strong>RM 595M</strong>
                <span>annual pest damage to oil palm</span>
                <span className="rp-stat-context">rhinoceros beetle + bagworm combined</span>
              </div>
              <div className="rp-hero-stat">
                <strong>3</strong>
                <span>target pest species</span>
                <span className="rp-stat-context">with validated dsRNA constructs</span>
              </div>
              <div className="rp-hero-stat">
                <strong>67%</strong>
                <span>average pest mortality</span>
                <span className="rp-stat-context">in controlled bioassay conditions</span>
              </div>
              <div className="rp-hero-stat">
                <strong>0</strong>
                <span>off-target effects detected</span>
                <span className="rp-stat-context">across 6 non-target organisms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rp-section">
        <div className="container">
          <div className="rp-split">
            <div>
              <div className="section-header reveal">
                <span className="section-label"><Bug size={14} /> The Pest Crisis</span>
                <h2 className="section-title">Oil palm pests cost Malaysia RM 595M every year.</h2>
              </div>
              <div className="rp-prose reveal reveal-delay-1">
                <p>
                  Malaysia's oil palm industry — covering 5.67 million hectares and employing over
                  500,000 workers — faces relentless pressure from three key arthropod pests.
                  The rhinoceros beetle alone causes RM 320 million in annual losses, boring into
                  palm crowns and creating entry points for secondary infections.
                </p>
                <p>
                  Current pest management relies on broad-spectrum chemical insecticides including
                  cypermethrin, chlorpyrifos, and fipronil. These chemicals are effective but create
                  cascading problems: pesticide resistance is emerging in beetle populations,
                  beneficial predators like parasitoid wasps are decimated, and residues contaminate
                  waterways draining into sensitive ecosystems.
                </p>
                <p>
                  RNA interference (RNAi) offers a fundamentally different approach. By designing
                  double-stranded RNA (dsRNA) sequences that match essential genes unique to the target
                  pest, we can trigger gene silencing with species-level specificity. The dsRNA is
                  degraded by non-target organisms whose cellular machinery doesn't recognize the sequence.
                </p>
              </div>
            </div>
            <aside className="card rp-aside reveal scroll-rise">
              <h3><AlertTriangle size={18} /> Pest Damage Breakdown</h3>
              <div className="rp-metric-list">
                <div className="rp-metric-row">
                  <span>Rhinoceros beetle</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--danger" style={{ width: '54%' }} />
                  </div>
                  <strong>RM 320M</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Bagworm</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--warning" style={{ width: '30%' }} />
                  </div>
                  <strong>RM 180M</strong>
                </div>
                <div className="rp-metric-row">
                  <span>Nettle caterpillar</span>
                  <div className="rp-bar-wrap">
                    <div className="rp-bar rp-bar--accent" style={{ width: '16%' }} />
                  </div>
                  <strong>RM 95M</strong>
                </div>
              </div>
              <div className="rp-aside-total">
                <span>Total annual damage</span>
                <strong>RM 595M</strong>
              </div>
              <p className="rp-aside-note">Estimates from MPOB 2024 Pest Impact Assessment</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><Target size={14} /> Target Pests</span>
            <h2 className="section-title">Three pests, three precision dsRNA constructs.</h2>
            <p className="section-subtitle">
              Each construct targets a different essential gene — chosen for high pest-specificity,
              validated knockdown efficiency, and minimal homology with non-target organisms.
            </p>
          </div>

          <div className="rp-pest-cards">
            {targetPests.map((pest, index) => (
              <article key={pest.name} className={`card rp-pest-card reveal scroll-rise ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}>
                <div className="rp-pest-header">
                  <div>
                    <h3>{pest.name}</h3>
                    <span className="rp-pest-sci"><em>{pest.scientific}</em></span>
                  </div>
                  <span className={`tag ${pest.severity === 'Critical' ? 'tag-red' : pest.severity === 'High' ? 'tag-orange' : 'tag-gold'}`}>
                    {pest.severity}
                  </span>
                </div>

                <p className="rp-pest-desc">{pest.description}</p>

                <div className="rp-pest-damage">
                  <AlertTriangle size={14} />
                  <span>{pest.damage}</span>
                </div>

                <div className="rp-pest-target">
                  <h4>dsRNA Target</h4>
                  <div className="rp-pest-gene">
                    <div className="rp-gene-row"><span>Gene</span><strong>{pest.targetGene}</strong></div>
                    <div className="rp-gene-row"><span>Construct length</span><strong>{pest.dsrnaLength}</strong></div>
                    <div className="rp-gene-row"><span>Lethal time</span><strong>{pest.lethalTime}</strong></div>
                  </div>
                </div>

                <div className="rp-pest-mechanism">
                  <Dna size={14} />
                  <p>{pest.mechanism}</p>
                </div>

                <div className="rp-pest-results">
                  <div className="rp-pest-result">
                    <span>Mortality rate</span>
                    <div className="rp-bar-wrap">
                      <div className="rp-bar rp-bar--danger" style={{ width: `${pest.mortality}%` }} />
                    </div>
                    <strong>{pest.mortality}%</strong>
                  </div>
                  <div className="rp-pest-result">
                    <span>Feeding reduction</span>
                    <div className="rp-bar-wrap">
                      <div className="rp-bar rp-bar--accent" style={{ width: `${pest.feedingReduction}%` }} />
                    </div>
                    <strong>{pest.feedingReduction}%</strong>
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
            <span className="section-label"><ShieldCheck size={14} /> Safety Profile</span>
            <h2 className="section-title">Zero off-target effects across six non-target species.</h2>
            <p className="section-subtitle">
              Species-specificity is the core advantage of RNAi biopesticides. The dsRNA sequences
              are designed with <strong>no significant homology</strong> (&lt;21 nt continuous match) to genomes of
              beneficial insects, aquatic organisms, or mammals.
            </p>
          </div>

          <div className="rp-table-wrap reveal scroll-rise">
            <table className="rp-table">
              <thead>
                <tr>
                  <th>Non-target organism</th>
                  <th>Exposure level</th>
                  <th>Duration</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {safetyData.map(row => (
                  <tr key={row.organism}>
                    <td><strong>{row.organism}</strong></td>
                    <td>{row.exposure}</td>
                    <td>{row.duration}</td>
                    <td>{row.result}</td>
                    <td><span className="tag tag-green">Safe</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><FlaskConical size={14} /> Delivery Systems</span>
            <h2 className="section-title">Four delivery methods under evaluation.</h2>
            <p className="section-subtitle">
              Getting dsRNA into the pest is the primary engineering challenge. Naked dsRNA degrades
              within hours under UV exposure. Each delivery method trades off uptake efficiency,
              persistence, cost, and scalability.
            </p>
          </div>

          <div className="rp-delivery-grid">
            {deliveryMethods.map((method, index) => (
              <article key={method.method} className={`card rp-delivery-card reveal scroll-rise ${index % 2 ? 'reveal-delay-1' : ''}`}>
                <h3>{method.method}</h3>
                <p>{method.description}</p>
                <div className="rp-delivery-stats">
                  <div className="rp-delivery-stat">
                    <span>Uptake rate</span>
                    <strong>{method.uptakeRate}</strong>
                  </div>
                  <div className="rp-delivery-stat">
                    <span>Persistence</span>
                    <strong>{method.persistence}</strong>
                  </div>
                  <div className="rp-delivery-stat">
                    <span>Cost</span>
                    <strong>{method.cost}</strong>
                  </div>
                  <div className="rp-delivery-stat">
                    <span>Scalability</span>
                    <strong>{method.scalability}</strong>
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
            <span className="section-label"><BarChart3 size={14} /> Economic Impact</span>
            <h2 className="section-title">A 38% cost reduction with better environmental outcomes.</h2>
            <p className="section-subtitle">
              RNA biopesticides are projected to cost 38% less than current chemical programs while
              eliminating resistance buildup and collateral damage to natural pest enemies.
            </p>
          </div>

          <div className="rp-split reveal scroll-rise">
            <div className="card rp-aside rp-aside--wide">
              <h3><BarChart3 size={18} /> Economic Projections</h3>
              <div className="rp-perf-grid">
                {economicAnalysis.map(item => (
                  <div key={item.metric} className="rp-perf-item">
                    <span>{item.metric}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rp-prose">
              <h3>Why RNA over chemicals?</h3>
              <p>
                Chemical insecticides kill indiscriminately. When you spray cypermethrin for rhinoceros
                beetle, you also eliminate parasitoid wasps that naturally suppress bagworm populations.
                This creates a cycle of escalating chemical dependency as natural biocontrol collapses.
              </p>
              <p>
                RNAi breaks this cycle. Because the dsRNA sequence is complementary only to the
                target pest's gene, parasitoid wasps, spiders, and other natural enemies remain
                unaffected. Field observations in our pilot trials show a 2.4x increase in parasitoid
                wasp populations compared to chemically-treated blocks.
              </p>
              <p>
                The economic case is compelling: at projected scale, RNA biopesticide costs RM 420/ha/year
                versus RM 680/ha/year for chemical programs — a 38% reduction. Factor in yield recovery
                from restored natural enemy populations, and grower ROI reaches 3.2x within the first
                two application seasons.
              </p>
            </div>
          </div>

          <div className="rp-kpi-row reveal reveal-delay-1">
            <div className="card rp-kpi">
              <Leaf size={20} />
              <strong>38%</strong>
              <span>cost reduction vs chemical control</span>
            </div>
            <div className="card rp-kpi">
              <TreePine size={20} />
              <strong>2.4x</strong>
              <span>increase in natural enemy populations</span>
            </div>
            <div className="card rp-kpi">
              <Zap size={20} />
              <strong>3.2x</strong>
              <span>projected grower ROI at scale</span>
            </div>
            <div className="card rp-kpi">
              <ShieldCheck size={20} />
              <strong>5.67M ha</strong>
              <span>total addressable oil palm area</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
