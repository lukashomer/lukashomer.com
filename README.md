# lukashomer.com

Personal portfolio of Lukáš Homér — product designer & design engineer. Built as a macOS desktop: menu bar, desktop icons, Finder/Notes-style windows, and a pixelated 3D character.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion. Implemented 1:1 from Figma with styles researched from the macOS 26 Community kit.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit content

- **Everything lives in `data/projects.ts`** — projects, greeting, desktop icons, menu bar, contacts, resume. No component edits needed for copy changes.
- **Contact placeholders**: replace `PLACEHOLDER_EMAIL` and `PLACEHOLDER_LINKEDIN` in `data/projects.ts`.
- **Character**: replace `/public/objects/character.png` (transparent PNG; it's downscaled on purpose — the pixel look comes from `image-rendering: pixelated`).
- **Project images**: drop files into `/public/projects/<slug>/` at the paths referenced in the data file; gray placeholder blocks render until they exist.
- **Resume PDF**: drop the real file at `/public/resume.pdf`.
- **Desktop icons**: 40px PNGs in `/public/desktop/` (small on purpose, same pixel effect).
