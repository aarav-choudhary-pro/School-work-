import { useEffect, useMemo, useRef, useState } from 'react'
import { RELAY } from '../data/relay'
import { shuffle } from '../lib/utils'
import { useProgress } from '../lib/progress'

type Mode = '90s' | '25q'
type Cat = 'all' | 'maths' | 'science' | 'current'

export default function RelayPage({ onBack }: { onBack: () => void }) {
  const { relayBest, relayBest25, setRelay } = useProgress()
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup')
  const [mode, setMode] = useState<Mode>('90s')
  const [cat, setCat] = useState<Cat>('all')
  const [deck, setDeck] = useState(() => shuffle(RELAY))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState<typeof RELAY>([])
  const [seconds, setSeconds] = useState(90)
  const [revealed, setRevealed] = useState(false)
  const [flash, setFlash] = useState<null | 'good' | 'bad'>(null)
  const timerRef = useRef<number | null>(null)

  const pool = useMemo(() => (cat === 'all' ? RELAY : RELAY.filter((r) => r.tag === cat)), [cat])
  const target = mode === '25q' ? 25 : 99
  const q = deck[i]

  useEffect(() => {
    if (phase !== 'play') return
    if (mode === '90s') {
      if (seconds <= 0) { finish(); return }
      timerRef.current = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
      return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
    }
    return
  }, [phase, seconds, mode])

  function start() {
    const d = shuffle(pool.length >= 35 ? pool : RELAY)
    setDeck(d)
    setI(0)
    setScore(0)
    setMissed([])
    setSeconds(90)
    setRevealed(false)
    setFlash(null)
    setPhase('play')
  }

  function finish() {
    setPhase('done')
    if (mode === '90s') setRelay(score, false)
    else setRelay(score, true)
  }

  function next(ok: boolean) {
    if (flash) return
    setFlash(ok ? 'good' : 'bad')
    if (ok) setScore((s) => s + 1)
    else setMissed((m) => [...m, q])
    window.setTimeout(() => {
      setFlash(null)
      setRevealed(false)
      const nextIndex = i + 1
      if (mode === '25q' && (nextIndex >= target || nextIndex >= deck.length)) {
        // score update happens on the next render; finish here with local value
        setPhase('done')
        setRelay(ok ? score + 1 : score, true)
        return
      }
      if (nextIndex >= deck.length) {
        setDeck(shuffle(RELAY))
        setI(0)
      } else setI(nextIndex)
    }, 420)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase !== 'play') return
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); next(true) }
      if (e.key === 'ArrowLeft' || e.key === 'x' || e.key === 'X') { e.preventDefault(); next(false) }
      if (e.key === '?') setRevealed((r) => !r)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (phase === 'setup') {
    return (
      <div className="fade-in">
        <button className="btn ghost sm" onClick={onBack}>← Home</button>
        <div className="mt-20">
          <div className="kicker amber">Rapid relay · one player</div>
          <h1 className="h1 mt-8" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>25 questions or 90 seconds.</h1>
          <p className="lede mt-14">
            One member answers. Answer aloud, then tap what happened. Your fastest, cleanest run is what matters — the quiz gives you no time to think.
          </p>
        </div>

        <div className="grid-2 mt-28" style={{ alignItems: 'start' }}>
          <div className="card">
            <div className="kicker">Choose the format</div>
            <div className="grid-2 keep-2 mt-14" style={{ gap: 10 }}>
              <button className={`card tight hover ${mode === '90s' ? 'accent-maths' : ''}`} onClick={() => setMode('90s')} style={{ textAlign: 'left', borderColor: mode === '90s' ? 'var(--maths)' : undefined }}>
                <div className="mono" style={{ fontSize: 24, color: 'var(--maths)' }}>90 s</div>
                <div className="small mt-8" style={{ fontWeight: 600 }}>Beat the clock</div>
                <div className="tiny dim mt-8">As many as you can. Best score saved.</div>
              </button>
              <button className={`card tight hover ${mode === '25q' ? 'accent-science' : ''}`} onClick={() => setMode('25q')} style={{ textAlign: 'left', borderColor: mode === '25q' ? 'var(--science)' : undefined }}>
                <div className="mono" style={{ fontSize: 24, color: 'var(--science)' }}>25 Q</div>
                <div className="small mt-8" style={{ fontWeight: 600 }}>Fixed set</div>
                <div className="tiny dim mt-8">Quiz format: 25 questions, no timer.</div>
              </button>
            </div>

            <div className="divider" />
            <div className="kicker">Category</div>
            <div className="row wrap gap-6 mt-8">
              {([
                ['all', 'Everything'],
                ['maths', 'Maths'],
                ['science', 'Science'],
                ['current', 'Current affairs'],
              ] as [Cat, string][]).map(([key, label]) => (
                <button key={key} className={`btn sm ${cat === key ? 'primary' : 'ghost'}`} onClick={() => setCat(key)}>{label}</button>
              ))}
            </div>
            <div className="tiny dim mt-14">{pool.length} questions in this pool.</div>

            <button className="btn primary lg mt-20" style={{ width: '100%' }} onClick={start}>Start the relay →</button>
          </div>

          <div className="stack gap-14">
            <div className="card">
              <div className="kicker maths">Your records</div>
              <div className="row gap-20 mt-14">
                <div className="stat"><b style={{ color: 'var(--amber)' }}>{relayBest}</b><span>best in 90 s</span></div>
                <div className="stat"><b style={{ color: 'var(--science)' }}>{relayBest25}/25</b><span>best 25-Q run</span></div>
              </div>
              <div className="small muted mt-14">
                If you score 20+ in 90 seconds, you are relay-ready. Under 12 means the basic facts need one more pass.
              </div>
            </div>
            <div className="card tight">
              <div className="kicker amber">Relay tactics</div>
              <ul className="steps mt-8">
                <li>Say the answer instantly, even if unsure — hesitation costs more than a wrong guess.</li>
                <li>Skip and move: one stuck question must not eat 15 seconds.</li>
                <li>Out of time? Answer the last one as the buzzer sounds — sometimes it counts.</li>
                <li>Split categories in practice: maths speed and science recall fail differently.</li>
              </ul>
            </div>
            <div className="card tight">
              <div className="kicker">Keys</div>
              <p className="small muted mt-8">
                <span className="kbd">Space</span> / <span className="kbd">→</span> got it · <span className="kbd">←</span> missed · <span className="kbd">?</span> reveal answer.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const totalAttempted = mode === '90s' ? Math.max(1, score + missed.length) : 25
    const pctScore = Math.round((score / totalAttempted) * 100)
    return (
      <div className="card center fade-in" style={{ maxWidth: 660, margin: '40px auto' }}>
        <div className="kicker amber">Relay complete</div>
        <div className="score-big mt-8" style={{ fontSize: 60 }}>{score}<small> {mode === '25q' ? '/ 25' : 'correct'}</small></div>
        <p className="small muted mt-8">
          {mode === '90s' ? `${score} in 90 seconds · ${pctScore}% of attempts` : `${pctScore}% accuracy in the fixed set`}
        </p>
        {missed.length > 0 && (
          <div className="mt-20" style={{ textAlign: 'left' }}>
            <div className="kicker amber">Fix list</div>
            <div className="stack gap-6 mt-8" style={{ maxHeight: 260, overflow: 'auto' }}>
              {missed.map((m) => (
                <div key={m.id} className="panel-soft">
                  <div className="small">{m.q}</div>
                  <div className="mono small mt-8" style={{ color: 'var(--green)' }}>✓ {m.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="row wrap gap-10 mt-20" style={{ justifyContent: 'center' }}>
          <button className="btn primary" onClick={start}>Run it again</button>
          <button className="btn ghost" onClick={() => setPhase('setup')}>Change format</button>
          <button className="btn ghost" onClick={onBack}>Home</button>
        </div>
      </div>
    )
  }

  const timePct = mode === '90s' ? (seconds / 90) * 100 : (i / 25) * 100
  return (
    <div className="fade-in" style={{ maxWidth: 860, margin: '0 auto' }}>
      <div className="row spread">
        <button className="btn ghost sm" onClick={finish}>End run</button>
        <div className="row gap-14">
          <span className="q-meta">{mode === '90s' ? 'best of the clock' : `${Math.min(i + 1, 25)} / 25`}</span>
          <span className="q-meta" style={{ color: 'var(--green)' }}>✓ {score}</span>
          <span className="q-meta" style={{ color: 'var(--red)' }}>✕ {missed.length}</span>
        </div>
      </div>

      <div className="progress-line mt-14" style={{ height: 6 }}>
        <i style={{ width: `${mode === '90s' ? timePct : timePct}%`, background: mode === '90s' ? 'var(--amber)' : 'var(--science)' }} />
      </div>

      <div className="card mt-20" style={{ minHeight: 360 }}>
        <div className="relay-stage">
          <div className="row" style={{ justifyContent: 'center', gap: 18 }}>
            {mode === '90s' && (
              <div className={`relay-timer ${seconds <= 15 ? 'warn' : ''}`}>
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
              </div>
            )}
            <span className={`chip ${q?.tag === 'maths' ? 'maths' : q?.tag === 'science' ? 'science' : 'amber'}`}>{q?.tag}</span>
          </div>

          <div className="relay-q">{q?.q}</div>

          {revealed ? (
            <div className="fade-in">
              <div className="mono" style={{ fontSize: 22, color: 'var(--green)' }}>{q?.a}</div>
              <div className="row wrap gap-10 mt-14" style={{ justifyContent: 'center' }}>
                <button className="btn primary" onClick={() => next(true)}>I had it ✓</button>
                <button className="btn ghost" onClick={() => next(false)}>Add to fix list</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="relay-actions">
                <button className="btn lime lg" onClick={() => next(true)}>Got it ✓</button>
                <button className="btn lg" onClick={() => next(false)}>Missed</button>
                <button className="btn ghost" onClick={() => setRevealed(true)}>Show answer</button>
              </div>
              <div className="tiny dim mt-14">Say your answer out loud before tapping. Honesty makes the score useful.</div>
            </div>
          )}
        </div>
      </div>

      <div className="row wrap gap-10 mt-14" style={{ justifyContent: 'center' }}>
        <span className="tiny dim"><span className="kbd">Space</span> got it</span>
        <span className="tiny dim"><span className="kbd">←</span> missed</span>
        <span className="tiny dim"><span className="kbd">?</span> reveal</span>
        <span className="tiny dim">· deck {i + 1}/{deck.length}</span>
      </div>

      {flash && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, background: flash === 'good' ? 'rgba(74,222,128,.08)' : 'rgba(251,113,133,.08)' }} />
      )}
    </div>
  )
}
