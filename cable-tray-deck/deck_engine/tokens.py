"""Design tokens + font metrics for the cable tray deck.

Canvas is 960 x 540 pt = 13.333 x 7.5 in (16:9).
"""
from __future__ import annotations

import pathlib

from PIL import ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "assets" / "fonts"
IMG = ROOT / "assets" / "img"

W, H = 960.0, 540.0
M = 54.0                     # left/right margin
CONTENT_W = W - 2 * M        # 852

# ── palette ────────────────────────────────────────────────
NAVY = "#0A1D34"
NAVY_SOFT = "#12294A"
BLUE = "#375F9B"             # Air Liquide blue
BLUE_MID = "#5C80B4"
BLUE_TINT = "#EEF3FA"
BLUE_LINE = "#C7D6E9"
RED = "#C0172B"              # brand red, darkened for text contrast
RED_TINT = "#FBEDEF"
AMBER = "#8A5A00"
AMBER_TINT = "#FDF4E5"
AMBER_LINE = "#EBD5A8"
GREEN = "#1F7A55"
INK = "#0F1B2D"
INK2 = "#33465E"
MUTED = "#64768C"
DIM = "#93A2B4"
LINE = "#DCE3ED"
TINT = "#F5F8FC"
WHITE = "#FFFFFF"

COLORS = {
    "navy": NAVY, "navy_soft": NAVY_SOFT, "blue": BLUE, "blue_mid": BLUE_MID,
    "blue_tint": BLUE_TINT, "blue_line": BLUE_LINE, "red": RED, "red_tint": RED_TINT,
    "amber": AMBER, "amber_tint": AMBER_TINT, "amber_line": AMBER_LINE, "green": GREEN,
    "ink": INK, "ink2": INK2, "muted": MUTED, "dim": DIM, "line": LINE, "tint": TINT,
    "white": WHITE,
}


def rgb(hexstr: str) -> tuple[float, float, float]:
    h = hexstr.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def col(name_or_hex: str) -> tuple[float, float, float]:
    return rgb(COLORS.get(name_or_hex, name_or_hex))


# ── fonts ──────────────────────────────────────────────────
FONT_FILES = {
    "reg": FONTS / "inter-latin-400-normal-full.ttf",
    "med": FONTS / "inter-latin-500-normal-full.ttf",
    "semi": FONTS / "inter-latin-600-normal-full.ttf",
    "bold": FONTS / "inter-latin-700-normal-full.ttf",
    "xbold": FONTS / "inter-latin-800-normal-full.ttf",
    "mono": FONTS / "ibm-plex-mono-latin-500-normal-full.ttf",
    "mono_b": FONTS / "ibm-plex-mono-latin-600-normal-full.ttf",
}

# PowerPoint face used in the PPTX output (installed on Windows)
PPT_FACE = {"reg": "Segoe UI", "med": "Segoe UI Semibold", "semi": "Segoe UI Semibold",
            "bold": "Segoe UI", "xbold": "Segoe UI Black", "mono": "Consolas", "mono_b": "Consolas"}
PPT_BOLD = {"reg": False, "med": False, "semi": True, "bold": True, "xbold": True,
            "mono": False, "mono_b": True}

_cache: dict[tuple[str, int], ImageFont.FreeTypeFont] = {}


def _pil(face: str, size: float) -> ImageFont.FreeTypeFont:
    key = (face, int(round(size * 8)))
    if key not in _cache:
        _cache[key] = ImageFont.truetype(str(FONT_FILES[face]), int(round(size * 8)))
    return _cache[key]


def measure(text: str, face: str, size: float) -> float:
    return _pil(face, size).getlength(text) / 8.0


def wrap(text: str, face: str, size: float, width: float) -> list[str]:
    """Greedy wrap using real Inter metrics. Keeps explicit \n."""
    out: list[str] = []
    for para in text.split("\n"):
        if para.strip() == "":
            out.append("")
            continue
        words = para.split(" ")
        line = ""
        for wd in words:
            trial = (line + " " + wd).strip() if line else wd
            if measure(trial, face, size) <= width or not line:
                line = trial
            else:
                out.append(line)
                line = wd
        out.append(line)
    return out


def line_height(size: float, factor: float = 1.34) -> float:
    return size * factor
