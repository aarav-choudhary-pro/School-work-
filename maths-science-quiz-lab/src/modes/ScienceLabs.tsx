import { useMemo, useState } from 'react'

/* ─────────────────────── LAWS OF MOTION ─────────────────────── */
export function MotionLab() {
  const [m, setM] = useState(5)
  const [a, setA] = useState(2)
  const [v, setV] = useState(4)
  const force = m * a
  const momentum = m * v

  const [quiz, setQuiz] = useState(() => newMotionQ())
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setChecked(true)
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">Lab · force bench</div>
          <h2 className="h2 mt-8">Push a mass. Read the numbers.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            F = ma is the one equation that solves almost every numerical in this round. Change mass and acceleration, watch the force.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div style={{ height: 130, position: 'relative', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,.18)' }}>
            <div
              style={{
                position: 'absolute', bottom: 18, left: 24, width: 62, height: 62, borderRadius: 10,
                background: 'linear-gradient(150deg, rgba(182,242,106,.3), rgba(182,242,106,.1))',
                border: '1px solid rgba(182,242,106,.55)',
                transition: 'transform .35s ease',
                transform: `translateX(${Math.min(240, force * 2.2)}px)`,
                display: 'grid', placeItems: 'center', fontWeight: 800, fontFamily: 'var(--mono)',
              }}
            >
              {m} kg
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18, background: 'rgba(255,255,255,.05)' }} />
            <div style={{ position: 'absolute', left: 30, bottom: 92, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--science)' }}>
              F = {force} N →
            </div>
            <div style={{ position: 'absolute', right: 14, top: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dim)' }}>
              a = {a} m/s²
            </div>
          </div>

          <div className="mt-20">
            <div className="spread small">
              <span>Mass</span>
              <span className="mono" style={{ color: 'var(--science)' }}>{m} kg</span>
            </div>
            <input className="slider mt-8" type="range" min={1} max={20} value={m} onChange={(e) => setM(Number(e.target.value))} />
          </div>
          <div className="mt-14">
            <div className="spread small">
              <span>Acceleration</span>
              <span className="mono" style={{ color: 'var(--science)' }}>{a} m/s²</span>
            </div>
            <input className="slider mt-8" type="range" min={0} max={10} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
          </div>
          <div className="mt-14">
            <div className="spread small">
              <span>Velocity (for momentum)</span>
              <span className="mono" style={{ color: 'var(--science)' }}>{v} m/s</span>
            </div>
            <input className="slider mt-8" type="range" min={0} max={20} value={v} onChange={(e) => setV(Number(e.target.value))} />
          </div>

          <div className="grid-2 keep-2 mt-20">
            <div className="panel-soft center">
              <div className="mirror-label">Force</div>
              <div className="mono" style={{ fontSize: 26, fontWeight: 800, color: 'var(--science)' }}>{force} N</div>
            </div>
            <div className="panel-soft center">
              <div className="mirror-label">Momentum</div>
              <div className="mono" style={{ fontSize: 26, fontWeight: 800, color: 'var(--maths)' }}>{momentum}</div>
            </div>
          </div>
          <div className="tiny dim mt-8">
            F = {m} × {a} = {force} N · p = {m} × {v} = {momentum} kg·m/s · weight = {m} × 9.8 = {(m * 9.8).toFixed(1)} N
          </div>
        </div>

        <div className="stack gap-14">
          <div className="card tight">
            <div className="spread">
              <div className="kicker amber">One-question numerical</div>
              <button className="btn sm ghost" onClick={() => { setQuiz(newMotionQ()); setGuess(''); setChecked(false) }}>New</button>
            </div>
            <p className="mt-14" style={{ fontWeight: 650, fontSize: 16 }}>{quiz.text}</p>
            <form onSubmit={submit} className="input-row mt-14">
              <input value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Answer in N" disabled={checked} inputMode="decimal" />
              <button className="btn lime" type="submit" disabled={checked || !guess.trim()}>Check</button>
            </form>
            {checked && (
              <div className={`feedback ${Number(guess.replace(/[^0-9.\-]/g, '')) === quiz.answer ? 'ok' : 'no'} mt-14`}>
                <span className="verdict">{Number(guess.replace(/[^0-9.\-]/g, '')) === quiz.answer ? 'Correct' : `Answer: ${quiz.answer} N`}</span>
                {quiz.explain}
              </div>
            )}
          </div>

          <div className="card tight">
            <div className="kicker">Formula sheet</div>
            <div className="stack gap-6 mt-8 mono small" style={{ color: '#c3d2e2' }}>
              <div>F = ma</div>
              <div>p = mv</div>
              <div>Impulse = F·t = Δp</div>
              <div>W = mg (g ≈ 9.8)</div>
              <div>v = u + at</div>
            </div>
            <div className="tiny dim mt-8">Units: N = kg·m/s² · momentum kg·m/s · 1 kg-wt = 9.8 N</div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card tight">
          <div className="kicker science">First law · inertia</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>Coin on a card, card flicked → coin drops in. No force on the coin, so no change in motion.</p>
        </div>
        <div className="card tight">
          <div className="kicker science">Second law</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>Heavier or faster-accelerating → more force. The same push moves a lighter trolley faster.</p>
        </div>
        <div className="card tight">
          <div className="kicker science">Third law · trap</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>Action and reaction act on different bodies. If they acted on the same body, nothing could ever start moving.</p>
        </div>
      </div>
    </div>
  )
}

function newMotionQ() {
  const m = 2 + Math.floor(Math.random() * 18)
  const a = 1 + Math.floor(Math.random() * 8)
  return {
    text: `A ${m} kg body accelerates at ${a} m/s². What net force acts on it?`,
    answer: m * a,
    explain: `F = ma = ${m} × ${a} = ${m * a} N.`,
  }
}

/* ─────────────────────── FIBRE TO FABRIC ─────────────────────── */
type Cat = 'plant' | 'animal' | 'synthetic'
const FIBRE_ITEMS: { name: string; cat: Cat; note: string }[] = [
  { name: 'Cotton', cat: 'plant', note: 'Seed hair; ginning separates it from seeds.' },
  { name: 'Jute', cat: 'plant', note: 'Stem fibre; retting loosens it. “Golden fibre”.' },
  { name: 'Wool', cat: 'animal', note: 'Fleece of sheep; shearing → scouring → spinning.' },
  { name: 'Silk', cat: 'animal', note: 'Cocoon filament of Bombyx mori; reeling unwinds it.' },
  { name: 'Nylon', cat: 'synthetic', note: 'First fully synthetic fibre (1935, Carothers).' },
  { name: 'Rayon', cat: 'synthetic', note: 'Semi-synthetic — regenerated cellulose from wood pulp.' },
  { name: 'Flax', cat: 'plant', note: 'Plant stem fibre; gives linen.' },
  { name: 'Polyester', cat: 'synthetic', note: 'Petroleum-based; strong, quick-drying, non-biodegradable.' },
  { name: 'Pashmina', cat: 'animal', note: 'Changthangi goat of Ladakh.' },
  { name: 'Coir', cat: 'plant', note: 'Coconut husk fibre.' },
]

export function FibreLab() {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<Cat | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const item = FIBRE_ITEMS[i]

  function pick(cat: Cat) {
    if (picked) return
    setPicked(cat)
    if (cat === item.cat) setScore((s) => s + 1)
  }
  function next() {
    if (i + 1 >= FIBRE_ITEMS.length) { setDone(true); return }
    setI(i + 1)
    setPicked(null)
  }
  function restart() {
    setI(0); setPicked(null); setScore(0); setDone(false)
  }

  const chain = useMemo(
    () => [
      { title: 'Fibre', body: 'Cotton boll · jute stem · sheep fleece · silk cocoon' },
      { title: 'Yarn', body: 'Spinning draws and twists fibres together' },
      { title: 'Fabric', body: 'Weaving (two sets of yarn) or knitting (interlocking loops)' },
    ],
    [],
  )

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">Lab · fibre sorter</div>
          <h2 className="h2 mt-8">Plant, animal or synthetic?</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            This is the fastest Mark in the whole round. Ten fibres, three boxes — go.
          </p>
        </div>
        <div className="stat">
          <b>{score} / {FIBRE_ITEMS.length}</b>
          <span>correct</span>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          {done ? (
            <div className="center" style={{ padding: '18px 0' }}>
              <div className="kicker amber">Sorter complete</div>
              <div className="score-big mt-8">{score}/{FIBRE_ITEMS.length}</div>
              <p className="small muted mt-8">Every one of these could appear as a one-word question.</p>
              <button className="btn primary mt-20" onClick={restart}>Sort again</button>
            </div>
          ) : (
            <>
              <div className="row spread">
                <span className="q-meta">Fibre {i + 1} / {FIBRE_ITEMS.length}</span>
                <span className="q-meta" style={{ color: 'var(--green)' }}>✓ {score}</span>
              </div>
              <div className="q-prompt mt-14" style={{ fontSize: 36 }}>{item.name}</div>
              <div className="options mt-20">
                {([
                  ['plant', 'Plant fibre'],
                  ['animal', 'Animal fibre'],
                  ['synthetic', 'Synthetic / semi-synthetic'],
                ] as [Cat, string][]).map(([cat, label]) => {
                  const state = picked ? (cat === item.cat ? 'correct' : cat === picked ? 'wrong' : 'dimmed') : ''
                  return (
                    <button key={cat} className={`option ${state}`} onClick={() => pick(cat)} disabled={!!picked}>
                      <span className="key">{cat === 'plant' ? '🌿' : cat === 'animal' ? '🐑' : '⚗️'}</span>
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
              {picked && (
                <>
                  <div className={`feedback ${picked === item.cat ? 'ok' : 'no'} mt-14`}>
                    <span className="verdict">{picked === item.cat ? 'Correct' : `It is ${item.cat}`}</span>
                    {item.note}
                  </div>
                  <button className="btn primary mt-14" onClick={next}>{i + 1 >= FIBRE_ITEMS.length ? 'See score' : 'Next fibre'} →</button>
                </>
              )}
            </>
          )}
        </div>

        <div className="stack gap-14">
          <div className="card tight">
            <div className="kicker">Fibre → yarn → fabric</div>
            <div className="stack gap-10 mt-14">
              {chain.map((c, idx) => (
                <div key={c.title} className="row gap-10" style={{ alignItems: 'flex-start' }}>
                  <span className="concept-num">{idx + 1}</span>
                  <div>
                    <b style={{ fontSize: 14 }}>{c.title}</b>
                    <div className="tiny dim">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card tight">
            <div className="kicker amber">Process → fibre</div>
            <table className="calc mt-8">
              <tbody>
                <tr><td>Ginning</td><td className="mono dim">cotton</td></tr>
                <tr><td>Retting</td><td className="mono dim">jute</td></tr>
                <tr><td>Shearing</td><td className="mono dim">wool</td></tr>
                <tr><td>Reeling</td><td className="mono dim">silk</td></tr>
                <tr><td>Sericulture</td><td className="mono dim">silkworm rearing</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card tight">
            <div className="kicker">Natural vs synthetic</div>
            <p className="small mt-8" style={{ color: '#c3d2e2' }}>
              Natural = breathable, biodegradable, wrinkles. Synthetic = strong, elastic, quick-dry, non-biodegradable, sheds microplastics.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
