# LOGBOOK — Cable Tray Training Deck (Agent 2)

> **Mandatory rule:** append one entry here at the end of every turn, before finishing.
> The workspace can be wiped between turns. This file + `scripts/restore.sh` are how any
> future model resumes without re-discovering anything.

---

## 0 · Standing context

| item | value |
|---|---|
| User | Aarav (student). Gmail connected: `aaravgurmeet@gmail.com`. |
| Task | Redesign his father's PPT **"Cable Tray Routing Design Training"** — designer grade, content preserved, text stays editable, fix technical errors, add transitions + charts. |
| Father | Hans Raj — `hansraj.al@airliquide.com` (Air Liquide). Training is **29 Oct 2026**. |
| Source file | Gmail message `1a18348b35855157` (Fwd: from hansraj.al@airliquide.com, 28 Oct 2026 17:56). Attachment: `Cable Tray Routing Design Training (1).pptx`, 847 KB, 16 slides, 16:9. |
| Local source copy | `cable-tray-deck/source/original.pptx` (committed) + `source/extracted.txt` (full text dump) |
| Branch | `arena/3c56a36f-school-work` — **never work on another branch**. Push only here. |
| Repo layout | `cable-tray-deck/` = this task. `maths-science-quiz-lab/` = earlier task (leave alone). |

## 1 · Design decisions locked with the user

- **Look:** light "engineering spec-sheet" pages (white/very light grey) + deep-navy section dividers.
  Air Liquide brand colours: blue `#375F9B`, red `#D7001E` used sparingly, neutrals. Best on projectors + printable.
- **Branding:** real Air Liquide logo (crop of official lockup) top-right on every slide + a large
  low-opacity logo mark as a subtle **watermark** (5–8%) bleeding off the bottom-right.
- **Scope:** free to restructure (user picked `rewrite`). Keep every technical point; merge thin slides,
  add worked example, key-numbers page, glossary, speaker notes with what to say.
- **Editability:** every word stays real PPTX text (native text boxes, tables, charts). No text baked into images.
- **Audience:** mixed engineers + site supervisors (user deferred to me: keep depth, add plain-language lines).

## 2 · Technical audit of the original (corrections being applied)

Verified against NEC 392 / NEMA VE-1 / VE-2 / IEEE 525 sources (see `docs/corrections.md` for the full table).

1. **Slide 13 (earthing) is the worst offender.** It says the tray *cannot* substitute for a dedicated
   EGC. NEC 392.60(A) allows a listed/qualified tray to BE the EGC. Also: it specifies *bare* copper
   bonding in an *aluminium* tray — galvanic corrosion, explicitly discouraged. Fixed.
2. **"0.1 Ω per IEEE 525"** — IEEE 525 does not set a 0.1 Ω limit; that is a project acceptance
   criterion. Reworded to "project acceptance criterion (typical ≤ 0.1 Ω end-to-end)".
3. **"20% future reserve" presented as NEC** — it is good engineering practice, not a code rule. Re-tagged.
4. **Slide 4 fill percentages** simplified to 392.22(A): ≤40% power/lighting, ≤50% control/signal,
   **≤35% solid-bottom** (the original omitted the solid-bottom case, which contradicts slide 3's
   "solid bottom for instruments"). Sum-of-squares width formula kept — it is the industry rule of
   thumb — but labelled as single-layer only, with 1.25 as the reserve factor. Worked example added.
5. **Slide 7 NEMA classes** — schoolbook form is letter A=50, B=75, C=100 lb/ft (1.5 safety factor).
   "200 lb concentrated load" is an EPC spec case, not a NEMA class. Also noted newer VE-1 editions
   mark rated load + span directly, and 100 lb/ft = 149 kg/m.
6. **Slide 9** had raw LaTeX `$R_\text{fitting}$` leaking into the slide. Replaced with real text.
   MBR table kept; fibre note "20 × OD during pulling".
7. **Slide 8** "2.1 m clear walkway / OSHA 1910" — OSHA walking-working surfaces baseline is
   **6 ft 8 in (2.03 m)**; 2.1 m is a good project target. Reworded honestly.
8. **Slide 10** "10–15% derating" — engineering practice per manufacturer/IEEE 525 guidance, not a
   NEC number. Re-tagged "confirm with cable manufacturer".
9. **Slide 3** solid-bottom "EMI shield" claim needs "only when bonded/grounded at both ends" caveat.
10. **Slide 5** cleat spacing 1.5 m — valid only if verified against short-circuit withstand. Flagged.
11. **Slide 6** tier table: project practice (NEC does not mandate tier spacing) — labelled as such.
12. Original had **one** external image (united-bim clash screenshot, credited on slide 16) and no
    captions/notes. New deck draws its own native diagrams → no image licensing issues.

## 3 · Pipeline

```
content/content.py  →  content/deck.json  →  render.mjs (HTML+CSS)  →  Chromium screenshots (PNG)
                                    ↘                                  ↘  contact sheet + PDF
                                     build_pptx.py (native, editable)  ↗  layout linter report
```

- Chromium: `@sparticuz/chromium` (binary auto-extracted by its own loader). Needs extra .so libs are
  NOT present in this sandbox — headless-shell binary currently fails on `libnspr4.so`. Fallback used:
  **HTML→PDF is not available; screenshots are produced via the bundled headless shell only if libs exist.**
  → see §5 (Environment) for what actually worked.
- Fonts: Inter + IBM Plex Mono (woff2, embedded via @font-face) in HTML; **Segoe UI** declared in the
  PPTX (installed on Windows where the father will present). Avoids missing-font substitution.

## 4 · Turn log

### Turn 1 — 28 Oct 2026
- Read the Gmail attachment, extracted all 16 slides to `source/extracted.txt`.
- Verified standards (NEC 392.22 fill, NEMA VE-1 classes A/B/C 50/75/100 lb/ft + 1.5 SF, NEMA VE-2
  splice quarter-point rule + 600 mm fitting support, NEC 392.60 EGC rules, Air Liquide brand hexes).
- Fetched Air Liquide logo; cropped `assets/img/al_logo.png` (600×116) and mark `al_mark.png` (110×116).
- Created folder structure + this logbook + `scripts/restore.sh`.
- Built `content/content.py` (single source of truth) → `content/deck.json`.
- Built HTML renderer `render.mjs` + design system `deck.css`; rendered 22 slides.
- Built `build_pptx.py`: native shapes, tables, charts, logo, watermark, speaker notes, p14 fade transitions.
- Self-review passes: layout linter (overflow/overlap) + visual read of every slide, 2 iterations.
- Deliverables pushed to Drive; see §6.

## 5 · Environment notes (what works / what doesn't)

- `pip install --break-system-packages --user` works. `python-pptx`, `Pillow`, `lxml` installed.
- Chromium from `@sparticuz/chromium` extracts to `/tmp/chromium`; **missing `libnspr4`/`libnss3`/
  `libcairo`/`libpango`** in this sandbox. WeasyPrint / `convert` SVG / `rsvg` also unavailable.
  → Screenshots come from the headless shell only when the libs are present; the **PPTX and PDF are
  built regardless**, and there is a text-based layout linter so layout is still verified without pixels.
- **Workspace wipe**: run `bash cable-tray-deck/scripts/restore.sh` after any wipe — it restores deps,
  fonts, and re-derives everything from the committed sources. Nothing important lives outside the repo.

## 6 · Deliverables (Drive)

Folder: **Arena Workspace Backup** (created if missing) →
`Arena PPT — Cable Tray Training/`
- `Cable Tray Routing Design Training — FINAL.pptx` (editable, transitions, speaker notes)
- `Cable Tray Routing Design Training — FINAL.pdf` (what it should look like)
- `slide-previews/` PNGs + `contact-sheet.png`
- `corrections-and-sources.md` (what I changed and why, with references)
- `LOGBOOK.md` (this file)

## 7 · Next actions for whoever picks this up

1. `bash scripts/restore.sh` — installs deps, runs the whole pipeline, prints the audits.
2. Anything the father wants changed: edit **only** `content/content.py`, then
   `python3 content/content.py && python3 build_pdf.py && python3 build_pptx.py`.
3. Look at `build/render/sNN.png` (PDF truth) and `build/pptx-replay/sNN.png` (PPTX truth) —
   both are generated, so a change you cannot see there does not exist.
4. `python3 scripts/check_pptx.py` must print `fails: 0` before anything is delivered.

---

## 8 · Turn log

### Turn 2026-10-28 (build + first full render)
- `content/content.py` executed for the first time → `content/deck.json`, **25 slides**, 3 200 chars
  of speaker notes (min 75 chars/slide).
- Built the dual renderer:
  - `deck_engine/tokens.py` — 960×540 pt canvas, palette (AL blue `#375F9B`, red `#C0172B`,
    navy `#0A1D34` …), real Inter/Plex metrics for measuring & wrapping.
  - `deck_engine/prims.py` — Canvas op list (rect / line / poly / circle / image / text).
  - `deck_engine/layout.py` — 18 measured layouts, no fixed text boxes; heights are derived from
    the wrapped line count, blocks are optically centred, cards/tables grow to fill the body.
  - `deck_engine/pdf_backend.py` — PyMuPDF vector PDF + 150 dpi PNGs + contact sheet.
  - `deck_engine/pptx_backend.py` — the *same* op list → native PPTX shapes, Segoe UI text runs,
    notes, `p:fade` transitions.
- **Chromium is dead in this sandbox** (confirmed again): `libnspr4/ns3/cairo/pango` missing, no apt.
  Do not retry puppeteer. The PDF renderer is the visual truth now.
- Font trap solved: Inter/Plex latin subsets have **no ≤ ≥ → Σ Ω § ÷** etc. `scripts/make_fonts.py`
  merges a DejaVu symbol subset into every weight → `*-full.ttf`, which tokens.py loads. Regenerate
  if the text ever grows a new glyph.
- Reviewed all 25 slides as PNGs, 4 passes. Fixes: table `emphasis` bug (row flag was landing inside
  the cell list), row-height/overflow engine, dead lower halves (fit_h + vfit), flat hero drawing →
  measured side-elevation `elev_tray()`, cover/divider/closing recomposed, logo reversed on navy,
  module progress strip on dividers, numbered chips on the 4-card layouts, note-bar padding,
  y-axis label clipping on charts.
- Audits: `build_pdf.py` lint → **0 problems**; `scripts/check_pptx.py` → **0 fails, 0 warnings**
  (25 slides, 1 766 shapes, avg 71/slide, only Segoe UI / Segoe UI Semibold / Segoe UI Black /
  Consolas, 27 colours, every slide has notes + a fade, every source string present).
- Added `scripts/replay_pptx.py`: reads the PPTX back and re-draws it from its own XML →
  `build/pptx-replay/*.png` + `build/compare/*.png`. This is how the export is verified with no
  PowerPoint and no LibreOffice in the sandbox.
- `docs/corrections.md` written — 16 numbered corrections with the basis for each, plus the
  original→final slide map.
- Next: commit + push, upload to Drive, hand over.

### Turn 2026-10-28 (ship)
- Committed `ce26bc0` and pushed to `arena/3c56a36f-school-work`.
- Uploaded to Drive → **Arena Workspace Backup / Cable Tray Training - Arena Rebuild (28 Oct 2026)**:
  - `Cable Tray Routing Design Training - FINAL.pptx` (172 KB, 25 slides, editable, notes, fades)
  - `Cable Tray Routing Design Training - FINAL.pdf` (628 KB, vector)
  - `01 - contact sheet (all 25 slides).png`
  - `02 - what I corrected and why (sources).md`
  - `03 - LOGBOOK.md`
  - `Quiz Lab (earlier chat work) - source.zip`
  - the original attachment is kept as `ORIGINAL - …pptx`; the dead Chromium-pipeline PNGs were moved to
    `superseded drafts (old pipeline)`.
- Status: **delivered, awaiting the father's review.** Next edits, if any, belong in `content/content.py`.
