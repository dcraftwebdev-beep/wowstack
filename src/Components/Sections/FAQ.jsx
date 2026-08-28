import { useState, useRef, useEffect } from "react";
import "./Section-Styles/FAQ.css";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../../data/faqs";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const rootRef = useRef(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // scroll-reveal
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".faq-reveal");
    if (!els?.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const half = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, half), FAQS.slice(half)];

  return (
    <section className="faq-section" ref={rootRef}>
      <div className="faq-container">
        <div className="faq-head faq-reveal">
          <div className="uiTag">
            <span className="uiTag__dot" />
            <span className="uiTag__text">Questions &amp; Answers</span>
            <span className="uiTag__line" />
          </div>
          <h2 className="faq-title">
            How can I help you <span className="calltoaction-highlight2">right now?</span>
          </h2>
          <p className="faq-sub">
            Everything you might be wondering about pricing, ownership, delivery
            and support — answered upfront.
          </p>
        </div>

        <div className="faq-grid">
          {columns.map((col, c) => (
            <div className="faq-col" key={c}>
              {col.map((item, i) => {
                const idx = c * 100 + i;
                const open = openIndex === idx;
                return (
                  <div
                    className="faq-item faq-reveal"
                    data-open={open ? "true" : undefined}
                    key={idx}
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <button className="faq-question" onClick={() => toggle(idx)} aria-expanded={open}>
                      {item.q}
                      <ChevronDown className={`faq-icon ${open ? "rotate" : ""}`} />
                    </button>
                    <div className={`faq-answer-wrap ${open ? "open" : ""}`}>
                      <div className="faq-answer-inner">
                        <p className="faq-answer">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
