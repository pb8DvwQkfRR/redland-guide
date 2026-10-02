# 从官方 10/1「限定 PIN 全图鉴」原图（3024×4032）抠单枚 PIN。
# 文件：_roster/01.img = 翻身时空港(A区47) / 02 = 黄金海岸线(B区21) / 03 = 重生试炼场(C区20)
#      04 = NPC(6) / 05 = 老玩家(1) / 06 = 夜光 / 07 = 冒险者拼图(3)
# 用法：
#   python scripts/roster-pins.py sheet <zone>   # 出带行列号的联络表，供人工对号
#   python scripts/roster-pins.py crop <zone> <r,c> <out.jpg>
import sys, os
from PIL import Image, ImageDraw
import numpy as np
from scipy import ndimage as ndi

Image.MAX_IMAGE_PIXELS = None
ROSTER = 'scripts/_roster_src'
ZONES = {'A': ('01', 'orange'), 'B': ('02', 'yellow'), 'C': ('03', 'blue'),
         'npc': ('04', 'red'), 'puzzle': ('07', 'mix')}

def detect(zone):
    src, kind = ZONES[zone]
    im = Image.open(f'{ROSTER}/{src}.img').convert('RGB')
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    if kind == 'orange':
        m = (r > 185) & (r - b > 70) & (g > 60) & (g < 190)
    elif kind == 'yellow':
        m = (r > 180) & (g > 175) & (b < 170) & (abs(r - g) < 55)
    elif kind == 'blue':
        m = (b > 140) & (b - r > 45) & (g > 90)
    else:  # red / mix：用「非背景」兜底
        m = (np.abs(r - 240) > 25) | (np.abs(g - 240) > 25) | (np.abs(b - 245) > 25)
    lab, n = ndi.label(m)
    sizes = ndi.sum(m, lab, range(1, n + 1))
    boxes = []
    for i, s in enumerate(sizes, 1):
        if s < 15000:
            continue
        ys, xs = np.where(lab == i)
        w, h = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
        if w < 60 or h < 60:      # 排除小 logo / 碎块
            continue
        boxes.append((int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())))
    boxes.sort(key=lambda c: (round(c[1] / 250), c[0]))
    rows, cur = [], []
    for c in boxes:
        if cur and c[1] - cur[-1][1] > 130:
            rows.append(cur); cur = []
        cur.append(c)
    if cur:
        rows.append(cur)
    return im, [(ri + 1, ci + 1, c) for ri, row in enumerate(rows) for ci, c in enumerate(row)]

if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'grid'
    if cmd == 'grid':
        for z in ['A', 'B', 'C']:
            _, cells = detect(z)
            rowsn = max(r for r, _, _ in cells)
            print(f'== {z} 区（{len(cells)} 枚）==')
            for r in range(1, rowsn + 1):
                row = [(c, box) for rr, c, box in cells if rr == r]
                print(f'  第 {r} 行（{len(row)} 枚）: ' + '  '.join(f'{r},{c}@x{box[0]}' for c, box in row))
    elif cmd == 'sheet':
        zone = sys.argv[2]
        im, cells = detect(zone)
        S = 132               # 每格缩略图边长
        cols = max(c for _, c, _ in cells)
        rowsn = max(r for r, _, _ in cells)
        pad = 30
        canvas = Image.new('RGB', (cols * (S + pad) + pad, rowsn * (S + pad + 18) + pad), 'white')
        d = ImageDraw.Draw(canvas)
        for r, c, box in cells:
            crop = im.crop(box).resize((S, S), Image.LANCZOS)
            x = pad + (c - 1) * (S + pad)
            y = pad + (r - 1) * (S + pad + 18)
            canvas.paste(crop, (x, y))
            d.text((x + 2, y + S + 2), f'{r},{c}', fill=(200, 0, 0))
        out = f'_sheet_{zone}.png'
        canvas.save(out)
        print(f'{zone}: {len(cells)} 枚 -> {out} {canvas.size}')
    elif cmd == 'crop':
        zone, rc, out = sys.argv[2], sys.argv[3], sys.argv[4]
        r, c = [int(x) for x in rc.split(',')]
        im, cells = detect(zone)
        for cr, cc, box in cells:
            if (cr, cc) == (r, c):
                pad = 2
                crop = im.crop((box[0] - pad, box[1] - pad, box[2] + pad + 1, box[3] + pad + 1))
                if out != '-':
                    crop.save(out, 'JPEG', quality=92)
                print(f'{zone} ({r},{c}) -> {crop.size}')
                break
        else:
            print('没有这一格')
