"""Layout engine: one slide spec -> a Canvas of primitives.

All geometry is measured: text is wrapped with real Inter metrics and every box height
is derived from its content, then the whole block is optically centred in the body area.
The PDF and the PPTX render the same numbers, so what you review is what exports.
"""
from __future__ import annotations

from .prims import Canvas, alpha_logo
from .tokens import (
    AMBER, AMBER_LINE, AMBER_TINT, BLUE, BLUE_LINE, BLUE_TINT, CONTENT_W, DIM, GREEN, H, IMG,
    INK, INK2, LINE, M, MUTED, NAVY, NAVY_SOFT, RED, RED_TINT, TINT, W, WHITE,
    measure, wrap,
)

LOGO = IMG / "al_logo.png"
LOGOW = IMG / "al_logo_white.png"
MARK = IMG / "al_mark.png"
MARKW = IMG / "al_mark_white.png"
WM = IMG / "al_watermark.png"

KICK_Y = 40.0
BODY_BOT = 474.0

# text-on-navy
N_TXT = "#D5E1EE"
N_MUT = "#9AB2CC"
N_ACC = "#6FA8DC"


# ── measuring helpers ────────────────────────────────────────
def th(s: str, face: str, size: float, w: float, lh: float | None = None) -> float:
    return len(wrap(s, face, size, w)) * (lh or size * 1.34)


def tl(s: str, face: str, size: float, w: float) -> int:
    return len(wrap(s, face, size, w))


def vfit(top: float, bottom: float, need: float, max_pad: float = 30.0) -> float:
    """Optically centre a block of height `need` between top and bottom."""
    return top + min(max((bottom - top - need) / 2, 0.0), max_pad)


def fit_h(top: float, bottom: float, need: float, cap: float = 1.55) -> float:
    """Let a block grow (bounded) to occupy the body area instead of leaving dead space."""
    if need <= 0:
        return need
    return min(need * cap, max(need, bottom - top))


# ══════════════════════════════════════════════════════════════════
# shared chrome
# ══════════════════════════════════════════════════════════════════

def grid(c: Canvas, x0: float = 0.0, step: float = 14.0, color: str = "#122E4B",
         width: float = 0.5):
    """Blueprint grid, clipped to the canvas."""
    x = x0
    while x <= W + 0.01:
        c.line(x, 0, x, H, color, width)
        x += step
    y = 0.0
    while y <= H + 0.01:
        c.line(x0, y, W, y, color, width)
        y += step

def watermark(c: Canvas, opacity=0.03, size=200.0, x=None, y=None, name=None):
    """Large Air Liquide mark as paper texture; bleeds off the bottom-right corner."""
    alpha_logo(MARK, WM.with_name(name) if name else WM, opacity)
    path = WM.with_name(name) if name else WM
    x = W - size - 26 if x is None else x
    y = H - size - 34 if y is None else y
    c.image(path, x, y, size, size)


def logo_top_right(c: Canvas, w=100.0, y=26.0, opacity=1.0, dark=False):
    h = w * 116 / 600
    c.image(LOGOW if dark else LOGO, W - M - w, y, w, h, opacity)


def header(c: Canvas, kicker: str, title: str, title_size=27.0, kicker_color=BLUE,
           title_w=None, y=KICK_Y):
    logo_top_right(c)
    c.rect(M, y + 2, 16, 3, fill=kicker_color, radius=1.5)
    c.text(M + 24, y - 5, 560, kicker, 8.4, "bold", kicker_color, caps=True)
    tw = title_w or (CONTENT_W - 118)
    used = c.text(M, y + 20, tw, title, title_size, "xbold", INK, lh=title_size * 1.15)
    return y + 20 + used


def footer(c: Canvas, num: int, total: int, dark=False, label=None):
    col_ = "#7C8FA8" if not dark else "#6E86A6"
    c.line(M, 498, W - M, 498, "#DCE3ED" if not dark else "#22405F", 0.7)
    c.text(M, 504, 520, label or "Cable Tray Routing & Raceway Engineering  ·  Industrial E&I Design",
           7.4, "med", col_)
    c.text(W - M - 120, 504, 120, f"{num:02d} / {total:02d}", 7.4, "mono", col_, align="right")


def card(c: Canvas, x, y, w, h, fill=TINT, stroke=LINE, radius=8.0, accent=None, accent_w=3.0):
    c.rect(x, y, w, h, fill=fill, stroke=stroke, sw=0.8, radius=radius)
    if accent:
        c.rect(x, y, accent_w, h, fill=accent, radius=accent_w / 2)


def badge_num(c: Canvas, x, y, n: str, color=BLUE, size=15.0):
    c.circle(x + size / 2, y + size / 2, size / 2, fill=color)
    c.text(x, y + size / 2 - 4.5, size, n, 7.6, "bold", WHITE, align="center")


def bullet_lines(c: Canvas, x, y, w, items, size=10.0, color=INK2, gap=7.0, dot=BLUE, lh=1.36):
    cy = y
    for it in items:
        c.circle(x + 2.6, cy + size * 0.55, 1.9, fill=dot)
        used = c.text(x + 12, cy, w - 12, it, size, "reg", color, lh=size * lh)
        cy += used + gap
    return cy - y


def bullet_need(w, items, size=10.0, gap=7.0, lh=1.36):
    return sum(th(it, "reg", size, w - 12, size * lh) for it in items) + gap * (len(items) - 1)


def note_bar(c: Canvas, x, y, w, s, fill=AMBER_TINT, stroke=AMBER_LINE, acc="#C98A12",
             color="#6B4700", size=9.2):
    h = th(s, "semi", size, w - 34, size * 1.34) + 24
    c.rect(x, y, w, h, fill=fill, stroke=stroke, sw=0.8, radius=6)
    c.rect(x, y, 3.4, h, fill=acc, radius=1.7)
    c.text(x + 16, y + 12, w - 32, s, size, "semi", color, lh=size * 1.34)
    return h


def note_need(w, s, size=9.2):
    return th(s, "semi", size, w - 34, size * 1.34) + 24


# ══════════════════════════════════════════════════════════════════
# drawings
# ══════════════════════════════════════════════════════════════════
CABLE_COLORS = ["#C0172B", "#D9546A", "#D9A23B", "#3F9C74", "#5C80B4", "#8FB6DA", "#7E6BB5"]


def tray_section(c: Canvas, x, y, w, d, *, stroke="#4E86BC", fill="#1B3D63", radius=9,
                 n_cables=6, cover=True, dims=False, label_color="#7FA8D0", bg=None,
                 thickness=6.0):
    """Front section of a trough: two side rails, a base, one layer of cables, optional cover."""
    if bg:
        c.rect(x - 14, y - 46, w + 28, d + 92, fill=bg, radius=0)
    # base and rails
    c.rect(x, y + d, w, thickness, fill=fill, stroke=stroke, sw=1.1)
    c.rect(x, y, thickness, d, fill=fill, stroke=stroke, sw=1.1)
    c.rect(x + w - thickness, y, thickness, d, fill=fill, stroke=stroke, sw=1.1)
    # cables resting on the base
    cx = x + thickness + 8
    radii = [radius] * n_cables
    total = sum(2 * r for r in radii) + 6 * (n_cables - 1)
    avail = w - 2 * thickness - 16
    k = min(1.0, avail / total) if total else 1
    for i, r in enumerate(radii):
        rr = r * k
        c.circle(cx + rr, y + d - rr, rr, fill=CABLE_COLORS[i % len(CABLE_COLORS)], stroke=None)
        cx += 2 * rr + 6 * k
    # cover
    if cover:
        c.line(x - 2, y - 16, x + w + 2, y - 16, stroke, 2.2)
        c.line(x + 4, y - 16, x + 4, y - 6, stroke, 1.2)
        c.line(x + w - 4, y - 16, x + w - 4, y - 6, stroke, 1.2)
    if dims:
        yy = y + d + thickness + 22
        c.line(x, yy, x + w, yy, label_color, 0.8)
        for xx in (x, x + w):
            c.line(xx, yy - 6, xx, yy + 6, label_color, 0.8)
        c.text(x, yy + 5, w, "W", 6.6, "mono", label_color, align="center")
        c.line(x - 22, y, x - 22, y + d, label_color, 0.8)
        for yv in (y, y + d):
            c.line(x - 28, yv, x - 16, yv, label_color, 0.8)
        c.text(x - 58, y + d / 2 - 4, 32, "D", 6.6, "mono", label_color, align="right")



def elev_tray(c: Canvas, x, y, w, h, *, rail="#5E93C6", fill="#173A5D", label="#7FA8D0",
              rungs=13, spans=(0.0, 0.5, 1.0), cables=("red", "amber", "green", "blue"),
              dim_text="L", span_text="S"):
    """Side elevation of a ladder run: rails, rungs, seated cables, supports, dimensions."""
    CMAP = {"red": "#D0172E", "amber": "#E0A23C", "green": "#3FA37A", "blue": "#6E97C6"}
    depth = h * 0.26
    y_top, y_bot = y, y + depth
    # shadow of the run
    c.rect(x + 4, y_bot + 7, w - 8, 5, fill="#0E1F36", radius=2)
    # rungs behind
    for i in range(rungs):
        rx = x + 3 + i * (w - 6) / (rungs - 1)
        c.line(rx, y_top + 9, rx, y_bot, "#2F6394", 1.5)
    # rails
    c.rect(x, y_top, w, 4.5, fill=rail, radius=2)
    c.rect(x, y_bot, w, 4.5, fill="#2F6394", radius=2)
    c.rect(x, y_top, 4.0, depth + 4.5, fill=rail, radius=1)
    c.rect(x + w - 4.0, y_top, 4.0, depth + 4.5, fill=rail, radius=1)
    # cables
    n = len(cables)
    for i, name in enumerate(cables):
        cy = y_top + 8 + i * (depth - 12) / max(1, n - 1)
        c.line(x + 6, cy, x + w - 6, cy, CMAP[name], 2.6)
    # supports + posts
    ground = y_bot + 44
    for f in spans:
        px_ = x + 6 + f * (w - 12)
        c.line(px_, y_bot + 4, px_, ground, "#3E6E9E", 2.2)
        c.line(px_ - 13, ground, px_ + 13, ground, "#3E6E9E", 2.2)
        c.line(px_ - 7, ground - 5, px_ + 7, ground - 5, "#3E6E9E", 1.2)
        c.circle(px_, y_bot + 2, 1.9, fill=label)
    # span dimension between supports
    if len(spans) >= 2 and span_text:
        a = x + 6 + spans[0] * (w - 12)
        b = x + 6 + spans[1] * (w - 12)
        dy = y_top - 16
        c.line(a, dy, b, dy, label, 0.7)
        for xx in (a, b):
            c.line(xx, dy - 4, xx, dy + 4, label, 0.7)
        c.text((a + b) / 2 - 90, dy - 16, 180, span_text, 6.2, "mono", label, align="center")
    # run length dimension
    if dim_text:
        dy2 = ground + 16
        c.line(x, dy2, x + w, dy2, label, 0.7)
        for xx in (x, x + w):
            c.line(xx, dy2 - 4, xx, dy2 + 4, label, 0.7)
        c.text(x + w / 2 - 60, dy2 + 6, 120, dim_text, 6.4, "mono", label, align="center")


def lay_cover(s, num, total):
    c = Canvas()
    px = 590.0
    c.rect(0, 0, W, H, fill=WHITE)
    c.rect(px, 0, W - px, H, fill=NAVY)
    grid(c, px, 14.0, "#132F4E", 0.5)
    alpha_logo(MARK, WM.with_name("al_watermark_cover.png"), 0.09)
    c.image(WM.with_name("al_watermark_cover.png"), W - 150, H - 160, 128, 128)

    # hero: isometric run
    c.text(px + 38, 176, 330, "LADDER TRAY RUN  ·  SIDE ELEVATION", 6.4, "mono", "#6E8FB4")
    elev_tray(c, px + 38, 246, W - px - 76, 132, dim_text="RUN LENGTH L",
              span_text="SPAN S  =  3.66 m  (12 ft, CLASS C)")
    c.line(px + 38, 430, W - 30, 430, "#244664", 0.8)
    c.text(px + 38, 442, 330, "SEVEN CABLES  ·  ONE LAYER  ·  LOAD CLASS C", 6.4, "mono", "#6E8FB4")

    c.image(LOGO, M, 46, 116, 116 * 116 / 600)
    c.rect(M, 122, 38, 3, fill=RED, radius=1.5)
    c.text(M, 138, 470, s["kicker"], 8.2, "bold", BLUE, caps=True)

    ty = 162
    for line in s["title"].split("\n"):
        c.text(M, ty, 500, line, 37, "xbold", INK, lh=41)
        ty += 41
    c.text(M, ty + 10, 420, s["subtitle"], 11.0, "reg", INK2, lh=17)

    sy = ty + 10 + th(s["subtitle"], "reg", 11.0, 420, 17) + 28
    c.text(M, sy, 300, "DESIGN BASIS", 7.4, "bold", DIM, caps=True)
    x = M
    for std in s["standards"]:
        cw = measure(std, "semi", 8.4) + 18
        c.rect(x, sy + 13, cw, 20, fill=BLUE_TINT, stroke=BLUE_LINE, sw=0.7, radius=4)
        c.text(x + 9, sy + 19.5, cw, std, 8.4, "semi", BLUE)
        x += cw + 7

    my = H - 86
    c.line(M, my - 20, M + 430, my - 20, LINE, 0.8)
    mx = M
    for i, item in enumerate(s["meta"]):
        c.text(mx, my, 200, item, 9.2, "semi" if i == 0 else "reg", INK if i == 0 else MUTED)
        mx += measure(item, "semi", 9.2) + 15
    return c.ops


def lay_agenda(s, num, total):
    c = Canvas()
    watermark(c)
    y = header(c, s["kicker"], s["title"], 26)
    c.text(M, y + 4, 600, s["lead"], 10.2, "reg", INK2, lh=14.6)

    left_w = 548.0
    rh = 66.0
    need = len(s["items"]) * (rh + 10) - 10
    iy = vfit(y + 44, BODY_BOT, need, 22)

    ax = M + left_w + 26
    aw = W - M - ax
    ah = need
    c.rect(ax, iy, aw, ah, fill=NAVY, radius=8)
    alpha_logo(MARK, WM.with_name("al_watermark_navy.png"), 0.06)
    c.image(WM.with_name("al_watermark_navy.png"), ax + aw - 86, iy + ah - 96, 76, 76)

    for i, item in enumerate(s["items"]):
        yy = iy + i * (rh + 10)
        c.rect(M, yy, left_w, rh, fill=TINT if i % 2 == 0 else WHITE, stroke=LINE, sw=0.7,
               radius=7)
        c.text(M + 18, yy + 14, 40, item["num"], 16.5, "mono_b", BLUE)
        c.text(M + 68, yy + 12, 330, item["title"], 12.8, "bold", INK)
        c.text(M + 68, yy + 32, left_w - 160, item["body"], 8.9, "reg", MUTED, lh=12.2)
        c.text(M + left_w - 84, yy + 24, 70, item["pages"], 7.2, "mono", DIM, align="right")

    c.text(ax + 18, iy + 16, aw - 36, s["aside_title"], 10.6, "bold", WHITE)
    cy = iy + 40
    for line in s["aside"]:
        c.circle(ax + 21, cy + 5, 1.9, fill=N_ACC)
        used = c.text(ax + 32, cy, aw - 52, line, 8.8, "reg", N_TXT, lh=12.2)
        cy += used + 10
    # footer stats inside the panel
    sy = iy + ah - 54
    c.line(ax + 18, sy - 12, ax + aw - 18, sy - 12, "#2A4A6E", 0.8)
    stat_w = (aw - 36) / 3
    for i, (v, k) in enumerate([("4", "modules"), ("25", "slides"), ("45", "minutes")]):
        c.text(ax + 18 + i * stat_w, sy, stat_w, v, 15, "mono_b", N_ACC)
        c.text(ax + 18 + i * stat_w, sy + 19, stat_w, k, 7.0, "reg", N_MUT, caps=True)
    footer(c, num, total)
    return c.ops


def lay_objectives(s, num, total):
    c = Canvas()
    watermark(c)
    y = header(c, s["kicker"], s["title"], 26)
    c.text(M, y + 4, 660, s["lead"], 10.4, "reg", INK2, lh=14.8)
    cw = (CONTENT_W - 3 * 13) / 4
    inner = cw - 32
    ch = 0.0
    for cd in s["cards"]:
        ch = max(ch, 58 + th(cd["title"], "bold", 14.2, inner, 17.4) + 12
                 + th(cd["body"], "reg", 10.4, inner, 14.8) + 46)
    ch = fit_h(y + 40, BODY_BOT - 10, ch, 1.10)
    gy = vfit(y + 40, BODY_BOT - 10, ch, 26)
    for i, cd in enumerate(s["cards"]):
        x = M + i * (cw + 13)
        card(c, x, gy, cw, ch, fill=WHITE, accent=BLUE)
        badge_num(c, x + 18, gy + 20, f"0{i + 1}", BLUE, 24)
        c.text(x + 18, gy + 58, inner, cd["title"], 14.2, "bold", INK, lh=17.4)
        c.text(x + 18, gy + 58 + th(cd["title"], "bold", 14.2, inner, 17.4) + 12,
               inner, cd["body"], 10.4, "reg", INK2, lh=14.8)
        c.line(x + 18, gy + ch - 40, x + cw - 18, gy + ch - 40, LINE, 0.7)
        c.text(x + 18, gy + ch - 29, inner, cd["tag"], 6.9, "mono_b", BLUE, caps=True)
    footer(c, num, total)
    return c.ops


def lay_divider(s, num, total):
    c = Canvas()
    c.rect(0, 0, W, H, fill=NAVY)
    grid(c, 0.0, 14.0, "#122E4B", 0.5)
    alpha_logo(MARK, WM.with_name("al_watermark_navy.png"), 0.06)
    c.image(WM.with_name("al_watermark_navy.png"), W - 280, H - 280, 260, 260)
    c.image(LOGO, M, 44, 102, 102 * 116 / 600, 1.0)

    c.text(M, 146, 140, s["num"], 62, "mono_b", "#2F6EA8")
    ty = 232
    for line in s["title"].split("\n"):
        c.text(M + 4, ty, 520, line, 33, "xbold", WHITE, lh=38)
        ty += 38
    c.rect(M + 4, ty + 12, 46, 3, fill=RED, radius=1.5)
    c.text(M + 4, ty + 28, 460, s["lead"], 10.8, "reg", "#B9CADD", lh=15.6)

    px = 628.0
    c.text(px, 190, 260, "IN THIS MODULE", 7.4, "bold", "#5E86AE", caps=True)
    c.line(px, 204, px + 60, 204, "#2F5D85", 0.8)
    py = 216
    for p in s["points"]:
        c.circle(px + 2, py + 6, 2.0, fill=N_ACC)
        used = c.text(px + 14, py, W - M - px - 14, p, 9.4, "reg", N_TXT, lh=13.2)
        py += used + 12
    # module progress strip
    strip_y = 432.0
    c.line(M, strip_y, W - M, strip_y, "#22405F", 0.8)
    mods = ["Foundations", "Electrical sizing", "Structural", "Safety & QA"]
    active = int(s["num"]) - 1
    seg = (W - 2 * M) / 4
    for i, name in enumerate(mods):
        x = M + i * seg
        c.text(x, strip_y + 16, 26, f"0{i + 1}", 8.6, "mono_b",
               "#6FA8DC" if i == active else "#3A5C7E")
        c.text(x + 26, strip_y + 15, seg - 40, name, 9.4, "semi" if i == active else "reg",
               WHITE if i == active else "#4E7096")
        if i == active:
            c.rect(x, strip_y - 1.5, seg - 26, 3, fill=RED, radius=1.5)
    c.text(M, H - 44, 400, f"{num:02d} / {total:02d}", 8, "mono", "#5E86AE")
    return c.ops


def lay_why(s, num, total):
    c = Canvas()
    watermark(c)
    y = header(c, s["kicker"], s["title"])
    c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = (CONTENT_W - 2 * 15) / 3
    inner = cw - 36
    accents = [RED, "#C98A12", BLUE]
    ch = 0.0
    for b in s["blocks"]:
        ch = max(ch, 64 + th(b["title"], "bold", 13.6, inner, 16.8) + 10
                 + th(b["body"], "reg", 10.2, inner, 14.6) + 44)
    inset = M + 20
    insight_need = th(s["insight"], "semi", 10.2, CONTENT_W - 40, 13.6) + 24
    ch = fit_h(y + 40, BODY_BOT - insight_need - 24, ch, 1.18)
    gy = vfit(y + 40, BODY_BOT - insight_need - 24, ch, 22)
    for i, b in enumerate(s["blocks"]):
        x = M + i * (cw + 15)
        card(c, x, gy, cw, ch, fill=WHITE)
        c.rect(x, gy, cw, 3, fill=accents[i], radius=1.5)
        c.text(x + 18, gy + 20, inner, b["stat"], 29, "mono_b", accents[i])
        c.text(x + 18, gy + 64, inner, b["title"], 13.6, "bold", INK, lh=16.8)
        c.text(x + 18, gy + 64 + th(b["title"], "bold", 13.6, inner, 16.8) + 10,
               inner, b["body"], 10.2, "reg", INK2, lh=14.6)
        c.text(x + 18, gy + ch - 26, inner, b["tag"], 6.8, "mono_b", DIM, caps=True)
    ny = gy + ch + 22
    c.rect(M, ny, CONTENT_W, insight_need, fill=BLUE_TINT, stroke=BLUE_LINE, sw=0.8, radius=7)
    c.rect(M, ny, 4, insight_need, fill=BLUE, radius=2)
    c.text(M + 20, ny + 12, CONTENT_W - 40, s["insight"], 10.2, "semi", BLUE, lh=13.6)
    footer(c, num, total)
    return c.ops


def lay_anatomy(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    c.text(M, y + 4, 640, s["lead"], 10.2, "reg", INK2, lh=14.6)

    px, pw = M, 466.0
    ph = 300.0
    py = vfit(y + 34, BODY_BOT - 6, ph, 20)
    c.rect(px, py, pw, ph, fill=TINT, stroke=LINE, sw=0.8, radius=8)
    for i in range(1, 12):
        c.line(px + i * pw / 12, py + 8, px + i * pw / 12, py + ph - 8, "#E9EFF6", 0.6)
    for j in range(1, 6):
        c.line(px + 8, py + j * ph / 6, px + pw - 8, py + j * ph / 6, "#E9EFF6", 0.6)

    tx, tw2 = px + 44, pw - 88
    ty = py + 152            # top rail
    depth = 36
    # cover
    c.line(tx - 4, ty - 30, tx + tw2 + 4, ty - 30, "#8FA8C2", 2.0)
    c.line(tx + 6, ty - 30, tx + 6, ty - 8, "#8FA8C2", 1.1)
    c.line(tx + tw2 - 6, ty - 30, tx + tw2 - 6, ty - 8, "#8FA8C2", 1.1)
    # rails + rungs
    c.rect(tx, ty, tw2, 9, fill="#2E5F92", stroke="#1B4166", sw=0.7)
    c.rect(tx, ty + depth, tw2, 9, fill="#2E5F92", stroke="#1B4166", sw=0.7)
    for i in range(0, 15):
        rx = tx + 8 + i * (tw2 - 16) / 14
        c.line(rx, ty + 9, rx, ty + depth, "#4E86BC", 1.2)
    for k, colr in enumerate(["#C0172B", "#D9A23B", "#3F9C74", "#8FB6DA"]):
        c.line(tx + 10, ty + 17 + k * 1.1, tx + tw2 - 10, ty + 17 + k * 1.1, colr, 2.1)
    # supports
    for sx in (tx + 58, tx + tw2 - 82):
        c.rect(sx, ty + depth + 9, 5, 50, fill="#93A8BE")
        c.line(sx - 13, ty + depth + 59, sx + 18, ty + depth + 59, "#93A8BE", 3)
    # splice
    spx = tx + tw2 * 0.34
    c.line(spx, ty - 34, spx, ty + depth + 12, "#0F4C81", 1.1, dash="dash")
    # bonding jumper across the splice
    c.poly([(spx - 26, ty - 12), (spx, ty - 30), (spx + 26, ty - 12)], fill=None, stroke=GREEN,
           sw=1.6, close=False)

    def callout(label, cx, cy, tx_, ty_):
        c.circle(cx, cy, 8.2, fill=WHITE, stroke=BLUE, sw=1.0)
        c.text(cx - 8.2, cy - 4.2, 16.4, label, 7.2, "bold", BLUE, align="center")
        if (cx, cy) != (tx_, ty_):
            c.line(cx, cy, tx_, ty_, BLUE, 0.7, dash="dot")

    callout("1", tx + tw2 * 0.62, ty + 26, tx + tw2 * 0.62, ty + 26)
    callout("2", tx + 58 + 40, ty + depth + 34, tx + 60, ty + depth + 34)
    callout("3", spx, ty - 56, spx, ty - 36)
    callout("4", spx - 44, ty - 30, spx - 12, ty - 22)
    callout("5", tx + tw2 - 6, ty - 56, tx + tw2 - 6, ty - 32)
    c.text(px + 16, py + ph - 24, 240, "TYPICAL ELEVATION  ·  NOT TO SCALE", 6.2, "mono", DIM)

    lx = px + pw + 28
    lw = W - M - lx
    c.text(lx, py + 2, lw, "FIVE DECISIONS", 7.4, "bold", DIM, caps=True)
    ly = py + 22
    for item in s["legend"]:
        c.circle(lx + 8, ly + 9, 9.0, fill=BLUE_TINT, stroke=BLUE_LINE, sw=0.8)
        c.text(lx, ly + 5.2, 17, item["n"], 7.4, "bold", BLUE, align="center")
        c.text(lx + 26, ly, lw - 26, item["k"], 10.2, "bold", INK)
        used = c.text(lx + 26, ly + 15, lw - 26, item["v"], 8.6, "reg", MUTED, lh=11.8)
        ly += 15 + used + 16
    footer(c, num, total)
    return c.ops


def _mini_tray(c: Canvas, x, y, w, h, kind):
    if kind == "ladder":
        c.rect(x, y, w, 5, fill="#2E5F92", radius=1)
        c.rect(x, y + h - 5, w, 5, fill="#2E5F92", radius=1)
        for i in range(6):
            rx = x + 6 + i * (w - 12) / 5
            c.line(rx, y + 5, rx, y + h - 5, "#4E86BC", 2.0)
    elif kind == "solid":
        c.rect(x, y, w, 5, fill="#2E5F92", radius=1)
        c.rect(x, y + h - 5, w, 5, fill="#2E5F92", radius=1)
        c.rect(x, y + 5, w, h - 10, fill="#E3EBF5")
        for k, colr in enumerate(["#C0172B", "#D9A23B", "#3F9C74"]):
            c.line(x + 6, y + 15 + k * 11, x + w - 6, y + 15 + k * 11, colr, 2.2)
    elif kind == "mesh":
        c.rect(x, y, w, h, fill=WHITE, stroke="#7FA3C6", sw=0.7)
        for i in range(1, 10):
            c.line(x + i * w / 10, y, x + i * w / 10, y + h, "#A8C2DA", 0.8)
        for j in range(1, 4):
            c.line(x, y + j * h / 4, x + w, y + j * h / 4, "#A8C2DA", 0.8)
        for k, colr in enumerate(["#C0172B", "#3F9C74"]):
            c.line(x + 4, y + h / 2 - 6 + k * 12, x + w - 4, y + h / 2 - 6 + k * 12, colr, 2.0)
    else:
        c.rect(x + w * 0.34, y, w * 0.32, h, fill="#E3EBF5", stroke="#2E5F92", sw=1.3)
        c.line(x + w * 0.41, y + h / 2, x + w * 0.59, y + h / 2, "#C0172B", 2.2)


def lay_types(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = (CONTENT_W - 3 * 13) / 4
    inner = cw - 32
    ch = 0.0
    for cd in s["cards"]:
        block = (86 + th(cd["title"], "bold", 13.4, inner, 16.4) + 5
                 + th(cd["spec"], "mono", 8.8, inner, 11.8) + 10
                 + th(cd["body"], "reg", 9.6, inner, 13.4))
        tail = 20 + 12 + th(cd["use"], "reg", 9.0, inner, 12) + 12 + 12 + th(cd["avoid"], "reg", 8.8, inner, 11.6) + 14
        ch = max(ch, block + tail)
    ch = fit_h(y + 34, BODY_BOT - 4, ch, 1.06)
    gy = vfit(y + 34, BODY_BOT - 4, ch, 20)
    for i, cd in enumerate(s["cards"]):
        x = M + i * (cw + 13)
        card(c, x, gy, cw, ch, fill=WHITE)
        _mini_tray(c, x + 16, gy + 18, inner, 52, cd["profile"])
        yy = gy + 84
        c.text(x + 16, yy, inner, cd["title"], 13.4, "bold", INK, lh=16.4)
        yy += th(cd["title"], "bold", 13.4, inner, 16.4) + 5
        c.text(x + 16, yy, inner, cd["spec"], 8.8, "mono", BLUE, lh=11.8)
        yy += th(cd["spec"], "mono", 8.8, inner, 11.8) + 10
        c.text(x + 16, yy, inner, cd["body"], 9.6, "reg", INK2, lh=13.4)
        sy = gy + ch - (14 + 12 + th(cd["use"], "reg", 9.0, inner, 12) + 12 + 12
                        + th(cd["avoid"], "reg", 8.8, inner, 11.6) + 6)
        c.line(x + 16, sy - 14, x + cw - 16, sy - 14, LINE, 0.7)
        c.text(x + 16, sy, inner, "USE", 6.6, "bold", GREEN, caps=True)
        c.text(x + 16, sy + 12, inner, cd["use"], 9.0, "reg", INK2, lh=12)
        c.text(x + 16, sy + 12 + th(cd["use"], "reg", 9.0, inner, 12) + 12, inner, "AVOID",
               6.6, "bold", RED, caps=True)
        c.text(x + 16, sy + 24 + th(cd["use"], "reg", 9.0, inner, 12) + 12, inner,
               cd["avoid"], 8.8, "reg", MUTED, lh=11.6)
    footer(c, num, total)
    return c.ops


def lay_table(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lead_h = c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)

    if s.get("formula"):
        fs = s["formula"]
        fw = max(250.0, measure(fs, "mono_b", 10.6) + 38)
        c.rect(W - M - fw, y + 2, fw, 36, fill=BLUE_TINT, stroke=BLUE_LINE, sw=0.8, radius=6)
        c.text(W - M - fw + 12, y + 11, fw - 24, fs, 10.6, "mono_b", BLUE, align="center")

    cols = s["columns"]
    widths = s.get("widths") or [1 / len(cols)] * len(cols)
    xs, acc = [], M
    for fr in widths:
        xs.append(acc)
        acc += fr * CONTENT_W

    head_h = 30.0
    body_top = y + 10 + lead_h + 14
    rows = []
    for row in s["rows"]:
        lines = 1
        for ci, cell in enumerate(row["cells"]):
            size = 9.2 if ci == 0 else 8.8
            face = "bold" if ci == 0 else "reg"
            lines = max(lines, tl(cell, face, size, widths[ci] * CONTENT_W - 22))
        rows.append(max(36.0, lines * 11.9 + 18))

    tail = (note_need(CONTENT_W, s["note"]) + 12 if s.get("note") else 0)
    tail += (th(s["footnote"], "reg", 7.9, CONTENT_W, 10.8) + 8 if s.get("footnote") else 0)
    avail = BODY_BOT - body_top - tail - head_h - 6
    if sum(rows) < avail:
        grow = min(1.55, avail / sum(rows))
        rows = [r * grow for r in rows]
    need = head_h + sum(rows) + tail
    if need > BODY_BOT - body_top:          # never spill past the footer
        shrink = (BODY_BOT - body_top - tail) / sum(rows)
        rows = [r * shrink for r in rows]
        need = head_h + sum(rows) + tail
    ty = min(vfit(body_top, BODY_BOT, need, 14), BODY_BOT - need)

    c.rect(M, ty, CONTENT_W, head_h, fill=NAVY, radius=5)
    for i, colr in enumerate(cols):
        c.text(xs[i] + 12, ty + 10, widths[i] * CONTENT_W - 20, colr, 7.4, "bold", "#C9D8EA",
               caps=True)
    ry = ty + head_h
    for ri, row in enumerate(s["rows"]):
        h = rows[ri]
        emph = row.get("emphasis")
        c.rect(M, ry, CONTENT_W, h, fill=BLUE_TINT if emph else (TINT if ri % 2 == 0 else WHITE))
        c.line(M, ry + h, M + CONTENT_W, ry + h, LINE, 0.7)
        if emph:
            c.rect(M, ry, 3, h, fill=BLUE)
        for ci, cell in enumerate(row["cells"]):
            face = "bold" if ci == 0 else "reg"
            size = 9.2 if ci == 0 else 8.8
            color = INK if ci == 0 else INK2
            used = th(cell, face, size, widths[ci] * CONTENT_W - 22)
            c.text(xs[ci] + 12, ry + (h - used) / 2, widths[ci] * CONTENT_W - 22, cell, size,
                   face, color, lh=size * 1.34)
        ry += h
    c.rect(M, ty, CONTENT_W, ry - ty, fill=None, stroke=LINE, sw=0.9, radius=5)

    ny = ry + 12
    if s.get("note"):
        ny += note_bar(c, M, ny, CONTENT_W, s["note"]) + 12
    if s.get("footnote"):
        c.text(M, ny, CONTENT_W, s["footnote"], 7.9, "reg", DIM, lh=10.8)
    footer(c, num, total)
    return c.ops


def _bars(c: Canvas, spec, x, y, w, h):
    maxv = spec["max"]
    bars = spec["bars"]
    n = len(bars)
    gap = 24.0
    bw = (w - gap * (n + 1)) / n
    base = y + h - 36
    steps = spec.get("steps", 4)
    for i in range(steps + 1):
        gy = base - (h - 60) * i / steps
        c.line(x, gy, x + w, gy, "#E9EFF6", 0.6)
        tick = maxv * i / steps
        label = f"{tick:g}" if spec.get("decimals") is None else f"{tick:.{spec['decimals']}f}"
        c.text(x - 46, gy - 4, 38, label, 6.4, "mono", DIM, align="right")
    cmap = {"red": RED, "blue": BLUE, "amber": "#C98A12", "green": GREEN}
    for i, b in enumerate(bars):
        bx = x + gap + i * (bw + gap)
        bh = (h - 60) * (b["value"] / maxv)
        fill = cmap.get(b["color"], BLUE)
        c.rect(bx, base - bh, bw, bh, fill=fill, radius=3)
        label = f"{b['value']:g}" if not spec.get("decimals") else f"{b['value']:.{spec['decimals']}f}"
        c.text(bx - 6, base - bh - 19, bw + 12, label, 13, "mono_b", fill, align="center")
        c.text(bx - 12, base + 7, bw + 24, b["label"], 8.2, "semi", INK2, align="center", lh=10.6)
        c.text(bx - 12, base + 31, bw + 24, b["note"], 6.9, "reg", DIM, align="center")
    c.line(x, base, x + w, base, "#C9D5E4", 0.9)


def lay_chart(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 640, s["lead"], 10.2, "reg", INK2, lh=14.6)

    cy = y + 12 + lh_ + 12
    footnote_h = (th(s["footnote"], "reg", 7.9, CONTENT_W, 10.8) + 14) if s.get("footnote") else 6
    chart_h = BODY_BOT - cy - footnote_h
    chart_w = 392.0
    c.rect(M, cy, chart_w, chart_h, fill=WHITE, stroke=LINE, sw=0.8, radius=8)
    c.text(M + 16, cy + 12, 200, s["chart"].get("title", s["chart"]["unit"]), 7.2, "bold", DIM,
           caps=True)
    _bars(c, s["chart"], M + 62, cy + 26, chart_w - 84, chart_h - 48)

    px = M + chart_w + 24
    pw = W - M - px
    inner = pw - 28
    heights = [22 + 15 + th(pt["body"], "reg", 8.8, inner, 12.2) + 16 for pt in s["points"]]
    hsum = sum(heights)
    gap = min(16.0, max(8.0, (chart_h - hsum) / max(1, len(heights) - 1)))
    py = cy + max(0.0, (chart_h - hsum - gap * (len(heights) - 1)) / 2)
    for i, pt in enumerate(s["points"]):
        c.rect(px, py, pw, heights[i], fill=TINT, stroke=LINE, sw=0.7, radius=7)
        c.text(px + 14, py + 10, inner, pt["title"], 10.4, "bold", INK)
        c.text(px + 14, py + 26, inner, pt["body"], 8.8, "reg", INK2, lh=12.2)
        c.text(px + 14, py + heights[i] - 17, inner, pt["tag"], 6.6, "mono_b", BLUE, caps=True)
        py += heights[i] + gap
    if s.get("footnote"):
        c.text(M, cy + chart_h + 10, CONTENT_W, s["footnote"], 7.9, "reg", DIM, lh=10.8)
    footer(c, num, total)
    return c.ops


def lay_worked(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"], 26)
    lh_ = c.text(M, y + 4, 500, s["lead"], 10.0, "reg", INK2, lh=14.2)

    step_w = 496.0
    fx = M + step_w + 26
    fw = W - M - fx
    c.rect(fx, y + 0, fw, 60, fill=BLUE_TINT, stroke=BLUE_LINE, sw=0.9, radius=8)
    c.text(fx + 15, y + 12, fw - 30, s["formula"][0], 10.6, "mono_b", BLUE)
    c.text(fx + 15, y + 33, fw - 30, s["formula"][1], 8.8, "mono", "#4E7AA8")

    sy = y + 18 + lh_ + 24
    rh = 52.0
    step_need = len(s["steps"]) * (rh + 8)

    # cable list table
    tbl = s["table"]
    widths = tbl.get("widths") or [1 / len(tbl["columns"])] * len(tbl["columns"])
    tx, tw = fx, fw
    ty2 = y + 74
    c.text(tx, ty2, tw, "CABLE LIST", 7.0, "bold", DIM, caps=True)
    ty2 += 13
    head2 = 24.0
    c.rect(tx, ty2, tw, head2, fill=NAVY, radius=4)
    xacc = tx
    colx = []
    for fr in widths:
        colx.append(xacc)
        xacc += fr * tw
    for i, hcol in enumerate(tbl["columns"]):
        c.text(colx[i] + 7, ty2 + 8, widths[i] * tw - 10, hcol, 6.2, "bold", "#C9D8EA", caps=True)
    ty2 += head2
    rh2 = 27.0
    for ri, row in enumerate(tbl["rows"]):
        c.rect(tx, ty2, tw, rh2, fill=TINT if ri % 2 == 0 else WHITE)
        c.line(tx, ty2 + rh2, tx + tw, ty2 + rh2, LINE, 0.6)
        for ci, cell in enumerate(row):
            c.text(colx[ci] + 7, ty2 + 8, widths[ci] * tw - 10, cell, 7.2,
                   "semi" if ri >= 1 else "reg", INK if ri >= 1 else INK2, lh=9.8)
        ty2 += rh2
    c.rect(tx, y + 87, tw, ty2 - (y + 87), fill=None, stroke=LINE, sw=0.8, radius=4)

    ny = max(ty2, sy + step_need) + 16
    note_bar(c, M, ny, CONTENT_W, s["note"])

    for i, st in enumerate(s["steps"]):
        ry = sy + i * (rh + 8)
        c.rect(M, ry, step_w, rh, fill=WHITE, stroke=LINE, sw=0.7, radius=7)
        badge_num(c, M + 12, ry + 17, st["n"], BLUE, 18)
        c.text(M + 40, ry + 9, step_w - 52, st["t"], 10.2, "bold", INK)
        c.text(M + 40, ry + 25, step_w - 52, st["d"], 8.7, "reg", INK2, lh=11.8)
    footer(c, num, total)
    return c.ops


def lay_laying(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = (CONTENT_W - 18) / 2
    inner = cw - 40
    ch = 60 + max(bullet_need(inner, side["points"], 9.9, 9, 1.36) for side in (s["left"], s["right"])) + 22
    nb = note_need(CONTENT_W, s["note"], 9.2)
    ch = fit_h(y + 12 + lh_ + 14, BODY_BOT - nb - 14, ch, 1.15)
    gy = vfit(y + 12 + lh_ + 14, BODY_BOT - nb - 14, ch, 26)
    for i, side in enumerate([s["left"], s["right"]]):
        x = M + i * (cw + 18)
        accent = RED if i == 0 else BLUE
        card(c, x, gy, cw, ch, fill=WHITE, accent=accent)
        c.text(x + 20, gy + 16, inner, side["title"], 13.4, "bold", INK)
        c.text(x + 20, gy + 35, inner, side["sub"], 8.6, "semi", accent)
        bullet_lines(c, x + 20, gy + 58, inner, side["points"], 9.9, INK2, gap=9, dot=accent,
                     lh=1.36)
    note_bar(c, M, gy + ch + 14, CONTENT_W, s["note"], BLUE_TINT, BLUE_LINE, BLUE, BLUE, 9.2)
    footer(c, num, total)
    return c.ops


def lay_nema(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = 172.0
    ch = 104.0
    pw = (CONTENT_W - 2 * 14) / 3
    inner = pw - 28
    ph = max(23 + 7 + th(pt["title"], "bold", 10.2, inner, 12.8) + 7
             + th(pt["body"], "reg", 8.6, inner, 12) + 16 for pt in s["points"])
    nb = note_need(CONTENT_W, s["note"])
    need = ch + 14 + ph
    need = fit_h(y + 12 + lh_ + 16, BODY_BOT - nb - 14, need, 1.12)
    gy = vfit(y + 12 + lh_ + 16, BODY_BOT - nb - 14, need, 30)

    for i, cl in enumerate(s["classes"]):
        x = M + i * (cw + 14)
        c.rect(x, gy, cw, ch, fill=NAVY if i == 0 else TINT, stroke=None if i == 0 else LINE,
               sw=0.8, radius=8)
        c.text(x + 16, gy + 12, cw - 32, cl["cls"], 23, "mono_b", WHITE if i == 0 else BLUE)
        c.text(x + 16, gy + 48, cw - 32, cl["span"], 8.4, "semi", "#C9D8EA" if i == 0 else INK)
        c.text(x + 16, gy + 62, cw - 32, cl["load"], 8.4, "reg", "#9FB6D0" if i == 0 else MUTED)
        c.text(x + 16, gy + 76, cw - 32, cl["note"], 6.4, "reg", "#7C94B2" if i == 0 else DIM,
               lh=8.8)

    py = gy + ch + 14
    for i, pt in enumerate(s["points"]):
        x = M + i * (pw + 14)
        c.rect(x, py, pw, ph, fill=WHITE, stroke=LINE, sw=0.8, radius=8)
        c.rect(x, py, 3, ph, fill=BLUE, radius=1.5)
        c.text(x + 14, py + 11, inner, pt["tag"], 6.8, "mono_b", BLUE, caps=True)
        c.text(x + 14, py + 23, inner, pt["title"], 10.2, "bold", INK, lh=12.8)
        c.text(x + 14, py + 23 + th(pt["title"], "bold", 10.2, inner, 12.8) + 7,
               inner, pt["body"], 8.6, "reg", INK2, lh=12)
    note_bar(c, M, py + ph + 14, CONTENT_W, s["note"])
    footer(c, num, total)
    return c.ops


def _section_icon(c: Canvas, x, y, w, h, kind):
    if kind == "head":
        c.line(x + w * 0.5, y + 4, x + w * 0.5, y + h * 0.62, BLUE, 1.1, dash="dash")
        c.line(x + w * 0.22, y + h * 0.62, x + w * 0.78, y + h * 0.62, BLUE, 1.1)
        c.line(x + w * 0.5, y + h * 0.62, x + w * 0.62, y + h * 0.86, BLUE, 1.1)
        c.circle(x + w * 0.5, y + h * 0.1, 2.2, fill=BLUE)
    elif kind == "side":
        c.line(x + 8, y + 6, x + 8, y + h - 6, BLUE, 1.1, dash="dash")
        c.line(x + 8, y + h / 2, x + w - 8, y + h / 2, BLUE, 1.1)
        for xx in (8, w - 8):
            c.line(x + xx, y + h / 2 - 5, x + xx, y + h / 2 + 5, BLUE, 1.1)
        c.circle(x + w - 8, y + h / 2, 2.2, fill=BLUE)
    else:
        c.line(x + 7, y + 6, x + 7, y + h - 6, INK2, 1.5)
        c.line(x + 7, y + 6, x + w - 6, y + 6, INK2, 1.5)
        c.line(x + 7, y + h - 6, x + w - 6, y + h - 6, "#B9C6D6", 0.8)
        c.circle(x + w * 0.52, y + h * 0.55, 4.5, fill=BLUE)


def lay_clearances(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = (CONTENT_W - 2 * 16) / 3
    inner = cw - 32
    ch = max(96 + th(d["b"], "reg", 10.4, inner, 14.6) + 22 for d in s["dims"])
    pts_need = 18 + bullet_need(CONTENT_W, s["points"], 10.0, 11, 1.36)
    ch = fit_h(y + 12 + lh_ + 16, BODY_BOT - pts_need - 22, ch, 1.18)
    gy = vfit(y + 12 + lh_ + 16, BODY_BOT - pts_need - 22, ch, 22)
    for i, d in enumerate(s["dims"]):
        x = M + i * (cw + 16)
        card(c, x, gy, cw, ch, fill=WHITE)
        c.rect(x + 16, gy + 16, 46, 46, fill=TINT, stroke=LINE, sw=0.6, radius=6)
        _section_icon(c, x + 22, gy + 22, 34, 34, ["head", "side", "walk"][i])
        c.text(x + 74, gy + 20, inner - 42, d["v"], 22, "mono_b", BLUE)
        c.text(x + 74, gy + 50, inner - 42, d["k"], 9.4, "bold", INK, caps=True)
        c.text(x + 16, gy + 96, inner, d["b"], 10.4, "reg", INK2, lh=14.6)

    py = gy + ch + 20
    c.text(M, py, CONTENT_W, "ALSO ON THE DRAWING", 7.2, "bold", DIM, caps=True)
    bullet_lines(c, M, py + 19, CONTENT_W, s["points"], 10.0, INK2, gap=11, lh=1.36)
    footer(c, num, total)
    return c.ops


def lay_points2(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.2, "reg", INK2, lh=14.6)
    cw = (CONTENT_W - 18) / 2
    inner = cw - 46
    rh = max(24 + 18 + th(b["body"], "reg", 9.5, inner, 13) + 18 for b in s["blocks"])
    rows = (len(s["blocks"]) + 1) // 2
    rh = fit_h(y + 12 + lh_ + 16, BODY_BOT - 6, rows * (rh + 14) - 14, 1.12) / rows - 14
    gy = vfit(y + 12 + lh_ + 16, BODY_BOT - 6, rows * (rh + 14) - 14, 40)
    for i, b in enumerate(s["blocks"]):
        r_, cidx = divmod(i, 2)
        x = M + cidx * (cw + 18)
        yy = gy + r_ * (rh + 14)
        accent = [BLUE, RED, "#C98A12", GREEN][i % 4]
        c.rect(x, yy, cw, rh, fill=WHITE, stroke=LINE, sw=0.8, radius=8)
        c.rect(x, yy, 3, rh, fill=accent, radius=1.5)
        c.circle(x + 26, yy + rh / 2, 10.0, fill=accent)
        c.text(x + 16, yy + rh / 2 - 5.2, 20, f"{i + 1:02d}", 6.4, "bold", WHITE, align="center")
        c.text(x + 46, yy + 12, inner - 30, b["tag"], 6.6, "mono_b", DIM, caps=True)
        c.text(x + 46, yy + 23, inner - 30, b["title"], 11.6, "bold", INK)
        c.text(x + 46, yy + 42, inner - 30, b["body"], 9.5, "reg", INK2, lh=13)
    footer(c, num, total)
    return c.ops


def lay_earthing(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"], 26)
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.0, "reg", INK2, lh=14.2)
    cw = (CONTENT_W - 18) / 2
    inner = cw - 32
    ch = 36 + max(bullet_need(inner, items, 9.4, 8, 1.34) for items in (s["left"], s["right"])) + 18
    tw = (CONTENT_W - 2 * 12) / 3
    tneed = max(11 + th(t["t"], "bold", 9.2, tw - 28, 12) + 6
                + th(t["d"], "reg", 8.4, tw - 28, 11.4) + 18 for t in s["traps"])
    ch = fit_h(y + 12 + lh_ + 14, BODY_BOT - tneed - 34, ch, 1.15)
    gy = vfit(y + 12 + lh_ + 14, BODY_BOT - tneed - 34, ch, 20)
    for i, (title, items, accent) in enumerate([
            (s["left_title"], s["left"], GREEN), (s["right_title"], s["right"], BLUE)]):
        x = M + i * (cw + 18)
        c.rect(x, gy, cw, ch, fill=WHITE, stroke=LINE, sw=0.8, radius=8)
        c.rect(x, gy, cw, 24, fill=accent, radius=8)
        c.rect(x, gy + 12, cw, 12, fill=accent)
        c.text(x + 14, gy + 7, inner, title, 9.0, "bold", WHITE, caps=True)
        bullet_lines(c, x + 16, gy + 36, inner, items, 9.4, INK2, gap=8, dot=accent, lh=1.34)

    ty = gy + ch + 22
    c.text(M, ty, CONTENT_W, "THREE TRAPS FROM THE ORIGINAL DRAFT — NOW FIXED", 7.2, "bold",
           RED, caps=True)
    ty += 16
    for i, t in enumerate(s["traps"]):
        x = M + i * (tw + 12)
        c.rect(x, ty, tw, tneed, fill=RED_TINT, stroke="#EBC3C8", sw=0.8, radius=7)
        c.text(x + 14, ty + 11, tw - 28, t["t"], 9.2, "bold", RED, lh=12)
        c.text(x + 14, ty + 11 + th(t["t"], "bold", 9.2, tw - 28, 12) + 6,
               tw - 28, t["d"], 8.4, "reg", "#6B3B42", lh=11.4)
    footer(c, num, total)
    return c.ops


def lay_checklist(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.1, "reg", INK2, lh=14.4)
    cw = (CONTENT_W - 16) / 2
    inner = cw - 60
    rh = max(12 + 14 + th(it["d"], "reg", 9.2, inner, 12.6) + 16 for it in s["items"])
    rows = (len(s["items"]) + 1) // 2
    sign_h = 40.0
    rh = fit_h(y + 12 + lh_ + 14, BODY_BOT - sign_h - 20, rows * (rh + 10) - 10, 1.14) / rows - 10
    gy = vfit(y + 12 + lh_ + 14, BODY_BOT - sign_h - 20, rows * (rh + 10) - 10, 22)
    for i, it in enumerate(s["items"]):
        r_, cidx = divmod(i, 2)
        x = M + cidx * (cw + 16)
        yy = gy + r_ * (rh + 10)
        c.rect(x, yy, cw, rh, fill=TINT if i % 2 == 0 else WHITE, stroke=LINE, sw=0.7, radius=7)
        c.rect(x + 14, yy + 18, 22, 22, fill=WHITE, stroke=BLUE, sw=1.0, radius=5)
        c.text(x + 14, yy + 26, 22, it["n"], 7.0, "mono_b", BLUE, align="center")
        c.text(x + 46, yy + 10, inner, it["t"], 10.8, "bold", INK)
        c.text(x + 46, yy + 28, inner, it["d"], 9.2, "reg", INK2, lh=12.6)

    sy = gy + rows * (rh + 10) + 8
    c.rect(M, sy, CONTENT_W, sign_h, fill=NAVY, radius=7)
    c.rect(M + 16, sy + 12, 3, sign_h - 24, fill=RED, radius=1.5)
    c.text(M + 32, sy + 13, CONTENT_W - 150, s["signoff"], 9.8, "semi", WHITE)
    c.text(W - M - 106, sy + 15, 90, "QA GATE  ·  IFC", 7.0, "mono", "#6FA8DC", align="right")
    footer(c, num, total)
    return c.ops


def lay_recap(s, num, total):
    c = Canvas()
    y = header(c, s["kicker"], s["title"])
    lh_ = c.text(M, y + 4, 700, s["lead"], 10.1, "reg", INK2, lh=14.4)
    top = y + 12 + lh_ + 14

    cols = 6
    bw = (CONTENT_W - 5 * 9) / cols
    ch = 54.0
    rows = (len(s["numbers"]) + cols - 1) // cols
    trow = 24.0
    voff = 18
    need = rows * (ch + 6) + 26 + len(s["terms"]) // 2 * trow + 6
    need = fit_h(top, BODY_BOT - 4, need, 1.16)
    gy = vfit(top, BODY_BOT - 4, need, 26)

    for i, n in enumerate(s["numbers"]):
        r_, cidx = divmod(i, cols)
        x = M + cidx * (bw + 9)
        yy = gy + r_ * (ch + 6)
        c.rect(x, yy, bw, ch, fill=NAVY if i % 2 == 0 else NAVY_SOFT, radius=6)
        c.text(x + 9, yy + 8, bw - 16, n["v"], 14.8, "mono_b", WHITE)
        c.text(x + 9, yy + 29, bw - 16, n["k"], 6.7, "reg", N_MUT, lh=9.2)

    vy = gy + rows * (ch + 6) + 18
    c.text(M, vy, 200, "THE TEN WORDS", 7.2, "bold", DIM, caps=True)
    vy += 16
    colw = (CONTENT_W - 2 * 18) / 2
    for i, (term, meaning) in enumerate(s["terms"]):
        r_, cidx = divmod(i, 2)
        x = M + cidx * (colw + 18)
        yy = vy + r_ * trow
        c.text(x, yy, 74, term, 9.0, "bold", BLUE)
        c.text(x + 78, yy, colw - 78, meaning, 8.8, "reg", INK2)
        c.line(x, yy + 19, x + colw - 8, yy + 19, "#EEF2F7", 0.6)
    footer(c, num, total)
    return c.ops


def lay_closing(s, num, total):
    c = Canvas()
    c.rect(0, 0, W, H, fill=NAVY)
    grid(c, 0.0, 14.0, "#122E4B", 0.5)
    alpha_logo(MARK, WM.with_name("al_watermark_navy.png"), 0.06)
    c.image(WM.with_name("al_watermark_navy.png"), W - 300, H - 300, 270, 270)
    # faint elevation on the right, echoing the cover
    elev_tray(c, 604, 250, 306, 96, rail="#2A5580", fill="#12304F", label="#2F5B85",
              rungs=15, dim_text="", span_text="")
    c.image(LOGO, M, 44, 102, 102 * 116 / 600, 1.0)

    c.text(M, 142, 700, s["kicker"], 8.2, "bold", N_ACC, caps=True)
    ty = 164
    for line in s["title"].split("\n"):
        used = c.text(M, ty, 560, line, 33, "xbold", WHITE, lh=38)
        ty += used
    c.rect(M, ty + 12, 46, 3, fill=RED, radius=1.5)
    c.text(M, ty + 28, 500, s["lead"], 10.8, "reg", "#B9CADD", lh=15.8)

    cy = ty + 28 + th(s["lead"], "reg", 10.8, 500, 15.8) + 24
    c.text(M, cy, 320, "FOUR QUESTIONS TO ASK YOUR OWN DRAWING", 7.2, "bold", "#5E86AE",
           caps=True)
    cy += 18
    for q in s["checks"]:
        c.rect(M, cy + 1, 11, 11, fill=None, stroke=N_ACC, sw=1.0, radius=2.5)
        c.text(M + 22, cy, 470, q, 9.6, "reg", N_TXT)
        cy += 21

    c.line(M, H - 74, W - M, H - 74, "#22405F", 0.8)
    c.text(M, H - 62, 460, s["contact"], 9.0, "semi", "#C9D8EA")
    c.text(M, H - 46, 700, "REFERENCE STANDARDS  ·  " + "  ·  ".join(s["refs"]), 7.2, "mono",
           "#6E86A6")
    return c.ops


LAYOUTS = {
    "cover": lay_cover, "agenda": lay_agenda, "objectives": lay_objectives,
    "divider": lay_divider, "why": lay_why, "anatomy": lay_anatomy, "types": lay_types,
    "table": lay_table, "chart": lay_chart, "worked": lay_worked, "laying": lay_laying,
    "nema": lay_nema, "clearances": lay_clearances, "points2": lay_points2,
    "earthing": lay_earthing, "checklist": lay_checklist, "recap": lay_recap,
    "closing": lay_closing,
}


def build(slide: dict, num: int, total: int) -> list[dict]:
    return LAYOUTS[slide["layout"]](slide, num, total)
