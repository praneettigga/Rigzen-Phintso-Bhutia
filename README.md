# Rigzen Phintso Bhutia — Architecture Portfolio

Portfolio site for Rigzen Phintso Bhutia, a 4th-year architecture student from Sikkim at Manipal School of Architecture & Planning. Built with [Astro](https://astro.build) as a fully static site, ready for Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type-check .astro / .ts
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

Node 20.3+ (see `.nvmrc`).

## Deploy to Vercel

Either:

- **Git:** push this repo to GitHub → vercel.com → *Add New Project* → import it. Vercel detects Astro; `vercel.json` already sets the build command, output directory and cache headers.
- **CLI:** `npm i -g vercel && vercel` (then `vercel --prod`).

After connecting a custom domain, update `site` in `astro.config.mjs` and the sitemap line in `public/robots.txt`.

## Where things live

| What | Where |
| --- | --- |
| Name, email, education, skills, languages, menu labels | `src/data/site.ts` |
| Projects (text, captions, figure order, layout) | `src/content/projects/*.md` |
| Images (extracted from the PDF) | `src/assets/brand`, `src/assets/projects/<slug>/` |
| Colours, type scale, reveal animations | `src/styles/global.css` |
| Opening "overture" sequence | `src/components/Overture.astro` |
| Hero (intro + portrait) | `src/components/Hero.astro` |
| 3D cover-flow | `src/pages/work/index.astro` |
| Project page ("liner notes") | `src/pages/work/[slug].astro` |
| Scroll, smooth-scroll, split text, panorama | `src/scripts/motion.ts` |

### Adding or editing a project

Create `src/content/projects/06-name.md` with the same frontmatter shape as the others. Each chapter has a `heading`, optional `body`, a `layout` (`stack`, `pair`, `trio`, `panorama`) and `figures` (`src`, `caption`, optional `size: full | wide | tall`). Figures are numbered automatically.

### Swapping the hero photo for an animated self-portrait

Put the file in `public/` (e.g. `public/self-portrait.mp4`, `.webm`, `.gif` or `.webp`) and set `selfPortrait: '/self-portrait.mp4'` in `src/data/site.ts`.

### Re-extracting images from the PDF

The source PDF (~75 MB) is git-ignored. With poppler-utils and ImageMagick 7 installed:

```bash
npm run assets   # reads docs/references/Rigzen_Internship_Portfolio.pdf
```

Crop rectangles are listed in `scripts/extract-assets.sh` in a 2000px-wide reference frame per page.

## Notes

- Tibetan strings (project names, name, cover title, menu labels) were reconstructed from the PDF's text layer — worth a proofread by Rigzen.
- Motion respects `prefers-reduced-motion`; all content is visible without JavaScript.
