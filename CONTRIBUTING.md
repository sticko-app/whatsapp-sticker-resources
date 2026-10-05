# Contributing

Thanks for helping keep this reference accurate.

## What's welcome

- Corrections when WhatsApp changes a limit or behaviour. Please link to the source.
- Better or faster conversion recipes. Include the tool version you tested with.
- New troubleshooting entries for problems you have actually hit.

## What isn't

- Links to download sites, sticker pack listings or promotional pages.
- Content copied from other sites.

## Local preview

```sh
npm install
npm run docs:dev      # http://localhost:5173/whatsapp-sticker-resources/
npm run docs:build    # fails if a page links to another page that doesn't exist
```

Each page is a Markdown file in [`docs/`](docs). The sidebar is defined in [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts).

## Licensing

By contributing, you agree that documentation changes are licensed under [CC BY 4.0](LICENSE) and code changes under [MIT](LICENSE-CODE).
