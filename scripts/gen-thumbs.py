# -*- coding: utf-8 -*-
# 生成列表 / 网格用的小缩略图：public/img/<路径>.jpg → public/img/_t/<路径>.jpg（宽 400px，JPEG q72）
#
# 为什么：页面上的小图（首页 96px 游荡 IP 图、详情页 3 列原图网格、花车 / 舞台缩略图）原来直接加载 810 宽的原图（100–200KB/张），
# 手机上首屏和详情页都很慢（用户 9/28）。缩略图每张约 15–30KB；点开灯箱仍加载原图。
#
# 用法：python scripts/gen-thumbs.py        —— 只处理新增 / 改过的图（按修改时间），加了新图后跑一次再提交
# 跳过：img/pins（本身就是 320px 缩略图）、img/_t 自己、png（花车抠图要透明底）、宽度本来就 ≤ 400 的图。
# 漏跑也不会坏：src/main.js 里有全局兜底，缩略图 404 时自动换回原图。
import os, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')
OUT = os.path.join(ROOT, '_t')
W = 400
made = skipped = 0
for dp, dn, fn in os.walk(ROOT):
    rel_dir = os.path.relpath(dp, ROOT)
    if rel_dir.startswith('_t') or rel_dir.startswith('pins'):
        continue
    for f in fn:
        if not f.lower().endswith('.jpg'):
            continue
        src = os.path.join(dp, f)
        dst = os.path.join(OUT, rel_dir, f)
        if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
            skipped += 1
            continue
        im = Image.open(src)
        if im.width <= W:
            continue
        im = im.convert('RGB').resize((W, round(im.height * W / im.width)), Image.LANCZOS)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        im.save(dst, 'JPEG', quality=72, optimize=True, progressive=True)
        made += 1
print(f'thumbs: {made} new, {skipped} up to date')
