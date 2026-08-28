import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./Section-Styles/FeaturedProjects.module.css";
import { usePublishedProjects } from "../../data/useProjects";

export default function FeaturedProjects() {
  const ref = useRef(null);
  const { projects: published } = usePublishedProjects();
  const projects = published.filter((p) => p.featured).slice(0, 4);

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
          if (e.isIntersecting) { e.target.classList.add(styles.in); io.unobserve(e.target); }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [projects.length]);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.head}>
          <div className={`uiTag ${styles.reveal}`}>
            <span className="uiTag__dot" />
            <span className="uiTag__text">Selected Work</span>
            <span className="uiTag__line" />
          </div>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            Work That Made an <span className={styles.titleMuted}>Impact</span>
          </h2>
          <p className={`${styles.sub} ${styles.reveal}`}>
            Real products for real clients — each one designed, built and
            engineered to move a number that matters.
          </p>
        </div>

        {/* CASE-STUDY ROWS */}
        <div className={styles.rows}>
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`${styles.caseRow} ${styles.reveal} ${i % 2 ? styles.flip : ""}`}
              style={{ "--c": p.accent }}
            >
              <div className={styles.visual}>
                <img src={p.previewImage || p.heroImage} alt={`${p.name} preview`} loading="lazy" />
                <span className={styles.visualTint} />
              </div>

              <div className={styles.info}>
                <div className={styles.tags}>
                  <span className={styles.tagDark}>{p.client || p.name}</span>
                  <span className={styles.tagGhost}>{p.category}</span>
                </div>

                <h3 className={styles.caseName}>{p.name}</h3>
                <p className={styles.caseDesc}>{p.shortDesc}</p>

                <div className={styles.metrics}>
                  {(p.metrics || []).slice(0, 3).map((m, mi) => (
                    <div className={styles.metric} key={mi}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                <p className={styles.statusLine}>
                  <b>{p.industry}</b> · {p.year} · {p.services?.[0]}
                </p>

                <Link to={`/work/${p.slug}`} className={styles.cta}>
                  Read the full case study <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* SEE MORE */}
        <div className={styles.moreWrap}>
          <Link to="/our-works" className={`${styles.more} ${styles.reveal}`}>
            See all works
            <span className={styles.moreArrow}><ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
