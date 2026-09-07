import React from "react";
import styles from "./AboutHero.module.css";
import useReveal from "../../hooks/useReveal";
import DarkVeil from "../UI/DarkVeil";
import HeroPuzzle from "../Sections/HeroPuzzle";

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

  return (
    <section className={styles.hero} ref={ref}>
      {/* WebGL DarkVeil background behind the content */}
      <div className={styles.rays} aria-hidden="true">
        <DarkVeil hueShift={0} noiseIntensity={0.06} scanlineIntensity={0} speed={0.8} scanlineFrequency={0.5} warpAmount={0} />
      </div>

      <div className={`uiTag ${styles.centerTag}`}>
        <span className="uiTag__dot" />
        <span className="uiTag__text">Deep dive into Wow Stack</span>
        <span className="uiTag__line" />
      </div>
      <h1 className={styles.heroTitle}>
        <span className={styles.line}>{words(" More About Wow Stack", 0)}</span>
      </h1>

      {/* scroll-reactive puzzle grid of our work, below the hero text */}
      <HeroPuzzle />
    </section>
  );
}
