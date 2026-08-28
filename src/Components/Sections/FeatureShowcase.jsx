import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, TrendingUp, ShoppingBag } from "lucide-react";
import s from "./Section-Styles/FeatureShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    tag: "Design & Development",
    name: "Custom Websites That Convert",
    desc: "Beautiful, blazing-fast websites designed and hand-coded to turn visitors into paying customers.",
    points: ["Responsive on every device", "SEO-ready, clean code", "Built around your brand"],
    visual: "browser",
    flip: false,
  },
  {
    tag: "E-Commerce",
    name: "Online Stores & Payments",
    desc: "Sell online with a fast store and seamless UPI, card and Razorpay checkout built right in.",
    points: ["Product catalog & cart", "Secure payment gateway", "Orders & inventory tracking"],
    visual: "shop",
    flip: true,
  },
  {
    tag: "SEO & Growth",
    name: "Rank Higher, Grow Faster",
    desc: "Climb Google rankings and turn organic traffic into real leads — month after month.",
    points: ["Keyword & content strategy", "On-page + technical SEO", "Rank & traffic reporting"],
    visual: "seo",
    flip: false,
  },
];

function Visual({ type }) {
  if (type === "browser") {
    return (
      <div className={s.visual}>
        <div className={s.browser}>
          <div className={s.browserBar}>
            <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
            <div className={s.urlPill}>wowstack.in</div>
          </div>
          <div className={s.browserBody}>
            <div className={s.bHero} />
            <div className={s.bRow}><span /><span /></div>
            <div className={s.bRow3}><span /><span /><span /></div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "shop") {
    return (
      <div className={s.visual}>
        <div className={s.shopCard}>
          <span className={s.shopImg} />
          <div className={s.shopMeta}>
            <div className={s.shopName}>Signature Product</div>
            <div className={s.shopPrice}>₹1,299</div>
          </div>
        </div>
        <button className={s.payBtn} type="button">
          <ShoppingBag size={16} /> Pay with UPI
        </button>
      </div>
    );
  }
  return (
    <div className={s.visual}>
      <div className={s.rankCard}>
        <span className={s.rankNo}>#1</span> your business
        <span className={s.rankUp}><TrendingUp size={14} /> +180%</span>
      </div>
      <div className={s.bars}>
        {[40, 55, 48, 70, 82, 100].map((h, i) => (
          <span key={i} className={s.bar} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  const sectionRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // CSS `position: sticky` does the stacking; GSAP only adds the settle
      // (each card scales back a touch as the next rises over it).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(`.${s.card}`, deckRef.current);

        cards.forEach((card, i) => {
          const inner = card.querySelector(`.${s.cardInner}`);
          const visual = card.querySelector(`.${s.visual}`);
          const text = card.querySelector(`.${s.cardText}`);

          // text drifts as the card passes (parallax, opposite to the image)
          if (text) {
            gsap.fromTo(
              text,
              { y: 34 },
              {
                y: -34,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          // image parallax — overscaled so edges never reveal the card behind
          if (visual) {
            gsap.fromTo(
              visual,
              { yPercent: 10, scale: 1.16 },
              {
                yPercent: -10,
                scale: 1.16,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          // stacking settle: scale this card back as the next one rises
          const next = cards[i + 1];
          if (next) {
            gsap.to(inner, {
              scale: 0.92,
              yPercent: -3,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          }
        });
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section className={s.section} ref={sectionRef}>
      <div className={s.head}>
        <div className="uiTag">
          <span className="uiTag__dot" />
          <span className="uiTag__text">What We Build</span>
          <span className="uiTag__line" />
        </div>
        <h2 className={s.title}>
          Everything we design,<br></br>build{" "}
          <span className={s.titleAccent}>&amp; grow</span>
        </h2>
        <p className={s.sub}>
          From the first pixel to page-one rankings — one team for your entire
          web presence.
        </p>
      </div>

      <div className={s.deck} ref={deckRef}>
        {CARDS.map((c) => (
          <div className={s.card} key={c.name}>
            <article className={`${s.cardInner} ${c.flip ? s.cardFlip : ""}`}>
              <div className={s.cardGrid}>
                <div className={s.cardText}>
                  <span className={s.cardTag}>{c.tag}</span>
                  <h3 className={s.cardName}>{c.name}</h3>
                  <p className={s.cardDesc}>{c.desc}</p>
                  <div className={s.points}>
                    {c.points.map((p) => (
                      <div key={p} className={s.point}>
                        <span className={s.pointIcon}><Check size={14} /></span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
                <Visual type={c.visual} />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
