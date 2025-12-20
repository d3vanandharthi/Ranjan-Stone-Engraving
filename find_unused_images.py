import os
import glob

IMAGE_DIR = 'images'
SEARCH_EXTS = ['.html', '.css', '.js']
SEARCH_DIRS = ['.', 'css', 'js']

def find_unused():
    # Gather all potential code files
    code_files = []
    for d in SEARCH_DIRS:
        for ext in SEARCH_EXTS:
            code_files.extend(glob.glob(os.path.join(d, f"*{ext}")))
    
    print(f"Scanning {len(code_files)} code files...")
    
    # Read all code into memory (it's small project)
    code_content = ""
    for fpath in code_files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            code_content += f.read()
            
    # Iterate images
    images = os.listdir(IMAGE_DIR)
    unused_count = 0
    space_saved = 0
    
    print("-" * 40)
    for img in images:
        if not os.path.isfile(os.path.join(IMAGE_DIR, img)):
            continue
            
        if img in code_content:
            # Find which file contained it for debugging
            # A bit inefficient but fine for this script
            found_in = []
            for fpath in code_files:
                with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                    if img in f.read():
                        found_in.append(fpath)
            print(f"[USED] {img} in {found_in}")
        else:
            # Potential Unused
            # Check for fallback scenarios or partial matches?
            # e.g. "hero" -> "hero.png" match?
            # But usually exact filename is referenced.
            
            # Special check for 'favicon' which might be implicit
            if 'favicon' in img:
                continue
                
            size = os.path.getsize(os.path.join(IMAGE_DIR, img))
            print(f"[UNUSED] {img} ({size/1024:.2f} KB)")
            unused_count += 1
            space_saved += size

    print("-" * 40)
    print(f"Total Unused Images: {unused_count}")
    print(f"Potential Space Savings: {space_saved/1024/1024:.2f} MB")

if __name__ == "__main__":
    find_unused()
