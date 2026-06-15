import { AlertTriangle, Users, ShieldOff, Leaf, TrendingUp, Ban } from 'lucide-react'

const issues = [
  {
    icon: <Users size={22} />,
    tag: 'tag-red',
    tagLabel: 'Public Health',
    title: 'Occupational Poisoning',
    desc: 'Plantation workers frequently mix and spray pesticides without proper PPE, leading to chronic health issues, reproductive problems, and an average incidence rate of 3.8 cases per 100,000 population.',
    stat: '3.8 / 100k',
    statLabel: 'incidence rate',
  },
  {
    icon: <ShieldOff size={22} />,
    tag: 'tag-orange',
    tagLabel: 'Illegal Trade',
    title: 'Banned Substances Still Active',
    desc: 'Despite a national ban, Paraquat and other Highly Hazardous Pesticides (HHPs) are still sold online and through unauthorized dealers — particularly prevalent in Cameron Highlands markets.',
    stat: '93.6%',
    statLabel: 'intentional poisoning cases',
  },
  {
    icon: <Leaf size={22} />,
    tag: 'tag-orange',
    tagLabel: 'Environment',
    title: 'Ecosystem Degradation',
    desc: 'Excessive application has caused severe biodiversity loss in highland watersheds. Pesticide runoff contaminates river systems, forcing farmers into a cycle of increasingly potent chemicals as pest resistance grows.',
    stat: '44%',
    statLabel: 'herbicide-related cases',
  },
  {
    icon: <AlertTriangle size={22} />,
    tag: 'tag-red',
    tagLabel: 'Food Safety',
    title: 'Contaminated Produce',
    desc: 'Routine sampling by the Department of Agriculture finds elevated residue levels on vegetables from Cameron Highlands — one of Malaysia\'s primary highland vegetable growing regions.',
    stat: '↑ High',
    statLabel: 'residue levels detected',
  },
  {
    icon: <TrendingUp size={22} />,
    tag: 'tag-orange',
    tagLabel: 'Resistance',
    title: 'Escalating Chemical Use',
    desc: 'Pest resistance is forcing farmers to increase dosage and frequency. Without AI-guided intervention in molecular binding, this arms race between chemicals and biology will worsen.',
    stat: '27+',
    statLabel: 'pesticides in active use',
  },
  {
    icon: <Ban size={22} />,
    tag: 'tag-blue',
    tagLabel: 'Regulatory',
    title: 'Enforcement Gaps',
    desc: 'The Pesticide Act 1974 provides a framework, but on-ground enforcement remains inconsistent. A special Pahang Control Committee was formed to address Cameron Highlands, yet illegal channels persist.',
    stat: '1974',
    statLabel: 'primary regulatory act',
  },
]

export default function Problem() {
  return (
    <section id="problem" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 60, maxWidth: 640 }}>
          <span className="section-label">The Problem</span>
          <h2 className="section-title">Malaysia's pesticide crisis<br />demands a new approach.</h2>
          <p className="section-subtitle">
            Decades of unchecked chemical use across Malaysian agriculture have created
            a compounding crisis — one that harms workers, consumers, and the environment simultaneously.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {issues.map((item, i) => (
            <IssueCard key={i} item={item} delay={i * 0.05} />
          ))}
        </div>

        {/* Highlight bar */}
        <div style={{
          marginTop: 48,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px',
          display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--accent-dim)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', flexShrink: 0,
          }}>
            <AlertTriangle size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              Why molecular AI matters here
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Traditional regulatory approaches address symptoms. AI-driven molecular binding analysis
              targets the root cause — redesigning pesticides so they remain effective against pests
              while sharply reducing toxicity to mammals, beneficial insects, and aquatic life.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IssueCard({ item, delay }) {
  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'var(--accent-dim)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)',
        }}>
          {item.icon}
        </div>
        <span className={`tag ${item.tag}`}>{item.tagLabel}</span>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
      <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
        {item.desc}
      </p>

      <div style={{
        borderTop: '1px solid var(--border)', paddingTop: 16,
        display: 'flex', alignItems: 'baseline', gap: 6,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>{item.stat}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{item.statLabel}</span>
      </div>
    </div>
  )
}
