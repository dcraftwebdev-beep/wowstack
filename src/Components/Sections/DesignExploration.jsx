import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import s from "./Section-Styles/DesignExploration.module.css";

// experimental visuals — swap seeds for real exploration shots later
const px = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const EXPLORATIONS = [
  { title: "Fintech dashboard", tag: "UI Concept", img: px("wx-explore-1", 800, 1040) },
  { title: "Brand motion study", tag: "Motion", img: px("wx-explore-2", 800, 620) },
  { title: "AI chat interface", tag: "Product", img: px("wx-explore-3", 800, 800) },
  { title: "E-commerce reimagined", tag: "Concept", img: px("wx-explore-4", 800, 1000) },
  { title: "Landing page system", tag: "Web", img: px("wx-explore-5", 800, 560) },
];

export default function DesignExploration() {
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(`.${s.reveal}`);
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(s.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add(s.in); io.unobserve(e.target); }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.section} ref={rootRef}>
      <div className={s.inner}>
        <div className={`${s.head} ${s.reveal}`}>
          <div className={s.headLeft}>
            <div className="uiTag">
              <span className="uiTag__dot" />
              <span className="uiTag__text">Design Exploration</span>
              <span className="uiTag__line" />
            </div>
            <h2 className={s.title}>
              More things we've been{" "}
              <span className={s.titleMuted}>building</span>
            </h2>
          </div>
          <p className={s.sub}>
            UI experiments, motion studies and concepts from the studio — not
            every idea ships, but every idea sharpens the craft.
          </p>
        </div>

        <div className={s.masonry}>
          {EXPLORATIONS.map((x, i) => (
            <div className={`${s.card} ${s.reveal}`} key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <img src={x.img} alt={x.title} loading="lazy" />
              <div className={s.cardOverlay}>
                <span className={s.cardTag}>{x.tag}</span>
                <span className={s.cardTitle}>{x.title}</span>
              </div>
            </div>
          ))}

          {/* intentional coming-soon card */}
          <div className={`${s.soon} ${s.reveal}`}>
            <span className={s.soonGlyph}><Sparkles size={26} /></span>
            <h3 className={s.soonTitle}>Something new is cooking</h3>
            <p className={s.soonSub}>A fresh experiment is on the workbench — check back soon.</p>
            <span className={s.soonDots}><span /><span /><span /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
