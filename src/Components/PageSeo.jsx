import React from "react";
import Seo from "./Seo";
import { SEO } from "../data/seoConfig";

/**
 * Reads title/description/keywords for `path` from the central src/data/seoConfig.js
 * so pages don't hardcode their own metadata. Extra props (jsonLd, noindex, image…)
 * pass straight through to <Seo>.
 *
 *   <PageSeo path="/about" />
 *   <PageSeo path="/" jsonLd={[orgJsonLd, websiteJsonLd]} />
 */
export default function PageSeo({ path, ...extra }) {
  const meta = SEO[path] || {};
  return <Seo path={path} {...meta} {...extra} />;
}
