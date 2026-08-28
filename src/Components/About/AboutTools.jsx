import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./AboutTools.module.css";
import Button from "../UI/Button";
import useReveal from "../../hooks/useReveal";

import zapierImg from "../../assets/tools/zapier.avif";
import slackImg from "../../assets/tools/slack.avif";
import dropboxImg from "../../assets/tools/dropbox.svg";
import stripeImg from "../../assets/tools/stripe.avif";
import mailchimpImg from "../../assets/tools/mailchimp.svg";
import githubImg from "../../assets/tools/github.svg";

const TOOLS = [
  { name: "Zapier", cat: "Automation", img: zapierImg, pro: true, url: "https://zapier.com", desc: "Zapier connects your favorite apps and automates your workflows." },
  { name: "Slack", cat: "Communication", img: slackImg, url: "https://slack.com", desc: "Slack is our go-to platform for real-time communication and collaboration." },
  { name: "Dropbox", cat: "Cloud Storage", img: dropboxImg, url: "https://dropbox.com", desc: "Dropbox provides secure cloud storage, enabling us to share files and collaborate." },
  { name: "Stripe", cat: "Payments", img: stripeImg, url: "https://stripe.com", desc: "Stripe is our payment processing tool, providing a secure way to handle transactions." },
  { name: "Mailchimp", cat: "Email Marketing", img: mailchimpImg, pro: true, url: "https://mailchimp.com", desc: "Mailchimp helps us craft effective email marketing campaigns to nurture clients." },
  { name: "GitHub", cat: "Version Control", img: githubImg, url: "https://github.com", desc: "GitHub is our version control system, enabling smooth collaboration." },
];

function ToolCard({ t, delay }) {
  return (
    <a className={`${styles.card} ${styles.reveal}`} href={t.url} target="_blank" rel="noreferrer" style={{ transitionDelay: `${delay}ms` }}>
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.iconWrap}>
            <span className={styles.iconInitial} data-init>{t.name[0]}</span>
            <img
              src={t.img}
              alt={`${t.name} logo`}
              onError={(e) => { e.currentTarget.style.display = "none"; const init = e.currentTarget.parentElement.querySelector("[data-init]"); if (init) init.style.opacity = 1; }}
            />
          </span>
          <ArrowUpRight className={styles.cornerArrow} size={26} strokeWidth={2} />
        </div>

        <div className={styles.middle}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{t.name}</span>
            {t.pro && <span className={styles.pro}>PRO</span>}
          </div>
          <p className={styles.category}>{t.cat}</p>
        </div>

        <div className={styles.separator} />
        <p className={styles.desc}>{t.desc}</p>
      </div>
      <span className={styles.highlighter} />
    </a>
  );
}

export default function AboutTools() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.head} ${styles.reveal}`}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">Our stack</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={styles.title2}>Tools and Technologies <br /><span className={styles.titleMuted}>Powering Our Productivity</span></h2>
        <p className={styles.sub}>Our toolkit is made up of the latest and most reliable tech to ensure your project is executed to perfection.</p>
        <Button to="/contact" icon={<ArrowRight size={16} />}>Book an appointment</Button>
      </div>

      <div className={styles.grid}>
        {TOOLS.map((t, i) => <ToolCard key={t.name} t={t} delay={i * 60} />)}
      </div>
    </section>
  );
}
