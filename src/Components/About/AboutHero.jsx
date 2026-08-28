import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./AboutHero.module.css";
import Button from "../UI/Button";
import useReveal from "../../hooks/useReveal";

// per-word blur reveal — space rendered as a real text node between the
// inline-block spans (a trailing space *inside* an inline-block gets trimmed,
// which is why the words were running together).
const words = (text, start = 0, step = 0.07) => {
  const arr = text.split(" ");
  return arr.map((w, i) => (
    <React.Fragment key={i}>
      <span className={styles.word} style={{ "--d": `${(start + i * step).toFixed(2)}s` }}>{w}</span>
      {i < arr.length - 1 ? " " : ""}
    </React.Fragment>
  ));
};

export default function AboutHero() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  const videoRef = useRef(null);

  // play the video when it scrolls into view, pause when it leaves — no controls, no popup
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { v.play().catch(() => {}); }
        else v.pause();
      }),
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} ref={ref}>
      <div className={`uiTag ${styles.centerTag}`}>
        <span className="uiTag__dot" />
        <span className="uiTag__text">Deep dive into Wow Stack</span>
        <span className="uiTag__line" />
      </div>
      <h1 className={styles.heroTitle}>
        <span className={styles.line}>{words(" More About Wow Stack", 0)}</span>
        <span className={`${styles.line} ${styles.accent}`}>{words("Let's Deep Dive!", 0.28)}</span>
      </h1>
      <p className={styles.heroSub}>
        Wow Stack is your go-to studio for web design, development and automation
        — we help ambitious businesses turn visitors into paying customers.
      </p>
      {/* <div className={styles.heroCtas}>
        <Button to="/contact" size="lg" icon={<ArrowRight size={17} />}>Connect with us</Button>
      </div> */}

      <div className={`${styles.heroMedia} ${styles.reveal}`}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src="/videos/webdesign.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Wow Stack showreel"
        />
        <span className={styles.heroGlow} />
      </div>
    </section>
  );
}
