import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Section-Styles/RisePartner.module.css";
import web1 from "../../assets/heroprojects/web1.jpg";
import web2 from "../../assets/heroprojects/web2.jpg";
import web3 from "../../assets/heroprojects/web3.jpg";
import web4 from "../../assets/heroprojects/web4.jpg";
import web5 from "../../assets/heroprojects/web5.jpg";
import web6 from "../../assets/heroprojects/web6.jpg";
import web7 from "../../assets/heroprojects/web7.jpg";
import web8 from "../../assets/heroprojects/web8.jpg";

const ROW1 = [web1, web2, web3, web4];
const ROW2 = [web5, web6, web7, web8];

export default function RisePartner() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll(`.${styles.reveal}`)];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.content}>
        <div className={`uiTag ${styles.reveal}`}>
          <span className="uiTag__dot" />
          <span className="uiTag__text">Launch Your Site</span>
          <span className="uiTag__line" />
        </div>

        <h2 className={`${styles.title} ${styles.reveal}`}>
          Your Trusted Growth Partner{" "}
          <span className={styles.titleMuted}>For Startups &amp; Agencies</span>
        </h2>

        <p className={`${styles.sub} ${styles.reveal}`}>
          Get your site live in no time — with professional setup and expert
          support, done the easy way.
        </p>

        <Link to="/our-works" className={`${styles.cta} ${styles.reveal}`}>
          See Our Work
        </Link>
      </div>

      <div className={`${styles.grid} ${styles.reveal}`} aria-hidden="true">
        <div className={styles.row}>
          {ROW1.map((src, i) => (
            <div key={i} className={styles.tile}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className={`${styles.row} ${styles.rowOffset}`}>
          {ROW2.map((src, i) => (
            <div key={i} className={styles.tile}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
