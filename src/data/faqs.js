// Single source of truth for FAQ content — rendered by <FAQ /> and emitted as
// FAQPage structured data (rich results) via <Seo />.
export const FAQS = [
  { q: "Do I fully own my website?", a: "100%. Once it's live, the website, domain and all files are yours — no monthly lock-in and no dependency on us to keep it running." },
  { q: "Is there any hidden or setup fee?", a: "None. The price you see is the price you pay. Domain, hosting, SSL and everything listed in your plan is included." },
  { q: "How fast will my website be ready?", a: "Starter goes live in about 7 days, Growth in 10–12 days, and Pro within 2–3 weeks depending on scope." },
  { q: "Will it bring me actual leads?", a: "Yes — every site is built with a WhatsApp chat button, enquiry forms and clear calls-to-action so visitors turn into real enquiries, not just traffic." },
  { q: "Can I get a WhatsApp enquiry button?", a: "Yes — a free click-to-chat WhatsApp button is included in every plan, and enquiries land in your email instantly. Full WhatsApp automation (auto-replies, lead follow-up) needs the WhatsApp Business API, which we set up for you but is billed separately by the provider." },
  { q: "Do I need any technical knowledge?", a: "Not at all. We handle everything end-to-end, and Growth & Pro come with a simple dashboard so you can edit text and images yourself." },
  { q: "What if I'm not happy with the design?", a: "You're covered by our 100% risk-free guarantee. You get revision rounds during the build, and if we can't get the direction right, you get a refund." },
  { q: "Can I pay in installments?", a: "Yes. We accept UPI, cards, net banking and PayPal, and offer flexible milestone-based payments for Growth and Pro plans." },
  { q: "Will I show up on Google?", a: "Yes. Every website includes on-page SEO and Google Business Profile setup so customers can find you on Google Search and Maps." },
  { q: "Can I upgrade my plan later?", a: "Anytime. You only pay the difference — your existing site and content carry straight over to the higher plan." },
  { q: "Do you provide domain and hosting?", a: "Yes. Domain, fast hosting and SSL security are included free for the first year." },
  { q: "What happens after launch — is there support?", a: "Every plan includes post-launch support (30 days on Growth, 90 days on Pro), plus optional low-cost maintenance if you want us to keep managing it." },
];

// FAQPage JSON-LD for structured data / Google rich results.
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
