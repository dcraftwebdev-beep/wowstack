import React, { useEffect, useRef } from "react";
import styles from "./Section-Styles/WhyChooseMe.module.css";
import { Award, BarChart3, LifeBuoy } from "lucide-react";

const FEATURES = [
  {
    Icon: Award,
    title: "Proven Expertise",
    desc: "Years of experience and a track record of delivering measurable results with strategies that actually work.",
  },
  {
    Icon: BarChart3,
    title: "Data-Driven Approach",
    desc: "We use proven techniques and real analytics to build strategies that drive measurable outcomes.",
  },
  {
    Icon: LifeBuoy,
    title: "Dedicated Support",
    desc: "Ongoing monitoring and support to keep your product fast, secure, and reliable at all times.",
  },
];

const STATS = [
  { num: "40+", label: "Projects Launched" },
  { num: "200%", label: "Avg. Conversion Growth" },
  { num: "24/7", label: "Support & Monitoring" },
];

export default function WhyChooseMe() {
  const ref = useRef(null);
  const videoRef = useRef(null);

  // play the video while it's on screen, pause when it leaves
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

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
    <section className={styles.section} ref={ref}>
      <div className={styles.grid}>
        {/* LEFT — one sticky image */}
        <div className={styles.left}>
          <div className={styles.sticky}>
            <div className={styles.visual}>
              <video
                ref={videoRef}
                src="/videos/about3.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Wow Stack at work"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — content */}
        <div className={styles.right}>
          <div className={`uiTag ${styles.reveal}`}>
            <span className="uiTag__dot" />
            <span className="uiTag__text">Why Choose Us</span>
            <span className="uiTag__line" />
          </div>

          <h2 className={`${styles.title} ${styles.reveal}`}>
            Why Wow Stack Is{" "}
            <span className={styles.titleMuted}>The Trusted Choice</span>
          </h2>

          <p className={`${styles.sub} ${styles.reveal}`}>
            Experience growth through innovative web design &amp; development
            crafted to reach, inspire, and deliver real results.
          </p>

          <div className={styles.features}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`${styles.feature} ${styles.reveal}`}>
                <span className="uiCardLine" />
                <span className={styles.fIcon}>
                  <f.Icon size={22} strokeWidth={2} />
                </span>
                <div>
                  <h3 className={styles.fTitle}>{f.title}</h3>
                  <p className={styles.fText}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.stats} ${styles.reveal}`}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
