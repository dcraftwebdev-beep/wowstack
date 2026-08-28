import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import s from "./Section-Styles/BentoGallery.module.css";

gsap.registerPlugin(ScrollTrigger, Flip);

// Drop 8 images into  public/about/  as about1.jpg … about8.jpg.
// A Picsum placeholder is shown automatically until they exist.
const IMAGES = Array.from({ length: 8 }, (_, i) => `/about/about${i + 1}.jpg`);
const fallback = (i) => `https://picsum.photos/seed/wowstack-bento-${i + 1}/600/760`;

export default function BentoGallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    let flipCtx;

    const createTween = () => {
      const galleryElement = galleryRef.current;
      if (!galleryElement) return;

      // static bento on small screens — no pin/morph
      if (window.innerWidth < 768) {
        flipCtx && flipCtx.revert();
        flipCtx = null;
        return;
      }

      const galleryItems = galleryElement.querySelectorAll(`.${s.galleryItem}`);

      flipCtx && flipCtx.revert();
      galleryElement.classList.remove(s.galleryFinal);

      flipCtx = gsap.context(() => {
        // capture the full-bleed final state, then Flip back from it
        galleryElement.classList.add(s.galleryFinal);
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove(s.galleryFinal);

        const flip = Flip.to(flipState, {
          ease: "none",
          absolute: true,
          scale: true, // often helps with image grids
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: galleryElement.parentNode,
          },
        });
        tl.add(flip);

        return () => gsap.set(galleryItems, { clearProps: "all" });
      });
    };

    createTween();
    window.addEventListener("resize", createTween);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", createTween);
      flipCtx && flipCtx.revert(); // un-pins before React unmounts → no crash
    };
  }, []);

  return (
    <section className={s.section}>
      <div className={s.galleryWrap}>
        <div className={`${s.gallery} ${s.galleryBento}`} ref={galleryRef}>
          {IMAGES.map((src, i) => (
            <div className={s.galleryItem} key={i}>
              <img
                src={src}
                alt={`Wow Stack project ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = fallback(i); }
                  else { img.style.opacity = 0; }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
