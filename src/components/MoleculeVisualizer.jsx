import { useState, useEffect, useRef } from 'react'
import { Activity, CheckCircle, Cpu, FlaskConical, GitCompare, Layers, Microscope, Shield, Zap } from 'lucide-react'

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
    bindingTarget: 'Photosystem I',
    mechanism: 'Electron diversion from Photosystem I generates reactive oxygen species. The same oxidative pathway can damage mammalian lung tissue, which is why small structural changes matter.',
    aiSuggestion: 'Replace the bipyridinium core with a triazine-like scaffold. The candidate keeps chloroplast electron capture while reducing the fit against mammalian mitochondrial sites.',
    improvedToxicity: 31,
    improvedSelectivity: 74,
    color: '#b84242',
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
    bindingTarget: 'Acetylcholinesterase',
    mechanism: 'The organophosphate group binds the AChE active site and prevents acetylcholine breakdown. Selectivity is difficult because vertebrate and insect nervous systems share similar chemistry.',
    aiSuggestion: 'Add steric bulk near the P=S group. The insect pocket can tolerate the added volume, while mammalian AChE produces a poorer fit and lower predicted off-target binding.',
    improvedToxicity: 28,
    improvedSelectivity: 68,
    color: '#a8562a',
    atoms: generateAtoms('chlorpyrifos'),
  },
  {
    id: 'glyphosate',
    name: 'Glyphosate',
    formula: 'C₃H₈NO₅P',
    class: 'Herbicide',
    status: 'ACTIVE',
    statusColor: 'tag-gold',
    toxicity: 45,
    selectivity: 55,
    persistence: 50,
    bindingTarget: 'EPSPS enzyme',
    mechanism: 'EPSPS inhibition blocks aromatic amino acid synthesis in plants. The pathway is absent in animals, but environmental load and microbiome effects still need scrutiny.',
    aiSuggestion: 'A C2 fluorine substitution improves EPSPS affinity, allowing a lower field dose for the same weed-control effect and reducing runoff pressure.',
    improvedToxicity: 18,
    improvedSelectivity: 82,
    color: '#2e6288',
    atoms: generateAtoms('glyphosate'),
  },
  {
    id: 'cypermethrin',
    name: 'Cypermethrin',
    formula: 'C₂₂H₁₉Cl₂NO₃',
    class: 'Insecticide',
    status: 'ACTIVE',
    statusColor: 'tag-gold',
    toxicity: 55,
    selectivity: 38,
    persistence: 44,
    bindingTarget: 'Voltage-gated sodium channel',
    mechanism: 'The molecule prolongs sodium-channel opening and disrupts nerve signaling. Aquatic organisms are especially vulnerable because lipophilic compounds concentrate in gill tissue.',
    aiSuggestion: 'Replace the cyclopropane ring with an oxetane bioisostere. The geometry stays useful for insect-channel binding while lowering predicted aquatic bioaccumulation.',
    improvedToxicity: 22,
    improvedSelectivity: 71,
    color: '#1d7350',
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
    bindingTarget: 'Fungal respiratory chain',
    mechanism: 'Dithiocarbamate chemistry disrupts fungal enzyme systems, but the ETU metabolite is associated with thyroid and developmental risk signals.',
    aiSuggestion: 'Use a pyridine-carboxylate zinc chelate rather than a dithiocarbamate pathway. The candidate removes the ETU route while preserving broad antifungal behavior.',
    improvedToxicity: 14,
    improvedSelectivity: 77,
    color: '#6b65a7',
    atoms: generateAtoms('mancozeb'),
  },
]

const FLOW_STEPS = [
  {
    icon: <FlaskConical size={16} />,
    title: 'Compound input',
    desc: 'Atoms and bonds become a graph representation.',
  },
  {
    icon: <Microscope size={16} />,
    title: 'Target fit',
    desc: 'The model compares pest and off-target receptor pockets.',
  },
  {
    icon: <Layers size={16} />,
    title: 'Scaffold search',
    desc: 'Functional groups are adjusted under safety constraints.',
  },
  {
    icon: <GitCompare size={16} />,
    title: 'Candidate comparison',
    desc: 'Risk, selectivity, and persistence are scored side by side.',
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

function MoleculeCanvas({ pesticide, phase, activeStep }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame = 0
    let raf

    const readTheme = () => {
      const style = getComputedStyle(document.documentElement)
      return {
        surface: style.getPropertyValue('--surface').trim(),
        bgStrong: style.getPropertyValue('--bg-strong').trim(),
        line: style.getPropertyValue('--line-strong').trim(),
        text: style.getPropertyValue('--text-primary').trim(),
        muted: style.getPropertyValue('--text-muted').trim(),
        accent: style.getPropertyValue('--accent').trim(),
        blue: style.getPropertyValue('--blue').trim(),
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawReceptor = (palette, t) => {
      const cx = width * 0.73
      const cy = height * 0.5

      ctx.save()
      ctx.strokeStyle = phase === 'optimized' ? palette.accent : palette.blue
      ctx.lineWidth = 2
      ctx.globalAlpha = phase === 'idle' ? 0.48 : 0.72
      for (let ring = 0; ring < 4; ring += 1) {
        ctx.beginPath()
        for (let i = 0; i <= 80; i += 1) {
          const a = (i / 80) * Math.PI * 2
          const wobble = Math.sin(a * 3 + t + ring) * 8
          const rx = 70 + ring * 22 + wobble
          const ry = 46 + ring * 15 + Math.cos(a * 2 + t) * 6
          const x = cx + Math.cos(a) * rx
          const y = cy + Math.sin(a) * ry
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      ctx.fillStyle = palette.surface
      ctx.strokeStyle = palette.line
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(cx, cy, 54, 36, 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = palette.muted
      ctx.font = '11px SFMono-Regular, Consolas, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('target pocket', cx, cy + 4)
      ctx.restore()
    }

    const drawMolecule = (palette, t) => {
      const { atoms, bonds, doubleBonds } = pesticide.atoms
      const xs = atoms.map(atom => atom.x)
      const ys = atoms.map(atom => atom.y)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)
      const scale = Math.min((width * 0.48) / (maxX - minX || 1), (height * 0.68) / (maxY - minY || 1), 1.34)
      const targetX = phase === 'optimized' ? width * 0.45 : width * 0.36
      const offX = targetX - ((minX + maxX) / 2) * scale
      const offY = height * 0.5 - ((minY + maxY) / 2) * scale
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.8)
      const color = phase === 'optimized' ? palette.accent : pesticide.color

      const tx = (x, i = 0) => x * scale + offX + (phase === 'analyzing' ? Math.sin(t * 2 + i) * 3 : 0)
      const ty = (y, i = 0) => y * scale + offY + (phase === 'analyzing' ? Math.cos(t * 2 + i) * 2 : 0)

      ctx.save()
      if (phase !== 'idle') {
        ctx.strokeStyle = phase === 'optimized' ? 'rgba(29,115,80,0.42)' : 'rgba(46,98,136,0.34)'
        ctx.setLineDash([8, 10])
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(width * 0.48, height * 0.5)
        ctx.bezierCurveTo(width * 0.55, height * 0.34, width * 0.66, height * 0.34, width * 0.73, height * 0.5)
        ctx.stroke()
        ctx.setLineDash([])
      }

      bonds.forEach(([i, j]) => {
        const isDbl = doubleBonds.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
        const x1 = tx(atoms[i].x, i)
        const y1 = ty(atoms[i].y, i)
        const x2 = tx(atoms[j].x, j)
        const y2 = ty(atoms[j].y, j)
        const dx = x2 - x1
        const dy = y2 - y1
        const len = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
        const nx = -dy / len * 3
        const ny = dx / len * 3

        ctx.strokeStyle = phase === 'optimized' ? 'rgba(29,115,80,0.72)' : 'rgba(82,102,91,0.52)'
        ctx.lineWidth = isDbl ? 1.5 : 2
        if (isDbl) {
          ctx.beginPath(); ctx.moveTo(x1 + nx, y1 + ny); ctx.lineTo(x2 + nx, y2 + ny); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(x1 - nx, y1 - ny); ctx.lineTo(x2 - nx, y2 - ny); ctx.stroke()
        } else {
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        }
      })

      atoms.forEach((atom, idx) => {
        const x = tx(atom.x, idx)
        const y = ty(atom.y, idx)
        const radius = (atom.r || 10) * Math.min(scale, 1.2)

        ctx.fillStyle = phase === 'optimized'
          ? `rgba(29,115,80,${0.1 + pulse * 0.05})`
          : 'rgba(46,98,136,0.08)'
        ctx.beginPath()
        ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = palette.surface
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = color
        ctx.font = `700 ${Math.max(9, radius * 0.9)}px SFMono-Regular, Consolas, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(atom.el, x, y)
      })

      if (phase === 'optimized') {
        ctx.strokeStyle = 'rgba(29,115,80,0.38)'
        ctx.lineWidth = 1
        ctx.setLineDash([4, 8])
        ctx.beginPath()
        ctx.ellipse(width * 0.46, height * 0.5, 118 + pulse * 8, 74 + pulse * 4, -0.12, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }

      ctx.restore()
    }

    const drawAnnotations = (palette) => {
      ctx.save()
      ctx.fillStyle = palette.muted
      ctx.font = '12px SFMono-Regular, Consolas, monospace'
      ctx.textAlign = 'left'
      ctx.fillText(activeStep <= 1 ? 'original molecule' : 'candidate search space', 22, 26)

      const labels = [
        ['toxicity', pesticide.toxicity],
        ['selectivity', pesticide.selectivity],
        ['persistence', pesticide.persistence],
      ]
      labels.forEach(([label, value], i) => {
        const y = height - 76 + i * 18
        ctx.fillStyle = palette.muted
        ctx.fillText(label, 22, y)
        ctx.fillStyle = value > 70 ? pesticide.color : palette.accent
        ctx.fillRect(112, y - 8, Math.max(24, value * 1.45), 7)
      })
      ctx.restore()
    }

    const draw = () => {
      const palette = readTheme()
      const t = frame * 0.018
      frame += media.matches ? 0 : 1

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(255,255,255,0)'
      ctx.fillRect(0, 0, width, height)
      drawReceptor(palette, t)
      drawMolecule(palette, t)
      drawAnnotations(palette)

      if (!media.matches) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [pesticide, phase, activeStep])

  return <canvas className="lab-canvas" ref={canvasRef} aria-hidden="true" />
}

function ScoreBar({ label, value, improved, color }) {
  const [displayed, setDisplayed] = useState(value)
  const [displayedImp, setDisplayedImp] = useState(improved)

  useEffect(() => {
    let raf
    let start

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / 650, 1)
      setDisplayed(Math.round(value * progress))
      setDisplayedImp(Math.round(improved * progress))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    setDisplayed(0)
    setDisplayedImp(0)
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, improved])

  return (
    <div className="score-row">
      <div className="score-top">
        <span>{label}</span>
        <span className="score-values">
          <span>{displayed}%</span>
          <span>to</span>
          <strong>{displayedImp}%</strong>
        </span>
      </div>
      <div
        className="score-track"
        style={{
          '--score': `${displayed}%`,
          '--improved': `${displayedImp}%`,
          '--score-color': color,
        }}
      >
        <span />
        <strong />
      </div>
    </div>
  )
}

export default function MoleculeVisualizer() {
  const [selected, setSelected] = useState(PESTICIDES[0])
  const [phase, setPhase] = useState('idle')
  const [activeStep, setActiveStep] = useState(0)
  const timersRef = useRef([])

  const isRunning = phase === 'analyzing'
  const isOptimized = phase === 'optimized'

  const clearTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer))
    timersRef.current = []
  }

  useEffect(() => clearTimers, [])

  const selectPesticide = (pesticide) => {
    clearTimers()
    setSelected(pesticide)
    setPhase('idle')
    setActiveStep(0)
  }

  const runAnalysis = () => {
    clearTimers()
    setPhase('analyzing')
    setActiveStep(1)
    timersRef.current = [
      setTimeout(() => setActiveStep(2), 760),
      setTimeout(() => setActiveStep(3), 1520),
      setTimeout(() => {
        setActiveStep(4)
        setPhase('optimized')
      }, 2360),
    ]
  }

  const persistenceCandidate = Math.round(selected.persistence * 0.45)
  const reduction = Math.round(((selected.toxicity - selected.improvedToxicity) / selected.toxicity) * 100)

  return (
    <section id="ai-lab" className="lab-section">
      <div className="container">
        <div className="lab-header reveal">
          <div>
            <span className="section-label"><Cpu size={14} /> Binding Lab</span>
            <h2 className="section-title">A visual model for safer pesticide candidates.</h2>
            <p className="section-subtitle">
              Select a compound, watch the binding workflow run, then compare the original risk
              profile against a lower-toxicity candidate hypothesis.
            </p>
          </div>
          <p className="lab-note">
            The lab is an explanatory model for research prioritization. It turns molecular
            structure into a readable safety comparison before any candidate would need wet-lab validation.
          </p>
        </div>

        <div className="pesticide-tabs reveal reveal-delay-1" aria-label="Pesticide selector">
          {PESTICIDES.map(pesticide => (
            <button
              key={pesticide.id}
              type="button"
              className={`pesticide-tab ${selected.id === pesticide.id ? 'is-active' : ''}`}
              style={{ '--tab-color': pesticide.color }}
              onClick={() => selectPesticide(pesticide)}
            >
              {pesticide.name}
            </button>
          ))}
        </div>

        <div className="lab-grid">
          <div
            className={`lab-stage reveal scroll-rise ${isRunning ? 'is-running' : ''}`}
            style={{ '--status-color': isOptimized ? 'var(--accent)' : selected.color }}
          >
            <div className="lab-stage-header">
              <div className="lab-status">
                <span className="status-dot" />
                <span>
                  {isRunning ? 'binding simulation in progress' : isOptimized ? 'candidate comparison ready' : 'original structure loaded'}
                </span>
              </div>
              <span className="lab-formula">{selected.formula}</span>
            </div>

            <div className="lab-canvas-wrap">
              <MoleculeCanvas pesticide={selected} phase={phase} activeStep={activeStep} />
            </div>

            <div className="flow-map">
              {FLOW_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className={`flow-node ${activeStep >= index + 1 || (phase === 'idle' && index === 0) ? 'is-active' : ''}`}
                >
                  <span className="flow-node-index">{step.icon}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="lab-stage-footer">
              <span>Target: {selected.bindingTarget}</span>
              <span className={`tag ${selected.statusColor}`}>{selected.status}</span>
            </div>
          </div>

          <div className="lab-side">
            <div className="card lab-card reveal reveal-delay-1">
              <span className={`tag ${selected.statusColor}`}>{selected.class}</span>
              <h3 style={{ marginTop: 12 }}>{selected.name}</h3>
              <p>{selected.mechanism}</p>
            </div>

            <div className="card lab-card score-card reveal reveal-delay-2">
              <h3><Activity size={17} /> Property comparison</h3>
              <ScoreBar label="Mammalian toxicity" value={selected.toxicity} improved={selected.improvedToxicity} color={selected.color} />
              <ScoreBar label="Pest selectivity" value={selected.selectivity} improved={selected.improvedSelectivity} color={selected.color} />
              <ScoreBar label="Environmental persistence" value={selected.persistence} improved={persistenceCandidate} color={selected.color} />
            </div>

            {isOptimized && (
              <div className="card lab-card candidate-card reveal is-visible">
                <h3><CheckCircle size={17} /> Candidate hypothesis</h3>
                <p>{selected.aiSuggestion}</p>
                <div className="candidate-stat">
                  <span>Predicted toxicity reduction</span>
                  <strong>-{reduction}%</strong>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={runAnalysis}
              disabled={isRunning}
              className="btn btn-primary reveal reveal-delay-3"
            >
              {isRunning ? (
                <>
                  <Shield size={16} /> Running simulation
                </>
              ) : isOptimized ? (
                <>
                  <Zap size={16} /> Run again
                </>
              ) : (
                <>
                  <Zap size={16} /> Run binding simulation
                </>
              )}
            </button>
          </div>
        </div>

        <div className="protocol-grid">
          {[
            { step: '01', title: 'Structure input', desc: 'Atoms, bonds, charge, and scaffold geometry form the molecular graph.' },
            { step: '02', title: 'Binding estimate', desc: 'The model compares the pest target with off-target mammalian systems.' },
            { step: '03', title: 'Constraint search', desc: 'Candidate changes are screened for selectivity, persistence, and known toxicophores.' },
            { step: '04', title: 'Research priority', desc: 'The best hypotheses move into validation planning rather than direct deployment.' },
          ].map((item, index) => (
            <article key={item.step} className={`card protocol-card reveal scroll-rise ${index % 2 ? 'reveal-delay-1' : ''}`}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
