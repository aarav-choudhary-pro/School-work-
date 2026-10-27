import { useEffect, useMemo, useState } from 'react'
import { MATHS_TOPICS } from '../data/maths'
import { SCIENCE_TOPICS } from '../data/science'
import { useProgress } from '../lib/progress'
import type { Topic } from '../lib/types'

const PLAN = [
  { id: 'p1', time: '21:45', mins: 25, title: 'Number series & analogy', sub: 'The six rules + 20 questions', topic: 'series' },
  { id: 'p2', time: '22:10', mins: 25, title: 'Cube, dice & painted cubes', sub: 'Formula sheet + dice lab', topic: 'cube' },
  { id: 'p3', time: '22:35', mins: 25, title: 'Calendar + direction', sub: 'Odd days, doomsday, Pythagoras', topic: 'calendar' },
  { id: 'p4', time: '23:00', mins: 20, title: 'Mirror + crossword + movies', sub: 'Quick rounds, high marks per minute', topic: 'mirror' },
  { id: 'p5', time: '23:20', mins: 25, title: 'Cell biology', sub: 'Organelles + plant vs animal lab', topic: 'cell' },
  { id: 'p6', time: '23:45', mins: 20, title: 'Fibre to fabric', sub: 'Process vocabulary sorter', topic: 'fibre' },
  { id: 'p7', time: '00:05', mins: 35, title: 'Laws of motion', sub: 'Concept + numericals (the big one)', topic: 'motion' },
  { id: 'p8', time: '00:40', mins: 30, title: 'News, DTE & 3-clue round', sub: 'The 2026 file + clue simulator', topic: 'news' },
  { id: 'p9', time: '01:10', mins: 25, title: 'Hands-on chits', sub: 'Rehearse 3 chits out loud', topic: 'hands' },
  { id: 'p10', time: '01:35', mins: 30, title: 'Rapid relay + mixed boss tests', sub: '90-second runs, then fix misses', topic: 'relay' },
  { id: 'p11', time: '02:05', mins: 25, title: 'Cheat sheet sweep', sub: 'Read every block once, no new topics', topic: 'cheat' },
  { id: 'p12', time: '02:30', mins: 30, title: 'Wind down · sleep by 3', sub: 'Sleep beats two more hours of cramming', topic: 'sleep' },
]

const ROUNDS = [
  { icon: '🔢', title: 'Number series & analogy', body: 'Find the rule, then the number. Six patterns cover 90%.', topic: 'series' },
  { icon: '🎲', title: 'Cube & dice', body: 'Painted-cube formulas and the opposite-face rule.', topic: 'cube' },
  { icon: '📅', title: 'Calendar', body: 'Odd days, leap years, and the doomsday shortcut.', topic: 'calendar' },
  { icon: '🧭', title: 'Direction', body: 'Draw the walk; use Pythagoras for the shortest path.', topic: 'direction' },
  { icon: '🎬', title: 'Movies & mathematicians', body: 'Film → person → idea. Five films cover most clips.', topic: 'movies' },
  { icon: '🪞', title: 'Mirror images', body: 'Plane vs water, safe letters, 11:60 clock rule.', topic: 'mirror' },
  { icon: '🧩', title: 'Crossword', body: 'Use crossings, count letters, never leave a blank.', topic: 'crossword' },
]

const SCIENCE_ROUNDS = [
  { icon: '🧫', title: 'Cell biology', body: 'Organelle jobs + plant vs animal differences.', topic: 'cell' },
  { icon: '🧵', title: 'Fibre to fabric', body: 'Ginning, retting, shearing, reeling — the process words.', topic: 'fibre' },
  { icon: '🚀', title: 'Laws of motion', body: 'Inertia, F = ma, action–reaction, numericals.', topic: 'motion' },
  { icon: '📰', title: 'News & DTE', body: 'Nobel 2026, ISRO, cyclone Arnab, biodiversity numbers.', topic: 'news' },
  { icon: '🧪', title: '3-clue achievements', body: 'Chandrayaan-3, optogenetics, CRISPR, IceCube…', topic: 'clue' },
  { icon: '📺', title: 'Video round', body: 'What clip → which principle. Train the reflex.', topic: 'video' },
  { icon: '🛠️', title: 'Hands-on activity', body: '17 chits, 5-minute plan, 30-second pitch.', topic: 'hands' },
]

export default function Home({ onOpen }: { onOpen: (id: string) => void }) {
  const { mastery, best, done, toggleDone, relayBest, relayBest25, name, setName } = useProgress()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(t)
  }, [])

  const target = useMemo(() => {
    const d = new Date(now)
    d.setDate(d.getDate() + 1)
    d.setHours(9, 0, 0, 0)
    if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1)
    return d
  }, [now])

  const minsLeft = Math.max(0, Math.round((target.getTime() - now.getTime()) / 60000))
  const hrs = Math.floor(minsLeft / 60)
  const mins = minsLeft % 60

  const mathsMastery = Math.round(mastery(MATHS_TOPICS.flatMap((t) => t.questions.map((q) => q.id))) * 100)
  const scienceMastery = Math.round(mastery(SCIENCE_TOPICS.flatMap((t) => t.questions.map((q) => q.id))) * 100)
  const doneCount = PLAN.filter((p) => done[p.id]).length

  return (
    <div className="fade-in">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="row wrap gap-10">
              <span className="chip maths">Inter-house quiz</span>
              <span className="chip science">Wed 28 October 2026</span>
              <span className="chip amber">night-before lab</span>
            </div>
            <h1 className="h1 mt-14">
              Maths & science,<br />
              <span>decoded</span> before <em>first bell.</em>
            </h1>
            <p className="lede mt-14">
              Every topic in the order you should study it: concept → worked example → drill → cheat sheet.
              Plus the alternative rounds — 3 clues, video, hands-on, and the 90-second relay.
            </p>
            <div className="hero-actions">
              <button className="btn primary lg" onClick={() => onOpen('series')}>Start with number series →</button>
              <button className="btn lg" onClick={() => onOpen('relay')}>Open rapid relay</button>
            </div>
            <div className="row wrap gap-14 mt-20 small dim">
              <span>✓ 175+ questions</span>
              <span>✓ 7 interactive labs</span>
              <span>✓ current affairs to Oct 2026</span>
            </div>
          </div>

          <div className="count-card">
            <div>
              <div className="kicker amber">Time until the quiz</div>
              <div className="count-big">
                {String(hrs).padStart(2, '0')}<span style={{ color: 'var(--dim)' }}>h</span> {String(mins).padStart(2, '0')}<span style={{ color: 'var(--dim)' }}>m</span>
                <small>ASSUMING A 9:00 AM START · {target.toDateString().slice(0, 10)}</small>
              </div>
            </div>
            <div className="divider" style={{ margin: '4px 0' }} />
            <div>
              <div className="spread small"><span className="muted">Tonight’s plan</span><span className="mono">{doneCount}/{PLAN.length}</span></div>
              <div className="meter mt-8"><i style={{ width: `${(doneCount / PLAN.length) * 100}%` }} /></div>
            </div>
            <div className="grid-2 keep-2" style={{ gap: 10 }}>
              <div className="panel-soft">
                <div className="q-meta">Maths</div>
                <div className="mono" style={{ fontSize: 22, color: 'var(--maths)' }}>{mathsMastery}%</div>
                <div className="meter mt-8"><i style={{ width: `${mathsMastery}%` }} /></div>
              </div>
              <div className="panel-soft">
                <div className="q-meta">Science</div>
                <div className="mono" style={{ fontSize: 22, color: 'var(--science)' }}>{scienceMastery}%</div>
                <div className="meter mt-8"><i style={{ width: `${scienceMastery}%` }} /></div>
              </div>
            </div>
            <div className="tiny dim">
              Relay best: {relayBest > 0 || relayBest25 > 0 ? `${relayBest} in 90 s · ${relayBest25}/25` : 'no run yet — do one at 01:35'}
            </div>
          </div>
        </div>
      </section>

      <div className="row wrap gap-10 mt-20">
        <div className="card tight" style={{ flex: 1, minWidth: 240 }}>
          <div className="kicker">Your name / house (optional)</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 24))}
            placeholder="e.g. Aarav · Blue House"
            style={{ width: '100%', marginTop: 8, padding: '9px 12px', borderRadius: 9, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.22)', fontSize: 14 }}
          />
        </div>
        <div className="card tight" style={{ flex: 2, minWidth: 280 }}>
          <div className="kicker">How to use this in one line</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>
            Don’t read every page. For each topic: read <b>Learn</b>, do the <b>drill</b> once, and open the <b>lab</b> if the idea still feels slippery.
            Tick the plan as you go — then stop at 02:30 and sleep.
          </p>
        </div>
      </div>

      <section className="mt-40">
        <div className="spread">
          <div>
            <div className="kicker maths">The night plan</div>
            <h2 className="h2 mt-8">Five and a half hours, sequenced.</h2>
            <p className="small muted mt-8">Each block links straight to the topic. Tick it, move on. No block is longer than 35 minutes.</p>
          </div>
          <button className="btn ghost sm no-print" onClick={() => window.print()}>Print the plan</button>
        </div>

        <div className="timeline mt-20">
          {PLAN.map((p) => {
            const isDone = !!done[p.id]
            return (
              <div key={p.id} className={`tl-item ${isDone ? 'done' : ''}`}>
                <div className="tl-time">{p.time}<br /><span className="dim">{p.mins} min</span></div>
                <div>
                  <div className="tl-title">{p.title}</div>
                  <div className="tl-sub">{p.sub}</div>
                </div>
                <div className="row gap-6">
                  {p.topic !== 'sleep' && p.topic !== 'cheat' && p.topic !== 'relay' && (
                    <button className="btn sm ghost" onClick={() => onOpen(p.topic)}>Open</button>
                  )}
                  {p.topic === 'cheat' && <button className="btn sm ghost" onClick={() => onOpen('cheat')}>Open</button>}
                  {p.topic === 'relay' && <button className="btn sm ghost" onClick={() => onOpen('relay')}>Open</button>}
                  <button className={`check ${isDone ? 'on' : ''}`} onClick={() => toggleDone(p.id)} aria-label={`Mark ${p.title} done`}>
                    {isDone ? '✓' : ''}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-40">
        <div className="spread" style={{ alignItems: 'flex-end' }}>
          <div>
            <div className="kicker maths">Mathematics · 7 rounds</div>
            <h2 className="h2 mt-8">Start with the logic, not the formulas.</h2>
          </div>
          <span className="chip maths">major section</span>
        </div>
        <div className="grid-3 mt-20">
          {MATHS_TOPICS.map((t) => <TopicCard key={t.id} topic={t} onOpen={onOpen} />)}
        </div>
      </section>

      <section className="mt-40">
        <div className="spread" style={{ alignItems: 'flex-end' }}>
          <div>
            <div className="kicker science">Science · 7 rounds</div>
            <h2 className="h2 mt-8">The rounds nobody prepares for.</h2>
          </div>
          <span className="chip science">bonus marks</span>
        </div>
        <div className="grid-3 mt-20">
          {SCIENCE_TOPICS.map((t) => <TopicCard key={t.id} topic={t} onOpen={onOpen} />)}
          {[
            { id: 'clue', icon: '🧪', name: 'Identify the Achievement', tagline: 'Three clues, one answer — play the clue round.', minutes: 18, questions: Array(15).fill({ id: 'x' }) },
            { id: 'video', icon: '📺', name: 'Video Round', tagline: 'Clip → concept → likely question.', minutes: 12, questions: Array(8).fill({ id: 'x' }) },
            { id: 'hands', icon: '🛠️', name: 'Hands-On Chits', tagline: '17 demonstrations with a 5-minute plan.', minutes: 30, questions: Array(17).fill({ id: 'x' }) },
          ].map((t) => (
            <button key={t.id} className="card hover topic-card" onClick={() => onOpen(t.id)}>
              <div className="topic-emoji">{t.icon}</div>
              <h3>{t.name}</h3>
              <p className="tagline">{t.tagline}</p>
              <div className="topic-foot">
                <span>~{t.minutes} min</span>
                <span>·</span>
                <span>{t.questions.length} cards</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-40">
        <div className="card" style={{ background: 'linear-gradient(140deg, rgba(251,191,36,.1), rgba(255,255,255,.02))', borderColor: 'rgba(251,191,36,.25)' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="kicker amber">Rapid relay · one player</div>
              <h2 className="h2 mt-8">25 questions or 90 seconds. Pick one.</h2>
              <p className="small muted mt-8">
                The relay is won by the person who can answer without thinking. Run it three times tonight:
                first for accuracy, then for speed. Your best score is saved.
              </p>
            </div>
            <div className="row wrap gap-10" style={{ justifyContent: 'flex-end' }}>
              <button className="btn primary lg" onClick={() => onOpen('relay')}>Open relay →</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid-3 mt-40">
        {ROUNDS.slice(0, 3).map((r) => (
          <button key={r.title} className="card tight hover" style={{ textAlign: 'left' }} onClick={() => onOpen(r.topic)}>
            <div className="row gap-10"><span style={{ fontSize: 18 }}>{r.icon}</span><b style={{ fontSize: 14 }}>{r.title}</b></div>
            <p className="tiny dim mt-8">{r.body}</p>
          </button>
        ))}
        {SCIENCE_ROUNDS.slice(0, 3).map((r) => (
          <button key={r.title} className="card tight hover" style={{ textAlign: 'left' }} onClick={() => onOpen(r.topic)}>
            <div className="row gap-10"><span style={{ fontSize: 18 }}>{r.icon}</span><b style={{ fontSize: 14 }}>{r.title}</b></div>
            <p className="tiny dim mt-8">{r.body}</p>
          </button>
        ))}
      </div>

      <footer className="footer">
        <span>QUIZ LAB · Agent 2 edition · built for the inter-house Maths & Science quiz, 28 Oct 2026.</span>
        <span>Study now, sleep by 3. Good luck. 🏆</span>
      </footer>
    </div>
  )
}

function TopicCard({ topic, onOpen }: { topic: Topic; onOpen: (id: string) => void }) {
  const { mastery } = useProgress()
  const m = Math.round(mastery(topic.questions.map((q) => q.id)) * 100)
  return (
    <button className={`card hover topic-card ${topic.subject === 'maths' ? 'accent-maths' : 'accent-science'}`} onClick={() => onOpen(topic.id)}>
      <div className="spread">
        <div className="topic-emoji">{topic.emoji}</div>
        <span className="mono tiny" style={{ color: m > 0 ? 'var(--green)' : 'var(--dim)' }}>{m > 0 ? `${m}%` : 'new'}</span>
      </div>
      <h3>{topic.name}</h3>
      <p className="tagline">{topic.tagline}</p>
      <div className="topic-foot">
        <span>~{topic.minutes} min</span>
        <span>·</span>
        <span>{topic.questions.length} Qs</span>
        {topic.lab && <><span>·</span><span style={{ color: 'var(--amber)' }}>lab</span></>}
      </div>
    </button>
  )
}
