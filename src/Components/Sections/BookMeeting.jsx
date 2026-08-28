import React, { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import s from "./Section-Styles/BookMeeting.module.css";

/**
 * Inline Cal.com booking.
 * ── IMPORTANT: set CAL_LINK to your exact Cal.com event link.
 *    Open your event on cal.com, copy the part after "cal.com/" — e.g. for
 *    cal.com/gunal/15min it is "gunal/15min". Until it's correct the embed
 *    will show Cal.com's "not found" screen.
 */
const CAL_LINK = "dcraft-tnljk4/catch-up"; // your real Cal.com event slug
const WHATSAPP =
  "https://wa.me/916383091748?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20a%20project.";

export default function BookMeeting() {
  const rootRef = useRef(null);
  const calRef = useRef(null);

  // reveal
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
          if (e.isIntersecting) { e.target.classList.add(s.isVisible); io.unobserve(e.target); }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Cal.com inline embed
  useEffect(() => {
    /* eslint-disable */
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    /* eslint-enable */
    try {
      window.Cal("init", { origin: "https://app.cal.com" });
      window.Cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: { "cal-brand": "#f59e0b" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      if (calRef.current) {
        window.Cal("inline", {
          elementOrSelector: calRef.current,
          calLink: CAL_LINK,
          config: { theme: "dark", layout: "month_view" },
        });
      }
    } catch (e) { /* embed unavailable */ }
  }, []);

  return (
    <section className={s.section} ref={rootRef}>
      <div className={s.inner}>
        <div className={`${s.head} ${s.reveal}`}>
          <h2 className={s.title}>
            Let's build something <span className={s.titleAccent}>great</span> together.
          </h2>
          <p className={s.sub}>
            Pick a time below for a free call — no pressure, just a chat
            about your project.
          </p>
        </div>

        <div className={`${s.embedWrap} ${s.reveal}`}>
          <div className={s.embed} ref={calRef} />
        </div>

        <p className={`${s.fallback} ${s.reveal}`}>
          Prefer to chat first?{" "}
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            <MessageCircle size={14} /> Message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
