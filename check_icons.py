from PIL import Image
import os

files = ["images/favicon.png", "images/favicon_original.png"]
for f in files:
    if os.path.exists(f):
        try:
            with Image.open(f) as img:
                print(f"{f}: {img.size}")
        except Exception as e:
            print(f"{f}: Error {e}")
    else:
        print(f"{f}: Not found")
