// Makes the 1200×630 social sharing images in public/og/ (home + one per app) by
// screenshotting an HTML card with headless Chrome. Run after changing an app's name or
// pitch: npm run og (needs Google Chrome; set CHROME=/path/to/chrome elsewhere).
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { apps } from "../src/lib/apps.mjs";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}. Install Google Chrome or set CHROME=/path/to/chrome.`);

const root = fileURLToPath(new URL("..", import.meta.url));
const font = join(root, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2");
const logo = join(root, "public/brand/kreokit-logo.png");
const out = join(root, "public/og");
mkdirSync(out, { recursive: true });

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Flat brand card: dark base, white title, grey pitch, lime only as a small accent bar.
const card = ({ title, pitch, url }) => `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: Inter; src: url("file://${font}") format("woff2"); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: #0e0e10; color: #f4f4f5; font-family: Inter, sans-serif; padding: 64px 72px;
         display: flex; flex-direction: column; border: 1px solid #2a2a30; }
  .logo { height: 64px; width: auto; align-self: flex-start; }
  .main { margin-top: auto; }
  .bar { width: 72px; height: 8px; background: #c8f135; border-radius: 4px; margin-bottom: 28px; }
  h1 { font-size: 84px; font-weight: 750; letter-spacing: -0.03em; line-height: 1.05; }
  p { margin-top: 22px; font-size: 38px; line-height: 1.3; color: #a1a1aa; max-width: 1000px; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 26px; color: #a1a1aa; }
  .foot b { color: #f4f4f5; font-weight: 600; }
</style>
<img class="logo" src="file://${logo}">
<div class="main"><div class="bar"></div><h1>${escape(title)}</h1><p>${escape(pitch)}</p></div>
<div class="foot"><span>Free · Offline · No account</span><b>${escape(url)}</b></div>`;

const cards = [
  { name: "home", title: "5 free, offline creator apps", pitch: "No account, no subscription. Captions, Cutout, Clips, Voice and Rec for Windows, Mac and Linux.", url: "kreokit.vercel.app" },
  ...apps.map((app) => ({ name: app.slug, title: app.fullName, pitch: app.short, url: `kreokit.vercel.app/${app.slug}` })),
];

const tmp = mkdtempSync(join(tmpdir(), "kreokit-og-"));
try {
  for (const c of cards) {
    const html = join(tmp, `${c.name}.html`);
    const png = join(out, `${c.name}.png`);
    writeFileSync(html, card(c));
    await shoot(html, png, join(tmp, `profile-${c.name}`));
    console.log(`${c.name}.png  ${Math.round(statSync(png).size / 1024)} KB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// Headless Chrome writes the screenshot but doesn't always exit, so stop it once the file is there.
function shoot(html, png, profile) {
  rmSync(png, { force: true });
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
    `--user-data-dir=${profile}`, "--window-size=1200,630", "--virtual-time-budget=2000", `--screenshot=${png}`, `file://${html}`,
  ], { stdio: "ignore" });
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (existsSync(png) && statSync(png).size > 0) {
        clearInterval(timer);
        setTimeout(() => (chrome.kill(), resolve()), 500);
      } else if (Date.now() - started > 30000) {
        clearInterval(timer);
        chrome.kill();
        reject(new Error(`Chrome didn't write ${png} within 30 s.`));
      }
    }, 200);
  });
}
