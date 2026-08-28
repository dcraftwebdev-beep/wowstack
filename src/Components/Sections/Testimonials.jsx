import React from "react";
import styles from "./Section-Styles/Testimonials.module.css";
import { Quote, Play } from "lucide-react";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const TextCard = ({ t }) => (
  <div className={styles.textCard}>
    <Quote className={styles.quoteMark} fill="currentColor" />
    <div className={styles.person}>
      <span className={styles.avatar}>{initials(t.name)}</span>
      <div>
        <div className={styles.name}>{t.name}</div>
        <div className={styles.role}>{t.role}</div>
      </div>
    </div>
    <div className={styles.body}>
      {t.text.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  </div>
);

const MediaCard = ({ t }) => (
  <div className={styles.mediaCard}>
    <img src={t.img} alt={t.headline} loading="lazy" />
    <span className={styles.play}>
      <Play size={18} fill="currentColor" />
    </span>
    <div className={styles.mediaOverlay}>
      <span className={styles.mediaLogo}>◆ {t.logo}</span>
      <h4 className={styles.mediaHeadline}>{t.headline}</h4>
    </div>
  </div>
);

const col1 = [
  {
    type: "media",
    logo: "BrightPath",
    headline: "How BrightPath Boosted Leads by 80%",
    img: "/services/contact.jpg",
  },
  {
    type: "text",
    name: "Daniel Kim",
    role: "Founder, ScaleLabs Education",
    text: [
      "Our enrollment pages used to confuse visitors. Now the journey is clean and intuitive.",
      "We've increased enrollment conversion by 35% in just one quarter.",
    ],
  },
  {
    type: "text",
    name: "Alex Johnson",
    role: "Head of Operations, Finovate Consulting",
    text: [
      "Security and performance were major concerns for us. They delivered a build that was not only beautiful but genuinely enterprise-grade secure.",
    ],
  },
];

const col2 = [
  {
    type: "text",
    name: "David Lee",
    role: "Founder, Atodio Studio",
    text: [
      "We were losing leads to a slow, outdated site. Their redesign cut our load time in half and dramatically improved our conversions.",
    ],
  },
  {
    type: "text",
    name: "Sarah Mitchell",
    role: "COO, BrightPath SaaS",
    text: [
      "We struggled with an inconsistent brand and a clunky website. Wow Stack gave us clarity first, then execution.",
      "Now our site loads fast, looks sharp on every device, and our demo bookings are up 40% while reducing bounce.",
    ],
  },
  {
    type: "text",
    name: "Jonathan Reed",
    role: "Managing Director, Nexora Digital Agency",
    text: [
      "We were scaling fast but our website couldn't keep up. They rebuilt it into one fast, cohesive experience.",
      "The result? A site we're proud to show and complete confidence in our brand.",
    ],
  },
];

const col3 = [
  {
    type: "text",
    name: "Michael Tran",
    role: "Founder & CEO, Skyline Realty Group",
    text: [
      "Our new website nearly doubled our qualified enquiries. The build was faster than we expected — and it still performs beautifully months later.",
    ],
  },
  {
    type: "media",
    logo: "Elevate",
    headline: "Scaling an E-Commerce Brand by 3×",
    img: "/services/social-media-communication-concept.jpg",
  },
  {
    type: "text",
    name: "Laura Martinez",
    role: "CMO, Elevate Commerce Co.",
    text: [
      "Our brand always felt fragmented — too many tools, not enough cohesion.",
      "They unified everything into one polished identity — website, visuals, and content, all working together with precision.",
    ],
  },
];

const renderItem = (t, i) =>
  t.type === "media" ? <MediaCard key={i} t={t} /> : <TextCard key={i} t={t} />;

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* HEADER — same style as other sections */}
        <div className={styles.header}>
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">Testimonials</span>
            <span className="uiTag__line" />
          </div>
          <h2 className={styles.title}>
            What They're Saying{" "}
            <span className={styles.titleMuted}>About Working With Us</span>
          </h2>
        </div>

        {/* MASONRY */}
        <div className={styles.grid}>
          <div className={`${styles.col} ${styles.colA}`}>{col1.map(renderItem)}</div>
          <div className={`${styles.col} ${styles.colB}`}>{col2.map(renderItem)}</div>
          <div className={`${styles.col} ${styles.colC}`}>{col3.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
