from PIL import Image
import os

source_path = "images/favicon_original.png"
dest_dir = "images"

try:
    with Image.open(source_path) as img:
        # 1. Create 192x192 PNG for Google Search / Android
        icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        icon_192.save(os.path.join(dest_dir, "icon-192.png"))
        print("Created images/icon-192.png")

        # 2. Create proper favicon.ico (multi-size)
        img.save(os.path.join(dest_dir, "favicon.ico"), format='ICO', sizes=[(32,32), (16,16), (48,48)])
        print("Created images/favicon.ico")
        
except Exception as e:
    print(f"Error: {e}")
