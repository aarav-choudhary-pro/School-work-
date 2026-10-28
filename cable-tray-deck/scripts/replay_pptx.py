"""Replay the finished PPTX back into a PDF/PNG.

This is the self-review step for the export: it reads only what is stored in the PPTX
(shape type, position, size, fill, line, text runs) and redraws it, so ordering, geometry
and colour problems in the export are visible even without PowerPoint or LibreOffice.
"""
from __future__ import annotations

import pathlib
import sys

import pymupdf as fitz
from PIL import Image
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from deck_engine.tokens import FONT_FILES, W, H, rgb  # noqa: E402

EMU_PT = 12700.0
FACE = {"Segoe UI": "reg", "Segoe UI Semibold": "semi", "Segoe UI Black": "xbold",
        "Consolas": "mono"}
FNAMES = {"reg": "Int-Reg", "semi": "Int-Semi", "xbold": "Int-XBold", "mono": "Mono-Med"}


def color_of(obj, default=None):
    """Colour of a FillFormat / LineFormat / ColorFormat instance."""
    try:
        if hasattr(obj, "type") and not hasattr(obj, "fore_color") and not hasattr(obj, "color"):
            cf = obj                              # already a ColorFormat
        elif hasattr(obj, "fore_color"):          # FillFormat
            if obj.type is None:
                return default
            cf = obj.fore_color
        else:                                     # LineFormat
            cf = obj.color
        if cf.type is None:
            return default
        return rgb("#" + str(cf.rgb))
    except Exception:
        return default


def draw_shape(page, sh, fonts_used):
    l, t = sh.left / EMU_PT, sh.top / EMU_PT
    w, h = (sh.width or 0) / EMU_PT, (sh.height or 0) / EMU_PT
    rect = fitz.Rect(l, t, l + w, t + h)

    if sh.shape_type == MSO_SHAPE_TYPE.PICTURE:
        tmp = pathlib.Path("/tmp/_replay_img.png")
        tmp.write_bytes(sh.image.blob)
        page.insert_image(rect, filename=str(tmp), keep_proportion=False)
        return

    if sh.shape_type == MSO_SHAPE_TYPE.LINE or sh.shape_type == 6:  # connector
        x1, y1 = sh.begin_x / EMU_PT, sh.begin_y / EMU_PT
        x2, y2 = sh.end_x / EMU_PT, sh.end_y / EMU_PT
        col = color_of(sh.line, (0.4, 0.4, 0.4))
        wpx = (sh.line.width / EMU_PT) if sh.line.width else 0.8
        page.draw_line(fitz.Point(x1, y1), fitz.Point(x2, y2), color=col, width=wpx)
        return

    # autoshape / freeform
    st = sh.shape_type
    is_oval = str(st) == "AUTO_SHAPE (1)" and "OVAL" in str(getattr(sh, "auto_shape_type", ""))
    fill = color_of(sh.fill)
    line = color_of(sh.line)
    lw = (sh.line.width / EMU_PT) if sh.line.width else 0.8
    if is_oval:
        page.draw_circle(fitz.Point(l + w / 2, t + h / 2), max(w, h) / 2,
                         color=line, fill=fill, width=max(lw, 0.4))
    elif fill or line:
        page.draw_rect(rect, color=line, fill=fill, width=max(lw, 0.4))

    if sh.has_text_frame and sh.text_frame.text.strip():
        y = t
        for p in sh.text_frame.paragraphs:
            if not p.runs:
                continue
            r0 = p.runs[0]
            size = r0.font.size.pt if r0.font.size else 12
            lh = p.line_spacing.pt if hasattr(p.line_spacing, "pt") else size * 1.34
            face = FACE.get(r0.font.name, "reg")
            key = FNAMES[face]
            if key not in fonts_used:
                page.insert_font(fontname=key, fontfile=str(FONT_FILES[face]))
                fonts_used.add(key)
            text = "".join(r.text for r in p.runs)
            col = color_of(r0.font.color, (0, 0, 0))
            baseline = y + lh - 0.212 * size
            tw = fitz.get_text_length(text, fontname=key, fontsize=size) \
                if key in ("helv",) else None
            from deck_engine.tokens import measure
            tw = measure(text, face, size)
            align = str(p.alignment)
            x = l
            if "CENTER" in align:
                x = l + (w - tw) / 2
            elif "RIGHT" in align:
                x = l + w - tw
            page.insert_text((x, baseline), text, fontname=key, fontsize=size, color=col)
            y += lh


def main():
    src = ROOT / "pptx" / "Cable Tray Routing Design Training - FINAL.pptx"
    prs = Presentation(str(src))
    doc = fitz.open()
    for i, slide in enumerate(prs.slides, 1):
        page = doc.new_page(width=W, height=H)
        used: set[str] = set()
        for sh in slide.shapes:
            draw_shape(page, sh, used)
    out = ROOT / "build" / "pptx-replay.pdf"
    doc.set_metadata({"title": "PPTX replay — geometry audit"})
    doc.save(str(out))
    doc.close()

    d = fitz.open(str(out))
    png = ROOT / "build" / "pptx-replay"
    png.mkdir(parents=True, exist_ok=True)
    for i, page in enumerate(d, 1):
        page.get_pixmap(matrix=fitz.Matrix(150 / 72, 150 / 72), alpha=False).save(
            str(png / f"s{i:02d}.png"))
    d.close()

    # side-by-side of PDF render vs PPTX replay, for eyeballing deformation
    cmp_dir = ROOT / "build" / "compare"
    cmp_dir.mkdir(parents=True, exist_ok=True)
    for i in range(1, len(prs.slides) + 1):
        a = Image.open(ROOT / "build" / "render" / f"s{i:02d}.png")
        b = Image.open(png / f"s{i:02d}.png")
        sheet = Image.new("RGB", (a.width, a.height * 2 + 8), (255, 0, 0))
        sheet.paste(a, (0, 0))
        sheet.paste(b.resize(a.size), (0, a.height + 8))
        sheet.save(cmp_dir / f"s{i:02d}.png")
    print(f"replayed {len(prs.slides)} slides -> {out.name}")


if __name__ == "__main__":
    main()
