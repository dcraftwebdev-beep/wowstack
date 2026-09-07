import styles from "./Section-Styles/Hero.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Ferrofluid from "../UI/Ferrofluid";
import CircularGallery from "../UI/CircularGallery";
import web1 from "../../assets/heroprojects/web1.jpg";
import web2 from "../../assets/heroprojects/web2.jpg";
import web3 from "../../assets/heroprojects/web3.jpg";
import web4 from "../../assets/heroprojects/web4.jpg";
import web5 from "../../assets/heroprojects/web5.jpg";
import web6 from "../../assets/heroprojects/web6.jpg";
import web7 from "../../assets/heroprojects/web7.jpg";
import web8 from "../../assets/heroprojects/web8.jpg";
import web9 from "../../assets/heroprojects/web9.jpg";
import web10 from "../../assets/heroprojects/web10.jpg";

// our work in the curved gallery, each with a short label
const GALLERY = [
  { image: web1, text: "Web Design" },
  { image: web2, text: "Development" },
  { image: web3, text: "E-Commerce" },
  { image: web4, text: "Dashboards" },
  { image: web5, text: "Branding" },
  { image: web6, text: "SEO" },
  { image: web7, text: "Automation" },
  { image: web8, text: "UI / UX" },
  { image: web9, text: "Apps" },
  { image: web10, text: "Support" },
];

// split a line into per-word spans that blur-reveal left→right
const splitWords = (text, startDelay = 0, step = 0.07) => {
  const arr = text.split(" ");
  return arr.map((w, i) => (
    <React.Fragment key={i}>
      <span
        className={styles.word}
        style={{ "--d": `${(startDelay + i * step).toFixed(2)}s` }}
      >
        {w}
      </span>
      {i < arr.length - 1 ? " " : ""}
    </React.Fragment>
  ));
};

export default function Hero() {
  const btnRef = useRef(null);
  const heroRef = useRef(null);

  // magnetic pull on the CTA
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${(x * 0.3).toFixed(1)}px, ${(y * 0.35).toFixed(1)}px)`;
    };
    const onLeave = () => (btn.style.transform = "");
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* ---- WebGL Ferrofluid background ---- */}
      <div className={styles.rays} aria-hidden="true">
        <Ferrofluid
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          speed={0.2}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>

      {/* ---- hero text ---- */}
      <div className={styles.textWrap}>
        <div className={`uiTag ${styles.eyebrow}`}>
          <span className="uiTag__dot" />
          <span className="uiTag__text">Web design &amp; automation studio</span>
          <span className="uiTag__line" />
        </div>

        <h1 className={styles.headline} data-noreveal>
          <span className={styles.line}>{splitWords("We Design to Wow", 0)}</span>
          <span className={`${styles.line} ${styles.accent}`}>
            {splitWords("We Build to Grow", 0.21)}
          </span>
        </h1>

        {/* <p className={styles.sub}>
          Websites, apps and automations engineered to turn visitors into paying
          customers — beautifully designed, built to convert.
        </p> */}

        {/* <div className={styles.cta}>
          <Link to="/contact" className={styles.getStarted} ref={btnRef}>
            Start a project
            <span className={styles.getStartedArrow}><ArrowRight size={18} /></span>
          </Link>
          <Link to="/our-works" className={styles.ctaGhost}>See our work</Link>
        </div> */}
      </div>

      {/* ---- curved gallery of our work ---- */}
      <div className={styles.homeGallery}>
        <CircularGallery
          items={GALLERY}
          bend={6}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          scrollSpeed={2}
          autoScrollOnMount
        />
      </div>
    </section>
  );
}
