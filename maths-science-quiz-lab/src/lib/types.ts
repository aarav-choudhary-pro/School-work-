export type Subject = 'maths' | 'science'

export type Difficulty = 1 | 2 | 3

export interface Question {
  /** stable id — used to remember what you got wrong */
  id: string
  topic: string
  subject: Subject
  prompt: string
  /** for MCQs. Leave empty for a "type the answer" question. */
  options?: string[]
  /** exact option text (for MCQ) or the canonical answer (for input) */
  answer: string
  /** accepted alternate spellings for input questions */
  alts?: string[]
  explain: string
  difficulty?: Difficulty
  /** short tag e.g. "formula", "trap", "current-affairs" */
  tag?: string
}

export interface Concept {
  title: string
  body: string
  /** one-line takeaway shown in a highlight strip */
  key?: string
  /** bullet list, formulas or a step recipe */
  list?: string[]
}

export interface WorkedExample {
  q: string
  steps: string[]
  answer: string
}

export interface CheatBlock {
  title: string
  lines: string[]
}

export interface Topic {
  id: string
  subject: Subject
  name: string
  emoji: string
  tagline: string
  /** minutes for a first pass, used by the study plan */
  minutes: number
  concept: Concept[]
  examples: WorkedExample[]
  questions: Question[]
  cheat: CheatBlock[]
  lab?: 'cube' | 'dice' | 'calendar' | 'direction' | 'mirror' | 'crossword' | 'letters' | 'cell' | 'fibre' | 'motion' | 'clue' | 'video' | 'handsOn' | 'news' | 'movies'
  /** what the quizmaster will probably ask, in one line */
  examNote?: string
}

export interface ClueItem {
  id: string
  clues: [string, string, string]
  answer: string
  alts?: string[]
  fact: string
  tag: string
}

export interface HandsOnChit {
  id: string
  title: string
  materials: string[]
  steps: string[]
  science: string
  pitch: string
  question: string
  answer: string
  difficulty: Difficulty
}

export interface RelayItem {
  id: string
  q: string
  a: string
  alts?: string[]
  tag: string
}
