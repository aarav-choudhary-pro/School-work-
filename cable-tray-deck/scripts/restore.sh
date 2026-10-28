#!/usr/bin/env bash
# Restore the cable-tray deck toolchain in a fresh sandbox and rebuild every deliverable.
# Usage:  bash scripts/restore.sh          (rebuild)
#         bash scripts/restore.sh --check  (rebuild + audits only)
set -euo pipefail

cd "$(dirname "$0")/.."
echo "── repo: $(pwd)  branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo n/a)"

# 1. python deps (user install; the sandbox has no venv and no sudo)
python3 - <<'PY'
import importlib, subprocess, sys
need = {"pptx": "python-pptx", "lxml": "lxml", "fitz": "pymupdf", "PIL": "Pillow",
        "fontTools": "fonttools"}
missing = [pkg for mod, pkg in need.items() if importlib.util.find_spec(mod) is None]
if missing:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--user",
                           "--break-system-packages", *missing])
    print("installed:", " ".join(missing))
else:
    print("python deps: ok")
PY

# 2. fonts: the repo ships the ttf files directly (Inter + IBM Plex Mono woff2 are the
#    upstream sources; *-full.ttf are the merged symbol-complete builds used for rendering).
if ! ls assets/fonts/*-full.ttf >/dev/null 2>&1; then
  echo "!! assets/fonts/*-full.ttf missing — regenerate with:"
  echo "   pip install --user fonttools brotli && python3 scripts/make_fonts.py"
fi

# 3. assets
for f in assets/img/al_logo.png assets/img/al_mark.png; do
  [ -f "$f" ] || echo "!! missing asset $f"
done

# 4. build pipeline
python3 content/content.py            # content.py -> content/deck.json (single source of truth)
python3 build_pdf.py                  # vector PDF + 150 dpi PNG previews + contact sheet + lint
python3 build_pptx.py                 # native editable PPTX
python3 scripts/check_pptx.py         # read-back audit: geometry, notes, transitions, content
python3 scripts/replay_pptx.py        # re-draw the PPTX from its own XML for visual diff

echo
echo "deliverables:"
ls -lh "pptx/Cable Tray Routing Design Training - FINAL.pptx" \
       "build/Cable Tray Routing Design Training - FINAL.pdf" \
       "build/contact-sheet.png" 2>/dev/null | sed 's/^/  /'
