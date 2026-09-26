# Tiles stills into one contact sheet: python3 scripts/sheet.py out/sheet.jpeg 7 a.jpeg b.jpeg ...
import sys
from PIL import Image, ImageDraw

out, cols, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(f) for f in files]
w = 300
h = int(ims[0].height * w / ims[0].width)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (w + 6), rows * (h + 26)), "white")
d = ImageDraw.Draw(sheet)
for i, (f, im) in enumerate(zip(files, ims)):
    x, y = (i % cols) * (w + 6), (i // cols) * (h + 26)
    sheet.paste(im.resize((w, h)), (x, y + 20))
    d.text((x + 4, y + 4), f.split("-")[-1].replace(".jpeg", "s"), fill="black")
sheet.save(out, quality=85)
