import { useMemo, useState } from 'react'
import { fmtClock, mirrorClock } from '../lib/utils'

const PLANE_SAFE = new Set('AHIMOTUVWXY'.split(''))
const WATER_SAFE = new Set('BCDEHIKOX'.split(''))

export default function MirrorLab() {
  const [word, setWord] = useState('MOM')
  const [h, setH] = useState(4)
  const [mm, setMm] = useState(10)

  const letters = useMemo(() => word.toUpperCase().replace(/[^A-Z]/g, '').split(''), [word])
  const planeWord = useMemo(() => word.toUpperCase().split('').reverse().join(''), [word])
  const mirror = useMemo(() => mirrorClock(h, mm), [h, mm])

  const planeSafe = letters.every((l) => PLANE_SAFE.has(l)) && planeWord === word.toUpperCase()
  const waterSafe = letters.every((l) => WATER_SAFE.has(l)) && word.toUpperCase().split('').reverse().join('') === word.toUpperCase()

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="kicker maths">Lab · mirror bench</div>
          <h2 className="h2 mt-8">Flip it, don’t rotate it.</h2>
          <p className="small muted mt-8" style={{ maxWidth: '62ch' }}>
            A plane mirror reverses the horizontal axis. Water reverses the vertical axis. Type a word and compare all three.
          </p>
        </div>
      </div>

      <div className="card">
        <label className="stack gap-6">
          <span className="q-meta">Type a word</span>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value.slice(0, 12))}
            className="mono"
            style={{ padding: '12px 14px', borderRadius: 11, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.25)', fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase' }}
          />
        </label>

        <div className="grid-2 mt-20">
          <Stage label="Normal" text={word.toUpperCase() || '—'} />
          <Stage label="Plane mirror (left ↔ right)" text={word.toUpperCase() || '—'} className="flip-x" />
          <Stage label="Water image (top ↕ bottom)" text={word.toUpperCase() || '—'} className="flip-y" />
          <Stage label="Both mirrors" text={word.toUpperCase() || '—'} className="flip-xy" />
        </div>

        <div className="grid-2 mt-20">
          <div className={`feedback ${planeSafe ? 'ok' : 'no'}`}>
            <span className="verdict">Plane mirror test</span>
            {planeSafe
              ? 'This word survives a plane mirror unchanged — palindrome + mirror-safe letters.'
              : `In a mirror it reads “${planeWord}” with flipped letter shapes. Not the same word.`}
          </div>
          <div className={`feedback ${waterSafe ? 'ok' : 'no'}`}>
            <span className="verdict">Water image test</span>
            {waterSafe ? 'This word survives a water image.' : 'Only letters with horizontal symmetry (B C D E H I K O X) can survive a water image.'}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="kicker">Letter safety check</div>
          <div className="row wrap gap-6 mt-14">
            {letters.map((l, idx) => (
              <div
                key={`${l}-${idx}`}
                className="panel-soft"
                style={{ padding: '8px 12px', borderColor: PLANE_SAFE.has(l) ? 'rgba(74,222,128,.45)' : 'rgba(251,113,133,.35)' }}
              >
                <div className="mono" style={{ fontSize: 20, fontWeight: 800 }}>{l}</div>
                <div className="tiny dim" style={{ marginTop: 2 }}>
                  {PLANE_SAFE.has(l) ? 'mirror ✓' : 'mirror ✕'}
                  <br />
                  {WATER_SAFE.has(l) ? 'water ✓' : 'water ✕'}
                </div>
              </div>
            ))}
            {letters.length === 0 && <span className="small dim">Type some letters above.</span>}
          </div>
          <div className="divider" />
          <div className="small muted">
            <b style={{ color: 'var(--maths)' }}>Plane-safe (11):</b> A H I M O T U V W X Y
            <br />
            <b style={{ color: 'var(--maths)' }}>Water-safe (9):</b> B C D E H I K O X
            <br />
            <b style={{ color: 'var(--maths)' }}>Both:</b> H I O X
          </div>
        </div>

        <div className="card">
          <div className="kicker">Clock mirror</div>
          <h3 className="h3 mt-8">mirror = 11:60 − real</h3>
          <div className="row wrap gap-14 mt-14">
            <label className="stack gap-6">
              <span className="q-meta">Hour</span>
              <input
                type="number"
                min={1}
                max={12}
                value={h}
                onChange={(e) => setH(Math.min(12, Math.max(1, Number(e.target.value))))}
                style={{ width: 84, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.25)', fontSize: 16 }}
              />
            </label>
            <label className="stack gap-6">
              <span className="q-meta">Minute</span>
              <input
                type="number"
                min={0}
                max={59}
                value={mm}
                onChange={(e) => setMm(Math.min(59, Math.max(0, Number(e.target.value))))}
                style={{ width: 84, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line-strong)', background: 'rgba(0,0,0,.25)', fontSize: 16 }}
              />
            </label>
          </div>

          <div className="grid-2 keep-2 mt-20" style={{ gap: 10 }}>
            <div className="panel-soft center">
              <div className="mirror-label">Real time</div>
              <div className="mono" style={{ fontSize: 30, fontWeight: 800 }}>{fmtClock(h, mm)}</div>
            </div>
            <div className="panel-soft center">
              <div className="mirror-label">Mirror shows</div>
              <div className="mono" style={{ fontSize: 30, fontWeight: 800, color: 'var(--maths)' }}>{fmtClock(mirror.h, mirror.m)}</div>
            </div>
          </div>
          <div className="small dim mt-14">
            11:60 − {fmtClock(h, mm)} = {fmtClock(mirror.h, mirror.m)}. The rule works both ways: if a mirror shows 2:30, the real time is 9:30.
          </div>
        </div>
      </div>

      <div className="grid-3">
        <Tip title="Plane mirror" body="Left ↔ right swap. Head stays up. Letters reverse order AND shape." />
        <Tip title="Water image" body="Top ↕ bottom swap. Use it for reflections in a lake or a polished table." />
        <Tip title="Double mirror" body="Two mirrors at 90° cancel the reversal — the image is not flipped at all." />
      </div>
    </div>
  )
}

function Stage({ label, text, className = '' }: { label: string; text: string; className?: string }) {
  return (
    <div className="panel-soft">
      <div className="mirror-label">{label}</div>
      <div className="mirror-stage" style={{ border: 0, padding: '14px 6px', background: 'transparent' }}>
        <span className={className}>{text}</span>
      </div>
    </div>
  )
}

function Tip({ title, body }: { title: string; body: string }) {
  return (
    <div className="card tight">
      <div className="kicker amber">{title}</div>
      <p className="small mt-8" style={{ color: '#c3d2e2' }}>{body}</p>
    </div>
  )
}
