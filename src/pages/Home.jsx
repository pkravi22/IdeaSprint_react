import React from "react";
import Hero from "../component/home/Hero";
import Steps from "../component/home/Step";
import HowItWorks from "../component/home/Working";
import Plans from "../component/home/Plans";
import FounderTestimonials from "../component/home/Testimonials";
import FAQ from "../component/home/Faq";
import CallToAction from "../component/home/CallToActions";
import Footer from "../component/footer/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <Steps />
      <div id="working">
        <HowItWorks />
      </div>
      <div id="pricing">
        <Plans />
      </div>
      <div id="testimonials">
        <FounderTestimonials />
      </div>

      <div id="faq">
        <FAQ />
      </div>

      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
