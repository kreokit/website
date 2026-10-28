# KreoKit website: notes for Claude Code

Read this before every task.

**Status (2026-10-28):** built and pushed. Static Astro site for Vercel (project name `kreokit`, URL https://kreokit.vercel.app; kreo.vercel.app was already taken).

## Rules

- **Simple and fast.** Static pages, no framework islands, one small inline script (download detection). No analytics, no cookies, no third-party requests: the font and images are served from the site. Don't add any.
- **Same brand as the apps:** flat dark design (#0E0E10 base, surface steps, 1px borders, no gradients, shadows or blur), Inter, lime #C8F135 only for the primary button, active indicators and the focus ring, never large areas.
- **Don't invent features.** App copy (`src/lib/apps.mjs`) comes from each app's README, CLAUDE.md and release notes.
- **Downloads are direct file links** (`/releases/download/<tag>/<file>`), never `/releases/latest` (our releases are pre-releases). Tags and file names live only in `data/apps.json`; URLs are built only in `src/lib/links.mjs` (used by the pages and the link check).
- **Before every push:** `npm run build` and `npm run check-links` (all links 200).
- Mobile-friendly: no horizontal scroll at 390 px. Headless Chrome won't go below 500 px wide; check phone widths in a 390 px iframe.

## After an app release

`npm run sync-releases -- <app>` (reads the newest published v* release with `gh`), `npm run check-links`, build, commit, push. Vercel deploys from `main`.

## Files

- `data/apps.json`: tag + file names per app
- `src/lib/apps.mjs`: app copy (what it does, 3 steps, requirements)
- `src/components/Downloads.astro`: download buttons + system detection
- `src/pages/`: `/`, `/[app]`, `/install`, 404
- `public/brand/`: logo and icons, made from `assets/brand` in the app repos (dark backdrop made transparent)
- `public/screenshots/<app>.png|jpg|webp`: replaces the placeholder when present
