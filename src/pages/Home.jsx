import React, { useEffect } from "react";
import Hero from "../component/home/Hero";
import Steps from "../component/home/Step";
import HowItWorks from "../component/home/Working";
import Plans from "../component/home/Plans";
import FounderTestimonials from "../component/home/Testimonials";
import FAQ from "../component/home/Faq";
import CallToAction from "../component/home/CallToActions";
import Footer from "../component/footer/Footer";
import { getUser } from "../services/Authservices";
import ProjectsShowcase from "../component/home/ProjectShowCase";

const Home = () => {
  const token = localStorage.getItem("token");
  console.log("Base URL", import.meta.env.VITE_BASE_URL);

  
  const fetchUser = async () => {
    try {
      const response = await getUser(token);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      // Handle error, e.g., redirect to login
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);
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
      <div id="projects">{/* <ProjectsShowcase /> */}</div>
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
