import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./AboutCTA.module.css";
import Button from "../UI/Button";
import useReveal from "../../hooks/useReveal";

export default function AboutCTA() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.card} ${styles.reveal}`}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">Let's build</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={styles.title}>Each Project we Undertake <br />is a <span className={styles.accent}>Unique Opportunity.</span></h2>
        <p className={styles.sub}>Ready to turn clicks into customers? Tell us where you want to be and we'll build the web presence to get you there.</p>
        <Button to="/contact" size="lg" icon={<ArrowRight size={17} />}>Book an appointment</Button>
      </div>
    </section>
  );
}
