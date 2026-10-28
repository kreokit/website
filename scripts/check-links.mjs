// Checks that every download link in data/apps.json (and each app's release and repo page)
// answers 200 after redirects. Run before every push: npm run check-links
import { readFileSync } from "node:fs";
import { downloadUrl, releasesUrl, tagUrl, repoUrl } from "../src/lib/links.mjs";

const apps = JSON.parse(readFileSync(new URL("../data/apps.json", import.meta.url), "utf8"));

const urls = [];
for (const app of Object.values(apps)) {
  urls.push(repoUrl(app), releasesUrl(app), tagUrl(app));
  for (const file of Object.values(app.files)) urls.push(downloadUrl(app, file));
}

let failed = 0;
for (const url of urls) {
  let status;
  try {
    // HEAD follows GitHub's redirect to the file storage without downloading the file.
    status = (await fetch(url, { method: "HEAD", redirect: "follow" })).status;
  } catch (e) {
    status = `error: ${e.message}`;
  }
  const ok = status === 200;
  if (!ok) failed++;
  console.log(`${ok ? "ok " : "BAD"} ${status}  ${url}`);
}

console.log(`\n${urls.length - failed}/${urls.length} links return 200.`);
if (failed) {
  console.error("Fix the tag or file names in data/apps.json (npm run sync-releases fills them from GitHub), then run this again.");
  process.exit(1);
}
