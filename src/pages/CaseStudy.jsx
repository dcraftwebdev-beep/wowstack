import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import styles from "./PageStyles/CaseStudy.module.css";
import Seo from "../Components/Seo";
import Button from "../Components/UI/Button";
import { useProject } from "../data/useProjects";
import { incrementViews } from "../data/projectsStore";

export default function CaseStudy() {
  const { slug } = useParams();
  const { project: p, loading } = useProject(slug);
  const rootRef = useRef(null);
  const viewedRef = useRef("");
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = p ? `${p.name} — case study by Wow Stack` : "";
  const openShare = (u) => window.open(u, "_blank", "noopener,noreferrer,width=600,height=540");
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // count a view once per project view (published only)
  useEffect(() => {
    if (p?.slug && p.status === "published" && viewedRef.current !== p.slug) {
      viewedRef.current = p.slug;
      incrementViews(p.slug);
    }
  }, [p]);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(`.${styles.reveal}`);
    if (!els?.length) return;
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
  }, [p]);

  if (loading) {
    return <div className={styles.page} style={{ minHeight: "80vh" }} />;
  }

  if (!p) {
    return (
      <div className={styles.page}>
        <Seo title="Case study not found | Wow Stack" description="This project could not be found." path={`/work/${slug}`} noindex />
        <div className={styles.notFound}>
          <div>
            <h1>This project isn't here.</h1>
            <p><Link to="/our-works">← Back to all works</Link></p>
          </div>
        </div>
      </div>
    );
  }

  const gallery = p.gallery || [];

  return (
    <div className={styles.page} ref={rootRef} style={{ "--c": p.accent }}>
      <Seo
        title={`${p.name} — Case Study | Wow Stack`}
        description={p.shortDesc}
        path={`/work/${p.slug}`}
        image={p.heroImage}
        type="article"
      />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroTop}>
            <Link to="/our-works" className={styles.back}><ArrowLeft size={16} /> All works</Link>
            <div className={styles.share}>
              <span className={styles.shareLabel}>Share</span>
              <button className={styles.shareBtn} title="Share on X" onClick={() => openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`)}><Twitter size={16} /></button>
              <button className={styles.shareBtn} title="Share on LinkedIn" onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}><Linkedin size={16} /></button>
              <button className={styles.shareBtn} title="Share on Facebook" onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}><Facebook size={16} /></button>
              <button className={`${styles.shareBtn} ${copied ? styles.shareCopied : ""}`} title="Copy link" onClick={copyLink}>{copied ? <Check size={16} /> : <Link2 size={16} />}</button>
            </div>
          </div>
          <div className={`${styles.reveal} ${styles.in}`}>
            <div className={styles.heroTags}>
              <span className={styles.tagDark}>{p.client || p.name}</span>
              <span className={styles.tagGhost}>{p.category}</span>
              <span className={styles.tagGhost}>{p.year}</span>
            </div>
            <h1 className={styles.heroTitle}>{p.name}</h1>
            <p className={styles.heroPos}>{p.positioning || p.shortDesc}</p>
            <dl className={styles.heroMeta}>
              <div><dt>Industry</dt><dd>{p.industry}</dd></div>
              <div><dt>Timeline</dt><dd>{p.timeline}</dd></div>
              <div><dt>Views</dt><dd>{(p.views ?? 0).toLocaleString()}</dd></div>
              {p.url && (
                <div>
                  <dt>Live</dt>
                  <dd>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: p.accent, display: "inline-flex", alignItems: "center", gap: 5 }}>
                      Visit <ExternalLink size={13} />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className={`${styles.heroVisual} ${styles.reveal}`}>
            <img src={p.heroImage} alt={`${p.name} hero`} />
          </div>
        </div>
      </section>

      {/* ── PROCESS (challenge / approach / solution) ── */}
      {(p.challenge || p.approach || p.solution) && (
        <section className={styles.process}>
          <div className={styles.wrap}>
            <div className={`${styles.processHead} ${styles.reveal}`}>
              <span className={styles.kicker}>The work</span>
              <h2 className={styles.blockHeading}>From problem to product</h2>
            </div>
            <div className={styles.steps}>
              {[
                { n: "01", label: "Challenge", title: "The problem worth solving", body: p.challenge },
                { n: "02", label: "Approach", title: "How we thought about it", body: p.approach },
                { n: "03", label: "Solution", title: "What we built", body: p.solution },
              ].filter((step) => step.body).map((step) => (
                <article className={`${styles.step} ${styles.reveal}`} key={step.n}>
                  <div className={styles.stepAside}>
                    <span className={styles.stepNum}>{step.n}</span>
                    <span className={styles.stepLine} />
                  </div>
                  <div className={styles.stepMain}>
                    <span className={styles.stepLabel}>{step.label}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VISUAL SHOWCASE ── */}
      {gallery.length > 0 && (
        <section className={styles.showcase}>
          <div className={styles.wrap}>
            <div className={`${styles.gallery} ${styles.reveal}`}>
              {gallery.map((src, i) => (
                <div key={i} className={`${styles.galleryItem} ${i === 0 ? styles.wide : ""}`}>
                  <img src={src} alt={`${p.name} detail ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {p.metrics?.length > 0 && (
        <section className={styles.results}>
          <div className={styles.wrap}>
            <div className={`${styles.resultsPanel} ${styles.reveal}`}>
              <div className={styles.resultsHead}>
                <span className={styles.kicker}>Results</span>
                <h2 className={styles.resultsTitle}>What changed</h2>
              </div>
              <div className={styles.resultsRow}>
                {p.metrics.map((m, i) => (
                  <div className={styles.resultItem} key={i}>
                    <div className={styles.resultValue}>{m.value}</div>
                    <div className={styles.resultLabel}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── DETAILS ── */}
      <section className={styles.block}>
        <div className={styles.wrap}>
          <dl className={`${styles.detailsGrid} ${styles.reveal}`}>
            <div className={styles.detailCol}>
              <dt>Services</dt>
              {(p.services || []).map((x) => <dd key={x}>{x}</dd>)}
            </div>
            <div className={styles.detailCol}>
              <dt>Technologies</dt>
              {(p.technologies || []).map((x) => <dd key={x}>{x}</dd>)}
            </div>
            <div className={styles.detailCol}>
              <dt>Deliverables</dt>
              {(p.deliverables || []).map((x) => <dd key={x}>{x}</dd>)}
            </div>
            <div className={styles.detailCol}>
              <dt>Timeline</dt>
              <dd>{p.timeline}</dd>
              <dt style={{ marginTop: 18 }}>Industry</dt>
              <dd>{p.industry}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <div className={`${styles.wrap} ${styles.reveal}`}>
          <h2 className={styles.finalTitle}>
            Have a project in mind? <span>Let's build something that grows.</span>
          </h2>
          <Button to="/contact" size="lg" icon={<ArrowRight size={17} />}>
            Start a project
          </Button>
        </div>
      </section>
    </div>
  );
}
