import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Smartphone, Cpu, Camera, Wifi, Zap, Database, Target, BarChart3, Layers, CheckCircle } from 'lucide-react'

const oilPalmDiseases = [
  { name: 'Ganoderma Basal Stem Rot', accuracy: 96.1, images: 2840, severity: 'Critical', desc: 'Caused by Ganoderma boninense. Destroys root and stem base tissue. Can kill mature palms within 2-3 years of visible symptoms.' },
  { name: 'Bud Rot', accuracy: 93.8, images: 1620, severity: 'High', desc: 'Often caused by Phytophthora palmivora. Yellowing and necrosis of the spear leaf, progressing to crown collapse.' },
  { name: 'Upper Stem Rot', accuracy: 91.4, images: 980, severity: 'High', desc: 'Advanced Ganoderma infection in the upper trunk. Often fatal by the time fruiting bodies appear.' },
  { name: 'Leaf Spot Complex', accuracy: 94.7, images: 1430, severity: 'Moderate', desc: 'Multiple pathogens including Curvularia and Helminthosporium. Reduces photosynthetic area and yield.' },
  { name: 'Crown Disease', accuracy: 89.2, images: 760, severity: 'Moderate', desc: 'Affects young palms in the nursery and early field stages. Causes bending and snapping of frond rachis.' },
]

const paddyDiseases = [
  { name: 'Rice Blast', accuracy: 97.3, images: 3200, severity: 'Critical', desc: 'Caused by Magnaporthe oryzae. Produces diamond-shaped lesions on leaves, necks, and panicles. Can destroy entire fields.' },
  { name: 'Bacterial Leaf Blight', accuracy: 95.6, images: 2100, severity: 'Critical', desc: 'Caused by Xanthomonas oryzae. Produces water-soaked, yellowish-white lesions that enlarge along leaf veins.' },
  { name: 'Brown Spot', accuracy: 94.1, images: 1850, severity: 'High', desc: 'Caused by Bipolaris oryzae. Dark brown oval lesions on leaves and glumes. Associated with nutrient-deficient soils.' },
  { name: 'Sheath Blight', accuracy: 92.8, images: 1540, severity: 'High', desc: 'Caused by Rhizoctonia solani. Irregular greenish-grey lesions on leaf sheaths, spreading upward in warm, humid conditions.' },
  { name: 'Tungro Virus', accuracy: 88.5, images: 680, severity: 'Moderate', desc: 'Transmitted by green leafhoppers. Causes stunting, yellow-orange discoloration, and reduced tillering.' },
  { name: 'False Smut', accuracy: 91.9, images: 920, severity: 'Moderate', desc: 'Caused by Ustilaginoidea virens. Orange-green spore balls replace individual grains on panicles.' },
  { name: 'Narrow Brown Leaf Spot', accuracy: 93.2, images: 1100, severity: 'Low', desc: 'Caused by Cercospora janseana. Short, narrow, linear brown lesions. Usually cosmetic unless severe.' },
  { name: 'Leaf Scald', accuracy: 90.7, images: 840, severity: 'Low', desc: 'Caused by Microdochium oryzae. Produces oblong, zonate lesions with light center and dark margin.' },
]

const modelMetrics = [
  { label: 'Overall accuracy (top-1)', value: '94.2%' },
  { label: 'Overall accuracy (top-3)', value: '98.7%' },
  { label: 'Mean F1 score', value: '0.936' },
  { label: 'Mean precision', value: '0.941' },
  { label: 'Mean recall', value: '0.932' },
  { label: 'Inference time (mobile)', value: '2.3s' },
  { label: 'Model size (quantized)', value: '14.2 MB' },
  { label: 'Training images', value: '12,460' },
  { label: 'Validation images', value: '3,115' },
  { label: 'Disease classes', value: '23' },
]

const architectureSteps = [
  { icon: <Camera size={18} />, title: 'Image Capture', desc: 'User photographs affected leaf, stem, or fruit. Auto-crop and orientation correction applied.' },
  { icon: <Layers size={18} />, title: 'Preprocessing', desc: 'Resize to 224x224, normalize RGB channels, apply CLAHE for contrast enhancement in variable lighting.' },
  { icon: <Cpu size={18} />, title: 'Feature Extraction', desc: 'EfficientNet-B4 backbone extracts hierarchical visual features — edges, textures, lesion patterns.' },
  { icon: <Target size={18} />, title: 'Classification + GradCAM', desc: 'Softmax classifier identifies disease. GradCAM heatmap highlights the diagnostic region for user verification.' },
]

const fieldValidation = [
  { region: 'MADA, Kedah (paddy)', users: 340, fieldAccuracy: '91.8%', conditions: 'Wet season, variable lighting' },
  { region: 'FELDA, Pahang (oil palm)', users: 185, fieldAccuracy: '89.4%', conditions: 'Dense canopy, partial shade' },
  { region: 'Sekinchan, Selangor (paddy)', users: 220, fieldAccuracy: '93.1%', conditions: 'Irrigated fields, clear weather' },
  { region: 'Teluk Intan, Perak (oil palm)', users: 160, fieldAccuracy: '90.2%', conditions: 'Mixed age blocks, morning light' },
]

export default function AICropDiagnostics() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'AI Crop Disease Diagnostics | Gycide'
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
      <div className="rp-hero rp-hero--blue">
        <div className="container">
          <Link to="/" className="rp-back"><ArrowLeft size={16} /> Back to Gycide</Link>
          <div className="rp-hero-content">
            <span className="section-label"><Smartphone size={14} /> AI Diagnostics</span>
            <h1 className="rp-title">AI Crop Disease Diagnostics via Smartphone</h1>
            <p className="rp-lede">
              A lightweight deep learning model deployed on Android and iOS that lets farmers
              identify oil palm and paddy diseases in real time — no internet required, no expert
              on-site, just point, shoot, and get an actionable diagnosis with confidence scores.
            </p>
            <div className="rp-hero-stats">
              <div className="rp-hero-stat">
                <strong>94.2%</strong>
                <span>overall detection accuracy</span>
                <span className="rp-stat-context">across 23 disease classes</span>
              </div>
              <div className="rp-hero-stat">
                <strong>23</strong>
                <span>diseases identified</span>
                <span className="rp-stat-context">oil palm + paddy combined</span>
              </div>
              <div className="rp-hero-stat">
                <strong>2.3s</strong>
                <span>average inference time</span>
                <span className="rp-stat-context">on mid-range Android devices</span>
              </div>
              <div className="rp-hero-stat">
                <strong>14.2 MB</strong>
                <span>quantized model size</span>
                <span className="rp-stat-context">runs fully offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rp-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><Cpu size={14} /> Model Architecture</span>
            <h2 className="section-title">From photograph to diagnosis in four steps.</h2>
            <p className="section-subtitle">
              The pipeline uses an EfficientNet-B4 backbone with transfer learning from ImageNet,
              fine-tuned on 12,460 annotated field images collected from Malaysian farms.
            </p>
          </div>

          <div className="rp-arch-flow reveal scroll-rise">
            {architectureSteps.map((step, index) => (
              <div key={step.title} className="rp-arch-step">
                <div className="rp-arch-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {index < architectureSteps.length - 1 && <span className="rp-arch-arrow">→</span>}
              </div>
            ))}
          </div>

          <div className="rp-split reveal reveal-delay-1">
            <div className="card rp-aside rp-aside--wide">
              <h3><BarChart3 size={18} /> Model Performance</h3>
              <div className="rp-perf-grid">
                {modelMetrics.map(metric => (
                  <div key={metric.label} className="rp-perf-item">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rp-prose">
              <h3>Why on-device inference matters</h3>
              <p>
                Malaysian smallholder farms — especially paddy fields in Kedah and oil palm estates
                in rural Pahang — often lack reliable internet connectivity. A cloud-dependent model
                becomes useless precisely where disease pressure is highest.
              </p>
              <p>
                Our quantized EfficientNet-B4 model runs entirely on-device at 14.2 MB, requiring
                no data connection after initial installation. The TFLite runtime handles inference
                in under 3 seconds on devices as modest as the Samsung Galaxy A14, which retails
                below RM 600.
              </p>
              <p>
                GradCAM attention maps overlay the diagnostic region directly on the captured photo,
                so farmers can verify that the model is "looking at" the right symptom — building
                trust in the prediction rather than delivering a black-box verdict.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><Zap size={14} /> Oil Palm Diseases</span>
            <h2 className="section-title">Five oil palm diseases in the detection model.</h2>
            <p className="section-subtitle">
              Oil palm contributes RM 80 billion annually to Malaysia's economy. Early disease
              detection prevents the 15-30% yield losses that typically occur before visual symptoms
              become obvious to untrained eyes.
            </p>
          </div>

          <div className="rp-disease-grid">
            {oilPalmDiseases.map((disease, index) => (
              <article key={disease.name} className={`card rp-disease-card reveal scroll-rise ${index % 2 ? 'reveal-delay-1' : ''}`}>
                <div className="rp-disease-header">
                  <h3>{disease.name}</h3>
                  <span className={`tag ${disease.severity === 'Critical' ? 'tag-red' : disease.severity === 'High' ? 'tag-orange' : 'tag-gold'}`}>
                    {disease.severity}
                  </span>
                </div>
                <p>{disease.desc}</p>
                <div className="rp-disease-metrics">
                  <div className="rp-disease-metric">
                    <span>Detection accuracy</span>
                    <div className="rp-bar-wrap">
                      <div className="rp-bar rp-bar--blue" style={{ width: `${disease.accuracy}%` }} />
                    </div>
                    <strong>{disease.accuracy}%</strong>
                  </div>
                  <div className="rp-disease-images">
                    <Database size={13} />
                    <span>{disease.images.toLocaleString()} training images</span>
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
            <span className="section-label"><Zap size={14} /> Paddy Diseases</span>
            <h2 className="section-title">Eight paddy diseases covering the Malaysian rice belt.</h2>
            <p className="section-subtitle">
              Malaysia's rice self-sufficiency hovers around 63%. Disease-driven yield losses
              directly impact food security. The model covers the full spectrum from devastating
              blast to cosmetic leaf spots.
            </p>
          </div>

          <div className="rp-disease-grid rp-disease-grid--compact">
            {paddyDiseases.map((disease, index) => (
              <article key={disease.name} className={`card rp-disease-card rp-disease-card--compact reveal scroll-rise ${index % 3 === 1 ? 'reveal-delay-1' : index % 3 === 2 ? 'reveal-delay-2' : ''}`}>
                <div className="rp-disease-header">
                  <h3>{disease.name}</h3>
                  <span className={`tag ${disease.severity === 'Critical' ? 'tag-red' : disease.severity === 'High' ? 'tag-orange' : disease.severity === 'Moderate' ? 'tag-gold' : 'tag-green'}`}>
                    {disease.severity}
                  </span>
                </div>
                <p>{disease.desc}</p>
                <div className="rp-disease-metrics">
                  <div className="rp-disease-metric">
                    <span>Accuracy</span>
                    <strong>{disease.accuracy}%</strong>
                  </div>
                  <div className="rp-disease-images">
                    <Database size={13} />
                    <span>{disease.images.toLocaleString()} images</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rp-section rp-section--alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><Wifi size={14} /> Field Validation</span>
            <h2 className="section-title">Real-world accuracy across Malaysian farming regions.</h2>
            <p className="section-subtitle">
              Lab accuracy means little without field validation. We tested the model with 905 farmers
              across four regions under real conditions — variable lighting, damaged leaves, partial
              occlusion, and mixed disease presence.
            </p>
          </div>

          <div className="rp-table-wrap reveal scroll-rise">
            <table className="rp-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Test users</th>
                  <th>Field accuracy</th>
                  <th>Conditions</th>
                </tr>
              </thead>
              <tbody>
                {fieldValidation.map(trial => (
                  <tr key={trial.region}>
                    <td><strong>{trial.region}</strong></td>
                    <td>{trial.users}</td>
                    <td><span className="rp-reduction">{trial.fieldAccuracy}</span></td>
                    <td>{trial.conditions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rp-kpi-row reveal reveal-delay-1">
            <div className="card rp-kpi">
              <CheckCircle size={20} />
              <strong>91.1%</strong>
              <span>weighted field accuracy across all regions</span>
            </div>
            <div className="card rp-kpi">
              <Smartphone size={20} />
              <strong>905</strong>
              <span>farmers participated in field validation</span>
            </div>
            <div className="card rp-kpi">
              <Camera size={20} />
              <strong>4,280</strong>
              <span>real-world photos classified during trials</span>
            </div>
            <div className="card rp-kpi">
              <Target size={20} />
              <strong>87%</strong>
              <span>users rated diagnosis as "helpful" or "very helpful"</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
