"""Build the PDF + PNG previews from content/deck.json, and run a layout linter."""
from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from deck_engine import layout, pdf_backend  # noqa: E402
from deck_engine.tokens import CONTENT_W, H, M, W  # noqa: E402


def main():
    deck = json.loads((ROOT / "content" / "deck.json").read_text())
    slides = deck["slides"]
    total = len(slides)
    pages = [layout.build(s, i + 1, total) for i, s in enumerate(slides)]

    out_pdf = ROOT / "build" / "Cable Tray Routing Design Training - FINAL.pdf"
    png_dir = ROOT / "build" / "render"
    pngs = pdf_backend.render(pages, out_pdf, png_dir, dpi=150)
    pdf_backend.contact_sheet(pngs, ROOT / "build" / "contact-sheet.png", cols=4)

    # ── linter ────────────────────────────────────────────────
    problems = []
    for idx, ops in enumerate(pages, 1):
        for o in ops:
            if o["op"] in ("rect", "image"):
                if o["x"] < -1 or o["y"] < -1 or o["x"] + o["w"] > W + 1 or o["y"] + o["h"] > H + 1:
                    # full-bleed panels are intentional
                    if not (o["x"] <= 0 and o["w"] >= W - 1):
                        problems.append((idx, "shape off-canvas", o["op"], round(o["x"], 1), round(o["y"], 1),
                                         round(o["w"], 1), round(o["h"], 1)))
            if o["op"] == "text":
                bottom = o["y"] + len(o["lines"]) * o["lh"]
                if o["y"] < 14:
                    problems.append((idx, "text above safe area", o["lines"][0][:40], round(o["y"], 1)))
                if bottom > H - 16:
                    problems.append((idx, "text below safe area", o["lines"][0][:40], round(bottom, 1)))
                if o["x"] + 2 > W - M + 22:
                    problems.append((idx, "text past right margin", o["lines"][0][:40]))
                for ln in o["lines"]:
                    from deck_engine.tokens import measure
                    tw = measure(ln, o["face"], o["size"])
                    if o["align"] == "left" and tw > o["w"] + 1.5:
                        problems.append((idx, "line overflow", ln[:52], round(tw, 1), round(o["w"], 1)))
                # very long single word (unbreakable)
                for ln in o["lines"]:
                    if measure(ln, o["face"], o["size"]) > o["w"] + 1.5:
                        break
    report = {"slides": total, "problems": problems}
    (ROOT / "build" / "layout-report.json").write_text(json.dumps(report, indent=1))
    print(f"rendered {total} pages -> {out_pdf.name}")
    if problems:
        print(f"LINT: {len(problems)} issues")
        for p in problems[:40]:
            print("  ", p)
    else:
        print("LINT: clean")


if __name__ == "__main__":
    main()
