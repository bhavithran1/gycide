import { useState, useEffect, useRef } from 'react'
import { Cpu, ChevronRight, Zap, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const PESTICIDES = [
  {
    id: 'paraquat',
    name: 'Paraquat',
    formula: 'C₁₂H₁₄N₂²⁺',
    class: 'Herbicide',
    status: 'BANNED',
    statusColor: 'tag-red',
    toxicity: 92,
    selectivity: 8,
    persistence: 78,
    bindingTarget: 'Photosystem I (PSI)',
    mechanism: 'Electron diversion from PSI generates reactive oxygen species, causing oxidative damage to plant cells. In mammals, identical mechanism attacks lung epithelium.',
    aiSuggestion: 'Replace bipyridinium core with triazine scaffold — maintains PSI electron capture in chloroplasts while steric bulk blocks binding in mammalian mitochondria.',
    improvedToxicity: 31,
    improvedSelectivity: 74,
    color: '#ff4d6d',
    atoms: generateAtoms('paraquat'),
  },
  {
    id: 'chlorpyrifos',
    name: 'Chlorpyrifos',
    formula: 'C₉H₁₁Cl₃NO₃PS',
    class: 'Insecticide',
    status: 'RESTRICTED',
    statusColor: 'tag-orange',
    toxicity: 78,
    selectivity: 22,
    persistence: 65,
    bindingTarget: 'Acetylcholinesterase (AChE)',
    mechanism: 'Organophosphate binds AChE active site serine residue, preventing hydrolysis of acetylcholine. Causes continuous nerve stimulation. Non-selective across pest and vertebrate nervous systems.',
    aiSuggestion: 'Introduce a bulky aromatic substituent at the P=S group. Insect AChE gorge (4.5Å) accommodates it; mammalian AChE gorge (5.9Å) causes allosteric clash, reducing off-target binding by ~65%.',
    improvedToxicity: 28,
    improvedSelectivity: 68,
    color: '#ffb347',
    atoms: generateAtoms('chlorpyrifos'),
  },
  {
    id: 'glyphosate',
    name: 'Glyphosate',
    formula: 'C₃H₈NO₅P',
    class: 'Herbicide',
    status: 'ACTIVE',
    statusColor: 'tag-orange',
    toxicity: 45,
    selectivity: 55,
    persistence: 50,
    bindingTarget: 'EPSPS Enzyme',
    mechanism: 'Inhibits 5-enolpyruvylshikimate-3-phosphate synthase (EPSPS), blocking aromatic amino acid synthesis. The shikimate pathway is absent in animals but present in gut microbiome bacteria.',
    aiSuggestion: 'Fluorine substitution at C2 increases EPSPS binding 3×, allowing 60% dose reduction while achieving equivalent weed control. Lower dose = lower runoff and microbiome disruption.',
    improvedToxicity: 18,
    improvedSelectivity: 82,
    color: '#4fc3f7',
    atoms: generateAtoms('glyphosate'),
  },
  {
    id: 'cypermethrin',
    name: 'Cypermethrin',
    formula: 'C₂₂H₁₉Cl₂NO₃',
    class: 'Insecticide',
    status: 'ACTIVE',
    statusColor: 'tag-orange',
    toxicity: 55,
    selectivity: 38,
    persistence: 44,
    bindingTarget: 'Voltage-gated Na⁺ channel',
    mechanism: 'Binds Nav1 channel open state, prolonging depolarization. Aquatic toxicity is extreme — highly toxic to fish at ppb concentrations due to lipophilicity and bioaccumulation in gill tissue.',
    aiSuggestion: 'Replace cyclopropane ring with oxetane bioisostere. Reduces logP from 6.6 to 4.1, cutting aquatic bioaccumulation 15× while retaining insect channel affinity through identical pharmacophore geometry.',
    improvedToxicity: 22,
    improvedSelectivity: 71,
    color: '#00e87a',
    atoms: generateAtoms('cypermethrin'),
  },
  {
    id: 'mancozeb',
    name: 'Mancozeb',
    formula: '(C₄H₆MnN₂S₄)ₓ·(Zn)',
    class: 'Fungicide',
    status: 'ACTIVE',
    statusColor: 'tag-green',
    toxicity: 38,
    selectivity: 48,
    persistence: 30,
    bindingTarget: 'Fungal Respiratory Chain',
    mechanism: 'Dithiocarbamate generates isothiocyanate, which disrupts multiple fungal enzyme systems simultaneously. ETU metabolite is a suspected thyroid disruptor and teratogen in mammals.',
    aiSuggestion: 'Chelate zinc with pyridine-carboxylate ligand instead of dithiocarbamate — eliminates ETU generation pathway entirely. GNN model predicts equivalent antifungal spectrum with 88% lower thyroid disruption potential.',
    improvedToxicity: 14,
    improvedSelectivity: 77,
    color: '#a78bfa',
    atoms: generateAtoms('mancozeb'),
  },
]

function generateAtoms(id) {
  const configs = {
    paraquat: {
      atoms: [
        { x: 80, y: 120, el: 'N', r: 12 }, { x: 150, y: 80, el: 'C', r: 9 },
        { x: 220, y: 100, el: 'C', r: 9 }, { x: 260, y: 160, el: 'C', r: 9 },
        { x: 220, y: 210, el: 'C', r: 9 }, { x: 150, y: 190, el: 'C', r: 9 },
        { x: 320, y: 120, el: 'N', r: 12 }, { x: 370, y: 80, el: 'C', r: 9 },
        { x: 420, y: 100, el: 'C', r: 9 }, { x: 440, y: 160, el: 'C', r: 9 },
        { x: 410, y: 210, el: 'C', r: 9 }, { x: 355, y: 195, el: 'C', r: 9 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,6],
      ],
      doubleBonds: [[0,1],[2,3],[4,5],[6,7],[8,9],[10,11]],
    },
    chlorpyrifos: {
      atoms: [
        { x: 100, y: 150, el: 'P', r: 14 }, { x: 160, y: 100, el: 'O', r: 10 },
        { x: 230, y: 110, el: 'C', r: 9 }, { x: 280, y: 70, el: 'N', r: 11 },
        { x: 340, y: 90, el: 'C', r: 9 }, { x: 380, y: 140, el: 'Cl', r: 13 },
        { x: 350, y: 190, el: 'C', r: 9 }, { x: 290, y: 200, el: 'Cl', r: 13 },
        { x: 240, y: 165, el: 'C', r: 9 }, { x: 100, y: 210, el: 'S', r: 12 },
        { x: 50, y: 130, el: 'O', r: 10 }, { x: 60, y: 190, el: 'C', r: 9 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[6,8],[8,2],[0,9],[0,10],[0,11],
      ],
      doubleBonds: [[0,9],[2,8]],
    },
    glyphosate: {
      atoms: [
        { x: 120, y: 160, el: 'N', r: 11 }, { x: 200, y: 130, el: 'C', r: 9 },
        { x: 270, y: 160, el: 'P', r: 14 }, { x: 330, y: 120, el: 'O', r: 10 },
        { x: 340, y: 180, el: 'O', r: 10 }, { x: 270, y: 220, el: 'O', r: 10 },
        { x: 200, y: 200, el: 'C', r: 9 }, { x: 130, y: 230, el: 'C', r: 9 },
        { x: 80, y: 190, el: 'O', r: 10 }, { x: 80, y: 260, el: 'O', r: 10 },
      ],
      bonds: [[0,1],[1,2],[2,3],[2,4],[2,5],[0,6],[6,7],[7,8],[7,9],[1,6]],
      doubleBonds: [[2,3],[7,8]],
    },
    cypermethrin: {
      atoms: [
        { x: 100, y: 150, el: 'C', r: 9 }, { x: 160, y: 110, el: 'C', r: 9 },
        { x: 220, y: 130, el: 'C', r: 9 }, { x: 200, y: 190, el: 'O', r: 10 },
        { x: 260, y: 200, el: 'C', r: 9 }, { x: 320, y: 180, el: 'O', r: 10 },
        { x: 370, y: 140, el: 'C', r: 9 }, { x: 410, y: 100, el: 'C', r: 9 },
        { x: 430, y: 170, el: 'Cl', r: 13 }, { x: 390, y: 210, el: 'C', r: 9 },
        { x: 140, y: 200, el: 'C', r: 9 }, { x: 100, y: 230, el: 'Cl', r: 13 },
        { x: 260, y: 130, el: 'N', r: 11 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[6,9],[0,10],[10,11],[1,12],[2,12],
      ],
      doubleBonds: [[1,2],[4,5],[6,7]],
    },
    mancozeb: {
      atoms: [
        { x: 130, y: 150, el: 'S', r: 12 }, { x: 190, y: 110, el: 'C', r: 9 },
        { x: 250, y: 130, el: 'N', r: 11 }, { x: 290, y: 80, el: 'C', r: 9 },
        { x: 330, y: 130, el: 'N', r: 11 }, { x: 380, y: 100, el: 'C', r: 9 },
        { x: 380, y: 170, el: 'S', r: 12 }, { x: 320, y: 200, el: 'Zn', r: 16 },
        { x: 250, y: 200, el: 'S', r: 12 }, { x: 130, y: 210, el: 'S', r: 12 },
        { x: 200, y: 240, el: 'Mn', r: 16 }, { x: 340, y: 250, el: 'S', r: 12 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,2],[0,9],[9,10],[10,8],[7,11],[11,10],
      ],
      doubleBonds: [[1,2],[4,5]],
    },
  }
  return configs[id] || configs.paraquat
}

function MoleculeCanvas({ pesticide, showImproved, animating }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const { atoms, bonds, doubleBonds } = pesticide.atoms
      const col = pesticide.color

      // glow pulse
      const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04)
      frame++

      // Scale/center atoms to canvas
      const xs = atoms.map(a => a.x), ys = atoms.map(a => a.y)
      const minX = Math.min(...xs), maxX = Math.max(...xs)
      const minY = Math.min(...ys), maxY = Math.max(...ys)
      const scaleX = (W - 80) / (maxX - minX || 1)
      const scaleY = (H - 80) / (maxY - minY || 1)
      const scale = Math.min(scaleX, scaleY, 1.4)
      const offX = (W - (maxX - minX) * scale) / 2 - minX * scale
      const offY = (H - (maxY - minY) * scale) / 2 - minY * scale

      const tx = x => x * scale + offX
      const ty = y => y * scale + offY

      // Draw bonds
      bonds.forEach(([i, j]) => {
        const isDbl = doubleBonds.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
        const x1 = tx(atoms[i].x), y1 = ty(atoms[i].y)
        const x2 = tx(atoms[j].x), y2 = ty(atoms[j].y)
        const dx = x2 - x1, dy = y2 - y1
        const len = Math.sqrt(dx * dx + dy * dy)
        const nx = -dy / len * 3, ny = dx / len * 3

        ctx.strokeStyle = showImproved
          ? `rgba(0,232,122,${0.5 + pulse * 0.2})`
          : `rgba(255,255,255,0.15)`
        ctx.lineWidth = isDbl ? 1.5 : 2

        if (isDbl) {
          ctx.beginPath(); ctx.moveTo(x1 + nx, y1 + ny); ctx.lineTo(x2 + nx, y2 + ny); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(x1 - nx, y1 - ny); ctx.lineTo(x2 - nx, y2 - ny); ctx.stroke()
        } else {
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        }
      })

      // Draw atoms
      atoms.forEach((atom, idx) => {
        const x = tx(atom.x), y = ty(atom.y)
        const r = (atom.r || 10) * Math.min(scale, 1.2)

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5)
        gradient.addColorStop(0, showImproved
          ? `rgba(0,232,122,${0.18 + pulse * 0.08})`
          : `${col}18`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath(); ctx.arc(x, y, r * 2.5, 0, Math.PI * 2); ctx.fill()

        // Circle
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = showImproved
          ? `rgba(0,232,122,0.15)`
          : `${col}22`
        ctx.fill()
        ctx.strokeStyle = showImproved ? `rgba(0,232,122,0.7)` : col
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Label
        ctx.fillStyle = showImproved ? '#00e87a' : col
        ctx.font = `bold ${Math.max(9, r * 0.9)}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(atom.el, x, y)
      })

      // Binding site indicator
      if (showImproved) {
        const cx = W / 2, cy = H / 2
        ctx.strokeStyle = `rgba(0,232,122,${0.06 + pulse * 0.04})`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 8])
        ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2); ctx.stroke()
        ctx.setLineDash([])
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [pesticide, showImproved])

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={300}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

function ScoreBar({ label, value, improved, color }) {
  const [displayed, setDisplayed] = useState(0)
  const [displayedImp, setDisplayedImp] = useState(0)

  useEffect(() => {
    let raf
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / 800, 1)
      setDisplayed(Math.round(value * progress))
      setDisplayedImp(Math.round(improved * progress))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, improved])

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
        <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--mono)', fontSize: 11 }}>
          <span style={{ color: color }}>{displayed}%</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{displayedImp}%</span>
        </div>
      </div>
      <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', height: '100%', borderRadius: 3,
          width: `${displayed}%`, background: color, opacity: 0.35, transition: 'width 0.05s',
        }} />
        <div style={{
          position: 'absolute', height: '100%', borderRadius: 3,
          width: `${displayedImp}%`, background: 'var(--accent)', transition: 'width 0.05s',
        }} />
      </div>
    </div>
  )
}

export default function MoleculeVisualizer() {
  const [selected, setSelected] = useState(PESTICIDES[0])
  const [showImproved, setShowImproved] = useState(false)
  const [running, setRunning] = useState(false)

  const runAnalysis = () => {
    setRunning(true)
    setShowImproved(false)
    setTimeout(() => { setShowImproved(true); setRunning(false) }, 2200)
  }

  return (
    <section id="ai-lab" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 48, maxWidth: 680 }}>
          <span className="section-label"><Cpu size={12} /> AI Binding Lab</span>
          <h2 className="section-title">Molecular redesign<br />powered by AI.</h2>
          <p className="section-subtitle">
            Select a pesticide to visualize its molecular structure and binding target.
            Run the AI analysis to see how structural modifications can drastically reduce toxicity
            while preserving agricultural effectiveness.
          </p>
        </div>

        {/* Pesticide selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {PESTICIDES.map(p => (
            <button key={p.id} onClick={() => { setSelected(p); setShowImproved(false) }}
              style={{
                padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                fontSize: 13, fontWeight: 600, border: '1px solid',
                borderColor: selected.id === p.id ? p.color : 'var(--border)',
                background: selected.id === p.id ? `${p.color}15` : 'var(--bg-card)',
                color: selected.id === p.id ? p.color : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Main lab panel */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20,
          alignItems: 'start',
        }} className="lab-grid">
          {/* Molecule canvas */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 20, overflow: 'hidden',
          }}>
            {/* Canvas header */}
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: showImproved ? 'var(--accent)' : selected.color,
                  boxShadow: `0 0 8px ${showImproved ? 'var(--accent)' : selected.color}`,
                  animation: 'pulse-glow 2s infinite',
                }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                  {showImproved ? 'AI-OPTIMIZED STRUCTURE' : 'ORIGINAL STRUCTURE'}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                {selected.formula}
              </span>
            </div>

            {/* Canvas */}
            <div style={{ padding: 20, height: 300 }}>
              <MoleculeCanvas pesticide={selected} showImproved={showImproved} />
            </div>

            {/* Canvas footer */}
            <div style={{
              padding: '12px 20px', borderTop: '1px solid var(--border)',
              background: 'var(--bg)', fontSize: 12, color: 'var(--text-muted)',
              fontFamily: 'var(--mono)', display: 'flex', justifyContent: 'space-between',
            }}>
              <span>Target: {selected.bindingTarget}</span>
              <span className={`tag ${selected.statusColor}`}>{selected.status}</span>
            </div>
          </div>

          {/* Side panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Mechanism */}
            <div className="card">
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Binding Mechanism
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {selected.mechanism}
              </p>
            </div>

            {/* Scores */}
            <div className="card">
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text-muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Property Scores
              </div>
              <ScoreBar label="Mammalian Toxicity" value={selected.toxicity} improved={selected.improvedToxicity} color={selected.color} />
              <ScoreBar label="Pest Selectivity" value={selected.selectivity} improved={selected.improvedSelectivity} color={selected.color} />
              <ScoreBar label="Environmental Persistence" value={selected.persistence} improved={Math.round(selected.persistence * 0.45)} color={selected.color} />
            </div>

            {/* AI suggestion */}
            {showImproved && (
              <div className="card" style={{ borderColor: 'var(--border-hover)', background: 'var(--accent-dim)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <CheckCircle size={15} color="var(--accent)" />
                  <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    AI Modification
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {selected.aiSuggestion}
                </p>
                <div style={{
                  marginTop: 12, padding: '8px 12px', background: 'var(--bg-card)',
                  borderRadius: 8, display: 'flex', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Toxicity reduction</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>
                    -{Math.round(((selected.toxicity - selected.improvedToxicity) / selected.toxicity) * 100)}%
                  </span>
                </div>
              </div>
            )}

            {/* Run button */}
            <button onClick={runAnalysis} disabled={running}
              className="btn btn-primary"
              style={{
                width: '100%', justifyContent: 'center', fontSize: 14,
                opacity: running ? 0.7 : 1,
                background: showImproved ? 'var(--accent)' : 'var(--accent)',
              }}>
              {running ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'rotate-slow 1s linear infinite' }}>
                    <Cpu size={15} />
                  </span>
                  Running AI Analysis...
                </>
              ) : showImproved ? (
                <><Zap size={15} /> Re-run Analysis</>
              ) : (
                <><Zap size={15} /> Run AI Analysis</>
              )}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, fontFamily: 'var(--mono)' }}>
            How the AI works
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { step: '01', title: 'Structural Input', desc: 'Pesticide SMILES string parsed into graph representation where atoms are nodes and bonds are edges.' },
              { step: '02', title: 'GNN Encoding', desc: 'Graph Neural Network processes atomic features (element, charge, hybridization) through 6 message-passing layers.' },
              { step: '03', title: 'Binding Prediction', desc: 'Model predicts binding affinity (ΔG) to target receptor and off-target mammalian enzymes simultaneously.' },
              { step: '04', title: 'Scaffold Optimization', desc: 'Genetic algorithm guided by the GNN modifies functional groups iteratively to maximize selectivity index.' },
            ].map(step => (
              <div key={step.step} className="card" style={{ padding: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', marginBottom: 8 }}>{step.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .lab-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
