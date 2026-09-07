import ScrollExpand from "../UI/ScrollExpand";
import s from "./Section-Styles/ServiceExpand.module.css";

// Home page section 2 — a scroll-driven frame that expands to full-bleed video.
export default function ServiceExpand() {
  return (
    <section className={s.section} aria-label="What we build">
      <ScrollExpand
        mediaType="video"
        src="/videos/video1.mp4"
        title="Design. Build. Automate."
        scrollHint="Keep scrolling"
        useWindowScroll
        mediaZoom={1.3}
        overlayScrim={0.55}
        startWidth={44}
        startHeight={60}
        startRadius={26}
      >
        <div className={s.overlay}>
          <h2 className={s.title}>
            One studio for your <span className={s.accent}>whole online presence</span>
          </h2>
        </div>
      </ScrollExpand>
    </section>
  );
}
