import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PageStyles/HowItWorks.css";
import {
  PhoneOutgoing, Globe, Search, Server, Database, MonitorPlay,
  Crown, SlidersHorizontal, Handshake, TrendingUp,
} from "lucide-react";
import PageSeo from "../Components/PageSeo";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { Icon: Globe, name: "Browser Request", desc: "A visitor types your address and hits enter — the journey to your page begins.", tag: "Fast!" },
  { Icon: Search, name: "DNS Lookup", desc: "The domain name is matched to your server's real address in milliseconds.", tag: "Secure!" },
  { Icon: Server, name: "Server / Cloud", desc: "Your server receives the request and starts assembling the page.", tag: "Data Fetch" },
  { Icon: Database, name: "Database", desc: "Your content, images and data are pulled together from storage.", tag: "Render" },
  { Icon: MonitorPlay, name: "Your Website", desc: "The page renders in the browser — live, fast and ready 24/7.", tag: "24/7 Access!" },
];

const BENEFITS = [
  { Icon: Crown, name: "Brand Identity", desc: "A space that's 100% yours — your look, your voice, your rules. No borrowed platform, no compromises." },
  { Icon: Globe, name: "Global Reach", desc: "Be found by customers anywhere, any time, on any device — your storefront never closes." },
  { Icon: SlidersHorizontal, name: "Control & Customization", desc: "Change anything, anytime." },
  { Icon: Handshake, name: "Credibility & Trust", desc: "A professional site says you're the real deal." },
  { Icon: TrendingUp, name: "Data & Growth", desc: "Track every visitor and turn insight into sales." },
];

export default function HowITtWork() {
  const rootRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // scroll-reveal for intro + benefits
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".hiw-reveal");
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // GSAP: sticky step cards settle back as the next rises over them
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".hiw-panel", deckRef.current);
        cards.forEach((panel, i) => {
          const inner = panel.querySelector(".hiw-stepcard");
          const next = cards[i + 1];
          if (next && inner) {
            gsap.to(inner, {
              scale: 0.93,
              yPercent: -3,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
            });
          }
        });
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { clearTimeout(t); ctx.revert(); };
  }, []);

  return (
    <div className="hiw-wrapper" ref={rootRef}>
      <PageSeo path="/how-it-works" />

      {/* ── INTRO ── */}
      <section className="hiw-intro hiw-reveal">
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">Behind the scenes</span>
          <span className="uiTag__line" />
        </div>
        <h1 className="hiw-title">
          How a Website <span className="hiw-accent">Works</span>
        </h1>
        <p className="hiw-sub">
          From a single click to a live page in milliseconds — scroll through the
          exact journey every request takes.
        </p>
      </section>

      {/* ── STICKY STEP DECK ── */}
      <div className="hiw-deck" ref={deckRef}>
        {STEPS.map((s, i) => (
          <div className="hiw-panel" key={s.name}>
            <article className="hiw-stepcard">
              <div className="hiw-step-left">
                <span className="hiw-step-index">
                  {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
                <span className="hiw-step-icon">
                  <s.Icon size={26} strokeWidth={2} />
                </span>
                <h2 className="hiw-step-name">{s.name}</h2>
                <p className="hiw-step-desc">{s.desc}</p>
                <span className="hiw-step-tag">{s.tag}</span>
              </div>
              <div className="hiw-step-visual">
                <span className="hiw-step-num">{i + 1}</span>
                <s.Icon className="hiw-step-glyph" size={120} strokeWidth={1.2} />
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* ── BENEFITS ── */}
      <section className="hiw-benefits-section">
        <div className="hiw-benefits-head hiw-reveal">
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">Why it's worth it</span>
            <span className="uiTag__line" />
          </div>
          <h2 className="hiw-title">
            Benefits of Your <span className="hiw-accent">Own Website</span>
          </h2>
          <p className="hiw-sub">
            Renting space on someone else's platform only takes you so far. Here's
            what owning your website unlocks.
          </p>
        </div>

        <div className="hiw-bgrid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.name}
              className="hiw-benefit hiw-reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="hiw-benefit-icon">
                <b.Icon size={24} strokeWidth={2} />
              </span>
              <h3 className="hiw-benefit-name">{b.name}</h3>
              <p className="hiw-benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="calltoaction-cta-row" data-aos="fade-up" data-aos-delay="350">
        <div className="calltoaction-cta-wrap">
          <a href="tel:+916383091748" className="calltoaction-button">
            <PhoneOutgoing size={24} />
            <span>Enquire Now </span>
          </a>
          <span className="calltoaction-stroke calltoaction-stroke--left" aria-hidden="true" />
          <span className="calltoaction-stroke calltoaction-stroke--right" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
