import React, { useEffect, useRef } from "react";
import styles from "./Section-Styles/WhyWebsite.module.css";
import { Link } from "react-router-dom";
import { Rocket, Atom, Link2, ArrowRight ,Brain,TrendingUp} from "lucide-react";
// TODO: swap this for the person-working-on-laptop photo when you have it
import visual from "../../assets/heroprojects/web5.jpg";

const STAGES = [
  {
    n: 1,
    title: "Discover",
    Icon: Rocket,
    desc:
      "Every great brand starts with clarity. We dive deep into your business, audience, ambitions, and challenges to understand what truly drives your brand forward.",
    tags: ["Deep-Dive Discovery", "Market Research"],
  },

  {
    n: 2,
    title: "Strategize",
    Icon: Brain,
    desc:
      "We turn insights into direction. From positioning and messaging to digital strategy, we create a clear roadmap designed to make your brand stand out and move with purpose.",
    tags: ["Brand Strategy", "Growth Roadmap"],
  },

  {
    n: 3,
    title: "Create",
    Icon: Atom,
    desc:
      "Now we bring the vision to life. Our designers and developers craft distinctive identities, digital experiences, and products that make your brand impossible to ignore.",
    tags: ["Creative Direction", "Digital Experiences"],
  },

  {
    n: 4,
    title: "Launch",
    Icon: Rocket,
    desc:
      "Great work deserves a great launch. We bring every detail together, test the experience, refine the final touches, and make sure your brand is ready to make an impact.",
    tags: ["Launch Ready", "Quality Assurance"],
  },

  {
    n: 5,
    title: "Grow",
    Icon: TrendingUp,
    desc:
      "The launch is only the beginning. We use insights, performance, and continuous improvement to help your brand evolve, reach more people, and turn attention into growth.",
    tags: ["Performance Insights", "Continuous Growth"],
  },
];

export default function WhyWebsite() {
  const ref = useRef(null);

  // scroll-reveal: fade up + slight zoom as each element enters the viewport
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll(`.${styles.reveal}`)];
    const revealAll = () => els.forEach((el) => el.classList.add(styles.in));

    if (!("IntersectionObserver" in window)) {
      revealAll();
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
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.grid}>
        {/* LEFT — scrolling content */}
        <div className={styles.left}>
          <div className={`uiTag ${styles.reveal}`}>
            <span className="uiTag__dot" />
            <span className="uiTag__text">How We Work</span>
            <span className="uiTag__line" />
          </div>

          <h2 className={`${styles.title} ${styles.reveal}`}>
            We Simplify The Journey{" "}
            <span className={styles.titleMuted}>From Design To Launch.</span>
          </h2>

          <p className={`${styles.sub} ${styles.reveal}`}>
            We make it easy to bring your ideas to life, guiding you from concept
            to a fully launched product.
          </p>

          <div className={styles.cards}>
            {STAGES.map((s) => (
              <article key={s.n} className={`${styles.card} ${styles.reveal}`}>
                <span className="uiCardLine" />
                <div className={styles.cardTop}>
                  <span className={styles.iconBox}>
                    <s.Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className={styles.stageBadge}>Stage {s.n}</span>
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <Link to="/contact" className={`${styles.book} ${styles.reveal}`}>
              Book an Appointment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* RIGHT — sticky image */}
        <div className={styles.right}>
          <div className={styles.sticky}>
            <div className={styles.visual}>
              <img src={visual} alt="How we work" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
