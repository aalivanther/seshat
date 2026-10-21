#!/usr/bin/env python3
"""Genera los iconos de la app desde la marca propia de Seshat.

Dibuja la estrella de siete puntas (el emblema de la diosa Seshat, el mismo
del wordmark de la app) sobre el ámbar de la casa, y escribe los PNG a pelo
—sin Pillow ni ninguna dependencia— para que el build no dependa de nada
instalado. De ahí salen el .icns de macOS y el .ico de Windows.

Uso:  python3 installer/make-icons.py
"""

import math
import os
import struct
import subprocess
import sys
import zlib

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "icons")

# paleta de la app (globals.css): ámbar sobre pergamino
AMBER = (201, 124, 44)
PAPER = (253, 248, 240)
INK = (60, 47, 35)


def seven_star(cx, cy, r):
    """La roseta de siete puntas del emblema, con las MISMAS proporciones a
    mano que el logotipo de la app (components/Wordmark.tsx): las puntas no
    son regulares — la de arriba sobresale y las de abajo se recogen."""
    # coordenadas del wordmark en su lienzo de 32, normalizadas al centro (16,19)
    raw = [
        (16, 8.4), (18.4, 15.1), (24.9, 12.1), (21.8, 18.1), (28.6, 19.4),
        (21.9, 22.0), (25.4, 27.4), (18.9, 25.6), (17.6, 31.0), (16, 26.4),
        (14.2, 30.6), (13.2, 25.4), (6.9, 27.0), (10.4, 21.8), (3.6, 19.2),
        (10.3, 18.0), (7.3, 11.9), (13.7, 15.0),
    ]
    k = r / 12.6  # 12.6 = radio mayor aproximado del dibujo original
    return [(cx + (x - 16) * k, cy + (y - 19) * k) for x, y in raw]


def on_arc(fx, fy, cx, cy, r, w, span_deg=124):
    """¿El punto cae sobre el arco invertido que corona el emblema?

    Es el rasgo que distingue a Seshat de una estrella cualquiera. El arco es
    CORTO (un gesto de pincel, no un semicírculo) y con los extremos
    redondeados: cortarlo en seco dejaba dos muñones que parecían alas."""
    dx, dy = fx - cx, fy - cy
    half = math.radians(span_deg) / 2
    # ángulo medido desde la vertical hacia arriba
    ang = math.atan2(dx, -dy)
    if abs(math.hypot(dx, dy) - r) <= w / 2 and abs(ang) <= half:
        return True
    # capuchas redondas en las dos puntas
    for sign in (-1, 1):
        ex = cx + r * math.sin(sign * half)
        ey = cy - r * math.cos(sign * half)
        if math.hypot(fx - ex, fy - ey) <= w / 2:
            return True
    return False


def inside(poly, x, y):
    """point-in-polygon por cruce de rayos"""
    n, c = len(poly), False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi:
            c = not c
        j = i
    return c


def draw(size):
    """Dibuja el icono a `size` px con antialiasing por supermuestreo 3×3."""
    s = size
    px = [[None for _ in range(s)] for _ in range(s)]

    corner = s * 0.22
    star = seven_star(s * 0.5, s * 0.53, s * 0.30)
    stem_x0, stem_x1 = s * 0.5 - s * 0.037, s * 0.5 + s * 0.037
    stem_y0, stem_y1 = s * 0.62, s * 0.90
    hole_r = s * 0.062
    arc_cx, arc_cy, arc_r, arc_w = s * 0.5, s * 0.40, s * 0.30, s * 0.058

    for y in range(s):
        for x in range(s):
            hits_bg = hits_mark = hits_hole = 0
            for sy in range(3):
                for sx in range(3):
                    fx, fy = x + (sx + 0.5) / 3, y + (sy + 0.5) / 3
                    dx = max(corner - fx, fx - (s - corner), 0)
                    dy = max(corner - fy, fy - (s - corner), 0)
                    if dx * dx + dy * dy > corner * corner:
                        continue
                    hits_bg += 1
                    in_stem = stem_x0 <= fx <= stem_x1 and stem_y0 <= fy <= stem_y1
                    if in_stem or inside(star, fx, fy) or on_arc(fx, fy, arc_cx, arc_cy, arc_r, arc_w):
                        hits_mark += 1
                        if (fx - s * 0.5) ** 2 + (fy - s * 0.53) ** 2 < hole_r * hole_r:
                            hits_hole += 1
            if hits_bg == 0:
                px[y][x] = None
                continue
            bg_a = hits_bg / 9
            mark_a = (hits_mark - hits_hole) / 9
            col = tuple(round(PAPER[i] * (1 - mark_a) + AMBER[i] * mark_a) for i in range(3))
            px[y][x] = (col, bg_a)
    return px


def write_png(path, px):
    s = len(px)
    raw = b""
    for row in px:
        raw += b"\x00"
        for cell in row:
            if cell is None:
                raw += bytes((0, 0, 0, 0))
            else:
                (r, g, b), a = cell
                raw += bytes((r, g, b, round(a * 255)))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", s, s, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def write_ico(path, png_paths):
    """ICO moderno: cada imagen embebida como PNG (Vista+)"""
    entries, blobs, offset = [], [], 6 + 16 * len(png_paths)
    for p in png_paths:
        data = open(p, "rb").read()
        size = int(os.path.basename(p).split("-")[1].split(".")[0])
        entries.append(
            struct.pack(
                "<BBBBHHII",
                0 if size >= 256 else size,
                0 if size >= 256 else size,
                0, 0, 1, 32, len(data), offset,
            )
        )
        blobs.append(data)
        offset += len(data)
    with open(path, "wb") as f:
        f.write(struct.pack("<HHH", 0, 1, len(png_paths)))
        for e in entries:
            f.write(e)
        for b in blobs:
            f.write(b)


def main():
    os.makedirs(OUT, exist_ok=True)
    sizes = [16, 32, 48, 64, 128, 256, 512, 1024]
    made = {}
    for s in sizes:
        p = os.path.join(OUT, f"seshat-{s}.png")
        write_png(p, draw(s))
        made[s] = p
        print(f"  {s}×{s}")

    # ── .icns para macOS (iconutil viene con el sistema) ──
    iconset = os.path.join(OUT, "seshat.iconset")
    os.makedirs(iconset, exist_ok=True)
    pairs = [
        (16, "icon_16x16.png"), (32, "icon_16x16@2x.png"),
        (32, "icon_32x32.png"), (64, "icon_32x32@2x.png"),
        (128, "icon_128x128.png"), (256, "icon_128x128@2x.png"),
        (256, "icon_256x256.png"), (512, "icon_256x256@2x.png"),
        (512, "icon_512x512.png"), (1024, "icon_512x512@2x.png"),
    ]
    for s, name in pairs:
        with open(os.path.join(iconset, name), "wb") as dst:
            dst.write(open(made[s], "rb").read())
    icns = os.path.join(OUT, "seshat.icns")
    try:
        subprocess.run(["iconutil", "-c", "icns", iconset, "-o", icns], check=True)
        print("  seshat.icns")
    except Exception as e:  # noqa: BLE001 — en Linux/CI no hay iconutil
        print(f"  (sin .icns: {e})", file=sys.stderr)

    # ── .ico para Windows ──
    write_ico(os.path.join(OUT, "seshat.ico"), [made[s] for s in (16, 32, 48, 64, 128, 256)])
    print("  seshat.ico")


if __name__ == "__main__":
    main()
