import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "./Loader.css";

gsap.registerPlugin(MorphSVGPlugin);

/* ── bold geometric letterforms (generated per centre-x) ── */
const T = 160; // cap top
const B = 248; // baseline

const W = (cx) =>
  `M${cx - 30} ${T}L${cx - 19} ${T}L${cx - 7} ${B}L${cx - 18} ${B}Z` +
  `M${cx - 18} ${B}L${cx - 7} ${B}L${cx + 4} 198L${cx - 6} 198Z` +
  `M${cx - 4} 198L${cx + 6} 198L${cx + 18} ${B}L${cx + 7} ${B}Z` +
  `M${cx + 7} ${B}L${cx + 18} ${B}L${cx + 30} ${T}L${cx + 19} ${T}Z`;
const O = (cx) =>
  `M${cx - 28} 204a28 44 0 1 1 56 0a28 44 0 1 1 -56 0Z` +
  `M${cx - 14} 204a14 28 0 1 0 28 0a14 28 0 1 0 -28 0Z`;
const S = (cx) =>
  `M${cx - 27} ${T}L${cx + 27} ${T}L${cx + 27} 174L${cx - 27} 174Z` +
  `M${cx - 27} ${T}L${cx - 13} ${T}L${cx - 13} 204L${cx - 27} 204Z` +
  `M${cx - 27} 197L${cx + 27} 197L${cx + 27} 211L${cx - 27} 211Z` +
  `M${cx + 13} 204L${cx + 27} 204L${cx + 27} ${B}L${cx + 13} ${B}Z` +
  `M${cx - 27} 234L${cx + 27} 234L${cx + 27} ${B}L${cx - 27} ${B}Z`;
const Tl = (cx) =>
  `M${cx - 28} ${T}L${cx + 28} ${T}L${cx + 28} 175L${cx - 28} 175Z` +
  `M${cx - 8} ${T}L${cx + 8} ${T}L${cx + 8} ${B}L${cx - 8} ${B}Z`;
const A = (cx) =>
  `M${cx - 6} ${T}L${cx + 6} ${T}L${cx - 14} ${B}L${cx - 28} ${B}Z` +
  `M${cx - 6} ${T}L${cx + 6} ${T}L${cx + 28} ${B}L${cx + 14} ${B}Z` +
  `M${cx - 15} 208L${cx + 15} 208L${cx + 15} 221L${cx - 15} 221Z`;
const C = (cx) =>
  `M${cx + 22} 168A28 44 0 1 0 ${cx + 22} 240L${cx + 9} 232A15 30 0 1 1 ${cx + 9} 176Z`;
const K = (cx) =>
  `M${cx - 26} ${T}L${cx - 12} ${T}L${cx - 12} ${B}L${cx - 26} ${B}Z` +
  `M${cx - 12} 210L${cx - 12} 196L${cx + 16} ${T}L${cx + 28} ${T}Z` +
  `M${cx - 12} 198L${cx - 12} 212L${cx + 28} ${B}L${cx + 16} ${B}Z`;

// WOW STACK — one letter path per centre-x
const LETTERS = [W(100), O(170), W(240), S(330), Tl(400), A(470), C(540), K(610)];
const CX = [100, 170, 240, 330, 400, 470, 540, 610];

const Loader = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = CX.map((_, i) => `#s${i}`).join(", ");
      MorphSVGPlugin.convertToPath(shapes);
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.7,
        yoyo: true,
        defaults: { ease: "power2.inOut", duration: 0.85 },
      });
      CX.forEach((_, i) => tl.to(`#s${i}`, { morphSVG: `#L${i}` }, i === 0 ? 0 : "<0.09"));
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="loader-wrapper" ref={rootRef}>
      <svg className="morphLogo" xmlns="http://www.w3.org/2000/svg" viewBox="45 148 620 112">
        <defs>
          <linearGradient id="gradMain" x1="60" y1="248" x2="650" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="0.5" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <g id="letters">
            {LETTERS.map((d, i) => (
              <path id={`L${i}`} key={i} d={d} />
            ))}
          </g>
        </defs>

        {CX.map((cx, i) => (
          <circle key={i} id={`s${i}`} cx={cx} cy={204} r={20} fill="url(#gradMain)" />
        ))}
      </svg>

      <p className="loader-text">Loading magic&hellip; please don&rsquo;t blink</p>
    </div>
  );
};

export default Loader;
