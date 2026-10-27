import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export interface QStat {
  r: number
  w: number
}

interface Store {
  q: Record<string, QStat>
  /** best score per drill id, 0..1 */
  best: Record<string, number>
  relayBest: number
  relayBest25: number
  done: Record<string, boolean>
  name: string
}

const KEY = 'quizlab.agent2.v1'

const empty: Store = { q: {}, best: {}, relayBest: 0, relayBest25: 0, done: {}, name: '' }

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw)
    return { ...empty, ...parsed, q: parsed.q ?? {}, best: parsed.best ?? {}, done: parsed.done ?? {} }
  } catch {
    return empty
  }
}

interface Ctx extends Store {
  record: (id: string, ok: boolean) => void
  setBest: (id: string, v: number) => void
  setRelay: (score: number, outOf25: boolean) => void
  toggleDone: (id: string) => void
  setName: (n: string) => void
  reset: () => void
  mastery: (ids: string[]) => number
}

const ProgressCtx = createContext<Ctx | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(() => (typeof window === 'undefined' ? empty : load()))

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store))
    } catch {
      /* private mode — ignore */
    }
  }, [store])

  const record = useCallback((id: string, ok: boolean) => {
    setStore((s) => {
      const prev = s.q[id] ?? { r: 0, w: 0 }
      return { ...s, q: { ...s.q, [id]: ok ? { ...prev, r: prev.r + 1 } : { ...prev, w: prev.w + 1 } } }
    })
  }, [])

  const setBest = useCallback((id: string, v: number) => {
    setStore((s) => (v > (s.best[id] ?? 0) ? { ...s, best: { ...s.best, [id]: v } } : s))
  }, [])

  const setRelay = useCallback((score: number, outOf25: boolean) => {
    setStore((s) =>
      outOf25
        ? { ...s, relayBest25: Math.max(s.relayBest25, score) }
        : { ...s, relayBest: Math.max(s.relayBest, score) },
    )
  }, [])

  const toggleDone = useCallback((id: string) => {
    setStore((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } }))
  }, [])

  const setName = useCallback((n: string) => setStore((s) => ({ ...s, name: n })), [])

  const reset = useCallback(() => setStore(empty), [])

  const mastery = useCallback(
    (ids: string[]) => {
      if (!ids.length) return 0
      let score = 0
      for (const id of ids) {
        const st = store.q[id]
        if (!st) continue
        // one clean hit after a mistake should not count as mastery
        if (st.r > 0) score += st.w === 0 ? 1 : 0.6 + Math.min(0.4, st.r * 0.1)
      }
      return Math.min(1, score / ids.length)
    },
    [store.q],
  )

  const value = useMemo<Ctx>(
    () => ({ ...store, record, setBest, setRelay, toggleDone, setName, reset, mastery }),
    [store, record, setBest, setRelay, toggleDone, setName, reset, mastery],
  )

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressCtx)
  if (!ctx) throw new Error('useProgress outside provider')
  return ctx
}
