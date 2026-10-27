import { useMemo, useState } from 'react'

type Dir = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
const VEC: Record<Dir, [number, number]> = {
  N: [0, 1], NE: [1, 1], E: [1, 0], SE: [1, -1], S: [0, -1], SW: [-1, -1], W: [-1, 0], NW: [-1, 1],
}

const CELL = 26
const HALF = 7
const SIZE = (HALF * 2 + 1) * CELL

export default function DirectionLab() {
  const [moves, setMoves] = useState<Dir[]>([])
  const [step, setStep] = useState(3)

  const path = useMemo(() => {
    let x = 0, y = 0
    const pts: [number, number][] = [[0, 0]]
    for (const m of moves) {
      x += VEC[m][0] * step
      y += VEC[m][1] * step
      pts.push([x, y])
    }
    return { pts, x, y }
  }, [moves, step])

  const { pts, x, y } = path
  const distanceWalked = moves.length * step
  const straight = Math.round(Math.hypot(x, y) * 100) / 100
  const direction = compass(x, y)

  function push(d: Dir) {
    if (moves.length >= 40) return
    setMoves((m) => [...m, d])
  }

  function randomWalk() {
    const dirs: Dir[] = ['N', 'E', 'S', 'W', 'N', 'E', 'S', 'W', 'NE', 'SW']
    const list: Dir[] = []
    for (let i = 0; i < 8; i++) list.push(dirs[Math.floor(Math.random() * dirs.length)])
    setMoves(list)
    setStep(1 + Math.floor(Math.random() * 5))
  }

  const toScreen = (gx: number, gy: number): [number, number] => [
    SIZE / 2 + gx * CELL,
    SIZE / 2 - gy * CELL,
  ]

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · direction bench</div>
          <h2 className="h2 mt-8">Walk it. Measure the shortest way back.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            Distance walked adds up. Displacement is the straight line from start to finish. Quizmasters ask both — often in the same question.
          </p>
        </div>
        <div className="pill-toggle">
          {[1, 2, 3, 5].map((s) => (
            <button key={s} className={step === s ? 'on' : ''} onClick={() => setStep(s)}>
              {s} km
            </button>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card" style={{ display: 'grid', placeItems: 'center' }}>
          <svg width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ maxWidth: 380, overflow: 'visible' }}>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#63e6f5" />
              </marker>
            </defs>
            <rect x={0} y={0} width={SIZE} height={SIZE} fill="rgba(255,255,255,0.02)" rx={10} />
            {Array.from({ length: HALF * 2 + 1 }, (_, idx) => (
              <g key={idx}>
                <line x1={idx * CELL} y1={0} x2={idx * CELL} y2={SIZE} stroke="rgba(255,255,255,0.05)" />
                <line x1={0} y1={idx * CELL} x2={SIZE} y2={idx * CELL} stroke="rgba(255,255,255,0.05)" />
              </g>
            ))}
            <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} stroke="rgba(99,230,245,0.22)" strokeDasharray="3 4" />
            <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} stroke="rgba(99,230,245,0.22)" strokeDasharray="3 4" />
            <text x={SIZE / 2} y={12} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">N</text>
            <text x={SIZE / 2} y={SIZE - 3} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">S</text>
            <text x={SIZE - 8} y={SIZE / 2 + 3} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">E</text>
            <text x={8} y={SIZE / 2 + 3} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">W</text>

            {pts.length > 1 && (
              <polyline
                points={pts.map(([gx, gy]) => toScreen(gx, gy).join(',')).join(' ')}
                fill="none"
                stroke="rgba(99,230,245,0.4)"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeDasharray="5 5"
              />
            )}
            {pts.length > 1 && (
              <line
                x1={toScreen(0, 0)[0]}
                y1={toScreen(0, 0)[1]}
                x2={toScreen(x, y)[0]}
                y2={toScreen(x, y)[1]}
                stroke="#b6f26a"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
            )}
            <circle cx={toScreen(0, 0)[0]} cy={toScreen(0, 0)[1]} r={5} fill="#eaf3fd" />
            <circle cx={toScreen(x, y)[0]} cy={toScreen(x, y)[1]} r={6} fill="#b6f26a" stroke="#06101d" strokeWidth={2} />
            <text x={toScreen(x, y)[0] + 9} y={toScreen(x, y)[1] - 8} fill="#b6f26a" fontSize="10" fontFamily="monospace">
              you
            </text>
          </svg>
        </div>

        <div className="stack gap-14">
          <div className="card tight">
            <div className="row spread">
              <div className="stat">
                <b>{distanceWalked} km</b>
                <span>distance walked</span>
              </div>
              <div className="stat">
                <b style={{ color: 'var(--science)' }}>{straight} km</b>
                <span>shortest distance</span>
              </div>
              <div className="stat">
                <b style={{ color: 'var(--maths)' }}>{direction ?? '—'}</b>
                <span>from start</span>
              </div>
            </div>
            <div className="small dim mt-8">
              Net: {x >= 0 ? `${x} km east` : `${-x} km west`}, {y >= 0 ? `${y} km north` : `${-y} km south`} ·
              Pythagoras: √({x}² + {y}²) = {straight}
            </div>
          </div>

          <div className="card tight">
            <div className="spread">
              <div className="kicker">Step pad</div>
              <span className="tiny dim">{moves.length} moves</span>
            </div>
            <div className="row mt-14" style={{ alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <div className="dpad">
                <span />
                <button onClick={() => push('N')}>N ↑</button>
                <span />
                <button onClick={() => push('W')}>W ←</button>
                <button onClick={() => push('NE')} style={{ fontSize: 10 }}>NE ↗</button>
                <button onClick={() => push('E')}>E →</button>
                <span />
                <button onClick={() => push('S')}>S ↓</button>
                <span />
              </div>
              <div className="stack gap-6">
                {(['NW', 'SE', 'SW'] as Dir[]).map((d) => (
                  <button key={d} className="btn sm" onClick={() => push(d)}>
                    {d} {d === 'NW' ? '↖' : d === 'SE' ? '↘' : '↙'}
                  </button>
                ))}
              </div>
            </div>
            <div className="row wrap gap-6 mt-14">
              <button className="btn sm ghost" onClick={() => setMoves((m) => m.slice(0, -1))} disabled={!moves.length}>
                Undo
              </button>
              <button className="btn sm ghost" onClick={() => setMoves([])} disabled={!moves.length}>
                Reset
              </button>
              <button className="btn sm" onClick={randomWalk}>
                🎲 Random walk
              </button>
            </div>
            <div className="tiny dim mt-14">
              Rule: right turn = 90° clockwise. Facing north, right takes you east. Two rights = about-turn.
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card tight">
          <div className="kicker amber">Pythagoras reflex</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>
            3-4-5 · 5-12-13 · 6-8-10 · 8-15-17 · 7-24-25. Spot a pair → answer instantly.
          </p>
        </div>
        <div className="card tight">
          <div className="kicker amber">Shadow logic</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>
            Morning Sun is in the East → shadow falls West. Evening → shadow falls East. At noon in India, the Sun is in the South → shadow North.
          </p>
        </div>
        <div className="card tight">
          <div className="kicker amber">Read carefully</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>
            “Total distance covered” = add the steps. “How far from the start” = straight line. Two different numbers.
          </p>
        </div>
      </div>
    </div>
  )
}

function compass(x: number, y: number): Dir | null {
  if (x === 0 && y === 0) return null
  const ax = Math.abs(x), ay = Math.abs(y)
  if (ax === 0) return y > 0 ? 'N' : 'S'
  if (ay === 0) return x > 0 ? 'E' : 'W'
  const ratio = ax / ay
  if (ratio > 2) return x > 0 ? 'E' : 'W'
  if (ratio < 0.5) return y > 0 ? 'N' : 'S'
  return `${y > 0 ? 'N' : 'S'}${x > 0 ? 'E' : 'W'}` as Dir
}
