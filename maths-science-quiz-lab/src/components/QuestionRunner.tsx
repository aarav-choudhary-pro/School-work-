import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '../lib/types'
import { isCorrect, pct, shuffle } from '../lib/utils'
import { useProgress } from '../lib/progress'

interface Props {
  questions: Question[]
  /** used to store the best score */
  runId: string
  title?: string
  mode?: 'drill' | 'boss'
  shuffleQuestions?: boolean
  limit?: number
  subject?: 'maths' | 'science'
  onExit?: () => void
}

interface Answered {
  q: Question
  ok: boolean
  given: string
}

export default function QuestionRunner({
  questions,
  runId,
  title = 'Drill',
  mode = 'drill',
  shuffleQuestions = true,
  limit,
  subject = 'maths',
  onExit,
}: Props) {
  const { record, setBest } = useProgress()
  const [round, setRound] = useState(0)
  const [deck, setDeck] = useState<Question[]>(() => makeDeck(questions, mode, shuffleQuestions, limit))
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [answered, setAnswered] = useState(false)
  const [ok, setOk] = useState(false)
  const [results, setResults] = useState<Answered[]>([])
  const [finished, setFinished] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const q = deck[i]
  const isInput = !q?.options?.length
  const rightCount = results.filter((r) => r.ok).length
  const total = deck.length

  useEffect(() => {
    setDeck(makeDeck(questions, mode, shuffleQuestions, limit))
    setI(0)
    setPicked(null)
    setTyped('')
    setAnswered(false)
    setResults([])
    setFinished(false)
    setSeconds(0)
  }, [questions, mode, shuffleQuestions, limit, round])

  useEffect(() => {
    if (mode !== 'boss' || finished) return
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(t)
  }, [mode, finished])

  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  useEffect(() => {
    if (isInput && !answered) inputRef.current?.focus()
  }, [i, isInput, answered])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (e.key === 'Enter' && answered) goNext()
        return
      }
      if (!answered && q?.options) {
        const n = Number(e.key)
        if (n >= 1 && n <= q.options.length) choose(q.options[n - 1])
      } else if (answered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const wrongList = useMemo(() => results.filter((r) => !r.ok), [results])

  if (!q) {
    return (
      <div className="card">
        <p className="muted">No questions loaded for this set yet.</p>
      </div>
    )
  }

  function choose(value: string) {
    if (answered) return
    const correct = isCorrect(q, value)
    setPicked(value)
    setAnswered(true)
    setOk(correct)
    record(q.id, correct)
    setResults((r) => [...r, { q, ok: correct, given: value }])
  }

  function submitTyped(e: React.FormEvent) {
    e.preventDefault()
    if (!typed.trim() || answered) return
    choose(typed.trim())
  }

  function goNext() {
    if (!answered) return
    if (i + 1 >= deck.length) {
      const finalResults = results
      const score = finalResults.filter((r) => r.ok).length / Math.max(1, finalResults.length)
      setBest(`${runId}:${mode}`, score)
      setFinished(true)
      return
    }
    setI((n) => n + 1)
    setPicked(null)
    setTyped('')
    setAnswered(false)
  }

  function retryWrong() {
    setDeck(wrongList.map((r) => r.q))
    setI(0)
    setPicked(null)
    setTyped('')
    setAnswered(false)
    setResults([])
    setFinished(false)
    setSeconds(0)
    setRound((r) => r + 1)
  }

  function restart() {
    setDeck(makeDeck(questions, mode, shuffleQuestions, limit))
    setI(0)
    setPicked(null)
    setTyped('')
    setAnswered(false)
    setResults([])
    setFinished(false)
    setSeconds(0)
    setRound((r) => r + 1)
  }

  if (finished) {
    const score = rightCount
    const percentage = pct(score, total)
    return (
      <div className={`card fade-in ${subject}`}>
        <div className="spread" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="kicker maths">{title} · complete</div>
            <div className="row" style={{ alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <div className="score-big">{percentage}%</div>
              <div className="muted">
                {score} / {total} correct
              </div>
            </div>
            <p className="small muted mt-8">
              {percentage >= 85
                ? 'Locked in. This is stage-ready.'
                : percentage >= 60
                  ? 'Solid base. Run the wrong ones once more and it sticks.'
                  : 'Good — now you know exactly where the marks are. Retry the misses.'}
            </p>
          </div>
          {mode === 'boss' && (
            <div className="stat">
              <b>
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
              </b>
              <span>time taken</span>
            </div>
          )}
        </div>

        {wrongList.length > 0 && (
          <div className="mt-20">
            <div className="kicker amber">Fix these before you move on</div>
            <div className="stack gap-10 mt-8">
              {wrongList.map((w) => (
                <div key={w.q.id} className="panel-soft">
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{w.q.prompt}</div>
                  <div className="small mt-8">
                    <span className="mono" style={{ color: 'var(--green)' }}>
                      ✓ {w.q.answer}
                    </span>
                    {w.given && (
                      <span className="dim">
                        {' '}
                        · you said “{w.given}”
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="row wrap mt-20">
          {wrongList.length > 0 && (
            <button className="btn primary" onClick={retryWrong}>
              Retry the {wrongList.length} miss{wrongList.length > 1 ? 'es' : ''}
            </button>
          )}
          <button className="btn" onClick={restart}>
            Fresh run
          </button>
          {onExit && (
            <button className="btn ghost" onClick={onExit}>
              Back
            </button>
          )}
        </div>
      </div>
    )
  }

  const optionState = (opt: string) => {
    if (!answered) return ''
    if (opt === q.answer) return 'correct'
    if (opt === picked) return 'wrong'
    return 'dimmed'
  }

  return (
    <div className={`runner ${subject}`}>
      <div className="runner-top">
        <div className="row gap-10">
          <span className={`chip ${subject === 'maths' ? 'maths' : 'science'}`}>{title}</span>
          <span className="q-meta">
            Q {i + 1} / {total}
          </span>
        </div>
        <div className="row gap-10">
          {mode === 'boss' && (
            <span className="q-meta">
              ⏱ {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
            </span>
          )}
          <span className="q-meta" style={{ color: 'var(--green)' }}>
            ✓ {rightCount}
          </span>
          <span className="q-meta" style={{ color: 'var(--red)' }}>
            ✕ {results.length - rightCount}
          </span>
        </div>
      </div>
      <div className="progress-line">
        <i style={{ width: `${((i + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <div className="q-prompt">{q.prompt}</div>

      {isInput ? (
        <form onSubmit={submitTyped} className="stack gap-10">
          <div className="input-row">
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Type your answer…"
              disabled={answered}
              autoComplete="off"
              spellCheck={false}
            />
            <button className="btn primary" type="submit" disabled={answered || !typed.trim()}>
              Check
            </button>
          </div>
          {answered && (
            <div className={`feedback ${ok ? 'ok' : 'no'}`}>
              <span className="verdict">{ok ? 'Correct' : `Answer: ${q.answer}`}</span>
              {q.explain}
            </div>
          )}
        </form>
      ) : (
        <div className="options">
          {q.options!.map((opt, idx) => (
            <button
              key={opt}
              className={`option ${optionState(opt)}`}
              onClick={() => choose(opt)}
              disabled={answered}
            >
              <span className="key">{'ABCD'[idx] ?? idx + 1}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      )}

      {answered && !isInput && (
        <div className={`feedback ${ok ? 'ok' : 'no'}`}>
          <span className="verdict">{ok ? 'Correct' : `The answer is ${q.answer}`}</span>
          {q.explain}
        </div>
      )}

      <div className="spread" style={{ marginTop: 2 }}>
        <div className="tiny dim">
          <span className="kbd">1</span>–<span className="kbd">4</span> to answer · <span className="kbd">Enter</span> for next
        </div>
        {answered ? (
          <button ref={nextRef} className="btn primary" onClick={goNext}>
            {i + 1 >= total ? 'Finish' : 'Next question'} →
          </button>
        ) : (
          <span className="tiny dim">Answer to continue</span>
        )}
      </div>
    </div>
  )
}

function makeDeck(questions: Question[], mode: 'drill' | 'boss', doShuffle: boolean, limit?: number) {
  const base = doShuffle ? shuffle(questions) : [...questions]
  if (mode === 'boss') return shuffle(questions).slice(0, Math.min(limit ?? 10, questions.length))
  return limit ? base.slice(0, limit) : base
}
