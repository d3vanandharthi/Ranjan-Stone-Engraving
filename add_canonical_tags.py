import re
from pathlib import Path

# Define pages and their canonical URLs
pages = {
    'index.html': 'https://ranjanengravings.com/',
    'about.html': 'https://ranjanengravings.com/about.html',
    'services.html': 'https://ranjanengravings.com/services.html',
    'memorials-gravestones-goa.html': 'https://ranjanengravings.com/memorials-gravestones-goa.html',
    'name-plates-house-signs-goa.html': 'https://ranjanengravings.com/name-plates-house-signs-goa.html',
    'nri-overseas-stone-services.html': 'https://ranjanengravings.com/nri-overseas-stone-services.html',
    'gallery.html': 'https://ranjanengravings.com/gallery.html',
    'blog.html': 'https://ranjanengravings.com/blog.html',
    'contact.html': 'https://ranjanengravings.com/contact.html',
    'service-detail.html': 'https://ranjanengravings.com/service-detail.html',
}

base_path = Path(r'c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings')

for filename, canonical_url in pages.items():
    filepath = base_path / filename
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if canonical tag already exists
        if 'rel="canonical"' in content:
            print(f"⚠ {filename}: Canonical tag already exists, skipping")
            continue
        
        # Find the meta description tag and add canonical after it
        canonical_tag = f'    <link rel="canonical" href="{canonical_url}">'
        
        # Pattern to find meta description
        pattern = r'(<meta name="description"[^>]*>)'
        
        if re.search(pattern, content):
            # Add canonical tag after meta description
            new_content = re.sub(
                pattern,
                r'\1\n' + canonical_tag,
                content,
                count=1
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✓ {filename}: Added canonical tag")
        else:
            print(f"✗ {filename}: Could not find meta description tag")
            
    except Exception as e:
        print(f"✗ {filename}: Error - {e}")

print("\n✓ Canonical tags update complete!")
