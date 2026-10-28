"""Primitives + a small canvas that both backends understand.

A slide is a list of dicts:
  {"op":"rect", "x","y","w","h","fill","stroke","sw","radius","dash"}
  {"op":"line", "x1","y1","x2","y2","color","width","dash","cap"}
  {"op":"text", "x","y","w","lines":[...], "size","face","color","lh","align","caps"}
  {"op":"image", "x","y","w","h","path","opacity"}
  {"op":"circle", ...}
  {"op":"poly", "pts":[(x,y)...], "fill","stroke","sw","dash"}
"""
from __future__ import annotations

import pathlib
from typing import Any

from PIL import Image

from .tokens import COLORS, W, H, col, line_height, measure, rgb, wrap


class Canvas:
    def __init__(self) -> None:
        self.ops: list[dict[str, Any]] = []

    # ── shapes ───────────────────────────────────────────
    def rect(self, x, y, w, h, fill=None, stroke=None, sw=1.0, radius=0.0, dash=None):
        self.ops.append({"op": "rect", "x": x, "y": y, "w": w, "h": h, "fill": fill,
                         "stroke": stroke, "sw": sw, "radius": radius, "dash": dash})

    def line(self, x1, y1, x2, y2, color="line", width=1.0, dash=None, cap=0):
        self.ops.append({"op": "line", "x1": x1, "y1": y1, "x2": x2, "y2": y2,
                         "color": color, "width": width, "dash": dash, "cap": cap})

    def poly(self, pts, fill=None, stroke=None, sw=1.0, close=True, dash=None):
        self.ops.append({"op": "poly", "pts": list(pts), "fill": fill, "stroke": stroke,
                         "sw": sw, "close": close, "dash": dash})

    def circle(self, cx, cy, r, fill=None, stroke=None, sw=1.0):
        self.ops.append({"op": "circle", "cx": cx, "cy": cy, "r": r, "fill": fill,
                         "stroke": stroke, "sw": sw})

    def image(self, path, x, y, w, h, opacity=1.0):
        self.ops.append({"op": "image", "path": str(path), "x": x, "y": y, "w": w, "h": h,
                         "opacity": opacity})

    # ── text ─────────────────────────────────────────────
    def text(self, x, y, w, s, size=12.0, face="reg", color="ink", lh=None,
             align="left", caps=False, max_lines=None, mt=0.0) -> float:
        """Draw wrapped text. Returns total height used."""
        y += mt
        if s is None or s == "":
            return 0.0
        body = s.upper() if caps else s
        lines = wrap(body, face, size, w)
        if max_lines and len(lines) > max_lines:
            lines = lines[:max_lines]
        lh = lh or line_height(size)
        self.ops.append({"op": "text", "x": x, "y": y, "w": w, "lines": lines, "size": size,
                         "face": face, "color": color, "lh": lh, "align": align, "caps": caps})
        return len(lines) * lh

    def fit_text(self, x, y, w, s, sizes, face="reg", color="ink", lh=None, align="left",
                 caps=False) -> tuple[float, float]:
        """Try decreasing sizes until the text fits in `max` lines implied by the first size."""
        size = sizes[0]
        for cand in sizes:
            lines = wrap(s.upper() if caps else s, face, cand, w)
            if len(lines) <= max(1, int((sizes[0] * 1.34 * (sizes[0] and 3)) / (cand * 1.34))):
                size = cand
                break
        return size, self.text(x, y, w, s, size, face, color, lh, align, caps)

    # ── helpers used by layouts ──────────────────────────
    def pill(self, x, y, label, size=8.0, face="semi", fg="blue", bg="blue_tint",
             pad_x=7.0, h=16.0, caps=True, border=None):
        tw = measure(label.upper() if caps else label, face, size)
        w = tw + pad_x * 2
        self.rect(x, y, w, h, fill=bg, stroke=border, sw=0.8, radius=h / 2)
        self.text(x + pad_x, y + (h - size * 1.18) / 2, tw + 2,
                  label.upper() if caps else label, size, face, fg, caps=False)
        return w

    def rule(self, x, y, w, color="line", width=1.0, dash=None):
        self.line(x, y, x + w, y, color, width, dash)


def group(canvas: Canvas, ops: list[dict]) -> Canvas:
    canvas.ops.extend(ops)
    return canvas


def alpha_logo(path: pathlib.Path, out: pathlib.Path, opacity: float) -> pathlib.Path:
    """Bake an opacity into a PNG so both backends render the watermark identically."""
    if out.exists():
        return out
    im = Image.open(path).convert("RGBA")
    a = im.split()[-1].point(lambda v: int(v * opacity))
    im.putalpha(a)
    im.save(out)
    return out
