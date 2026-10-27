import { useEffect, useMemo, useState } from 'react'
import { CHITS, CLUES } from '../data/rounds'
import { isCorrect, norm } from '../lib/utils'

/* ───────────────────── 3-CLUE ACHIEVEMENT ROUND ───────────────────── */
export function ClueRound() {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(1)
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState<null | boolean>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const item = CLUES[i]

  function check(e: React.FormEvent) {
    e.preventDefault()
    if (!guess.trim()) return
    const ok = isCorrect({ id: item.id, topic: 'clue', subject: 'science', prompt: '', answer: item.answer, alts: item.alts, explain: '' }, guess)
    setChecked(ok)
    if (ok) setScore((s) => s + 1)
  }

  function next() {
    if (i + 1 >= CLUES.length) { setFinished(true); return }
    setI(i + 1)
    setShown(1)
    setGuess('')
    setChecked(null)
  }

  if (finished) {
    return (
      <div className="card center">
        <div className="kicker amber">Clue round complete</div>
        <div className="score-big mt-8">{score} / {CLUES.length}</div>
        <p className="small muted mt-8">In the real round you only get the clues once — no replay. Aim for 5+ on three clues and 8+ on two.</p>
        <button className="btn primary mt-20" onClick={() => { setI(0); setShown(1); setGuess(''); setChecked(null); setScore(0); setFinished(false) }}>Run again</button>
      </div>
    )
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker amber">Round simulator · 3 clues</div>
          <h2 className="h2 mt-8">Name the achievement.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            In the real round the quizmaster reads clue 1, then 2, then 3. Buzz as early as you dare — but never guess wildly.
          </p>
        </div>
        <div className="stat"><b>{score}</b><span>correct</span></div>
      </div>

      <div className="card">
        <div className="row spread">
          <span className="q-meta">Item {i + 1} / {CLUES.length}</span>
          <span className="chip amber">{item.tag}</span>
        </div>

        <div className="clue-stack mt-14">
          {item.clues.map((clue, idx) => (
            <div key={idx} className={`clue-card ${idx >= shown ? 'locked' : ''}`}>
              <b>CLUE {idx + 1}</b>
              <span>{idx >= shown ? 'Locked — reveal when you need it.' : clue}</span>
            </div>
          ))}
        </div>

        {checked === null ? (
          <div className="row wrap gap-10 mt-20">
            {shown < 3 && (
              <button className="btn" onClick={() => setShown((s) => Math.min(3, s + 1))}>
                Reveal clue {shown + 1}
              </button>
            )}
            <form onSubmit={check} className="input-row" style={{ flex: 1, minWidth: 240 }}>
              <input value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Your answer…" />
              <button className="btn lime" type="submit" disabled={!guess.trim()}>Check</button>
            </form>
          </div>
        ) : (
          <>
            <div className={`feedback ${checked ? 'ok' : 'no'} mt-20`}>
              <span className="verdict">{checked ? 'Correct' : `Answer: ${item.answer}`}</span>
              {item.fact}
            </div>
            <div className="row wrap gap-10 mt-14">
              <button className="btn primary" onClick={next}>{i + 1 >= CLUES.length ? 'Finish' : 'Next item'} →</button>
              {!checked && (
                <button className="btn ghost" onClick={() => { setChecked(null); setGuess('') }}>
                  Try again later
                </button>
              )}
            </div>
          </>
        )}

        <div className="tiny dim mt-20">
          Revealed {shown} of 3 clues. Guessing on clue 1 is worth 3 points in most formats; clue 3 is worth 1. Adapt to your quizmaster’s scoring.
        </div>
      </div>
    </div>
  )
}

/* ───────────────────── VIDEO ROUND ───────────────────── */
export function VideoRound() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">Round simulator · video</div>
          <h2 className="h2 mt-8">If you see this clip, ask yourself this.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '64ch' }}>
            Video rounds almost always ask one of four things: what is happening, which law/principle, why it happens, or what would change in space. Tap a card to train the reflex.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {VIDEO_ITEMS.map((v) => (
          <button
            key={v.title}
            className="card hover"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => setOpen(open === v.title ? null : v.title)}
          >
            <div className="spread">
              <span className="chip science">clip</span>
              <span className="mono dim tiny">{open === v.title ? '−' : '+'}</span>
            </div>
            <h3 className="h3 mt-14">{v.title}</h3>
            <p className="small muted mt-8">{v.shows}</p>
            {open === v.title && (
              <div className="mt-14 fade-in">
                <div className="keyline"><b>Concept</b>{v.concept}</div>
                <div className="panel-soft mt-14">
                  <div className="q-meta">Likely question</div>
                  <div className="small mt-8" style={{ fontWeight: 600 }}>{v.question}</div>
                  <div className="small mt-8" style={{ color: 'var(--green)' }}>✓ {v.answer}</div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

const VIDEO_ITEMS = [
  { title: 'Balloon on a pin', shows: 'A pin pops a balloon with a bang.', concept: 'Pressure = force ÷ area; a tiny area gives huge pressure.', question: 'Why does a sharp pin pierce easily but a blunt one does not?', answer: 'The same force over a much smaller area produces much greater pressure.' },
  { title: 'Astronaut water sphere', shows: 'Water floats as a perfect ball on the ISS.', concept: 'Surface tension in microgravity; free-fall, not zero gravity.', question: 'Why is it spherical?', answer: 'Surface tension minimises surface area, and the sphere has the least surface for its volume.' },
  { title: 'Hammer and feather on the Moon', shows: 'Both hit the ground together.', concept: 'In a vacuum there is no air resistance; all objects accelerate equally.', question: 'Why does the feather fall like the hammer?', answer: 'Gravity gives both the same acceleration (≈1.6 m/s² on the Moon).' },
  { title: 'Candle under a jar', shows: 'Flame dies and water rises inside.', concept: 'Oxygen is consumed; gases cool and contract, lowering pressure.', question: 'Why does the water rise?', answer: 'Falling pressure inside lets outside atmospheric pressure push the water up.' },
  { title: 'Newton’s cradle', shows: 'One ball in, one ball out.', concept: 'Conservation of momentum and kinetic energy.', question: 'Why do the middle balls stay still?', answer: 'Momentum and energy are transferred straight through; the middle balls barely move.' },
  { title: 'Silkworm spinning a cocoon', shows: 'A larva wraps itself in silk.', concept: 'Metamorphosis and sericulture; silk is a protein filament.', question: 'What is the stage, and what happens next?', answer: 'Larva spinning a cocoon; the cocoon is boiled and reeled to unwind silk.' },
  { title: 'Lightning in slow motion', shows: 'A stepped leader then a bright return stroke.', concept: 'Electrostatic charge build-up and discharge.', question: 'Why do we see lightning before hearing thunder?', answer: 'Light travels much faster than sound.' },
  { title: 'Red blood cells under a microscope', shows: 'Biconcave discs floating in plasma.', concept: 'Cell specialisation, surface area, haemoglobin.', question: 'Why are RBCs biconcave and nucleus-free?', answer: 'More surface area for gas exchange and more room for haemoglobin.' },
]

/* ───────────────────── HANDS-ON CHITS ───────────────────── */
export function HandsOn() {
  const [chosen, setChosen] = useState(() => CHITS[Math.floor(Math.random() * CHITS.length)])
  const [pickedMats, setPickedMats] = useState<Record<string, boolean>>({})
  const [seconds, setSeconds] = useState(300)
  const [running, setRunning] = useState(false)
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    if (!running) return
    if (seconds <= 0) { setRunning(false); return }
    const t = window.setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearInterval(t)
  }, [running, seconds])

  function draw() {
    let next = chosen
    while (next.id === chosen.id && CHITS.length > 1) next = CHITS[Math.floor(Math.random() * CHITS.length)]
    setChosen(next)
    setPickedMats({})
    setSeconds(300)
    setRunning(false)
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">Round simulator · hands-on</div>
          <h2 className="h2 mt-8">Pick a chit. You have 5 minutes.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '64ch' }}>
            5 minutes to think, then demonstrate. The winning move is a clean 40-second demo + one sentence of science. Never rush the explanation.
          </p>
        </div>
        <div className="row gap-10">
          <button className="btn primary" onClick={draw}>🎲 Draw a chit</button>
          <button className="btn ghost" onClick={() => setShowList((s) => !s)}>{showList ? 'Hide all' : 'Browse 17 chits'}</button>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="spread">
            <span className="chip science">chit selected</span>
            <span className="mono dim tiny">{chosen.materials.length} materials</span>
          </div>
          <h2 className="h2 mt-14">{chosen.title}</h2>

          <div className="divider" />
          <div className="kicker amber">Materials</div>
          <div className="row wrap gap-6 mt-8">
            {chosen.materials.map((mat) => (
              <button
                key={mat}
                className={`chip ${pickedMats[mat] ? 'green' : ''}`}
                onClick={() => setPickedMats((p) => ({ ...p, [mat]: !p[mat] }))}
                style={{ textTransform: 'none', letterSpacing: 0 }}
              >
                {pickedMats[mat] ? '✓' : '○'} {mat}
              </button>
            ))}
          </div>

          <div className="divider" />
          <div className="kicker amber">Demo in 4 steps</div>
          <ol className="steps">
            {chosen.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>

          <div className="keyline"><b>The science</b>{chosen.science}</div>
        </div>

        <div className="stack gap-14">
          <div className="card" style={{ borderColor: 'rgba(251,191,36,.3)' }}>
            <div className="spread">
              <div className="kicker amber">Planning clock</div>
              <span className="mono tiny dim">5:00</span>
            </div>
            <div className="relay-timer mt-8" style={{ color: seconds < 60 ? 'var(--red)' : 'var(--amber)' }}>
              {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
            </div>
            <div className="row wrap gap-10 mt-14">
              <button className="btn primary" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start clock'}</button>
              <button className="btn ghost" onClick={() => { setSeconds(300); setRunning(false) }}>Reset</button>
            </div>
            <div className="small dim mt-14">
              Budget: 1 min read + gather, 2 min rehearse the demo, 1 min write your one-line explanation, 1 min spare.
            </div>
          </div>

          <div className="card">
            <div className="kicker maths">Say this — your 30-second pitch</div>
            <p className="mt-8" style={{ color: '#e9f1fb', fontSize: 15 }}>“{chosen.pitch}”</p>
          </div>

          <div className="card">
            <div className="kicker amber">Judge’s likely question</div>
            <p className="small mt-8" style={{ fontWeight: 600 }}>{chosen.question}</p>
            <details className="mt-8">
              <summary className="small" style={{ cursor: 'pointer', color: 'var(--maths)' }}>Show the answer</summary>
              <p className="small mt-8" style={{ color: '#c3d2e2' }}>{chosen.answer}</p>
            </details>
          </div>
        </div>
      </div>

      {showList && (
        <div className="grid-3">
          {CHITS.map((c) => (
            <button key={c.id} className="card tight hover" style={{ textAlign: 'left' }} onClick={() => { setChosen(c); setPickedMats({}); setSeconds(300); setRunning(false) }}>
              <div className="row spread">
                <span className="mono tiny dim">chit</span>
                <span className="mono tiny" style={{ color: c.difficulty === 1 ? 'var(--green)' : c.difficulty === 2 ? 'var(--amber)' : 'var(--red)' }}>
                  {'●'.repeat(c.difficulty)}
                </span>
              </div>
              <div className="h3 mt-8" style={{ fontSize: 15 }}>{c.title}</div>
              <div className="tiny dim mt-8">{c.materials.slice(0, 3).join(' · ')}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ───────────────────── NEWS TIMELINE ───────────────────── */
export function NewsDigest() {
  const [tag, setTag] = useState('all')
  const items = NEWS_ITEMS
  const filtered = tag === 'all' ? items : items.filter((n) => n.tag === tag)
  const tags = useMemo(() => ['all', ...Array.from(new Set(items.map((n) => n.tag)))], [items])

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker science">The 2026 file</div>
          <h2 className="h2 mt-8">Recent enough to be asked tomorrow.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            The quiz is on 28 October 2026. Anything from July–October is fair game. Learn the headline + one number each.
          </p>
        </div>
        <div className="row wrap gap-6">
          {tags.map((t) => (
            <button key={t} className={`btn sm ${tag === t ? 'lime' : 'ghost'}`} onClick={() => setTag(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="timeline">
        {filtered.map((n) => (
          <div key={n.title} className="tl-item" style={{ gridTemplateColumns: '86px 1fr' }}>
            <div className="tl-time">{n.date}</div>
            <div>
              <div className="tl-title">{n.title}</div>
              <div className="tl-sub mt-8">{n.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NEWS_ITEMS = [
  { date: '27 Oct', tag: 'policy', title: 'ESTIC 2026 inaugurated by PM Modi', detail: 'Emerging Science, Technology and Innovation Conclave — the PM asked for innovations with measurable results in three years.' },
  { date: '24 Oct', tag: 'space', title: 'Aditya-L1 makes Doppler velocity images of the corona', detail: 'IIA Bengaluru used the VELC payload to track the direction of coronal mass ejections.' },
  { date: '20 Oct', tag: 'wildlife', title: 'Three new centipede species in the Western Ghats', detail: 'Rhysida quadrispinosa, R. coorgensis and R. neyyarensis take India’s Rhysida count to 23.' },
  { date: '15 Oct', tag: 'climate', title: 'Cyclone Arnab intensifies in the Bay of Bengal', detail: 'Very severe cyclonic storm; Andhra Pradesh on red alert, Odisha prepares mass evacuations.' },
  { date: '12 Oct', tag: 'awards', title: 'Nobel Economics to Hall and Woodford', detail: 'Microeconomic foundations of macroeconomic stabilisation — models used by central banks.' },
  { date: '07 Oct', tag: 'awards', title: 'Nobel Chemistry to Kagan and Soai', detail: 'Non-linear effects and autocatalysis in asymmetric synthesis — how one mirror image of a molecule wins.' },
  { date: '06 Oct', tag: 'awards', title: 'Nobel Physics to Francis Halzen', detail: 'IceCube Neutrino Observatory and high-energy astrophysical neutrinos, detected in Antarctic ice.' },
  { date: '05 Oct', tag: 'awards', title: 'Nobel Medicine to Deisseroth, Hegemann and Nagel', detail: 'Light-gated ion channels and optogenetics — switching neurons on and off with light.' },
  { date: '01 Oct', tag: 'climate', title: 'DTE cover story: “Intimate takeover”', detail: 'Indian rainfall is increasingly driven by long-lasting low-pressure systems rather than monsoon winds, producing heavier bursts.' },
  { date: '04 Sep', tag: 'space', title: 'EOS-05 launched on GSLV-F17', detail: 'India’s first imaging satellite from geosynchronous orbit, giving a persistent view of regions of interest.' },
  { date: 'Aug', tag: 'wildlife', title: '149 new deep-sea species near Indian Ocean seamounts', detail: 'Black corals, sea cucumbers and new fish found around Christmas and Cocos islands.' },
  { date: 'Jun', tag: 'climate', title: 'State of India’s Environment 2026 released', detail: 'CSE–DTE: 7 of 9 planetary boundaries breached; extreme weather on 99% of 2025’s days; 97,000 ha of forest diverted in five years.' },
  { date: 'May', tag: 'wildlife', title: 'Asiatic lion census: 891 lions', detail: 'Up from 674 in 2020; the only wild home remains Gir, Gujarat.' },
  { date: 'Jul 2025', tag: 'space', title: 'NISAR launched on GSLV-F16', detail: 'NASA–ISRO dual-band radar satellite, the first with both L-band and S-band imaging.' },
]
