import React from "react";

import { mind, bulbColored, rocketColored } from "../../constants/ImagePath.js"; // Importing images from constants
import { useNavigate } from "react-router";

function Steps() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-10 py-20 justify-center items-center text-center">
      {/* Heading Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-[#2F2F2F] font-inter font-medium tracking-tight">
            Bring Your Idea to Life in 3 Steps
          </h1>
          <p className="text-gray-400 text-md sm:text-lg">
            We take your idea and launch a clickable <br />
            prototype in 24–72 hours.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/demorequest")}
            className="bg-[#EB6505] px-4 py-2 rounded-3xl text-white font-medium"
          >
            Start Your Project Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3  gap-8 p-6">
        {/* Step 1 */}
        <div className="flex flex-col items-start justify-center">
          <img src={mind} alt="Step 1" className="w-12 h-12" />
          <div className="text-[#EB6505]">Step 1</div>
          <div className="text-3xl font-medium text-[#2F2F2F] tracking-tighter">
            Got an idea?
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-start justify-center">
          <img src={bulbColored} alt="Step 2" className="w-12 h-12" />
          <div className="text-[#EB6505]">Step 2</div>
          <div className="text-3xl font-medium text-[#2F2F2F] tracking-tighter">
            Share Your Vision
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start justify-start">
          <img src={rocketColored} alt="Step 3" className="w-12 h-12" />
          <div className="text-[#EB6505]">Step 3</div>
          <div className="text-3xl text-left  font-medium text-[#2F2F2F] tracking-tighter">
            We turn it into clickable prototype
          </div>
        </div>
      </div>
    </main>
  );
}

export default Steps;
