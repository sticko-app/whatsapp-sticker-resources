---
title: contents.json reference for WhatsApp sticker packs
description: Field-by-field reference for the contents.json file used by WhatsApp sticker apps — identifiers, name and publisher limits, emoji tags, accessibility text and image_data_version.
---

# contents.json reference

Sticker apps built on WhatsApp's official [Android](https://github.com/WhatsApp/stickers/tree/main/Android) and [iOS](https://github.com/WhatsApp/stickers/tree/main/iOS) samples describe their packs in a `contents.json` file. This page explains every field and the limits that apply to it.

A complete, annotated example lives in the repository at [`examples/contents.json`](https://github.com/sticko-app/whatsapp-sticker-resources/blob/main/examples/contents.json).

## Shape

```json
{
  "android_play_store_link": "https://play.google.com/store/apps/details?id=com.example.stickers",
  "ios_app_store_link": "",
  "sticker_packs": [
    {
      "identifier": "cats_01",
      "name": "Office Cats",
      "publisher": "Example Studio",
      "tray_image_file": "tray_office_cats.png",
      "image_data_version": "1",
      "publisher_email": "hello@example.com",
      "publisher_website": "https://example.com",
      "privacy_policy_website": "https://example.com/privacy",
      "license_agreement_website": "https://example.com/license",
      "animated_sticker_pack": false,
      "stickers": [
        {
          "image_file": "01_hello.webp",
          "emojis": ["👋", "🙂"],
          "accessibility_text": "A grey cat in a tie waves a paw, with text that reads \"Hello\" in English."
        }
      ]
    }
  ]
}
```

## Top-level fields

| Field | Required | Notes |
| --- | --- | --- |
| `android_play_store_link` | No | Full Play Store URL. Lets people who receive a sticker tap through to your app. |
| `ios_app_store_link` | No | Full App Store URL, same purpose. |
| `sticker_packs` | Yes | Array — one object per pack. |

## Pack fields

| Field | Required | Rules |
| --- | --- | --- |
| `identifier` | Yes | Unique per app, under 128 characters. Allowed: `a–z A–Z 0–9 _ - .` and space. Never change it after release — WhatsApp uses it to recognise the pack. |
| `name` | Yes | Max 128 characters. Shown to users. |
| `publisher` | Yes | Max 128 characters. |
| `tray_image_file` | Yes | File name of the [tray icon](/tray-icon) (96 × 96, ≤ 50 KB). |
| `image_data_version` | Yes | Any string. **Change it whenever stickers or the tray icon change** — this is how WhatsApp knows to refresh its copy. |
| `animated_sticker_pack` | For animated packs | `true` for animated packs; optional (`false`) for static ones. |
| `publisher_email` | No | Contact address. |
| `publisher_website` | No | Must start with `http` or `https`. |
| `privacy_policy_website` | No | Must start with `http` or `https`. |
| `license_agreement_website` | No | Must start with `http` or `https`. |
| `avoid_cache` | Deprecated | Ignored by WhatsApp since version 2.25.9.78; stickers are always cached. Omit it. |
| `stickers` | Yes | Array of 3 – 30 sticker objects. Order in the array is the order in the picker. |

## Sticker fields

| Field | Required | Rules |
| --- | --- | --- |
| `image_file` | Yes | File name **including** the `.webp` extension. |
| `emojis` | Yes | 1 – 3 emoji. These drive WhatsApp's sticker search and emoji suggestions, so choose emoji that describe the emotion, not just the subject. WhatsApp publishes a [recommended tag list](https://github.com/WhatsApp/stickers/wiki/Tag-your-stickers-with-Emojis). |
| `accessibility_text` | No (recommended) | Screen-reader description. Max **125** characters for static stickers, **255** for animated. |

## Writing good accessibility text

WhatsApp's guidance condensed:

- Write in US English, present tense, as if describing the image to someone.
- Lead with the emotion or intent: "A laughing cat…" rather than "A cat that is laughing…".
- For text in the sticker, use: *with text that reads "OK" in English*.
- Skip filler like "picture of" or "sticker showing", and don't include emoji.
- Don't guess at identity, demographics or abilities; don't editorialise.

## Multiple packs

Add more objects to `sticker_packs`. In the Android sample, each pack's files live in their own asset folder named after its identifier (`assets/1/`, `assets/2/`, …).

## Common mistakes

| Mistake | Result |
| --- | --- |
| Updating artwork without bumping `image_data_version` | Users keep seeing the old stickers |
| Changing `identifier` in an update | WhatsApp treats it as a new pack; users see a duplicate |
| `image_file` without the `.webp` extension | Sticker fails to load |
| Website fields without `http(s)://` | Validation error in the sample apps |
| Fewer than 3 stickers | Pack cannot be added |
