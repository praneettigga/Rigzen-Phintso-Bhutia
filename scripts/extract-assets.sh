#!/usr/bin/env bash
# Extracts website images from the source portfolio PDF.
#
#   npm run assets            (defaults to docs/references/Rigzen_Internship_Portfolio.pdf)
#   bash scripts/extract-assets.sh path/to/portfolio.pdf
#
# Requires poppler-utils (pdftoppm, pdfimages) and ImageMagick 7 (magick).
# Outputs go to src/assets/ and are committed; the PDF itself is git-ignored.
#
# Crop rectangles are written in a 2000px-wide reference frame of each PDF page
# (x0 y0 x1 y1) and scaled to the 200dpi render, so they are easy to tweak by eye.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PDF="${1:-$ROOT/docs/references/Rigzen_Internship_Portfolio.pdf}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
OUT="$ROOT/src/assets"
DPI=200
MAXW=3200

[[ -f "$PDF" ]] || { echo "PDF not found: $PDF" >&2; exit 1; }
mkdir -p "$OUT"/{brand,projects/bsten-pa,projects/la-khung,projects/sdod-khang,projects/working-drawing,projects/miscellaneous}

echo "→ rendering pages at ${DPI}dpi"
pdftoppm -r "$DPI" -png "$PDF" "$WORK/p"
echo "→ extracting embedded raster images"
for p in 2 7 11 15 16 17 18; do pdfimages -f "$p" -l "$p" -png -p "$PDF" "$WORK/i"; done

page() { printf '%s/p-%02d.png' "$WORK" "$1"; }

# crop PAGE X0 Y0 X1 Y1 DEST [trim]
crop() {
  local pg=$1 x0=$2 y0=$3 x1=$4 y1=$5 dest=$6 trim=${7:-}
  local src; src="$(page "$pg")"
  local W; W=$(magick identify -format '%w' "$src")
  local s; s=$(awk -v w="$W" 'BEGIN{print w/2000}')
  local geo; geo=$(awk -v s="$s" -v a="$x0" -v b="$y0" -v c="$x1" -v d="$y1" \
    'BEGIN{printf "%dx%d+%d+%d", (c-a)*s, (d-b)*s, a*s, b*s}')
  local args=("$src" -crop "$geo" +repage)
  [[ -n "$trim" ]] && args+=(-fuzz 3% -trim +repage -bordercolor white -border 8)
  magick "${args[@]}" -resize "${MAXW}x>" -quality 90 "$OUT/$dest"
  echo "  $dest"
}

# copy embedded image (optionally applying its soft mask on white)
emb() {
  local name=$1 dest=$2 mask=${3:-}
  if [[ -n "$mask" ]]; then
    magick "$WORK/i-$name.png" "$WORK/i-$mask.png" -alpha off -compose CopyOpacity -composite \
      -background '#ffffff' -flatten -fuzz 2% -trim +repage -resize "${MAXW}x>" -quality 90 "$OUT/$dest"
  else
    magick "$WORK/i-$name.png" -resize "${MAXW}x>" -quality 90 "$OUT/$dest"
  fi
  echo "  $dest"
}

# ink PAGE X0 Y0 X1 Y1 DEST — turns dark-on-white lettering into a transparent PNG
ink() {
  local pg=$1 x0=$2 y0=$3 x1=$4 y1=$5 dest=$6 color=${7:-'#34506f'}
  local src; src="$(page "$pg")"
  local W; W=$(magick identify -format '%w' "$src")
  local s; s=$(awk -v w="$W" 'BEGIN{print w/2000}')
  local geo; geo=$(awk -v s="$s" -v a="$x0" -v b="$y0" -v c="$x1" -v d="$y1" \
    'BEGIN{printf "%dx%d+%d+%d", (c-a)*s, (d-b)*s, a*s, b*s}')
  magick "$src" -crop "$geo" +repage -colorspace gray -negate -level 8%,70% "$WORK/alpha.png"
  magick "$WORK/alpha.png" -fill "$color" -colorize 100 "$WORK/alpha.png" \
    -alpha off -compose CopyOpacity -composite -trim +repage -resize "2400x>" "$OUT/$dest"
  echo "  $dest"
}

echo "→ brand"
ink  1  140 370 1870 975 brand/portfolio-scribble.png
emb  002-000 brand/portrait.jpg
crop 19  815 357 1183 957 brand/thank-you-poster.jpg
ink  19  815 1000 1195 1115 brand/thank-you-scribble.png

echo "→ contents posters"
crop 3  252 241 416 574 projects/bsten-pa/cover.jpg
crop 3  585 241 749 574 projects/la-khung/cover.jpg
crop 3  917 241 1082 574 projects/sdod-khang/cover.jpg
crop 3 1251 241 1415 574 projects/working-drawing/cover.jpg
crop 3 1584 241 1749 574 projects/miscellaneous/cover.jpg

echo "→ 01 bsten-pa"
P=projects/bsten-pa
crop 4  566  23  972 683 $P/01-exploded-villa.jpg
crop 4 1016  23 1233 162 $P/02-villas-curve.jpg
crop 4 1016 207 1233 432 $P/03-cottages.jpg
crop 4 1016 478 1233 648 $P/04-suites-pool.jpg
crop 4 1362  18 1965 690 $P/05-site-isometric.jpg trim
crop 5   24  50  456 678 $P/06-exploded-axonometric.jpg trim
crop 5  472  50  958 678 $P/07-site-plan.jpg trim
crop 5 1045  50 1952 377 $P/08-site-section.jpg
crop 5 1045 424 1952 680 $P/09-site-elevation.jpg
crop 6    0  42 2000 707 $P/10-longitudinal-section.jpg
emb  007-002 $P/11-render-aerial.jpg
emb  007-001 $P/12-render-restaurant.jpg
emb  007-000 $P/13-render-suite.jpg

echo "→ 02 la-khung"
P=projects/la-khung
crop 8  567  23  975 684 $P/01-terrace-levels.jpg
crop 8 1026  23 1221 162 $P/02-sit-out.jpg
crop 8 1026 216 1221 410 $P/03-stepped-sequence.jpg
crop 8 1026 466 1221 635 $P/04-corner-cores.jpg
crop 8 1262  30 1930 625 $P/05-site-isometric.jpg trim
crop 9    2  76  404 680 $P/06-floor-plans.jpg trim
crop 9  470  48  960 680 $P/07-site-plan.jpg trim
crop 9 1045  50 1952 376 $P/08-front-elevation.jpg
crop 9 1045 425 1952 680 $P/09-site-section.jpg
crop 10   0  38 2000 707 $P/10-longitudinal-section.jpg
emb  011-002 $P/11-render-terraces.jpg
emb  011-000 $P/12-render-pergola.jpg
emb  011-004 $P/13-render-entrance.jpg

echo "→ 03 sdod-khang"
P=projects/sdod-khang
crop 12  567  23  975 684 $P/01-terrace-levels.jpg
crop 12 1016  23 1221 162 $P/02-commercial-block.jpg
crop 12 1016 216 1221 410 $P/03-typical-floor.jpg
crop 12 1016 466 1221 635 $P/04-retaining-walls.jpg
crop 12 1288  22 1978 684 $P/05-site-isometric.jpg
crop 13   48  40  972 262 $P/06-unit-plans.jpg trim
crop 13    8 296  972 692 $P/07-site-section.jpg trim
crop 13 1026  36 1966 700 $P/08-site-plan.jpg trim
crop 14    0  36 2000 707 $P/09-longitudinal-section.jpg
emb  015-000 $P/10-render-courtyard.jpg

echo "→ 04 working drawing"
P=projects/working-drawing
emb  016-003 $P/01-column-footing.jpg
emb  016-001 $P/02-ground-floor.jpg
emb  016-002 $P/03-first-floor.jpg
emb  016-004 $P/04-electrical.jpg
emb  016-000 $P/05-roof-plan.jpg
emb  017-000 $P/06-elevations.jpg
emb  017-001 $P/07-sections.jpg

echo "→ 05 miscellaneous"
P=projects/miscellaneous
emb  018-011 $P/01-dogtooth.jpg
crop 18  515  57  975 366 $P/02-original-characters.jpg trim
crop 18   64 366  513 667 $P/03-carl-eldritch.jpg trim
emb  018-008 $P/04-oshi-no-ko.jpg
emb  018-010 $P/05-schizophrenia.jpg
crop 18 1486  60 1937 366 $P/06-oblique-house.jpg trim
crop 18 1052 370 1488 664 $P/07-faces-of-the-past.jpg trim
crop 18 1590 466 1810 663 $P/08-rimuru.jpg

echo "✓ done"
