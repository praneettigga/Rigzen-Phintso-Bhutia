# Rigzen Phintso Bhutia — Architecture Portfolio

Portfolio site for Rigzen Phintso Bhutia, a 4th-year architecture student from Sikkim at Manipal School of Architecture & Planning. Built with [Next.js](https://nextjs.org) (App Router, every page pre-rendered at build time), ready for Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build (.next/)
npm run start      # serve the production build
```

Node 20.9+ (see `.nvmrc`).

## Deploy to Vercel

Either:

- **Git:** push this repo to GitHub → vercel.com → *Add New Project* → import it. Vercel detects Next.js automatically; nothing to configure.
- **CLI:** `npm i -g vercel && vercel` (then `vercel --prod`).

After connecting a custom domain, set the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel (or change `SITE_URL` in `src/data/site.ts`). It feeds canonical URLs, Open Graph, `sitemap.xml` and `robots.txt`.

## Where things live

| What | Where |
| --- | --- |
| Name, email, education, skills, languages, menu labels | `src/data/site.ts` |
| Projects (text, captions, figure order, layout) | `src/content/projects.ts` |
| Images (extracted from the PDF) | `src/assets/brand`, `src/assets/projects/<slug>/` |
| Colours, type scale, reveal animations | `src/styles/global.css` (+ per-area CSS in `src/styles/`) |
| Opening "overture" sequence | `src/components/Overture.tsx` |
| Hero (intro + portrait) | `src/components/Hero.tsx` |
| Header + overlay menu | `src/components/Chrome.tsx` |
| 3D cover-flow | `src/components/CoverFlow.tsx` |
| Project page ("liner notes") | `src/app/work/[slug]/page.tsx` |
| Scroll reveals, smooth scroll, split text, pinned panorama | `src/lib/motion.ts` (run on every route change by `src/components/MotionRoot.tsx`) |

### Adding or editing a project

Import the images at the top of `src/content/projects.ts` and add an entry to the `projects` array (same shape as the others). Each chapter has a `heading`, optional `body`, a `layout` (`stack`, `pair`, `trio`, `panorama`) and `figures` (`src`, `caption`, optional `size: full | wide | tall`). Figures are numbered automatically.

### Swapping the hero photo for an animated self-portrait

Create a `public/` folder and put the file there (e.g. `public/self-portrait.mp4`, `.webm`, `.gif` or `.webp`) and set `selfPortrait: '/self-portrait.mp4'` in `src/data/site.ts`.

### Re-extracting images from the PDF

The source PDF (~75 MB) is git-ignored. With poppler-utils and ImageMagick 7 installed:

```bash
npm run assets   # reads docs/references/Rigzen_Internship_Portfolio.pdf
```

Crop rectangles are listed in `scripts/extract-assets.sh` in a 2000px-wide reference frame per page.

## Notes

- Tibetan strings (project names, name, cover title, menu labels) were reconstructed from the PDF's text layer — worth a proofread by Rigzen.
- Motion respects `prefers-reduced-motion`; all content is visible without JavaScript.
