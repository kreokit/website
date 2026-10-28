<p align="center">
  <img src="public/brand/kreokit-logo.png" alt="KreoKit" width="320">
</p>

# KreoKit website

The website for [KreoKit](https://github.com/kreokit): 5 free, offline creator apps. No account, no subscription.

A static [Astro](https://astro.build) site, deployed on Vercel. No tracking, no cookies, no third-party requests (the Inter font and all images are served from the site itself).

## Pages

- `/`: the pitch, the five apps, the rules, Star on GitHub
- `/captions`, `/cutout`, `/clips`, `/voice`, `/rec`: what the app does, how it works, screenshot, downloads
- `/install`: how to install and open the unsigned alpha on Windows, Mac and Linux

## Downloads

Every download button is a direct link to a file of the app's current release:
`https://github.com/kreokit/<app>/releases/download/<tag>/<file>`. Our releases are pre-releases, so `/releases/latest` can't be used.

The tag and exact file names of each app live in **[`data/apps.json`](data/apps.json)**, the only file to change after a release:

```bash
npm run sync-releases -- captions   # reads the newest v* release with gh and fills data/apps.json
npm run check-links                 # every download link must return 200
```

Run `npm run check-links` before every push. The page detects the visitor's system and shows their file as the big button (on a Mac where the browser doesn't say which chip it has, both Mac files); all other files are listed under "Other systems". Without JavaScript, all files are listed.

What each app does is in [`src/lib/apps.mjs`](src/lib/apps.mjs). Take it from the app's README and release notes, and describe only what the released version does.

## Screenshots

Each app page shows a placeholder until you add a screenshot: put `public/screenshots/<app>.png` (or `.jpg` / `.webp`, about 16:10, e.g. 1600×1000) in the repository and it replaces the placeholder at the next build.

## Development

Needs Node 22.23.4 or later.

```bash
npm install
npm run dev       # http://localhost:1500
npm run build     # static site in dist/
```

## License

Dual-licensed under [MIT](LICENSE-MIT) or [Apache 2.0](LICENSE-APACHE), at your option. Inter is under the SIL Open Font License (bundled via `@fontsource-variable/inter`).
