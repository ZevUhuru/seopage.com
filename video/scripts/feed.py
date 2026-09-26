# Mocks the thumbnails the way people meet them: a phone feed card (~170px
# wide) and a desktop sidebar card (~360px), each with YouTube's duration badge.
#   python3 scripts/feed.py out/thumbs/feed.jpeg out/thumbs/A.jpg out/thumbs/B.jpg ...
import sys
from PIL import Image, ImageDraw

out, files = sys.argv[1], sys.argv[2:]
sizes = [360, 170]
pad = 24
col_w = sizes[0] + pad + sizes[1] + pad
sheet = Image.new("RGB", (pad + len(files) * col_w, pad + int(sizes[0] * 9 / 16) + 70), "#0f0f0f")
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    x = pad + i * col_w
    d.text((x, 4), f.split("/")[-1].replace(".jpg", ""), fill="#aaaaaa")
    for w in sizes:
        h = int(w * 9 / 16)
        im = Image.open(f).convert("RGB").resize((w, h), Image.LANCZOS)
        sheet.paste(im, (x, pad))
        # duration badge, as YouTube draws it
        bw, bh = max(28, w // 9), max(12, w // 22)
        d.rectangle((x + w - bw - 4, pad + h - bh - 4, x + w - 4, pad + h - 4), fill="#000000")
        d.text((x + w - bw - 1, pad + h - bh - 3), "1:15", fill="white")
        d.text((x, pad + h + 6), "SEO landing pages AI will cite", fill="#f1f1f1")
        x += w + pad
sheet.save(out, quality=92)
