# QUIZ LAB — Inter-House Maths & Science (Agent 2 edition)

A one-night training console for the inter-house Maths & Science quiz (28 Oct 2026).
Built as a separate app inside `School-work-/maths-science-quiz-lab` so it does not touch the
existing Purple Umbrella material at the repo root.

## Run it

```bash
cd maths-science-quiz-lab
npm install
npm run dev        # http://localhost:5173  (binds 0.0.0.0 for the live preview)
npm run build      # type-check + production build
npm run smoke      # SSR smoke test for every page + lab
npm run interact   # jsdom interaction tests (drill, relay, crossword, clue round)
```

## What is inside

Every topic follows the same loop: **learn the concept → see a worked example → drill it → cheat-sheet it.**

### Mathematics (7 rounds)
| Round | What the app gives you |
|---|---|
| Number series & analogy | Six rules + gap-ladder method, 18 questions, letter/analogy drills |
| Cube & dice | Painted-cube formula sheet, interactive painted-cube explorer, rotatable die, 14 questions |
| Calendar | Odd days, leap rules, full doomsday derivation, live date engine, 14 questions |
| Direction | Turn arithmetic, Pythagoras triples, walk simulator, 12 questions |
| Movies & mathematicians | Film flashcards + trap answers, 15 questions |
| Mirror images | Mirror bench (plane vs water), safe-letter checker, 11:60 clock tool, 12 questions |
| Crossword | Playable 9-word grid + 8 rapid definitions |

### Science
| Round | What the app gives you |
|---|---|
| Cell biology | Clickable plant/animal cell diagram, organelle jobs, 22 questions |
| Fibre to fabric | Fibre sorter game, process vocabulary, 18 questions |
| Laws of motion | F = ma bench, numerical generator, 20 questions |
| News, DTE & current science | Dated 2026 timeline + 22 questions |
| 3-clue achievement round | 15 achievements, clue-by-clue simulator |
| Video round | 9 classic clips with the question they are really testing |
| Hands-on activity | 17 chits with materials, 4 steps, 5-minute clock, 30-second pitch, judge Q&A |

Plus a **Rapid Relay**: 90-second or 25-question mode, maths/science/current filters, keyboard play,
fix-list at the end, and best-score memory.

## Study plan

The home page has an 11-block plan from 21:45 to 03:00, each block linking to the relevant topic.
Progress, drill scores and best relay runs are saved in `localStorage`.

## Content notes & caveats

- Current affairs are compiled to **27 October 2026**: Nobel 2026 (Halzen/neutrinos, optogenetics,
  chirality, Hall–Woodford), ISRO (Aditya-L1 Doppler images, EOS-05, Gaganyaan G1, NISAR),
  Down To Earth October 2026 (Cyclone Arnab, “Intimate takeover”, SOE 2026, Nashik chromium),
  and ZSI/DTE biodiversity numbers.
- Quiz-format details (scoring per clue, relay rules, materials) are assumptions based on standard
  Indian inter-house formats. Confirm the exact rules with your teacher before the event.
- Two biology examples in `data/rounds.ts` (candle/jar and Cartesian diver explanations) deliberately
  include the nuance a judge may probe — the simplified school answer plus the correction.
- The app is self-contained: no external images, fonts or APIs, so it works offline once loaded.

## Structure

```
src/
  data/        maths.ts · science.ts · rounds.ts · relay.ts · crossword.ts
  lib/         types · utils (answer checker, date maths) · progress store
  components/  TopicPage · QuestionRunner
  modes/       CalendarLab · CubeLab(+DiceLab) · DirectionLab · MirrorLab · CrosswordLab
               MoviesLab · CellDiagram · ScienceLabs (motion/fibre) · RoundLabs (clue/video/hands/news)
  pages/       Home (plan) · Sections (subject/special) · RelayPage · CheatPage
scripts/       smoke.tsx · interact.tsx
```

Built by **Agent 2**. Study now, sleep by 3 — good luck tomorrow. 🏆
