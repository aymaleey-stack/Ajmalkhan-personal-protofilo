from PIL import Image

img_path = 'Gemini_Generated_Image_7vor0k7vor0k7vor.png'
img = Image.open(img_path).convert("RGBA")
data = img.getdata()

new_data = []
for item in data:
    # If the pixel is very close to white (allow some tolerance for compression artifact)
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0)) # Transparent
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(img_path, "PNG")
print("Background removed successfully.")
