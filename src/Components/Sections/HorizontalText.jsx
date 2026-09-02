import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import s from "./Section-Styles/HorizontalText.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HorizontalText() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(textRef.current, { type: "chars, words" });

        // Horizontal scroll driven by the tall section — CSS `position: sticky`
        // holds the frame, so NO GSAP pin (which wraps the DOM and crashes on
        // React route unmount).
        const scrollTween = gsap.to(textRef.current, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: "bottom bottom",
            // numeric scrub = smoothing lag: the text eases toward the scroll
            // position over ~2s, so it always glides slowly no matter how fast
            // you spin the wheel (scrub: true was 1:1 and felt too fast).
            scrub: 2,
          },
        });

        // scatter each char in as it enters, tied to the horizontal motion
        split.chars.forEach((char) => {
          gsap.from(char, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 100%",
              end: "left 30%",
              scrub: 1,
            },
          });
        });

        return () => split.revert();
      });
    }, wrapRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section className={s.horizontal} ref={wrapRef}>
      <div className={s.sticky}>
        <h2 className={`${s.text} ${s.headingXl}`} ref={textRef}>
          We design. We develop. We <span className={s.accent}>automate</span>. We grow your business online.
        </h2>
      </div>
    </section>
  );
}
