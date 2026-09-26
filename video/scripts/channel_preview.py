# Shows channel art the way YouTube does: profile pictures as circles at
# channel-page (160px), watch-page (98px→48 shown) and comment (36px) sizes;
# banners in full with the all-device safe strip outlined, plus the strip alone
# (what a phone shows).
#   python3 scripts/channel_preview.py
from PIL import Image, ImageDraw

D = "out/thumbs/"
profiles = ["ProfileMark", "ProfileWordmark", "ProfileNora"]
banners = ["BannerType", "BannerNora", "BannerSteps"]


def circle(im, size):
    im = im.resize((size * 4, size * 4), Image.LANCZOS)
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0) + im.size, fill=255)
    out = Image.new("RGB", im.size, "#0f0f0f")
    out.paste(im, (0, 0), mask)
    return out.resize((size, size), Image.LANCZOS)


sheet = Image.new("RGB", (1500, 300), "#0f0f0f")
d = ImageDraw.Draw(sheet)
for i, p in enumerate(profiles):
    x = 30 + i * 490
    d.text((x, 8), p, fill="#aaaaaa")
    im = Image.open(D + p + ".jpg").convert("RGB")
    cx = x
    for s in (160, 48, 36, 24):
        sheet.paste(circle(im, s), (cx, 40 + (160 - s) // 2))
        d.text((cx, 210), f"{s}px", fill="#777777")
        cx += s + 30
sheet.save(D + "profiles-preview.jpg", quality=92)

W = 900
rows = []
for b in banners:
    im = Image.open(D + b + ".jpg").convert("RGB")
    full = im.resize((W, int(W * 1440 / 2560)), Image.LANCZOS)
    k = W / 2560
    dd = ImageDraw.Draw(full)
    dd.rectangle((507 * k, 508 * k, (507 + 1546) * k, (508 + 423) * k), outline="#ff3b3b", width=2)
    phone = im.crop((507, 508, 507 + 1546, 508 + 423)).resize((540, int(540 * 423 / 1546)), Image.LANCZOS)
    rows.append((b, full, phone))
out = Image.new("RGB", (W + 540 + 90, sum(r[1].height + 40 for r in rows) + 20), "#0f0f0f")
d = ImageDraw.Draw(out)
y = 20
for b, full, phone in rows:
    d.text((30, y - 16), b + "   (red: safe on every device)        phone shows only this:", fill="#aaaaaa")
    out.paste(full, (30, y))
    out.paste(phone, (30 + W + 30, y))
    y += full.height + 40
out.save(D + "banners-preview.jpg", quality=92)
print("ok")
