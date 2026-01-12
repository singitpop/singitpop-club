import os
from PIL import Image

def remove_black_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            # Heuristic: If pixel is very dark (close to black), make it transparent
            # Also scale alpha based on brightness to keep the "glow"
            
            r, g, b, a = item
            brightness = (r + g + b) / 3
            
            if brightness < 15: # Threshold for "black"
                 newData.append((r, g, b, 0)) # Fully transparent
            else:
                # For glowing neon, we want to keep colors but transparency acts as the "glow" against other backgrounds?
                # Actually, simpler: just remove the hard black box.
                # Let's use a smoother alpha transition for the edges (optional), 
                # but for now, hard threshold might be safer to ensure "no background".
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

icons = [
    ("public/images/icons/music-note.png", "public/images/icons/music-note-clean.png"),
    ("public/images/icons/vinyl.png", "public/images/icons/vinyl-clean.png"),
    ("public/images/icons/trending.png", "public/images/icons/trending-clean.png"),
    ("public/images/icons/diamond.png", "public/images/icons/diamond-clean.png")
]

for inp, out in icons:
    if os.path.exists(inp):
        remove_black_background(inp, out)
    else:
        print(f"File not found: {inp}")
