"""PyMuPDF backend: draws a Canvas into a vector PDF page, and to PNG for review."""
from __future__ import annotations

import pathlib
from typing import Any

import pymupdf as fitz
from PIL import Image

from .tokens import FONT_FILES, W, H, col, measure, rgb

_FACE_KEY = {"reg": "Int-Reg", "med": "Int-Med", "semi": "Int-Semi", "bold": "Int-Bold",
             "xbold": "Int-XBold", "mono": "Mono-Med", "mono_b": "Mono-Semi"}


class PdfBackend:
    def __init__(self, doc: fitz.Document):
        self.doc = doc
        self.registered: dict[int, set[str]] = {}

    def _font(self, page, face: str) -> str:
        key = _FACE_KEY[face]
        cache = self.registered.setdefault(page.number, set())
        if key not in cache:
            page.insert_font(fontname=key, fontfile=str(FONT_FILES[face]))
            cache.add(key)
        return key

    def _dash(self, dash):
        if not dash:
            return None
        if dash == "dot":
            return "[1 3] 0"
        if dash == "dash":
            return "[4 3] 0"
        return dash

    def draw(self, page: fitz.Page, ops: list[dict[str, Any]]):
        for o in ops:
            kind = o["op"]
            if kind == "rect":
                r = fitz.Rect(o["x"], o["y"], o["x"] + o["w"], o["y"] + o["h"])
                rad = o.get("radius") or 0.0
                if rad:
                    side = max(0.5, min(o["w"], o["h"]))
                    rad = max(0.01, min(0.5, rad / side))
                page.draw_rect(
                    r,
                    color=col(o["stroke"]) if o["stroke"] else None,
                    fill=col(o["fill"]) if o["fill"] else None,
                    width=o["sw"],
                    radius=rad or None,
                    dashes=self._dash(o.get("dash")),
                )
            elif kind == "line":
                page.draw_line(
                    fitz.Point(o["x1"], o["y1"]), fitz.Point(o["x2"], o["y2"]),
                    color=col(o["color"]), width=o["width"], dashes=self._dash(o.get("dash")),
                )
            elif kind == "poly":
                pts = [fitz.Point(x, y) for x, y in o["pts"]]
                page.draw_polyline(
                    pts, color=col(o["stroke"]) if o["stroke"] else None,
                    fill=col(o["fill"]) if o["fill"] else None,
                    width=o["sw"], dashes=self._dash(o.get("dash")), closePath=o.get("close", True),
                )
            elif kind == "circle":
                page.draw_circle(
                    fitz.Point(o["cx"], o["cy"]), o["r"],
                    color=col(o["stroke"]) if o["stroke"] else None,
                    fill=col(o["fill"]) if o["fill"] else None, width=o["sw"],
                )
            elif kind == "image":
                page.insert_image(
                    fitz.Rect(o["x"], o["y"], o["x"] + o["w"], o["y"] + o["h"]),
                    filename=o["path"], keep_proportion=False,
                )
            elif kind == "text":
                fname = self._font(page, o["face"])
                size = o["size"]
                lh = o["lh"]
                color = col(o["color"])
                for i, line in enumerate(o["lines"]):
                    if not line:
                        continue
                    ty = o["y"] + i * lh + size * 0.80
                    if o["align"] == "left":
                        tx = o["x"]
                        page.insert_text((tx, ty), line, fontname=fname, fontsize=size, color=color)
                    else:
                        tw = measure(line, o["face"], size)
                        if o["align"] == "center":
                            tx = o["x"] + (o["w"] - tw) / 2
                        else:  # right
                            tx = o["x"] + o["w"] - tw
                        page.insert_text((tx, ty), line, fontname=fname, fontsize=size, color=color)


def render(pages: list[list[dict]], out_pdf: pathlib.Path, png_dir: pathlib.Path | None = None,
           dpi: int = 150) -> list[pathlib.Path]:
    doc = fitz.open()
    back = PdfBackend(doc)
    pngs: list[pathlib.Path] = []
    for idx, ops in enumerate(pages, 1):
        page = doc.new_page(width=W, height=H)
        back.draw(page, ops)
    doc.set_metadata({"title": "Cable Tray Routing & Raceway Engineering",
                      "author": "Air Liquide · Industrial E&I Design",
                      "subject": "Field engineering training", "creator": "deck_engine"})
    out_pdf.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out_pdf), garbage=3, deflate=True)
    if png_dir:
        png_dir.mkdir(parents=True, exist_ok=True)
        d = fitz.open(str(out_pdf))
        zoom = dpi / 72
        for i, page in enumerate(d, 1):
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
            p = png_dir / f"s{i:02d}.png"
            pix.save(str(p))
            pngs.append(p)
        d.close()
    doc.close()
    return pngs


def contact_sheet(pngs: list[pathlib.Path], out: pathlib.Path, cols: int = 4) -> pathlib.Path:
    from PIL import ImageDraw
    thumbs = [Image.open(p) for p in pngs]
    tw, th = thumbs[0].size
    scale = 0.34
    tw, th = int(tw * scale), int(th * scale)
    rows = (len(thumbs) + cols - 1) // cols
    gap, pad = 10, 18
    sheet = Image.new("RGB", (cols * tw + (cols + 1) * gap, rows * th + (rows + 1) * gap), (232, 236, 242))
    for i, im in enumerate(thumbs):
        r, c = divmod(i, cols)
        sheet.paste(im.resize((tw, th), Image.LANCZOS),
                    (gap + c * (tw + gap), gap + r * (th + gap)))
    sheet.save(out, quality=90)
    return out
