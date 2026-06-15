import { useEffect, useRef } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <HeroScene />

      <div className="container">
        <div className="hero-content">
          <div className="hero-kicker reveal">Independent pesticide safety research</div>
          <h1 className="reveal reveal-delay-1">Gycide</h1>
          <p className="hero-lede reveal reveal-delay-2">
            A Malaysian research initiative studying pesticide risk at the molecular level,
            then translating those findings into safer design principles for farms, food,
            and waterways.
          </p>

          <div className="hero-actions reveal reveal-delay-3">
            <a href="#ai-lab" className="btn btn-primary">
              Open Binding Lab <ArrowRight size={16} />
            </a>
            <a href="#research" className="btn btn-outline">
              <BookOpen size={16} /> Review Evidence
            </a>
          </div>

          <div className="hero-evidence reveal scroll-rise">
            <div className="hero-stat">
              <strong>3.8</strong>
              <span>poisoning incidence per 100k population</span>
            </div>
            <div className="hero-stat">
              <strong>44%</strong>
              <span>reported cases connected to herbicide exposure</span>
            </div>
            <div className="hero-stat">
              <strong>27+</strong>
              <span>active compounds tracked for binding behavior</span>
            </div>
          </div>
        </div>

        <p className="hero-note reveal reveal-delay-2">
          The project connects field observations from Malaysian agriculture with computational
          toxicology, making each compound easier to inspect, compare, and redesign.
        </p>
      </div>
    </section>
  )
}

function HeroScene() {
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

    const colors = () => {
      const style = getComputedStyle(document.documentElement)
      return {
        bg: style.getPropertyValue('--bg').trim(),
        line: style.getPropertyValue('--line-strong').trim(),
        accent: style.getPropertyValue('--accent').trim(),
        blue: style.getPropertyValue('--blue').trim(),
        rust: style.getPropertyValue('--rust').trim(),
        surface: style.getPropertyValue('--surface').trim(),
        muted: style.getPropertyValue('--text-muted').trim(),
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const roundedRect = (x, y, w, h, r) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    const drawFieldRows = (palette) => {
      ctx.save()
      ctx.translate(width * 0.5, height * 0.08)
      ctx.rotate(-0.22)

      for (let i = -5; i < 12; i += 1) {
        const y = i * 62
        const gradient = ctx.createLinearGradient(0, y, width, y + 80)
        gradient.addColorStop(0, 'rgba(29,115,80,0.05)')
        gradient.addColorStop(0.55, 'rgba(29,115,80,0.18)')
        gradient.addColorStop(1, 'rgba(46,98,136,0.07)')
        ctx.fillStyle = gradient
        roundedRect(0, y, width * 0.75, 26, 8)
        ctx.fill()
      }

      ctx.restore()

      ctx.save()
      ctx.globalAlpha = 0.55
      ctx.strokeStyle = palette.line
      ctx.lineWidth = 1
      for (let i = 0; i < 9; i += 1) {
        const y = height * 0.23 + i * 54
        ctx.beginPath()
        ctx.moveTo(width * 0.6, y)
        ctx.bezierCurveTo(width * 0.72, y - 34, width * 0.84, y + 28, width + 60, y - 12)
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawInstrument = (palette, t) => {
      const x = width * 0.62
      const y = height * 0.22
      const w = Math.min(430, width * 0.34)
      const h = Math.min(330, height * 0.42)

      ctx.save()
      ctx.globalAlpha = 0.9
      ctx.fillStyle = palette.surface
      ctx.strokeStyle = palette.line
      ctx.lineWidth = 1
      roundedRect(x, y, w, h, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = 'rgba(29,115,80,0.08)'
      roundedRect(x + 18, y + 18, w - 36, h * 0.45, 8)
      ctx.fill()

      ctx.strokeStyle = 'rgba(29,115,80,0.34)'
      ctx.lineWidth = 2
      ctx.beginPath()
      const cx = x + w * 0.5
      const cy = y + h * 0.27
      for (let i = 0; i < 6; i += 1) {
        const a = t + i * 1.04
        const px = cx + Math.cos(a) * (34 + i * 11)
        const py = cy + Math.sin(a * 1.3) * (18 + i * 7)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.stroke()

      for (let i = 0; i < 7; i += 1) {
        const a = t + i * 0.9
        const px = cx + Math.cos(a) * (30 + i * 12)
        const py = cy + Math.sin(a * 1.2) * (17 + i * 7)
        ctx.fillStyle = i % 3 === 0 ? palette.rust : i % 2 === 0 ? palette.blue : palette.accent
        ctx.beginPath()
        ctx.arc(px, py, i % 3 === 0 ? 5 : 4, 0, Math.PI * 2)
        ctx.fill()
      }

      const rows = [
        ['compound', 'binding'],
        ['toxicity', 'selectivity'],
        ['runoff', 'persistence'],
      ]

      rows.forEach((row, i) => {
        const ry = y + h * 0.58 + i * 38
        ctx.fillStyle = 'rgba(20,32,24,0.06)'
        roundedRect(x + 22, ry, w - 44, 24, 6)
        ctx.fill()
        ctx.fillStyle = palette.muted
        ctx.font = '11px SFMono-Regular, Consolas, monospace'
        ctx.fillText(row[0], x + 34, ry + 16)
        ctx.fillStyle = i === 1 ? palette.rust : palette.accent
        roundedRect(x + w - 148, ry + 7, 98 + Math.sin(t + i) * 18, 8, 4)
        ctx.fill()
      })

      ctx.restore()
    }

    const drawSamples = (palette, t) => {
      const points = [
        [0.62, 0.72, 0],
        [0.74, 0.66, 1.3],
        [0.82, 0.78, 2.5],
        [0.69, 0.84, 3.2],
      ]

      ctx.save()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(46,98,136,0.3)'
      ctx.setLineDash([7, 12])
      ctx.beginPath()
      points.forEach(([px, py], i) => {
        const x = px * width
        const y = py * height
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.setLineDash([])

      points.forEach(([px, py, phase], i) => {
        const x = px * width
        const y = py * height
        const pulse = 1 + Math.sin(t * 2 + phase) * 0.18
        ctx.fillStyle = i === 1 ? palette.rust : palette.accent
        ctx.globalAlpha = 0.16
        ctx.beginPath()
        ctx.arc(x, y, 20 * pulse, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.fillStyle = palette.surface
        ctx.strokeStyle = i === 1 ? palette.rust : palette.accent
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      })

      ctx.restore()
    }

    const draw = () => {
      const palette = colors()
      const t = frame * 0.012
      frame += media.matches ? 0 : 1

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = palette.bg
      ctx.fillRect(0, 0, width, height)

      drawFieldRows(palette)
      drawSamples(palette, t)
      drawInstrument(palette, t)

      if (!media.matches) {
        raf = requestAnimationFrame(draw)
      }
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
  }, [])

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
}
