# profile-pro

Personal site of Alejandro Pozo — backend engineer focused on ERP, accounting systems and domain-driven backend architecture.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), bilingual (EN/ES) and statically rendered.

## Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Tailwind CSS 3 + `@tailwindcss/typography`
- **Content:** Astro Content Collections (`case-studies`, `articles`) with Zod schemas
- **i18n:** Native Astro i18n, `en` (default, unprefixed) + `es` (`/es/...`), with `es → en` fallback
- **Motion:** `animejs` (SSR-safe, hydrated client-side)
- **SEO:** `@astrojs/sitemap` with hreflang, JSON-LD, Open Graph + Twitter cards
- **Type checks:** `astro check` runs as part of `build`

## Project layout

```
src/
  components/
    layout/         Header, Footer
    sections/       Home-page sections (Hero, Specialization, ...)
    ui/             Small reusable bits (Tag, Reveal, headings, cards)
    visuals/        Decorative diagrams (IntentRouter, FlowDiagram, ...)
  content/
    case-studies/   en/, es/ — markdown case studies
    articles/       en/, es/ — markdown articles
    config.ts       Collection schemas (Zod)
  i18n/             ui.ts (translation strings) + utils.ts
  layouts/          BaseLayout, ArticleLayout, CaseStudyLayout, PageLayout
  lib/              site.ts (site metadata), motion.ts (anime helpers)
  pages/
    *.astro         English routes (default locale, no /en prefix)
    es/             Spanish routes
    case-studies/   Index + [slug].astro
    writing/        Index + [slug].astro
  styles/           global.css
public/
  favicon.svg, og-image.svg, og-image.png, robots.txt
scripts/
  build-og-image.mjs   Rasterises og-image.svg → og-image.png (sharp)
```

## Getting started

Requires Node 18+.

```bash
npm install
npm run dev          # http://localhost:4321
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check (`astro check`) and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- <cmd>` | Forward a raw Astro CLI command |

### Regenerating the OG image

The canonical OG asset is `public/og-image.svg`; crawlers consume the rasterised PNG. After editing the SVG:

```bash
npx --yes --package=sharp@latest node scripts/build-og-image.mjs
```

## Configuration

- **Canonical URL** — `astro.config.mjs` exports `SITE` (currently `https://aless-dev.beyondhabitsllc.com`). Sitemap entries, canonical links, OG and Twitter URLs all derive from it. Update it when the production domain changes.
- **Site metadata** — `src/lib/site.ts` (name, email, social links, specialization tags, navigation).
- **Translations** — `src/i18n/ui.ts` holds all UI strings; helpers in `src/i18n/utils.ts`.

## Authoring content

Case studies live in `src/content/case-studies/{en,es}/<slug>.md`; articles in `src/content/articles/{en,es}/<slug>.md`. Each file must satisfy the Zod schema in `src/content/config.ts`. Set `draft: true` to keep an entry out of public listings while it is in progress.

To add a new case study or article, create matching files under both `en/` and `es/` (or only `en/` — the i18n config falls back to English when a Spanish version is missing).

## Deployment

Static output. Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages):

```bash
npm run build       # outputs to dist/
```

Make sure the deployment target serves `dist/` and the production domain matches `SITE` in `astro.config.mjs` so canonical URLs and the sitemap line up.
