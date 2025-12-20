import re
from pathlib import Path

base_path = Path(r'c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings')

# Define pages with their specific titles and descriptions
pages = {
    'index.html': {
        'url': 'https://ranjanengravings.com/',
        'title': 'Ranjan Stone Engravings - Memorial Stones & Name Plates in Goa',
        'description': 'Expert stone engraving services in Mapusa, Goa. Custom granite memorials, name plates, and house signs. Serving all Goa with doorstep delivery.'
    },
    'about.html': {
        'url': 'https://ranjanengravings.com/about.html',
        'title': 'About Ranjan Stone Engravings - 25+ Years in Goa',
        'description': 'Family-run stone engraving workshop in Mapusa since 1998. Specializing in hand-carved granite memorials and custom name plates across Goa.'
    },
    'services.html': {
        'url': 'https://ranjanengravings.com/services.html',
        'title': 'Stone Engraving Services - Memorials, Name Plates & More',
        'description': 'Professional stone engraving services: granite memorials, house name plates, church plaques, and custom engravings. Free consultation in Goa.'
    },
    'memorials-gravestones-goa.html': {
        'url': 'https://ranjanengravings.com/memorials-gravestones-goa.html',
        'title': 'Memorial Stones & Gravestones in Goa - Ranjan Engravings',
        'description': 'Custom granite memorial stones and gravestones in Goa. Hand-carved with care for churches across Mapusa, Panjim, Margao. Elderly-friendly service.'
    },
    'name-plates-house-signs-goa.html': {
        'url': 'https://ranjanengravings.com/name-plates-house-signs-goa.html',
        'title': 'Custom Name Plates & House Signs Goa - Granite & Marble',
        'description': 'Premium granite and marble name plates for homes in Goa. Custom designs, fast delivery across North & South Goa. 100+ designs available.'
    },
    'nri-overseas-stone-services.html': {
        'url': 'https://ranjanengravings.com/nri-overseas-stone-services.html',
        'title': 'NRI Stone Engraving Services - Order from Abroad for Goa',
        'description': 'NRI-friendly memorial stone services. Order from UK, USA, Middle East for installation in Goa. Photos, video updates, secure payment options.'
    },
    'gallery.html': {
        'url': 'https://ranjanengravings.com/gallery.html',
        'title': 'Gallery - Stone Engraving Work in Goa | Ranjan Engravings',
        'description': 'View our portfolio of granite memorials, name plates, and custom stone engravings across Goa. Real customer projects from Mapusa to Margao.'
    },
    'blog.html': {
        'url': 'https://ranjanengravings.com/blog.html',
        'title': 'Blog - Stone Engraving Tips & Goa Church Guides',
        'description': 'Expert advice on memorial stones, name plate designs, church cemetery regulations in Goa, and stone care tips.'
    },
    'contact.html': {
        'url': 'https://ranjanengravings.com/contact.html',
        'title': 'Contact Ranjan Stone Engravings - Mapusa, Goa',
        'description': 'Visit our workshop in Mapusa or call +91 98225 81297. Free quotes, doorstep delivery across Goa. Open Mon-Sat 9AM-6PM.'
    },
    'service-detail.html': {
        'url': 'https://ranjanengravings.com/service-detail.html',
        'title': 'Service Details - Ranjan Stone Engravings',
        'description': 'Detailed information about our stone engraving services, pricing, and process in Goa.'
    },
}

og_template = '''
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="https://ranjanengravings.com/images/og-image.jpg">
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Ranjan Stone Engravings">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="https://ranjanengravings.com/images/og-image.jpg">'''

for filename, meta in pages.items():
    filepath = base_path / filename
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if OG tags already exist
        if 'property="og:' in content:
            print(f"⚠ {filename}: OG tags already exist, skipping")
            continue
        
        # Create OG tags for this page
        og_tags = og_template.format(
            url=meta['url'],
            title=meta['title'],
            description=meta['description']
        )
        
        # Find canonical tag and add OG tags after it
        pattern = r'(<link rel="canonical"[^>]*>)'
        
        if re.search(pattern, content):
            new_content = re.sub(
                pattern,
                r'\1' + og_tags,
                content,
                count=1
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✓ {filename}: Added OG and Twitter tags")
        else:
            print(f"✗ {filename}: Could not find canonical tag")
            
    except Exception as e:
        print(f"✗ {filename}: Error - {e}")

print("\n✓ Open Graph and Twitter tags update complete!")
