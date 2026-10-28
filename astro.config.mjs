import { defineConfig } from "astro/config";

// Static site, deployed on Vercel. If the Vercel URL changes, update `site` (canonical links).
// Clean URLs: pages are built as /captions.html and served at /captions (vercel.json:
// cleanUrls, no trailing slash), so every page has exactly one URL.
export default defineConfig({
  site: "https://kreokit.vercel.app",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
