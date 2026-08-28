import React from "react";
import { Rocket, Star, Timer, Gauge, Zap, ShieldCheck } from "lucide-react";
import styles from "./AboutRecognition.module.css";
import useReveal from "../../hooks/useReveal";

const RECOGNITION = [
  { Icon: Rocket, big: "20+", label: "Projects shipped", sub: "for real clients" },
  { Icon: Star, big: "5.0", label: "Client rating", sub: "average satisfaction" },
  { Icon: Timer, big: "7–14", label: "Day delivery", sub: "from kickoff to live" },
  { Icon: Gauge, big: "90+", label: "PageSpeed", sub: "on core web vitals" },
  { Icon: Zap, big: "24/7", label: "Automations", sub: "running on autopilot" },
  { Icon: ShieldCheck, big: "100%", label: "Code ownership", sub: "no monthly lock-in" },
];

export default function AboutRecognition() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.recogHead} ${styles.reveal}`}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">Recognition</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={styles.title}>Numbers That <span className={styles.accent}>Speak For Us</span></h2>
      </div>
      <div className={styles.recogGrid}>
        {RECOGNITION.map((r, i) => (
          <div className={`${styles.recogCard} ${styles.reveal}`} key={r.label} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className={styles.recogIcon}><r.Icon size={20} /></span>
            <div className={styles.recogBig}>{r.big}</div>
            <div className={styles.recogLabel}>{r.label}</div>
            <div className={styles.recogSub}>{r.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
