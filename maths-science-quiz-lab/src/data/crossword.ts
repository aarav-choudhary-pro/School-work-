export interface CWEntry {
  num: number
  dir: 'across' | 'down'
  row: number
  col: number
  answer: string
  clue: string
}

export const CW_SIZE: [number, number] = [8, 13]

export const CW_GRID: string[] = [
  'MOMENTUM.....',
  'A.I.Y..ENZYME',
  'S.T.L..M.....',
  'S.O.O..B.....',
  '..S.N..ROOT..',
  '..I....A.....',
  '..SILK.NEWTON',
  '.......E.....',
]

export const CW_ENTRIES: CWEntry[] = [
  { num: 1, dir: 'across', row: 0, col: 0, answer: 'MOMENTUM', clue: 'Mass multiplied by velocity (8)' },
  { num: 1, dir: 'down', row: 0, col: 0, answer: 'MASS', clue: 'Amount of matter in a body (4)' },
  { num: 2, dir: 'down', row: 0, col: 2, answer: 'MITOSIS', clue: 'Cell division that makes two identical cells (7)' },
  { num: 3, dir: 'down', row: 0, col: 4, answer: 'NYLON', clue: 'First fully synthetic fibre (5)' },
  { num: 4, dir: 'down', row: 0, col: 7, answer: 'MEMBRANE', clue: 'Selectively permeable cell boundary (8)' },
  { num: 5, dir: 'across', row: 1, col: 7, answer: 'ENZYME', clue: 'Biological catalyst (6)' },
  { num: 6, dir: 'across', row: 4, col: 7, answer: 'ROOT', clue: 'Absorbs water by osmosis (4)' },
  { num: 7, dir: 'across', row: 6, col: 2, answer: 'SILK', clue: 'Fibre from a cocoon (4)' },
  { num: 8, dir: 'across', row: 6, col: 7, answer: 'NEWTON', clue: 'Unit of force (6)' },
]

/** extra clues for a second, quicker round (no grid needed) */
export const CW_BONUS_CLUES: { clue: string; answer: string }[] = [
  { clue: '7-letter organelle called the suicidal bag', answer: 'LYSOSOME' },
  { clue: '5-letter force that opposes motion', answer: 'FRICTION' },
  { clue: '7-letter word for the cell’s control centre', answer: 'NUCLEUS' },
  { clue: '6-letter process of separating cotton seeds from lint', answer: 'GINNING' },
  { clue: '5-letter word for a number with only two factors', answer: 'PRIME' },
  { clue: '5-letter word for the space between two rays', answer: 'ANGLE' },
  { clue: '8-letter quantity: mass × velocity', answer: 'MOMENTUM' },
  { clue: '4-letter golden fibre', answer: 'JUTE' },
]
