import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import LandingPageContent from "./LandingPageContent";
import FAQs from "./FAQs";
import Reviews from "./Reviews";
import Plans from "./Plans";
import Footer from "./Footer";
import Notification from "./Notification";

const Home = () => {
  return (
    <>
    <div className="font-semibold">
      <Notification/>
      <Header />
      <HeroSection />
      <LandingPageContent />
      <Reviews />
      <FAQs />
      {/* <Plans /> */}
      <Footer />
    </div>
    </>
  );
};

export default Home;
