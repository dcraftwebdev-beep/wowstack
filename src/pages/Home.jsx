import Hero from "../Components/Sections/Hero"
import MyServices from "../Components/Sections/MyServices"
import GrowthStack from "../Components/Sections/GrowthStack"
import WhyChooseMe from "../Components/Sections/WhyChooseMe"
import RisePartner from "../Components/Sections/RisePartner"
import WhyWebsite from "../Components/Sections/WhyWebsite"
import Statement from "../Components/Sections/Statement"
import FeaturedProjects from "../Components/Sections/FeaturedProjects"
import Testimonials from "../Components/Sections/Testimonials"
import ContactMe from "../Components/Sections/ContactMe"
import CallToAction from "../Components/Sections/CallToAction"
import HorizontalText from "../Components/Sections/HorizontalText"
import ScrollPanels from "../Components/Sections/ScrollPanels"
import DesignExploration from "../Components/Sections/DesignExploration"
import { SITE_URL } from "../Components/Seo"
import PageSeo from "../Components/PageSeo"
import CinematicHero from "../Components/Sections/Newhero"

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wow Stack",
  url: SITE_URL + "/",
  logo: SITE_URL + "/dcraftmain.png",
  image: SITE_URL + "/dcraftmain.png",
  description:
    "Web design and website development company in India building fast, SEO-friendly, lead-generating websites with React, WordPress and eCommerce solutions.",
  areaServed: "India",
  telephone: "+91 6383091748",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/",
    "https://www.linkedin.com/",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wow Stack",
  url: SITE_URL + "/",
}

export default function Home() {
  return (
    <>
      <PageSeo path="/" jsonLd={[orgJsonLd, websiteJsonLd]} />
      
      <Hero />
      
      <HorizontalText />
      <MyServices />
      <GrowthStack />
      <WhyChooseMe />
      {/* <RisePartner /> */}
      <WhyWebsite />
      {/* <Statement /> */}
      <ScrollPanels />
      <FeaturedProjects />
      {/* <DesignExploration /> */}
      {/* <Testimonials /> */}
      {/* <ContactMe /> */}
      <CallToAction />
    </>
  )
}
