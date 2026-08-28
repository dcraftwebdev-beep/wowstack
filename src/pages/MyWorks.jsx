import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PageStyles/MyWorks.css';
import { ExternalLink, ArrowRight, Eye } from 'lucide-react';
import PageSeo from '../Components/PageSeo';
import Button from '../Components/UI/Button';
import { usePublishedProjects } from '../data/useProjects';

gsap.registerPlugin(ScrollTrigger);

const domainOf = (link, title) =>
  link ? link.replace(/^https?:\/\//, '').replace(/\/$/, '')
       : (title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.app';

const coverOf = (p) => p.previewImage || p.heroImage || `https://picsum.photos/seed/wowstack-${p.slug}/800/520`;

function ProjectCard({ p, featured }) {
  const cats = [p.category, p.industry].filter(Boolean);
  const tags = (p.technologies || []).slice(0, 4);
  const chip = p.url
    ? { label: 'Live', bg: 'rgba(52,211,153,0.15)', color: '#34d399' }
    : { label: 'Case Study', bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' };

  return (
    <div className={`project-card works-reveal ${featured ? 'featured-card' : ''}`}>
      <Link to={`/work/${p.slug}`} className="card-cover" style={{ '--c': p.accent }}>
        <img
          className="cover-img"
          src={coverOf(p)}
          alt={`${p.name} preview`}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span className="cover-overlay" />
        <span className="card-status" style={{ backgroundColor: chip.bg, color: chip.color }}>{chip.label}</span>
        <span className="cover-urlchip">{domainOf(p.url, p.name)}</span>
      </Link>

      <div className="card-content">
        <div className="card-body">
          {featured && <span className="featured-badge">Featured Project</span>}
          <div className="categories-container">
            {cats.map((c) => <span key={c} className="project-category">{c}</span>)}
          </div>
          <h3 className="project-title">{p.name}</h3>
          <p className="project-description">{p.shortDesc}</p>

          {p.metrics?.length > 0 && (
            <div className="works-metrics">
              {p.metrics.slice(0, 3).map((m, i) => (
                <div className="works-metric" key={i}>
                  <span className="works-metric-val" style={{ color: p.accent }}>{m.value}</span>
                  <span className="works-metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="tags">
            {tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>

        <div className="card-footer">
          <Button to={`/work/${p.slug}`} variant="primary" size="sm" icon={<ArrowRight size={14} />}>Case study</Button>
          {p.url && (
            <Button href={p.url} target="_blank" rel="noreferrer" variant="ghost" size="sm" icon={<ExternalLink size={13} />}>Live</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyWorks() {
  const rootRef = useRef(null);
  const { projects, loading } = usePublishedProjects();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // scroll-reveal
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('.works-reveal');
    if (!els?.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeFilter, projects.length]);

  // GSAP parallax on covers
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.cover-img').forEach((img) => {
          gsap.fromTo(img,
            { yPercent: -8, scale: 1.18 },
            { yPercent: 8, scale: 1.18, ease: 'none',
              scrollTrigger: { trigger: img.closest('.project-card'), start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [activeFilter, projects.length]);

  const allCategories = useMemo(() => {
    const set = ['All'];
    projects.forEach((p) => [p.category, p.industry].filter(Boolean).forEach((c) => { if (!set.includes(c)) set.push(c); }));
    return set;
  }, [projects]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => [p.category, p.industry].includes(activeFilter));

  const total = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);

  const showFeatured = activeFilter === 'All' && filtered.length > 3;
  const featured = showFeatured ? (filtered.find((p) => p.featured) || filtered[0]) : null;
  const gridItems = showFeatured ? filtered.filter((p) => p !== featured) : filtered;

  return (
    <div className="myworks-container" ref={rootRef}>
      <PageSeo path="/our-works" />

      {/* ── HEADER ── */}
      <header className="myworks-header works-reveal">
        <div className="header-content">
          <div className="header-left">
            <div className="uiTag">
              <span className="uiTag__dot" />
              <span className="uiTag__text">Our Works</span>
              <span className="uiTag__line" />
            </div>
            <h1 className="works-title">
              Built to <span className="accent">Perform.</span><br />
              <span className="dim">Not just present.</span>
            </h1>
            <p className="works-subtitle">
              Real products. Real clients. Every project here is engineered to solve a problem and built to last.
            </p>
          </div>

          <div className="stats-container">
            <div className="stat"><span className="stat-number">{total}</span><span className="stat-label">Projects</span></div>
            <div className="stat"><span className="stat-number">{featuredCount}</span><span className="stat-label">Featured</span></div>
            <div className="stat"><span className="stat-number">{totalViews.toLocaleString()}</span><span className="stat-label">Views</span></div>
          </div>
        </div>
      </header>

      {/* ── FILTERS ── */}
      {allCategories.length > 1 && (
        <div className="filter-container">
          {allCategories.map((cat) => (
            <button key={cat} className={`filter-btn ${activeFilter === cat ? 'active' : ''}`} onClick={() => setActiveFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── EMPTY / LOADING ── */}
      {loading ? (
        <div className="works-empty">Loading projects…</div>
      ) : total === 0 ? (
        <div className="works-empty">No published projects yet — add one from the dashboard.</div>
      ) : (
        <>
          {showFeatured && featured && <ProjectCard p={featured} featured />}
          <div className="projects-grid">
            {gridItems.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        </>
      )}

      {/* ── FOOTER ── */}
      <div className="showcase-footer">
        <p>
          Interested in collaborating on a project?{' '}
          <a href="https://wa.me/916383091748?text=Hi%20I'm%20interested%20in%20working%20with%20you" target="_blank" rel="noopener noreferrer" className="contact-link">
            Let's connect
          </a>
        </p>
      </div>
    </div>
  );
}
