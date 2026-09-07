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
} from "lucide-react";
import styles from "./Section-Styles/MyServices.module.css";

// our existing services content, in the new Framer card design
const SERVICES = [
  {
    Icon: Code2,
    color: "blue",
    title: "Web Design & Development",
    tag: "PRO",
    sub: "Custom Websites",
    desc: "Beautiful, high-performing websites designed and coded to turn visitors into customers.",
  },
  {
    Icon: Smartphone,
    color: "violet",
    title: "App Development",
    tag: "NEW",
    sub: "iOS & Android",
    desc: "Native and cross-platform apps built for speed, usability, and real business results.",
  },
  {
    Icon: LayoutDashboard,
    color: "orange",
    title: "Custom Dashboards",
    tag: "PRO",
    sub: "Any Business Solution",
    desc: "Tailored dashboards for any solution, turning your data into clear, actionable insights.",
  },
  {
    Icon: Presentation,
    color: "green",
    title: "PPT & Presentation Design",
    tag: "NEW",
    sub: "Pitch Perfect",
    desc: "Polished, professional presentation decks that pitch your ideas with real impact.",
  },
  {
    Icon: ShoppingCart,
    color: "yellow",
    title: "E-Commerce Dashboards",
    tag: "NEW",
    sub: "Sales & Orders",
    desc: "Real-time dashboards to track sales, inventory, and orders across your online store.",
  },
  {
    Icon: Flame,
    color: "lightblue",
    title: "Website Heatmaps",
    tag: "NEW",
    sub: "User Behavior",
    desc: "Complete heatmap and click-tracking analysis showing exactly how visitors use your site.",
  },
  {
    Icon: Search,
    color: "pink",
    title: "Search Engine Optimization",
    tag: "PRO",
    sub: "Organic Growth",
    desc: "Boost your website's visibility and attract organic traffic with SEO tailored to your goals.",
  },
  {
    Icon: Palette,
    color: "teal",
    title: "UI/UX Design",
    tag: "NEW",
    sub: "Product Design",
    desc: "Intuitive, on-brand interfaces crafted to make every user journey effortless.",
  },
  {
    Icon: LifeBuoy,
    color: "indigo",
    title: "Maintenance & Support",
    tag: "PRO",
    sub: "Always Online",
    desc: "Ongoing updates, monitoring, and support to keep your product fast, secure, and reliable.",
  },
];

export default function MyServices() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll(`.${styles.reveal}`)];
    const revealAll = () => els.forEach((el) => el.classList.add(styles.in));
    if (!("IntersectionObserver" in window)) {
      revealAll();
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services-section" className={styles.section} ref={ref}>
      {/* TOP: content */}
      <div className={styles.top}>
        <div className={styles.content}>
          <div className={`uiTag ${styles.reveal}`}>
            <span className="uiTag__dot" />
            <span className="uiTag__text">Our Services</span>
            <span className="uiTag__line" />
          </div>

          <h2 className={`${styles.title} ${styles.reveal}`}>
            Services Designed To
            <span className={styles.titleMuted}>Drive Real Results</span>
          </h2>

          <p className={`${styles.body} ${styles.reveal}`}>
            Experience growth through innovative digital marketing designed to
            reach, inspire, and deliver results.
          </p>
{/* 
          <Link to="/services" className={`${styles.cta} ${styles.reveal}`}>
            View Our Services
          </Link> */}
        </div>
      </div>

      {/* GRID: stays inside the max-width container */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {SERVICES.slice(0, 6).map((s, i) => (
            <Link
              to="/services"
              key={i}
              className={`${styles.card} ${styles.reveal}`}
            >
              <span className={styles.blueHighlighter} />

              <div className={styles.cardTop}>
                <span className={`${styles.icon} ${styles[s.color]}`}>
                  <s.Icon size={22} strokeWidth={2} />
                </span>
                <ArrowUpRight
                  className={styles.cardArrow}
                  size={30}
                  strokeWidth={1.6}
                />
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

        <div className={styles.moreWrap}>
          <Link to="/services" className={`${styles.more} ${styles.reveal}`}>
            See more services
            <span className={styles.moreArrow}>
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}