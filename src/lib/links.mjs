// The one place that turns data/apps.json entries into GitHub URLs (used by the pages and
// by scripts/check-links.mjs, so the checked links are exactly the published ones).
const GH = "https://github.com";

export const repoUrl = (app) => `${GH}/${app.repo}`;
export const releasesUrl = (app) => `${GH}/${app.repo}/releases`;
export const tagUrl = (app) => `${GH}/${app.repo}/releases/tag/${app.tag}`;
export const downloadUrl = (app, file) => `${GH}/${app.repo}/releases/download/${app.tag}/${encodeURIComponent(file)}`;
