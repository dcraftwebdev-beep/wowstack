import React from "react";
import styles from "./Section-Styles/CallToAction.module.css";
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className={styles.ctaSection} id="cta">
      <div className={styles.ctaCard}>
        {/* stickers */}
        <Star className={`${styles.sticker} ${styles.st1}`} fill="currentColor" />
        <Sparkles className={`${styles.sticker} ${styles.st2}`} />
        <span className={`${styles.pillSticker}`}>Let&apos;s build</span>

        <div className={styles.inner}>
          <h2 className={styles.heading}>
            Ready to partner with Wow Stack &amp;
            <br />
            unlock your <span className={styles.hl}>full potential?</span>
          </h2>

          <div className={styles.btns}>
            <a href="tel:+916383091748" className={styles.btnPrimary}>
              Get in touch
              <span className={styles.btnArrow}>
                <ArrowRight size={16} />
              </span>
            </a>
            <a
              href="https://wa.me/6383091748?text=Hi%2C%20I%27m%20ready%20to%20start%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              <MessageCircle size={18} />
              WhatsApp us
            </a>
          </div>

          <p className={styles.note}>Reply within 24 hours · Mon–Sat 9AM–10PM</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
