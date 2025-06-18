import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { hero, tick } from "../../constants/ImagePath.js"; //

function Hero() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="bg-[#EB6505] md:min-h-screen flex flex-col md:flex-row gap-8 px-8 py-12">
        {/* Left Section */}
        <div className="flex-1 flex flex-col h-full justify-center">
          <h1 className="text-4xl md:text-7xl font-inter font-medium tracking-tighter text-white mb-4">
            Get Your <br />
            Startup demo <br />
            Built in{" "}
            <span className="text-gray-300 font-normal">
              <i>24-72 Hours</i>
            </span>
          </h1>

          <p className="text-lg text-white mb-8">
            Transform your startup idea into a clickable demo/MVP. Perfect for
            pitching investors, user testing, or fundraising. Professional
            development team ready to bring your vision to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <button
              onClick={() => navigate("/demorequest")}
              className="px-4 md:px-12 py-2 bg-white text-[#EB6505] rounded-full"
            >
              Start My Demo
            </button>
            <button className="px-4 md:px-12 py-2 text-white border border-white rounded-full">
              View Examples
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col text-white gap-2 pt-12">
            <div className="flex items-center gap-2">
              <img src={tick} alt="check" className="w-4 h-3" />
              <p>24-72 Hours delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={tick} alt="check" className="w-4 h-3" />
              <p>Professional Quality</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={tick} alt="check" className="w-4 h-3" />
              <p>Money Back Guarantee</p>
            </div>
          </div>
        </div>

        {/* Right Section - Hero Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={hero}
            alt="hero"
            className="w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-3xl"
          />
        </div>
      </div>
    </main>
  );
}

export default Hero;
