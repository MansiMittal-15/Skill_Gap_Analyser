import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import LandingPageContent from "./LandingPageContent";
import FAQs from "./FAQs";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
    <div className="font-semibold">
      <Header />
      <HeroSection />
      <LandingPageContent />
      <FAQs />
      <Footer />
    </div>
    </>
  );
};

export default Home;
