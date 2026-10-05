---
title: WhatsApp sticker size
description: WhatsApp stickers must be exactly 512 × 512 pixels. Here is what that means for non-square artwork, safe margins, file-size budgets and the tray icon.
---

# WhatsApp sticker size

**Every WhatsApp sticker must be exactly 512 × 512 pixels.** That is a fixed canvas, not an upper limit — 511 × 511 and 1024 × 1024 are both rejected when the pack is imported.

## Pixel dimensions

| Asset | Dimensions | Notes |
| --- | --- | --- |
| Sticker (static or animated) | 512 × 512 px | Square, 1:1 |
| Tray icon | 96 × 96 px | One per pack, always static — see [Tray icon](/tray-icon) |

### Non-square artwork

Most source images are not square. Scale the artwork so its **longest side** fits inside 512 px, then centre it on a transparent 512 × 512 canvas. Do not stretch it to fill the square — distortion is far more noticeable in a sticker than empty transparent space.

The [conversion recipes](/convert-images-to-webp#non-square-images) include one-line commands that do exactly this.

### Leave a margin

Artwork that touches the canvas edge looks cramped next to other stickers in the picker. A practical rule is to keep the subject inside roughly **16 px of padding** on every side. Many sticker designers also add a thin white outline around the subject so it stays readable on both light and dark chat themes.

## File size

Dimensions are only half of the rule; each file also has a byte budget:

| Asset | Max file size |
| --- | --- |
| Static sticker | 100 KB |
| Animated sticker | 500 KB |
| Tray icon | 50 KB |

The limits apply **per file** — there is no combined limit for a pack. For comparison, WhatsApp notes that many of its built-in stickers are around 15 KB, so the limit is a ceiling rather than a target. Smaller files send faster and cost the recipient less data.

### Getting under 100 KB

Flat illustration, lettering and cartoons usually land well under the limit. Photographic cut-outs are the usual offenders. In order of effectiveness:

1. **Lower the WebP quality** — quality 70–85 is usually indistinguishable from 100 at sticker display size.
2. **Reduce colours** before conversion (quantise the PNG).
3. **Simplify the edges** — soft, feathered alpha edges cost more bytes than a clean cut-out.
4. **Remove detail** that nobody will see at 64–128 px chat-bubble size.

## Pack size

A pack must contain **between 3 and 30 stickers**. Both bounds are enforced: two stickers cannot ship as a pack, and a 31st sticker means the pack is refused.

## Further reading

- [File format: why WebP](/whatsapp-sticker-format)
- [Animated sticker limits](/animated-whatsapp-stickers)
- Sticko's illustrated walkthrough of [WhatsApp sticker size and format requirements](https://sticko.app/guides/whatsapp-sticker-size-and-format)
- Source: [WhatsApp/stickers — Android README](https://github.com/WhatsApp/stickers/tree/main/Android)
