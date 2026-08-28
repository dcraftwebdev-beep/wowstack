import React, { useEffect, useRef, useState } from "react";
import styles from "./PageStyles/Features.module.css";
import featuresImg from "../assets/flowdevdesign.png";
import powerfullImg from "../assets/powerfullfeatures.png";
import {
  Zap, Workflow, Globe, LayoutDashboard,
  ArrowRight, Info, CheckCircle, MessageCircle,
  Timer, CreditCard, Inbox, BellRing,
  Languages, Rocket, Puzzle, FlaskConical, PenSquare, Sparkles
} from "lucide-react";
import ContactMe from "../Components/Sections/ContactMe";
import PageSeo from "../Components/PageSeo";
import ProcessSection from "../Components/Sections/ProcessSection";
import ToolsSection from "../Components/Sections/ToolsSection";

// centre-branching flow — the automation & lead engine (distinct from the "included stack")
const FLOW = [
  { Icon: MessageCircle, name: "WhatsApp Automation", sub: "Auto-reply & follow-up" },
  { Icon: Workflow, name: "Smart Lead Forms", sub: "Capture & qualify enquiries" },
  { Icon: Timer, name: "Booking & Appointments", sub: "Clients self-book online" },
  { Icon: CreditCard, name: "Payments & Checkout", sub: "UPI, cards & Razorpay" },
  { Icon: Inbox, name: "CRM Enquiry Inbox", sub: "Every lead in one place" },
  { Icon: BellRing, name: "Instant Notifications", sub: "Email & SMS alerts" },
];

// orthogonal (right-angle) connector builder — ER-diagram style, rounded corners
const roundPath = (raw, r = 12) => {
  // drop duplicate consecutive points
  const pts = raw.filter(
    (p, i) => i === 0 || p[0] !== raw[i - 1][0] || p[1] !== raw[i - 1][1]
  );
  if (pts.length < 3)
    return `M${pts[0][0]} ${pts[0][1]} L${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    const rr = Math.min(r, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    const ix = Math.sign(x - px), iy = Math.sign(y - py);
    const ox = Math.sign(nx - x), oy = Math.sign(ny - y);
    d += ` L${(x - ix * rr).toFixed(1)} ${(y - iy * rr).toFixed(1)} Q${x} ${y} ${(x + ox * rr).toFixed(1)} ${(y + oy * rr).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0]} ${last[1]}`;
  return d;
};

// management & scale tools — the "run & grow it yourself" layer (no overlap with the stack or services)
const bigFeatures = [
  {
    icon: <PenSquare size={22} />,
    name: "Self-Edit CMS",
    desc: "Update text, images and pages yourself from a simple dashboard — no developer needed.",
  },
  {
    icon: <Sparkles size={22} />,
    name: "Blog & Content Engine",
    desc: "Publish articles that pull in organic traffic and turn readers into enquiries month after month.",
  },
  {
    icon: <Languages size={22} />,
    name: "Multi-Language Ready",
    desc: "Serve customers in more than one language and widen your reach without a second website.",
  },
  {
    icon: <Puzzle size={22} />,
    name: "Integrations Hub",
    desc: "Connect Instagram, Google Maps, WhatsApp and payment gateways in a few clicks.",
  },
  {
    icon: <FlaskConical size={22} />,
    name: "A/B Testing Ready",
    desc: "Test headlines, offers and layouts to keep pushing your conversion rate higher.",
  },
  {
    icon: <Rocket size={22} />,
    name: "Scalable Architecture",
    desc: "Add pages, products and new features as your business grows — the site grows with you.",
  },
];

const checkItems = [
  "Automations run 24/7 without you lifting a finger",
  "Every enquiry captured and organised automatically",
  "Update and scale the site yourself, anytime",
  "Connects with WhatsApp, Instagram & payment tools",
  "You fully own the website — no monthly lock-in",
];

const metrics = [
  { num: "7–14", lbl: "Day delivery" },
  { num: "90+", lbl: "PageSpeed" },
  { num: "20+", lbl: "Clients" },
];

const Features = () => {
  const mapRef = useRef(null);
  const [flow, setFlow] = useState({ w: 0, h: 0, paths: [] });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // measure the real node + card positions and draw comb connectors that align
  useEffect(() => {
    const compute = () => {
      const map = mapRef.current;
      if (!map) return;
      const mr = map.getBoundingClientRect();
      const node = map.querySelector("[data-node]");
      const cards = [...map.querySelectorAll("[data-card]")];
      if (!node || !cards.length) return;
      const nr = node.getBoundingClientRect();
      const nx = nr.left + nr.width / 2 - mr.left;
      const ny = nr.top + nr.height / 2 - mr.top;
      const paths = cards.map((card) => {
        const cr = card.getBoundingClientRect();
        const cy = cr.top + cr.height / 2 - mr.top;
        if (card.dataset.card === "L") {
          const cardX = cr.right - mr.left;      // right edge faces the node
          const busX = cardX + 42;               // vertical bus near the cards
          return roundPath([[nx, ny], [busX, ny], [busX, cy], [cardX, cy]]);
        }
        const cardX = cr.left - mr.left;         // left edge faces the node
        const busX = cardX - 42;
        return roundPath([[nx, ny], [busX, ny], [busX, cy], [cardX, cy]]);
      });
      setFlow({ w: mr.width, h: mr.height, paths });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener("resize", compute);
    // recompute after fonts/layout settle
    const t = setTimeout(compute, 300);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); clearTimeout(t); };
  }, []);

  // reveal the flow map (fade/stagger) when it scrolls into view
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!("IntersectionObserver" in window)) { map.classList.add(styles.isIn); return; }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add(styles.isIn); io.unobserve(e.target); }
        }),
      { threshold: 0.2 }
    );
    io.observe(map);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <PageSeo path="/flow-and-features" />

      {/* ── HERO SPLIT ── */}
      <div className={styles.heroSection}>
{/* FLOW — centre node, cards on left & right, branching energy lines */}
        <div className={styles.flowWrap}>
          <div className={styles.flowBg} >
              {/* <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">What you get</span>
            <span className="uiTag__line" />
          </div> */}
           <h1 className={styles.heroTitle}>
            Powerful Tools To{" "}<br></br>
            <span className={styles.titleMuted}>Automate Your Growth</span>
          </h1>

          </div>
           
          <div className={styles.flowMap} ref={mapRef}>
            <svg
              className={styles.flowLines}
              viewBox={`0 0 ${flow.w || 900} ${flow.h || 430}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {flow.paths.map((d, i) => (
                <path key={"b" + i} className={styles.flowLine} d={d} />
              ))}
              {flow.paths.map((d, i) => (
                <path
                  key={"p" + i}
                  className={styles.flowPulse}
                  d={d}
                  pathLength="1"
                  style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }}
                />
              ))}
            </svg>

            <div className={`${styles.flowSide} ${styles.flowSideL}`}>
              {FLOW.slice(0, 3).map((f, i) => (
                <div key={i} className={styles.flowCard} data-card="L">
                  <span className={styles.flowIcon}>
                    <f.Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <div className={styles.flowName}>{f.name}</div>
                    <div className={styles.flowSub}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.flowNode} data-node>
              <Zap size={28} strokeWidth={2} />
            </div>

            <div className={`${styles.flowSide} ${styles.flowSideR}`}>
              {FLOW.slice(3).map((f, i) => (
                <div key={i} className={styles.flowCard} data-card="R">
                  <span className={styles.flowIcon}>
                    <f.Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <div className={styles.flowName}>{f.name}</div>
                    <div className={styles.flowSub}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* LEFT */}
        <div className={styles.heroLeft}>
        

         
          {/* <p className={styles.heroDesc}>
            Every feature is designed to <strong>reduce manual work</strong> and
            give you complete control — built to scale smoothly as your business
            grows.
          </p>

          <div className={styles.ctaRow}>
            <a
              href="https://wa.me/6383091748?text=Hi%2C%20I%27m%20ready%20to%20take%20my%20business%20to%20the%20next%20level."
              target="_blank"
              rel="noreferrer"
              className={styles.btnMain}
            >
              Let's Build Something
              <span className={styles.btnArrow}>
                <ArrowRight size={15} />
              </span>
            </a>
          </div> */}
        </div>

        

      </div>

      {/* ── HOW WE WORK (process) ── */}
      {/* <ProcessSection /> */}

      {/* ── TOOLS WE USE (integration orb) ── */}
      <ToolsSection />

    </div>
  );
};

export default Features;