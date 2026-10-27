import { useMemo, useRef, useState } from 'react'
import { CW_BONUS_CLUES, CW_ENTRIES, CW_GRID, CW_SIZE } from '../data/crossword'

type Dir = 'across' | 'down'

export default function CrosswordLab() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Record<string, 'right' | 'wrong'>>({})
  const [dir, setDir] = useState<Dir>('across')
  const [revealed, setRevealed] = useState(false)
  const inputs = useRef<Record<string, HTMLInputElement | null>>({})

  const [rows, cols] = CW_SIZE
  const numbers = useMemo(() => {
    const m: Record<string, number> = {}
    for (const e of CW_ENTRIES) m[`${e.row}-${e.col}`] = e.num
    return m
  }, [])

  const solution = (r: number, c: number) => CW_GRID[r]?.[c] ?? ''

  function setCell(r: number, c: number, raw: string) {
    const val = raw.slice(-1).toUpperCase().replace(/[^A-Z]/g, '')
    setValues((v) => ({ ...v, [`${r}-${c}`]: val }))
    setStatus({})
    if (val) advance(r, c)
  }

  function advance(r: number, c: number) {
    if (dir === 'across') {
      for (let cc = c + 1; cc < cols; cc++) {
        if (solution(r, cc)) {
          inputs.current[`${r}-${cc}`]?.focus()
          return
        }
      }
    } else {
      for (let rr = r + 1; rr < rows; rr++) {
        if (solution(rr, c)) {
          inputs.current[`${rr}-${c}`]?.focus()
          return
        }
      }
    }
  }

  function back(r: number, c: number) {
    if (dir === 'across' && solution(r, c - 1)) inputs.current[`${r}-${c - 1}`]?.focus()
    if (dir === 'down' && solution(r - 1, c)) inputs.current[`${r - 1}-${c}`]?.focus()
  }

  function check() {
    const next: Record<string, 'right' | 'wrong'> = {}
    let right = 0
    let filled = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sol = solution(r, c)
        if (!sol) continue
        const val = values[`${r}-${c}`] ?? ''
        if (!val) continue
        filled++
        if (val === sol) {
          next[`${r}-${c}`] = 'right'
          right++
        } else next[`${r}-${c}`] = 'wrong'
      }
    }
    setStatus(next)
    if (filled === 0) window.alert('Fill a few letters first.')
    else if (right === filled && filled === totalLetters) window.alert('Solved — clean sweep. 🎉')
  }

  function reveal() {
    const all: Record<string, string> = {}
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (solution(r, c)) all[`${r}-${c}`] = solution(r, c)
    setValues(all)
    setRevealed(true)
    setStatus({})
  }

  function clear() {
    setValues({})
    setStatus({})
    setRevealed(false)
  }

  const totalLetters = useMemo(() => CW_GRID.join('').replace(/\./g, '').length, [])
  const filledCount = Object.values(values).filter(Boolean).length
  const across = CW_ENTRIES.filter((e) => e.dir === 'across')
  const down = CW_ENTRIES.filter((e) => e.dir === 'down')

  function focusEntry(e: (typeof CW_ENTRIES)[number]) {
    setDir(e.dir)
    inputs.current[`${e.row}-${e.col}`]?.focus()
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · crossword grid</div>
          <h2 className="h2 mt-8">Nine words. One grid. Two minutes.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '64ch' }}>
            Fill the science words. Click a clue to jump to its first box. A crossing letter is free information — use it.
          </p>
        </div>
        <div className="row wrap gap-6">
          <div className="pill-toggle">
            <button className={dir === 'across' ? 'on' : ''} onClick={() => setDir('across')}>Across</button>
            <button className={dir === 'down' ? 'on' : ''} onClick={() => setDir('down')}>Down</button>
          </div>
          <button className="btn sm" onClick={check}>Check</button>
          <button className="btn sm ghost" onClick={clear}>Clear</button>
          <button className="btn sm ghost" onClick={reveal}>{revealed ? 'Revealed' : 'Reveal'}</button>
        </div>
      </div>

      <div className="card">
        <div className="cw-wrap">
          <div>
            <div className="cw-grid" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((__, c) => {
                  const sol = solution(r, c)
                  const key = `${r}-${c}`
                  if (!sol) return <div key={key} className="cw-cell blank" />
                  return (
                    <div key={key} className="cw-cell filled">
                      {numbers[key] && <span className="cw-num">{numbers[key]}</span>}
                      <input
                        ref={(el) => { inputs.current[key] = el }}
                        value={values[key] ?? ''}
                        className={status[key] ?? ''}
                        onChange={(e) => setCell(r, c, e.target.value)}
                        onFocus={() => {
                          // pick the direction that has a word through this cell
                          const hasAcross = CW_ENTRIES.some((e) => e.dir === 'across' && e.row === r && c >= e.col && c < e.col + e.answer.length)
                          const hasDown = CW_ENTRIES.some((e) => e.dir === 'down' && e.col === c && r >= e.row && r < e.row + e.answer.length)
                          if (hasAcross && !hasDown) setDir('across')
                          else if (hasDown && !hasAcross) setDir('down')
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !values[key]) {
                            e.preventDefault()
                            back(r, c)
                          }
                          if (e.key === 'ArrowRight' && solution(r, c + 1)) inputs.current[`${r}-${c + 1}`]?.focus()
                          if (e.key === 'ArrowLeft' && solution(r, c - 1)) inputs.current[`${r}-${c - 1}`]?.focus()
                          if (e.key === 'ArrowDown' && solution(r + 1, c)) inputs.current[`${r + 1}-${c}`]?.focus()
                          if (e.key === 'ArrowUp' && solution(r - 1, c)) inputs.current[`${r - 1}-${c}`]?.focus()
                        }}
                        inputMode="text"
                        autoCapitalize="characters"
                        autoComplete="off"
                        spellCheck={false}
                        aria-label={`Row ${r + 1} column ${c + 1}`}
                      />
                    </div>
                  )
                }),
              )}
            </div>
            <div className="row spread mt-14">
              <span className="tiny dim">
                {filledCount} / {totalLetters} letters filled
              </span>
              <span className="tiny dim">1 letter per box · no gaps</span>
            </div>
          </div>

          <div className="cw-clues">
            <div>
              <div className="kicker maths">Across</div>
              <div className="stack gap-6 mt-8">
                {across.map((e) => (
                  <div key={`a-${e.num}`} className="cw-clue" onClick={() => focusEntry(e)}>
                    <b>{e.num}</b>
                    <span>{e.clue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="kicker science">Down</div>
              <div className="stack gap-6 mt-8">
                {down.map((e) => (
                  <div key={`d-${e.num}`} className="cw-clue" onClick={() => focusEntry(e)}>
                    <b style={{ color: 'var(--science)' }}>{e.num}</b>
                    <span>{e.clue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card tight">
          <div className="kicker amber">If a clue is unfair</div>
          <p className="small mt-8" style={{ color: '#c3d2e2' }}>
            Count letters first. A 4-letter answer cannot be “mitochondria”. Crossings will eliminate half the options before you even know the word.
          </p>
        </div>
        <div className="card tight">
          <div className="kicker amber">Rapid-fire definitions</div>
          <div className="stack gap-6 mt-8">
            {CW_BONUS_CLUES.map((b) => (
              <details key={b.clue} className="small">
                <summary style={{ cursor: 'pointer', color: '#c3d2e2' }}>{b.clue}</summary>
                <div className="mono mt-8" style={{ color: 'var(--green)' }}>{b.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
