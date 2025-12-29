#!/bin/bash

# Image Conversion Script for WebP Format
# Run this after installing cwebp or imagemagick
#
# Installation:
#   Ubuntu/Debian: sudo apt-get install webp
#   macOS: brew install webp

# Check if cwebp is available
if ! command -v cwebp &> /dev/null; then
    echo "cwebp is not installed. Please install webp package:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  macOS: brew install webp"
    exit 1
fi

# Convert images in portfolio
echo "Converting portfolio images..."
for img in img/portfolio/*.{jpg,jpg,png,JPG,PNG}; do
    [ -f "$img" ] || continue
    filename=$(basename "$img")
    name="${filename%.*}"
    if [ ! -f "img/portfolio/${name}.webp" ]; then
        echo "Converting $img to ${name}.webp"
        cwebp -q 80 "$img" -o "img/portfolio/${name}.webp"
    fi
done

# Convert images in gallery
echo "Converting gallery images..."
find img/Gallery -type f \( -name "*.jpg" -o -name "*.jpg" -o -name "*.png" -o -name "*.PNG" \) | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    dir=$(dirname "$img")
    if [ ! -f "${dir}/${name}.webp" ]; then
        echo "Converting $img to ${name}.webp"
        cwebp -q 80 "$img" -o "${dir}/${name}.webp"
    fi
done

# Convert images in certificates
echo "Converting certificate images..."
find img/Certificates_images -type f \( -name "*.jpg" -o -name "*.jpg" -o -name "*.png" -o -name "*.PNG" \) | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    dir=$(dirname "$img")
    if [ ! -f "${dir}/${name}.webp" ]; then
        echo "Converting $img to ${name}.webp"
        cwebp -q 80 "$img" -o "${dir}/${name}.webp"
    fi
done

echo "Image conversion complete!"
echo "Note: You will need to update HTML references to use .webp files."
echo "Add <picture> elements for fallback support:"
echo ""
echo '<picture>'
echo '  <source srcset="image.webp" type="image/webp">'
echo '  <img src="image.jpg" alt="Description">'
echo '</picture>'
