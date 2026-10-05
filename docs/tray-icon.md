---
title: WhatsApp sticker tray icon
description: Every WhatsApp sticker pack needs a tray icon — 96 × 96 pixels, static, 50 KB or less. How to design one that is still legible at that size.
---

# Tray icon

Each pack has one **tray icon**: the small image shown in WhatsApp's sticker picker when someone switches between packs. It is a separate file from the stickers.

## Requirements

| Rule | Value |
| --- | --- |
| Dimensions | 96 × 96 px |
| File size | ≤ 50 KB |
| Animation | Not allowed — static even for animated packs |
| Format | PNG in WhatsApp's sample apps (`tray_image_file` in [contents.json](/contents-json)) |

## Designing for 96 px

The tray icon is the only part of a pack that people see before opening it, and it is shown even smaller than 96 px on most phones. Shrinking a 512 px sticker usually produces mush. Instead:

- **Pick one recognisable element** — a face, a character's silhouette, a single bold glyph.
- **Drop the text.** Lettering that reads at 512 px is illegible at tray size.
- **Increase stroke weight** and contrast so the icon survives on both light and dark themes.
- **Keep transparency** so it doesn't render as a box in the picker.

## Creating one from a sticker

If you do start from an existing sticker, crop to the most recognisable part first, then scale:

```sh
# Crop the central 320 × 320 area of a 512 px sticker, then scale to 96 × 96

# ImageMagick (macOS, Linux, Windows)
magick sticker.png -gravity center -crop 320x320+0+0 +repage -resize 96x96 tray.png

# macOS built-in, no install needed
sips -c 320 320 sticker.png --out tray-crop.png && sips -z 96 96 tray-crop.png --out tray.png
```

Check the result at actual size on a phone before shipping — what looks fine on a desktop monitor is often unreadable in the picker.

## Further reading

- [Sticker size](/whatsapp-sticker-size)
- [Pre-publish checklist](/checklist)
