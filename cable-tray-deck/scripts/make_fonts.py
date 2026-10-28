"""Rebuild the symbol-complete Inter / IBM Plex Mono faces used for rendering.

The Inter and Plex woff2 sources in assets/fonts are latin-subset builds: they have no
<=, >=, ->, Sigma, Omega, which this deck uses constantly. This script merges the missing
symbols in from DejaVuSans so the PDF and the previews never show a box glyph.

    pip install --user fonttools brotli
    python3 scripts/make_fonts.py
"""
from __future__ import annotations

import json
import pathlib
import re

from fontTools import subset
from fontTools.merge import Merger
from fontTools.ttLib import TTFont, scale_upem
from fontTools.ttLib.woff2 import decompress

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "assets" / "fonts"
DEJAVU = pathlib.Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")


def symbols_needed() -> str:
    text = (ROOT / "content" / "deck.json").read_text()
    return "".join(sorted({ch for ch in text if ord(ch) > 126}))


def woff2_to_ttf(src: pathlib.Path) -> pathlib.Path:
    dst = src.with_suffix(".ttf")
    if not dst.exists():
        decompress(str(src), str(dst))
    return dst


def merge(base: pathlib.Path, sym: pathlib.Path, family: str) -> None:
    upem = TTFont(str(base))["head"].unitsPerEm
    t = TTFont(str(sym))
    if t["head"].unitsPerEm != upem:
        scale_upem(t, upem)
        t.save("/tmp/_sym_scaled.ttf")
        sym = pathlib.Path("/tmp/_sym_scaled.ttf")
    m = Merger().merge([str(base), str(sym)])
    m["name"].setName(family, 1, 3, 1, 0x409)
    m["name"].setName("Regular", 2, 3, 1, 0x409)
    out = base.with_name(base.stem + "-full.ttf")
    m.save(str(out))
    missing = [c for c in symbols_needed() if ord(c) not in m.getBestCmap()]
    print(f"{out.name:44s} missing: {missing}")


def main() -> None:
    need = symbols_needed()
    code = "U+" + ",U+".join(f"{ord(c):04X}" for c in need)
    subset.main([str(DEJAVU), f"--unicodes={code}", "--output-file=/tmp/_symbols.ttf",
                 "--no-hinting", "--desubroutinize"])
    for wt in (400, 500, 600, 700, 800):
        src = FONTS / f"inter-latin-{wt}-normal.woff2"
        if src.exists():
            merge(woff2_to_ttf(src), pathlib.Path("/tmp/_symbols.ttf"), "Inter")
    for wt in (500, 600):
        src = FONTS / f"ibm-plex-mono-latin-{wt}-normal.woff2"
        if src.exists():
            merge(woff2_to_ttf(src), pathlib.Path("/tmp/_symbols.ttf"), "IBM Plex Mono")


if __name__ == "__main__":
    main()
