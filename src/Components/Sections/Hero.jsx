import styles from "./Section-Styles/Hero.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
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
const POOL = [
  web1, web7, web3, web10, web5, web2, web9, web4, web11, web6, web8,
];

// puzzle grid: 6 columns, each a stack of small tiles with varied heights
const COL_COUNT = 6;
const PER_COL = 7; // rows per column
const ASPECTS = [styles.a11, styles.a34, styles.a43, styles.a45]; // cycles for the puzzle look
const COLS = Array.from({ length: COL_COUNT }, (_, c) =>
  Array.from({ length: PER_COL }, (_, r) => {
    const idx = c * PER_COL + r;
    return { src: POOL[idx % POOL.length], aspect: ASPECTS[idx % ASPECTS.length] };
  })
);

// split a line into per-word spans that blur-reveal left→right
const splitWords = (text, startDelay = 0, step = 0.07) => {
  const arr = text.split(" ");
  return arr.map((w, i) => (
    <span
      key={i}
      className={styles.word}
      style={{ "--d": `${(startDelay + i * step).toFixed(2)}s` }}
    >
      {w}
      {i < arr.length - 1 ? " " : ""}
    </span>
  ));
};

export default function Hero() {
  const colRefs = useRef([]);
  const btnRef = useRef(null);
  const heroRef = useRef(null);

  // mouse-follow parallax on the side notes / arrows
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches) return;
    const floats = hero.querySelectorAll("[data-float]");
    let raf = 0;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        floats.forEach((el) => {
          const d = parseFloat(el.dataset.float) || 0;
          el.style.setProperty("--px", `${(nx * d).toFixed(1)}px`);
          el.style.setProperty("--py", `${(ny * d).toFixed(1)}px`);
        });
      });
    };
    const onLeave = () =>
      floats.forEach((el) => {
        el.style.setProperty("--px", "0px");
        el.style.setProperty("--py", "0px");
      });
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

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
      {/* ---- text (constrained width), sitting over the image background ---- */}
      <div className={styles.textWrap}>
        {/* side notes pointing down to the images */}
        {/* <div className={styles.noteLeft} data-float="18">
          <span className={styles.noteWord}>See our work</span>
          <svg className={styles.noteArrow} viewBox="0 0 90 120" fill="none">
            <path d="M20 8 C6 46 34 66 50 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M36 88 L52 104 L66 84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div> */}
        {/* <div className={styles.noteRight} data-float="18">
          <span className={styles.noteWord}>Made with love</span>
          <svg className={`${styles.noteArrow} ${styles.flip}`} viewBox="0 0 90 120" fill="none">
            <path d="M20 8 C6 46 34 66 50 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M36 88 L52 104 L66 84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div> */}

        <h1 className={styles.headline} data-noreveal>
          <span className={styles.line}>{splitWords("We Design to Wow", 0)}</span>
          <span className={`${styles.line} ${styles.accent}`}>
            {splitWords("We Build to Grow", 0.21)}
          </span>
        </h1>
      </div>  

      {/* ---- puzzle-grid of small images (scroll-reactive) ---- */}
      <div className={styles.puzzle} aria-hidden="true">
        {COLS.map((tiles, c) => (
          <div
            key={c}
            className={styles.puzzleCol}
            ref={(el) => (colRefs.current[c] = el)}
          >
            <div
              className={styles.puzzleColInner}
              style={{
                animationDuration: `${(7 + (c % 3) * 1.3).toFixed(1)}s`,
                animationDelay: `${(c * 0.5).toFixed(1)}s`,
                animationDirection: c % 2 ? "alternate-reverse" : "alternate",
              }}
            >
              {tiles.map((t, i) => (
                <div key={i} className={`${styles.puzzleTile} ${t.aspect}`}>
                  <img src={t.src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <span className={styles.puzzleScrim} />
        <span className={styles.puzzleFadeTop} />
        <span className={styles.puzzleFadeBottom} />
      </div>
    </section>
  );
}
