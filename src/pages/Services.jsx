import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Search,
  Code2,
  Smartphone,
  LayoutDashboard,
  Presentation,
  ShoppingCart,
  Flame,
  Palette,
  LifeBuoy,
  Workflow,
  MessageSquare,
  Bot,
  Zap,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import styles from "../Components/Sections/Section-Styles/MyServices.module.css";
import { SITE_URL } from "../Components/Seo";
import PageSeo from "../Components/PageSeo";

const SERVICES = [
  { Icon: Code2, color: "blue", title: "Web Design & Development", tag: "PRO", sub: "Custom Websites", desc: "Beautiful, high-performing websites designed and coded to turn visitors into customers." },
  { Icon: Smartphone, color: "violet", title: "App Development", tag: "NEW", sub: "iOS & Android", desc: "Native and cross-platform apps built for speed, usability, and real business results." },
  { Icon: LayoutDashboard, color: "orange", title: "Custom Dashboards", tag: "PRO", sub: "Any Business Solution", desc: "Tailored dashboards that turn your data into clear, actionable insights." },
  { Icon: Presentation, color: "green", title: "PPT & Presentation Design", tag: "NEW", sub: "Pitch Perfect", desc: "Polished, professional presentation decks that pitch your ideas with real impact." },
  { Icon: ShoppingCart, color: "yellow", title: "E-Commerce Dashboards", tag: "NEW", sub: "Sales & Orders", desc: "Real-time dashboards to track sales, inventory, and orders across your online store." },
  { Icon: Flame, color: "lightblue", title: "Website Heatmaps", tag: "NEW", sub: "User Behavior", desc: "Complete heatmap and click-tracking analysis showing exactly how visitors use your site." },
  { Icon: Search, color: "pink", title: "SEO & Growth Marketing", tag: "PRO", sub: "Ongoing Campaigns", desc: "Keyword strategy, content and off-page campaigns that climb Google rankings month after month." },
  { Icon: Palette, color: "teal", title: "UI/UX Design", tag: "NEW", sub: "Product Design", desc: "Intuitive, on-brand interfaces crafted to make every user journey effortless." },
  { Icon: LifeBuoy, color: "indigo", title: "Maintenance & Support", tag: "PRO", sub: "Always Online", desc: "Ongoing updates, monitoring, and support to keep your product fast, secure, and reliable." },
  { Icon: Workflow, color: "orange", title: "n8n Workflow Automation", tag: "NEW", sub: "Run on Autopilot", desc: "Custom n8n workflows that connect your apps and automate repetitive tasks — no manual work, no missed steps." },
  { Icon: MessageSquare, color: "green", title: "WhatsApp Chatbot & Ordering", tag: "HOT", sub: "Conversational Commerce", desc: "Let customers browse, ask and order right inside WhatsApp — an always-on chatbot that captures and confirms orders 24/7." },
  { Icon: Bot, color: "violet", title: "AI Website Chatbot", tag: "NEW", sub: "Instant Answers", desc: "A smart AI assistant on your site that answers questions, qualifies leads and books calls while you sleep." },
  { Icon: Zap, color: "yellow", title: "Lead & CRM Automation", tag: "PRO", sub: "Never Miss a Lead", desc: "Every enquiry auto-captured, tagged and routed to WhatsApp, email and your CRM the moment it lands." },
  { Icon: CalendarClock, color: "blue", title: "Booking & Reminder Bots", tag: "NEW", sub: "Auto-Scheduling", desc: "Self-serve booking with automated confirmations and reminders that slash no-shows and free up your day." },
  { Icon: Sparkles, color: "pink", title: "AI Content & Social Automation", tag: "HOT", sub: "Post on Autopilot", desc: "Auto-generate and schedule on-brand posts, captions and replies so your socials stay active without the grind." },
];

export default function Services() {
  const ref = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Vanta GLOBE — interactive amber globe behind the hero content
  useEffect(() => {
    if (!vantaRef.current) return;
    let effect;
    try {
      effect = GLOBE({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xf59e0b,        // amber lines
        color2: 0xfbbf24,       // amber points
        backgroundColor: 0x07060a,
        size: 1,
      });
    } catch (e) { /* WebGL unavailable — hero just shows the dark background */ }
    return () => { effect && effect.destroy && effect.destroy(); };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll(`.${styles.reveal}`)];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        provider: { "@type": "Organization", name: "Wow Stack" },
        areaServed: "India",
      },
    })),
  };

  return (
    <section className={styles.section} ref={ref} style={{ paddingTop: "132px" }}>
      <PageSeo path="/services" jsonLd={servicesJsonLd} />
      <div
        className={styles.top}
        style={{ position: "relative", overflow: "hidden", minHeight: "clamp(420px, 62vh, 600px)", display: "flex", alignItems: "center" }}
      >
        <div ref={vantaRef} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(65% 65% at 50% 45%, transparent 0%, rgba(7,6,10,0.55) 100%)" }} />
        <div className={styles.content} style={{ position: "relative", zIndex: 1 }}>
          <div className={`uiTag ${styles.reveal}`}>
            <span className="uiTag__dot" />
            <span className="uiTag__text">Our Services</span>
            <span className="uiTag__line" />
          </div>

          <h1 className={`${styles.title} ${styles.reveal}`}>
            Everything You Need To
            <span className={styles.titleMuted}>Grow Online</span>
          </h1>

          <p className={`${styles.body} ${styles.reveal}`}>
            A complete toolkit of design, development, and growth services — each
            crafted to make your brand look credible and convert.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <Link
              to="/contact"
              key={i}
              className={`${styles.card} ${styles.reveal}`}
            >
              <span className={styles.blueHighlighter} />
              <div className={styles.cardTop}>
                <span className={`${styles.icon} ${styles[s.color]}`}>
                  <s.Icon size={22} strokeWidth={2} />
                </span>
                <ArrowUpRight className={styles.cardArrow} size={30} strokeWidth={1.6} />
              </div>
              <div className={styles.cardMiddle}>
                <div className={styles.titleTag}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <span className={styles.badge}>{s.tag}</span>
                </div>
                <p className={styles.cardSub}>{s.sub}</p>
              </div>
              <span className={styles.separator} />
              <p className={styles.cardDesc}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
