# CityGo — client app project page

Astro 5 + Tailwind CSS 4, static output, no client-side JavaScript.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

- **Content** lives in `src/data/project.ts`; components only render it.
- **Screenshots**: replace `src/assets/screens/*.png` (same filenames). `<Picture>` generates AVIF/WebP at several widths at build time. Update the `alt` text in the data file to match.
- **Routes**: breadcrumb and part links point to `/projects/...`. A part without an `href` renders as a disabled "Soon" card.
- **Design tokens** (colours, fonts, guides, gutter) are in `src/styles/global.css`.

## Site pages

| Page | Route | Content |
| --- | --- | --- |
| Home | `/` | `home` and `site` in `src/data/site.ts` |
| About & contact | `/about` | `about` in `src/data/site.ts` |

The contact copy buttons (`CopyButton.astro`) are the only client JavaScript on the site: a small inline script that reveals the buttons, so they stay hidden when JavaScript is off.

Other projects live in `otherProjects` in `src/data/site.ts`; a project without `href` shows as a card without a link until its page exists.

Replace the placeholder email and LinkedIn address in `site.contact` (`src/data/site.ts`), and the portrait at `src/assets/about-portrait.jpg` (3:4) (4:5, same name).

The header (`SiteBar.astro`, links from `site.nav`) lives in `Base.astro` and has two versions: the homepage one (`home` prop) is sticky and numbered, every other page gets the "← Back to index" one with a per-page label and it scrolls away. Serif accents use Cormorant (`@fontsource-variable/cormorant`), so run `npm install` after unzipping. The homepage hero is a line-art SVG at `src/assets/home-hero.svg` (the girl with glasses), shown in a 4:5 frame with `object-contain` (a plain `<img>`, because `astro:assets` does not resize SVGs). To use a raster image instead, import it in `src/pages/index.astro` and keep the same `<img>` classes. The homepage Correspondence image is the vertical `src/assets/contact-image.svg` (frameless); the typewriter sketch `src/assets/typewriter.svg` sits beside the contacts on `/about`. Replace it with `contact-image.svg` or `contact-image.png`. Every image sits in a fixed-ratio frame (`FramedPicture.astro`): whatever size or shape you drop in is cropped to the frame, so it can never change the layout (screens are cropped from the top; change `position` for other crops). The homepage "Selected work" list comes from `home.work`: the first project is the featured case study and the entries of `otherProjects` follow as smaller cards.

## CityGo case study (/citygo)

A one-page case study built from the Lovable design at `/portfolio/citygo` in `city-glide-dashboard-hub`: `src/pages/citygo.astro` with its own layout (`src/layouts/Folio.astro`, no site header), content in `src/data/citygo-folio.ts`, styles scoped to `.folio` in `global.css`. The homepage "See my work" button points here; the longer three-part case study under `/projects/citygo` is kept as a backup.

Its six plate images are placeholders in `src/assets/folio/` (`rings`, `pressed`, `branches`, `moss`, `leaf`, `tree`): save your own file with the same name as `.png`, `.jpg` or `.webp` and it replaces the placeholder. Each image sits in a fixed frame and is cropped to it.

## CityGo case study v2 (/case-study)

A one-page case study in the site's own style, using the layout and content of the Lovable design: hero with fact strip, overview, a system-design diagram, client-app and admin-dashboard overviews (what travellers and staff can do), an "Under the hood" ledger and "What's next". Content is in `src/data/citygo-case.ts`; the diagram geometry is in `src/data/citygo-diagram.ts` (`SystemDiagram.astro` draws it as SVG). The image is a placeholder in `src/assets/case/` (`hero.png`, 4:5). The homepage "See my work" button and the featured CityGo card both point here.

## Part pages

CityGo is documented in three parts: two apps and the platform they share. Each part is one data file plus the shared section components (every section takes its content as a prop). To add or edit a page, change the data file only.

| Part | Data | Page (route) |
| --- | --- | --- |
| CityGo overview | `citygo` in `src/data/site.ts` | `src/pages/projects/citygo/index.astro` (`/projects/citygo`) |
| 1 Client app (with the Milo chapter) | `src/data/project.ts` | `src/pages/projects/citygo/client-app.astro` |
| 2 Admin dashboard (with the demo-data seeder chapter) | `src/data/admin-dashboard.ts` | `src/pages/projects/citygo/admin-dashboard.astro` |
| 3 Platform (API & data, notifications, delivery, testing) | `src/data/platform.ts` | `src/pages/projects/citygo/platform.astro` |

- A part can carry extra `chapters` (a spotlight on something that lives inside it): each is rendered by `Chapter.astro` as its own section with its own anchor, and can have its own decisions.
- "See it in action" is a carousel (`Carousel.astro`): swipe, scroll, arrow keys, or the buttons and dots that a small script adds. Screens come from the `screens` array; a `portrait: true` screen is centred in the frame.
- Status chips: plain = done, amber dot = in progress (`roadmapInProgress`, `testing.inProgress`), dashed = planned.
- Content shape: `src/data/types.ts`. The system map and its links come from `src/data/parts.ts`.
- Story blocks are prose (`text`), a built-in figure (`figure`), a step flow (`flow`) or labelled sample cards (`samples`); non-prose blocks are numbered automatically.
- The optional `decisions` block renders the "Decisions" section.
- Screenshots live in `src/assets/screens/`. `scripts/placeholders.mjs` only creates files that don't exist yet, so it never overwrites real ones: replace a placeholder by saving your image under the same name.

## Colours

The whole site is themed from the tokens at the top of `src/styles/global.css`: a solid #F1EEE3 ground (`--page-bg`), cream cards (`--color-white` is deliberately cream), warm ink and royal-navy brand and signature colour (`--color-brand`, `--color-signature`). Change the tokens to re-theme;

## About page art

The lede on `/about` opens with a drop cap: `src/assets/about-letter.svg` replaces the first character of `about.lede` in `src/data/site.ts`, so the lede has to start with the letter L (the real character stays in the page as hidden text for screen readers). The contact illustration is `src/assets/contact-image.svg`, drawn without a frame.

## Type roles, rhythm and the signature colour

- **Serif (Cormorant):** page titles (`display`), section headings (`heading`, via `H2.astro`) and two editorial moments, the About lede and the contact lead and email. Nothing else is serif.
- **Sans (Inter / SF):** body copy, buttons, navigation, card and list titles.
- **Mono (Geist Mono):** small labels, indexes and captions only.
- **Spacing:** every section after the first starts `pt-16 sm:pt-24`; the first section after a hero uses `pt-12 sm:pt-16`; content that follows a heading with no intro gets `mt-3`.
- **Signature colour:** `--color-signature` in `src/styles/global.css` (royal navy `#1c2f78`). It appears only as the hero tag, the bookmark ribbon on the home hero, the About drop cap, the "lasts." accent, the email underline, the Project tags and text selection. For rich dark red use `#7a1523`; note red already means "planned" on the case study.

## Secondary projects

The homepage "More projects" cards come from `otherProjects` in `src/data/site.ts`. Each card links straight to the live app (`href`, opened in a new tab); there are no separate project pages. Replace the placeholder Sunset Pizza URL there.

## Case-study hero image

`src/assets/case/hero.png` is generated by `node scripts/case-hero.mjs`: the admin dashboard (`src/assets/screens/admin-overview.png`) on a laptop and the client app (`src/assets/screens/browse-mobile.png`) on a phone, as a transparent PNG with no backdrop or frame, so it sits straight on the page. After replacing those two screenshots with real ones, run the script again.

## Deploying (Cloudflare Pages)

Connect the GitHub repo in Cloudflare (Workers & Pages → Create → Pages). Build command `npm run build`, output directory `dist`, and an environment variable `NODE_VERSION` matching `.nvmrc`. Every push to `main` deploys; other branches get preview URLs. The CI workflow in `.github/workflows/ci.yml` only checks that the site builds.
