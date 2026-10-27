import { useMemo, useState } from 'react'

type PaintMode = 'all' | 'one' | 'opposite' | 'adjacent'

const COS30 = Math.cos(Math.PI / 6)

function project(x: number, y: number, z: number, n: number) {
  const s = 168 / n
  return {
    x: 200 + (x - y) * COS30 * s,
    y: 26 + n * s + (x + y) * 0.5 * s - z * s,
  }
}

export default function CubeLab() {
  const [n, setN] = useState(4)
  const [mode, setMode] = useState<PaintMode>('all')
  const [open, setOpen] = useState<number | null>(null)

  const stats = useMemo(() => {
    const k = n - 2
    const three = 8
    const two = 12 * Math.max(0, k)
    const one = 6 * Math.max(0, k) * Math.max(0, k)
    const zero = Math.max(0, k) ** 3
    return {
      three, two, one, zero,
      total: n ** 3,
      variants: {
        all: { painted: n ** 3, unpainted: 0 },
        one: { painted: n * n, unpainted: n ** 3 - n * n },
        opposite: { painted: 2 * n * n, unpainted: n ** 3 - 2 * n * n },
        adjacent: { painted: 2 * n * n - n, unpainted: n ** 3 - 2 * n * n + n },
      },
    }
  }, [n])

  const faceStyles = (face: 'top' | 'left' | 'right') => {
    const painted =
      mode === 'all' ||
      (mode === 'one' && face === 'top') ||
      (mode === 'opposite' && face === 'top') ||
      (mode === 'adjacent' && (face === 'top' || face === 'left'))
    return {
      fill: painted ? 'rgba(182,242,106,0.20)' : 'rgba(255,255,255,0.045)',
      stroke: painted ? 'rgba(182,242,106,0.55)' : 'rgba(255,255,255,0.25)',
    }
  }

  const top = [project(0, 0, n, n), project(n, 0, n, n), project(n, n, n, n), project(0, n, n, n)]
  const left = [project(0, 0, 0, n), project(n, 0, 0, n), project(n, 0, n, n), project(0, 0, n, n)]
  const right = [project(n, 0, 0, n), project(n, n, 0, n), project(n, n, n, n), project(n, 0, n, n)]

  const lines = useMemo(() => {
    const out: { a: { x: number; y: number }; b: { x: number; y: number }; key: string }[] = []
    for (let k = 1; k < n; k++) {
      out.push({ a: project(k, 0, n, n), b: project(k, n, n, n), key: `t1-${k}` })
      out.push({ a: project(0, k, n, n), b: project(n, k, n, n), key: `t2-${k}` })
      out.push({ a: project(k, 0, 0, n), b: project(k, 0, n, n), key: `l1-${k}` })
      out.push({ a: project(n, 0, k, n), b: project(n, n, k, n), key: `r1-${k}` })
      out.push({ a: project(n, k, 0, n), b: project(n, k, n, n), key: `r2-${k}` })
      out.push({ a: project(0, 0, k, n), b: project(n, 0, k, n), key: `l2-${k}` })
    }
    return out
  }, [n])

  const variant = stats.variants[mode]

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · painted cube</div>
          <h2 className="h2 mt-8">Every count comes from a corner, an edge, a face — or the inside.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            Slide n. The formulas stay the same — only the arithmetic changes. Check that the four categories add back to n³.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="spread">
            <div className="kicker">The cube</div>
            <span className="chip science">n = {n}</span>
          </div>
          <svg viewBox="0 0 400 400" style={{ width: '100%', maxHeight: 380 }} role="img" aria-label={`Painted cube of side ${n}`}>
            <polygon points={left.map((p) => `${p.x},${p.y}`).join(' ')} {...faceStyles('left')} strokeWidth={1.5} />
            <polygon points={right.map((p) => `${p.x},${p.y}`).join(' ')} {...faceStyles('right')} strokeWidth={1.5} />
            <polygon points={top.map((p) => `${p.x},${p.y}`).join(' ')} {...faceStyles('top')} strokeWidth={1.5} />
            {lines.map((l) => (
              <line key={l.key} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke="rgba(255,255,255,0.16)" strokeWidth={0.8} />
            ))}
            <text x={200} y={385} textAnchor="middle" fill="#63788f" fontSize="10" fontFamily="monospace">
              {n} × {n} × {n} = {stats.total} small cubes
            </text>
          </svg>
          <div className="row wrap gap-6">
            {(
              [
                ['all', 'All 6 faces'],
                ['one', '1 face'],
                ['opposite', '2 opposite'],
                ['adjacent', '2 adjacent'],
              ] as [PaintMode, string][]
            ).map(([key, label]) => (
              <button key={key} className={`btn sm ${mode === key ? 'primary' : 'ghost'}`} onClick={() => setMode(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="stack gap-14">
          <div className="card tight">
            <div className="spread">
              <div className="kicker">How many small cubes have…</div>
              <span className="chip amber">paint count</span>
            </div>
            {mode === 'all' ? (
              <table className="calc mt-8">
                <thead>
                  <tr>
                    <th>Painted faces</th>
                    <th>Formula</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['3 faces (corners)', '8', stats.three],
                    ['2 faces (edges)', '12(n − 2)', stats.two],
                    ['1 face (face centres)', '6(n − 2)²', stats.one],
                    ['0 faces (inside)', '(n − 2)³', stats.zero],
                  ].map(([label, formula, count], idx) => (
                    <tr key={label as string} className={open === idx ? 'highlight' : ''} onClick={() => setOpen(open === idx ? null : idx)} style={{ cursor: 'pointer' }}>
                      <td>{label}</td>
                      <td className="mono dim" style={{ fontSize: 12 }}>{formula}</td>
                      <td className="num" style={{ fontSize: 16 }}>{count as number}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="muted">Total check</td>
                    <td className="mono dim" style={{ fontSize: 12 }}>sum</td>
                    <td className="mono" style={{ color: 'var(--green)', fontSize: 16 }}>
                      {stats.three + stats.two + stats.one + stats.zero} = {stats.total} ✓
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <>
                <div className="row mt-14" style={{ alignItems: 'baseline', gap: 10 }}>
                  <div className="score-big">{variant.painted}</div>
                  <div className="muted small">painted cubes</div>
                </div>
                <table className="calc mt-8">
                  <tbody>
                    <tr><td>Painted</td><td className="num">{variant.painted}</td></tr>
                    <tr><td>Unpainted</td><td className="num">{variant.unpainted}</td></tr>
                    <tr><td>Total</td><td className="num">{stats.total}</td></tr>
                  </tbody>
                </table>
                <div className="small dim mt-8">
                  {mode === 'one' && 'One face painted → that single slab has n² cubes.'}
                  {mode === 'opposite' && 'Two opposite faces never overlap → 2n² cubes.'}
                  {mode === 'adjacent' && 'Two adjacent faces share an edge of n cubes → 2n² − n.'}
                </div>
              </>
            )}
          </div>

          <div className="card tight">
            <div className="kicker amber">The 20-second table</div>
            <table className="calc mt-8">
              <thead>
                <tr>
                  <th>n</th>
                  <th>3 faces</th>
                  <th>2 faces</th>
                  <th>1 face</th>
                  <th>0 faces</th>
                </tr>
              </thead>
              <tbody>
                {[3, 4, 5, 6].map((v) => {
                  const k = v - 2
                  return (
                    <tr key={v} className={v === n ? 'highlight' : ''}>
                      <td className="num" style={{ color: 'var(--text)' }}>{v}</td>
                      <td className="num">8</td>
                      <td className="num">{12 * k}</td>
                      <td className="num">{6 * k * k}</td>
                      <td className="num">{k ** 3}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="tiny dim mt-8">Total cubes: n³. 3 faces is always 8 — no matter how big the cube.</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="spread">
          <div>
            <div className="kicker">Slide n</div>
            <div className="small muted">From 2 to 8. Watch the inside cube grow fastest.</div>
          </div>
          <span className="mono" style={{ fontSize: 22, color: 'var(--maths)' }}>n = {n}</span>
        </div>
        <input className="slider mt-14" type="range" min={2} max={8} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        <div className="row spread mt-8">
          {[2, 3, 4, 5, 6, 7, 8].map((v) => (
            <button key={v} className="tiny mono dim" onClick={() => setN(v)} style={{ background: 'none', border: 0, padding: 4, color: v === n ? 'var(--maths)' : 'var(--dim)' }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <DiceLab />
    </div>
  )
}

/* ───────────────────────── dice ───────────────────────── */
type Faces = { U: number; D: number; F: number; B: number; L: number; R: number }
const START: Faces = { U: 1, D: 6, F: 2, B: 5, R: 3, L: 4 }

const rollRight = (f: Faces): Faces => ({ ...f, U: f.L, R: f.U, D: f.R, L: f.D })
const rollLeft = (f: Faces): Faces => ({ ...f, U: f.R, R: f.D, D: f.L, L: f.U })
const rollAway = (f: Faces): Faces => ({ ...f, F: f.U, U: f.B, B: f.D, D: f.F })
const rollToward = (f: Faces): Faces => ({ ...f, F: f.D, D: f.B, B: f.U, U: f.F })

function dicePoint(x: number, y: number, z: number) {
  const s = 62
  return { x: 110 + (x - y) * COS30 * s, y: 70 + (x + y) * 0.5 * s - z * s }
}

export function DiceLab() {
  const [f, setF] = useState<Faces>(START)
  const [peek, setPeek] = useState(false)
  const [rolls, setRolls] = useState(0)

  const top = [dicePoint(0, 0, 1), dicePoint(1, 0, 1), dicePoint(1, 1, 1), dicePoint(0, 1, 1)]
  const left = [dicePoint(0, 0, 0), dicePoint(1, 0, 0), dicePoint(1, 0, 1), dicePoint(0, 0, 1)]
  const right = [dicePoint(1, 0, 0), dicePoint(1, 1, 0), dicePoint(1, 1, 1), dicePoint(1, 0, 1)]

  const centre = (pts: { x: number; y: number }[]) => ({
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  })

  const cTop = centre(top)
  const cLeft = centre(left)
  const cRight = centre(right)

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div>
          <div className="kicker maths">Dice bench</div>
          <h3 className="h2 mt-8">Opposite faces always sum to 7.</h3>
          <p className="small muted mt-8">
            Roll the die. The three visible faces are mutually adjacent, so they can never contain an opposite pair.
          </p>
          <div className="row wrap gap-6 mt-14">
            <button className="btn sm" onClick={() => { setF(rollLeft); setRolls((r) => r + 1) }}>← Roll left</button>
            <button className="btn sm" onClick={() => { setF(rollRight); setRolls((r) => r + 1) }}>Roll right →</button>
            <button className="btn sm" onClick={() => { setF(rollAway); setRolls((r) => r + 1) }}>↷ Roll away</button>
            <button className="btn sm" onClick={() => { setF(rollToward); setRolls((r) => r + 1) }}>↶ Roll toward</button>
            <button className="btn sm ghost" onClick={() => { setF(START); setRolls(0); setPeek(false) }}>Reset</button>
          </div>
          <div className="grid-2 keep-2 mt-20" style={{ gap: 8 }}>
            <div className="panel-soft center">
              <div className="mirror-label">Visible</div>
              <div className="mono" style={{ fontSize: 14 }}>
                top {f.U} · front {f.F} · right {f.R}
              </div>
            </div>
            <div className="panel-soft center">
              <div className="mirror-label">Opposites</div>
              <div className="mono" style={{ fontSize: 14 }}>
                {f.U}+{f.D} · {f.F}+{f.B} · {f.L}+{f.R}
              </div>
            </div>
          </div>
          <button className={`btn sm mt-14 ${peek ? 'primary' : 'ghost'}`} onClick={() => setPeek((p) => !p)}>
            {peek ? 'Hide hidden faces' : 'Peek at hidden faces'}
          </button>
          {peek && (
            <div className="small mt-14" style={{ color: '#c3d2e2' }}>
              Bottom = {f.D} · Back = {f.B} · Left = {f.L}. Rolls so far: {rolls}. Every pair still adds to 7.
            </div>
          )}
        </div>

        <div style={{ display: 'grid', placeItems: 'center' }}>
          <svg width="240" height="240" viewBox="0 0 220 230">
            <polygon points={left.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" />
            <polygon points={right.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(255,255,255,0.11)" stroke="rgba(255,255,255,0.25)" />
            <polygon points={top.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(99,230,245,0.16)" stroke="rgba(99,230,245,0.4)" />
            <text x={cTop.x} y={cTop.y + 8} textAnchor="middle" fill="#eaf3fd" fontSize="26" fontWeight="800" fontFamily="monospace">{f.U}</text>
            <text x={cLeft.x} y={cLeft.y + 8} textAnchor="middle" fill="#eaf3fd" fontSize="26" fontWeight="800" fontFamily="monospace">{f.F}</text>
            <text x={cRight.x} y={cRight.y + 8} textAnchor="middle" fill="#eaf3fd" fontSize="26" fontWeight="800" fontFamily="monospace">{f.R}</text>
            <text x={cTop.x + 4} y={cTop.y - 22} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">TOP</text>
            <text x={cLeft.x - 22} y={cLeft.y + 26} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">FRONT</text>
            <text x={cRight.x + 26} y={cRight.y + 26} textAnchor="middle" fill="#8fa5bd" fontSize="9" fontFamily="monospace">RIGHT</text>
          </svg>
        </div>
      </div>

      <div className="divider" />
      <div className="grid-3">
        <div>
          <div className="kicker amber">Rule 1</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>Standard die: (1,6), (2,5), (3,4). Opposite = 7 − face.</p>
        </div>
        <div>
          <div className="kicker amber">Rule 2</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>Two views sharing two faces → the remaining faces are opposite.</p>
        </div>
        <div>
          <div className="kicker amber">Rule 3</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>A corner view shows one face from each opposite pair — never a pair together.</p>
        </div>
      </div>
    </div>
  )
}
