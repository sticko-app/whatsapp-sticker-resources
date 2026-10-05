---
title: WhatsApp sticker format (WebP)
description: Why WhatsApp stickers use WebP, how transparency and lossy/lossless encoding affect your stickers, and which formats are not accepted.
---

# WhatsApp sticker format

**WhatsApp stickers must be WebP files** — static WebP for regular stickers and animated WebP for animated ones. PNG, JPEG and GIF files are not accepted inside a pack and must be converted first.

## Why WebP

WebP is the only widely supported format that combines all three things a sticker needs:

- **An alpha channel**, so the sticker sits cleanly on any chat background.
- **Animation**, so static and animated stickers share one format.
- **Small files** — typically much smaller than an equivalent PNG, which matters for a format that is sent and re-sent millions of times.

## Transparency is not optional in practice

WhatsApp does not technically require transparency, but a sticker without it shows a visible rectangle — white on dark mode, or a coloured box on light mode. Always export with the alpha channel preserved.

Common ways transparency gets lost:

| Cause | Fix |
| --- | --- |
| Source was a JPEG (no alpha channel at all) | Remove the background first, save as PNG, then convert |
| Converter flattens onto white by default | Use a converter that keeps alpha (`cwebp` does by default) |
| Android Studio's "Skip images with transparency" option is on | Untick it before converting |
| Photoshop WebP plugin with "Save Metadata" enabled | Untick it, or export PNG and convert with `cwebp` |

## Lossy or lossless?

Both encodings are valid. Choose by artwork type:

| Artwork | Recommended | Why |
| --- | --- | --- |
| Photos, gradients, painted art | Lossy, quality 70–85 | Big size savings with no visible difference at sticker size |
| Pixel art, flat colours, crisp text | Lossless (or lossy at quality 90+) | Avoids smudged edges and colour banding |

Lossy WebP still supports a full alpha channel, so you do not have to choose lossless just to keep transparency.

## Formats that are not accepted

- **GIF** — convert to animated WebP (see [GIF to animated WebP](/convert-images-to-webp#gif-to-animated-webp)).
- **PNG / JPEG** — convert to static WebP.
- **APNG, MP4, Lottie/TGS** — convert frames to animated WebP. Telegram's `.tgs` stickers are vector animations and need to be rendered to frames first.

## Checking a file

`webpinfo` (part of Google's libwebp tools) prints the canvas size, whether the file is animated, and whether it has alpha:

```sh
webpinfo -summary sticker.webp
```

Look for `Canvas size 512 x 512` (or `Width: 512` / `Height: 512` for simple lossless files), `Alpha: 1` for transparency, and `Number of frames` at the end. A file that is not really WebP — such as a renamed PNG — reports `Errors detected.`

To check a whole pack at once, use the [sticker checker script](/whatsapp-sticker-troubleshooting#pack-won-t-add-to-whatsapp).

## Further reading

- [Converting images to WebP](/convert-images-to-webp)
- [Sticker size and file-size budgets](/whatsapp-sticker-size)
- Google's [WebP documentation](https://developers.google.com/speed/webp)
