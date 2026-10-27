import type { Question } from './types'

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

export function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9.+\-×^ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** tolerant answer checker: ignores case, punctuation, spaces, "the", and common number words */
export function isCorrect(q: Question, raw: string) {
  const given = norm(raw)
  if (!given) return false
  const accepted = [q.answer, ...(q.alts ?? [])].map(norm)
  if (accepted.includes(given)) return true
  // allow "42 cm" style when answer is 42
  const numG = given.match(/-?\d+(\.\d+)?/)
  for (const a of accepted) {
    const numA = a.match(/-?\d+(\.\d+)?/)
    if (numA && numG && Number(numA[0]) === Number(numG[0])) {
      const aLetters = a.replace(numA[0], '').replace(/[^a-z]/g, '')
      const gLetters = given.replace(numG[0], '').replace(/[^a-z]/g, '')
      if (!aLetters || !gLetters) return true
      if (aLetters === gLetters) return true
    }
  }
  return false
}

export function pct(right: number, total: number) {
  if (!total) return 0
  return Math.round((right / total) * 100)
}

export function daysInMonth(y: number, m: number) {
  return new Date(y, m, 0).getDate()
}

/** 0 = Sunday … 6 = Saturday */
export function dayOfWeek(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

/** "4:10" -> "7:50"  (mirror of an analog clock, 12-hour) */
export function mirrorClock(h: number, m: number) {
  let total = 12 * 60 - (h * 60 + m)
  if (total === 0) total = 12 * 60
  let nh = Math.floor(total / 60) % 12
  if (nh === 0) nh = 12
  return { h: nh, m: total % 60 }
}

export function fmtClock(h: number, m: number) {
  return `${h}:${String(m).padStart(2, '0')}`
}

export function pad(n: number, w = 2) {
  return String(n).padStart(w, '0')
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i)
}

export function uniqueBy<T>(arr: T[], key: (t: T) => string) {
  const seen = new Set<string>()
  return arr.filter((x) => {
    const k = key(x)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}
