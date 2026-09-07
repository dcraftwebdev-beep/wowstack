import { useEffect, useRef } from "react";
import s from "./Section-Styles/HeroPuzzle.module.css";
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
import web11 from "../../assets/heroprojects/web11.jpg";

// all 11 images — 11 & 7 (rows/col) are coprime, so tiles cycle through every
// image before repeating and no duplicate lands next to itself
const POOL = [web1, web7, web3, web10, web5, web2, web9, web4, web11, web6, web8];

const COL_COUNT = 6;
const PER_COL = 7;
const ASPECTS = [s.a11, s.a34, s.a43, s.a45];
const COLS = Array.from({ length: COL_COUNT }, (_, c) =>
  Array.from({ length: PER_COL }, (_, r) => {
    const idx = c * PER_COL + r;
    return { src: POOL[idx % POOL.length], aspect: ASPECTS[idx % ASPECTS.length] };
  })
);

// Full-bleed, scroll-reactive puzzle grid of small images. Reusable hero visual.
export default function HeroPuzzle() {
  const colRefs = useRef([]);

  // scroll parallax — columns drift vertically at different speeds / directions
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      colRefs.current.forEach((el, c) => {
        if (!el) return;
        const dir = c % 2 ? 1 : -1;
        const speed = 0.12 + (c % 3) * 0.03;
        const base = -280 - (c % 3) * 55;
        el.style.transform = `translate3d(0, ${(base + dir * y * speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={s.puzzle} aria-hidden="true">
      {COLS.map((tiles, c) => (
        <div key={c} className={s.puzzleCol} ref={(el) => (colRefs.current[c] = el)}>
          <div
            className={s.puzzleColInner}
            style={{
              animationDuration: `${(7 + (c % 3) * 1.3).toFixed(1)}s`,
              animationDelay: `${(c * 0.5).toFixed(1)}s`,
              animationDirection: c % 2 ? "alternate-reverse" : "alternate",
            }}
          >
            {tiles.map((t, i) => (
              <div key={i} className={`${s.puzzleTile} ${t.aspect}`}>
                <img src={t.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className={s.puzzleFadeBottom} />
    </div>
  );
}
