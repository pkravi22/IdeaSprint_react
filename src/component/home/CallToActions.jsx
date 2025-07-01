import React from "react";
import { airplane } from "../../constants/ImagePath.js"; // Importing airplane image from constants
const CallToAction = () => {
  return (
    <main className="px-4 sm:px-8 py-8">
      <div className="relative max-w-[1300px] bg-[#EB6505] min-h-48 w-full rounded-3xl">
        {/* Left Content */}
        <div className="w-full md:w-1/2  px-4 md:px-14 py-8 text-white flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-medium font-inter tracking-tight">
              Ready to Bring Your <br /> Idea to Life?
            </p>
            <p className="tracking-tight opacity-80">
              Join hundreds of founders <br />
              who've successfully launched their demos with <br />
              IdeaSprint
            </p>
          </div>
          <div>
            <button className="bg-white text-[#EB6505] text-sm font-medium px-4 py-1 rounded-3xl">
              Start My Demo Now
            </button>
          </div>
        </div>

        {/* Airplane Image */}
        <div className="absolute -top-8 right-0 hidden md:block">
          <img src={airplane} alt="airplane" className="w-[800px] h-[300px]" />
        </div>
      </div>
    </main>
  );
};

export default CallToAction;
