"""Read the built PPTX back and audit it: geometry, text, notes, transitions, content.

Exit code 1 if anything fails, so it can gate the build.
"""
from __future__ import annotations

import json
import pathlib
import sys

from pptx import Presentation
from pptx.util import Emu

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from deck_engine.tokens import measure, wrap  # noqa: E402

EMU_PT = 12700
W, H = 960.0, 540.0


def all_text(slide) -> str:
    out = []
    for sh in slide.shapes:
        if sh.has_text_frame:
            out.append(sh.text_frame.text)
    return "\n".join(out)


def main() -> int:
    deck = json.loads((ROOT / "content" / "deck.json").read_text())
    prs = Presentation(str(ROOT / "pptx" / "Cable Tray Routing Design Training - FINAL.pptx"))
    fails, warns = [], []

    if len(prs.slides) != len(deck["slides"]):
        fails.append(f"slide count {len(prs.slides)} != {len(deck['slides'])}")

    fonts, colors = set(), set()
    total_shapes = 0
    empty_text = 0

    for i, (slide, spec) in enumerate(zip(prs.slides, deck["slides"]), 1):
        shp_count = len(slide.shapes)
        total_shapes += shp_count
        if shp_count < 12:
            fails.append(f"s{i}: only {shp_count} shapes")

        # notes
        notes = slide.notes_slide.notes_text_frame.text if slide.has_notes_slide else ""
        if len(notes) < 60:
            fails.append(f"s{i}: speaker notes missing/too short ({len(notes)} chars)")

        # transition
        xml = slide._element.xml
        if "p:transition" not in xml or "p:fade" not in xml:
            fails.append(f"s{i}: no fade transition")

        # geometry + fonts
        for sh in slide.shapes:
            l, t = sh.left / EMU_PT, sh.top / EMU_PT
            w, h = (sh.width or 0) / EMU_PT, (sh.height or 0) / EMU_PT
            if l < -2 or t < -2 or l + w > W + 2 or t + h > H + 2:
                if not (l <= 0.5 and w >= W - 1):
                    fails.append(f"s{i}: shape off-canvas at ({l:.0f},{t:.0f}) {w:.0f}x{h:.0f}")
            if sh.has_text_frame and sh.shape_type == 17:   # TEXT_BOX
                txt = sh.text_frame.text
                if not txt.strip():
                    empty_text += 1
                    continue
                for p in sh.text_frame.paragraphs:
                    for r in p.runs:
                        if r.font.name:
                            fonts.add(r.font.name)
                        try:
                            colors.add(str(r.font.color.rgb))
                        except Exception:
                            pass
                    # overflow: re-wrap each paragraph with the wider Inter face
                    if p.runs:
                        face = "mono" if p.runs[0].font.name == "Consolas" else (
                            "bold" if p.runs[0].font.bold else "reg")
                        size = p.runs[0].font.size.pt
                        face = {("Consolas", False): "mono", ("Consolas", True): "mono_b",
                                ("Segoe UI", False): "reg", ("Segoe UI", True): "bold",
                                ("Segoe UI Semibold", True): "semi",
                                ("Segoe UI Black", True): "xbold"}.get(
                                    (p.runs[0].font.name, bool(p.runs[0].font.bold)), "reg")
                        need = measure(p.text, face, size)
                        if need > w + 2.0:
                            warns.append(f"s{i}: text wider than box ({need:.0f}>{w:.0f}pt) "
                                         f"{p.text[:38]!r}")

        # content preservation: every content string must appear
        haystack = all_text(slide).replace("\u00a0", " ")
        for s in strings_of(spec):
            probe = s.replace("\n", " ")
            if len(probe) < 12:
                continue
            # compare on a collapsed-whitespace basis, first 28 chars
            frag = " ".join(probe.split())[:28].lower()
            if frag not in " ".join(haystack.split()).lower():
                fails.append(f"s{i}: content string missing: {frag!r}")

    if empty_text:
        warns.append(f"{empty_text} empty text frames")
    bad_fonts = fonts - {"Segoe UI", "Segoe UI Semibold", "Segoe UI Black", "Consolas"}
    if bad_fonts:
        fails.append(f"unexpected fonts: {sorted(bad_fonts)}")

    print(f"slides            : {len(prs.slides)}")
    print(f"shapes total      : {total_shapes}  (avg {total_shapes / len(prs.slides):.0f}/slide)")
    print(f"fonts             : {sorted(fonts)}")
    print(f"distinct colours  : {len(colors)}")
    print(f"fails             : {len(fails)}")
    for f in fails[:30]:
        print("   FAIL", f)
    print(f"warnings          : {len(warns)}")
    for w_ in warns[:20]:
        print("   warn", w_)
    return 1 if fails else 0


def strings_of(obj, depth=0):
    if depth > 6:
        return
    if isinstance(obj, str):
        yield obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if k == "notes":
                continue
            yield from strings_of(v, depth + 1)
    elif isinstance(obj, list):
        for v in obj:
            yield from strings_of(v, depth + 1)


if __name__ == "__main__":
    raise SystemExit(main())
