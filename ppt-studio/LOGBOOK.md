# PPT REDESIGN LOGBOOK — Cable Tray Routing & Raceway Engineering
_Harness file. A future model resuming this task MUST read this first. Update EVERY turn._

## Mission
Redesign dad's (Hans Raj, Air Liquide, hansraj.al@airliquide.com) Gemini-made training PPT to designer grade.
Training is TOMORROW (Oct 29, 2026). Content stays same in substance; fix technical errors; text stays EDITABLE
(real pptx shapes, no image-text); add transitions; deliver final .pptx to Google Drive.

## Environment facts (hard-won — do not re-learn)
- Sandbox wipes pip+git state between turns; regular files persist. Run `./install.sh` (pip needs --break-system-packages).
- NO LibreOffice/Chromium possible (apt blocked; egress = github/npm/pypi only). fc-list = 0 fonts → never render text with PIL.
- Render pipeline: build PPTX → google_drive upload_file(file_path=..., target_mime_type=application/vnd.google-apps.presentation)
  → export_file(file_id, application/pdf) → pypdfium2 → PNG contact sheets → view via read_file → fix → loop.
- Gmail/Drive connectors stage binary outputs directly into workspace files (no base64 flood).

## Key IDs
- Source email: gmail msg 1a18348b35855157, attachment "Cable Tray Routing Design Training (1).pptx" (847,401 B).
- Drive folder "Arena Workspace Backup": id 1MBuYnY63rG3G0ZvAT9BHCrQHTs8eSB02 (deliverables sub-folder to be created inside it).
- Repo: /home/user/School-work-, branch arena/3075d3fc-school-work. Studio dir: ppt-studio/.

## Source deck analysis (done)
- 16 slides, 13.33×7.5in (16:9), all Google-Shapes from Gemini. Full text inventory extracted (see git history / rerun inspect).
- CRITICAL: nearly all pictures are gray "600×400" PLACEHOLDER images. Only real image: ppt/media/image25.png
  (BIM clash wireframe, credited to united-bim.com on slide 16 — keep credit).
- Bugs found in source: slide 9 has raw LaTeX artifact "$R_{\text{fitting}} \ge \text{MBR}_{\text{max}}$" → fix to plain text.
  Other engineering facts verified plausible (NEMA 12C/20C, NEC 392 40/50%, trefoil 2×OD, splice 0.25L, OSHA 2.1 m).
- Slide list: 1 Title / 2 Scope / 3 Tray types / 4 NEC fill 40-50-20 / 5 1-core vs multi-core / 6 Segregation TABLE 5x4 /
  7 NEMA supports / 8 Clearances / 9 MBR classes / 10 Covers / 11 Trench / 12 BIM / 13 Earthing / 14 QA checklist /
  15 Thanks / 16 Image credits.

## Design system (decided)
Palette: navy #0F2B46 ink, blue #1F6FB2, cyan #36A9E0, amber #F5A623 accent, bg #F5F8FB, border #D9E2EC, muted #5B7083.
Font: Calibri everywhere (Google Slides maps to metric-twin Carlito → review renders match PowerPoint).
Recurring elements: left navy rail, amber kicker (letter-spaced), bold navy title + thin rule, white cards w/ 1pt border +
number circles, amber "FIELD NOTE" bar at bottom, slide number. Vector diagrams replace placeholder images.
Transitions: p:transition fade injected into every slide XML (python-pptx has no API; insert element at index 2 after clrMapOvr).
Speaker notes added per slide (bonus).

## Status / next steps
- [x] Source extracted + analyzed; images extracted to source/original_x/ppt/media; real image copied for reuse
- [ ] build/build_deck.py written & run → build/CableTray_Redesign.pptx
- [ ] Drive subfolder created, render loop round 1
- [ ] Iterate until polished; upload FINAL pptx + logbook to Drive; email? (not requested — Drive only)

## Turn update — 2026-10-28 (deck DELIVERED)
- build/build_deck.py = full generator (run `python3 build_deck.py` in build/ after ./install.sh). 16 slides, all editable, fade transitions, speaker notes on every slide.
- Review loop ran 2 rounds via Drive→Slides→PDF→pypdfium2. v2 fixes: title decor tidy, slide-2/13 card heights, slide-6 tier dots via 0.5" col-0 cell margin.
- DELIVERED to Drive folder "Cable Tray Training PPT (Arena Redesign)" (id 1u4yDGWUkZSDHDT2VptdaXmrgboc3Zytv, inside Arena Workspace Backup):
  * FINAL pptx id 1NiGWwKLXrj_Z06AvkQe00Ff0c-oFfft1
  * Slides preview id 1S39c60BOAqL648LCm7xKWzD2fUvA6-XG7JbTNMkrbIg
  * Original backup id 1ZX75zngkf_axweiaBo2DtzwbM4n4zVGa
- Render-check scratch files trashed. Corrections applied to content: slide-9 LaTeX artifact → plain text rule; IEEE 525 → "IEEE Std 525"; unit/typography polish only — substance unchanged.
- Remaining optional: upload LOGBOOK.md copy to Drive folder each turn if user continues iterating.
