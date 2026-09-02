import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Section-Styles/ScrollPanels.module.css";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { lead: "Ideas", accent: "into impact", video: "/videos/video1.mp4" },
  { lead: "Brands", accent: "into experiences", video: "/videos/video2.mp4" },
  { lead: "Experiences", accent: "into connections", video: "/videos/video3.mp4" },
  { lead: "Technology", accent: "into momentum", video: "/videos/video4.mp4" },
  { lead: "Momentum", accent: "into growth", video: "/videos/video5.mp4" },
];

export default function ScrollPanels() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Layered pinning: each panel pins at the top with NO pin-spacing, so the
        // next panel scrolls straight up and layers over the pinned one.
        const panels = gsap.utils.toArray(`.${s.panel}`, sectionRef.current);
        const triggers = panels.map((panel) =>
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
          })
        );
        return () => triggers.forEach((t) => t.kill());
      });
    }, sectionRef);

    // recompute pin positions once fonts/videos/layout settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { clearTimeout(t); window.removeEventListener("load", onLoad); ctx.revert(); };
  }, []);

  return (
    <div className={s.section} ref={sectionRef}>
      {PANELS.map((p, i) => (
        <section className={s.panel} key={i}>
          <video
            className={s.bgVideo}
            src={p.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className={s.scrim} />
          <h2 className={s.heading} data-noreveal>
            {p.lead} <span className={s.accent}>{p.accent}</span>
          </h2>
          {i === 0 && <span className={s.hint}>scroll ↓</span>}
        </section>
      ))}
    </div>
  );
}
