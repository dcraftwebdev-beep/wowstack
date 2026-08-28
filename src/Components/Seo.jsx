import { useEffect } from "react";

/**
 * Per-route SEO for the SPA.
 * Imperatively upserts <title>/<meta>/<link> so the tags already present in
 * index.html are UPDATED in place (no duplicate canonical/description tags),
 * and manages per-page JSON-LD structured data.
 */
export const SITE_URL = "https://wowstack.vercel.app";
const DEFAULT_IMAGE = "/fav-icon.png";

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  keywords,
  type = "website",
  jsonLd,
  noindex = false,
}) {
  useEffect(() => {
    const url = SITE_URL + path;
    const img = image.startsWith("http") ? image : SITE_URL + image;

    if (title) document.title = title;
    upsertMeta("name", "description", description);
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:site_name", "Wow Stack");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    // JSON-LD structured data — injected per page, cleaned up on unmount
    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    const nodes = blocks.map((block) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "1";
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
      return s;
    });

    return () => nodes.forEach((n) => n.remove());
  }, [title, description, path, image, keywords, type, noindex, JSON.stringify(jsonLd)]);

  return null;
}
