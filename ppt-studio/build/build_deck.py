#!/usr/bin/env python3
"""Cable Tray Routing & Raceway Engineering — designer-grade rebuild.
All text = native editable pptx runs. Diagrams = native vector shapes. Fade transitions injected via raw XML.
"""
import copy
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.oxml.ns import qn

# ---------- palette ----------
NAVY   = RGBColor(0x0F, 0x2B, 0x46)
NAVY2  = RGBColor(0x16, 0x3A, 0x5C)   # lighter navy for panels on dark
BLUE   = RGBColor(0x1F, 0x6F, 0xB2)
CYAN   = RGBColor(0x36, 0xA9, 0xE0)
AMBER  = RGBColor(0xF5, 0xA6, 0x23)
AMBER_D= RGBColor(0xB97, 0x00//1, 0x00) if False else RGBColor(0xC8, 0x7D, 0x0E)
BG     = RGBColor(0xF5, 0xF8, 0xFB)
CARD   = RGBColor(0xFF, 0xFF, 0xFF)
BORDER = RGBColor(0xD9, 0xE2, 0xEC)
MUTED  = RGBColor(0x5B, 0x70, 0x83)
INK    = RGBColor(0x1C, 0x2B, 0x39)
GREEN  = RGBColor(0x2E, 0x8B, 0x57)
RED    = RGBColor(0xC0, 0x3A, 0x2B)
TINT_AMBER = RGBColor(0xFD, 0xF3, 0xE0)
TINT_BLUE  = RGBColor(0xE8, 0xF1, 0xF9)

FONT = "Calibri"
EMU_W, EMU_H = 12192000, 6858000

prs = Presentation()
prs.slide_width  = EMU_W
prs.slide_height = EMU_H
BLANK = prs.slide_layouts[6]

W, H = 13.333, 7.5
M = 0.62                      # margin
CW = W - 2*M                  # content width

# ---------- primitives ----------
def slide():
    return prs.slides.add_slide(BLANK)

def rect(s, x, y, w, h, fill=None, line=None, lw=1.0, shape=MSO_SHAPE.RECTANGLE, radius=None):
    sp = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    sp.shadow.inherit = False
    if fill is None:
        sp.fill.background()
    else:
        sp.fill.solid(); sp.fill.fore_color.rgb = fill
    if line is None:
        sp.line.fill.background()
    else:
        sp.line.color.rgb = line; sp.line.width = Pt(lw)
    if radius is not None and shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        try: sp.adjustments[0] = radius
        except Exception: pass
    return sp

def line(s, x1, y1, x2, y2, color=BORDER, lw=1.0, dash=None):
    cn = s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    cn.shadow.inherit = False
    cn.line.color.rgb = color; cn.line.width = Pt(lw)
    if dash:
        ln = cn.line._get_or_add_ln()
        d = ln.makeelement(qn('a:prstDash'), {'val': dash}); ln.append(d)
    return cn

def oval(s, x, y, w, h, fill=None, line_c=None, lw=1.0):
    return rect(s, x, y, w, h, fill=fill, line=line_c, lw=lw, shape=MSO_SHAPE.OVAL)

def _set_spc(run, spc):
    run._r.get_or_add_rPr().set('spc', str(spc))

def text(s, x, y, w, h, runs, size=14, color=INK, bold=False, align=PP_ALIGN.LEFT,
         anchor=MSO_ANCHOR.TOP, leading=1.0, spc=None, wrap=True, space_after=0):
    """runs: str OR list of paragraphs; each paragraph: str OR list of (txt, {overrides})."""
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    paras = runs if isinstance(runs, list) else [runs]
    for i, p in enumerate(paras):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        para.alignment = align
        para.line_spacing = leading
        if space_after: para.space_after = Pt(space_after)
        items = p if isinstance(p, list) else [(p, {})]
        for t, ov in items:
            r = para.add_run(); r.text = t
            f = r.font
            f.name = ov.get('font', FONT)
            f.size = Pt(ov.get('size', size))
            f.bold = ov.get('bold', bold)
            f.color.rgb = ov.get('color', color)
            if ov.get('spc', spc): _set_spc(r, ov.get('spc', spc))
            ea = r._r.rPr.makeelement(qn('a:ea'), {'typeface': FONT}); r._r.rPr.append(ea)
    return tb

# ---------- recurring furniture ----------
PAGENO = [0]
def chrome(s, kicker, title, note=None, dark=False):
    """standard content-slide furniture; returns top y of content area"""
    PAGENO[0] += 1
    rect(s, 0, 0, W, H, fill=BG)
    rect(s, 0, 0, 0.16, H, fill=NAVY)
    rect(s, 0.16, 0, 0.045, H, fill=AMBER)
    text(s, M+0.02, 0.40, CW, 0.3, kicker, size=11.5, color=AMBER_D, bold=True, spc=260)
    text(s, M, 0.66, CW, 0.62, title, size=27, color=NAVY, bold=True)
    line(s, M+0.02, 1.36, M+1.42, 1.36, color=AMBER, lw=2.4)
    line(s, M+1.42, 1.36, W-M, 1.36, color=BORDER, lw=1.0)
    # footer
    text(s, M, 7.12, 8.0, 0.3, "Cable Tray Routing & Raceway Engineering", size=9, color=MUTED, spc=120)
    text(s, W-1.1, 7.08, 0.5, 0.34, f"{PAGENO[0]:02d}", size=11, color=MUTED, bold=True, align=PP_ALIGN.RIGHT)
    if note:
        ny = 6.42
        rect(s, M, ny, CW, 0.56, fill=TINT_AMBER, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.5)
        rect(s, M, ny, 0.055, 0.56, fill=AMBER)
        text(s, M+0.22, ny+0.095, 1.25, 0.38, "FIELD NOTE", size=10.5, color=AMBER_D, bold=True, spc=160, anchor=MSO_ANCHOR.MIDDLE)
        text(s, M+1.55, ny+0.06, CW-1.8, 0.46, note, size=12, color=INK, anchor=MSO_ANCHOR.MIDDLE)
    return 1.62

def numcircle(s, x, y, n, d=0.4, fill=NAVY, tcolor=None):
    oval(s, x, y, d, d, fill=fill)
    text(s, x, y-0.012, d, d, n, size=12.5, color=tcolor or RGBColor(0xFF,0xFF,0xFF), bold=True,
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

def card(s, x, y, w, h, accent=BLUE, top_strip=True):
    c = rect(s, x, y, w, h, fill=CARD, line=BORDER, lw=1.1, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.045)
    if top_strip:
        rect(s, x+0.14, y, w-0.28, 0.05, fill=accent)
    return c

def chip(s, x, y, w, label, dark=True, h=0.4, size=11):
    fill = NAVY2 if dark else TINT_BLUE
    col  = RGBColor(0xDB,0xE9,0xF5) if dark else BLUE
    rect(s, x, y, w, h, fill=fill, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.5,
         line=(None if dark else BORDER), lw=1.0)
    text(s, x, y, w, h, label, size=size, color=col, bold=True, align=PP_ALIGN.CENTER,
         anchor=MSO_ANCHOR.MIDDLE, spc=120)

def trefoil(s, cx, cy, r, color=CYAN, line_c=None, lw=1.5):
    d = 2*r
    oval(s, cx-r, cy-d*0.80, d, d, fill=color, line_c=line_c, lw=lw)
    oval(s, cx-d*0.93, cy-d*0.80+d*0.86, d, d, fill=color, line_c=line_c, lw=lw)
    oval(s, cx-d*0.93+d*0.86, cy-d*0.80+d*0.86, d, d, fill=color, line_c=line_c, lw=lw)

# =================================================================
# SLIDE 1 — TITLE
# =================================================================
s = slide(); PAGENO[0] += 1
rect(s, 0, 0, W, H, fill=NAVY)
rect(s, 0, 0, W, H*0.5, fill=NAVY)  # base
# decorative ghost trefoil + ring, right side
trefoil(s, 11.75, 1.95, 0.52, color=None, line_c=RGBColor(0x2A,0x4A,0x6B), lw=1.6)
oval(s, 10.45, 5.0, 2.65, 2.65, fill=None, line_c=RGBColor(0x1E,0x3D,0x5E), lw=1.2)
rect(s, 0, 7.28, W, 0.22, fill=AMBER)
line(s, M, 1.52, M+1.5, 1.52, color=AMBER, lw=3)
text(s, M, 1.72, 10.5, 0.4, "INDUSTRIAL ELECTRICAL & INSTRUMENTATION DESIGN", size=13,
     color=CYAN, bold=True, spc=300)
text(s, M, 2.18, 11.6, 1.9, [ "Cable Tray Routing &", "Raceway Engineering" ], size=44,
     color=RGBColor(0xFF,0xFF,0xFF), bold=True, leading=1.02)
text(s, M, 4.15, 10.8, 0.6,
     "Design standards, fill factors, structural supports, clearances, covers, and underground trenches",
     size=15.5, color=RGBColor(0xB9,0xCD,0xDE))
cx = M
for lbl, wch in [("NEC 392", 1.25), ("NEMA VE 1 / VE 2", 2.0), ("IEEE Std 525", 1.6), ("IEC 61537", 1.4), ("OSHA 1910", 1.45)]:
    chip(s, cx, 4.95, wch, lbl, dark=True, h=0.46, size=12)
    cx += wch + 0.22
line(s, M, 6.1, 5.2, 6.1, color=RGBColor(0x2A,0x4A,0x6B), lw=1)
text(s, M, 6.3, 9.0, 0.4, [[("Hans Raj", {'bold': True, 'color': RGBColor(0xFF,0xFF,0xFF)}),
                            ("   |   Air Liquide  ·  Engineering Training  ·  October 2026", {'color': RGBColor(0x8F,0xA9,0xC0)})]],
     size=14)
s.notes_slide.notes_text_frame.text = ("Welcome. Today we cover the complete design workflow for cable tray and raceway systems: "
    "tray hardware selection, NEC 392 fill limits, voltage segregation, NEMA structural supports, bending radius, covers, "
    "trenches, BIM coordination, earthing and the final QA gate.")

# =================================================================
# SLIDE 2 — TRAINING SCOPE
# =================================================================
s = slide()
top = chrome(s, "TRAINING SCOPE", "Core Design Modules",
             note="Follow industry codes to avoid construction rework and thermal hazards.")
mods = [
    ("01", "Hardware & Selection", "Ladder, solid bottom, channel, and wire mesh configurations.", BLUE),
    ("02", "NEC Fill Capacity", "Cross-section limits, derating, and future reserve space.", CYAN),
    ("03", "Segregation Rules", "EMI separation between HV, LV, and instrument signals.", AMBER),
    ("04", "NEMA Support Spans", "Structural load classes and fitting support rules.", NAVY),
]
gap = 0.26; cw_ = (CW - 3*gap)/4; y0 = top + 0.55; ch_ = 3.15
for i, (n, t, d, ac) in enumerate(mods):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    numcircle(s, x+0.28, y0+0.36, n, d=0.52, fill=ac)
    text(s, x+0.28, y0+1.12, cw_-0.56, 0.75, t, size=16.5, color=NAVY, bold=True, leading=1.03)
    text(s, x+0.28, y0+1.92, cw_-0.56, 1.1, d, size=12.5, color=MUTED, leading=1.18)
s.notes_slide.notes_text_frame.text = ("Four modules: hardware selection, NEC 392 fill capacity, EMI segregation, and NEMA "
    "structural supports. Everything feeds the final QA checklist before IFC.")

# =================================================================
# SLIDE 3 — TRAY GEOMETRY (4 types with mini-diagrams)
# =================================================================
def diag_ladder(s, x, y, w, h):
    rect(s, x, y, w, 0.07, fill=BLUE); rect(s, x, y+h-0.07, w, 0.07, fill=BLUE)
    n = 5
    for i in range(n):
        rx = x + 0.08 + i*(w-0.16-0.06)/(n-1)
        rect(s, rx, y+0.07, 0.06, h-0.14, fill=CYAN)

def diag_solid(s, x, y, w, h):
    rect(s, x, y, w, h, fill=TINT_BLUE, line=BLUE, lw=1.5)
    rect(s, x, y+h-0.1, w, 0.1, fill=BLUE)

def diag_mesh(s, x, y, w, h):
    rect(s, x, y, w, h, fill=None, line=BLUE, lw=1.5)
    for i in range(1, 5):
        line(s, x+i*w/5, y, x+i*w/5, y+h, color=CYAN, lw=1.2)
    for j in range(1, 3):
        line(s, x, y+j*h/3, x+w, y+j*h/3, color=CYAN, lw=1.2)

def diag_channel(s, x, y, w, h):
    rect(s, x+w*0.3, y, w*0.4, h, fill=TINT_BLUE, line=BLUE, lw=1.5)
    rect(s, x+w*0.3, y, 0.06, h, fill=BLUE); rect(s, x+w*0.3+w*0.4-0.06, y, 0.06, h, fill=BLUE)

s = slide()
top = chrome(s, "COMPONENT SELECTION", "Tray Geometry & Industrial Service",
             note="Specify hot-dip galvanized steel, marine-grade 6063-T6 aluminum, or FRP for corrosive environments.")
types = [
    ("Ladder Tray", "9-inch or 12-inch rung spacing.", "Heavy power cables with maximum ventilation.", diag_ladder),
    ("Solid Bottom / Trough", "Continuous metallic base protection.", "Sensitive instrumentation and EMI-shielded lines.", diag_solid),
    ("Wire Mesh (Basket)", "Field-adaptable lightweight grid.", "Cat6 / fiber telecom, data-center overhead drops.", diag_mesh),
    ("Channel Tray", "3 to 6-inch narrow single-run track.", "Single equipment branch drops from main rack.", diag_channel),
]
gap = 0.26; cw_ = (CW - 3*gap)/4; y0 = top + 0.28; ch_ = 4.1
for i, (t, d, app, fn) in enumerate(types):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_)
    fn(s, x+0.35, y0+0.35, cw_-0.7, 0.95)
    text(s, x+0.26, y0+1.55, cw_-0.52, 0.65, t, size=15.5, color=NAVY, bold=True, leading=1.02)
    text(s, x+0.26, y0+2.22, cw_-0.52, 0.72, d, size=12, color=INK, leading=1.15)
    line(s, x+0.26, y0+3.0, x+cw_-0.26, y0+3.0, color=BORDER, lw=1)
    text(s, x+0.26, y0+3.12, cw_-0.52, 0.9,
         [[("APPLICATION  ", {'size': 9.5, 'color': AMBER_D, 'bold': True, 'spc': 140})],
          [(app, {'size': 11.5, 'color': MUTED})]], leading=1.12, space_after=2)
s.notes_slide.notes_text_frame.text = ("Ladder for heavy power and ventilation; solid bottom for instrumentation and EMI shielding; "
    "wire mesh for telecom; channel tray for single branch drops. Material per environment: HDG steel, 6063-T6 aluminum, FRP.")

# =================================================================
# SLIDE 4 — NEC FILL (big stats + bars)
# =================================================================
s = slide()
top = chrome(s, "NEC 392 COMPLIANCE", "Tray Fill & Cross-Section Calculations",
             note="Sizing check:  Required Width  ≥  ( Σ Cable OD² × 1.25 )  ÷  Usable Depth — guarantees single-layer spacing when required.")
stats = [
    ("40%", "Power Cable Fill Limit", "Maximum allowable cross-sectional fill for multi-conductor power under NEC 392.22.", BLUE, 0.40),
    ("50%", "Control & Signal Limit", "Maximum usable area for non-heat-generating control and instrumentation lines.", CYAN, 0.50),
    ("20%", "Future Reserve Margin", "Mandatory spare width reserved for upcoming plant expansions and revamps.", AMBER, 0.20),
]
gap = 0.3; cw_ = (CW - 2*gap)/3; y0 = top + 0.3; ch_ = 4.0
for i, (big, t, d, ac, frac) in enumerate(stats):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    text(s, x+0.32, y0+0.28, cw_-0.64, 1.0, big, size=50, color=ac, bold=True)
    bar_y = y0+1.42; bw = cw_-0.64
    rect(s, x+0.32, bar_y, bw, 0.14, fill=RGBColor(0xEA,0xF0,0xF6), shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.5)
    rect(s, x+0.32, bar_y, bw*frac, 0.14, fill=ac, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.5)
    text(s, x+0.32, bar_y+0.34, cw_-0.64, 0.5, t, size=16, color=NAVY, bold=True)
    text(s, x+0.32, bar_y+0.82, cw_-0.64, 1.4, d, size=12.5, color=MUTED, leading=1.2)
s.notes_slide.notes_text_frame.text = ("NEC 392.22 working limits: 40% fill for multiconductor power, 50% for control/signal, "
    "and hold 20% spare capacity for future expansion. The width formula is an area method with a 1.25 packing margin.")

# =================================================================
# SLIDE 5 — LAYING ARRANGEMENT (1-core vs multi-core)
# =================================================================
s = slide()
top = chrome(s, "INSTALLATION GEOMETRY", "Laying Arrangement: Single-Core vs Multi-Core",
             note="Incorrect single-core bundling creates hazardous circulating currents and severe tray overheating.")
pw = (CW - 0.3)/2; y0 = top + 0.25; ph = 4.25
panels = [
    ("Single-Core Cables", BLUE, "trefoil", [
        ("Trefoil Formation", "Route in grouped trefoils to balance induced magnetic fields."),
        ("Single-Layer Rule", "Strictly no multi-layer stacking; space groups by 2 × cable diameter."),
        ("Short-Circuit Cleating", "Rated cleats every 1.5 m to withstand dynamic electromagnetic forces."),
        ("Non-Magnetic Clamps", "Stainless steel or aluminium hardware to stop eddy-current heating."),
    ]),
    ("Multi-Core Cables", CYAN, "flat", [
        ("Flat Side-by-Side", "Low-voltage power placed touching, or spaced by 1 × cable diameter."),
        ("Thermal Stacking", "Avoid multi-layer stacking unless ampacity derating is applied."),
        ("Direct Tie Fastening", "UV-resistant heavy nylon or coated steel ties on rungs."),
        ("Vertical Rung Anchoring", "Support multi-core every 450 mm on vertical risers."),
    ]),
]
for i, (t, ac, icon, items) in enumerate(panels):
    x = M + i*(pw+0.3)
    card(s, x, y0, pw, ph, accent=ac)
    if icon == "trefoil":
        trefoil(s, x+0.62, y0+0.62, 0.14, color=ac)
    else:
        for k in range(3):
            oval(s, x+0.3+k*0.31, y0+0.42, 0.27, 0.27, fill=ac)
    text(s, x+1.25, y0+0.33, pw-1.5, 0.55, t, size=18, color=NAVY, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    line(s, x+0.3, y0+0.98, x+pw-0.3, y0+0.98, color=BORDER, lw=1)
    iy = y0+1.16
    for (bt, bd) in items:
        oval(s, x+0.32, iy+0.07, 0.1, 0.1, fill=ac)
        text(s, x+0.58, iy, pw-0.9, 0.72,
             [[(bt + " — ", {'bold': True, 'color': NAVY, 'size': 12.5}), (bd, {'size': 12.5, 'color': MUTED})]],
             leading=1.1)
        iy += 0.76
s.notes_slide.notes_text_frame.text = ("Single-core AC circuits must run in trefoil with non-magnetic cleats — bundling them wrong "
    "induces circulating currents and overheating. Multi-core runs flat, single layer, derated if stacked.")

# =================================================================
# SLIDE 6 — SEGREGATION TABLE
# =================================================================
s = slide()
top = chrome(s, "ELECTROMAGNETIC COMPATIBILITY", "Voltage Segregation & Separation Distances",
             note="Maintain 90° right-angle crossings wherever signal trays must cross power routes.")
rows = [
    ("Tray Level / Class", "Voltage Level", "Vertical Separation", "Physical Divider Rule"),
    ("Top Tier  (Tier 1)", "High Voltage  (> 1 kV to 33 kV)", "Top position", "Separate tray; no shared services"),
    ("Tier 2", "Low Voltage Power  (< 1 kV)", "300 mm from HV", "Solid metallic barrier if in same tray"),
    ("Tier 3", "Control & Interlocking  (110 V / 230 V)", "250 mm from LV", "Perforated barrier minimum"),
    ("Bottom Tier  (Tier 4)", "Analog & Fieldbus  (< 50 V / 4–20 mA)", "450 mm from power", "Dedicated solid-bottom tray or conduit"),
]
tier_colors = [None, RGBColor(0xC0,0x3A,0x2B), AMBER, CYAN, GREEN]
y0 = top + 0.25
gfr = s.shapes.add_table(5, 4, Inches(M), Inches(y0), Inches(CW), Inches(4.1))
tbl = gfr.table
tbl.first_row = True; tbl.horz_banding = False
widths = [2.5, 3.6, 2.3, 3.69]
for i, wd in enumerate(widths): tbl.columns[i].width = Inches(wd)
tbl.rows[0].height = Inches(0.62)
for ri in range(1, 5): tbl.rows[ri].height = Inches(0.84)
for ri in range(5):
    for ci in range(4):
        cell = tbl.cell(ri, ci)
        cell.margin_left = Inches(0.5 if (ci == 0 and ri > 0) else 0.18); cell.margin_right = Inches(0.1)
        cell.margin_top = Inches(0.06); cell.margin_bottom = Inches(0.06)
        cell.vertical_anchor = MSO_ANCHOR.MIDDLE
        cell.fill.solid()
        cell.fill.fore_color.rgb = NAVY if ri == 0 else (CARD if ri % 2 == 1 else RGBColor(0xF2,0xF6,0xFA))
        p = cell.text_frame.paragraphs[0]
        r = p.add_run(); r.text = rows[ri][ci]
        f = r.font; f.name = FONT
        f.size = Pt(13 if ri == 0 else 12.5)
        f.bold = (ri == 0 or ci == 0)
        f.color.rgb = RGBColor(0xFF,0xFF,0xFF) if ri == 0 else (NAVY if ci == 0 else INK)
# tier color dots in col 0 (inside the widened left margin)
for ri in range(1, 5):
    oval(s, M+0.2, y0 + 0.62 + (ri-1)*0.84 + 0.345, 0.15, 0.15, fill=tier_colors[ri])
s.notes_slide.notes_text_frame.text = ("Vertical tier order: HV on top, then LV power, control, and analog/fieldbus at the bottom, "
    "with the separations shown. Where trays must cross, do it at 90 degrees to minimise coupling.")

# =================================================================
# SLIDE 7 — NEMA SUPPORTS (span diagram + cards)
# =================================================================
s = slide()
top = chrome(s, "STRUCTURAL ENGINEERING", "NEMA VE 1 / VE 2 Support Standards",
             note="Thermal expansion: install expansion splice plates every 30 m on straight outdoor aluminium runs.")
# span diagram
dy = top + 0.22; dx = M + 0.3; dw = CW - 0.6
rect(s, dx, dy+0.52, dw, 0.13, fill=BLUE)                       # tray run
for i in range(4):                                               # supports
    sx = dx + 0.25 + i*(dw-0.7)/3
    rect(s, sx, dy+0.65, 0.11, 0.5, fill=NAVY)
    rect(s, sx-0.1, dy+1.15, 0.31, 0.07, fill=NAVY)
# splice at 0.25L of second span
sp_x = dx + 0.25 + (dw-0.7)/3 + 0.25*((dw-0.7)/3)
rect(s, sp_x-0.045, dy+0.44, 0.1, 0.29, fill=AMBER)
text(s, sp_x-0.85, dy+0.04, 1.9, 0.3, "splice @ 0.25 L", size=10.5, color=AMBER_D, bold=True, align=PP_ALIGN.CENTER)
line(s, sp_x+0.005, dy+0.33, sp_x+0.005, dy+0.44, color=AMBER_D, lw=1.2)
# span label
b1 = dx + 0.25 + 0.055; b2 = dx + 0.25 + (dw-0.7)/3 + 0.055
line(s, b1, dy+1.42, b2, dy+1.42, color=MUTED, lw=1.0)
line(s, b1, dy+1.34, b1, dy+1.5, color=MUTED, lw=1.0); line(s, b2, dy+1.34, b2, dy+1.5, color=MUTED, lw=1.0)
text(s, b1, dy+1.5, b2-b1, 0.28, "support span L (12 ft / 20 ft class)", size=10.5, color=MUTED, align=PP_ALIGN.CENTER)
cards7 = [
    ("NEMA Load Class Ratings", "Class 12C (100 lb/ft @ 12 ft span) or 20C (100 lb/ft @ 20 ft). Factor wind, ice, and a 200 lb concentrated worker load.", BLUE),
    ("Splice Joint Location — 0.25 L Rule", "Locate splice connectors at quarter-span distance from the support beam. Never place splices at mid-span.", AMBER),
    ("NEMA VE 2 Fitting Support", "Support within 600 mm (2 ft) of each horizontal bend, tee, cross, or vertical reducer fitting.", CYAN),
]
gap = 0.3; cw_ = (CW-2*gap)/3; y0 = dy + 2.0; ch_ = 2.15
for i, (t, d, ac) in enumerate(cards7):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    text(s, x+0.28, y0+0.24, cw_-0.56, 0.62, t, size=14.5, color=NAVY, bold=True, leading=1.05)
    text(s, x+0.28, y0+0.95, cw_-0.56, 1.1, d, size=12, color=MUTED, leading=1.18)
s.notes_slide.notes_text_frame.text = ("NEMA class = load per foot at a given span: 12C is 100 lb/ft at 12 ft. Add wind, ice and a "
    "200 lb worker point load. Splices go at quarter span — never mid-span where bending moment peaks. Fittings get a support within 600 mm.")

# =================================================================
# SLIDE 8 — CLEARANCES (diagram + cards)
# =================================================================
s = slide()
top = chrome(s, "INSTALLABILITY & ERGONOMICS", "Substation & Switchgear Room Clearances",
             note="Comply with OSHA 1910 headroom and maintain a 2.1 m clear walkway below the bottom rack.")
# left: stacked cards
cards8 = [
    ("300 mm (12 in) Top Headroom", "Overhead clearance above the tray side rail for cable pulling and roller guides.", BLUE),
    ("600 mm (24 in) Side Access", "Clear pathway between tray edge and wall or structural columns for personnel.", CYAN),
    ("Switchgear Dropping Corridor", "Align overhead trays with panel top-entry plates to avoid sharp S-bends.", AMBER),
]
y0 = top + 0.25; chh = 1.32
for i, (t, d, ac) in enumerate(cards8):
    y = y0 + i*(chh+0.18)
    card(s, M, y, 6.4, chh, accent=ac, top_strip=False)
    rect(s, M, y, 0.06, chh, fill=ac)
    text(s, M+0.3, y+0.17, 5.9, 0.4, t, size=14.5, color=NAVY, bold=True)
    text(s, M+0.3, y+0.62, 5.9, 0.62, d, size=12, color=MUTED, leading=1.15)
# right: clearance diagram
dx = M + 6.9; dw = CW - 6.9; dy = y0 + 0.1; dh = 4.0
rect(s, dx, dy, dw, dh, fill=CARD, line=BORDER, lw=1.1, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.04)
wall_x = dx + 0.55
rect(s, wall_x, dy+0.3, 0.14, dh-0.6, fill=RGBColor(0xC9,0xD6,0xE2))       # wall
ty = dy + 1.15; tx = wall_x + 0.14 + 1.45                                   # tray position
rect(s, tx, ty, 2.1, 0.5, fill=None, line=BLUE, lw=2)                        # tray
for k in range(4): oval(s, tx+0.18+k*0.47, ty+0.13, 0.26, 0.26, fill=CYAN)
rect(s, dx+0.3, dy+dh-0.42, dw-0.6, 0.12, fill=RGBColor(0xC9,0xD6,0xE2))    # floor
# dim: top headroom
line(s, tx+1.05, dy+0.42, tx+1.05, ty, color=AMBER_D, lw=1.4)
text(s, tx+1.15, dy+0.52, 1.8, 0.3, "300 mm", size=11, color=AMBER_D, bold=True)
line(s, tx-0.5, dy+0.42, tx+2.6, dy+0.42, color=BORDER, lw=1.2)             # obstruction line
# dim: side access
line(s, wall_x+0.14, ty+0.25, tx, ty+0.25, color=AMBER_D, lw=1.4)
text(s, wall_x+0.25, ty+0.3, 1.4, 0.3, "600 mm", size=11, color=AMBER_D, bold=True)
# dim: walkway
line(s, tx+2.6, ty+0.5, tx+2.6, dy+dh-0.42, color=GREEN, lw=1.4)
text(s, tx+2.68, ty+1.35, 1.3, 0.5, ["2.1 m", "walkway"], size=11, color=GREEN, bold=True, leading=1.05)
s.notes_slide.notes_text_frame.text = ("Three clearances to defend in layout reviews: 300 mm above the rail for pulling gear, "
    "600 mm personnel access beside the tray, and 2.1 m headroom below the bottom rack per OSHA 1910.")

# =================================================================
# SLIDE 9 — MBR CLASSES
# =================================================================
s = slide()
top = chrome(s, "PULLING STRESS & FITTINGS", "Cable Minimum Bending Radius (MBR)",
             note="Fitting radius rule:  R fitting  ≥  MBR of the largest cable in the tray.")
mbr = [
    ("CLASS 1", "Control / Signal", "6 × OD", "Unarmored instrument pairs; select 300 mm fitting radius.", CYAN),
    ("CLASS 2", "LV Power", "8–12 × OD", "Armored & unarmored LV; select 450 mm fitting radius.", BLUE),
    ("CLASS 3", "MV / HV Shielded", "12–15 × OD", "Medium-voltage tape shield; specify 600–900 mm fitting radius.", NAVY),
    ("CLASS 4", "Optical Fiber", "20 × OD", "Dynamic pulling limit to prevent internal glass micro-fractures.", AMBER),
]
gap = 0.26; cw_ = (CW-3*gap)/4; y0 = top + 0.3; ch_ = 4.05
for i, (cls, t, big, d, ac) in enumerate(mbr):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    chip(s, x+0.28, y0+0.3, 1.15, cls, dark=False, h=0.36, size=10)
    # bend radius glyph: quarter arc suggestion via BLOCK_ARC-ish elbow
    text(s, x+0.28, y0+0.82, cw_-0.56, 0.95, big, size=29, color=ac, bold=True)
    text(s, x+0.28, y0+1.78, cw_-0.56, 0.45, t, size=15, color=NAVY, bold=True)
    line(s, x+0.28, y0+2.32, x+cw_-0.28, y0+2.32, color=BORDER, lw=1)
    text(s, x+0.28, y0+2.46, cw_-0.56, 1.4, d, size=11.8, color=MUTED, leading=1.18)
s.notes_slide.notes_text_frame.text = ("Minimum bending radius scales with cable construction — from 6×OD for unarmored "
    "instrument pairs up to 20×OD for optical fiber during pulling. Tray fitting radius must meet or exceed the largest cable's MBR.")

# =================================================================
# SLIDE 10 — COVERS
# =================================================================
s = slide()
top = chrome(s, "ENVIRONMENTAL & THERMAL DESIGN", "Cable Tray Cover Philosophy",
             note="Specify heavy-duty stainless steel cover hold-down clamps rated for local design wind velocities.")
covers = [
    ("Peaked / Flanged Covers", "Pitched profile sheds rainwater, snow, and chemical process deposits outdoors.", "USE", "Outdoor racks & pipe bridges", BLUE),
    ("Mechanical Protection", "Solid covers mandatory within 1.8 m of platforms, stairs, and crane lift corridors.", "USE", "Falling tool & slag zones", NAVY),
    ("Ampacity Derating", "Solid unventilated covers trap heat, penalizing cable ampacity by 10% to 15%.", "DERATING", "Apply 0.85 – 0.90 factor", AMBER),
    ("Raised Standoff Spacers", "25–50 mm raised cover brackets restore convective airflow while blocking sunlight.", "FIX", "Avoids thermal choke points", CYAN),
]
gap = 0.26; cw_ = (CW-3*gap)/4; y0 = top + 0.3; ch_ = 4.05
for i, (t, d, tag, tagv, ac) in enumerate(covers):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    numcircle(s, x+0.28, y0+0.3, f"{i+1:02d}", d=0.46, fill=ac)
    text(s, x+0.28, y0+0.95, cw_-0.56, 0.78, t, size=15, color=NAVY, bold=True, leading=1.03)
    text(s, x+0.28, y0+1.75, cw_-0.56, 1.35, d, size=12, color=MUTED, leading=1.18)
    line(s, x+0.28, y0+3.12, x+cw_-0.28, y0+3.12, color=BORDER, lw=1)
    text(s, x+0.28, y0+3.24, cw_-0.56, 0.7,
         [[(tag + "  ", {'size': 9.5, 'color': AMBER_D, 'bold': True, 'spc': 140}), (tagv, {'size': 11.5, 'color': INK, 'bold': True})]],
         leading=1.1)
s.notes_slide.notes_text_frame.text = ("Covers are a trade-off: they protect outdoors and under platforms, but solid covers cost "
    "10–15% ampacity. Raised standoff spacers give sun/debris protection while keeping convective cooling.")

# =================================================================
# SLIDE 11 — TRENCH (cards + cross-section)
# =================================================================
s = slide()
top = chrome(s, "CIVIL & SUBSTATION INTERFACE", "Underground Cable Trench Standards",
             note="Segregate MV power on one side wall and control / instrumentation on the opposing trench wall.")
cards11 = [
    ("Precast Trench & 1:100 Bed Slope", "Reinforced concrete with continuous longitudinal slope towards sumps to eliminate standing water.", BLUE),
    ("Wall-Mounted Cable Racking", "Unistrut cantilever brackets along walls; bottom cable level raised ≥ 100 mm off the trench floor.", CYAN),
    ("Cover Class & Entry Seals", "Heavy RCC / chequered covers for roads; fire-rated gas-tight transits at building entry walls.", AMBER),
]
y0 = top + 0.25; chh = 1.32
for i, (t, d, ac) in enumerate(cards11):
    y = y0 + i*(chh+0.18)
    card(s, M, y, 6.4, chh, accent=ac, top_strip=False)
    rect(s, M, y, 0.06, chh, fill=ac)
    text(s, M+0.3, y+0.15, 5.9, 0.4, t, size=14, color=NAVY, bold=True)
    text(s, M+0.3, y+0.58, 5.9, 0.68, d, size=11.8, color=MUTED, leading=1.14)
# right: trench cross-section
dx = M+6.9; dw = CW-6.9; dy = y0+0.08; dh = 4.05
rect(s, dx, dy, dw, dh, fill=CARD, line=BORDER, lw=1.1, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.04)
gx, gy = dx+0.55, dy+0.75; gw, gh = dw-1.1, dh-1.3
conc = RGBColor(0xC9,0xD6,0xE2)
rect(s, gx, gy, 0.22, gh, fill=conc); rect(s, gx+gw-0.22, gy, 0.22, gh, fill=conc)   # walls
rect(s, gx, gy+gh-0.2, gw, 0.2, fill=conc)                                           # floor
rect(s, gx-0.12, gy-0.22, gw+0.24, 0.16, fill=NAVY)                                  # cover slab
text(s, gx, gy-0.55, gw, 0.3, "RCC / chequered cover", size=10, color=MUTED, align=PP_ALIGN.CENTER)
# left wall brackets: MV power (red-ish), right wall: instrumentation
for k in range(3):
    by = gy + 0.35 + k*0.78
    rect(s, gx+0.22, by, 0.62, 0.07, fill=NAVY2)
    oval(s, gx+0.36, by-0.21, 0.2, 0.2, fill=RED)
    rect(s, gx+gw-0.84, by, 0.62, 0.07, fill=NAVY2)
    oval(s, gx+gw-0.6, by-0.18, 0.16, 0.16, fill=GREEN)
text(s, gx+0.1, gy+gh+0.06, 2.0, 0.3, "MV power wall", size=10, color=RED, bold=True)
text(s, gx+gw-2.05, gy+gh+0.06, 2.0, 0.3, "Instrument wall", size=10, color=GREEN, bold=True, align=PP_ALIGN.RIGHT)
# slope arrow
line(s, gx+0.5, gy+gh-0.3, gx+gw-0.5, gy+gh-0.24, color=CYAN, lw=1.6)
text(s, gx, gy+gh-0.62, gw, 0.3, "1:100 slope → sump", size=10, color=CYAN, bold=True, align=PP_ALIGN.CENTER)
s.notes_slide.notes_text_frame.text = ("Trench rules: precast RCC with a 1:100 fall to sumps, cables racked on walls at least "
    "100 mm off the floor, MV and instrumentation on opposite walls, heavy covers at road crossings and gas-tight transits into buildings.")

# =================================================================
# SLIDE 12 — BIM (image + cards)
# =================================================================
s = slide()
top = chrome(s, "DIGITAL ENGINEERING WORKFLOW", "BIM / 3D Clash Coordination",
             note="Conduct clash tests at 0 mm tolerance for structural steel and 25 mm for insulated piping.")
y0 = top + 0.25
pic = s.shapes.add_picture("bim_clash.png", Inches(M), Inches(y0), Inches(5.6), Inches(3.95))
pic.line.color.rgb = BORDER; pic.line.width = Pt(1.2)
text(s, M, y0+4.0, 5.6, 0.3, "Clash detection — structural vs MEP  (image: united-bim.com)", size=9.5, color=MUTED)
cards12 = [
    ("Piping Right-of-Way Rules", "Route cable trays ABOVE steam, hydrocarbon, and slurry pipes to eliminate leak-dripping hazards.", BLUE),
    ("HVAC Duct Clearances", "Maintain 150 mm minimum separation from chilled-air ducts to stop surface thermal condensation.", CYAN),
    ("Zero Soft Clashes", "Model cable pull envelopes and maintenance zones directly in Revit / Navisworks models.", AMBER),
]
chh = 1.25
for i, (t, d, ac) in enumerate(cards12):
    y = y0 + i*(chh+0.15)
    x = M + 6.0
    card(s, x, y, CW-6.0, chh, accent=ac, top_strip=False)
    rect(s, x, y, 0.06, chh, fill=ac)
    text(s, x+0.3, y+0.14, CW-6.6, 0.4, t, size=14, color=NAVY, bold=True)
    text(s, x+0.3, y+0.55, CW-6.6, 0.65, d, size=11.8, color=MUTED, leading=1.14)
s.notes_slide.notes_text_frame.text = ("In the 3D model: trays go above leak-prone piping, 150 mm off chilled ducts, and we model "
    "pull envelopes and maintenance space as objects so soft clashes are caught before construction.")

# =================================================================
# SLIDE 13 — EARTHING
# =================================================================
s = slide()
top = chrome(s, "SAFETY & INTEGRITY", "Earthing, Bonding & Grounding  (NEC 250)",
             note="Remove paint, anodized coating, and lacquer completely at all bonding contact lugs.")
earth = [
    ("Bonding Jumpers", "Flexible copper braid jumpers across every expansion joint, swivel, and reducer.", BLUE),
    ("Main Grid Taps", "Connect tray spine to the main earthing ring at 20 m intervals using 70 mm² bare copper.", CYAN),
    ("Low Resistance Limit", "Measure end-to-end path resistance; must not exceed 0.1 Ω per IEEE Std 525.", AMBER),
    ("Equipment Grounding", "Tray cannot substitute for the dedicated EGC green wire in branch circuits.", NAVY),
]
gap = 0.26; cw_ = (CW-3*gap)/4; y0 = top + 0.45; ch_ = 3.45
for i, (t, d, ac) in enumerate(earth):
    x = M + i*(cw_+gap)
    card(s, x, y0, cw_, ch_, accent=ac)
    # earth symbol: 3 shrinking bars
    bx = x+0.3; by = y0+0.42
    line(s, bx+0.26, by-0.1, bx+0.26, by+0.12, color=ac, lw=2.2)
    for k, wd in enumerate([0.52, 0.34, 0.18]):
        rect(s, bx+0.26-wd/2, by+0.14+k*0.1, wd, 0.045, fill=ac)
    text(s, x+0.28, y0+1.05, cw_-0.56, 0.78, t, size=15.5, color=NAVY, bold=True, leading=1.03)
    text(s, x+0.28, y0+1.85, cw_-0.56, 1.7, d, size=12.2, color=MUTED, leading=1.2)
s.notes_slide.notes_text_frame.text = ("Grounding continuity: braid jumpers at every mechanical break, earthing-ring taps every "
    "20 m with 70 mm² bare copper, verified below 0.1 ohm end-to-end, and the tray never replaces the equipment grounding conductor.")

# =================================================================
# SLIDE 14 — QA CHECKLIST
# =================================================================
s = slide()
top = chrome(s, "QUALITY ASSURANCE", "Design Review & QA/QC Gate Checklist",
             note="Complete sign-off by the Lead Electrical Engineer prior to issuing drawings for construction (IFC).")
checks = [
    ("Fill Verification", "Cross-sectional fill verified ≤ 40% (power) and 50% (control) with 20% spare."),
    ("Fitting Radius Validation", "Tray bend radii ≥ minimum bending radius of the thickest cable."),
    ("Segregation Matrix", "HV, LV, and instrumentation lines placed on correct vertical tiers."),
    ("Support Calculations", "Structural spans validated under NEMA VE 1 with the 0.25 L splice rule."),
    ("Cover & Trench Compliance", "Outdoor peaked covers, ampacity derating, and trench drains checked."),
    ("Penetration Details", "2-hour UL-listed firestops and gas barrier seals scheduled on the MTO."),
]
y0 = top + 0.22; rh = 0.68
for i, (t, d) in enumerate(checks):
    y = y0 + i*(rh+0.085)
    rect(s, M, y, CW, rh, fill=CARD, line=BORDER, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=0.14)
    oval(s, M+0.22, y+(rh-0.36)/2, 0.36, 0.36, fill=GREEN)
    text(s, M+0.22, y+(rh-0.38)/2, 0.36, 0.36, "✓", size=14, color=RGBColor(0xFF,0xFF,0xFF), bold=True,
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, M+0.82, y, 3.6, rh, t, size=13.5, color=NAVY, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    text(s, M+4.6, y, CW-4.9, rh, d, size=12.5, color=MUTED, anchor=MSO_ANCHOR.MIDDLE)
s.notes_slide.notes_text_frame.text = ("Six gates before IFC: fill, bending radius, segregation tiers, support spans, "
    "covers/trench, and fire-stopped penetrations — signed off by the Lead Electrical Engineer.")

# =================================================================
# SLIDE 15 — CLOSER
# =================================================================
s = slide(); PAGENO[0] += 1
rect(s, 0, 0, W, H, fill=NAVY)
trefoil(s, 11.6, 1.7, 0.5, color=None, line_c=RGBColor(0x2A,0x4A,0x6B), lw=1.6)
oval(s, 10.6, 4.6, 2.6, 2.6, fill=None, line_c=RGBColor(0x1E,0x3D,0x5E), lw=1.2)
rect(s, 0, 7.28, W, 0.22, fill=AMBER)
text(s, M, 1.45, 10, 0.4, "ENGINEERING TRAINING COMPLETE", size=13, color=CYAN, bold=True, spc=300)
text(s, M, 1.95, 11, 1.1, "Thanks & Discussion", size=46, color=RGBColor(0xFF,0xFF,0xFF), bold=True)
line(s, M, 3.35, M+1.5, 3.35, color=AMBER, lw=3)
text(s, M, 3.65, 10.6, 0.9,
     "Safe raceway design balances electrical segregation, structural loading, thermal derating, and constructability in field execution.",
     size=16, color=RGBColor(0xB9,0xCD,0xDE), leading=1.25)
text(s, M, 5.05, 10, 0.35, "REFERENCE STANDARDS", size=11, color=RGBColor(0x8F,0xA9,0xC0), bold=True, spc=240)
cx = M
for lbl, wch in [("NEC 392", 1.25), ("NEMA VE 1 / VE 2", 2.0), ("IEEE Std 525", 1.6), ("IEC 61537", 1.4), ("OSHA 1910", 1.45)]:
    chip(s, cx, 5.45, wch, lbl, dark=True, h=0.46, size=12)
    cx += wch + 0.22
text(s, M, 6.35, 9.0, 0.4, [[("Hans Raj", {'bold': True, 'color': RGBColor(0xFF,0xFF,0xFF)}),
                             ("   |   Air Liquide", {'color': RGBColor(0x8F,0xA9,0xC0)})]], size=14)
s.notes_slide.notes_text_frame.text = "Open the floor for questions; recap the four pillars: segregation, structure, thermal, constructability."

# =================================================================
# SLIDE 16 — IMAGE CREDITS
# =================================================================
s = slide()
top = chrome(s, "APPENDIX", "Image Sources")
text(s, M, top+0.4, CW, 0.4, "BIM clash detection render (slide 12):", size=14, color=NAVY, bold=True)
text(s, M, top+0.85, CW, 0.4,
     "https://www.united-bim.com/wp-content/uploads/2019/04/Clash-detection-for-hotel-project-of-structural-and-MEP.jpg",
     size=12, color=BLUE)
text(s, M, top+1.3, CW, 0.4, "Source: www.united-bim.com", size=12, color=MUTED)
text(s, M, top+2.1, CW, 0.4, "All diagrams are original vector illustrations created for this training deck.", size=12, color=MUTED)

# ---------- transitions (fade) ----------
for sl in prs.slides:
    el = sl._element
    trans = el.makeelement(qn('p:transition'), {'spd': 'med'})
    fade = el.makeelement(qn('p:fade'), {})
    trans.append(fade)
    el.insert(2, trans)

prs.save("CableTray_Redesign.pptx")
print("saved CableTray_Redesign.pptx, slides:", len(prs.slides._sldIdLst))
