# Mocks social cards as link previews: a desktop feed card (500px, X/LinkedIn)
# and a phone-width card (300px), each with the domain and title underneath.
#   python3 scripts/cards_preview.py
from PIL import Image, ImageDraw

D = "out/thumbs/"
cards = ["CardEditorial", "CardVideo", "CardNumbers"]
TITLE = "How We Made Our Explainer Video in Code (a Case Study on Ourselves)"
pad = 30
sheet = Image.new("RGB", (pad + len(cards) * (500 + 300 + pad * 2), 430), "#15181d")
d = ImageDraw.Draw(sheet)
x = pad
for c in cards:
    d.text((x, 8), c, fill="#9aa0a6")
    for w in (500, 300):
        h = round(w * 630 / 1200)
        im = Image.open(D + c + ".jpg").convert("RGB").resize((w, h), Image.LANCZOS)
        d.rounded_rectangle((x - 1, 29, x + w, 30 + h + 58), radius=12, outline="#2f3336", fill="#000000")
        sheet.paste(im, (x, 30))
        d.text((x + 10, 30 + h + 10), "seopage.com", fill="#71767b")
        d.text((x + 10, 30 + h + 30), TITLE[: int(w / 6.3)] + ("…" if len(TITLE) > w / 6.3 else ""), fill="#e7e9ea")
        x += w + pad
    x += pad
sheet.save(D + "cards-preview.jpg", quality=92)
print("ok")
