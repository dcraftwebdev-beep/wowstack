import React, { useEffect, useRef } from "react";
import { MessageCircle, Mail, Phone, Video, Globe } from "lucide-react";
import s from "./Section-Styles/ContactHub.module.css";

const METHODS = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 63830 91748",
    hint: "Fastest reply →",
    href: "https://wa.me/916383091748?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20a%20website.",
    external: true,
  },
  {
    Icon: Mail,
    label: "Email",
    value: "dcraftwebdev@gmail.com",
    hint: "Drop us a line →",
    href: "mailto:dcraftwebdev@gmail.com",
  },
  {
    Icon: Phone,
    label: "Call",
    value: "+91 63830 91748",
    hint: "Mon–Sat, 10–7 →",
    href: "tel:+916383091748",
  },
  {
    Icon: Video,
    label: "Online Meeting",
    value: "Google Meet / Zoom",
    hint: "Book a slot →",
    href: "https://wa.me/916383091748?text=Hi%2C%20I%27d%20like%20to%20book%20a%20video%20call.",
    external: true,
  },
];

export default function ContactHub() {
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(`.${s.reveal}`);
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(s.isVisible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.isVisible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.section} ref={rootRef}>
      <div className={s.inner}>
        <div className={`${s.head} ${s.reveal}`}>
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">Get in touch</span>
            <span className="uiTag__line" />
          </div>
          <h1 className={s.title}>
            Let's build something{" "}
            <span className={s.titleAccent}>great</span>
          </h1>
          <p className={s.sub}>
            Pick whatever's easiest — WhatsApp, email, a call, or a quick video
            chat. We usually reply within a few hours.
          </p>
        </div>

        <div className={s.grid}>
          {METHODS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              className={`${s.card} ${s.reveal}`}
              {...(m.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className={s.cardIcon}><m.Icon size={20} /></span>
              <span className={s.cardLabel}>{m.label}</span>
              <span className={s.cardValue}>{m.value}</span>
              <span className={s.cardHint}>{m.hint}</span>
            </a>
          ))}
        </div>

        <div className={`${s.banner} ${s.reveal}`}>
          <span className={s.bannerIcon}><Globe size={26} /></span>
          <div>
            <h2 className={s.bannerTitle}>
              Remote-first, wherever you are
              <span className={s.bannerBadge}>Online</span>
            </h2>
            <p className={s.bannerDesc}>
              We don't have a permanent office yet — and honestly, that keeps us
              fast and focused. We work online with clients across India and
              beyond, meet over video calls, and stay a message away on WhatsApp.
              When you'd rather just talk it through, we'll happily hop on a call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
