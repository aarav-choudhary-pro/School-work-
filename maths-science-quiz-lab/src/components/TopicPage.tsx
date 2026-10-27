import { useState } from 'react'
import type { Topic } from '../lib/types'
import { useProgress } from '../lib/progress'
import QuestionRunner from './QuestionRunner'
import CalendarLab from '../modes/CalendarLab'
import CubeLab from '../modes/CubeLab'
import DirectionLab from '../modes/DirectionLab'
import MirrorLab from '../modes/MirrorLab'
import CrosswordLab from '../modes/CrosswordLab'
import MoviesLab from '../modes/MoviesLab'
import CellDiagram from '../modes/CellDiagram'
import { FibreLab, MotionLab } from '../modes/ScienceLabs'
import { ClueRound, HandsOn, NewsDigest, VideoRound } from '../modes/RoundLabs'

type Tab = 'learn' | 'lab' | 'examples' | 'drill' | 'cheat'

export default function TopicPage({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('learn')
  const [boss, setBoss] = useState(false)
  const { mastery, best } = useProgress()
  const m = Math.round(mastery(topic.questions.map((q) => q.id)) * 100)
  const drillBest = Math.round((best[`${topic.id}:drill`] ?? 0) * 100)
  const bossBest = Math.round((best[`${topic.id}:boss`] ?? 0) * 100)
  const subjectClass = topic.subject

  return (
    <div className={`fade-in ${subjectClass}`}>
      <button className="btn ghost sm" onClick={onBack}>← All topics</button>

      <div className="spread mt-20" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div className={`kicker ${topic.subject === 'maths' ? 'maths' : 'science'}`}>
            {topic.subject === 'maths' ? 'Mathematics' : 'Science'} · ~{topic.minutes} min
          </div>
          <h1 className="h1 mt-8" style={{ fontSize: 'clamp(30px, 4.6vw, 48px)' }}>
            <span style={{ marginRight: 10 }}>{topic.emoji}</span>
            {topic.name}
          </h1>
          <p className="lede mt-8">{topic.tagline}</p>
        </div>
        <div className="row gap-20">
          <div className="stat"><b>{m}%</b><span>mastery</span></div>
          <div className="stat"><b>{topic.questions.length}</b><span>questions</span></div>
          <div className="stat"><b style={{ color: 'var(--green)' }}>{Math.max(drillBest, bossBest)}%</b><span>best run</span></div>
        </div>
      </div>

      {topic.examNote && (
        <div className="banner mt-20">
          <b>IN THE QUIZ: </b>
          {topic.examNote}
        </div>
      )}

      <div className="tabs mt-20">
        <button className={tab === 'learn' ? 'on' : ''} onClick={() => setTab('learn')}>Learn the concept</button>
        {topic.lab && <button className={tab === 'lab' ? 'on' : ''} onClick={() => setTab('lab')}>Lab <span className="count">interactive</span></button>}
        <button className={tab === 'examples' ? 'on' : ''} onClick={() => setTab('examples')}>Worked examples</button>
        <button className={tab === 'drill' ? 'on' : ''} onClick={() => setTab('drill')}>Drill <span className="count">{topic.questions.length}</span></button>
        <button className={tab === 'cheat' ? 'on' : ''} onClick={() => setTab('cheat')}>Cheat sheet</button>
      </div>

      <div className="mt-20">
        {tab === 'learn' && (
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="concept">
              {topic.concept.map((c, idx) => (
                <div key={c.title} className="card">
                  <div className="concept-head">
                    <span className="concept-num">{String(idx + 1).padStart(2, '0')}</span>
                    <div style={{ minWidth: 0 }}>
                      <h3 className="h3">{c.title}</h3>
                      <p>{c.body}</p>
                      {c.list && (
                        <ul>
                          {c.list.map((li) => <li key={li}>{li}</li>)}
                        </ul>
                      )}
                      {c.key && <div className="keyline"><b>REMEMBER</b>{c.key}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="stack gap-14" style={{ position: 'sticky', top: 84 }}>
              <div className="card" style={{ borderColor: 'rgba(99,230,245,.22)' }}>
                <div className="kicker">Ready to test it?</div>
                <p className="small muted mt-8">Learn → examples → drill. The drill shuffles, so you cannot memorise the order.</p>
                <div className="stack gap-10 mt-14">
                  <button className="btn primary" onClick={() => setTab('drill')}>Start the drill →</button>
                  <button className="btn" onClick={() => setTab('examples')}>See worked examples first</button>
                  {topic.lab && <button className="btn ghost" onClick={() => setTab('lab')}>Open the interactive lab</button>}
                </div>
              </div>
              <div className="card tight">
                <div className="kicker amber">Quiz-night defaults</div>
                <ul className="steps mt-8">
                  <li>Say the rule out loud before you compute.</li>
                  <li>Write the formula first — even if you then guess.</li>
                  <li>If two options are opposites, the answer is one of them.</li>
                  <li>Never leave a blank unless negative marking is announced.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'lab' && topic.lab && <LabSwitch type={topic.lab} />}

        {tab === 'examples' && (
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {topic.examples.map((ex, idx) => (
              <div key={ex.q} className="card">
                <div className={`kicker ${topic.subject === 'maths' ? 'maths' : 'science'}`}>Worked example {idx + 1}</div>
                <div className="example-q mt-8">{ex.q}</div>
                <ol className="steps">
                  {ex.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
                <div className="answer-line"><b>ANSWER</b>{ex.answer}</div>
              </div>
            ))}
            <div className="card" style={{ borderStyle: 'dashed' }}>
              <div className="kicker">Now do it yourself</div>
              <p className="small muted mt-8">
                Reading a solution feels like learning. It isn’t. Close this and answer the same question from memory in the drill.
              </p>
              <button className="btn primary mt-14" onClick={() => setTab('drill')}>Open drill →</button>
            </div>
          </div>
        )}

        {tab === 'drill' && (
          <div className="stack gap-14">
            <div className="spread">
              <div className="pill-toggle">
                <button className={!boss ? 'on' : ''} onClick={() => setBoss(false)}>Practice</button>
                <button className={boss ? 'on' : ''} onClick={() => setBoss(true)}>Boss test</button>
              </div>
              <span className="tiny dim">{boss ? '10 random questions · explanations after each' : 'Full bank · shuffled · instant feedback'}</span>
            </div>
            <QuestionRunner
              key={`${topic.id}-${boss}`}
              questions={topic.questions}
              runId={topic.id}
              title={boss ? 'Boss test' : topic.name}
              mode={boss ? 'boss' : 'drill'}
              subject={topic.subject}
              limit={boss ? 10 : undefined}
            />
          </div>
        )}

        {tab === 'cheat' && (
          <div className="cheat-grid">
            {topic.cheat.map((block) => (
              <div key={block.title} className="card cheat-block">
                <h3>{block.title}</h3>
                <ul>
                  {block.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LabSwitch({ type }: { type: NonNullable<Topic['lab']> }) {
  switch (type) {
    case 'calendar': return <CalendarLab />
    case 'cube': return <CubeLab />
    case 'direction': return <DirectionLab />
    case 'mirror': return <MirrorLab />
    case 'crossword': return <CrosswordLab />
    case 'movies': return <MoviesLab />
    case 'cell': return <CellDiagram />
    case 'fibre': return <FibreLab />
    case 'motion': return <MotionLab />
    case 'news': return <NewsDigest />
    case 'clue': return <ClueRound />
    case 'video': return <VideoRound />
    case 'handsOn': return <HandsOn />
    default: return null
  }
}
