import React from "react";
import { Plus, PenTool, Code2, Workflow, Search, ClipboardCheck, LifeBuoy } from "lucide-react";
import styles from "./AboutTeam.module.css";
import Button from "../UI/Button";
import useReveal from "../../hooks/useReveal";

const TEAM = [
  { Icon: PenTool, role: "Design Lead", focus: "Interfaces that convert" },
  { Icon: Code2, role: "Full-Stack Engineer", focus: "Fast, scalable builds" },
  { Icon: Workflow, role: "Automation Specialist", focus: "n8n & WhatsApp flows" },
  { Icon: Search, role: "SEO Strategist", focus: "Page-one visibility" },
  { Icon: ClipboardCheck, role: "Project Manager", focus: "On-time, every time" },
  { Icon: LifeBuoy, role: "Support & QA", focus: "We stick around after launch" },
];

export default function AboutTeam() {
  const ref = useReveal(styles.reveal, styles.isVisible);
  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.head} ${styles.reveal}`}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">The team</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={styles.title}>Meet the Team Making <br /><span className={styles.titleMuted}>Things Happen Every Day</span></h2>
        <p className={styles.sub}>A focused, senior team that brings design, engineering and automation expertise to every project.</p>
        <Button to="/contact" variant="ghost">Book a 15-min call</Button>
      </div>

      <div className={styles.teamGrid}>
        {TEAM.map((m, i) => (
          <div className={`${styles.teamCard} ${styles.reveal}`} key={m.role} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className={styles.teamAvatar}><m.Icon size={26} strokeWidth={2} /></span>
            <div className={styles.teamMeta}>
              <div className={styles.teamRole}>{m.role}</div>
              <div className={styles.teamFocus}>{m.focus}</div>
            </div>
            <span className={styles.teamPlus}><Plus size={16} /></span>
          </div>
        ))}
      </div>
    </section>
  );
}
