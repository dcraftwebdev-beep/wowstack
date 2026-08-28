import React, { useEffect, useRef } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import s from "./Section-Styles/ProcessSection.module.css";

const STEPS = [
  { Icon: Search, name: "Discovery & Strategy", desc: "We learn your business, goals and customers, then map a clear plan to hit them." },
  { Icon: PenTool, name: "Design & Prototype", desc: "You approve a conversion-focused design — and see exactly how it looks — before we build." },
  { Icon: Code2, name: "Build & Automate", desc: "We develop your site, connect your tools and wire up the automations that save you time." },
  { Icon: Rocket, name: "Launch & Grow", desc: "We go live, then support, monitor and optimise as your business scales." },
];

export default function ProcessSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(`.${s.reveal}`);
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(s.isVisible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.isVisible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.section} ref={rootRef}>
      <div className={s.inner}>
        <div className={`${s.head} ${s.reveal}`}>
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">How We Work</span>
            <span className="uiTag__line" />
          </div>
          <h2 className={s.title}>
            A Simple Path From{" "}
            <span className={s.titleAccent}>Idea to Launch</span>
          </h2>
          <p className={s.sub}>
            No jargon, no guesswork. Here's exactly what working with us looks
            like — clear steps, real approvals, on time.
          </p>
        </div>

        <div className={s.grid}>
          {STEPS.map((st, i) => (
            <div
              className={`${s.card} ${s.reveal}`}
              key={st.name}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={s.icon}>
                <st.Icon size={24} strokeWidth={2} />
              </span>
              <div className={s.step}>STEP {String(i + 1).padStart(2, "0")}</div>
              <h3 className={s.name}>{st.name}</h3>
              <p className={s.desc}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
