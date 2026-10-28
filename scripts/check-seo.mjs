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

  checkJsonLd(page, path, html);

  console.log(`ok  ${path.padEnd(10)} ${String(title.length).padStart(2)} | ${String(description.length).padStart(3)} | ${title}`);
}

// Structured data: the types each page must have, with the fields Google and schema.org expect.
function checkJsonLd(page, path, html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  const nodes = [];
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      if (data["@context"] !== "https://schema.org") fail(page, "JSON-LD @context must be https://schema.org");
      nodes.push(...(data["@graph"] ?? [data]));
    } catch (e) {
      fail(page, `JSON-LD doesn't parse: ${e.message}`);
    }
  }
  if (/aggregateRating|"review"/i.test(blocks.join(""))) fail(page, "no ratings or reviews in structured data");

  const isApp = /^\/(captions|cutout|clips|voice|rec)$/.test(path);
  const expected = path === "/" ? ["Organization", "WebSite"] : isApp ? ["SoftwareApplication", "FAQPage", "BreadcrumbList"] : path === "/install" ? ["BreadcrumbList"] : [];
  const types = nodes.map((n) => n["@type"]);
  for (const type of expected) if (!types.includes(type)) fail(page, `missing ${type} structured data`);
  const text = decode(html.replace(/<script.*?<\/script>/gs, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  const links = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => decode(m[1])));

  for (const n of nodes) {
    const need = (keys) => keys.forEach((k) => (n[k] === undefined || n[k] === "") && fail(page, `${n["@type"]} needs "${k}"`));
    if (n["@type"] === "Organization") need(["name", "url", "logo", "sameAs"]);
    if (n["@type"] === "WebSite") need(["name", "url", "publisher"]);
    if (n["@type"] === "SoftwareApplication") {
      need(["name", "description", "url", "operatingSystem", "softwareVersion", "license", "downloadUrl", "offers"]);
      if (n.applicationCategory !== "MultimediaApplication") fail(page, "applicationCategory must be MultimediaApplication");
      if (n.offers?.price !== "0" || !n.offers?.priceCurrency) fail(page, 'offers must be price "0" with a currency');
      if (n.url !== SITE + path) fail(page, `SoftwareApplication url should be ${SITE}${path}`);
      for (const url of n.downloadUrl ?? []) if (!links.has(url)) fail(page, `downloadUrl isn't a download link on the page: ${url}`);
      if ((n.downloadUrl ?? []).length !== 5) fail(page, "SoftwareApplication needs the 5 download URLs");
    }
    if (n["@type"] === "FAQPage") {
      if (!n.mainEntity?.length) fail(page, "FAQPage has no questions");
      for (const q of n.mainEntity ?? []) {
        if (q["@type"] !== "Question" || !q.name || !q.acceptedAnswer?.text) fail(page, "each FAQ entry needs a question and an answer");
        if (!text.includes(q.name) || !text.includes(q.acceptedAnswer?.text)) fail(page, `FAQ entry not shown on the page: ${q.name}`);
      }
    }
    if (n["@type"] === "BreadcrumbList") {
      n.itemListElement.forEach((item, i) => {
        if (item.position !== i + 1 || !item.name || !/^https:\/\//.test(item.item)) fail(page, "breadcrumb items need position, name and an absolute URL");
      });
      if (n.itemListElement.at(-1)?.item !== SITE + path) fail(page, "the last breadcrumb must be this page");
    }
  }
}

console.log(`\n${pages.length} pages checked, ${errors} problem(s).`);
if (errors) {
  console.error("Fix the problems above (titles and descriptions live in src/lib/apps.mjs and each page's <Base>), rebuild, and run this again.");
  process.exit(1);
}
