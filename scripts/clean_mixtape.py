import os
from PIL import Image

def remove_black_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            brightness = (r + g + b) / 3

            # Aggressive threshold for "black" to ensure transparency
            if brightness < 15: 
                 newData.append((0, 0, 0, 0)) # Fully transparent
            else:
                # Optional: Soften edges? For now, keep as is.
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

# Process the new mixtape icon
if __name__ == "__main__":
    input_file = "/Users/garybirrell/.gemini/antigravity/brain/bfe0367d-5ecf-42bb-889d-5bcf011d2766/mixtape_black_bg_1768348551906.png"
    output_file = "/Users/garybirrell/Desktop/Singitpop/website/public/images/icons/mixtape-gradient.png"
    
    remove_black_background(input_file, output_file)
