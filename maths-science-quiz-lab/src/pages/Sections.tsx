import { MATHS_TOPICS } from '../data/maths'
import { SCIENCE_TOPICS } from '../data/science'
import { useProgress } from '../lib/progress'
import { ClueRound, HandsOn, VideoRound } from '../modes/RoundLabs'

export function SubjectPage({ subject, onOpen }: { subject: 'maths' | 'science'; onOpen: (id: string) => void }) {
  const { mastery } = useProgress()
  const topics = subject === 'maths' ? MATHS_TOPICS : SCIENCE_TOPICS
  const m = Math.round(mastery(topics.flatMap((t) => t.questions.map((q) => q.id))) * 100)
  const isMaths = subject === 'maths'

  return (
    <div className={`fade-in ${subject}`}>
      <div className="row wrap gap-10">
        <span className={`chip ${isMaths ? 'maths' : 'science'}`}>{isMaths ? 'Mathematics' : 'Science'}</span>
        <span className="chip">{topics.length} rounds</span>
        <span className="chip amber">{m}% mastered</span>
      </div>
      <h1 className="h1 mt-14" style={{ fontSize: 'clamp(32px, 5vw, 54px)' }}>
        {isMaths ? 'Logic first, formulas second.' : 'The science the quizmaster will actually ask.'}
      </h1>
      <p className="lede mt-14">
        {isMaths
          ? 'Each round is a pattern, not a memory test. Read how it works, watch one example, then drill it until the pattern is automatic.'
          : 'Cells and fibres are pure recall; motion is one equation; the news and hands-on rounds are where unprepared teams lose. Cover all four.'}
      </p>

      <div className="grid-2 mt-28">
        {topics.map((t, idx) => {
          const tm = Math.round(mastery(t.questions.map((q) => q.id)) * 100)
          return (
            <button
              key={t.id}
              className={`card hover ${isMaths ? 'accent-maths' : 'accent-science'}`}
              style={{ textAlign: 'left', display: 'grid', gap: 10 }}
              onClick={() => onOpen(t.id)}
            >
              <div className="spread">
                <div className="row gap-10">
                  <div className="topic-emoji">{t.emoji}</div>
                  <div>
                    <div className="mono tiny dim">round {String(idx + 1).padStart(2, '0')}</div>
                    <h3 className="h3">{t.name}</h3>
                  </div>
                </div>
                <span className="mono tiny" style={{ color: tm > 0 ? 'var(--green)' : 'var(--dim)' }}>{tm > 0 ? `${tm}%` : 'new'}</span>
              </div>
              <p className="small muted">{t.tagline}</p>
              {t.examNote && <div className="tiny" style={{ color: 'var(--amber)' }}>In the quiz: {t.examNote}</div>}
              <div className="topic-foot">
                <span>{t.questions.length} questions</span>
                <span>·</span>
                <span>~{t.minutes} min</span>
                {t.lab && <><span>·</span><span style={{ color: 'var(--maths)' }}>interactive lab</span></>}
              </div>
            </button>
          )
        })}

        {!isMaths && (
          <>
            <SpecialCard icon="🧪" title="Identify the achievement" body="3-clue round simulator · 15 achievements" onClick={() => onOpen('clue')} />
            <SpecialCard icon="📺" title="Video round" body="9 clips · what each one is really testing" onClick={() => onOpen('video')} />
            <SpecialCard icon="🛠️" title="Hands-on chits" body="17 demonstrations · 5-minute planner" onClick={() => onOpen('hands')} />
          </>
        )}

        {isMaths && (
          <>
            <SpecialCard icon="⚡" title="Rapid relay" body="90 seconds or 25 questions · mixed pool" onClick={() => onOpen('relay')} />
            <SpecialCard icon="📋" title="Cheat sheet" body="All formulas and facts on one printable page" onClick={() => onOpen('cheat')} />
          </>
        )}
      </div>

      <footer className="footer">
        <span>Work top to bottom — the rounds are ordered by marks per minute.</span>
        <span>{isMaths ? '7 maths rounds' : '4 topics + 3 special rounds'}</span>
      </footer>
    </div>
  )
}

function SpecialCard({ icon, title, body, onClick }: { icon: string; title: string; body: string; onClick: () => void }) {
  return (
    <button className="card hover" style={{ textAlign: 'left', display: 'grid', gap: 10, borderStyle: 'dashed' }} onClick={onClick}>
      <div className="row gap-10">
        <div className="topic-emoji">{icon}</div>
        <div>
          <div className="mono tiny dim">special round</div>
          <h3 className="h3">{title}</h3>
        </div>
      </div>
      <p className="small muted">{body}</p>
      <div className="topic-foot"><span>open</span><span>→</span></div>
    </button>
  )
}

const SPECIALS = {
  clue: {
    icon: '🧪',
    title: 'Identify the achievement',
    kicker: 'Science · 3-clue round',
    blurb: 'The quizmaster reads three clues. Buzz when you know. This is the closest you can get to a rehearsal.',
  },
  video: {
    icon: '📺',
    title: 'Video round',
    kicker: 'Science · visual round',
    blurb: 'Nine clips, each testing one principle. Learn the question behind the clip, not the clip itself.',
  },
  hands: {
    icon: '🛠️',
    title: 'Hands-on activity',
    kicker: 'Science · 5 minutes to think',
    blurb: 'Draw a chit, plan for five minutes, demonstrate in forty seconds. Everything you need is on the card.',
  },
}

export function SpecialPage({ id, onBack }: { id: 'clue' | 'video' | 'hands'; onBack: () => void }) {
  const meta = SPECIALS[id]
  return (
    <div className="fade-in science">
      <button className="btn ghost sm" onClick={onBack}>← Science</button>
      <div className="row wrap gap-10 mt-20">
        <span className="chip science">{meta.kicker}</span>
      </div>
      <h1 className="h1 mt-8" style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}>
        {meta.icon} {meta.title}
      </h1>
      <p className="lede mt-8">{meta.blurb}</p>
      <div className="mt-28">
        {id === 'clue' && <ClueRound />}
        {id === 'video' && <VideoRound />}
        {id === 'hands' && <HandsOn />}
      </div>
    </div>
  )
}
