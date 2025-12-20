import os
from pathlib import Path

base_path = Path(r'c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings')
images_dir = base_path / 'images'

print("=" * 60)
print("IMAGE OPTIMIZATION AUDIT REPORT")
print("=" * 60)
print()

# Get all image files
image_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
images = []

for ext in image_extensions:
    images.extend(list(images_dir.glob(f'*{ext}')))
    images.extend(list(images_dir.glob(f'*{ext.upper()}')))

if not images:
    print("No images found in /images/ directory")
    exit()

print(f"Total images found: {len(images)}\n")

# Analysis
issues = []
webp_count = 0
large_files = []
poor_names = []

for img_path in images:
    file_size = img_path.stat().st_size
    file_size_kb = file_size / 1024
    file_name = img_path.name
    file_ext = img_path.suffix.lower()
    
    # Check format
    if file_ext == '.webp':
        webp_count += 1
    
    # Check size
    if file_size_kb > 100:
        large_files.append((file_name, f"{file_size_kb:.1f} KB"))
    
    # Check naming (basic heuristic)
    if any(x in file_name.lower() for x in ['img_', 'image', 'dsc', 'photo', '001', '002', '003']):
        poor_names.append(file_name)

print("📊 FORMAT ANALYSIS")
print("-" * 60)
print(f"WebP images: {webp_count}/{len(images)} ({webp_count/len(images)*100:.1f}%)")
print(f"Other formats: {len(images) - webp_count}")
if webp_count < len(images):
    print("⚠ Recommendation: Convert remaining images to WebP for better performance")
print()

print("📏 SIZE ANALYSIS")
print("-" * 60)
if large_files:
    print(f"Images over 100KB: {len(large_files)}")
    for name, size in large_files[:10]:  # Show first 10
        print(f"  • {name}: {size}")
    if len(large_files) > 10:
        print(f"  ... and {len(large_files) - 10} more")
    print("⚠ Recommendation: Compress these images to under 100KB")
else:
    print("✓ All images are under 100KB - Good!")
print()

print("📝 NAMING ANALYSIS")
print("-" * 60)
if poor_names:
    print(f"Images with non-descriptive names: {len(poor_names)}")
    for name in poor_names[:10]:  # Show first 10
        print(f"  • {name}")
    if len(poor_names) > 10:
        print(f"  ... and {len(poor_names) - 10} more")
    print("⚠ Recommendation: Rename to descriptive names like 'granite-memorial-stone-goa.webp'")
else:
    print("✓ All images have descriptive names - Good!")
print()

print("=" * 60)
print("SUMMARY")
print("=" * 60)
total_issues = len(large_files) + len(poor_names) + (len(images) - webp_count)
if total_issues == 0:
    print("✓ All images are optimized! No issues found.")
else:
    print(f"⚠ Found {total_issues} optimization opportunities")
    print("\nNext steps:")
    if webp_count < len(images):
        print(f"  1. Convert {len(images) - webp_count} images to WebP format")
    if large_files:
        print(f"  2. Compress {len(large_files)} images to reduce file size")
    if poor_names:
        print(f"  3. Rename {len(poor_names)} images with descriptive names")

print("\n" + "=" * 60)
