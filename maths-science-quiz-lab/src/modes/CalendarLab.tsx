import { useMemo, useState } from 'react'
import { DAY_NAMES, MONTHS, dayOfWeek } from '../lib/utils'

function isLeap(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
}

function doomsdayAnchor(year: number) {
  if (year >= 2000 && year < 2100) return { name: 'Tuesday', idx: 2, label: '2000s anchor = Tuesday' }
  if (year >= 1900 && year < 2000) return { name: 'Wednesday', idx: 3, label: '1900s anchor = Wednesday' }
  if (year >= 2100 && year < 2200) return { name: 'Sunday', idx: 0, label: '2100s anchor = Sunday' }
  if (year >= 1800 && year < 1900) return { name: 'Friday', idx: 5, label: '1800s anchor = Friday' }
  return { name: 'Tuesday', idx: 2, label: 'outside 1800–2199 — using the 2000s anchor' }
}

const MONTH_DOOM = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12]

export default function CalendarLab() {
  const [d, setD] = useState(27)
  const [m, setM] = useState(10)
  const [y, setY] = useState(2026)
  const [guess, setGuess] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const calc = useMemo(() => {
    const safeY = Math.min(2199, Math.max(1800, y || 2026))
    const leap = isLeap(safeY)
    const dim = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const safeM = Math.min(12, Math.max(1, m))
    const safeD = Math.min(dim[safeM - 1], Math.max(1, d))
    const dayIdx = dayOfWeek(safeY, safeM, safeD)
    const anchor = doomsdayAnchor(safeY)
    const yy = safeY % 100
    const yearCode = (yy + Math.floor(yy / 4)) % 7
    const ddayIdx = (anchor.idx + yearCode) % 7
    const monthDoomDay = safeM === 1 ? (leap ? 4 : 3) : safeM === 2 ? (leap ? 29 : 28) : MONTH_DOOM[safeM - 1]
    const doomDate = Date.UTC(safeY, safeM - 1, monthDoomDay)
    const targetDate = Date.UTC(safeY, safeM - 1, safeD)
    const diff = Math.round((targetDate - doomDate) / 86400000)
    const checkIdx = ((ddayIdx + diff) % 7 + 7) % 7
    return {
      safeY, safeM, safeD, leap, dayIdx, day: DAY_NAMES[dayIdx], anchor, yy, yearCode, ddayIdx,
      ddayName: DAY_NAMES[ddayIdx], monthDoomDay, diff, checkIdx, consistent: checkIdx === dayIdx,
    }
  }, [d, m, y])

  function submitGuess(idx: number) {
    setGuess(idx)
    setRevealed(true)
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · calendar engine</div>
          <h2 className="h2 mt-8">Pick a date. Watch the doomsday method work.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            Every year has a “doomsday” — a weekday shared by anchor dates like 4/4, 6/6, 8/8, 10/10 and 12/12.
            Get the year’s doomsday, then count the days to your date.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="row wrap gap-10">
            <label className="stack gap-6">
              <span className="q-meta">Day</span>
              <input
                type="number"
                min={1}
                max={31}
                value={d}
                onChange={(e) => { setD(Number(e.target.value)); setGuess(null); setRevealed(false) }}
                className="mono"
                style={{ width: 82, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.25)', fontSize: 16 }}
              />
            </label>
            <label className="stack gap-6">
              <span className="q-meta">Month</span>
              <select
                value={m}
                onChange={(e) => { setM(Number(e.target.value)); setGuess(null); setRevealed(false) }}
                style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: '#0a1828', fontSize: 15 }}
              >
                {MONTHS.map((name, idx) => (
                  <option key={name} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label className="stack gap-6">
              <span className="q-meta">Year</span>
              <input
                type="number"
                min={1800}
                max={2199}
                value={y}
                onChange={(e) => { setY(Number(e.target.value)); setGuess(null); setRevealed(false) }}
                className="mono"
                style={{ width: 110, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.25)', fontSize: 16 }}
              />
            </label>
          </div>

          <div className="divider" />

          <div className="q-meta">Your turn — what day is it?</div>
          <div className="row wrap gap-6 mt-8">
            {DAY_NAMES.map((name, idx) => (
              <button
                key={name}
                className={`btn sm ${revealed && idx === calc.dayIdx ? 'primary' : ''}`}
                onClick={() => submitGuess(idx)}
                style={revealed && idx === guess && idx !== calc.dayIdx ? { borderColor: 'rgba(251,113,133,.6)', color: 'var(--red)' } : undefined}
              >
                {name.slice(0, 3)}
              </button>
            ))}
          </div>

          {revealed && (
            <div className={`feedback ${guess === calc.dayIdx ? 'ok' : 'no'} mt-14`}>
              <span className="verdict">{guess === calc.dayIdx ? 'Correct' : 'Not quite'}</span>
              {calc.safeD} {MONTHS[calc.safeM - 1]} {calc.safeY} is a <b>{calc.day}</b>.
              {!calc.consistent && ' (The quick check disagreed — tell the developer!)'}
            </div>
          )}

          <div className="row wrap gap-10 mt-14">
            <button className="btn sm" onClick={() => { setD(15); setM(8); setY(1947); setGuess(null); setRevealed(false) }}>
              15 Aug 1947
            </button>
            <button className="btn sm" onClick={() => { setD(26); setM(1); setY(1950); setGuess(null); setRevealed(false) }}>
              26 Jan 1950
            </button>
            <button className="btn sm" onClick={() => { setD(2); setM(10); setY(2026); setGuess(null); setRevealed(false) }}>
              2 Oct 2026
            </button>
            <button
              className="btn sm ghost"
              onClick={() => {
                const ny = 1800 + Math.floor(Math.random() * 400)
                const nm = 1 + Math.floor(Math.random() * 12)
                const nd = 1 + Math.floor(Math.random() * 28)
                setY(ny); setM(nm); setD(nd); setGuess(null); setRevealed(false)
              }}
            >
              🎲 Random date
            </button>
          </div>
        </div>

        <div className="card">
          <div className="kicker amber">Working, step by step</div>
          <div className="stack gap-10 mt-14">
            <Step n="1" text={`Century anchor: ${calc.anchor.label}.`} />
            <Step n="2" text={`Year code = ${calc.yy} + ⌊${calc.yy} ÷ 4⌋ = ${calc.yy + Math.floor(calc.yy / 4)} → ${calc.yearCode} odd days.`} />
            <Step n="3" text={`${calc.anchor.name} + ${calc.yearCode} = ${calc.ddayName} (doomsday for ${calc.safeY}).`} />
            <Step
              n="4"
              text={`Anchor date for ${MONTHS[calc.safeM - 1]}: ${calc.monthDoomDay}/${calc.safeM} — a ${calc.ddayName}${calc.leap ? ' (leap year, so Jan 4 / Feb 29)' : ''}.`}
            />
            <Step
              n="5"
              text={`${calc.safeD}/${calc.safeM} is ${Math.abs(calc.diff)} day${Math.abs(calc.diff) === 1 ? '' : 's'} ${calc.diff >= 0 ? 'after' : 'before'} it → shift ${((calc.diff % 7) + 7) % 7}.`}
            />
          </div>
          <div className="keyline">
            <b>Answer</b>
            {calc.safeD} {MONTHS[calc.safeM - 1]} {calc.safeY} → <b style={{ fontSize: 16 }}>{calc.day}</b>
          </div>
          <div className="small dim mt-14">
            Cross-check with the odd-days method: {calc.safeY} has {calc.leap ? 2 : 1} odd day
            {calc.leap ? 's' : ''} in a year. Both routes must agree — if they don’t, you made an arithmetic slip, not a theory slip.
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card tight">
          <div className="kicker">Century anchors</div>
          <table className="calc mt-8">
            <thead>
              <tr>
                <th>Century</th>
                <th>Doomsday</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1800s</td><td className="num">Friday</td></tr>
              <tr><td>1900s</td><td className="num">Wednesday</td></tr>
              <tr><td>2000s</td><td className="num">Tuesday</td></tr>
              <tr><td>2100s</td><td className="num">Sunday</td></tr>
            </tbody>
          </table>
          <div className="tiny dim mt-8">400 years = 0 odd days, so the whole pattern repeats every 400 years.</div>
        </div>
        <div className="card tight">
          <div className="kicker">Odd days in 100-year steps</div>
          <table className="calc mt-8">
            <thead>
              <tr>
                <th>Years</th>
                <th>Odd days</th>
                <th>Years</th>
                <th>Odd days</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>100</td><td className="num">5</td><td>300</td><td className="num">1</td></tr>
              <tr><td>200</td><td className="num">3</td><td>400</td><td className="num">0</td></tr>
              <tr><td>Ordinary year</td><td className="num">1</td><td>Leap year</td><td className="num">2</td></tr>
            </tbody>
          </table>
          <div className="tiny dim mt-8">100 years = 76 ordinary + 24 leap = 36524 days = 5 odd days.</div>
        </div>
      </div>
    </div>
  )
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <div className="row gap-10" style={{ alignItems: 'flex-start' }}>
      <span className="concept-num">{n}</span>
      <span className="small" style={{ color: '#c3d2e2' }}>{text}</span>
    </div>
  )
}
