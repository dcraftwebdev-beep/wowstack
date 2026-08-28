/**
 * Single source of truth for projects / case studies.
 *
 * Reads/writes Supabase when configured (see src/lib/supabase.js + .env).
 * Falls back to seed data (overlaid with localStorage) until keys are set, so
 * the public site never breaks during setup. The homepage work section, the
 * case-study page, and the admin dashboard all go through this module.
 */
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const px = (seed, w = 1200, h = 820) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ── seed / fallback data ─────────────────────────────────────────────────────
export const SEED = [
  {
    id: "dental-clinic",
    slug: "dental-clinic-management",
    name: "Dental Clinic Management",
    client: "Dr. Amin's Dental",
    category: "Web App",
    industry: "Healthcare",
    year: "2026",
    status: "published",
    featured: true,
    accent: "#38bdf8",
    url: "https://dr-amins.netlify.app/",
    shortDesc:
      "Appointments, patient records and billing were scattered across paper and spreadsheets. We built one clean platform the whole clinic runs on.",
    positioning:
      "One calm platform for a busy clinic — appointments, records and billing, finally in one place.",
    heroImage: px("wowstack-cs-dental-hero"),
    gallery: [px("wowstack-cs-dental-1"), px("wowstack-cs-dental-2"), px("wowstack-cs-dental-3", 1200, 1500)],
    services: ["Product Design", "Web App Development", "UX Strategy"],
    technologies: ["React", "Vite", "Supabase", "Tailwind"],
    timeline: "6 weeks",
    deliverables: ["Design system", "Booking module", "Patient records", "Billing"],
    challenge:
      "The clinic juggled paper diaries, WhatsApp messages and three spreadsheets. Double-bookings were common, patient history took minutes to find, and billing at the desk slowed everything down.",
    approach:
      "We shadowed a day at the front desk, mapped every real workflow, then designed around the two things that mattered most: booking speed and instant access to a patient's history. Nothing fancy — just fast, obvious, and hard to get wrong.",
    solution:
      "A single dashboard with a live appointment calendar, one-tap patient records, and billing built into the visit flow. Reception books in seconds, dentists see full history on open, and the day's numbers are always one glance away.",
    metrics: [
      { value: "100%", label: "Paperless front desk" },
      { value: "3× faster", label: "Patient lookup" },
      { value: "0", label: "Double-bookings" },
    ],
    sortOrder: 0,
  },
  {
    id: "gym-management",
    slug: "gym-management-system",
    name: "Gym Management System",
    client: "Iron & Oak Fitness",
    category: "Full-Stack Platform",
    industry: "Fitness",
    year: "2026",
    status: "published",
    featured: true,
    accent: "#f59e0b",
    url: "",
    shortDesc:
      "A full platform with role-based dashboards for owners, trainers and members — memberships, attendance and workout plans in one system.",
    positioning:
      "Run the whole gym from one screen — members, trainers and owners, each with exactly what they need.",
    heroImage: px("wowstack-cs-gym-hero"),
    gallery: [px("wowstack-cs-gym-1"), px("wowstack-cs-gym-2", 1200, 1500), px("wowstack-cs-gym-3")],
    services: ["Product Strategy", "Full-Stack Development", "Dashboard Design"],
    technologies: ["React", "Vite", "Supabase", "Node.js"],
    timeline: "10 weeks",
    deliverables: ["Owner dashboard", "Trainer portal", "Member app", "Billing & attendance"],
    challenge:
      "The owner tracked memberships in a notebook, trainers texted workout plans, and renewals slipped through the cracks — quietly losing revenue every month.",
    approach:
      "We split the product by role. Owners needed money and attendance at a glance; trainers needed to assign plans fast; members just wanted their schedule and progress. One data model, three focused experiences.",
    solution:
      "Role-based dashboards on a shared backend: automated membership billing, attendance tracking, and workout-plan assignment. Renewals now prompt automatically and the owner sees revenue live.",
    metrics: [
      { value: "+28%", label: "On-time renewals" },
      { value: "3 roles", label: "One platform" },
      { value: "Live", label: "Revenue tracking" },
    ],
    sortOrder: 1,
  },
  {
    id: "lms",
    slug: "learning-management-system",
    name: "Learning Management System",
    client: "BrightPath Academy",
    category: "Web Platform",
    industry: "Education",
    year: "2026",
    status: "published",
    featured: true,
    accent: "#34d399",
    url: "",
    shortDesc:
      "An interactive course platform with video streaming, progress tracking and student dashboards — built to keep learners coming back.",
    positioning:
      "A course platform students actually finish — clear paths, real progress, zero friction.",
    heroImage: px("wowstack-cs-lms-hero"),
    gallery: [px("wowstack-cs-lms-1"), px("wowstack-cs-lms-2"), px("wowstack-cs-lms-3", 1200, 1500)],
    services: ["UX Design", "Web Development", "Video Infrastructure"],
    technologies: ["React", "Vite", "PHP", "Laravel"],
    timeline: "12 weeks",
    deliverables: ["Course builder", "Video player", "Progress tracking", "Student dashboard"],
    challenge:
      "Courses lived across Drive links and PDFs. Students dropped off halfway, and the team had no idea where — or why.",
    approach:
      "We designed for momentum: a clear learning path, visible progress, and a distraction-free player. Then we instrumented every step so the team could see exactly where learners stalled.",
    solution:
      "A streaming course platform with progress tracking, resumable lessons and a personal dashboard. Instructors publish in minutes; students always know what's next.",
    metrics: [
      { value: "+41%", label: "Course completion" },
      { value: "1-click", label: "Resume lessons" },
      { value: "Real-time", label: "Progress insights" },
    ],
    sortOrder: 2,
  },
];

// ── snake_case (DB) ↔ camelCase (app) ────────────────────────────────────────
function fromRow(r) {
  return {
    id: r.id, slug: r.slug, name: r.name, client: r.client, category: r.category,
    industry: r.industry, year: r.year, status: r.status, featured: !!r.featured,
    accent: r.accent, url: r.url, shortDesc: r.short_desc, positioning: r.positioning,
    previewImage: r.preview_image, heroImage: r.hero_image, gallery: r.gallery || [], services: r.services || [],
    technologies: r.technologies || [], deliverables: r.deliverables || [],
    timeline: r.timeline, challenge: r.challenge, approach: r.approach, solution: r.solution,
    metrics: r.metrics || [], sortOrder: r.sort_order ?? 0, views: r.views ?? 0,
  };
}
function toRow(p) {
  return {
    id: p.id, slug: p.slug, name: p.name, client: p.client, category: p.category,
    industry: p.industry, year: p.year, status: p.status, featured: !!p.featured,
    accent: p.accent, url: p.url, short_desc: p.shortDesc, positioning: p.positioning,
    preview_image: p.previewImage, hero_image: p.heroImage, gallery: p.gallery || [], services: p.services || [],
    technologies: p.technologies || [], deliverables: p.deliverables || [],
    timeline: p.timeline, challenge: p.challenge, approach: p.approach, solution: p.solution,
    metrics: p.metrics || [], sort_order: p.sortOrder ?? 0,
  };
}

// ── localStorage fallback (used only when Supabase isn't configured) ──────────
const KEY = "wowstack_projects_v1";
function loadLocal() {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
  } catch { /* ignore */ }
  return SEED;
}
function writeLocal(list) {
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

// ── public async API ─────────────────────────────────────────────────────────
// overlay local view tallies so counts show even before the SQL RPC is set up
function withViews(list) {
  const local = loadLocalViews();
  return list.map((p) => ({ ...p, views: Math.max(p.views || 0, local[p.slug] || 0) }));
}

export async function listAll() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("projects").select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return withViews((data || []).map(fromRow));
  }
  return withViews(loadLocal());
}

export async function listPublished() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("projects").select("*").eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data || []).map(fromRow);
  }
  return loadLocal().filter((p) => p.status === "published");
}

export async function getBySlug(slug) {
  const local = loadLocalViews();
  const overlay = (p) => (p ? { ...p, views: Math.max(p.views || 0, local[p.slug] || 0) } : p);
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? overlay(fromRow(data)) : null;
  }
  return overlay(loadLocal().find((p) => p.slug === slug)) || null;
}

// make a slug unique against everything except the row being saved
function makeUniqueSlug(slug, taken) {
  const base = slug || "project";
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
async function existingSlugs(excludeId) {
  if (isSupabaseConfigured) {
    const { data } = await supabase.from("projects").select("id, slug");
    return (data || []).filter((r) => r.id !== excludeId).map((r) => r.slug);
  }
  return loadLocal().filter((p) => p.id !== excludeId).map((p) => p.slug);
}

export async function saveProject(project) {
  const taken = await existingSlugs(project.id);
  const p = { ...project, slug: makeUniqueSlug(project.slug, taken) };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("projects").upsert(toRow(p)).select().maybeSingle();
    if (error) {
      if (error.code === "23505")
        throw new Error("That slug is already in use — please pick a different one.");
      throw error;
    }
    return data ? fromRow(data) : p;
  }
  const list = loadLocal();
  const i = list.findIndex((x) => x.id === p.id);
  if (i >= 0) list[i] = p; else list.unshift(p);
  writeLocal(list);
  return p;
}

export async function deleteProject(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  writeLocal(loadLocal().filter((p) => p.id !== id));
}

// ── case-study view counter ──────────────────────────────────────────────────
const VIEWS_KEY = "wowstack_views_v1";
function loadLocalViews() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(VIEWS_KEY) || "{}"); } catch { return {}; }
}
function bumpLocalView(slug) {
  try {
    const v = loadLocalViews();
    v[slug] = (v[slug] || 0) + 1;
    window.localStorage.setItem(VIEWS_KEY, JSON.stringify(v));
  } catch { /* ignore */ }
}

/** Called from the public case-study page when a project is viewed. */
export async function incrementViews(slug) {
  if (!slug) return;
  bumpLocalView(slug); // instant local tally + fallback
  if (isSupabaseConfigured) {
    try { await supabase.rpc("increment_project_views", { p_slug: slug }); } catch { /* RPC not set up yet — local tally still works */ }
  }
}

// seed helper for first-time Supabase setup (call once from the dashboard)
export async function seedIfEmpty() {
  if (!isSupabaseConfigured) return;
  const { count, error } = await supabase.from("projects").select("id", { count: "exact", head: true });
  if (error) throw error;
  if (!count) {
    const { error: e2 } = await supabase.from("projects").upsert(SEED.map(toRow));
    if (e2) throw e2;
  }
}

export { isSupabaseConfigured };
