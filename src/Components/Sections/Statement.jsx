import React from "react";
import styles from "./Section-Styles/Statement.module.css";

const Statement = () => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* sticker pills */}
        <span className={`${styles.sticker} ${styles.s1}`}>Web Design</span>
        <span className={`${styles.sticker} ${styles.s2}`}>Development</span>
        <span className={`${styles.sticker} ${styles.s3}`}>Branding</span>

        <h2 className={styles.text}>
          Redefining digital impact with
          <span className={styles.hl}> innovative design </span>
          that drives <span className={styles.hl2}>real results.</span>
        </h2>

        <p className={styles.sub}>
          Boost your online visibility and unlock consistent growth with Wow Stack.
        </p>
      </div>
    </section>
  );
};

export default Statement;
