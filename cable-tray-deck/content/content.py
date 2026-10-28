"""
Single source of truth for the Cable Tray Training deck.

Everything the deck says lives here. Two renderers consume it:
  deck_engine/render.py     -> vector PDF + PNG previews (PyMuPDF)
  deck_engine/pptx_out.py   -> native editable PPTX (python-pptx)

Run:  python3 content/content.py    # writes content/deck.json
"""

import json
import pathlib

# ────────────────────────────────────────────────────────────────
# globals
# ────────────────────────────────────────────────────────────────
META = {
    "company": "Air Liquide",
    "unit": "Industrial Electrical & Instrumentation Design",
    "doc_title": "Cable Tray Routing & Raceway Engineering",
    "subtitle": "Design standards, fill factors, structural supports, clearances, covers and underground trenches",
    "standards": ["NEC 392", "NEMA VE 1 / VE 2", "IEEE 525", "IEC 61537"],
    "event": "Field engineering training",
    "date": "29 October 2026",
    "trainer": "Hans Raj",
    "role": "Industrial E&I Design",
    "footer": "Cable Tray Routing & Raceway Engineering  ·  Industrial E&I Design Training",
}

SECTIONS = [
    ("01", "Foundations", "What the tray system is, what it costs when it is wrong, and how to choose type and material."),
    ("02", "Electrical sizing & segregation", "Fill limits, a worked sizing example, voltage segregation, laying geometry and thermal derating."),
    ("03", "Structural & installation", "NEMA load classes, support spacing, clearances, bend radii and thermal expansion."),
    ("04", "Safety, QA & digital deliverable", "Earthing and bonding, BIM clash coordination, the QA gate, and the numbers to remember."),
]


def T(t, size="body", color="ink", mt=0, bold=False, caps=False, align="left", mono=False, width=None):
    """A text run block."""
    return {"k": "text", "t": t, "size": size, "color": color, "mt": mt, "bold": bold,
            "caps": caps, "align": align, "mono": mono, "width": width}


def CARD(title, body, tag=None, num=None, accent="blue"):
    return {"title": title, "body": body, "tag": tag, "num": num, "accent": accent}


def ROW(cells, emphasis=False):
    return {"cells": cells, "emphasis": emphasis}


SLIDES = []
S = SLIDES.append

# ════════════════════════════════════════════════════════════════
# 01 · COVER
# ════════════════════════════════════════════════════════════════
S({
    "layout": "cover",
    "kicker": "INDUSTRIAL ELECTRICAL & INSTRUMENTATION DESIGN",
    "title": "Cable Tray Routing\n& Raceway Engineering",
    "subtitle": META["subtitle"],
    "standards": META["standards"],
    "meta": [META["event"], META["date"], f"Trainer: {META['trainer']}"],
    "notes": "Welcome. This is a working session, not a lecture: every rule ends with what it looks like on site. "
             "By the end you should be able to size a tray, pick a support class, and pass a drawing through QA without a rework loop.",
})

# ════════════════════════════════════════════════════════════════
# 02 · AGENDA
# ════════════════════════════════════════════════════════════════
S({
    "layout": "agenda",
    "kicker": "AGENDA",
    "title": "Four modules, one deliverable",
    "lead": "Each module answers one question the drawing has to survive: what is the system, what size is it, will it stand, and is it safe and checkable.",
    "items": [
        {"num": "01", "title": "Foundations", "body": "System anatomy, tray types, material selection.", "pages": "Slides 4–8"},
        {"num": "02", "title": "Electrical sizing & segregation", "body": "Fill limits, worked sizing, tier separation, laying, derating.", "pages": "Slides 9–14"},
        {"num": "03", "title": "Structural & installation", "body": "NEMA load classes, supports, clearances, bend radii, expansion.", "pages": "Slides 15–19"},
        {"num": "04", "title": "Safety, QA & digital", "body": "Earthing and bonding, clash coordination, QA gate, recap.", "pages": "Slides 20–25"},
    ],
    "aside_title": "How to use this session",
    "aside": [
        "Rules are grouped by the standard that owns them — the tag tells you where to look it up.",
        "Every red number is a hard limit; every amber note is good practice, not code.",
        "The closing recap is the page to photograph before you leave.",
    ],
    "notes": "Point out the colour code early: blue = design rule, red = hard limit, amber = engineering practice we adopt but the code does not mandate. "
             "That distinction is the single biggest source of arguments in design reviews.",
})

# ════════════════════════════════════════════════════════════════
# 03 · OBJECTIVES
# ════════════════════════════════════════════════════════════════
S({
    "layout": "objectives",
    "kicker": "LEARNING OUTCOMES",
    "title": "By the end of this session you can…",
    "lead": "Four things a designer or supervisor should be able to do unaided tomorrow morning.",
    "cards": [
        CARD("Choose the tray", "Pick ladder, trough, wire-mesh or channel for a given cable mix, and justify it in one sentence.", "Selection"),
        CARD("Size it to code", "Apply NEC 392 fill limits, run the sum-of-squares width check, and show the reserve margin.", "NEC 392"),
        CARD("Support it", "Set the NEMA VE-1 load class and span, place splices and fitting supports correctly.", "NEMA VE-1/2"),
        CARD("Prove it", "Walk a drawing through the six QA gates — fill, radius, segregation, supports, covers, penetrations.", "QA gate"),
    ],
    "notes": "Name the four outcomes and tell them these map to the four QA gates the checker will use. "
             "If they can do these four, they can sign a tray drawing.",
})

# ════════════════════════════════════════════════════════════════
# 04 · DIVIDER 01
# ════════════════════════════════════════════════════════════════
S({
    "layout": "divider",
    "num": "01",
    "title": "Foundations",
    "lead": SECTIONS[0][2],
    "points": [
        "Why the code exists — the failure modes behind each rule.",
        "Anatomy of a tray run: tray, support, splice, bonding, cover.",
        "Tray types and where each one is the wrong answer.",
        "Material selection including galvanic-pair traps.",
    ],
    "notes": "Ten minutes. The goal is vocabulary, so the rest of the session is not a glossary exercise.",
})

# ════════════════════════════════════════════════════════════════
# 05 · WHY IT MATTERS
# ════════════════════════════════════════════════════════════════
S({
    "layout": "why",
    "kicker": "WHY THIS MATTERS",
    "title": "A tray run is cheap to design and expensive to fix",
    "lead": "Three failure modes drive every rule in this deck. Each one is discovered late, after concrete, steel or cable is already installed.",
    "blocks": [
        {"stat": "10–15%", "title": "Lost ampacity", "body": "A solid cover or four stacked layers can cost 10–15% of current-carrying capacity. The cable is derated, the breaker is not — so the circuit fails thermally, not electrically.", "tag": "Thermal"},
        {"stat": "1 width", "title": "The rework loop", "body": "One tray width short and every downstream support, penetration and firestop is redrawn. Sizing once with a 20% reserve is cheaper than a change order.", "tag": "Cost"},
        {"stat": "6 gates", "title": "What QA catches", "body": "Fill, radius, segregation, supports, covers, penetrations. A missed gate typically surfaces during installation, when the cable is already pulled.", "tag": "Schedule"},
    ],
    "insight": "Rule of thumb: the drawing should prove four things — it fits, it stands, it is separated, and it is bondable.",
    "notes": "Do not spend long here. One sentence per failure mode. The point: every later rule has a body count.",
})

# ════════════════════════════════════════════════════════════════
# 06 · ANATOMY
# ════════════════════════════════════════════════════════════════
S({
    "layout": "anatomy",
    "kicker": "SYSTEM ANATOMY",
    "title": "Every run is five decisions, not one",
    "lead": "A tray line on a drawing is really five separate decisions — and each has its own standard, its own limit and its own QA check.",
    "legend": [
        {"n": "1", "k": "Tray section", "v": "Type, width, depth, material — NEC 392 + NEMA VE-1"},
        {"n": "2", "k": "Support", "v": "Load class, span, cantilever or trapeze — NEMA VE-1"},
        {"n": "3", "k": "Splice", "v": "Location rule: between support and quarter point"},
        {"n": "4", "k": "Bonding", "v": "Electrical continuity — NEC 250.96 / 392.60"},
        {"n": "5", "k": "Cover", "v": "Weather, mechanical protection, derating trade-off"},
    ],
    "notes": "Walk the numbered callouts on the drawing. Five decisions; if the drawing does not state all five, it is not a construction drawing yet.",
})

# ════════════════════════════════════════════════════════════════
# 07 · TRAY TYPES
# ════════════════════════════════════════════════════════════════
S({
    "layout": "types",
    "kicker": "COMPONENT SELECTION",
    "title": "Four tray families and where each belongs",
    "lead": "Geometry decides ventilation, support continuity and EMI behaviour. Pick by cable mix first, then by environment.",
    "cards": [
        {"title": "Ladder", "spec": "Rung spacing 229 / 305 mm (9 / 12 in)", "body": "Heavy power cables with maximum ventilation and easy tie-off.", "use": "Long power runs, cable ladders on racks", "avoid": "Small signal cables — they sag between rungs", "profile": "ladder"},
        {"title": "Solid bottom / trough", "spec": "Continuous metallic base", "body": "Full support for small cables and a metallic shield when bonded at both ends.", "use": "Instrumentation, control, sensitive signals", "avoid": "Uncapped outdoors — it holds water", "profile": "solid"},
        {"title": "Wire mesh", "spec": "Field-adaptable grid, light weight", "body": "Fast to route and re-route; excellent for data and fibre drops.", "use": "Cat6 / fibre, data-centre overhead", "avoid": "Heavy power — deflection and no shielding", "profile": "mesh"},
        {"title": "Channel", "spec": "75–150 mm (3–6 in) narrow track", "body": "A single narrow run for a small, known cable group.", "use": "Single equipment branch drops", "avoid": "Mixed voltages without a divider", "profile": "channel"},
    ],
    "notes": "Ask the room: which tray for a 33 kV feeder? Which for a 4–20 mA loop? The answer must name the reason, not the name.",
})

# ════════════════════════════════════════════════════════════════
# 08 · MATERIALS
# ════════════════════════════════════════════════════════════════
S({
    "layout": "table",
    "kicker": "MATERIAL SELECTION",
    "title": "Material is a corrosion decision, then a cost decision",
    "lead": "Default is hot-dip galvanised steel. Everything else has to earn its place with an environment.",
    "columns": ["Material", "Environment / use", "Strengths", "Watch out for"],
    "widths": [0.20, 0.30, 0.26, 0.24],
    "rows": [
        ROW(["Hot-dip galv. steel (HDG)", "General outdoor, industrial, coastal with coating", "Cheapest robust default; covers NEMA load classes A–C", "Coating damage at cut ends — repair with zinc-rich paint"]),
        ROW(["Stainless 304 / 316L", "Chemical plant, chlorides, washdown", "No coating to repair; 316L for chloride", "Cost; galvanic isolation from carbon steel"], True),
        ROW(["Aluminium 6063-T6", "Clean indoor, long lightweight runs", "Light, no painting, good with aluminium cable", "Bare copper in contact = galvanic corrosion; not for chloride"]),
        ROW(["FRP / composite", "Very corrosive, EMC-neutral areas", "Non-conductive, chemically inert", "Lower stiffness — closer supports; UV degradation"]),
    ],
    "note": "Galvanic rule: separate dissimilar metals with a plated barrier, and never lay bare copper EGC in an aluminium tray.",
    "footnote": "Grades and finishes to be confirmed against the project material specification.",
    "notes": "Emphasise the galvanic pairing rule — it appears again in the earthing module and it is the most common site defect.",
})

# ════════════════════════════════════════════════════════════════
# 09 · DIVIDER 02
# ════════════════════════════════════════════════════════════════
S({
    "layout": "divider",
    "num": "02",
    "title": "Electrical sizing & segregation",
    "lead": SECTIONS[1][2],
    "points": [
        "NEC 392 fill limits — including the solid-bottom case most people miss.",
        "A worked width calculation from cable list to a purchased tray size.",
        "Voltage segregation and the EMI rules behind the tier table.",
        "Laying geometry, cleating and thermal derating.",
    ],
    "notes": "The heart of the session. Slow down on the worked example — that is the skill they will use every week.",
})

# ════════════════════════════════════════════════════════════════
# 10 · FILL RULES
# ════════════════════════════════════════════════════════════════
S({
    "layout": "chart",
    "kicker": "NEC 392.22 · FILL",
    "title": "Fill limits are heat limits",
    "lead": "The percentages exist so cables can shed heat. They are a limit on the sum of cable cross-sections against the usable interior area.",
    "chart": {
        "kind": "bar",
        "unit": "%",
        "title": "NEC 392.22 FILL LIMIT (%)",
        "max": 60,
        "bars": [
            {"label": "Power &\nlighting", "value": 40, "color": "red", "note": "hard limit"},
            {"label": "Control &\nsignal", "value": 50, "color": "blue", "note": "hard limit"},
            {"label": "Solid-bottom\ntray", "value": 35, "color": "red", "note": "stricter"},
            {"label": "Reserve\n(practice)", "value": 20, "color": "amber", "note": "not code"},
        ],
    },
    "points": [
        {"tag": "NEC 392.22(A)", "title": "40% — power and lighting", "body": "Multi-conductor power cables rated ≤ 2000 V in ladder or ventilated trough tray."},
        {"tag": "NEC 392.22(A)", "title": "50% — control and signal", "body": "Control, instrumentation and similar cables. Mixed trays use the stricter limit per cable type."},
        {"tag": "Practice", "title": "20% future reserve", "body": "Not a code requirement. It is the margin that keeps the next revamp from becoming a re-route."},
    ],
    "footnote": "Solid-bottom and covered trays trap heat: NEC applies stricter fill and manufacturer derating applies on top.",
    "notes": "Common exam point: nobody remembers the solid-bottom value (35%). Also make clear that 40/50 are code, 20% is us.",
})

# ════════════════════════════════════════════════════════════════
# 11 · WORKED EXAMPLE
# ════════════════════════════════════════════════════════════════
S({
    "layout": "worked",
    "kicker": "WORKED EXAMPLE · TRAY WIDTH",
    "title": "From cable list to a purchased width in four steps",
    "lead": "Single-layer assumption. OD = overall diameter from the cable datasheet.",
    "formula": ["W ≥ Σ(OD²) ÷ usable depth", "× 1.25 reserve"],
    "steps": [
        {"n": "1", "t": "List cables", "d": "8 × 3C × 95 mm² LV power, OD 45 mm. Usable depth of a 4 in tray: 100 mm."},
        {"n": "2", "t": "Square and sum", "d": "Σ OD² = 8 × 45² = 8 × 2 025 = 16 200 mm²."},
        {"n": "3", "t": "Divide by depth", "d": "16 200 ÷ 100 = 162 mm minimum inside width."},
        {"n": "4", "t": "Apply reserve, round up", "d": "162 × 1.25 = 203 mm → select the next standard width: 300 mm tray."},
    ],
    "table": {
        "columns": ["Cable", "Qty", "OD (mm)", "OD²", "Σ OD² (mm²)"],
        "widths": [0.36, 0.13, 0.16, 0.16, 0.19],
        "rows": [
            ["3C × 95 mm² LV", "8", "45", "2 025", "16 200"],
            ["Required inside width", "", "", "", "162 mm"],
            ["With 1.25 reserve", "", "", "", "203 mm"],
            ["Selected tray", "", "", "", "300 mm × 100 mm"],
        ],
    },
    "note": "The sum-of-squares method is a single-layer rule of thumb: it fails if cables are stacked or if any OD exceeds the usable depth.",
    "notes": "Walk it with a calculator. Stress: this is a thumb rule for one layer — if the run needs two layers, go back to the NEC area method.",
})

# ════════════════════════════════════════════════════════════════
# 12 · SEGREGATION
# ════════════════════════════════════════════════════════════════
S({
    "layout": "table",
    "kicker": "ELECTROMAGNETIC COMPATIBILITY",
    "title": "Segregation is a tier order, not a preference",
    "lead": "Highest voltage on top, most sensitive signal at the bottom, and a barrier whenever the two share steel.",
    "columns": ["Tier", "Service", "Voltage", "Separation from the tier above", "Divider / rule"],
    "widths": [0.13, 0.24, 0.20, 0.22, 0.21],
    "rows": [
        ROW(["1 — top", "HV power", "> 1 kV to 33 kV", "Top position, own tray", "No shared services"]),
        ROW(["2", "LV power", "≤ 1 kV", "≥ 300 mm below HV", "Solid metallic barrier if shared"], True),
        ROW(["3", "Control & interlock", "110 / 230 V", "≥ 250 mm below LV", "Perforated barrier minimum"]),
        ROW(["4 — bottom", "Analog & fieldbus", "< 50 V / 4–20 mA", "≥ 450 mm below power", "Dedicated solid-bottom tray or conduit"], True),
    ],
    "note": "Where signal and power must cross, cross at 90°. Parallel runs couple; perpendicular crossings do not.",
    "footnote": "Tier spacing shown is project design practice — NEC does not prescribe tier distances; it prescribes electrical continuity and safe installation.",
    "notes": "This is the table people photograph. Make clear the numbers are our project standard, so they can defend them without claiming they are NEC.",
})

# ════════════════════════════════════════════════════════════════
# 13 · LAYING GEOMETRY
# ════════════════════════════════════════════════════════════════
S({
    "layout": "laying",
    "kicker": "INSTALLATION GEOMETRY",
    "title": "Single-core and multi-core are not laid the same way",
    "lead": "Bundling single-core cables the wrong way creates circulating currents and eddy heating; multi-core is mostly about heat and support.",
    "left": {
        "title": "Single-core",
        "sub": "Trefoil, one layer, non-magnetic hardware",
        "points": [
            "Trefoil groups balance the induced field in each phase.",
            "One layer only — never stacked; separate groups by 2 × OD.",
            "Non-magnetic clamps (stainless or aluminium) to stop eddy heating.",
            "Cleats: rated for the short-circuit burst — spacing per the SC calculation, typically ≈ 1.5 m for LV.",
        ],
    },
    "right": {
        "title": "Multi-core",
        "sub": "Flat, touching, trefoil unnecessary",
        "points": [
            "Lay flat side by side, touching or at 1 × OD for LV power.",
            "Stacking is allowed only with ampacity derating applied.",
            "UV-resistant ties on rungs; no sharp edges under the tie.",
            "Vertical risers: support at ≈ 450 mm on rungs.",
        ],
    },
    "note": "Wrong bundling of single-core cables is a design error, not an installation error — it is decided on the drawing.",
    "notes": "If someone asks why trefoil: induced voltages in the sheath. Keep it short — the practical rule is one layer, non-magnetic clamps, trefoil groups.",
})

# ════════════════════════════════════════════════════════════════
# 14 · COVERS & DERATING
# ════════════════════════════════════════════════════════════════
S({
    "layout": "chart",
    "kicker": "ENVIRONMENTAL & THERMAL DESIGN",
    "title": "A cover buys weather protection and pays for it in ampacity",
    "lead": "The derating factor multiplies the cable’s tabulated current. Never specify a cover without telling the cable sizing calculation.",
    "chart": {
        "kind": "bar",
        "unit": "×",
        "title": "DERATING FACTOR (× TABULATED CURRENT)",
        "decimals": 2,
        "max": 1.25,
        "steps": 5,
        "decimals": 2,
        "bars": [
            {"label": "Open\nladder", "value": 1.0, "color": "blue", "note": "reference"},
            {"label": "Ventilated\ncover", "value": 0.95, "color": "blue", "note": "practical"},
            {"label": "Solid\ncover", "value": 0.85, "color": "red", "note": "worst case"},
            {"label": "Solid +\nstandoff", "value": 0.92, "color": "amber", "note": "recovered"},
        ],
    },
    "points": [
        {"tag": "Outdoor", "title": "Peaked / flanged cover", "body": "Pitched profile sheds rain, snow and process deposits on outdoor racks and pipe bridges."},
        {"tag": "Protection", "title": "Solid where things fall", "body": "Mandatory within 1.8 m of platforms, stairs and crane corridors — falling tools and slag."},
        {"tag": "Recovery", "title": "Raised standoff spacers", "body": "25–50 mm brackets restore convective airflow while still blocking sunlight."},
    ],
    "footnote": "Values are indicative engineering practice (≈0.85–0.90 for solid covers); confirm against the cable manufacturer’s derating table and IEEE 525 guidance.",
    "notes": "Key message: the cover decision is a cable-sizing decision. If the cover is added after sizing, the cable may be undersized.",
})

# ════════════════════════════════════════════════════════════════
# 15 · DIVIDER 03
# ════════════════════════════════════════════════════════════════
S({
    "layout": "divider",
    "num": "03",
    "title": "Structural & installation",
    "lead": SECTIONS[2][2],
    "points": [
        "NEMA VE-1 load classes and what the letters actually mean.",
        "Support and splice placement, including the 0.25 L rule.",
        "Clearances that make the run buildable.",
        "Bend radius and thermal expansion.",
    ],
    "notes": "Structural module. The two rules that get remembered: quarter point splice, and fitting support within 600 mm.",
})

# ════════════════════════════════════════════════════════════════
# 16 · NEMA
# ════════════════════════════════════════════════════════════════
S({
    "layout": "nema",
    "kicker": "STRUCTURAL ENGINEERING · NEMA VE-1 / VE-2",
    "title": "The load class is a span and a weight, read together",
    "lead": "Class designation = support span in feet + working load designation. Tested as a simple span with a 1.5 safety factor.",
    "classes": [
        {"cls": "12C", "span": "12 ft (3.66 m)", "load": "100 lb/ft (149 kg/m)", "note": "Class C = 100 lb/ft working load"},
        {"cls": "20C", "span": "20 ft (6.09 m)", "load": "100 lb/ft (149 kg/m)", "note": "Same load over a longer span → heavier section"},
        {"cls": "A / B", "span": "8–20 ft", "load": "50 / 75 lb/ft", "note": "A = 50 lb/ft, B = 75 lb/ft"},
    ],
    "points": [
        {"tag": "NEMA VE-1", "title": "1.5 safety factor", "body": "A 100 lb/ft tray is proven at 150 lb/ft. Newer editions mark rated load and span directly instead of the letter code."},
        {"tag": "NEMA VE-2 §4.3.1", "title": "Splice at the quarter point", "body": "Keep joints between the support and the quarter point; never at mid-span or directly over a support. One splice between supports."},
        {"tag": "NEMA VE-2 §4.4.1", "title": "Support the fittings", "body": "Horizontal elbows, tees, crosses and reducers supported within 600 mm (2 ft) of each fitting extremity."},
    ],
    "note": "Project spec may add a concentrated load case (commonly 200 lb / 90 kg at mid-span) plus wind and ice — that is a specification requirement, not a NEMA class.",
    "notes": "Correct the common belief that the letter is a strength grade. It is a working-load designation; the number is the span.",
})

# ════════════════════════════════════════════════════════════════
# 17 · CLEARANCES
# ════════════════════════════════════════════════════════════════
S({
    "layout": "clearances",
    "kicker": "INSTALLABILITY & ERGONOMICS",
    "title": "If it cannot be built, it is not designed",
    "lead": "Three clearances decide whether the installer can pull cable and whether the operator can walk underneath.",
    "dims": [
        {"v": "300 mm", "k": "Top headroom", "b": "Clear above the side rail for pulling rollers and cable guides."},
        {"v": "600 mm", "k": "Side access", "b": "Between the tray edge and wall or column, for hands and tools."},
        {"v": "2.1 m", "k": "Walkway", "b": "Clear below the lowest tray. OSHA walking-working surfaces baseline is 2.03 m (6 ft 8 in)."},
    ],
    "points": [
        "Align overhead trays with switchgear top-entry plates — an S-bend at the panel is a pulling problem and an inspection problem.",
        "Keep tray out of crane lift corridors and away from relief-valve discharge paths.",
        "Reserve the maintenance zone on the drawing, not in the installer’s imagination.",
    ],
    "notes": "Supervisors feel these numbers immediately. Ask them what clearance they actually get on site — it is usually less.",
})

# ════════════════════════════════════════════════════════════════
# 18 · BEND RADIUS
# ════════════════════════════════════════════════════════════════
S({
    "layout": "table",
    "kicker": "PULLING STRESS & FITTINGS",
    "title": "The fitting has to be at least as generous as the cable",
    "lead": "Rule: R_fitting ≥ MBR_max, where MBR is the minimum bending radius of the stiffest cable in the run.",
    "formula": "R fitting  ≥  MBR (max)  =  k × OD",
    "columns": ["Cable class", "MBR factor k", "Typical fitting radius", "Why"],
    "widths": [0.26, 0.18, 0.26, 0.30],
    "rows": [
        ROW(["Control / signal", "6 × OD", "300 mm", "Small conductors, tight but still safe"]),
        ROW(["LV power", "8–12 × OD", "450 mm", "Armoured and unarmoured LV power"], True),
        ROW(["MV / HV shielded", "12–15 × OD", "600–900 mm", "Tape shield damage = partial discharge"]),
        ROW(["Optical fibre", "20 × OD (pulling)", "Per cable data", "Internal glass micro-fracture"], True),
    ],
    "note": "Bend radius is a cable property. If the fitting radius is not on the drawing, the installer will build what the tray catalogue offers.",
    "footnote": "Factors are typical values — always use the cable manufacturer’s MBR for the actual cable, and the larger value for the run.",
    "notes": "Shielded MV cable is where this bites: too tight a bend and you get partial discharge months later.",
})

# ════════════════════════════════════════════════════════════════
# 19 · EXPANSION
# ════════════════════════════════════════════════════════════════
S({
    "layout": "points2",
    "kicker": "OUTDOOR RUNS · THERMAL MOVEMENT",
    "title": "Long runs move — plan where they move",
    "lead": "Aluminium expands about twice as much as steel. On a 100 m outdoor run the movement is real, and it has to happen somewhere.",
    "blocks": [
        {"tag": "Design", "title": "Expansion splice plates", "body": "Provide expansion joints on long straight runs and at building transitions; the gap is set from the installation temperature. Commonly a joint every ~30 m on aluminium — confirm with the manufacturer."},
        {"tag": "NEMA VE-2", "title": "Anchor at the middle", "body": "Anchor the tray between expansion plates at the support nearest mid-length; allow movement at all other supports. Support within 600 mm of each side of an expansion plate."},
        {"tag": "NEC 250.96", "title": "Bond across the joint", "body": "Every expansion plate breaks the metallic path. A bonding jumper sized per NEC 250.102 must bridge it, or continuity is lost."},
        {"tag": "Detail", "title": "Never bolt it solid", "body": "A clamped expansion plate becomes a buckle point. Slotted holes and the specified hardware, not a bolted splice."},
    ],
    "notes": "This is the slide that prevents the 'why is my tray wavy in July' question. Emphasise bonding across the joint — continuity is the electrical part of a mechanical joint.",
})

# ════════════════════════════════════════════════════════════════
# 20 · DIVIDER 04
# ════════════════════════════════════════════════════════════════
S({
    "layout": "divider",
    "num": "04",
    "title": "Safety, QA & digital deliverable",
    "lead": SECTIONS[3][2],
    "points": [
        "Earthing and bonding — what the tray may and may not be.",
        "Clash coordination rules in the 3-D model.",
        "The six-gate QA checklist before IFC issue.",
        "The numbers to carry in your pocket.",
    ],
    "notes": "Final module. This is where drawings get rejected, so it is worth the time.",
})

# ════════════════════════════════════════════════════════════════
# 21 · EARTHING (the corrected slide)
# ════════════════════════════════════════════════════════════════
S({
    "layout": "earthing",
    "kicker": "SAFETY & INTEGRITY · NEC 250.96 / 392.60",
    "title": "A metal tray is bonded metal first, and an EGC only if it is qualified",
    "lead": "Every metallic tray must be grounded regardless. Whether it can carry fault current as the EGC is a separate, conditional permission.",
    "left_title": "Always",
    "left": [
        "Tray sections, fittings and raceways bonded per NEC 250.96 with listed connectors or jumpers.",
        "Bonding jumpers across expansion plates, adjustable plates and any mechanical discontinuity.",
        "Remove paint, anodising or lacquer at bonding contact points before making the connection.",
    ],
    "right_title": "Only if qualified",
    "right": [
        "Tray may serve as the EGC where it is listed/identified for that purpose and meets the cross-section rules of NEC Table 392.60(A) — e.g. side-rail area for a ladder tray.",
        "Otherwise, run a dedicated EGC in every circuit. It is the default, not the exception.",
        "Jumper size per NEC 250.102 / 250.122 — sized from the overcurrent device, not a fixed 70 mm².",
    ],
    "traps": [
        {"t": "Bare copper in an aluminium tray", "d": "Galvanic corrosion. Use tinned or insulated copper, or a plated barrier."},
        {"t": "“0.1 Ω” as a code limit", "d": "That is a project acceptance criterion; IEEE 525 is an installation guide, not the source of 0.1 Ω."},
        {"t": "Tray as EGC on every project", "d": "Only where listed and qualified; the drawing must state which option is used."},
    ],
    "notes": "Correct the original slide here: the tray CAN be the EGC if qualified, and bare copper in aluminium tray is a defect. Say both plainly.",
})

# ════════════════════════════════════════════════════════════════
# 22 · BIM
# ════════════════════════════════════════════════════════════════
S({
    "layout": "points2",
    "kicker": "DIGITAL ENGINEERING WORKFLOW",
    "title": "Clash coordination is where the routing is actually decided",
    "lead": "The 3-D model is the only place you can check a pull envelope before steel is fabricated.",
    "blocks": [
        {"tag": "Piping", "title": "Tray above the pipe", "body": "Route trays above steam, hydrocarbon and slurry lines so a leak cannot drip into the tray. Stay out of relief-valve discharge and pipe-break zones."},
        {"tag": "HVAC", "title": "150 mm from chilled ducts", "body": "Keep clear of chilled-air duct surfaces to avoid condensation on the tray and on cable jackets."},
        {"tag": "Tolerance", "title": "0 mm steel, 25 mm insulated pipe", "body": "Hard clash against structural steel at 0 mm; 25 mm clearance against insulated piping (the insulation is the real envelope)."},
        {"tag": "Envelope", "title": "Model the pull, not just the cable", "body": "Model cable-pull envelopes, roller access and the maintenance zone. A route that is clash-free but unpullable is still a clash."},
    ],
    "notes": "Push the idea of the pull envelope: most 'no clashes' models are still unbuildable because nobody modelled the space needed to install.",
})

# ════════════════════════════════════════════════════════════════
# 23 · QA GATE
# ════════════════════════════════════════════════════════════════
S({
    "layout": "checklist",
    "kicker": "QUALITY ASSURANCE",
    "title": "Six gates before a drawing goes out as IFC",
    "lead": "If a gate fails, the drawing does not leave the office. Each gate maps to a number on the previous slides.",
    "items": [
        {"n": "01", "t": "Fill verified", "d": "≤ 40% power, ≤ 50% control, 35% solid-bottom. Reserve margin shown."},
        {"n": "02", "t": "Radius validated", "d": "Fitting radius ≥ MBR of the stiffest cable in the run."},
        {"n": "03", "t": "Segregation checked", "d": "Tier order and separations correct; barriers scheduled where tiers share steel."},
        {"n": "04", "t": "Supports calculated", "d": "NEMA class and span justified; splices at quarter point; fittings supported within 600 mm."},
        {"n": "05", "t": "Covers & trench", "d": "Outdoor covers, derating applied to cable sizing, trench slope and drains detailed."},
        {"n": "06", "t": "Penetrations", "d": "Firestops and gas-tight transits listed on the MTO with the seal type."},
    ],
    "signoff": "Released for construction only after the Lead Electrical Engineer signs the gate sheet.",
    "notes": "Hand out the six gates as a one-pager. The signature line is the point: somebody's name is on the drawing.",
})

# ════════════════════════════════════════════════════════════════
# 24 · RECAP
# ════════════════════════════════════════════════════════════════
S({
    "layout": "recap",
    "kicker": "RECAP · THE PAGE TO PHOTOGRAPH",
    "title": "Twelve numbers and ten words",
    "lead": "If you remember nothing else from today, remember these.",
    "numbers": [
        {"v": "40%", "k": "power fill"},
        {"v": "50%", "k": "control fill"},
        {"v": "35%", "k": "solid-bottom fill"},
        {"v": "20%", "k": "reserve (practice)"},
        {"v": "1.25", "k": "sizing reserve factor"},
        {"v": "0.25 L", "k": "splice location"},
        {"v": "600 mm", "k": "fitting support"},
        {"v": "1.5", "k": "NEMA safety factor"},
        {"v": "300 mm", "k": "top headroom"},
        {"v": "600 mm", "k": "side access"},
        {"v": "90°", "k": "power / signal crossing"},
        {"v": "0.85–0.90", "k": "solid-cover derating"},
    ],
    "terms": [
        ("Fill", "cable area ÷ usable tray area"),
        ("MBR", "minimum bending radius"),
        ("EGC", "equipment grounding conductor"),
        ("IFC", "issued for construction"),
        ("MTO", "material take-off"),
        ("HDG", "hot-dip galvanised"),
        ("Trefoil", "three single cores in a triangle"),
        ("UDL", "uniformly distributed load"),
        ("Derating", "reducing ampacity for heat"),
        ("Tier", "vertical level in a rack"),
    ],
    "notes": "Ask them to photograph this slide. Then quiz: what is the solid-bottom fill? (35%.) What is the splice rule? (quarter point.)",
})

# ════════════════════════════════════════════════════════════════
# 25 · CLOSING
# ════════════════════════════════════════════════════════════════
S({
    "layout": "closing",
    "kicker": "ENGINEERING TRAINING COMPLETE",
    "title": "Thanks — questions and site cases",
    "lead": "Safe raceway design balances electrical segregation, structural loading, thermal derating and constructability in field execution.",
    "checks": [
        "Name the tray family and the reason.",
        "Prove the fill with a number.",
        "Show the support class and the splice location.",
        "State which EGC option the drawing uses.",
    ],
    "refs": ["NEC Article 392", "NEMA VE 1", "NEMA VE 2", "IEEE 525", "IEC 61537", "OSHA 1910.28"],
    "contact": f"{META['trainer']}  ·  {META['role']}  ·  Air Liquide",
    "notes": "Close with the four questions. If a participant can answer all four about their own area, the training worked.",
})

DECK = {"meta": META, "slides": SLIDES}
out = pathlib.Path(__file__).parent / "deck.json"
out.write_text(json.dumps(DECK, indent=1, ensure_ascii=False))
print(f"wrote {out} — {len(SLIDES)} slides")
