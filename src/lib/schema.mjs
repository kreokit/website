// Structured data (JSON-LD, schema.org) for each page. Only facts that are on the page;
// no ratings or reviews. Validated by scripts/check-seo.mjs after every build.
import { ORG_URL } from "./apps.mjs";
import { downloadUrl, repoUrl, tagUrl } from "./links.mjs";

export const SITE = "https://kreokit.vercel.app";
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

export const organization = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: "KreoKit",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/brand/icon-512.png`, width: 512, height: 512 },
  description: "Free, open-source, offline creator apps for Windows, Mac and Linux.",
  sameAs: [ORG_URL],
});

export const website = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  name: "KreoKit",
  url: `${SITE}/`,
  description: "5 free, offline creator apps. No account, no subscription.",
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

export const breadcrumbs = (name, path) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "KreoKit", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
  ],
});

export const softwareApplication = (app, image) => ({
  "@type": "SoftwareApplication",
  "@id": `${SITE}/${app.slug}#app`,
  name: app.fullName,
  description: app.description,
  url: `${SITE}/${app.slug}`,
  image,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows 10, Windows 11, macOS 12 or later, Linux",
  softwareVersion: app.tag.replace(/^v/, ""),
  releaseNotes: tagUrl(app),
  downloadUrl: Object.values(app.files).map((file) => downloadUrl(app, file)),
  featureList: app.features.map(([title]) => title),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isAccessibleForFree: true,
  license: ["https://opensource.org/license/mit", "https://www.apache.org/licenses/LICENSE-2.0"],
  sameAs: [repoUrl(app)],
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

export const faqPage = (faq, path) => ({
  "@type": "FAQPage",
  "@id": `${SITE}${path}#faq`,
  mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

// One <script type="application/ld+json"> per page, as a @graph. "<" is escaped so the
// JSON can never close the script tag.
export const jsonLd = (nodes) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
