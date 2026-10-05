---
title: Converting images to WebP for WhatsApp stickers
description: Copy-paste commands to turn PNG, JPEG, GIF and video into 512 × 512 WhatsApp-ready WebP stickers with cwebp, gif2webp, ffmpeg and ImageMagick.
---

# Converting images to WebP

These recipes produce files that meet WhatsApp's sticker rules: a 512 × 512 canvas, transparency preserved, and a file size inside the budget.

## Tools

| Tool | Install | Good for |
| --- | --- | --- |
| `cwebp`, `gif2webp`, `img2webp`, `webpinfo` | `brew install webp` · `apt install webp` | Static stickers, GIF conversion, inspection |
| ImageMagick (`magick`) | `brew install imagemagick` · `apt install imagemagick` | Padding non-square images |
| `ffmpeg` | `brew install ffmpeg` · `apt install ffmpeg` | Video and GIF → animated WebP with resizing |

## Square PNG → static sticker

If your PNG is already 512 × 512 with a transparent background:

```sh
cwebp -q 80 -alpha_q 100 input.png -o sticker.webp
```

`-q` controls colour quality (lower = smaller); `-alpha_q 100` keeps edges clean. If the result is over 100 KB, step `-q` down by 10 and try again.

For flat artwork where you want pixel-exact output:

```sh
cwebp -lossless -z 9 input.png -o sticker.webp
```

## Non-square images

Fit the longest side to 512 px and pad the rest with transparency.

**ImageMagick:**

```sh
magick input.png -resize 512x512 -background none -gravity center -extent 512x512 \
  -quality 80 sticker.webp
```

**ffmpeg:**

```sh
ffmpeg -i input.png \
  -vf "scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=black@0" \
  -c:v libwebp -quality 80 sticker.webp
```

`cwebp -resize 512 512` also works, but it **stretches** non-square input — only use it on images that are already square.

## Batch-convert a folder

```sh
mkdir -p out
for f in *.png; do
  cwebp -quiet -q 80 -alpha_q 100 "$f" -o "out/${f%.png}.webp"
done
```

## GIF to animated WebP

If the GIF is already 512 × 512:

```sh
gif2webp -lossy -q 70 -m 6 input.gif -o sticker.webp
```

`-lossy` gives much smaller files than the default lossless mode; `-m 6` spends more time compressing for a smaller result.

If the GIF needs resizing or padding, use ffmpeg:

```sh
ffmpeg -i input.gif -t 10 \
  -vf "fps=15,scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=black@0" \
  -c:v libwebp -lossless 0 -quality 60 -loop 0 -an sticker.webp
```

## Video to animated WebP

The same ffmpeg command works for MP4, MOV and WebM. Add `-ss` to choose the start point:

```sh
ffmpeg -ss 00:00:02 -i clip.mp4 -t 6 \
  -vf "fps=15,scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=black@0" \
  -c:v libwebp -lossless 0 -quality 55 -loop 0 -an sticker.webp
```

Video has no transparency, so the subject will sit on its original background unless you remove it first (for example with a background-removal tool that exports transparent frames).

## Check the output

```sh
webpinfo -summary sticker.webp   # canvas size, frame count, alpha
ls -l sticker.webp                # file size in bytes (100 KB = 102,400 bytes)
```

Over budget? See [Getting under 100 KB](/whatsapp-sticker-size#getting-under-100-kb) and [Staying under 500 KB](/animated-whatsapp-stickers#staying-under-500-kb).

::: tip Prefer not to use the command line?
Sticker-maker apps handle cropping, padding and WebP export for you. [Sticko](https://sticko.app/) is one option for Android and iPhone.
:::
