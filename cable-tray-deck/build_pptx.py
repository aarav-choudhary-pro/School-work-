"""Build the native, fully editable PPTX from content/deck.json."""
from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from deck_engine import layout, pptx_backend as pb  # noqa: E402
from deck_engine.tokens import W, H  # noqa: E402


def main():
    deck = json.loads((ROOT / "content" / "deck.json").read_text())
    slides = deck["slides"]
    total = len(slides)

    prs = pb.new_presentation()
    try:
        pb.set_theme_fonts(prs)
    except Exception as exc:      # theme fonts are a nicety, never fatal
        print("theme font note:", exc)

    back = pb.PptxBackend(prs)
    for i, spec in enumerate(slides, 1):
        slide = prs.slides.add_slide(pb.blank_layout(prs))
        ops = layout.build(spec, i, total)
        back.draw(slide, ops)
        pb.add_notes(slide, spec.get("notes", ""))
        pb.add_transition(slide, deck.get("transition", "fade"))

    cp = prs.core_properties
    cp.title = "Cable Tray Routing & Raceway Engineering"
    cp.subject = "Industrial E&I Design — field engineering training"
    cp.author = "Hans Raj · Air Liquide Industrial E&I Design"
    cp.last_modified_by = "Air Liquide Industrial E&I Design"
    cp.keywords = "cable tray, NEC 392, NEMA VE-1, NEMA VE-2, segregation, earthing"
    cp.comments = ("Design basis NEC 392, NEMA VE-1/VE-2, IEEE 525, IEC 61537. "
                   "All text is native and editable; speaker notes on every slide.")
    cp.category = "Training"

    out = ROOT / "pptx" / "Cable Tray Routing Design Training - FINAL.pptx"
    out.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(out))
    print(f"wrote {out.name} — {total} slides, {out.stat().st_size / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
