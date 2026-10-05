---
title: WhatsApp sticker pack checklist
description: A one-page pre-publish checklist for WhatsApp sticker packs covering stickers, animation, tray icon and pack metadata.
---

# Pre-publish checklist

Run through this before shipping a pack. Each item links to the page that explains it.

## Every sticker

- [ ] Exactly **512 × 512 px** — [size](/whatsapp-sticker-size)
- [ ] **WebP** format, not a renamed PNG — [format](/whatsapp-sticker-format)
- [ ] Transparent background, no white box on dark mode
- [ ] Subject has some padding from the canvas edge
- [ ] ≤ **100 KB** static / ≤ **500 KB** animated
- [ ] 1–3 descriptive **emoji** tags — [contents.json](/contents-json#sticker-fields)
- [ ] Accessibility text ≤ 125 (static) / 255 (animated) characters

## Animated stickers

- [ ] Total duration ≤ **10 s** — [animated](/animated-whatsapp-stickers)
- [ ] Every frame ≥ **8 ms**
- [ ] First frame shows the complete sticker
- [ ] Loop transitions smoothly from last frame to first

## Tray icon

- [ ] **96 × 96 px**, static, ≤ **50 KB** — [tray icon](/tray-icon)
- [ ] Readable at actual size on a phone, on light and dark themes

## Pack

- [ ] **3 – 30** stickers
- [ ] All static or all animated; `animated_sticker_pack` set to match
- [ ] Stable, unique `identifier` (< 128 chars, `a–z A–Z 0–9 _ - .` and space)
- [ ] `name` and `publisher` ≤ 128 characters
- [ ] `image_data_version` bumped if anything changed since the last release
- [ ] All website fields start with `https://`
- [ ] You own or have licensed every image in the pack

## Test

- [ ] Added the pack on a real Android phone and a real iPhone
- [ ] Sent each sticker in a chat and checked it on light and dark themes
- [ ] Searched for the sticker by one of its emoji tags
