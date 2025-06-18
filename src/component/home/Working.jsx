import React from "react";

import { hero } from "../../constants/ImagePath.js"; // Importing hero image from constants
//import tick from "../../constants/ImagePath.js"; // Importing tick image from constants
function HowItWorks() {
  return (
    <main>
      <div className="bg-white md:h-screen flex flex-col-reverse md:flex-row-reverse gap-4 items-center justify-center px-8 py-4">
        {/* Left Content */}
        <div className="flex-1 flex flex-col h-full px-4 md:px-16 py-8">
          {/* Heading */}
          <div>
            <h1 className="text-3xl text-[#2F2F2F] font-inter font-medium tracking-tight">
              How It works
            </h1>
            <p className="text-[#585858] text-sm font-normal tracking-tight">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6 py-8">
            <div>
              <p className="text-xl font-medium">1. Lorem ipsum</p>
              <p className="text-[#585858] text-sm font-normal tracking-tight">
                Fill out our comprehensive form with your startup concept,
                target audience, core features, and design preferences.
              </p>
            </div>

            <div className="h-[1px] bg-gray-200 w-full" />

            <div>
              <p className="text-xl font-medium">2. Lorem ipsum</p>
              <p className="text-[#585858] text-sm font-normal tracking-tight">
                Our expert development team creates a professional, clickable
                demo based on your specifications within 24-72 hours.
              </p>
            </div>

            <div className="h-[1px] bg-gray-200 w-full" />

            <div>
              <p className="text-xl font-medium">3. Lorem ipsum</p>
              <p className="text-[#585858] text-sm font-normal tracking-tight font-inter">
                Receive your demo link, use it for pitching, testing, or
                fundraising. Request revisions as needed.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={hero}
            alt="How It Works Illustration"
            className="w-full h-[500px] object-cover rounded-3xl"
          />
        </div>
      </div>
    </main>
  );
}

export default HowItWorks;
