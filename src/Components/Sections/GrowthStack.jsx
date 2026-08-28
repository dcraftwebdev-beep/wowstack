import React, { useEffect, useRef, useState } from "react";
import { Zap, Search, ShieldCheck, Smartphone, Mail, BarChart3, Layers } from "lucide-react";
import f from "../../pages/PageStyles/Features.module.css";
import s from "./Section-Styles/GrowthStack.module.css";

// 6 built-in capabilities branching from a central hub
const STACK = [
  { Icon: Zap, name: "Lightning Speed", sub: "90+ PageSpeed" },
  { Icon: Search, name: "SEO Built-In", sub: "Rank from day one" },
  { Icon: ShieldCheck, name: "Secure Hosting", sub: "SSL + daily backups" },
  { Icon: Smartphone, name: "Mobile-First", sub: "Flawless on any device" },
  { Icon: Mail, name: "Lead Capture", sub: "Straight to your inbox" },
  { Icon: BarChart3, name: "Live Analytics", sub: "Track every visitor" },
];

// orthogonal (right-angle) connector builder — rounded corners
const roundPath = (raw, r = 12) => {
  const pts = raw.filter(
    (p, i) => i === 0 || p[0] !== raw[i - 1][0] || p[1] !== raw[i - 1][1]
  );
  if (pts.length < 3)
    return `M${pts[0][0]} ${pts[0][1]} L${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    const rr = Math.min(r, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    const ix = Math.sign(x - px), iy = Math.sign(y - py);
    const ox = Math.sign(nx - x), oy = Math.sign(ny - y);
    d += ` L${(x - ix * rr).toFixed(1)} ${(y - iy * rr).toFixed(1)} Q${x} ${y} ${(x + ox * rr).toFixed(1)} ${(y + oy * rr).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0]} ${last[1]}`;
  return d;
};

export default function GrowthStack() {
  const mapRef = useRef(null);
  const [flow, setFlow] = useState({ w: 0, h: 0, paths: [] });

  useEffect(() => {
    const compute = () => {
      const map = mapRef.current;
      if (!map) return;
      const mr = map.getBoundingClientRect();
      const node = map.querySelector("[data-node]");
      const cards = [...map.querySelectorAll("[data-card]")];
      if (!node || !cards.length) return;
      const nr = node.getBoundingClientRect();
      const nx = nr.left + nr.width / 2 - mr.left;
      const ny = nr.top + nr.height / 2 - mr.top;
      const paths = cards.map((card) => {
        const cr = card.getBoundingClientRect();
        const cy = cr.top + cr.height / 2 - mr.top;
        if (card.dataset.card === "L") {
          const cardX = cr.right - mr.left;
          const busX = cardX + 42;
          return roundPath([[nx, ny], [busX, ny], [busX, cy], [cardX, cy]]);
        }
        const cardX = cr.left - mr.left;
        const busX = cardX - 42;
        return roundPath([[nx, ny], [busX, ny], [busX, cy], [cardX, cy]]);
      });
      setFlow({ w: mr.width, h: mr.height, paths });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  // reveal the flow map (same fade/stagger as the Features page) on scroll-in
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!("IntersectionObserver" in window)) { map.classList.add(f.isIn); return; }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add(f.isIn); io.unobserve(e.target); }
        }),
      { threshold: 0.2 }
    );
    io.observe(map);
    return () => io.disconnect();
  }, []);

  const Card = (it, side) => (
    <div className={f.flowCard} data-card={side}>
      <span className={f.flowIcon}>
        <it.Icon size={18} strokeWidth={2} />
      </span>
      <div>
        <div className={f.flowName}>{it.name}</div>
        <div className={f.flowSub}>{it.sub}</div>
      </div>
    </div>
  );

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.head}>
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">The Complete Stack</span>
            <span className="uiTag__line" />
          </div>
          <h2 className={s.title}>
            Every Build Comes{" "}
            <span className={s.titleMuted}>Fully Loaded</span>
          </h2>
          <p className={s.sub}>
            No add-ons, no surprises — every website we ship comes with the
            complete growth stack built right in.
          </p>
        </div>

        <div className={f.flowMap} ref={mapRef}>
          <svg
            className={f.flowLines}
            viewBox={`0 0 ${flow.w || 900} ${flow.h || 340}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {flow.paths.map((d, i) => (
              <path key={"b" + i} className={f.flowLine} d={d} />
            ))}
            {flow.paths.map((d, i) => (
              <path
                key={"p" + i}
                className={f.flowPulse}
                d={d}
                pathLength="1"
                style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }}
              />
            ))}
          </svg>

          <div className={`${f.flowSide} ${f.flowSideL}`}>
            {STACK.slice(0, 3).map((it, i) => (
              <React.Fragment key={i}>{Card(it, "L")}</React.Fragment>
            ))}
          </div>

          <div className={f.flowNode} data-node>
            <Layers size={28} strokeWidth={2} />
          </div>

          <div className={`${f.flowSide} ${f.flowSideR}`}>
            {STACK.slice(3).map((it, i) => (
              <React.Fragment key={i}>{Card(it, "R")}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
