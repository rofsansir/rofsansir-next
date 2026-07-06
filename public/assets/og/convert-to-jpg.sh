#!/bin/bash

# Convert SVG OG images to JPG for better WhatsApp compatibility
# Requires: ImageMagick or similar tool

echo "Converting SVG OG images to JPG format..."

# Check if convert command exists
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Installing..."
    # For macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    # For Ubuntu/Debian
    else
        sudo apt-get install imagemagick
    fi
fi

# Convert each SVG to JPG
for file in /Users/yusufpiyas/projects/www/public/assets/og/*-og.svg; do
    basename=$(basename "$file" .svg)
    echo "Converting $basename.svg to $basename.jpg..."

    convert \
        -background "#344871" \
        -alpha remove \
        "$file" \
        "/Users/yusufpiyas/projects/www/public/assets/og/$basename.jpg"
done

echo "Conversion complete!"
echo "JPG images are ready in /public/assets/og/"
