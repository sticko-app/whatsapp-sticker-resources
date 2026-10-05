---
layout: home
title: WhatsApp Sticker Resources
description: Free, open reference for WhatsApp stickers — exact size and format requirements, animated stickers, tray icons, pack metadata and conversion recipes.

hero:
  name: WhatsApp Sticker Resources
  text: The technical rules behind WhatsApp stickers
  tagline: Sizes, formats, animation limits and pack metadata — in one place, with copy-paste conversion commands.
  image:
    src: /logo.svg
    alt: Sticko logo
  actions:
    - theme: brand
      text: Sticker requirements
      link: /whatsapp-sticker-size
    - theme: alt
      text: Pre-publish checklist
      link: /checklist

features:
  - title: Exact specs
    details: 512 × 512 WebP, per-file size limits, tray icon rules and pack size — with the reasoning behind each limit.
    link: /whatsapp-sticker-size
  - title: Animated stickers
    details: Frame timing, duration, the 500 KB budget and why the first frame matters more than the last.
    link: /animated-whatsapp-stickers
  - title: Conversion recipes
    details: Tested cwebp and gif2webp commands, plus ffmpeg and ImageMagick pipelines for padding and resizing.
    link: /convert-images-to-webp
  - title: Pack metadata
    details: A field-by-field reference for contents.json — identifiers, emoji tags, accessibility text and versioning.
    link: /contents-json
---

## Quick reference

| Requirement | Static sticker | Animated sticker |
| --- | --- | --- |
| Dimensions | exactly 512 × 512 px | exactly 512 × 512 px |
| Format | WebP | animated WebP |
| Max file size | 100 KB | 500 KB |
| Duration | — | ≤ 10 seconds |
| Frame duration | — | ≥ 8 ms per frame |
| Tray icon | 96 × 96 px, static, ≤ 50 KB | 96 × 96 px, static, ≤ 50 KB |
| Stickers per pack | 3 – 30 | 3 – 30 (no mixing with static) |
| Emoji per sticker | up to 3 | up to 3 |
| Accessibility text | ≤ 125 characters | ≤ 255 characters |

Values follow WhatsApp's own [third-party sticker documentation](https://github.com/WhatsApp/stickers). If you only need one page, start with the [pre-publish checklist](/checklist).

## About this project

This is a free, openly licensed reference for developers, designers and anyone building WhatsApp sticker packs. It is maintained by [Sticko](https://sticko.app/), a WhatsApp sticker pack catalogue and sticker-maker app for Android and iPhone.

Spotted something out of date? Every page has a "Suggest an edit" link — corrections are welcome.
