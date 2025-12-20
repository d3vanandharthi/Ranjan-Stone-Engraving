import re
from pathlib import Path

base_path = Path(r'c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings')

# HTML files to update
html_files = [
    'index.html', 'about.html', 'services.html', 'gallery.html', 'blog.html',
    'contact.html', 'memorials-gravestones-goa.html', 'name-plates-house-signs-goa.html',
    'nri-overseas-stone-services.html', 'service-detail.html'
]

# Images that should NOT be lazy loaded (above the fold)
exclude_patterns = [
    'logo',  # Site logo
    'hero',  # Hero images
    'banner',  # Banner images
]

for filename in html_files:
    filepath = base_path / filename
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all img tags that don't already have loading attribute
        img_pattern = r'<img\s+(?![^>]*loading=)([^>]*?)>'
        
        def add_lazy_loading(match):
            img_tag = match.group(0)
            img_content = match.group(1)
            
            # Check if this image should be excluded
            for exclude in exclude_patterns:
                if exclude in img_tag.lower():
                    return img_tag  # Don't modify
            
            # Check if it's in the header (likely above fold)
            # This is a simple heuristic - you might want to refine it
            if 'class="logo"' in img_tag or 'id="logo"' in img_tag:
                return img_tag
            
            # Add loading="lazy" before the closing >
            new_tag = f'<img {img_content} loading="lazy">'
            return new_tag
        
        # Replace img tags
        new_content = re.sub(img_pattern, add_lazy_loading, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Count how many images were updated
            count = len(re.findall(r'loading="lazy"', new_content)) - len(re.findall(r'loading="lazy"', content))
            print(f"✓ {filename}: Added lazy loading to {count} images")
        else:
            print(f"⚠ {filename}: No changes needed (already has lazy loading or no images)")
            
    except Exception as e:
        print(f"✗ {filename}: Error - {e}")

print("\n✓ Lazy loading update complete!")
