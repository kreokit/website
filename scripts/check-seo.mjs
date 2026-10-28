// Checks the built pages in dist/ (run `npm run build` first): titles, descriptions,
// headings, canonical URLs and image alt text. See docs/seo.md.
import { readdirSync, readFileSync } from "node:fs";

const SITE = "https://kreokit.vercel.app";
const dist = new URL("../dist/", import.meta.url);
const pages = readdirSync(dist).filter((f) => f.endsWith(".html"));

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, name) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? "");

let errors = 0;
const fail = (page, msg) => {
  errors++;
  console.log(`BAD ${page}: ${msg}`);
};
const seen = { title: new Map(), description: new Map() };

for (const page of pages) {
  const html = readFileSync(new URL(page, dist), "utf8");
  const noindex = /<meta name="robots" content="noindex"/.test(html);
  const path = page === "index.html" ? "/" : `/${page.replace(/\.html$/, "")}`;

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = meta(html, "name", "description");
  if (!title || title.length > 60) fail(page, `title must be 1–60 characters (${title.length}): "${title}"`);
  if (!description || description.length > 155) fail(page, `meta description must be 1–155 characters (${description.length})`);
  for (const [key, value] of [["title", title], ["description", description]]) {
    if (seen[key].has(value)) fail(page, `same ${key} as ${seen[key].get(value)}`);
    seen[key].set(value, page);
  }

  if (!/<html lang="en"/.test(html)) fail(page, 'missing <html lang="en">');

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  if (levels.filter((l) => l === 1).length !== 1) fail(page, `needs exactly one h1 (found ${levels.filter((l) => l === 1).length})`);
  if (levels[0] !== 1) fail(page, "the first heading must be the h1");
  levels.forEach((l, i) => i && l > levels[i - 1] + 1 && fail(page, `heading jumps from h${levels[i - 1]} to h${l}`));

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!noindex && canonical !== SITE + (path === "/" ? "/" : path)) fail(page, `canonical should be ${SITE}${path}, is ${canonical}`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="[^"]+"/.test(img)) fail(page, `image without alt text: ${img.slice(0, 80)}`);
  }

  console.log(`ok  ${path.padEnd(10)} ${String(title.length).padStart(2)} | ${String(description.length).padStart(3)} | ${title}`);
}

console.log(`\n${pages.length} pages checked, ${errors} problem(s).`);
if (errors) {
  console.error("Fix the problems above (titles and descriptions live in src/lib/apps.mjs and each page's <Base>), rebuild, and run this again.");
  process.exit(1);
}
