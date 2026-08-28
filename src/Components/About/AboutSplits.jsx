import React from "react";
import { Star, ArrowRight, Check } from "lucide-react";
import styles from "./AboutSplits.module.css";
import Button from "../UI/Button";
import useReveal from "../../hooks/useReveal";
import shot2 from "../../assets/heroprojects/web3.jpg";


const SPLIT_ONE = {
  badge: "About Wow Stack",
  titleWhite: "An Agency With Classic",
  titleMuted: "Revolutionary Skills!",
  features: [
    { title: "Your Success, Our Priority", desc: "At Wow Stack, we believe in empowering our clients to achieve their goals — our team works closely with you at every step." },
    { title: "Partners You Can Rely On", desc: "We're here to ensure your success with expert guidance and genuinely collaborative teamwork." },
    { title: "Built to Convert", desc: "Every pixel and automation is engineered to turn visitors into paying customers — not just to look pretty." },
    { title: "Senior Team, Start to Finish", desc: "No juniors, no hand-offs — the same experienced people design, build and ship your project." },
  ],
  ratingLabel: "Trusted by 20+ growing brands",
  aspect: "1 / 1",
  image: shot2,
};

const SPLIT_TWO = {
  badge: "How We Work",
  titleWhite: "Work Smarter Not Harder",
  titleMuted: "in Every Minute!",
  reverse: true,
  features: [
    { title: "Guided Every Step", desc: "We ensure a smooth journey from concept to completion, providing expert support to bring your vision to life effortlessly." },
    { title: "Support Beyond Delivery", desc: "Our commitment doesn't end at launch — we're here with ongoing updates and expertise whenever you need it." },
    { title: "Automated by Default", desc: "WhatsApp, CRM and payment flows run 24/7, so your business keeps moving even when you're offline." },
    { title: "Launch in 7–14 Days", desc: "A battle-tested process gets you live fast — without cutting corners on quality." },
  ],
  ratingLabel: "100% of clients recommend us",
  aspect: "4 / 3",
  image: "/others/howwework.avif",
};

function Split({ data }) {
  return (
    <div className={`${styles.splitGrid} ${data.reverse ? styles.splitReverse : ""}`}>
      <div className={styles.splitImg}>
        <div className={`${styles.imgFrame} ${styles.reveal}`} style={{ "--asp": data.aspect }}>
          <img src={data.image} alt="" loading="lazy" />
        </div>
        <span className={styles.imgGlow} />
      </div>

      <div className={styles.splitContent}>
        <span className={`${styles.badge} ${styles.reveal}`}>{data.badge}</span>
        <h2 className={`${styles.splitTitle} ${styles.reveal}`}>
          {data.titleWhite} <span className={styles.muted}>{data.titleMuted}</span>
        </h2>
        <div className={`${styles.divider} ${styles.reveal}`} />

        {data.features.map((f) => (
          <div key={f.title} className={`${styles.featBlock} ${styles.reveal}`}>
            <span className={styles.featIcon}><Check size={15} strokeWidth={3} /></span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}

        <div className={`${styles.splitFoot} ${styles.reveal}`}>
          <Button to="/contact" size="lg" icon={<ArrowRight size={17} />}>Book an Appointment</Button>
          <div className={styles.rating}>
            <span className={styles.stars}>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
            </span>
            <span className={styles.ratingLabel}>{data.ratingLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSplits() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  return (
    <section className={styles.section} ref={ref}>
      <Split data={SPLIT_ONE} />
      <Split data={SPLIT_TWO} />
    </section>
  );
}
