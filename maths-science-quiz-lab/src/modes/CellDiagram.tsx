import { useState } from 'react'

type CellType = 'plant' | 'animal'

interface Organelle {
  id: string
  name: string
  job: string
  fact: string
  plantOnly?: boolean
  animalOnly?: boolean
  color: string
}

const ORGANELLES: Organelle[] = [
  { id: 'wall', name: 'Cell wall', job: 'Rigid outer layer that gives shape and protection.', fact: 'Cellulose in plants, chitin in fungi, peptidoglycan in bacteria. Absent in animal cells.', plantOnly: true, color: '#b6f26a' },
  { id: 'membrane', name: 'Plasma membrane', job: 'Selectively permeable boundary that controls what enters and leaves.', fact: 'Fluid mosaic model (Singer & Nicolson, 1972): proteins float in a lipid bilayer.', color: '#63e6f5' },
  { id: 'nucleus', name: 'Nucleus', job: 'Control centre; stores DNA and directs protein synthesis.', fact: 'Contains chromatin (DNA + histones) and a nucleolus that makes ribosomes. Robert Brown discovered it (1831).', color: '#c4b5fd' },
  { id: 'mito', name: 'Mitochondrion', job: 'Powerhouse — aerobic respiration releases ATP.', fact: 'Inner folds are cristae. It has its own DNA and 70S ribosomes, like a bacterium.', color: '#fb7185' },
  { id: 'chloro', name: 'Chloroplast', job: 'Photosynthesis: light + CO₂ + water → glucose + O₂.', fact: 'Chlorophyll sits in thylakoids stacked into grana, surrounded by stroma. Also has its own DNA.', plantOnly: true, color: '#4ade80' },
  { id: 'vacuole', name: 'Central vacuole', job: 'Stores water, ions and sugars; keeps the cell turgid.', fact: 'In plants it can fill 80% of the cell. When it loses water, the cell plasmolyses.', plantOnly: true, color: '#7dd3fc' },
  { id: 'er', name: 'Endoplasmic reticulum', job: 'Rough ER folds and transports proteins; smooth ER makes lipids.', fact: 'Rough ER carries ribosomes; smooth ER does not.', color: '#fbbf24' },
  { id: 'golgi', name: 'Golgi apparatus', job: 'Modifies, packages and dispatches proteins in vesicles.', fact: 'The cell’s post office. Discovered by Camillo Golgi, 1898.', color: '#f472b6' },
  { id: 'ribo', name: 'Ribosome', job: 'Protein factory — translates mRNA into protein.', fact: '80S in eukaryotes, 70S in prokaryotes and in mitochondria/chloroplasts.', color: '#e2e8f0' },
  { id: 'lyso', name: 'Lysosome', job: 'Digests waste with hydrolytic enzymes — the “suicidal bag”.', fact: 'If it bursts, it digests the cell itself. Many in white blood cells.', color: '#f59e0b' },
  { id: 'centro', name: 'Centriole', job: 'Organises the spindle during animal cell division.', fact: 'Animal cells only. Plant cells organise spindles without centrioles.', animalOnly: true, color: '#a78bfa' },
]

export default function CellDiagram() {
  const [type, setType] = useState<CellType>('plant')
  const [sel, setSel] = useState<string>('nucleus')

  const visible = ORGANELLES.filter((o) => !(type === 'animal' && o.plantOnly) && !(type === 'plant' && o.animalOnly))
  const active = ORGANELLES.find((o) => o.id === sel && visible.includes(o)) ?? visible[0]

  const onClick = (id: string) => () => setSel(id)
  const ring = (id: string) => (active.id === id ? { filter: 'drop-shadow(0 0 7px rgba(99,230,245,.9))', strokeWidth: 2.6 } : {})

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">Lab · cell explorer</div>
          <h2 className="h2 mt-8">Tap an organelle. Learn its verb.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            Quizzes rarely ask “what is a mitochondrion?”. They ask what it <em>does</em>, and which cell type has it.
          </p>
        </div>
        <div className="pill-toggle">
          <button className={type === 'plant' ? 'on' : ''} onClick={() => setType('plant')}>Plant</button>
          <button className={type === 'animal' ? 'on' : ''} onClick={() => { setType('animal'); if (sel === 'chloro' || sel === 'vacuole' || sel === 'wall') setSel('nucleus') }}>Animal</button>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <svg viewBox="0 0 470 330" style={{ width: '100%' }} role="img" aria-label={`${type} cell diagram`}>
            <defs>
              <radialGradient id="cyto" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#123049" />
                <stop offset="100%" stopColor="#0a1b2a" />
              </radialGradient>
            </defs>

            {type === 'plant' ? (
              <>
                <rect x="8" y="8" width="454" height="314" rx="46" fill="url(#cyto)" stroke="#b6f26a" strokeWidth={5} opacity={0.95} onClick={onClick('wall')} style={{ cursor: 'pointer', ...ring('wall') }} />
                <rect x="20" y="20" width="430" height="290" rx="38" fill="none" stroke="#63e6f5" strokeWidth={2.4} opacity={0.8} onClick={onClick('membrane')} style={{ cursor: 'pointer', ...ring('membrane') }} />
              </>
            ) : (
              <>
                <ellipse cx="235" cy="168" rx="206" ry="148" fill="url(#cyto)" stroke="#63e6f5" strokeWidth={4} onClick={onClick('membrane')} style={{ cursor: 'pointer', ...ring('membrane') }} />
                <circle cx="78" cy="235" r="7" fill="#a78bfa" opacity={0.9} onClick={onClick('centro')} style={{ cursor: 'pointer' }} />
                <circle cx="100" cy="228" r="7" fill="#a78bfa" opacity={0.9} onClick={onClick('centro')} style={{ cursor: 'pointer' }} />
                <text x="62" y="262" fill="#a78bfa" fontSize="8" fontFamily="monospace">centriole</text>
              </>
            )}

            {type === 'plant' && (
              <>
                <ellipse cx="300" cy="170" rx="118" ry="82" fill="rgba(125,211,252,0.13)" stroke="#7dd3fc" strokeWidth={2} opacity={0.9} onClick={onClick('vacuole')} style={{ cursor: 'pointer', ...ring('vacuole') }} />
                <text x="300" y="174" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="monospace" opacity={0.9}>vacuole</text>
              </>
            )}

            {/* ER around nucleus */}
            <g onClick={onClick('er')} style={{ cursor: 'pointer', ...ring('er') }}>
              <path d="M118 118 q34 12 20 40 q-14 28 22 36" fill="none" stroke="#fbbf24" strokeWidth={2.4} opacity={0.75} />
              <path d="M130 104 q44 14 26 50" fill="none" stroke="#fbbf24" strokeWidth={2.4} opacity={0.55} />
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx={122 + (i % 3) * 9} cy={112 + i * 11} r={1.9} fill="#fbbf24" />
              ))}
            </g>

            {/* nucleus */}
            <g onClick={onClick('nucleus')} style={{ cursor: 'pointer', ...ring('nucleus') }}>
              <circle cx="150" cy="176" r="52" fill="rgba(196,181,253,0.16)" stroke="#c4b5fd" strokeWidth={2.4} />
              <circle cx="150" cy="176" r="19" fill="rgba(196,181,253,0.35)" stroke="#c4b5fd" strokeWidth={1.4} />
              <path d="M120 160 q18 10 34 2 q16 -8 32 6 M118 190 q20 8 36 0 q18 -8 32 2" fill="none" stroke="#c4b5fd" strokeWidth={1.2} opacity={0.8} />
              <text x="150" y="244" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="monospace">nucleus</text>
            </g>

            {/* mitochondria */}
            {[[248, 78, 20], [372, 262, -18], [206, 268, 10]].map(([cx, cy, rot], idx) => (
              <g key={idx} onClick={onClick('mito')} style={{ cursor: 'pointer' }}>
                <g transform={`rotate(${rot} ${cx} ${cy})`}>
                  <ellipse cx={cx} cy={cy} rx={34} ry={16} fill="rgba(251,113,133,0.16)" stroke="#fb7185" strokeWidth={2} {...(active.id === 'mito' ? { style: { filter: 'drop-shadow(0 0 6px rgba(251,113,133,.8))' } } : {})} />
                  <path d={`M${cx - 24} ${cy} l7 -7 l5 13 l6 -13 l6 13 l6 -13 l6 13`} fill="none" stroke="#fb7185" strokeWidth={1.5} />
                </g>
              </g>
            ))}
            <text x="248" y="52" textAnchor="middle" fill="#fb7185" fontSize="9" fontFamily="monospace">mitochondria</text>

            {/* chloroplasts (plant) */}
            {type === 'plant' && (
              <>
                {[[300, 74, 22], [392, 170, -34], [286, 272, 8]].map(([cx, cy, rot], idx) => (
                  <g key={idx} onClick={onClick('chloro')} style={{ cursor: 'pointer' }}>
                    <g transform={`rotate(${rot} ${cx} ${cy})`}>
                      <ellipse cx={cx} cy={cy} rx={31} ry={15} fill="rgba(74,222,128,0.16)" stroke="#4ade80" strokeWidth={2} {...(active.id === 'chloro' ? { style: { filter: 'drop-shadow(0 0 6px rgba(74,222,128,.8))' } } : {})} />
                      {[-12, 0, 12].map((dx) => (
                        <g key={dx}>
                          <line x1={cx + dx} y1={cy - 7} x2={cx + dx} y2={cy + 7} stroke="#4ade80" strokeWidth={2} />
                          <line x1={cx + dx - 4} y1={cy - 3} x2={cx + dx + 4} y2={cy - 3} stroke="#4ade80" strokeWidth={1} />
                          <line x1={cx + dx - 4} y1={cy + 3} x2={cx + dx + 4} y2={cy + 3} stroke="#4ade80" strokeWidth={1} />
                        </g>
                      ))}
                    </g>
                  </g>
                ))}
                <text x="300" y="42" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">chloroplast</text>
              </>
            )}

            {/* golgi */}
            <g onClick={onClick('golgi')} style={{ cursor: 'pointer', ...ring('golgi') }}>
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${44 + i * 2} ${128 + i * 9} q22 -12 44 0`} fill="none" stroke="#f472b6" strokeWidth={3} opacity={0.85 - i * 0.15} />
              ))}
              <text x="66" y="168" textAnchor="middle" fill="#f472b6" fontSize="9" fontFamily="monospace">Golgi</text>
            </g>

            {/* ribosomes + lysosomes */}
            {[[210, 128], [226, 142], [196, 150], [336, 220], [352, 206]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.6} fill="#e2e8f0" opacity={0.85} onClick={onClick('ribo')} style={{ cursor: 'pointer' }} />
            ))}
            {[[92, 272], [126, 286], [162, 268]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={8} fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth={1.6} onClick={onClick('lyso')} style={{ cursor: 'pointer', ...(active.id === 'lyso' ? { filter: 'drop-shadow(0 0 6px rgba(245,158,11,.8))' } : {}) }} />
            ))}
            <text x="124" y="308" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">lysosomes</text>
          </svg>
          <div className="row wrap gap-6 mt-8">
            {visible.map((o) => (
              <button key={o.id} className="chip" onClick={() => setSel(o.id)} style={{ borderColor: active.id === o.id ? o.color : undefined, color: active.id === o.id ? o.color : undefined }}>
                {o.name}
              </button>
            ))}
          </div>
        </div>

        <div className="stack gap-14">
          <div className="card" style={{ borderColor: `${active.color}44` }}>
            <div className="row gap-10">
              <span style={{ width: 12, height: 12, borderRadius: 4, background: active.color }} />
              <div className="kicker" style={{ color: active.color }}>{active.plantOnly ? 'Plant only' : active.animalOnly ? 'Animal only' : 'Plant & animal'}</div>
            </div>
            <h3 className="h2 mt-8">{active.name}</h3>
            <p className="mt-8" style={{ color: '#c3d2e2' }}>{active.job}</p>
            <div className="keyline"><b>Quiz fact</b>{active.fact}</div>
          </div>

          <div className="card tight">
            <div className="kicker">The five definitions to memorise</div>
            <div className="stack gap-6 mt-8 small" style={{ color: '#c3d2e2' }}>
              <div><b style={{ color: 'var(--science)' }}>Osmosis</b> — water across a semi-permeable membrane, dilute → concentrated.</div>
              <div><b style={{ color: 'var(--science)' }}>Plasmolysis</b> — plant cell loses water, protoplast shrinks from the wall.</div>
              <div><b style={{ color: 'var(--science)' }}>Mitosis</b> — 1 cell → 2 identical diploid cells.</div>
              <div><b style={{ color: 'var(--science)' }}>Meiosis</b> — 1 cell → 4 non-identical haploid gametes.</div>
              <div><b style={{ color: 'var(--science)' }}>Selective permeability</b> — the membrane lets some substances through and blocks others.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
