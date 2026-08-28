import React, { useState, useRef, useEffect } from "react";
import styles from "./Section-Styles/ContactMe.module.css";
import {
  Star,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

const SERVICES = [
  "Web Design",
  "Web Development",
  "UI/UX Design",
  "SEO & Marketing",
  "Branding",
  "Other",
];

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({ ...prev, service }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: replace with your actual submission logic / API call
      await new Promise((res) => setTimeout(res, 1200));
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactWrapper}>
        {/* ── LEFT ── */}
        <div className={styles.contactLeft}>

          {/* Header block */}
          <div>
            <div className={styles.eyebrow}>
              <Star aria-hidden="true" />
              Let's talk
            </div>

            <h2 className={styles.contactTitle}>
              Let&apos;s build something cool
              <br />
              before you forget the{" "}
              <span className={styles.titleAccent}>idea.</span>
            </h2>

            <p className={styles.contactSubtitle}>
              Fill in the form — I&apos;ll get back to you within 24 hours. No
              spam, ever.
            </p>
          </div>

          {/* Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>

            {/* Row 1 — Name + Email */}
            <div className={styles.formRow}>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className={styles.formInput}
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Row 2 — Phone + Service dropdown */}
            <div className={styles.formRow}>
              <input
                className={styles.formInput}
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Custom Dropdown */}
              <div
                ref={dropdownRef}
                className={styles.customDropdown}
                tabIndex={0}
                onClick={() => setDropdownOpen((o) => !o)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDropdownOpen((o) => !o);
                  }
                  if (e.key === "Escape") setDropdownOpen(false);
                }}
                role="combobox"
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select service"
                style={{ position: "relative" }}
              >
                <span
                  className={`${styles.dropdownSelected} ${
                    formData.service ? styles.picked : ""
                  }`}
                >
                  {formData.service || "Service..."}
                </span>

                <ChevronDown
                  aria-hidden="true"
                  className={`${styles.dropdownIcon} ${
                    dropdownOpen ? styles.rotate : ""
                  }`}
                />

                {dropdownOpen && (
                  <ul
                    className={styles.dropdownMenu}
                    role="listbox"
                    aria-label="Services"
                  >
                    {SERVICES.map((svc) => (
                      <li
                        key={svc}
                        role="option"
                        aria-selected={formData.service === svc}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceSelect(svc);
                        }}
                      >
                        {svc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Hidden input so service value is included in native form data */}
              <input type="hidden" name="service" value={formData.service} />
            </div>

            {/* Message */}
            <textarea
              className={styles.formTextarea}
              name="message"
              placeholder="How can we help?"
              required
              value={formData.message}
              onChange={handleChange}
            />

            {/* Submit */}
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Submit your Form"}
              <span className={styles.arrowIcon}>
                <ArrowRight aria-hidden="true" width={15} height={15} />
              </span>
            </button>
          </form>

          {/* Contact Pills */}
          <div className={styles.contactPills}>
            <a href="tel:+916383091748" className={styles.contactPill}>
              <Phone aria-hidden="true" />
              +91 638 309 1748
            </a>
            <a href="mailto:hello@dcraft.in" className={styles.contactPill}>
              <Mail aria-hidden="true" />
              dcraftwebdev@gmail.com
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={styles.contactRight}>
          <img src="/services/contact.jpg" alt="Contact Wow Stack" />

          <div className={styles.floatCard}>
            <span className={styles.floatDot} />
            <div className={styles.floatText}>
              <strong>Reply within 24 hrs</strong>
              Usually much faster
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;