// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Layout from "./routes/Layout";
import HowITtWork from "./pages/HowITtWork";
import Features from "./pages/Features";
import Services from "./pages/Services";


import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./Components/Loader/Loader";
import MyWorks from "./pages/MyWorks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CaseStudy from "./pages/CaseStudy";
import Dashboard from "./admin/AdminApp";

function App() {
  const [loading, setLoading] = useState(true);

  // AOS init
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out",
    });
  }, []);

  // Loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="how-it-works" element={<HowITtWork />} />
          <Route path="flow-and-features" element={<Features />} />
          <Route path="our-works" element={<MyWorks />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
