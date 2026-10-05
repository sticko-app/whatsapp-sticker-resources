#!/usr/bin/env bash
# Check a folder of .webp stickers against WhatsApp's pack rules.
# Requires webpinfo (brew install webp / apt install webp).
#
# Usage: scripts/check-stickers.sh <folder>
# License: MIT (see LICENSE-CODE)

set -uo pipefail

dir="${1:-.}"
static_max=102400   # 100 KB
anim_max=512000     # 500 KB

command -v webpinfo >/dev/null || { echo "webpinfo not found — install libwebp (brew install webp / apt install webp)" >&2; exit 2; }

shopt -s nullglob nocaseglob
files=("$dir"/*.webp)
errors=0 static=0 animated=0

for f in "${files[@]}"; do
  name=$(basename "$f")
  size=$(( $(wc -c < "$f") ))
  info=$(webpinfo -summary "$f" 2>/dev/null) || { echo "✗ $name  not a valid WebP file"; errors=$((errors + 1)); continue; }
  dims=$(awk '/Canvas size/ {print $3"x"$5; exit} /Width:/ {w=$2} /Height:/ {print w"x"$2; exit}' <<<"$info")
  frames=$(awk '/Number of frames/ {print $4}' <<<"$info")

  problems=()
  if (( frames > 1 )); then
    animated=$((animated + 1)); max=$anim_max; kind="animated"
  else
    static=$((static + 1)); max=$static_max; kind="static"
  fi
  [[ $dims == "512x512" ]] || problems+=("size ${dims}, must be 512x512")
  (( size <= max )) || problems+=("$(( (size + 1023) / 1024 )) KB, $kind limit is $((max / 1024)) KB")

  if (( ${#problems[@]} )); then
    joined=$(printf '%s; ' "${problems[@]}")
    echo "✗ $name  ${joined%; }"; errors=$((errors + ${#problems[@]}))
  else
    echo "✓ $name  $kind, $(( (size + 1023) / 1024 )) KB"
  fi
done

total=${#files[@]}
echo
echo "$total stickers ($static static, $animated animated)"
(( total >= 3 && total <= 30 )) || { echo "✗ a pack needs 3–30 stickers"; errors=$((errors + 1)); }
(( static == 0 || animated == 0 )) || { echo "✗ a pack cannot mix static and animated stickers"; errors=$((errors + 1)); }

if (( errors )); then echo "$errors problem(s) found"; exit 1; fi
echo "All checks passed"
