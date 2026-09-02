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
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray(`.${s.panel}`, pinRef.current);
        const N = panels.length;

        // stack all panels full-screen; every panel after the first waits
        // below the fold and slides up over the previous one as you scroll.
        gsap.set(panels, { yPercent: 100, zIndex: (i) => i + 1 });
        gsap.set(panels[0], { yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=" + (N - 1) * 100 + "%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        for (let i = 1; i < N; i++) {
          tl.to(panels[i], { yPercent: 0, ease: "none" }, i - 1);
        }
      });
    }, sectionRef);

    // recompute pin measurements once fonts/videos/layout have settled
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { clearTimeout(t); window.removeEventListener("load", onLoad); ctx.revert(); };
  }, []);

  return (
    <section className={s.section} ref={sectionRef}>
      <div className={s.pin} ref={pinRef}>
        {PANELS.map((p, i) => (
          <div className={s.panel} key={i}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
