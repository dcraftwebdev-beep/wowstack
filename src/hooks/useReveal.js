import { useEffect, useRef } from "react";

/**
 * Scroll-reveal helper. Attach the returned ref to a section root; every
 * descendant carrying `revealClass` fades/slides in (via `visibleClass`) as it
 * scrolls into view. Each component passes its own CSS-module classes so it
 * stays fully self-contained.
 */
export default function useReveal(revealClass, visibleClass) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(`.${revealClass}`);
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add(visibleClass));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add(visibleClass); io.unobserve(e.target); }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [revealClass, visibleClass]);
  return ref;
}
