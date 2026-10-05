---
title: WhatsApp sticker troubleshooting
description: Fixes for the most common WhatsApp sticker problems — packs that won't import, white boxes around stickers, animations that don't play and stickers that never update.
---

# Troubleshooting

Most sticker problems come down to a file that breaks one of the [requirements](/whatsapp-sticker-size). Start with the symptom below.

## Pack won't add to WhatsApp

Check, in order:

1. **Sticker count** — the pack has between 3 and 30 stickers.
2. **Dimensions** — every sticker is exactly 512 × 512. Run `webpinfo -summary` on each file.
3. **File size** — static ≤ 100 KB, animated ≤ 500 KB, tray icon ≤ 50 KB.
4. **Format** — files are real WebP, not PNGs renamed to `.webp`. `webpinfo` will error on a non-WebP file.
5. **No mixing** — the pack is entirely static or entirely animated, and `animated_sticker_pack` matches.
6. **Tray icon** — present, 96 × 96 and static.

The repository includes a checker that tests all of the sticker rules above in one go (it needs `webpinfo` from libwebp):

```sh
curl -fsSLO https://raw.githubusercontent.com/sticko-app/whatsapp-sticker-resources/main/scripts/check-stickers.sh
bash check-stickers.sh path/to/pack
```

```text
✓ 01_hello.webp  static, 14 KB
✗ 02_wave.webp  size 500x500, must be 512x512
✗ 03_lol.webp  131 KB, static limit is 100 KB

3 stickers (3 static, 0 animated)
2 problem(s) found
```

Or the bare minimum as a one-off loop:

```sh
for f in *.webp; do
  size=$(( $(wc -c < "$f") ))
  dims=$(webpinfo "$f" 2>/dev/null | awk '/Canvas size/ {print $3"x"$5; exit} /Width:/ {w=$2} /Height:/ {print w"x"$2; exit}')
  echo "$f  ${size} bytes  ${dims:-NOT WEBP}"
done
```

## White or black box around a sticker

The alpha channel was lost during export. See [Transparency is not optional in practice](/whatsapp-sticker-format#transparency-is-not-optional-in-practice) for the usual causes and fixes.

## Animated sticker does not move

- The file may have only one frame. `webpinfo -summary` shows the frame count.
- The pack may not be flagged as animated (`"animated_sticker_pack": true`).
- Some frames may be shorter than 8 ms — re-export at a steady 12–15 fps.
- Chat previews and the tray show a still image by design; animation plays in the conversation.

## Stickers don't update after changing them

WhatsApp caches pack contents. Increment `image_data_version` in [contents.json](/contents-json) whenever artwork or the tray icon changes, and keep the pack `identifier` the same.

## Stickers look blurry

The source was smaller than 512 px and was scaled up. Re-export from the original artwork at 512 px or larger, then fit it to the canvas.

## Stickers missing after switching phones

Third-party packs are tied to the app that provided them. Reinstall the sticker app on the new phone and re-add the packs, or restore from a WhatsApp backup. Sticko's guide on [stickers missing after changing phone](https://sticko.app/guides/whatsapp-stickers-missing-after-changing-phone) covers the Android and iPhone specifics.

## Still stuck?

Sticko keeps a broader, user-focused guide to [WhatsApp stickers not working](https://sticko.app/guides/whatsapp-stickers-not-working). For developer issues with the official samples, check the [WhatsApp/stickers issue tracker](https://github.com/WhatsApp/stickers/issues).
