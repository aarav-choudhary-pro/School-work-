import type { Question, Topic } from '../lib/types'

const Q = (
  id: string,
  topic: string,
  prompt: string,
  options: string[] | undefined,
  answer: string,
  explain: string,
  extra: Partial<Question> = {},
): Question => ({ id, topic, subject: 'maths', prompt, options, answer, explain, difficulty: 2, ...extra })

/* ─────────────────────────────────────────────────────────────
   1 · NUMBER SERIES & ANALOGY
   ───────────────────────────────────────────────────────────── */
const series: Topic = {
  id: 'series',
  subject: 'maths',
  name: 'Number Series & Analogy',
  emoji: '🔢',
  tagline: 'Find the rule before you find the number.',
  minutes: 25,
  examNote: 'Quizmasters love “? at the end”. 90% of them are one of six rules — check them in order.',
  concept: [
    {
      title: 'The 6 rules that cover almost everything',
      body: 'Check these in order. The first one that fits the whole series is your rule.',
      list: [
        'DIFFERENCE: same jump each time → 5, 9, 13, 17 (+4).',
        'SECOND DIFFERENCE: jumps grow evenly → 2, 5, 10, 17 (+3, +5, +7).',
        'RATIO: multiply by the same number → 3, 9, 27, 81 (×3).',
        'MIXED: multiply then add → 5, 11, 23, 47 (×2 + 1).',
        'SQUARES / CUBES ± a small number → 3, 8, 15, 24 (n² − 1).',
        'TWO SERIES IN ONE: positions alternate → 7, 10, 8, 11, 9, 12 (+3, −2, +3, −2).',
      ],
      key: 'Always test the difference first. If the differences are not equal, look at the differences of the differences.',
    },
    {
      title: 'The series “ladder” (use this every time)',
      body: 'Write the gaps under the series. Do not do it in your head — the pattern is in the gaps.',
      list: [
        'Write: 4, 9, 16, 25, 36, ?',
        'Gaps: +5, +7, +9, +11 → next gap +13',
        'Next term: 36 + 13 = 49',
        'If gaps are 5, 7, 9, 11 the gaps themselves follow +2 → that is a second-difference series.',
      ],
    },
    {
      title: 'Analogy = “same relationship”',
      body: 'An analogy gives you a pair A : B, then C : ?. Name the relationship in words, then apply it.',
      list: [
        '4 : 64 → “cube it” → 7 : 343',
        '9 : 81 → “square it” → 12 : 144',
        '5 : 125 → cube, not square. Say the verb out loud.',
        'Common verbs: squared, cubed, doubled + 1, digit-sum, ×3 − 2, opposite letter.',
      ],
      key: 'Write the relationship as an equation (B = A³). That is faster and safer than “feeling” it.',
    },
    {
      title: 'Letter positions & the A–Z trick',
      body: 'A=1, B=2 … Z=26. Opposite letters add to 27: A↔Z, B↔Y, C↔X, D↔W, E↔V.',
      list: [
        'AZ, BY, CX, DW, EV — a classic “opposite pairs” series.',
        'B, D, G, K, P, ? → +2, +3, +4, +5, +6 → V (22nd letter).',
        'E = 5, J = 10, O = 15, T = 20, Y = 25 → +5 letters each time.',
        'Reverse alphabet: Z=1 … A=26. Learn EJOTY (5, 10, 15, 20, 25) to jump fast.',
      ],
    },
    {
      title: 'Odd-one-out & number analogy traps',
      body: 'For odd-one-out, test two things: perfect squares/cubes, and the digital root.',
      list: [
        '121, 144, 169, 180, 196 → all squares except 180.',
        'Digital root = keep adding digits until one digit: 1729 → 1+7+2+9 = 19 → 10 → 1.',
        '2 : 4, 3 : 9, 4 : 16, 5 : 20 → the odd pair is 5 : 20 (should be 25).',
      ],
    },
  ],
  examples: [
    {
      q: 'Find the next term: 2, 6, 12, 20, 30, ?',
      steps: [
        'Write the gaps: +4, +6, +8, +10.',
        'The gaps rise by 2 each time, so the next gap is +12.',
        '30 + 12 = 42.',
        'Shortcut: these are 1×2, 2×3, 3×4, 4×5, 5×6 → next 6×7 = 42.',
      ],
      answer: '42',
    },
    {
      q: 'Find the next term: 5, 11, 23, 47, ?',
      steps: [
        'Gaps are +6, +12, +24 — they double, but that is a symptom, not the rule.',
        'Test “×2 then add”: 5×2+1 = 11, 11×2+1 = 23, 23×2+1 = 47.',
        'Next: 47×2+1 = 95.',
      ],
      answer: '95',
    },
    {
      q: 'Complete the analogy: 4 : 64 :: 7 : ?',
      steps: ['Name the relationship: 4³ = 64, so the rule is “cube the first number”.', '7³ = 7×7×7 = 343.', 'Do not write 49 — that is the square, the most common trap.'],
      answer: '343',
    },
  ],
  questions: [
    Q('ns-01', 'series', '2, 6, 12, 20, 30, ?', ['36', '40', '42', '44'], '42', 'Differences +4, +6, +8, +10, so next is +12. Or n(n+1): 6×7 = 42.', { difficulty: 1 }),
    Q('ns-02', 'series', '3, 8, 15, 24, 35, ?', ['46', '48', '49', '50'], '48', 'These are n² − 1: 4−1, 9−1, 16−1, 25−1, 36−1 → 49 − 1 = 48. Differences +5, +7, +9, +11, +13 also works.'),
    Q('ns-03', 'series', '5, 11, 23, 47, ?', ['94', '95', '96', '99'], '95', 'Rule: ×2 + 1. 47 × 2 + 1 = 95.'),
    Q('ns-04', 'series', '1, 8, 27, 64, ?', ['100', '121', '125', '216'], '125', 'Perfect cubes 1³, 2³, 3³, 4³ → 5³ = 125.'),
    Q('ns-05', 'series', '7, 10, 8, 11, 9, 12, ?', ['10', '13', '14', '15'], '10', 'Two series interleaved: odd places 7, 8, 9, 10 and even places 10, 11, 12. The 7th term is in the first series → 10.', { difficulty: 3 }),
    Q('ns-06', 'series', '100, 96, 88, 76, 60, ?', ['44', '40', '36', '48'], '40', 'Differences −4, −8, −12, −16, so next is −20: 60 − 20 = 40.'),
    Q('ns-07', 'series', '0, 7, 26, 63, 124, ?', ['215', '212', '216', '217'], '215', 'Rule n³ − 1: 1−1, 8−1, 27−1, 64−1, 125−1, 216−1 = 215.', { difficulty: 3 }),
    Q('ns-08', 'series', '2, 5, 10, 17, 26, ?', ['35', '36', '37', '38'], '37', 'n² + 1: 1+1, 4+1, 9+1, 16+1, 25+1, 36+1 = 37. Gaps +3, +5, +7, +9, +11 confirm it.'),
    Q('ns-09', 'series', '1, 9, 25, 49, 81, ?', ['100', '121', '144', '169'], '121', 'Squares of odd numbers 1, 3, 5, 7, 9, 11 → 121.'),
    Q('ns-10', 'series', 'B, D, G, K, P, ?', ['T', 'U', 'V', 'W'], 'V', 'B=2, D=4 (+2), G=7 (+3), K=11 (+4), P=16 (+5), then +6 → 22 = V.', { difficulty: 3 }),
    Q('ns-11', 'series', '4 : 64 :: 7 : ?', ['49', '343', '196', '294'], '343', 'The first number is cubed (4³ = 64), so 7³ = 343. 49 is the square trap.'),
    Q('ns-12', 'series', '6 : 12 :: 9 : ?', ['18', '81', '27', '36'], '18', 'Simple doubling: 6 → 12, so 9 → 18. Check for a fancier rule only if doubling fails on a second pair.', { difficulty: 1 }),
    Q('ns-13', 'series', 'AZ, BY, CX, ?', ['DV', 'DW', 'EW', 'DX'], 'DW', 'First letters go A, B, C, D; second letters go Z, Y, X, W. Opposite letters always add up to 27.', { difficulty: 1 }),
    Q('ns-14', 'series', 'Odd one out: 121, 144, 169, 180, 196', ['121', '144', '180', '196'], '180', 'All are perfect squares (11², 12², 13², 14²) except 180.'),
    Q('ns-15', 'series', '2, 12, 36, 80, 150, ?', ['216', '240', '252', '270'], '252', 'Rule n²(n+1): 1×2, 4×3, 9×4, 16×5, 25×6, 36×7 = 252.', { difficulty: 3 }),
    Q('ns-16', 'series', '121, 112, 103, 94, ?', ['85', '86', '84', '83'], '85', 'Each term drops by 9 → 94 − 9 = 85.'),
    Q('ns-17', 'series', 'Which pair does NOT follow the same rule?', ['2 : 4', '3 : 9', '4 : 16', '5 : 20'], '5 : 20', 'The rule is “square it”: 5² = 25, not 20.'),
    Q('ns-18', 'series', 'One term is wrong in 2, 6, 14, 30, 60, 126. Which one?', ['14', '30', '60', '126'], '60', 'The rule is ×2 + 2: 2→6→14→30→62→126. So 60 should be 62.', { difficulty: 3, tag: 'trap' }),
  ],
  cheat: [
    {
      title: 'The series checklist',
      lines: [
        '1. Differences equal? → arithmetic (+d).',
        '2. Differences growing evenly? → second difference.',
        '3. Ratio constant? → geometric (×r).',
        '4. ×r + c? → multiply then add.',
        '5. Near squares/cubes? → n² ± c, n³ ± c.',
        '6. Alternating? → two interleaved series.',
      ],
    },
    {
      title: 'Analogy verbs',
      lines: ['square / cube', 'double / halve', '×3 − 1', 'digit sum', 'opposite letter (sum 27)', 'a² + b or a × (a+1)'],
    },
    {
      title: 'Letters',
      lines: ['A=1 … Z=26', 'Opposites sum 27: A↔Z, B↔Y, C↔X', 'EJOTY = 5, 10, 15, 20, 25', 'Reverse position = 27 − position'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   2 · CUBE & DICE
   ───────────────────────────────────────────────────────────── */
const cube: Topic = {
  id: 'cube',
  subject: 'maths',
  name: 'Cube & Dice',
  emoji: '🧊',
  tagline: 'One painted cube, four formulas, zero mistakes.',
  minutes: 25,
  lab: 'cube',
  examNote: 'A painted cube cut into small cubes is the single most repeated question in school quizzes. Learn the four counts.',
  concept: [
    {
      title: 'The painted-cube formula sheet',
      body: 'An n × n × n cube is painted on ALL faces, then cut into n³ unit cubes. Count small cubes by how many painted faces they have.',
      list: [
        '3 painted faces = 8 (the 8 corners — always 8).',
        '2 painted faces = 12(n − 2) (edges, corners removed).',
        '1 painted face = 6(n − 2)² (centre of each face).',
        '0 painted faces = (n − 2)³ (the hidden inner cube).',
        'Check: 8 + 12(n−2) + 6(n−2)² + (n−2)³ = n³.',
      ],
      key: 'Memorise n = 3: 8, 12, 6, 1 (total 27). Every other n is built from the same expressions.',
    },
    {
      title: 'Get to the table in 20 seconds',
      body: 'If the numbers are small, just write n and compute. Quiz answers are usually 3, 4, 5 or 6.',
      list: [
        'n = 4 → 8, 24, 24, 8 (total 64).',
        'n = 5 → 8, 36, 54, 27 (total 125).',
        'n = 6 → 8, 48, 96, 64 (total 216).',
        'The “no paint” count is (n−2)³, the easiest one to remember — inner cube of side n−2.',
      ],
    },
    {
      title: 'Variants the quizmaster might try',
      body: 'Same cube, different painting. Reduce it to “which layer is painted?”.',
      list: [
        'Painted on only 2 opposite faces: 2n² small cubes carry paint (two full slabs, no overlap).',
        'Painted on only 1 face: n² cubes carry paint.',
        'Painted on 2 adjacent faces: 2n² − n cubes painted (the shared edge counted twice).',
        '“Minimum cuts” into n³ cubes: 3(n − 1) cuts (n−1 along each axis). For 27 cubes → 6 cuts.',
      ],
    },
    {
      title: 'Dice rule 1: opposite faces sum to 7',
      body: 'A standard die has 1-6, 2-5, 3-4 as opposite pairs. So 1 can NEVER be adjacent to 6, 2 never to 5, 3 never to 4.',
      list: [
        'If two faces are visible together, they are adjacent → they cannot be an opposite pair.',
        'Top + bottom = 7, front + back = 7, left + right = 7 — always.',
        'If 2 is on top and 4 in front, bottom = 5 and back = 3.',
      ],
      key: 'Opposite pairs = (1,6), (2,5), (3,4). Any view of a corner shows one number from each pair.',
    },
    {
      title: 'Dice rule 2: reading two views',
      body: 'When the same die is shown twice, compare what is common and what moved.',
      list: [
        'TWO faces common: the third faces are opposite each other.',
        'ONE face common and the same on top: the other four form a ring — two views can pin the ring order.',
        'Three faces in a view: one from each opposite pair, never a pair.',
        'Net folding: in a straight row of 4 squares, 1st & 3rd are opposite, 2nd & 4th are opposite; the two “flaps” left and right are opposite.',
      ],
    },
  ],
  examples: [
    {
      q: 'A 5 × 5 × 5 cube is painted on all faces and cut into 125 unit cubes. How many have exactly 2 painted faces?',
      steps: [
        '2 painted faces sit on edges, excluding corners.',
        'There are 12 edges, and each edge has n − 2 cubes that are not corners.',
        '12 × (5 − 2) = 12 × 3 = 36.',
      ],
      answer: '36',
    },
    {
      q: 'A 4 × 4 × 4 painted cube is cut. How many unit cubes have no paint at all?',
      steps: [
        'The unpainted cubes form the inner cube, with side n − 2.',
        '(4 − 2)³ = 2³ = 8.',
        'Check: 8 + 24 + 24 + 8 = 64 = 4³ ✓',
      ],
      answer: '8',
    },
    {
      q: 'Two views of the same die show faces {1, 2, 3} and {1, 2, 4}. Which number is opposite 3?',
      steps: [
        '1 and 2 are common to both views.',
        'The faces that differ are 3 and 4.',
        'With two common faces, the remaining faces are opposite each other → 3 is opposite 4.',
        'Standard-die check: 3 + 4 = 7 ✓',
      ],
      answer: '4',
    },
  ],
  questions: [
    Q('cb-01', 'cube', 'A cube is painted on all faces and cut into 27 small cubes. How many cubes have exactly 3 painted faces?', ['4', '6', '8', '12'], '8', 'Only the 8 corners have three painted faces — for any n ≥ 2 the answer is 8.', { difficulty: 1 }),
    Q('cb-02', 'cube', 'A 5 × 5 × 5 painted cube is cut. How many small cubes have exactly 2 painted faces?', ['24', '36', '48', '54'], '36', '12(n − 2) = 12 × 3 = 36 — the 12 edges minus their corners.'),
    Q('cb-03', 'cube', 'A 4 × 4 × 4 painted cube is cut. How many small cubes have exactly 1 painted face?', ['8', '16', '24', '32'], '24', '6(n − 2)² = 6 × 2² = 24 — centre blocks of the 6 faces.'),
    Q('cb-04', 'cube', 'A 5 × 5 × 5 painted cube is cut. How many small cubes have no painted face?', ['9', '18', '27', '36'], '27', '(n − 2)³ = 3³ = 27 — the hidden inner cube.'),
    Q('cb-05', 'cube', 'An n × n × n painted cube is cut into 216 unit cubes. How many have paint on exactly 2 faces?', ['24', '36', '48', '64'], '48', '216 = 6³, so n = 6. 12(6 − 2) = 48.'),
    Q('cb-06', 'cube', 'In a 6 × 6 × 6 painted cube cut into 216 cubes, which category is the LARGEST?', ['3 faces painted', '2 faces painted', '1 face painted', '0 faces painted'], '1 face painted', 'The counts are 8, 48, 96, 64 — one painted face wins with 96.'),
    Q('cb-07', 'cube', 'A cube painted on all faces is cut into 64 equal cubes. How many have exactly one painted face?', ['16', '24', '32', '8'], '24', '64 = 4³ → n = 4; 6(4−2)² = 24.'),
    Q('cb-08', 'cube', 'What is the minimum number of straight cuts needed to divide a cube into 27 equal smaller cubes?', ['3', '4', '6', '9'], '6', 'You need n − 1 = 2 cuts along each of the 3 axes → 3 × 2 = 6.'),
    Q('cb-09', 'cube', 'A cube is painted on only two opposite faces and cut into 125 cubes. How many small cubes have paint?', ['25', '50', '48', '75'], '50', 'Two full painted slabs of n² = 25 each, and opposite faces never overlap: 2 × 25 = 50.', { difficulty: 3 }),
    Q('cb-10', 'cube', 'On a standard die, which pair of numbers can NEVER appear on adjacent faces?', ['1 and 2', '2 and 6', '3 and 4', '5 and 6'], '3 and 4', 'Opposite pairs of a standard die are (1,6), (2,5), (3,4). Opposites can never be seen together.', { difficulty: 1 }),
    Q('cb-11', 'cube', 'A standard die shows 4 on top and 2 in front. What are the bottom and back faces?', ['3 and 5', '3 and 1', '5 and 3', '1 and 6'], '3 and 5', 'Top 4 → bottom 3 (sum 7). Front 2 → back 5 (sum 7).'),
    Q('cb-12', 'cube', 'Two views of the same die show faces {1, 2, 3} and {1, 5, 3}. Which number is opposite 2?', ['1', '3', '5', '6'], '5', '1 and 3 are common to both views, so the remaining faces — 2 and 5 — must be opposite.', { difficulty: 3 }),
    Q('cb-13', 'cube', 'If two views of a block are {1, 2, 3} and {1, 2, 4}, which statement must be true?', ['3 is opposite 4', '1 is opposite 4', '2 is opposite 3', '1 is opposite 2'], '3 is opposite 4', 'The common faces are 1 and 2, so the two different faces (3 and 4) must be opposite.'),
    Q('cb-14', 'cube', 'In a cube net, four squares lie in one straight row: 1, 2, 3, 4. Which square is opposite 1?', ['2', '3', '4', 'none'], '3', 'In a row of four, alternate squares are opposite: 1↔3 and 2↔4.', { tag: 'net' }),
  ],
  cheat: [
    {
      title: 'Painted cube — all 6 faces',
      lines: ['3 faces: 8', '2 faces: 12(n−2)', '1 face: 6(n−2)²', '0 faces: (n−2)³', 'n=3 → 8,12,6,1 · n=4 → 8,24,24,8 · n=5 → 8,36,54,27'],
    },
    {
      title: 'Other painting patterns',
      lines: ['1 face only: n²', '2 opposite faces: 2n²', '2 adjacent faces: 2n² − n', 'minimum cuts into n³: 3(n−1)'],
    },
    {
      title: 'Dice',
      lines: ['Opposites: (1,6) (2,5) (3,4) — sum 7', 'Visible together ⇒ adjacent ⇒ cannot be opposite', 'Two views, 2 faces common ⇒ remaining faces are opposite', 'View of a corner = one number from each pair'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   3 · CALENDAR
   ───────────────────────────────────────────────────────────── */
const calendar: Topic = {
  id: 'calendar',
  subject: 'maths',
  name: 'Calendar',
  emoji: '📅',
  tagline: 'Odd days, leap years, and the doomsday shortcut.',
  minutes: 25,
  lab: 'calendar',
  examNote: 'Either “what day was this date?” or “what day after N days?”. Odd days answers both.',
  concept: [
    {
      title: 'Odd days — the whole chapter in one word',
      body: 'A week has 7 days. Any leftover days after removing complete weeks are called odd days, and they shift the weekday.',
      list: [
        'Ordinary year = 365 days = 52 weeks + 1 day → 1 odd day.',
        'Leap year = 366 days = 52 weeks + 2 days → 2 odd days.',
        'If today is Monday, the same date next year is Tuesday (ordinary) or Wednesday (leap year).',
        'N odd days shift the day by N: 10 odd days = 10 ÷ 7 → 3 remaining → shift by 3.',
      ],
      key: 'Odd days = total days mod 7. Nothing else is needed.',
    },
    {
      title: 'Which years are leap?',
      body: 'Divisible by 4 → leap year, EXCEPT centuries. A century is leap only if divisible by 400.',
      list: [
        '2024, 2028 leap. 1900 NOT leap. 2000 leap. 2100 NOT leap.',
        'February in a leap year has 29 days → 29 Feb exists.',
        'A leap year repeats its calendar after 28 years (usually). 2024 → 2052.',
      ],
    },
    {
      title: 'Century odd days (memorise the table)',
      body: 'These come from 100 years = 76 ordinary + 24 leap years = 36524 days = 5 odd days.',
      list: [
        '100 years → 5 odd days',
        '200 years → 3 odd days',
        '300 years → 1 odd day',
        '400 years → 0 odd days (400 years = exact number of weeks)',
        'Hence the calendar repeats every 400 years.',
      ],
      key: '100 → 5, 200 → 3, 300 → 1, 400 → 0. Remember it as 5-3-1-0.',
    },
    {
      title: 'Day of the week for a full date (school method)',
      body: 'Break the date into completed years, completed months, and days — then add the odd days.',
      list: [
        'Example: 15 August 1947.',
        'Years: 1900 → 1 (19 centuries = 4×400 + 300 → 0 + 1).',
        'Years 1901–1946: 46 years = 11 leap + 35 ordinary (46÷4 = 11) → 46 + 11 = 57 odd days → 57 mod 7 = 1.',
        'Months Jan–Jul 1947: 31+28+31+30+31+30+31 = 212 days → 212 mod 7 = 2.',
        'Add the date 15 → 15 mod 7 = 1. Total = 1 + 1 + 2 + 1 = 5 → Friday.',
      ],
      key: 'Total odd days mod 7: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday.',
    },
    {
      title: 'The doomsday shortcut (10 seconds)',
      body: 'Every year has anchor dates that fall on the same weekday, called the doomsday. Learn the anchor for the century, adjust by year, then count.',
      list: [
        'Century anchor: 1900 → Wednesday, 2000 → Tuesday, 2100 → Sunday.',
        'Year code = (last two digits + ⌊last two ÷ 4⌋) mod 7. Add to century anchor.',
        'Same-weekday dates: 4/4, 6/6, 8/8, 10/10, 12/12, 5/9, 9/5, 7/11, 11/7, 3/14, 2/28 (2/29 in leap), 1/3 (1/4 in leap).',
        'Example 27 Oct 2026: 26 + 6 = 32 → 4; Tuesday + 4 = Saturday. 10 Oct 2026 is Saturday → 27 Oct is 17 days later → Tuesday.',
      ],
      key: 'For 2000s: doomsday = Tuesday + (yy + yy÷4) mod 7.',
    },
    {
      title: 'Question types you will actually get',
      body: 'Three shapes, three reflexes.',
      list: [
        '“Day after N days?” → N mod 7 and shift.',
        '“If 1 Jan 2024 is Monday, what is 1 Jan 2025?” → 2024 is leap → +2 → Wednesday.',
        '“Which year has the same calendar as 2026?” → ordinary year repeats after 6 or 11 years; 2026 → 2037 (11 years later).',
        '“How many times does 29 Feb occur in 100 years?” → 24 (century 1900 has 24; a 400-year block has 97).',
      ],
    },
  ],
  examples: [
    {
      q: 'If 1 January 2024 is a Monday, what day is 1 January 2025?',
      steps: ['2024 is a leap year → 2 odd days.', 'Monday + 2 = Wednesday.', 'No need to count months — you jumped exactly one year.'],
      answer: 'Wednesday',
    },
    {
      q: 'Today is Tuesday. What day will it be after 100 days?',
      steps: ['100 ÷ 7 = 14 weeks remainder 2.', 'So 100 days = 14 weeks + 2 odd days.', 'Tuesday + 2 = Thursday.'],
      answer: 'Thursday',
    },
    {
      q: 'How many odd days are there in 300 years?',
      steps: ['100 years → 5 odd days.', '200 years → 3 (5 + 5 = 10 → 3).', '300 years → 1 (3 + 5 = 8 → 1).'],
      answer: '1 odd day',
    },
  ],
  questions: [
    Q('cl-01', 'calendar', 'How many odd days are there in an ordinary year?', ['0', '1', '2', '3'], '1', '365 ÷ 7 = 52 weeks + 1 day → 1 odd day.', { difficulty: 1 }),
    Q('cl-02', 'calendar', 'How many odd days are there in a leap year?', ['1', '2', '3', '4'], '2', '366 ÷ 7 = 52 weeks + 2 days.', { difficulty: 1 }),
    Q('cl-03', 'calendar', 'Which of these is NOT a leap year?', ['1600', '1900', '2000', '2024'], '1900', 'Centuries need divisibility by 400. 1900 ÷ 400 is not whole → not leap.', { difficulty: 1 }),
    Q('cl-04', 'calendar', 'How many odd days are there in 400 years?', ['0', '1', '3', '5'], '0', '400 years contain exactly 20 871 weeks, so 0 odd days — that is why calendars repeat after 400 years.'),
    Q('cl-05', 'calendar', 'If 1 January 2024 is Monday, what day is 1 January 2025?', ['Tuesday', 'Wednesday', 'Thursday', 'Monday'], 'Wednesday', '2024 is leap → 2 odd days → Monday + 2 = Wednesday.'),
    Q('cl-06', 'calendar', 'If today is Tuesday, what day is it after 100 days?', ['Wednesday', 'Thursday', 'Friday', 'Saturday'], 'Thursday', '100 = 14×7 + 2 → shift by 2 → Thursday.'),
    Q('cl-07', 'calendar', '15 August 1947 fell on which day?', ['Thursday', 'Friday', 'Saturday', 'Sunday'], 'Friday', 'The standard result: India’s first Independence Day was a Friday. Odd days: 1900→1, 1901–46→1, Jan–Jul→2, date→1, total 5 → Friday.'),
    Q('cl-08', 'calendar', '26 January 1950 (first Republic Day) was which day?', ['Wednesday', 'Thursday', 'Friday', 'Saturday'], 'Thursday', 'Republic Day 1950 = Thursday. A classic quiz fact.'),
    Q('cl-09', 'calendar', 'In 100 years, how many times does 29 February occur?', ['24', '25', '26', '27'], '24', 'In the 1900s there are 25 leap years by the ÷4 rule, but 1900 is not leap → 24.'),
    Q('cl-10', 'calendar', 'A leap year’s calendar repeats after how many years (usual case)?', ['4', '11', '28', '400'], '28', 'After 28 years a leap year falls on the same weekdays again (the 4-year leap cycle × 7 odd days).'),
    Q('cl-11', 'calendar', 'If 1 March 2025 is Saturday, what day is 1 March 2026?', ['Saturday', 'Sunday', 'Monday', 'Tuesday'], 'Sunday', 'March 2025 → March 2026 spans no 29 Feb, so 1 odd day → Sunday.'),
    Q('cl-12', 'calendar', 'How many odd days are there in 200 years?', ['1', '3', '5', '0'], '3', '100 → 5, so 200 → 10 mod 7 = 3.'),
    Q('cl-13', 'calendar', 'Which date is a “doomsday” for EVERY year (same weekday as 4/4)?', ['1 January', '14 March', '15 August', '31 December'], '14 March', '14 March (3/14, pi day) always shares the weekday with 4/4, 6/6, 8/8, 10/10 and 12/12.', { difficulty: 3 }),
    Q('cl-14', 'calendar', 'In the 2000s, doomsday of a year = Tuesday + (yy + yy÷4) mod 7. What weekday is 10 October 2026?', ['Thursday', 'Friday', 'Saturday', 'Sunday'], 'Saturday', 'yy = 26 → 26 + 6 = 32 → 4. Tuesday + 4 = Saturday. 10/10 is a doomsday, so 10 Oct 2026 = Saturday.', { difficulty: 3 }),
  ],
  cheat: [
    {
      title: 'Odd days',
      lines: ['Ordinary year: 1', 'Leap year: 2', '100 y: 5 · 200 y: 3 · 300 y: 1 · 400 y: 0', '0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat'],
    },
    {
      title: 'Leap year',
      lines: ['÷4 → leap', 'century must be ÷400', '1900 ✗ · 2000 ✓ · 2100 ✗', '29 Feb occurs 24 times per ordinary century'],
    },
    {
      title: 'Doomsday anchors (2000s)',
      lines: ['4/4 · 6/6 · 8/8 · 10/10 · 12/12', '5/9 and 9/5 · 7/11 and 11/7', '14/3 · 28/2 (29/2) · 3/1 (4/1 in leap)', '2026 doomsday = Saturday'],
    },
    {
      title: 'Known dates',
      lines: ['15 Aug 1947 — Friday', '26 Jan 1950 — Thursday', '2 Oct 2026 — Friday', '15 Aug 2026 — Saturday'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   4 · DIRECTION
   ───────────────────────────────────────────────────────────── */
const direction: Topic = {
  id: 'direction',
  subject: 'maths',
  name: 'Direction & Distance',
  emoji: '🧭',
  tagline: 'Draw it. Never do it in your head.',
  minutes: 22,
  lab: 'direction',
  examNote: 'Almost always: a short walk, two turns, then “how far from the start?” — that is a Pythagoras question in disguise.',
  concept: [
    {
      title: 'The compass and the 45° family',
      body: 'Eight names: North, North-East, East, South-East, South, South-West, West, North-West.',
      list: [
        'Clockwise order: N → NE → E → SE → S → SW → W → NW.',
        'Right turn = +90° (N → E). Left turn = −90° (N → W).',
        'About-turn = 180°.',
        'NE means exactly 45° between N and E — the “mid” direction.',
      ],
      key: 'Facing North? Right = East, Left = West, Back = South. Rotate this whole set for other facings.',
    },
    {
      title: 'Turn arithmetic',
      body: 'Track ONLY the facing direction in degrees. Movement direction = facing direction before the turn.',
      list: [
        'Start facing N (0°). Turn right → 90° = E. Turn left from E → 0° = N.',
        'Three right turns from N → W (270°). Four right turns → back to N.',
        '“Turn 45° clockwise from North” → NE.',
        'Sunrise is East. At sunrise your shadow falls West.',
      ],
    },
    {
      title: 'Distance: the 3-4-5 reflex',
      body: 'Any two perpendicular moves create a right triangle. Shortest distance = √(x² + y²).',
      list: [
        '3 km East + 4 km North → 5 km from start.',
        '5 and 12 → 13. 8 and 15 → 17. 7 and 24 → 25.',
        'Moves in opposite directions cancel: 5 E then 3 W = 2 E net.',
        'If the question asks “total distance walked”, ADD the steps — do not use Pythagoras.',
      ],
      key: 'Displacement = straight line from start (Pythagoras). Distance = total path (addition). Read which one is asked.',
    },
    {
      title: 'The reliable 15-second method',
      body: 'Use a cross on your rough sheet with N marked. Number each instruction.',
      list: [
        'Start at (0,0). N = +y, S = −y, E = +x, W = −x.',
        'Write each move as a coordinate pair.',
        'Final direction from start = arctan(y/x), snapped to N/NE/E…',
        'Shadow questions: shadow is opposite the Sun.',
      ],
    },
  ],
  examples: [
    {
      q: 'A man walks 4 km North, turns right and walks 3 km. How far is he from the start?',
      steps: [
        'North = (0, 4). Right turn from North = East → (3, 4).',
        'The two legs are perpendicular, so use Pythagoras.',
        '√(3² + 4²) = √25 = 5 km.',
      ],
      answer: '5 km',
    },
    {
      q: 'Facing South, I turn 45° anticlockwise, then 90° clockwise. Which direction am I facing?',
      steps: ['Face South (180°). Anticlockwise 45° → 135° = South-East.', 'Clockwise 90° from SE → 225° = South-West.', 'Or reason: the two turns cancel by 45° clockwise from South → SW.'],
      answer: 'South-West',
    },
  ],
  questions: [
    Q('dr-01', 'direction', 'A man walks 3 km East, then 4 km North. How far is he from the starting point?', ['5 km', '7 km', '1 km', '12 km'], '5 km', '3-4-5 right triangle: √(9 + 16) = 5 km.', { difficulty: 1 }),
    Q('dr-02', 'direction', 'Walking North, I turn right twice. Which direction am I facing now?', ['North', 'East', 'South', 'West'], 'South', 'Each right turn is 90°: North → East → South.', { difficulty: 1 }),
    Q('dr-03', 'direction', 'Facing West, I turn 90° anticlockwise. What direction now?', ['North', 'South', 'East', 'West'], 'South', 'From West, anticlockwise (towards South) 90° → South.'),
    Q('dr-04', 'direction', 'A person walks 5 km South, 4 km West, 5 km North. How far from the start?', ['4 km West', '4 km East', '0 km', '9 km West'], '4 km West', 'The 5 South and 5 North cancel; only 4 West remains.'),
    Q('dr-05', 'direction', 'At sunrise, a boy faces the rising Sun. Where does his shadow fall?', ['East', 'West', 'North', 'South'], 'West', 'The Sun rises in the East, so the shadow points opposite → West.', { difficulty: 1 }),
    Q('dr-06', 'direction', 'A man is facing North. He turns 45° clockwise, then 180°. Which direction does he face?', ['North-West', 'South-East', 'South-West', 'South'], 'South-West', 'North + 45° = NE; 180° more → SW.'),
    Q('dr-07', 'direction', 'You walk 8 km East, 6 km North. What is the shortest distance back to the start?', ['10 km', '14 km', '2 km', '48 km'], '10 km', '6-8-10 triangle (2 × 3-4-5). √(64+36) = 10.'),
    Q('dr-08', 'direction', 'Ravi walks 10 m North, turns left and walks 6 m, then turns left and walks 10 m. How far and in which direction from start?', ['6 m West', '6 m East', '16 m East', '4 m West'], '6 m West', 'North and South legs cancel; the middle leg is West. (Start N, left = West.)'),
    Q('dr-09', 'direction', 'A car drives 7 km West, 4 km South, 7 km East. Where is it relative to the start?', ['4 km North', '4 km South', '3 km West', '11 km East'], '4 km South', 'West and East cancel; only 4 km South remains.'),
    Q('dr-10', 'direction', 'If North-East is renamed North, which physical direction is then called East?', ['North-East', 'South-East', 'East', 'South-West'], 'South-East', 'Every name has shifted one step anticlockwise, so the name “East” now sits on the physical South-East.'),
    Q('dr-11', 'direction', 'Two friends start at the same point. A walks 5 km North, B walks 5 km East. What is the shortest distance between them?', ['5 km', '10 km', '5√2 km ≈ 7.07 km', '2.5 km'], '5√2 km ≈ 7.07 km', 'Right triangle with equal legs: √(25+25) = 5√2 ≈ 7.07 km.', { difficulty: 3 }),
    Q('dr-12', 'direction', 'A man walks 15 m South, turns right and walks 8 m, then turns right again and walks 15 m. Where is he from the start?', ['8 m West', '8 m East', '15 m South', '23 m South'], '8 m West', 'South and North cancel; he ends 8 m West of the start (first right from South = West, the second right faces North).'),
  ],
  cheat: [
    {
      title: 'Turn rules',
      lines: ['Right = +90° clockwise', 'Left = −90° anticlockwise', 'Two rights = about-turn', 'Facing N: R=E, L=W, back=S'],
    },
    {
      title: 'Pythagoras triples',
      lines: ['3-4-5', '5-12-13', '6-8-10', '8-15-17', '7-24-25'],
    },
    {
      title: 'Shadow',
      lines: ['Sunrise: Sun East → shadow West', 'Sunset: Sun West → shadow East', 'Noon in India: Sun South → shadow North'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   5 · MOVIES & MATHEMATICIANS
   ───────────────────────────────────────────────────────────── */
const movies: Topic = {
  id: 'movies',
  subject: 'maths',
  name: 'Movies & Mathematicians',
  emoji: '🎬',
  tagline: 'The clip round: title, person, one famous idea.',
  minutes: 20,
  lab: 'movies',
  examNote: 'A clip or poster plays; you name the film AND the mathematician. Always add the idea — that wins tie-breaks.',
  concept: [
    {
      title: 'The five films that cover most maths-clip rounds',
      body: 'If the clip shows a blackboard, a code machine, or NASA, it is one of these.',
      list: [
        'A Beautiful Mind (2001) — John Nash — Nash equilibrium, Nobel Economics 1994.',
        'The Imitation Game (2014) — Alan Turing — Turing machine, Enigma, Turing test.',
        'The Man Who Knew Infinity (2015) — Srinivasa Ramanujan — partitions, 1729, Hardy.',
        'Hidden Figures (2016) — Katherine Johnson, Dorothy Vaughan, Mary Jackson — NASA trajectories.',
        'The Theory of Everything (2014) — Stephen Hawking — black holes, Hawking radiation.',
      ],
      key: 'Title + person + one idea. Three words each is enough: “Imitation Game — Turing — Enigma.”',
    },
    {
      title: 'Second row: also fair game',
      body: 'Indian and recent films show up in inter-house quizzes because they are easy to clip.',
      list: [
        'Super 30 (2019) — Anand Kumar — free IIT-JEE coaching to 30 students.',
        'Shakuntala Devi (2020) — the “human computer” — 7,686,369,774,870 × 2,465,099,745,779 in 28 seconds (1980).',
        'Agora (2009) — Hypatia of Alexandria — ancient woman mathematician, killed 415 CE.',
        'The Current War / Oppenheimer (2023) — physics, not maths: Edison–Tesla, J. Robert Oppenheimer.',
        'Good Will Hunting (1997) — Will Hunting is FICTIONAL; the maths advisor was real (Sheldon Glashow cameo in a bar? no — the equations are real).',
        'x+y / A Brilliant Young Mind (2014) — an International Maths Olympiad story (fictionalised).',
      ],
    },
    {
      title: 'Mathematician flash facts',
      body: 'One distinctive hook per person — that is what a quiz needs.',
      list: [
        'Aryabhata (476 CE) — Aryabhatiya; gave π ≈ 3.1416; said Earth rotates on its axis.',
        'Brahmagupta (598 CE) — first rules for zero and negative numbers; Brahma-sphuta-siddhanta.',
        'Bhaskara II (1114 CE) — Lilavati; early ideas of infinitesimals and the derivative.',
        'Madhava (1340–1425) — Kerala school; infinite series for π; “Madhava–Leibniz” series.',
        'Ramanujan (1887–1920) — 1729 = 1³+12³ = 9³+10³; partition numbers; died at 32.',
        'C. R. Rao (1920–2023) — Indian statistician; Rao–Blackwell theorem; National Statistics Day 29 June.',
        'Maryam Mirzakhani (1977–2017) — first woman to win the Fields Medal (2014); geometry of curved surfaces.',
        'Emmy Noether — “Noether’s theorem”: every symmetry gives a conservation law.',
        'Katherine Johnson (1918–2020) — calculated Friendship 7 and Apollo 11 trajectories by hand.',
        'Shakuntala Devi (1929–2013) — 2011 “human calculator”; wrote “Figuring: The Joy of Numbers”.',
      ],
    },
    {
      title: 'The “trap” answers',
      body: 'Quizmasters add fake mathematicians to catch teams that only recognise the face.',
      list: [
        'Good Will Hunting & Will Hunting = fictional. Give the film, say “fictional character”.',
        'The Imitation Game is Turing, NOT Einstein.',
        'Oppenheimer = physicist, not a mathematician — say it if the question distinguishes.',
        'The Man Who Knew Infinity = Ramanujan, not Aryabhata. (Ramanujan is a different film, 2014.)',
        'Hidden Figures = three women, not one. Name all three if the question allows.',
      ],
    },
  ],
  examples: [
    {
      q: 'A clip shows a young man writing infinite series on a slate in a temple town; an Englishman arrives. Name the film and the mathematician.',
      steps: ['Slate + temple town + English patron → Ramanujan.', 'Film: The Man Who Knew Infinity (2015).', 'Add a fact: he told Hardy 1729 was “interesting but not unique”.'],
      answer: 'The Man Who Knew Infinity — Srinivasa Ramanujan',
    },
    {
      q: 'A clip shows a machine with wires decoding messages in wartime. Name the film, the mathematician, and the machine.',
      steps: ['War + code machine → Alan Turing and Enigma.', 'Film: The Imitation Game (2014).', 'The German cipher machine was Enigma; the Bombe broke it at Bletchley Park.'],
      answer: 'The Imitation Game — Alan Turing — Enigma',
    },
  ],
  questions: [
    Q('mv-01', 'movies', 'Which film is about the mathematician John Nash?', ['A Beautiful Mind', 'Good Will Hunting', 'The Imitation Game', 'The Theory of Everything'], 'A Beautiful Mind', 'A Beautiful Mind (2001) — Nash equilibrium, game theory, Nobel Prize in Economics 1994.', { difficulty: 1 }),
    Q('mv-02', 'movies', 'The Man Who Knew Infinity is about which mathematician?', ['Aryabhata', 'C. R. Rao', 'Srinivasa Ramanujan', 'Shakuntala Devi'], 'Srinivasa Ramanujan', 'Ramanujan, played by Dev Patel. Hardy narrates his life at Cambridge.', { difficulty: 1 }),
    Q('mv-03', 'movies', 'Which mathematician’s work broke the Enigma code in World War II?', ['Alan Turing', 'John von Neumann', 'Kurt Gödel', 'G. H. Hardy'], 'Alan Turing', 'Alan Turing led the code-breaking at Bletchley Park; the device was the Bombe.', { difficulty: 1 }),
    Q('mv-04', 'movies', 'Hidden Figures celebrates three women. Who among these is NOT one of them?', ['Katherine Johnson', 'Dorothy Vaughan', 'Mary Jackson', 'Emmy Noether'], 'Emmy Noether', 'The three NASA women are Katherine Johnson, Dorothy Vaughan and Mary Jackson. Noether was a German mathematician.', { difficulty: 1 }),
    Q('mv-05', 'movies', 'Which film dramatises Stephen Hawking’s life?', ['The Theory of Everything', 'Interstellar', 'A Beautiful Mind', 'Oppenheimer'], 'The Theory of Everything', 'The Theory of Everything (2014), based on Jane Hawking’s memoir. Hawking radiation is his famous idea.'),
    Q('mv-06', 'movies', 'In Good Will Hunting, the genius Will Hunting is a…', ['real Harvard professor', 'fictional character', 'NASA engineer', 'Fields Medal winner'], 'fictional character', 'The character is fictional. This is a favourite trick — the film is real, the mathematician is not.'),
    Q('mv-07', 'movies', 'The film Shakuntala Devi is about…', ['India’s first woman astronaut', 'a human calculator', 'a chess champion', 'a space scientist'], 'a human calculator', 'Shakuntala Devi (1929–2013) was called the “human computer”. In 1980 she multiplied two 13-digit numbers in 28 seconds.'),
    Q('mv-08', 'movies', 'Super 30 (2019) is based on which maths teacher?', ['Anand Kumar', 'Ramanujan', 'C. R. Rao', 'Harish Chandra'], 'Anand Kumar', 'Anand Kumar coached 30 underprivileged students a year for IIT-JEE in Patna.', { difficulty: 1 }),
    Q('mv-09', 'movies', 'Which mathematician’s name is attached to the number 1729?', ['Ramanujan', 'Aryabhata', 'Euler', 'Gauss'], 'Ramanujan', '1729 = 1³ + 12³ = 9³ + 10³, the Hardy–Ramanujan taxicab number.'),
    Q('mv-10', 'movies', 'Who is regarded as the first woman mathematician of recorded history?', ['Hypatia of Alexandria', 'Maryam Mirzakhani', 'Katherine Johnson', 'Emmy Noether'], 'Hypatia of Alexandria', 'Hypatia (c. 355–415 CE) taught mathematics and astronomy in Alexandria; the film Agora is about her.'),
    Q('mv-11', 'movies', 'Who was the first woman to win the Fields Medal?', ['Maryam Mirzakhani', 'Emmy Noether', 'Katherine Johnson', 'Shakuntala Devi'], 'Maryam Mirzakhani', 'Maryam Mirzakhani won the Fields Medal in 2014 for work on curved surfaces and moduli spaces.'),
    Q('mv-12', 'movies', 'Emmy Noether’s theorem connects symmetry with…', ['prime numbers', 'conservation laws', 'probability', 'fractals'], 'conservation laws', 'Every continuous symmetry has a conserved quantity: time symmetry → energy, space symmetry → momentum.'),
    Q('mv-13', 'movies', 'Which Indian mathematician gave π ≈ 3.1416 and wrote the Aryabhatiya?', ['Aryabhata', 'Brahmagupta', 'Bhaskara II', 'Madhava'], 'Aryabhata', 'Aryabhata (476–550 CE) also argued that the Earth rotates on its axis.'),
    Q('mv-14', 'movies', 'The scientist in Oppenheimer (2023) is a…', ['mathematician', 'physicist', 'chemist', 'biologist'], 'physicist', 'J. Robert Oppenheimer was a theoretical physicist — Manhattan Project, Trinity test, 1945.'),
    Q('mv-15', 'movies', 'Which mathematician gave the first systematic rules for zero and negative numbers?', ['Brahmagupta', 'Pythagoras', 'Euclid', 'Fibonacci'], 'Brahmagupta', 'Brahmagupta (598–668 CE) wrote the Brahma-sphuta-siddhanta with rules for zero and negatives.', { difficulty: 3 }),
  ],
  cheat: [
    {
      title: 'Film → person → idea',
      lines: ['Beautiful Mind → Nash → equilibrium', 'Imitation Game → Turing → Enigma/test', 'Man Who Knew Infinity → Ramanujan → 1729', 'Hidden Figures → Johnson/Vaughan/Jackson → NASA orbits', 'Theory of Everything → Hawking → radiation', 'Super 30 → Anand Kumar → IIT-JEE'],
    },
    {
      title: 'Indian greats',
      lines: ['Aryabhata → π ≈ 3.1416, Earth rotates', 'Brahmagupta → rules of zero', 'Bhaskara II → Lilavati', 'Madhava → π infinite series', 'Ramanujan → 1729, partitions', 'C. R. Rao → statistics, 29 June'],
    },
    {
      title: 'Traps',
      lines: ['Will Hunting = fictional', 'Oppenheimer = physicist', 'Hidden Figures = three women', 'Turing ≠ Einstein'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   6 · MIRROR IMAGES
   ───────────────────────────────────────────────────────────── */
const mirror: Topic = {
  id: 'mirror',
  subject: 'maths',
  name: 'Mirror Images',
  emoji: '🪞',
  tagline: 'Left and right flip. Top and bottom do not.',
  minutes: 18,
  lab: 'mirror',
  examNote: 'A plane (vertical) mirror reverses left–right. Water is a horizontal mirror, so it reverses top–bottom.',
  concept: [
    {
      title: 'What a mirror actually flips',
      body: 'A vertical mirror (standing in front of you) swaps your left and right. Your head stays up, feet stay down.',
      list: [
        'Plane mirror image = left–right reversal.',
        'Water image = top–bottom reversal (the mirror lies flat).',
        'The image is the same distance behind the mirror as the object is in front.',
        'Mirror images cannot be rotated into the original — rotation and reflection are different.',
      ],
      key: 'Plane mirror → flip horizontally. Water → flip vertically. Two mirrors at 90° → no net reversal.',
    },
    {
      title: 'Letters that survive a mirror',
      body: 'A capital letter looks unchanged in a plane mirror if it has a vertical line of symmetry.',
      list: [
        'Vertical symmetry (same in mirror): A H I M O T U V W X Y — 11 letters.',
        'Horizontal symmetry (same in water): B C D E H I K O X — 9 letters.',
        'Both: H I O X.',
        'So the mirror of “MOM” reads “MOM”; “TOOT” stays “TOOT”.',
      ],
      key: 'A H I M O T U V W X Y: the mirror-safe 11.',
    },
    {
      title: 'Mirror clock — the 11:60 rule',
      body: 'For an analog clock, mirror time + actual time = 12:00 (written 11:60).',
      list: [
        'Actual 4:10 → mirror 11:60 − 4:10 = 7:50.',
        'Actual 9:30 → 11:60 − 9:30 = 2:30.',
        'Actual 3:00 → 9:00 (3 and 9 swap).',
        'If the mirror time is given, the same subtraction gives the real time.',
      ],
      key: 'Mirror time = 11:60 − real time.',
    },
    {
      title: 'Word and number mirroring',
      body: 'To mirror a word, reverse the order AND flip each letter shape.',
      list: [
        'Numerals that mirror to a valid digit: 0, 1, 8 stay; 2 ↔ 5 (seven-segment); 6 ↔ 9.',
        '“MIRROR” → mirrored is ꟼOЯЯIM — order reverses.',
        'In a mirror, “b” looks like “d”, and “p” looks like “q”.',
        'Options in these questions are usually the same letters in different order — eliminate by checking the ends first.',
      ],
    },
  ],
  examples: [
    {
      q: 'What is the mirror image (plane mirror) of the time 4:10 on an analog clock?',
      steps: ['Use mirror time = 11:60 − real time.', '11:60 − 4:10 = 7:50.', 'Sanity check: 4:10 + 7:50 = 12:00.'],
      answer: '7:50',
    },
    {
      q: 'Which word reads the same in a plane mirror: TOM, MOM, CAT, BOX?',
      steps: ['Check each letter for vertical symmetry: T ✓, O ✓, M ✓ → TOM works.', 'MOM: M ✓ O ✓ M ✓ → also works.', 'CAT: C and T are vertical-symmetric, but A is too… C A T all have vertical symmetry, so CAT mirrors as TAↃ, which is not CAT (order reverses).', 'A word reads the same only if it is a palindrome of mirror-safe letters. TOM → MOT, so no. MOM reversed is MOM → yes.'],
      answer: 'MOM',
    },
  ],
  questions: [
    Q('mi-01', 'mirror', 'A plane mirror reverses which pair of directions?', ['Up and down', 'Left and right', 'Front and back', 'North and south'], 'Left and right', 'A vertical mirror flips the horizontal axis only — that is why your mirror twin’s watch is on the other wrist.', { difficulty: 1 }),
    Q('mi-02', 'mirror', 'Which of these capital letters looks the SAME in a plane mirror?', ['B', 'F', 'H', 'P'], 'H', 'H has vertical symmetry. The mirror-safe set is A H I M O T U V W X Y.', { difficulty: 1 }),
    Q('mi-03', 'mirror', 'How many capital letters stay unchanged in a plane mirror?', ['9', '10', '11', '12'], '11', 'A H I M O T U V W X Y = 11 letters.'),
    Q('mi-04', 'mirror', 'The mirror image of 3:00 on an analog clock is…', ['6:00', '9:00', '12:00', '1:30'], '9:00', '11:60 − 3:00 = 8:60 = 9:00.', { difficulty: 1 }),
    Q('mi-05', 'mirror', 'The mirror image of 4:10 is…', ['7:50', '8:50', '7:10', '5:50'], '7:50', '11:60 − 4:10 = 7:50.'),
    Q('mi-06', 'mirror', 'A water image flips which direction?', ['Left–right', 'Top–bottom', 'Both', 'Neither'], 'Top–bottom', 'Water acts as a horizontal mirror, so up and down swap.', { difficulty: 1 }),
    Q('mi-07', 'mirror', 'Which letter looks the same in a WATER image?', ['A', 'B', 'F', 'P'], 'B', 'Water-safe letters are B C D E H I K O X — they have horizontal symmetry.'),
    Q('mi-08', 'mirror', 'Which pair of letters swap under a plane mirror?', ['b and d', 'b and p', 'd and q', 'p and b'], 'b and d', 'A vertical mirror turns b into d. (p ↔ q in water.)'),
    Q('mi-09', 'mirror', 'The mirror time shown is 2:30. What is the actual time?', ['9:30', '8:30', '9:00', '7:30'], '9:30', 'Actual = 11:60 − 2:30 = 9:30. The rule works both ways.'),
    Q('mi-10', 'mirror', 'Which word reads the same in a plane mirror?', ['TOM', 'MOM', 'CAT', 'BOOK'], 'MOM', 'M, O, M all have vertical symmetry and the word is a palindrome, so it survives.'),
    Q('mi-11', 'mirror', 'Two plane mirrors at 90° to each other produce an image that is…', ['left-right reversed', 'upside down', 'not reversed at all', 'blurred'], 'not reversed at all', 'Two reflections undo each other — the classic 90° mirror trick.'),
    Q('mi-12', 'mirror', 'A clock shows 6:30 in a mirror. What is the actual time?', ['5:30', '6:30', '7:30', '11:30'], '5:30', '11:60 − 6:30 = 5:30. (At 6:30 the hands are symmetric-ish, but use the formula.)', { difficulty: 3 }),
  ],
  cheat: [
    {
      title: 'Mirror rules',
      lines: ['Plane mirror → left-right flip', 'Water image → top-bottom flip', 'Mirror distance = object distance', '90° double mirror → no reversal'],
    },
    {
      title: 'Letters',
      lines: ['Plane-safe (11): A H I M O T U V W X Y', 'Water-safe (9): B C D E H I K O X', 'Both: H I O X', 'b↔d, p↔q'],
    },
    {
      title: 'Clock',
      lines: ['mirror = 11:60 − actual', '4:10 → 7:50', '9:30 → 2:30', '3:00 → 9:00'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   7 · CROSSWORD
   ───────────────────────────────────────────────────────────── */
const crossword: Topic = {
  id: 'crossword',
  subject: 'maths',
  name: 'Crossword',
  emoji: '🧩',
  tagline: 'A crossword is a speed game. Fill what you know, then let crossings finish the rest.',
  minutes: 15,
  lab: 'crossword',
  examNote: 'Usually team-based on paper. Divide clues by Across/Down, mark the crosses, and never leave a blank.',
  concept: [
    {
      title: 'How to attack a crossword in a quiz',
      body: 'The grid is a network. Every crossing letter is a free clue, so solve in the direction with the most crossings.',
      list: [
        'First pass (60 s): fill every clue you know instantly — length is a clue by itself.',
        'Second pass: use each filled letter to break longer words.',
        'Guess endings: -TION, -SIS, -ISM, -OLOGY, -ASE, -ENE.',
        'Never leave a blank — a wrong letter can still let a crossing word work.',
        'Write in capitals; one letter per box. Two letters in a box is how teams lose crosswords.',
      ],
    },
    {
      title: 'The vocabulary bank these quizzes actually use',
      body: 'Learn 40 words and you cover most science/maths crosswords.',
      list: [
        'Cell: NUCLEUS, MITOSIS, OSMOSIS, TISSUE, ORGAN, GENE, ENZYME, MEMBRANE, CHLOROPLAST.',
        'Physics: FORCE, MASS, INERTIA, MOMENTUM, FRICTION, NEWTON, GRAVITY, VELOCITY.',
        'Maths: PRIME, ANGLE, CHORD, RATIO, MATRIX, VECTOR, SQUARE, CUBE, MEDIAN.',
        'Fabric: COTTON, JUTE, SILK, WOOL, FIBRE, WEAVE, LOOM, YARN, RETTING, GINNING.',
        'Space: ORBIT, COMET, NEBULA, GALAXY, ROVER, PROBE, SOLAR, LUNAR.',
      ],
    },
    {
      title: 'Clue language decoder',
      body: 'Crossword clues are written in shorthand. Words like “initially”, “oddly”, “regularly” are instructions.',
      list: [
        '“initially” → take the first letters: “Initially Newton Explained Motion” → NEM.',
        '“oddly” → take odd positions: “oddly, ARGON” → A G N.',
        '“evenly” → 2nd, 4th, 6th letters.',
        '“back”, “reversed” → read the word backwards.',
        'Abbreviations: 1 = A/I, 100 = C, 1000 = M, direction = N/S/E/W, note = A–G.',
      ],
      key: 'When stuck, read the clue aloud. The definition almost always sits at the start or the end of the clue.',
    },
  ],
  examples: [
    {
      q: 'Clue: “Cell’s control centre (7)”. Fill it.',
      steps: ['Definition: control centre of a cell.', '7 letters.', 'NUCLEUS fits exactly, and its crossing words confirm N-C-E-U.'],
      answer: 'NUCLEUS',
    },
    {
      q: 'Clue: “Opposite of reaction, per Newton (6)”… actually: “Newton’s resistance to change (8)”',
      steps: ['Definition: resistance to change of motion.', '8 letters.', 'INERTIA (7) is the concept but too short — the 8-letter answer is INERTIAL / MOMENTUM. Use crossings to decide.'],
      answer: 'MOMENTUM (8) — read the letter count first',
    },
  ],
  questions: [
    Q('cw-01', 'crossword', '7-letter organelle called the “suicidal bag” of the cell.', ['Lysosome', 'Nucleus', 'Ribosome', 'Vacuole'], 'Lysosome', 'Lysosomes hold hydrolytic enzymes; if they burst, they digest the cell.'),
    Q('cw-02', 'crossword', '5-letter word: force that opposes motion.', ['Friction', 'Inertia', 'Impulse', 'Tension'], 'Friction', 'Friction acts opposite to relative motion; it is a contact force.'),
    Q('cw-03', 'crossword', '4-letter “golden fibre” extracted from plant stems by retting.', ['Jute', 'Silk', 'Wool', 'Flax'], 'Jute', 'Jute is the “golden fibre”, mostly grown in West Bengal and extracted by retting.'),
    Q('cw-04', 'crossword', '7-letter process of cell division that makes two identical cells.', ['Mitosis', 'Meiosis', 'Osmosis', 'Fission'], 'Mitosis', 'Mitosis = growth and repair, two identical diploid cells. Meiosis makes four gametes.'),
    Q('cw-05', 'crossword', '5-letter word for the number of prime numbers between 1 and 10.', ['Four', 'Five', 'Six', 'Three'], 'Four', '2, 3, 5, 7 → four primes.', { difficulty: 1 }),
    Q('cw-06', 'crossword', '6-letter fabric process of separating cotton fibres from seeds.', ['Ginning', 'Retting', 'Shearing', 'Weaving'], 'Ginning', 'Ginning separates cotton seeds from lint; retting is for jute, shearing for wool.'),
    Q('cw-07', 'crossword', '8-letter physics quantity: mass × velocity.', ['Momentum', 'Inertia', 'Friction', 'Velocity'], 'Momentum', 'Momentum p = mv; kg·m/s. Newton’s second law is F = Δp/Δt.'),
    Q('cw-08', 'crossword', '5-letter word for the basic structural unit of a fabric.', ['Fibre', 'Loop', 'Weave', 'Thread'], 'Fibre', 'Fibres are spun into yarn, then woven or knitted into fabric.'),
  ],
  cheat: [
    {
      title: 'Crossword speed drills',
      lines: ['Fill sure answers first', 'Use one-letter crossings', 'Count the letters before writing', 'Never leave a blank'],
    },
    {
      title: 'Clue words',
      lines: ['initially → first letters', 'oddly → 1st,3rd,5th', 'evenly → 2nd,4th,6th', 'reversed/back → reverse', '1000 = M, 100 = C, 1 = A/I'],
    },
    {
      title: 'Word bank',
      lines: ['NUCLEUS · MITOSIS · OSMOSIS · MEMBRANE · ENZYME', 'INERTIA · MOMENTUM · FRICTION · NEWTON · VELOCITY', 'COTTON · JUTE · SILK · WOOL · RETTING · GINNING', 'PRIME · ANGLE · VECTOR · RATIO · MEDIAN'],
    },
  ],
}

export const MATHS_TOPICS: Topic[] = [series, cube, calendar, direction, movies, mirror, crossword]
