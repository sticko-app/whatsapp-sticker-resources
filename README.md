# WhatsApp Sticker Resources

A free, openly licensed reference for building WhatsApp stickers: exact size and format requirements, animated sticker limits, tray icons, pack metadata, and tested conversion commands.

**📖 Read it as a website: [sticko-app.github.io/whatsapp-sticker-resources](https://sticko-app.github.io/whatsapp-sticker-resources/)**

## Quick reference

| Requirement | Static sticker | Animated sticker |
| --- | --- | --- |
| Dimensions | exactly 512 × 512 px | exactly 512 × 512 px |
| Format | WebP | animated WebP |
| Max file size | 100 KB | 500 KB |
| Duration | — | ≤ 10 s, every frame ≥ 8 ms |
| Tray icon | 96 × 96 px, static, ≤ 50 KB | 96 × 96 px, static, ≤ 50 KB |
| Stickers per pack | 3 – 30 | 3 – 30, no mixing with static |
| Emoji per sticker | up to 3 | up to 3 |
| Accessibility text | ≤ 125 characters | ≤ 255 characters |

Source: WhatsApp's [third-party sticker documentation](https://github.com/WhatsApp/stickers).

## Docs

**Requirements**
- [Sticker size](docs/whatsapp-sticker-size.md): the 512 × 512 canvas, non-square art, file-size budgets
- [File format](docs/whatsapp-sticker-format.md): WebP, transparency, lossy vs lossless
- [Animated stickers](docs/animated-whatsapp-stickers.md): timing rules and the 500 KB budget
- [Tray icon](docs/tray-icon.md): 96 × 96 and how to make it legible

**Building packs**
- [Converting images to WebP](docs/convert-images-to-webp.md): `cwebp`, `gif2webp`, `ffmpeg` and ImageMagick recipes
- [contents.json reference](docs/contents-json.md): every pack metadata field explained
- [Pre-publish checklist](docs/checklist.md)

**Help**
- [Troubleshooting](docs/whatsapp-sticker-troubleshooting.md)

## Check a sticker pack

[`scripts/check-stickers.sh`](scripts/check-stickers.sh) checks a folder of `.webp` files for the right dimensions, file-size limits, sticker count and static/animated mixing:

```sh
bash scripts/check-stickers.sh path/to/pack
```

You need `webpinfo` from libwebp (`brew install webp` or `apt install webp`).

## About Sticko

This repository is maintained by [Sticko](https://sticko.app/), a WhatsApp sticker discovery platform with thousands of sticker packs created by publishers and users.

## Resources

- [WhatsApp Sticker Guides](https://sticko.app/guides)
- [Browse WhatsApp Sticker Packs](https://sticko.app/)
- [Trending WhatsApp Stickers](https://sticko.app/sticker-pack/trending-stickers)
- [WhatsApp Sticker Hashtags](https://sticko.app/hashtag)

## Contributing

Found something outdated or wrong? WhatsApp changes its rules from time to time, and corrections are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

- Documentation (`docs/`, `examples/`): [CC BY 4.0](LICENSE). You can reuse and adapt it as long as you credit **WhatsApp Sticker Resources by Sticko** and link back to this repository.
- Code (`scripts/`, config, workflows): [MIT](LICENSE-CODE).

WhatsApp is a trademark of Meta Platforms, Inc. This project is not affiliated with WhatsApp or Meta.
