#!/usr/bin/env python3
"""Generate light/dark logo assets with disc removed for page background blending."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_LIGHT = ROOT / 'pucora.png'
SRC_DARK = ROOT / 'pucora_black.png'
OUT_LIGHT = ROOT / 'public' / 'pucora-logo.png'
OUT_DARK = ROOT / 'public' / 'pucora-logo-dark.png'


def remove_light_disc(pixels, w: int, h: int, cx: float, cy: float, max_r: float) -> None:
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            dist = math.hypot(x - cx, y - cy)
            if dist > max_r * 0.98:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            sat = max(r, g, b) - min(r, g, b)
            br = (r + g + b) / 3
            is_disc = sat < 30 and br > 115
            is_emblem = sat > 45 or br < 90 or br > 235
            if is_disc and not is_emblem:
                pixels[x, y] = (r, g, b, 0)


def remove_dark_disc(pixels, w: int, h: int, cx: float, cy: float, max_r: float) -> None:
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            dist = math.hypot(x - cx, y - cy)
            if dist > max_r * 0.98:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            sat = max(r, g, b) - min(r, g, b)
            br = (r + g + b) / 3
            is_disc = br < 105 and sat < 78
            is_emblem = sat >= 78 or br >= 130 or (sat >= 50 and br >= 105)
            if is_disc and not is_emblem:
                pixels[x, y] = (r, g, b, 0)


def main() -> None:
    light_img = Image.open(SRC_LIGHT).convert('RGBA')
    lw, lh = light_img.size
    lcx, lcy = lw / 2, lh / 2
    lmax_r = min(lw, lh) / 2
    remove_light_disc(light_img.load(), lw, lh, lcx, lcy, lmax_r)
    light_img.save(OUT_LIGHT)

    dark_img = Image.open(SRC_DARK).convert('RGBA')
    dw, dh = dark_img.size
    dcx, dcy = dw / 2, dh / 2
    dmax_r = min(dw, dh) / 2
    remove_dark_disc(dark_img.load(), dw, dh, dcx, dcy, dmax_r)
    dark_img.save(OUT_DARK)

    print(f'Wrote {OUT_LIGHT.name} from {SRC_LIGHT.name}')
    print(f'Wrote {OUT_DARK.name} from {SRC_DARK.name}')


if __name__ == '__main__':
    main()
