import React, { useEffect } from "react";
import PageSeo from "../Components/PageSeo";
import AboutHero from "../Components/About/AboutHero";
import AboutSplits from "../Components/About/AboutSplits";
import AboutTeam from "../Components/About/AboutTeam";
import AboutRecognition from "../Components/About/AboutRecognition";
import AboutTools from "../Components/About/AboutTools";
import AboutCTA from "../Components/About/AboutCTA";
import FAQ from "../Components/Sections/FAQ";

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <PageSeo path="/about" />

      <AboutHero />
      <AboutSplits />
      {/* <AboutTeam />
      <AboutRecognition /> */}
      <AboutTools />
      <FAQ />
      <AboutCTA />
    </>
  );
}
