import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Section-Styles/Footer.module.css";
import logo from '../../assets/Logo/wowstackwhite.webp'
import { Heart, Send, ArrowUpRight, ArrowDown, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

const socials = [
  { label: "Book an intro call", href: "/contact", icon: "down", internal: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "out" },
  { label: "Instagram", href: "https://www.instagram.com/dcraft_dev/", icon: "out" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "out" },
];

const pageLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/our-works", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  { to: "/services", label: "Web Design & Development" },
  { to: "/services", label: "WhatsApp Chatbot & Ordering" },
  { to: "/services", label: "n8n Workflow Automation" },
  { to: "/services", label: "E-Commerce Stores" },
  { to: "/services", label: "SEO & Growth Marketing" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ── MAIN ── */}
      <div className={styles.footerMain}>
        {/* BRAND + SUBSCRIBE */}
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoImg}>
              <img src={logo} alt="Wow Stack Logo" />
            </div>
          </Link>
          <span className={styles.brandRule} />
          <p className={styles.brandDesc}>
           Your Success, Our Priority.{" "}
            <Heart size={16} className={styles.heart} fill="currentColor" /> 
            {/* We build sites &amp; automations that pull in leads while you sleep — Wow Stack. */}
          </p>

          <form
            className={styles.subscribe}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter Your Email...."
              className={styles.subInput}
              aria-label="Email"
            />
            <button type="submit" className={styles.subBtn}>
              Subscribe Us
            </button>
          </form>
        </div>

        {/* SERVICES */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Services</h4>
          <ul className={styles.navList}>
            {serviceLinks.map((l, i) => (
              <li key={i}>
                <NavLink to={l.to}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* PAGES */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Pages</h4>
          <ul className={styles.navList}>
            {pageLinks.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Get in touch</h4>
          <ul className={styles.contactList}>
            <li>
              <a href="mailto:wowstack@gmail.com"><Mail size={17} /> wowstack@gmail.com</a>
            </li>
            <li>
              <a href="https://wa.me/916383091748" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> +91 63830 91748</a>
            </li>
            <li>
              <span><MapPin size={17} /> Chennai, Tamil Nadu, India</span>
            </li>
            <li>
              <span><Clock size={17} /> Mon–Sat · 9AM – 10PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── SOCIAL PILL BAR ── */}
      <div className={styles.socialBar}>
        <a href="mailto:dcraftwebdev@gmail.com" className={`${styles.pill} ${styles.pillFilled}`}>
          <Send size={15} /> Drop an Email
        </a>
        {socials.map((sBtn) =>
          sBtn.internal ? (
            <Link key={sBtn.label} to={sBtn.href} className={styles.pill}>
              {sBtn.label}
              {sBtn.icon === "down" ? <ArrowDown size={15} /> : <ArrowUpRight size={15} />}
            </Link>
          ) : (
            <a
              key={sBtn.label}
              href={sBtn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pill}
            >
              {sBtn.label} <ArrowUpRight size={15} />
            </a>
          )
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} <span>Wow Stack</span>. All rights
          reserved.
        </p>
        <div className={styles.legal}>
          <Link to="/contact">Terms &amp; Conditions</Link>
          <Link to="/contact">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
