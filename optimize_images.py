import os
import sys
from PIL import Image

# Directories to scan
TARGET_DIRS = ['images']
QUALITY_JPEG = 80
QUALITY_WEBP = 80
OPTIMIZE_PNG = True

def get_size_format(b):
    if b < 1024:
        return f"{b} B"
    elif b < 1024*1024:
        return f"{b/1024:.2f} KB"
    else:
        return f"{b/1024/1024:.2f} MB"

def optimize_images():
    total_saved = 0
    
    for folder in TARGET_DIRS:
        if not os.path.exists(folder):
            print(f"Directory not found: {folder}")
            continue
            
        print(f"Scanning {folder}...")
        
        for filename in os.listdir(folder):
            filepath = os.path.join(folder, filename)
            
            if not os.path.isfile(filepath):
                continue
                
            ext = os.path.splitext(filename)[1].lower()
            
            if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
                continue
                
            # Skip favicon logic for now (usually sensitive)
            if 'favicon' in filename:
                continue

            try:
                original_size = os.path.getsize(filepath)
                
                with Image.open(filepath) as img:
                    # Strip metadata
                    data = list(img.getdata())
                    img_clean = Image.new(img.mode, img.size)
                    img_clean.putdata(data)
                    
                    # Re-save based on extension
                    if ext in ['.jpg', '.jpeg']:
                        img.save(filepath, "JPEG", optimize=True, quality=QUALITY_JPEG)
                    elif ext == '.png':
                        # PNG optimization is tricky with PIL, strictly speaking use optimize=True
                        # PngImagePlugin has an optimize flag
                        img.save(filepath, "PNG", optimize=True)
                    elif ext == '.webp':
                        img.save(filepath, "WEBP", quality=QUALITY_WEBP)
                        
                new_size = os.path.getsize(filepath)
                saved = original_size - new_size
                
                if saved > 0:
                    total_saved += saved
                    print(f"[OPTIMIZED] {filename}: {get_size_format(original_size)} -> {get_size_format(new_size)} (Saved {get_size_format(saved)})")
                else:
                    print(f"[SKIPPED] {filename}: No reduction possible or already optimized.")

            except Exception as e:
                print(f"[ERROR] Could not optimize {filename}: {e}")

    print("-" * 40)
    print(f"Total Space Saved: {get_size_format(total_saved)}")

if __name__ == "__main__":
    optimize_images()
