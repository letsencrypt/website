#!/usr/bin/env bash
#
# Checks for inline style= attributes in source files.
# Inline styles are not allowed because they require 'unsafe-inline' in the
# Content-Security-Policy style-src directive.
#
# Excluded: SVG files (style attrs are standard in SVG), vendor/third-party
# files, and the legacy le-2021 theme.

set -euo pipefail

FOUND=0

while IFS= read -r file; do
  # Skip SVG files — inline styles are standard SVG
  [[ "$file" == *.svg ]] && continue
  # Skip vendor / third-party files
  [[ "$file" == */node_modules/* ]] && continue
  [[ "$file" == */fontawesome-free-* ]] && continue
  [[ "$file" == */plotly-min.js ]] && continue
  # Skip legacy theme
  [[ "$file" == */themes/le-2021/* ]] && continue

  FOUND=1
  echo "  $file"
done < <(grep -rl 'style=' \
  --include='*.html' \
  --include='*.md' \
  content/ themes/le-2025/ 2>/dev/null || true)

if [ "$FOUND" -eq 1 ]; then
  echo ""
  echo "ERROR: Inline styles are not allowed on this site."
  echo ""
  echo "The site uses a Content-Security-Policy with style-src 'self', which blocks"
  echo "inline style= attributes. Adding them would require 'unsafe-inline', weakening"
  echo "the security policy."
  echo ""
  echo "Instead, use Tailwind utility classes or add CSS to the stylesheet at:"
  echo "  themes/le-2025/assets/css/le-2025-theme-input.css"
  echo ""
  echo "See: https://github.com/letsencrypt/website/issues/950"
  echo "     https://github.com/letsencrypt/website/pull/2151"
  exit 1
fi
