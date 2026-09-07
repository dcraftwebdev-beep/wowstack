import {
  Check, Star, Zap, Shield, CreditCard,
  TrendingUp, Sparkles, ShieldCheck, Timer
} from "lucide-react";
import styles from "./PageStyles/Pricing.module.css";
import { useState, useEffect, lazy, Suspense } from "react";
import FAQ from "../Components/Sections/FAQ";
import ContactMe from "../Components/Sections/ContactMe";
import PageSeo from "../Components/PageSeo";
import { faqJsonLd } from "../data/faqs";
import DarkVeil from "../Components/UI/DarkVeil";
import Button from "../Components/UI/Button";
import { ArrowRight } from "lucide-react";
// heavy 3D libs — only loaded on this page
const Lanyard = lazy(() => import("../Components/UI/Lanyard"));


export default function Pricing() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [billingCycle, setBillingCycle] = useState("one-time");

  const plans = {
    "one-time": [
      { price: "₹14,999", oldPrice: "₹19,999" },
      { price: "₹29,999", oldPrice: "₹39,999" },
      { price: "₹59,999", oldPrice: "₹79,999" },
    ],
    monthly: [
      { price: "₹1,499", oldPrice: "₹1,999" },
      { price: "₹2,999", oldPrice: "₹3,999" },
      { price: "₹5,999", oldPrice: "₹7,999" },
    ],
  };

  const features = [
    [
      { icon: <Check />, text: "5-Page Professional Website (Home, About, Services, Gallery, Contact)" },
      { icon: <Check />, text: "Mobile-First Design — flawless on every phone" },
      { icon: <Check />, text: "WhatsApp Chat Button — turn visitors into chats" },
      { icon: <Check />, text: "Google Business Profile Setup — show up on Maps" },
      { icon: <Check />, text: "Get Found on Google (on-page SEO basics)" },
      { icon: <Check />, text: "Enquiry Form → straight to your email" },
      { icon: <Check />, text: "Free Domain + Hosting + SSL (1 year)" },
      { icon: <Check />, text: "2 Rounds of Revisions" },
      { icon: <Check />, text: "You Own It — no monthly lock-in" },
    ],
    [
      { icon: <Zap />, text: "Everything in Starter, plus:" },
      { icon: <Zap />, text: "10-Page Conversion-Focused Website" },
      { icon: <Zap />, text: "Premium Custom Design — built to convert, not templated" },
      { icon: <Zap />, text: "WhatsApp Chat + Instagram + UPI/Razorpay Payments Integration" },
      { icon: <Zap />, text: "New Enquiries Sent to Your Email Instantly" },
      { icon: <Zap />, text: "Easy Self-Edit Dashboard — update it yourself" },
      { icon: <Zap />, text: "Advanced On-Page SEO — rank for what customers search" },
      { icon: <Zap />, text: "Speed Optimized — 90+ PageSpeed, loads under 2s" },
      { icon: <Zap />, text: "Google Analytics + Lead & Click Tracking" },
      { icon: <Zap />, text: "5 Branded Social Media Creatives (₹5,000 value)" },
      { icon: <Zap />, text: "30 Days Priority Support" },
    ],
    [
      { icon: <Star />, text: "Everything in Growth, plus:" },
      { icon: <Star />, text: "Unlimited Pages + Scalable Architecture" },
      { icon: <Star />, text: "Full Brand Identity — logo, colors, fonts & guidelines" },
      { icon: <Star />, text: "Custom Animations & Premium Interactions" },
      { icon: <Star />, text: "Online Store / E-Commerce + Payment Gateway" },
      { icon: <Star />, text: "Blog + CMS — publish & rank on autopilot" },
      { icon: <Star />, text: "WhatsApp Automation & Lead Follow-Up (setup only)*" },
      { icon: <Star />, text: "Advanced SEO + Competitor Strategy Report" },
      { icon: <Star />, text: "Heatmaps + User Behavior Tracking" },
      { icon: <Star />, text: "Conversion Tracking & A/B-Ready Setup" },
      { icon: <Star />, text: "10-Post Premium Social Media Kit (₹12,000 value)" },
      { icon: <Star />, text: "1-on-1 VIP Growth Strategy Call" },
      { icon: <Star />, text: "90 Days Priority Support" },
    ],
  ];
  const handleWhatsAppRedirect = (message) => {
    const phone = "+916383091748"; // your number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <PageSeo path="/pricing" jsonLd={faqJsonLd} />
      <section className={styles.wrapper}>

        {/* animated DarkVeil background, from the page top behind the nav */}
        <div className={styles.heroBg} aria-hidden="true">
          <DarkVeil hueShift={0} noiseIntensity={0.06} scanlineIntensity={0} speed={0.8} scanlineFrequency={0.5} warpAmount={0} />
        </div>

        {/* HERO — text left, interactive hanging tag right */}
        <div className={styles.hero}>
          <div className={styles.header}>
            <div className={`uiTag ${styles.heroEyebrow}`}>
              <span className="uiTag__dot" />
              <span className="uiTag__text">Simple, transparent pricing</span>
              <span className="uiTag__line" />
            </div>

            <h1 className={styles.title}>
              Invest Once. <span className={styles.accent}>Get Clients for Years</span>
            </h1>

            <p className={styles.subtitle}>
              Not just a website. A complete growth system to capture leads and scale your business.
            </p>
          </div>

          {/* interactive hanging tag (drag it!) */}
          <div className={styles.heroTag} aria-hidden="true">
            <Suspense fallback={null}>
              <Lanyard
                position={[-4, 5, 22]}
                gravity={[0, -40, 0]}
                frontImage="/lanyard/card-front.svg"
                backImage="/lanyard/card-back.svg"
                imageFit="cover"
              />
            </Suspense>
          </div>
        </div>

        {/* BILLING TOGGLE — centered above the pricing cards */}
        <div className={styles.billingBar}>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${billingCycle === "one-time" ? styles.active : ""}`}
              onClick={() => setBillingCycle("one-time")}
            >
              Pay Once
              {billingCycle === "one-time" && (
                <span className={styles.saveBadge}>Save 25%</span>
              )}
            </button>
            <button
              className={`${styles.toggleBtn} ${billingCycle === "monthly" ? styles.active : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className={styles.grid}>

          {/* STARTER */}
          <div className={styles.card}>
            <h3 className={styles.planName}><Shield /> Starter</h3>
            <p className={styles.planDesc}>
              For new businesses that want to look credible and start getting enquiries
            </p>

            <div className={styles.priceWrap}>
              <div className={styles.price}>{plans[billingCycle][0].price}</div>
              <div className={styles.priceSuffix}>/{billingCycle === "one-time" ? "once" : "mo"}</div>
            </div>

            <div className={styles.oldPrice}>was {plans[billingCycle][0].oldPrice}</div>

            <div className={styles.valueLine}>
              Live in 7 days · You own everything
            </div>

            <div className={styles.divider} />

            <ul>
              {features[0].map((f, i) => (
                <li key={i}><span>{f.icon}</span>{f.text}</li>
              ))}
            </ul>
            <button
              className={styles.btn}
              onClick={() =>
                handleWhatsAppRedirect("Hi, I'm interested in the Starter plan to launch my website")
              }
            >
              Launch My Website <CreditCard size={15} />
            </button>


          </div>

          {/* GROWTH */}
          <div className={`${styles.card} ${styles.popular}`}>
            <div className={styles.badge}>★ Most Popular</div>

            <h3 className={styles.planName}><TrendingUp /> Growth</h3>
            {/* <span className={styles.planTag}>Best Seller</span> */}
            <p className={styles.planDesc}>
              For businesses ready to actively turn visitors into leads &amp; bookings
            </p>

            <div className={styles.priceWrap}>
              <div className={styles.price}>{plans[billingCycle][1].price}</div>
              <div className={styles.priceSuffix}>/{billingCycle === "one-time" ? "once" : "mo"}</div>
            </div>

            <div className={styles.oldPrice}>was {plans[billingCycle][1].oldPrice}</div>

            <div className={styles.valueLine}>
              ₹15,000+ in growth tools — included free
            </div>

            <div className={styles.divider} />

            <ul>
              {features[1].map((f, i) => (
                <li key={i}><span>{f.icon}</span>{f.text}</li>
              ))}
            </ul>

            <button
              className={styles.primaryBtn}
              onClick={() =>
                handleWhatsAppRedirect("Hi, I want to grow my business and get more leads")
              }
            >
              Get More Leads <Zap size={15} />
            </button>

            <div className={styles.note}>
              <Shield size={14} />
              No extra cost. Everything included
            </div>
          </div>

          {/* PRO */}
          <div className={`${styles.card} ${styles.premium}`}>
            <h3 className={styles.planName}><Sparkles /> Pro</h3>
            <p className={styles.planDesc}>
              For established brands that want authority, automation &amp; sales at scale
            </p>

            <div className={styles.priceWrap}>
              <div className={styles.price}>{plans[billingCycle][2].price}</div>
              <div className={styles.priceSuffix}>/{billingCycle === "one-time" ? "once" : "mo"}</div>
            </div>

            <div className={styles.oldPrice}>was {plans[billingCycle][2].oldPrice}</div>

            <div className={styles.valueLine}>
              Total value ₹1,20,000+ · You save over 50%
            </div>

            <div className={styles.divider} />

            <ul>
              {features[2].map((f, i) => (
                <li key={i}><span>{f.icon}</span>{f.text}</li>
              ))}
            </ul>

            <button
              className={styles.btn}
              onClick={() =>
                handleWhatsAppRedirect("Hi, I want to scale my business with your Pro plan")
              }
            >
              Scale My Business <TrendingUp size={15} />
            </button>
          </div>

        </div>

        {/* FOOTNOTE — recurring costs disclosure */}
        <p className={styles.footnote}>
          * WhatsApp automation runs on the WhatsApp Business API. We handle the full
          setup, but the API &amp; automation tool is a separate subscription billed
          monthly/yearly by the provider (from ~₹999/mo). The free WhatsApp chat button
          is included in every plan at no extra cost.
        </p>

        {/* RISK REVERSAL & TRUST */}
        <div className={styles.riskReversal}>
          <div className={styles.riskItem}>
            <ShieldCheck size={30} className={styles.riskIcon} />
            <div>
              <h4>100% Risk-Free Guarantee</h4>
              <p>Not happy with the direction? I'll refund you. No questions.</p>
            </div>
          </div>
          <div className={styles.riskItem}>
            <Timer size={30} className={styles.riskIcon} />
            <div>
              <h4>Fast 10-Day Delivery</h4>
              <p>Your business doesn't wait. Neither do I.</p>
            </div>
          </div>
        </div>
        {/* TRUST */}
        <div className={styles.trust}>
          {[
            "No hidden costs. 100% transparent pricing",
            "Free domain & hosting included",
            "Designed to convert visitors into clients",
            "Delivered within 7–14 days",
            "Proven structure used by real businesses",
          ].map((item) => (
            <div className={styles.trustItem} key={item}>
              <span className={styles.dot} />
              {item}
            </div>
          ))}
        </div>

      </section>

      <FAQ />
      <ContactMe />
    </>
  );
}