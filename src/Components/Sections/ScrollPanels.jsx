import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import s from "./Section-Styles/ScrollPanels.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
        const splits = [];
        const triggers = [];

        panels.forEach((panel) => {
          // heading text reveal — chars fly in as the panel scrolls up
          const heading = panel.querySelector(`.${s.heading}`);
          if (heading) {
            const split = new SplitText(heading, { type: "chars" });
            splits.push(split);
            gsap.from(split.chars, {
              yPercent: 130,
              autoAlpha: 0,
              ease: "power3.out",
              duration: 0.7,
              stagger: { each: 0.025, from: "random" },
              scrollTrigger: { trigger: panel, start: "top 65%", toggleActions: "play none none reverse" },
            });
          }
          // layered pin
          triggers.push(
            ScrollTrigger.create({ trigger: panel, start: "top top", pin: true, pinSpacing: false })
          );
        });

        return () => { triggers.forEach((t) => t.kill()); splits.forEach((sp) => sp.revert()); };
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
