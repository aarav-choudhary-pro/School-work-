import { useState } from 'react'
import { FILMS } from '../data/rounds'
import { shuffle } from '../lib/utils'

export default function MoviesLab() {
  const [deck, setDeck] = useState(FILMS)
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = deck[i]

  function move(delta: number) {
    setI((n) => (n + delta + deck.length) % deck.length)
    setFlipped(false)
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · film flashcards</div>
          <h2 className="h2 mt-8">Title. Person. One idea.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            The clip round is won by naming the film AND the mathematician AND the idea. Tap the card to flip, then say all three out loud before you check.
          </p>
        </div>
        <button className="btn ghost sm" onClick={() => { setDeck(shuffle(FILMS)); setI(0); setFlipped(false) }}>Shuffle</button>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className={`flash ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((f) => !f) } }}>
            <div className="flash-inner">
              <div className="flash-face">
                <div className="kicker maths">What film is it?</div>
                <div className="h2" style={{ marginTop: 6 }}>{card.film}</div>
                <div className="mono dim" style={{ fontSize: 12 }}>{card.year}</div>
                <div className="small muted mt-14">{card.hook}</div>
                <div className="tiny dim mt-20">Tap to reveal person + idea</div>
              </div>
              <div className="flash-face back">
                <div className="kicker maths">The answer</div>
                <div className="h3" style={{ color: 'var(--maths)' }}>{card.person}</div>
                <div className="small mt-8" style={{ color: '#d7e6f5' }}>{card.idea}</div>
                <div className="tiny dim mt-20">Tap to flip back</div>
              </div>
            </div>
          </div>

          <div className="row spread mt-14">
            <button className="btn ghost" onClick={() => move(-1)}>← Prev</button>
            <span className="mono tiny dim">{i + 1} / {deck.length}</span>
            <button className="btn primary" onClick={() => move(1)}>Next →</button>
          </div>
        </div>

        <div className="stack gap-14">
          <div className="card tight">
            <div className="kicker amber">The five that matter most</div>
            <div className="stack gap-10 mt-14 small" style={{ color: '#c3d2e2' }}>
              <div><b>A Beautiful Mind</b> — Nash — Nash equilibrium</div>
              <div><b>The Imitation Game</b> — Turing — Enigma / Turing test</div>
              <div><b>The Man Who Knew Infinity</b> — Ramanujan — partitions / 1729</div>
              <div><b>Hidden Figures</b> — Johnson, Vaughan, Jackson — NASA orbits</div>
              <div><b>The Theory of Everything</b> — Hawking — black holes</div>
            </div>
          </div>
          <div className="banner">
            <b>Trap alert.</b> Good Will Hunting is a real film about a <i>fictional</i> mathematician. If the quizmaster asks “who was the mathematician?”, say “Will Hunting — he’s fictional”.
          </div>
          <div className="card tight">
            <div className="kicker">Indian mathematicians bank</div>
            <div className="stack gap-6 mt-8 tiny" style={{ color: '#c3d2e2' }}>
              <div>Aryabhata — π ≈ 3.1416 · Earth rotates</div>
              <div>Brahmagupta — rules for zero</div>
              <div>Bhaskara II — Lilavati</div>
              <div>Madhava — infinite series for π</div>
              <div>Ramanujan — 1729 · partitions</div>
              <div>C. R. Rao — statistics · 29 June</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
