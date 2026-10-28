// Fills data/apps.json with each app's newest release tag and exact download file names,
// read from GitHub with `gh`. Usage: npm run sync-releases [-- captions rec ...]
// Our releases are pre-releases, so /releases/latest can't be used: the tag is the newest
// published (non-draft) release whose tag starts with "v" (models-vN mirrors are skipped).
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const DATA = new URL("../data/apps.json", import.meta.url);
const SLUGS = ["captions", "cutout", "clips", "voice", "rec"];

// Which release file goes on which button, by its suffix.
const KINDS = {
  windows: /_x64-setup\.exe$/,
  macArm: /_aarch64\.dmg$/,
  macIntel: /_x64\.dmg$/,
  appImage: /_amd64\.AppImage$/,
  deb: /_amd64\.deb$/,
};

const gh = (...args) => JSON.parse(execFileSync("gh", args, { encoding: "utf8" }));

const data = JSON.parse(readFileSync(DATA, "utf8").trim() || "{}");
const wanted = process.argv.slice(2);
for (const slug of wanted.length ? wanted : SLUGS) {
  if (!SLUGS.includes(slug)) throw new Error(`Unknown app "${slug}". Use one of: ${SLUGS.join(", ")}`);
  const repo = `kreokit/${slug}`;
  const releases = gh("release", "list", "-R", repo, "--limit", "50", "--json", "tagName,isDraft,publishedAt");
  const release = releases
    .filter((r) => !r.isDraft && r.tagName.startsWith("v"))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
  if (!release) throw new Error(`${repo} has no published v* release yet. Publish one first, then run this again.`);
  const tag = release.tagName;
  const names = gh("release", "view", tag, "-R", repo, "--json", "assets").assets.map((a) => a.name);
  const files = {};
  for (const [kind, re] of Object.entries(KINDS)) {
    const hits = names.filter((n) => re.test(n));
    if (hits.length !== 1) {
      throw new Error(`${repo} ${tag}: expected one file matching ${re}, found ${hits.length} (${hits.join(", ") || "none"}). Check the release's files on GitHub.`);
    }
    files[kind] = hits[0];
  }
  data[slug] = { repo, tag, files };
  console.log(`${slug}: ${tag}`);
}

const ordered = Object.fromEntries(SLUGS.filter((s) => data[s]).map((s) => [s, data[s]]));
writeFileSync(DATA, JSON.stringify(ordered, null, 2) + "\n");
console.log("Updated data/apps.json. Now run: npm run check-links");
