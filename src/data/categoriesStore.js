/**
 * Category list for the project form dropdown.
 * Managed separately from projects (Dashboard → Settings) and persisted in
 * localStorage so choices survive reloads. Kept intentionally lightweight —
 * these are just UI labels, not relational data.
 */
const KEY = "wowstack_categories_v1";
const DEFAULTS = [
  "Web App",
  "Web Platform",
  "Full-Stack Platform",
  "Website",
  "E-commerce",
  "Mobile App",
  "Branding",
  "SaaS Product",
];

export function listCategories() {
  if (typeof window === "undefined") return [...DEFAULTS];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) { const c = JSON.parse(raw); if (Array.isArray(c) && c.length) return c; }
  } catch { /* ignore */ }
  return [...DEFAULTS];
}

function write(list) {
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

export function addCategory(name) {
  const clean = (name || "").trim();
  if (!clean) return listCategories();
  const list = listCategories();
  if (!list.some((c) => c.toLowerCase() === clean.toLowerCase())) list.push(clean);
  write(list);
  return list;
}

export function removeCategory(name) {
  const list = listCategories().filter((c) => c !== name);
  write(list);
  return list;
}
