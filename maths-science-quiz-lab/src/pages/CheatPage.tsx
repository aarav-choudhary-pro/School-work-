import { MATHS_TOPICS } from '../data/maths'
import { SCIENCE_TOPICS } from '../data/science'

const NUMBERS = [
  ['3 painted faces', 'always 8'],
  ['2 faces', '12(n − 2)'],
  ['1 face', '6(n − 2)²'],
  ['0 faces', '(n − 2)³'],
  ['n = 3', '8 · 12 · 6 · 1'],
  ['n = 4', '8 · 24 · 24 · 8'],
  ['n = 5', '8 · 36 · 54 · 27'],
]

const LAST_MINUTES = [
  'Painted cube: 8, 12(n−2), 6(n−2)², (n−2)³.',
  'Dice opposites: (1,6) (2,5) (3,4) — sum 7.',
  'Odd days: ordinary 1, leap 2; 100y 5, 200y 3, 300y 1, 400y 0.',
  'Doomsday 2026 = Saturday; 10/10, 4/4, 6/6, 8/8, 12/12 are anchors.',
  'Mirror time = 11:60 − real time.',
  'Plane-safe letters: A H I M O T U V W X Y.',
  'Direction: right = clockwise 90°; shortest = √(x²+y²).',
  'Ramanujan 1729 · Nash equilibrium · Turing Enigma.',
  'Mitochondria = ATP; lysosome = suicidal bag; ribosome = protein.',
  'Plant: cellulose wall + chloroplast + large vacuole. Animal: centriole.',
  'Ginning cotton · retting jute · shearing wool · reeling silk.',
  'Osmosis = water only; plasmolysis = water loss.',
  'Newton: F = ma; momentum = mv; impulse = Ft.',
  'Action–reaction on different bodies — never cancel.',
  'Nobel Physics 2026: Halzen, IceCube neutrinos.',
  'Nobel Medicine 2026: optogenetics (Deisseroth, Hegemann, Nagel).',
  'Nobel Chemistry 2026: Kagan & Soai, chirality.',
  'Aditya-L1 at L1; EOS-05 first GEO imaging satellite.',
  'Cyclone Arnab; 709 new species; 7 of 9 boundaries breached.',
]

export default function CheatPage({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="fade-in">
      <div className="spread" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="kicker maths">Cheat sheet · all rounds</div>
          <h1 className="h1 mt-8" style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}>The last 25 minutes.</h1>
          <p className="lede mt-8">
            Read top to bottom, out loud. No new topics after this — only things you already met tonight.
          </p>
        </div>
        <button className="btn primary" onClick={() => window.print()}>Print / save as PDF</button>
      </div>

      <div className="card mt-28" style={{ borderColor: 'rgba(251,191,36,.28)', background: 'linear-gradient(150deg, rgba(251,191,36,.09), rgba(255,255,255,.02))' }}>
        <div className="kicker amber">If you remember nothing else</div>
        <div className="grid-2 mt-14">
          {LAST_MINUTES.map((l) => (
            <div key={l} className="row gap-10" style={{ alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--amber)', fontFamily: 'var(--mono)', fontSize: 10, marginTop: 4 }}>▸</span>
              <span className="small" style={{ color: '#f2e6cf' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2 mt-28" style={{ alignItems: 'start' }}>
        <div>
          <div className="kicker maths">Mathematics</div>
          {MATHS_TOPICS.map((t) => (
            <div key={t.id} className="card mt-14">
              <div className="spread">
                <h3 className="h3">{t.emoji} {t.name}</h3>
                <button className="btn sm ghost no-print" onClick={() => onOpen(t.id)}>Open</button>
              </div>
              <div className="divider" style={{ margin: '12px 0' }} />
              {t.cheat.map((b) => (
                <div key={b.title} className="cheat-block" style={{ marginTop: 12 }}>
                  <h3 style={{ fontSize: 14, color: 'var(--maths)' }}>{b.title}</h3>
                  <ul>
                    {b.lines.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <div className="kicker science">Science</div>
          {SCIENCE_TOPICS.map((t) => (
            <div key={t.id} className="card mt-14">
              <div className="spread">
                <h3 className="h3">{t.emoji} {t.name}</h3>
                <button className="btn sm ghost no-print" onClick={() => onOpen(t.id)}>Open</button>
              </div>
              <div className="divider" style={{ margin: '12px 0' }} />
              {t.cheat.map((b) => (
                <div key={b.title} className="cheat-block" style={{ marginTop: 12 }}>
                  <h3 style={{ fontSize: 14, color: 'var(--science)' }}>{b.title}</h3>
                  <ul>
                    {b.lines.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="card mt-14">
            <h3 className="h3">🎲 Painted cube numbers</h3>
            <table className="calc mt-8">
              <thead><tr><th>Case</th><th>Count</th></tr></thead>
              <tbody>
                {NUMBERS.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td className="num">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card mt-14">
            <h3 className="h3">🧪 Round-day checklist</h3>
            <ul className="steps mt-8">
              <li>Carry a rough sheet + two pens. Draw for cube, calendar, direction.</li>
              <li>Hands-on: choose the demo you can finish in 40 seconds, not the flashiest.</li>
              <li>3-clue round: guess early, but never with zero information.</li>
              <li>Video round: name the law, then explain it in one sentence.</li>
              <li>Relay: answer instantly; skip the stuck one. Speed &gt; perfection.</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>Print this page for the bus. It is designed to fit on paper without the UI.</span>
        <span>Now sleep. 🛌</span>
      </footer>
    </div>
  )
}
