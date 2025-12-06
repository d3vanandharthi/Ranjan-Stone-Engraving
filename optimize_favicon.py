#!/usr/bin/env python3
"""
Favicon optimizer script
Resizes favicon.png from 702KB to proper dimensions (32x32) for web use
"""

from PIL import Image
import os

# Paths
input_path = "images/favicon.png"
output_path = "images/favicon_optimized.png"
backup_path = "images/favicon_original.png"

# Load the original image
print(f"Loading {input_path}...")
img = Image.open(input_path)
print(f"Original size: {img.size}")
original_size = os.path.getsize(input_path)
print(f"Original file size: {original_size / 1024:.2f} KB")

# Backup original
print(f"Creating backup at {backup_path}...")
img.save(backup_path, "PNG", optimize=False)

# Resize to proper favicon size (32x32 is standard for web)
print("Resizing to 32x32...")
img_resized = img.resize((32, 32), Image.Resampling.LANCZOS)

# Save optimized version with maximum compression
print(f"Saving optimized version to {output_path}...")
img_resized.save(output_path, "PNG", optimize=True, compress_level=9)

# Check new size
new_size = os.path.getsize(output_path)
print(f"New file size: {new_size / 1024:.2f} KB")
print(f"Size reduction: {((original_size - new_size) / original_size * 100):.1f}%")

# Replace original with optimized
print(f"Replacing {input_path} with optimized version...")
os.replace(output_path, input_path)

print("✓ Favicon optimization complete!")
print(f"  Original: {original_size / 1024:.2f} KB → New: {new_size / 1024:.2f} KB")
