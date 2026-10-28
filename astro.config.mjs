import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE = "https://kreokit.vercel.app";

// Static site, deployed on Vercel. If the Vercel URL changes, update SITE (canonical links,
// sitemap) and public/robots.txt.
// Clean URLs: pages are built as /captions.html and served at /captions (vercel.json:
// cleanUrls, no trailing slash), so every page has exactly one URL.
export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") })],
});
