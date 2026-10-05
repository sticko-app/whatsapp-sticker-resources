---
title: Animated WhatsApp stickers
description: The rules for animated WhatsApp stickers — 512 × 512 animated WebP, 500 KB, 10 seconds, 8 ms minimum frame duration — and how to stay within them.
---

# Animated WhatsApp stickers

Animated stickers follow the same 512 × 512 canvas as static ones, with extra limits on timing and file size.

## The rules

| Rule | Limit |
| --- | --- |
| Format | Animated WebP |
| Dimensions | Exactly 512 × 512 px |
| File size | ≤ 500 KB |
| Total duration | ≤ 10 seconds |
| Minimum frame duration | 8 ms |
| Tray icon | Static, 96 × 96 px, ≤ 50 KB |
| Pack contents | All animated — a pack cannot mix static and animated stickers |
| Pack flag | `"animated_sticker_pack": true` in the pack metadata |
| Accessibility text | ≤ 255 characters |

## The first frame matters most

WhatsApp ends the loop by returning to the **first frame**, and that frame is also what people see in places where the sticker is not animating. Design the first frame to be the complete sticker:

- If the sticker spells out "Hi!", show the whole word on frame one — don't build it letter by letter from a blank frame.
- Make the last frame lead smoothly back into the first, or the loop will visibly jump.

## Staying under 500 KB

For animated stickers, the file-size budget is almost always the constraint you hit first — far more often than the 10-second duration. Size is driven by frame count multiplied by how much each frame changes, so:

| Technique | Typical effect |
| --- | --- |
| Drop to 12–15 fps | Halves the frame count of a 30 fps source with little visible loss for illustrated motion |
| Trim still frames at the start and end | Removes bytes that add nothing |
| Lower lossy quality (50–75) | Large savings; animation hides compression artefacts |
| Keep the background fully transparent | Unchanged transparent pixels compress to almost nothing |
| Shorten the loop | Least effective — try the above first |

Frames at 12–15 fps last 66–83 ms each, comfortably above the 8 ms minimum. The minimum only becomes a problem with very high frame-rate sources or tools that emit zero-delay frames; those must be re-timed before import.

## Converting GIFs and videos

GIF and MP4 are not valid sticker formats, but both convert cleanly to animated WebP. See [GIF to animated WebP](/convert-images-to-webp#gif-to-animated-webp) and [Video to animated WebP](/convert-images-to-webp#video-to-animated-webp) for commands.

## Further reading

- [Tray icon rules](/tray-icon) — still static for animated packs
- [Troubleshooting](/whatsapp-sticker-troubleshooting#animated-sticker-does-not-move)
- Sticko's explainer on [how animated WhatsApp stickers work](https://sticko.app/guides/animated-whatsapp-stickers)
