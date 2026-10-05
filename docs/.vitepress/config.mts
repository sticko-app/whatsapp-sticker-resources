import { defineConfig } from 'vitepress'

// Override both when the site moves to another owner or a custom domain.
const SITE_URL = (process.env.SITE_URL ?? 'https://sticko-app.github.io/whatsapp-sticker-resources').replace(/\/$/, '')
const BASE = process.env.DOCS_BASE ?? '/whatsapp-sticker-resources/'
const REPO_URL = 'https://github.com/sticko-app/whatsapp-sticker-resources'

const STICKO_URL = 'https://sticko.app/'
const TITLE = 'WhatsApp Sticker Resources'
const DESCRIPTION =
  'Free, open reference for WhatsApp stickers: exact size and format requirements, animated stickers, tray icons, pack metadata and conversion recipes.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: TITLE,
  url: `${SITE_URL}/`,
  description: DESCRIPTION,
  inLanguage: 'en',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  publisher: {
    '@type': 'Organization',
    name: 'Sticko',
    url: STICKO_URL,
    sameAs: [
      'https://play.google.com/store/apps/details?id=com.hqinfosystem.sticko.wastickerapps.stickers',
      'https://apps.apple.com/in/app/sticko-animated-sticker-maker/id1592890261',
      'https://www.instagram.com/stickoapp',
      'https://www.facebook.com/stickoapp',
      'https://x.com/sticko_app'
    ]
  }
}

export default defineConfig({
  lang: 'en-US',
  title: TITLE,
  description: DESCRIPTION,
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,

  sitemap: { hostname: `${SITE_URL}/` },

  markdown: {
    // VitePress defaults to rel="noreferrer", which hides this site from referral analytics.
    externalLinks: { target: '_blank', rel: 'noopener' }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#5b23dd' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: TITLE }],
    ['meta', { property: 'og:image', content: 'https://sticko.app/static/og/sticko-og-default.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)]
  ],

  // Per-page canonical + Open Graph URL/title/description.
  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = `${SITE_URL}/${path}`
    const title = pageData.frontmatter.title ?? pageData.title
    const description = pageData.frontmatter.description ?? DESCRIPTION

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title ? `${title} | ${TITLE}` : TITLE }],
      ['meta', { property: 'og:description', content: description }]
    )
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Specs', link: '/whatsapp-sticker-size' },
      { text: 'Developers', link: '/contents-json' },
      { text: 'Checklist', link: '/checklist' },
      { text: 'Sticko', link: STICKO_URL, rel: 'noopener' }
    ],

    sidebar: [
      {
        text: 'Requirements',
        items: [
          { text: 'Sticker size', link: '/whatsapp-sticker-size' },
          { text: 'File format (WebP)', link: '/whatsapp-sticker-format' },
          { text: 'Animated stickers', link: '/animated-whatsapp-stickers' },
          { text: 'Tray icon', link: '/tray-icon' }
        ]
      },
      {
        text: 'Building packs',
        items: [
          { text: 'Converting images to WebP', link: '/convert-images-to-webp' },
          { text: 'contents.json reference', link: '/contents-json' },
          { text: 'Pre-publish checklist', link: '/checklist' }
        ]
      },
      {
        text: 'Help',
        items: [{ text: 'Troubleshooting', link: '/whatsapp-sticker-troubleshooting' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: REPO_URL }],

    editLink: {
      pattern: `${REPO_URL}/edit/main/docs/:path`,
      text: 'Suggest an edit on GitHub'
    },

    search: { provider: 'local' },

    footer: {
      message:
        'Content licensed under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener" target="_blank">CC BY 4.0</a>. Maintained by <a href="https://sticko.app/" target="_blank" rel="noopener">Sticko</a>.',
      copyright: 'Not affiliated with WhatsApp or Meta.'
    }
  }
})
