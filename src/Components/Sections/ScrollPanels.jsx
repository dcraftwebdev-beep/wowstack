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
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray(`.${s.panel}`, pinRef.current);
        const outers = panels.map((p) => p.querySelector(`.${s.outer}`));
        const inners = panels.map((p) => p.querySelector(`.${s.inner}`));
        const bgs = panels.map((p) => p.querySelector(`.${s.bg}`));
        const heads = panels.map((p) => p.querySelector(`.${s.heading}`));
        const splits = heads.map((h) => new SplitText(h, { type: "chars" }));
        const N = panels.length;

        // initial state — panel 0 in view, the rest stacked off-screen
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1, zIndex: 1 });
        gsap.set(outers, { yPercent: 100 });
        gsap.set(inners, { yPercent: -100 });
        gsap.set([outers[0], inners[0]], { yPercent: 0 });
        splits.forEach((sp, i) => {
          if (i !== 0) gsap.set(sp.chars, { autoAlpha: 0, yPercent: 150 });
        });

        // one scrubbed timeline, pinned + snapped to each panel;
        // natural page scroll drives it and releases to the next section.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=" + (N - 1) * 100 + "%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true, // recompute cleanly on every refresh
            refreshPriority: 1,        // pin computes before the parallax triggers
          },
        });

        for (let i = 1; i < N; i++) {
          const pos = i - 1;
          tl.set(panels[i], { autoAlpha: 1, zIndex: i + 1 }, pos)
            .fromTo(
              [outers[i], inners[i]],
              { yPercent: (x) => (x ? -100 : 100) },
              { yPercent: 0, ease: "power1.inOut", duration: 1 },
              pos
            )
            .fromTo(bgs[i], { yPercent: 15 }, { yPercent: 0, ease: "power1.inOut", duration: 1 }, pos)
            .to(bgs[i - 1], { yPercent: -15, ease: "power1.inOut", duration: 1 }, pos)
            .fromTo(
              splits[i].chars,
              { autoAlpha: 0, yPercent: 150 },
              { autoAlpha: 1, yPercent: 0, ease: "power2", duration: 1, stagger: { each: 0.02, from: "random" } },
              pos + 0.12
            )
            .set(panels[i - 1], { autoAlpha: 0 }, pos + 0.999);
        }

        return () => splits.forEach((sp) => sp.revert());
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { clearTimeout(t); ctx.revert(); };
  }, []);

  return (
    <section className={s.section} ref={sectionRef}>
      <div className={s.pin} ref={pinRef}>
        {PANELS.map((p, i) => (
          <div className={s.panel} key={i}>
            <div className={s.outer}>
              <div className={s.inner}>
                <div className={s.bg}>
                  <video
                    className={s.bgVideo}
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <h2 className={s.heading} data-noreveal>
                    {p.lead} <span className={s.accent}>{p.accent}</span>
                  </h2>
                </div>
              </div>
            </div>
            {i === 0 && <span className={s.hint}>scroll ↓</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
