import React from "react";
import { profile2, profile3, colon } from "../../constants/ImagePath.js"; // Importing images from constants
const testimonials = [
  {
    id: 1,
    feedback:
      "IdeaSprint delivered our MVP demo in 48 hours. The quality was outstanding and helped us secure our seed round of $500K. Highly recommended!",
    name: "Sarah Chen",
    title: "Founder, EcoTrack",
    image: profile2,
  },
  {
    id: 2,
    feedback:
      "The demo was so polished that investors thought we had a working product. It perfectly captured our vision and saved us months of development time.",
    name: "Marcus Rodriguez",
    title: "CEO, FinanceFlow",
    image: profile3,
  },
  {
    id: 3,
    feedback:
      "Amazing attention to detail and fast turnaround. The demo helped us validate our idea with early users before committing to full development.",
    name: "Amanda Foster",
    title: "CEO, HealthTech",
    image: profile2,
  },
];

const FounderTestimonials = () => {
  return (
    <main className="px-8 py-4 sm:py-18 flex flex-col justify-center items-center gap-8">
      <div className="py-4 text-center">
        <h1 className="text-4xl tracking-tighter font-inter font-medium text-[#2F2F2F] mb-4">
          What Founders say
        </h1>
        <p className="text-gray-600">
          Success stories from startup founders <br /> who got their demos built
        </p>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-8 sm:gap-16 px-4 sm:px-12">
        {testimonials.map(({ id, feedback, name, title, image }) => (
          <div key={id} className="flex flex-col gap-6">
            <p className="text-center font-medium tracking-tight flex">
              <img src={colon} alt="" className="h-6 w-6 mr-2" />
              {feedback}
            </p>
            <div className="flex justify-center items-center gap-2">
              <img
                src={image}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-medium">{name}</p>
                <p className="font-normal text-gray-300">{title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FounderTestimonials;
