import styles from "./Section-Styles/Header.module.css"
import { ArrowRight } from "lucide-react"
import { NavLink, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from '../../assets/Logo/wowstackwhite.webp'

const navLinks = [
  { to: "/about",            label: "About" },
  { to: "/services",         label: "Services" },
  { to: "/flow-and-features", label: "Flow & Features" },
  { to: "/pricing",          label: "Pricing" },
  // { to: "/how-it-works",     label: "How it works" },
  { to: "/our-works",        label: "Our works" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || window.pageYOffset || 0) > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContainer}>

        {/* LOGO */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoImg}>
            <img src={logo} alt="Wow Stack Logo" />
          </div>
          {/* <div className={styles.logoTexts}>
            <span className={styles.logoTitle}><span className="wow-cursive">Wow</span> Stack</span>
            <span className={styles.logoSubtitle}>Design and Development</span>
          </div> */}
        </Link>

        {/* NAV */}
        <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
          <span className={styles.menuLabel}>Menu</span>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.linkText}>{label}</span>
              <span className={styles.navChevron} aria-hidden="true" />
              {/* hand-drawn circle — only visible when activeLink class is applied */}
              <svg
                className={styles.drawCircle}
                viewBox="0 0 120 40"
                preserveAspectRatio="none"
              >
                <ellipse cx="60" cy="20" rx="55" ry="16" />
              </svg>
            </NavLink>
          ))}

          {/* CTA inside the mobile menu */}
          <Link to="/contact" className={styles.mobileCta} onClick={() => setIsMenuOpen(false)}>
            Get in touch
            <span className={styles.mobileCtaArrow}><ArrowRight size={18} /></span>
          </Link>
        </nav>

        {/* HAMBURGER */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        {/* CTA */}
        <Link to="/contact" className={styles.ctaButton}>
          Get in touch
          <span className={styles.arrow}>
            <ArrowRight size={18} />
          </span>
        </Link>

      </div>
    </header>
  )
}