import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = "https://cgtennisos.info";
const apiBase = process.env.VITE_CONTENT_API_BASE || "https://api.cgtennisos.com";
const staticRoutes = [
  ["/", "1.0"],
  ["/about", "0.8"],
  ["/book", "0.8"],
  ["/insights", "0.95"],
  ["/coach-readiness", "0.85"],
  ["/cg-tennis-os", "0.85"],
  ["/contact", "0.6"],
  ["/changelog", "0.45"],
];

function entry(path, priority, lastmod) {
  return `  <url>\n    <loc>${siteUrl}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <changefreq>${path === "/changelog" ? "weekly" : "monthly"}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function fetchPublished(type) {
  const response = await fetch(`${apiBase}/api/content?type=${type}&status=published`);
  if (!response.ok) throw new Error(`Could not fetch ${type} content`);
  return response.json();
}

let articles = [];
let updates = [];
try {
  [articles, updates] = await Promise.all([fetchPublished("article"), fetchPublished("product_update")]);
} catch (error) {
  console.warn(`[sitemap] Using static routes only: ${error.message}`);
}

const urls = [
  ...staticRoutes.map(([path, priority]) => entry(path, priority)),
  ...articles.map((item) => entry(`/insights/${encodeURIComponent(item.slug)}`, "0.8", item.published_at?.slice(0, 10))),
  ...updates.map((item) => entry(`/changelog/${encodeURIComponent(item.slug)}`, "0.35", item.published_at?.slice(0, 10))),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
await mkdir("client/public", { recursive: true });
await writeFile("client/public/sitemap.xml", xml, "utf8");
console.log(`[sitemap] Wrote ${urls.length} URLs`);
