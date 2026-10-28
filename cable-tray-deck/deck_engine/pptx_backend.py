"""PPTX backend: translates a Canvas into native, editable PowerPoint shapes.

Every text string becomes a real PowerPoint text run (no text is baked into images),
every rule, panel and drawing is a native shape, and each slide carries its speaker
notes plus a p14:fade transition.
"""
from __future__ import annotations

import copy
import pathlib
from typing import Any

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Pt

from .tokens import PPT_BOLD, PPT_FACE, W, H, col

EMU_PER_PT = 12700
NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main"
NS_P14 = "http://schemas.microsoft.com/office/powerpoint/2010/main"
NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main"

ALIGN = {"left": PP_ALIGN.LEFT, "center": PP_ALIGN.CENTER, "right": PP_ALIGN.RIGHT}
DASH = {None: None, "dot": MSO_LINE_DASH_STYLE.ROUND_DOT, "dash": MSO_LINE_DASH_STYLE.DASH}


def _rgb(hexstr: str) -> RGBColor:
    r, g, b = col(hexstr)
    return RGBColor(int(round(r * 255)), int(round(g * 255)), int(round(b * 255)))


def _pt(v: float) -> Emu:
    return Emu(int(round(v * EMU_PER_PT)))


class PptxBackend:
    def __init__(self, prs: Presentation):
        self.prs = prs

    # ── primitives ────────────────────────────────────────
    def draw(self, slide, ops: list[dict[str, Any]]):
        shapes = slide.shapes
        for o in ops:
            k = o["op"]
            if k == "rect":
                self._rect(shapes, o)
            elif k == "line":
                self._line(shapes, o)
            elif k == "circle":
                shp = shapes.add_shape(MSO_SHAPE.OVAL, _pt(o["cx"] - o["r"]), _pt(o["cy"] - o["r"]),
                                       _pt(2 * o["r"]), _pt(2 * o["r"]))
                self._fill_line(shp, o["fill"], o["stroke"], o["sw"], None)
            elif k == "poly":
                self._poly(shapes, o)
            elif k == "image":
                self._image(shapes, o)
            elif k == "text":
                self._text(shapes, o)

    def _fill_line(self, shp, fill, stroke, sw, dash, radius=None):
        if fill:
            shp.fill.solid()
            shp.fill.fore_color.rgb = _rgb(fill)
        else:
            shp.fill.background()
        if stroke:
            shp.line.color.rgb = _rgb(stroke)
            shp.line.width = _pt(max(sw, 0.4))
            if dash:
                shp.line.dash_style = DASH.get(dash) or MSO_LINE_DASH_STYLE.SOLID
        else:
            shp.line.fill.background()
        shp.shadow.inherit = False
        if radius is not None and hasattr(shp, "adjustments") and len(shp.adjustments):
            short = max(0.5, min(shp.width, shp.height) / EMU_PER_PT)
            try:
                shp.adjustments[0] = max(0.0, min(0.5, radius / short if radius else 0.0))
            except Exception:
                pass
        if shp.has_text_frame:
            shp.text_frame.word_wrap = False

    def _rect(self, shapes, o):
        rad = o.get("radius") or 0.0
        if rad > 0.4:
            # rounded glyph: approximate with a rounded rectangle on the short side
            shape = MSO_SHAPE.ROUNDED_RECTANGLE
        elif rad > 0:
            shape = MSO_SHAPE.ROUNDED_RECTANGLE
        else:
            shape = MSO_SHAPE.RECTANGLE
        shp = shapes.add_shape(shape, _pt(o["x"]), _pt(o["y"]), _pt(o["w"]), _pt(o["h"]))
        self._fill_line(shp, o["fill"], o["stroke"], o["sw"], o.get("dash"),
                        radius=rad if rad > 0 else None)

    def _line(self, shapes, o):
        conn = shapes.add_connector(MSO_CONNECTOR.STRAIGHT, _pt(o["x1"]), _pt(o["y1"]),
                                    _pt(o["x2"]), _pt(o["y2"]))
        conn.line.color.rgb = _rgb(o["color"])
        conn.line.width = _pt(max(o["width"], 0.4))
        d = DASH.get(o.get("dash"))
        if d:
            conn.line.dash_style = d

    def _poly(self, shapes, o):
        pts = o["pts"]
        ff = shapes.build_freeform(float(pts[0][0]), float(pts[0][1]), scale=Pt(1))
        ff.add_line_segments([(float(x), float(y)) for x, y in pts[1:]],
                             close=bool(o.get("close", True)))
        shp = ff.convert_to_shape()
        self._fill_line(shp, o["fill"], o["stroke"], o["sw"], o.get("dash"))

    def _image(self, shapes, o):
        pic = shapes.add_picture(o["path"], _pt(o["x"]), _pt(o["y"]), _pt(o["w"]), _pt(o["h"]))
        pic.shadow.inherit = False
        return pic

    def _text(self, shapes, o):
        n = len(o["lines"])
        lh = o["lh"]
        # Match the PDF's first-baseline convention (y + 0.80 em). PowerPoint places the
        # first baseline at (top + lh - descent); Segoe UI descent is ~0.212 em.
        top = o["y"] + 1.012 * o["size"] - lh
        box = shapes.add_textbox(_pt(o["x"]), _pt(top), _pt(o["w"] + 3.0),
                                 _pt(n * lh + o["size"] * 0.5))
        tf = box.text_frame
        tf.word_wrap = True
        tf.auto_size = None
        tf.margin_left = 0
        tf.margin_right = 0
        tf.margin_top = 0
        tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.TOP
        bodyPr = tf._txBody.find(qn("a:bodyPr"))
        for tag in ("a:spAutoFit", "a:normAutofit"):
            el = bodyPr.find(qn(tag))
            if el is not None:
                bodyPr.remove(el)
        bodyPr.set("wrap", "square")
        face_name = PPT_FACE[o["face"]]
        bold = PPT_BOLD[o["face"]]
        for i, line in enumerate(o["lines"]):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.alignment = ALIGN[o["align"]]
            p.line_spacing = Pt(lh)
            p.space_before = Pt(0)
            p.space_after = Pt(0)
            run = p.add_run()
            run.text = line
            f = run.font
            f.size = Pt(round(o["size"], 1))
            f.name = face_name
            f.bold = bold
            f.color.rgb = _rgb(o["color"])
            # East-Asian + complex-script faces too, so nothing falls back to Calibri
            rPr = run._r.get_or_add_rPr()
            for tag in ("a:latin", "a:ea", "a:cs"):
                el = rPr.find(qn(tag))
                if el is None:
                    el = etree.SubElement(rPr, qn(tag))
                el.set("typeface", face_name)


# ── deck-level helpers ────────────────────────────────────────
def new_presentation() -> Presentation:
    prs = Presentation()
    prs.slide_width = _pt(W)
    prs.slide_height = _pt(H)
    return prs


def blank_layout(prs: Presentation):
    return prs.slide_layouts[6]


def set_theme_fonts(prs: Presentation, major="Segoe UI Semibold", minor="Segoe UI"):
    from pptx.opc.constants import RELATIONSHIP_TYPE as RT
    theme_part = prs.slide_master.part.part_related_by(RT.THEME)
    root = etree.fromstring(theme_part.blob)
    ns = {"a": NS_A}
    for tag, face in (("a:majorFont", major), ("a:minorFont", minor)):
        for el in root.findall(f".//{tag}", ns):
            latin = el.find("a:latin", ns)
            if latin is not None:
                latin.set("typeface", face)


def add_notes(slide, text: str):
    if not text:
        return
    slide.notes_slide.notes_text_frame.text = text


def add_transition(slide, effect="fade", speed="med"):
    """Append a standard ECMA-376 slide transition (after cSld / clrMapOvr).

    `p:fade` is the baseline fade-through-black that every PowerPoint since 2007,
    LibreOffice, Keynote and Google Slides understands — safer than the p14 extension.
    """
    sld = slide._element
    for old in sld.findall(qn("p:transition")):
        sld.remove(old)
    xml = (f'<p:transition xmlns:p="{NS_P}" spd="{speed}" advClick="1">'
           f'<p:{effect}/></p:transition>')
    el = etree.fromstring(xml)
    sld.append(el)   # schema order: cSld, clrMapOvr, transition, timing, extLst


def set_background(slide, hexcolor: str):
    from pptx.dml.color import RGBColor
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = _rgb(hexcolor)
