import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight ,ArrowUpRight,} from "lucide-react";
import s from "./Section-Styles/ToolsSection.module.css";

// real stack — logos via Simple Icons CDN (slug/color), monogram fallback
// Stack data for the tools marquee.
// `slug` maps to Simple Icons: https://cdn.simpleicons.org/{slug}/{color}
// `abbr` is the text fallback when an icon 404s. `tint` is the glow/hover colour
// — brand hex nudged brighter so it survives a dark background.

export const GROUPS = [
  "Foundations",
  "Styling & Motion",
  "Frameworks",
  "3D",
  "Backend & Data",
  "CMS & Commerce",
  "Infrastructure",
  "Payments",
  "Automation & Messaging",
  "Analytics & Growth",
  "AI",
  "Design",
];

export const TOOLS = [
  // ── Foundations ──────────────────────────────────────────────
  { name: "HTML5",          slug: "html5",              color: "E34F26", abbr: "H5",  tint: "#E34F26", group: "Foundations" },
  { name: "CSS3",           slug: "css3",               color: "1572B6", abbr: "C3",  tint: "#4AA3FF", group: "Foundations" },
  { name: "JavaScript",     slug: "javascript",         color: "F7DF1E", abbr: "JS",  tint: "#F7DF1E", group: "Foundations" },
  { name: "TypeScript",     slug: "typescript",         color: "3178C6", abbr: "TS",  tint: "#4C9BE8", group: "Foundations" },

  // ── Styling & Motion ─────────────────────────────────────────
  { name: "Tailwind CSS",   slug: "tailwindcss",        color: "06B6D4", abbr: "tw",  tint: "#38BDF8", group: "Styling & Motion" },
  { name: "Framer Motion",  slug: "framer",             color: "0055FF", abbr: "Fm",  tint: "#4D7BFF", group: "Styling & Motion" },
  { name: "GSAP",           slug: "greensock",          color: "88CE02", abbr: "gs",  tint: "#A6E22E", group: "Styling & Motion" },
  { name: "Lottie",         slug: "lottiefiles",        color: "00DDB3", abbr: "Lt",  tint: "#00DDB3", group: "Styling & Motion" },

  // ── Frameworks ───────────────────────────────────────────────
  { name: "React",          slug: "react",              color: "61DAFB", abbr: "Re",  tint: "#61DAFB", group: "Frameworks" },
  { name: "Next.js",        slug: "nextdotjs",          color: "FFFFFF", abbr: "N",   tint: "#FFFFFF", group: "Frameworks" },
  { name: "Vite",           slug: "vite",               color: "646CFF", abbr: "Vt",  tint: "#8B84FF", group: "Frameworks" },
  { name: "Node.js",        slug: "nodedotjs",          color: "5FA04E", abbr: "No",  tint: "#7BC95C", group: "Frameworks" },

  // ── 3D ───────────────────────────────────────────────────────
  { name: "Three.js",       slug: "threedotjs",         color: "FFFFFF", abbr: "3js", tint: "#FFFFFF", group: "3D" },
  { name: "Theatre.js",     slug: "theaterjs",          color: "FFFFFF", abbr: "Th",  tint: "#FFFFFF", group: "3D" },
  { name: "Blender",        slug: "blender",            color: "F5792A", abbr: "Bl",  tint: "#FF9A4D", group: "3D" },
  { name: "After Effects",  slug: "adobeaftereffects",  color: "9999FF", abbr: "Ae",  tint: "#B3B3FF", group: "3D" },

  // ── Backend & Data ───────────────────────────────────────────
  { name: "Supabase",       slug: "supabase",           color: "3FCF8E", abbr: "Sb",  tint: "#3ECF8E", group: "Backend & Data" },
  { name: "Firebase",       slug: "firebase",           color: "FFCA28", abbr: "Fb",  tint: "#FFA000", group: "Backend & Data" },
  { name: "PostgreSQL",     slug: "postgresql",         color: "4169E1", abbr: "Pg",  tint: "#6C8FF5", group: "Backend & Data" },

  // ── CMS & Commerce ───────────────────────────────────────────
  { name: "Sanity",         slug: "sanity",             color: "F03E2F", abbr: "Sn",  tint: "#FF5A4D", group: "CMS & Commerce" },
  { name: "WordPress",      slug: "wordpress",          color: "21759B", abbr: "Wp",  tint: "#4A9FD0", group: "CMS & Commerce" },
  { name: "Webflow",        slug: "webflow",            color: "0055FF", abbr: "wf",  tint: "#4D8BFF", group: "CMS & Commerce" },
  { name: "Shopify",        slug: "shopify",            color: "7AB55C", abbr: "Sh",  tint: "#95C978", group: "CMS & Commerce" },

  // ── Infrastructure ───────────────────────────────────────────
  { name: "Vercel",         slug: "vercel",             color: "FFFFFF", abbr: "▲",   tint: "#FFFFFF", group: "Infrastructure" },
  { name: "Cloudflare",     slug: "cloudflare",         color: "F38020", abbr: "Cf",  tint: "#FFA04D", group: "Infrastructure" },
  { name: "Netlify",        slug: "netlify",            color: "00C7B7", abbr: "Nl",  tint: "#00C7B7", group: "Infrastructure" },
  { name: "GitHub",         slug: "github",             color: "FFFFFF", abbr: "gh",  tint: "#FFFFFF", group: "Infrastructure" },

  // ── Payments ─────────────────────────────────────────────────
  { name: "Razorpay",       slug: "razorpay",           color: "3395FF", abbr: "Rz",  tint: "#4A9BFF", group: "Payments" },
  { name: "Stripe",         slug: "stripe",             color: "635BFF", abbr: "St",  tint: "#8B7BFF", group: "Payments" },

  // ── Automation & Messaging ───────────────────────────────────
  { name: "n8n",            slug: "n8n",                color: "EA4B71", abbr: "n8",  tint: "#EA4B71", group: "Automation & Messaging" },
  { name: "Zapier",         slug: "zapier",             color: "FF4F00", abbr: "Zp",  tint: "#FF6B33", group: "Automation & Messaging" },
  { name: "WhatsApp",       slug: "whatsapp",           color: "25D366", abbr: "Wa",  tint: "#25D366", group: "Automation & Messaging" },
  { name: "Resend",         slug: "resend",             color: "FFFFFF", abbr: "Rs",  tint: "#FFFFFF", group: "Automation & Messaging" },

  // ── Analytics & Growth ───────────────────────────────────────
  { name: "Google Analytics",   slug: "googleanalytics",    color: "E37400", abbr: "GA",  tint: "#FFA033", group: "Analytics & Growth" },
  { name: "Google Tag Manager", slug: "googletagmanager",   color: "246FDB", abbr: "GTM", tint: "#5A8FF0", group: "Analytics & Growth" },
  { name: "Meta",               slug: "meta",               color: "0467DF", abbr: "Mt",  tint: "#4A90E8", group: "Analytics & Growth" },
  { name: "HubSpot",            slug: "hubspot",            color: "FF7A59", abbr: "Hs",  tint: "#FF9478", group: "Analytics & Growth" },

  // ── AI ───────────────────────────────────────────────────────
  { name: "OpenAI",         slug: "openai",             color: "FFFFFF", abbr: "Ai",  tint: "#FFFFFF", group: "AI" },
  { name: "Claude",         slug: "claude",             color: "D97757", abbr: "Cl",  tint: "#E08B6E", group: "AI" },
  { name: "ElevenLabs",     slug: "elevenlabs",         color: "FFFFFF", abbr: "11",  tint: "#FFFFFF", group: "AI" },

  // ── Design ───────────────────────────────────────────────────
  { name: "Figma",          slug: "figma",              color: "F24E1E", abbr: "Fg",  tint: "#FF7262", group: "Design" },
];

export const iconUrl = (tool) =>
  `https://cdn.simpleicons.org/${tool.slug}/${tool.color}`;

export const byGroup = (group) => TOOLS.filter((t) => t.group === group);

export default function ToolsSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(`.${s.reveal}`);
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(s.isVisible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.isVisible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const half = Math.ceil(TOOLS.length / 2);
  const rows = [TOOLS.slice(0, half), TOOLS.slice(half)];

  return (
    <section className={s.section} ref={rootRef}>
      <div className={`${s.head} ${s.reveal}`}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">Our Toolkit</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={s.title}>
          Built With the Tools{" "}
          <span className={s.titleAccent}>That Scale</span>
        </h2>
        <p className={s.sub}>
          We build on a modern, battle-tested stack — and connect the automation
          apps you already use — so your website is fast, reliable and ready to grow.
        </p>
      </div>

      <div className={`${s.stage} ${s.reveal}`}>
        {rows.map((row, r) => (
          <div className={`${s.row} ${r % 2 === 0 ? s.rowLeft : s.rowRight}`} key={r}>
            <div className={s.track}>
              {[...row, ...row].map((t, i) => (
                <span
                  className={s.tile}
                  key={`${t.name}-${i}`}
                  title={t.name}
                  aria-hidden={i >= row.length}
                >
                  <img
                    className={s.logo}
                    src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                    alt={`${t.name} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const m = e.currentTarget.nextElementSibling;
                      if (m) m.style.display = "grid";
                    }}
                  />
                  <b className={s.mono} style={{ color: t.tint }}>{t.abbr}</b>
                  <span className={s.tileName}>{t.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

       <div className={s.moreWrap}>
          <Link to="/services" className={`${s.more} ${s.reveal}`}>
            Our services
            <span className={s.moreArrow}>
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
    </section>
  );
}
