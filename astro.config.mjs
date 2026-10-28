import { defineConfig } from "astro/config";

// Static site, deployed on Vercel. If the Vercel URL changes, update `site` (canonical links).
export default defineConfig({
  site: "https://kreokit.vercel.app",
  output: "static",
  devToolbar: { enabled: false },
});
