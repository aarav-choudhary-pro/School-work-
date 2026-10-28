# Technical corrections — original → final

Source: `Cable Tray Routing Design Training (1).pptx` (16 slides, forwarded by Hans Raj,
Gmail message `1a18348b35855157`, 28 Oct 2026). The technical meaning has been preserved;
everything below is a factual correction, a clarification, or a label change so that a
number is no longer presented as something it is not. Nothing was invented.

| # | Where in the original | Original said | Problem | Final deck says | Basis |
|---|---|---|---|---|---|
| 1 | Earthing slide (orig. 13) | "Cable tray **cannot** be used as the equipment grounding conductor" | Wrong as an absolute. A metal tray may be the EGC where it is listed/identified for that purpose and meets the cross-sectional-area rules | "A metal tray is bonded metal first, and an EGC **only if it is qualified**" — two-column *Always* / *Only if qualified*, with the alternative (dedicated EGC) named as the default | NEC 392.60(A) and Table 392.60(A); NEC 250.96 |
| 2 | Earthing slide | Bonding jumper "70 mm²" as a fixed value | Jumper size is not a constant; it is derived from the overcurrent device | "Jumper size per NEC 250.102 / 250.122 — sized from the overcurrent device, not a fixed 70 mm²" | NEC 250.102(C), 250.122 |
| 3 | Earthing slide | "Bare copper EGC in an aluminium tray" shown as normal practice | Galvanic couple: bare copper in contact with aluminium corrodes the tray | Flagged as a trap: "Use tinned or insulated copper, or a plated barrier" | Al/Cu galvanic series; NEMA VE-2 installation guidance |
| 4 | Earthing slide | "0.1 Ω" presented as an IEEE 525 code limit | IEEE 525 is an installation guide, not a limit-setting code; 0.1 Ω is a project acceptance criterion | "That is a **project acceptance criterion**; IEEE 525 is an installation guide, not the source of 0.1 Ω" | IEEE 525 (guide); project spec |
| 5 | Fill / sizing slide (orig. 4) | 40 % power, 50 % control, plus a "20 % reserve" | The 20 % reserve was presented next to code limits, so it read as code. NEC also has a separate **solid-bottom** fill limit that was missing | Chart shows 40 / 50 / **35** / 20, with each bar tagged *hard limit*, *stricter*, or *not code*; the 20 % is labelled **practice** | NEC 392.22(A); 392.22(B) solid-bottom |
| 6 | Supports slide (orig. 7) | "NEMA class = 100 lb/ft" (a single load) with no span | The class is a **span + load** pair, and A/B/C are 50/75/100 lb/ft | Three cards: `12C` = 12 ft (3.66 m) @ 100 lb/ft (149 kg/m); `20C` = 20 ft (6.09 m) @ 100 lb/ft; `A/B` = 50/75 lb/ft, 8–20 ft | NEMA VE-1 |
| 7 | Supports slide | "200 lb concentrated load" presented as a NEMA class | 200 lb mid-span is a common *project specification* load case, not a NEMA class | Moved to the amber note: "Project spec **may** add a concentrated load case (commonly 200 lb / 90 kg at mid-span) … not a NEMA class" | NEMA VE-1 vs project spec |
| 8 | Supports slide | No splice location rule | NEMA VE-2 fixes where a joint may sit | Card: "Keep joints between the support and the quarter point; never at mid-span or directly over a support. One splice between supports" | NEMA VE-2 §4.3.1 |
| 9 | Supports slide | No fitting-support rule | Fittings need support near their extremities | Card: "Horizontal elbows, tees, crosses and reducers supported within 600 mm (2 ft) of each fitting extremity" | NEMA VE-2 §4.4.1 |
| 10 | MBR slide (orig. 9) | LaTeX leaked as literal text: `$R_\text{fitting}$` | Unreadable on a slide | Replaced with a real formula block `R fitting ≥ MBR (max) = k × OD`, and the lead line written in plain English | — |
| 11 | Laying slide (orig. 6) | "Single-core cleats at 1.5 m" stated as a fixed rule | Cleat spacing comes from the short-circuit withstand calculation | "Cleats: rated for the short-circuit burst — spacing per the SC calculation, typically ≈ 1.5 m for LV" | IEC 61914 / manufacturer data |
| 12 | Clearances (orig. 8) | "2.1 m — OSHA" | OSHA's walking-working-surface baseline is 2.03 m (6 ft 8 in); 2.1 m is a common project value | Card keeps 2.1 m as the design value but states "OSHA walking-working surfaces baseline is **2.03 m** (6 ft 8 in)" | OSHA 1910.28 |
| 13 | Covers slide (orig. 10) | Derating given without a source or a warning | A cover changes the cable's thermal rating; the sizing calculation has to see it | Chart of indicative factors (1.00 / 0.95 / 0.85 / 0.92) plus footnote: "confirm against the cable manufacturer's derating table and IEEE 525 guidance" | Manufacturer data; IEEE 525 |
| 14 | Materials (orig. 3) | "Aluminium — good with aluminium cable" with no caveat | The Al/Cu contact problem is the reason most aluminium trays fail inspection | "Bare copper in contact = galvanic corrosion; not for chloride service" + galvanic note bar | Galvanic series |
| 15 | Segregation (orig. 5) | Tier spacings presented as code | NEC does not prescribe tier distances; it prescribes continuity and safe installation | Table kept as **project design practice**, stated in a footnote; the 90° crossing rule is called out separately | NEC 392.60 vs project practice |
| 16 | Whole deck | No speaker notes; "Image sources" slide at the end; a single BIM clash screenshot | Not usable as a training deliverable | 25 slides, speaker notes on every slide, vector drawings instead of screenshots, air-liquide lockup and watermark | — |

## Structural changes (content preserved, better sequenced)

The original ran 16 slides with two very thin ones. The rewrite keeps every topic and merges
the thin parts, adding only the worked example that the original implied but never showed:

| Original | Final |
|---|---|
| 1 Title, 2 Scope | 1 Cover, 2 Agenda, 3 Learning outcomes |
| 3 Components, 4 NEC fill, 5 Segregation, 6 Single/multi-core, 7 NEMA supports, 8 Clearances | 6 Anatomy, 7 Tray types, 8 Materials table, 10 Fill chart, 11 **Worked width example (new)**, 12 Segregation table, 13 Laying geometry |
| 9 MBR, 10 Covers, 11 Trench, 12 BIM | 14 Cover-derating chart, 17 Clearances, 18 Bend-radius table, 19 Expansion & movement, 22 BIM/clash |
| 13 Earthing, 14 QA checklist, 15 Thanks, 16 Image sources | 21 Earthing (corrected), 23 QA six gates, 24 Recap, 25 Closing |

Four module dividers (4, 9, 15, 20) give the session a spine; the closing recap (24) collects
the twelve numbers and ten terms so the audience leaves with one page to photograph.

## What the trainer can still change

All text is native PowerPoint text (1 766 shapes, 25 slides, no text baked into images).
The tables, charts and diagrams are native shapes, so widths, colours and words are editable
in place. Fonts are Segoe UI / Segoe UI Semibold / Segoe UI Black with Consolas for figures —
all present on a standard Windows install, so nothing substitutes on Hans Raj's machine.
