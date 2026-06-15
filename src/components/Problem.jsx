import { AlertTriangle, Users, ShieldOff, Leaf, TrendingUp, Ban } from 'lucide-react'

const issues = [
  {
    icon: <Users size={21} />,
    tag: 'tag-red',
    tagLabel: 'Public health',
    title: 'Occupational exposure remains under-controlled',
    desc: 'Workers mixing and spraying pesticides without consistent protective equipment face chronic exposure risks, from respiratory stress to reproductive health effects.',
    stat: '3.8 / 100k',
    statLabel: 'reported incidence rate',
  },
  {
    icon: <ShieldOff size={21} />,
    tag: 'tag-orange',
    tagLabel: 'Illegal trade',
    title: 'Banned substances still move through informal channels',
    desc: 'Paraquat and other highly hazardous compounds continue to appear through online listings and unauthorized dealers, complicating enforcement work on the ground.',
    stat: '93.6%',
    statLabel: 'intentional poisoning share',
  },
  {
    icon: <Leaf size={21} />,
    tag: 'tag-green',
    tagLabel: 'Environment',
    title: 'Runoff pressure is visible in highland watersheds',
    desc: 'Frequent application near steep farms increases residue movement into rivers, placing aquatic life and downstream communities under repeated chemical load.',
    stat: '44%',
    statLabel: 'herbicide-linked cases',
  },
  {
    icon: <AlertTriangle size={21} />,
    tag: 'tag-red',
    tagLabel: 'Food safety',
    title: 'Residue risk persists after harvest',
    desc: 'Vegetable supply chains from intensive growing regions can carry elevated residue burdens, especially when systemic compounds are absorbed into plant tissue.',
    stat: 'High',
    statLabel: 'residue concern',
  },
  {
    icon: <TrendingUp size={21} />,
    tag: 'tag-gold',
    tagLabel: 'Resistance',
    title: 'Resistance encourages higher chemical use',
    desc: 'As pests adapt, farmers can be pushed toward higher doses or more frequent spraying, creating a cycle that increases exposure without solving the root problem.',
    stat: '27+',
    statLabel: 'compounds tracked',
  },
  {
    icon: <Ban size={21} />,
    tag: 'tag-blue',
    tagLabel: 'Regulation',
    title: 'Policy needs compound-level insight',
    desc: 'The Pesticide Act provides a framework, but risk reduction improves when regulation can compare binding behavior, persistence, and off-target toxicity.',
    stat: '1974',
    statLabel: 'primary act',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="problem-section">
      <div className="container problem-layout">
        <div className="evidence-panel reveal scroll-rise">
          <span className="section-label">The Problem</span>
          <h2 className="section-title">Pesticide safety is not one problem.</h2>
          <p>
            Gycide treats the issue as a connected system: worker exposure, illegal supply,
            residue movement, environmental persistence, and molecular toxicity all affect
            whether a compound can be used responsibly.
          </p>

          <div className="evidence-scale" aria-label="Risk comparison">
            <div className="scale-row">
              <span className="scale-value">92</span>
              <span className="scale-track"><span className="scale-fill" style={{ '--value': '92%' }} /></span>
              <span className="scale-label">Paraquat toxicity score</span>
            </div>
            <div className="scale-row">
              <span className="scale-value">78</span>
              <span className="scale-track"><span className="scale-fill" style={{ '--value': '78%' }} /></span>
              <span className="scale-label">Chlorpyrifos toxicity score</span>
            </div>
            <div className="scale-row">
              <span className="scale-value">38</span>
              <span className="scale-track"><span className="scale-fill" style={{ '--value': '38%' }} /></span>
              <span className="scale-label">Mancozeb toxicity score</span>
            </div>
          </div>
        </div>

        <div className="issue-grid">
          {issues.map((item, index) => (
            <IssueCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IssueCard({ item, index }) {
  const delayClass = index % 3 === 1 ? 'reveal-delay-1' : index % 3 === 2 ? 'reveal-delay-2' : ''

  return (
    <article className={`card issue-card reveal scroll-rise ${delayClass}`}>
      <div className="issue-top">
        <span className="issue-icon">{item.icon}</span>
        <span className={`tag ${item.tag}`}>{item.tagLabel}</span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.desc}</p>

      <div className="issue-stat">
        <strong>{item.stat}</strong>
        <span>{item.statLabel}</span>
      </div>
    </article>
  )
}
