import React from "react";
import { tick } from "../../constants/ImagePath";

const plans = [
  {
    title: "Basic",
    price: "$150",
    duration: "/month",
    badge: null,
    category: "Perfect for early Validation",
    features: [
      "3-5 core screen",
      "Basic interactions",
      "Mobile responsive",
      "72-hour delivery",
    ],
  },
  {
    title: "Standard",
    price: "$300",
    duration: "/month",
    badge: null,
    category: "Great For user Testing",
    features: [
      "8-10 screens",
      "Advanced interactions",
      "Custom animations",
      "48-hour delivery",
    ],
  },
  {
    title: "Premium",
    price: "$500",
    duration: "/month",
    badge: "Most Popular",
    category: "Ideal for pitching",
    features: [
      "15+ screens",
      "Full user flow",
      "Premium animations",
      "24-hour delivery",
    ],
  },
  {
    title: "Investor Pack",
    price: "$750",
    duration: "/month",
    badge: null,
    category: "Perfect for fundraising",
    features: [
      "Everything in Premium",
      "Pitch deck integration",
      "Analytics dashboard",
      "Priority support",
    ],
  },
];

function Plans() {
  return (
    <main className="bg-gray-200">
      <div className="py-8 px-4 sm:px-8 flex flex-col justify-center items-center gap-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl tracking-tighter font-inter font-medium text-[#2F2F2F] mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600">
            Professional demos tailored to your <br />
            needs and budget
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center bg-white p-6 rounded-xl items-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-56 bg-white ${
                plan.title === "Premium" ? "h-80" : "h-72"
              } rounded-xl hover:bg-[#EB6505] active:bg-[#EB6505] flex flex-col gap-4 text-[#848199] hover:text-white active:text-white p-2`}
            >
              {plan.badge && (
                <div className="text-blue-500 text-[10px] font-medium border border-gray-300 w-20 bg-white px-2 py-1 rounded-full flex justify-end">
                  {plan.badge}
                </div>
              )}
              <div>
                <p className="text-2xl font-inter font-medium tracking-tighter text-black">
                  {plan.price}{" "}
                  <span className="text-gray-500">{plan.duration}</span>
                </p>
              </div>
              <div>
                <p className="text-xl text-black font-medium">{plan.title}</p>
                <p className="font-inter tracking-tight text-[15px]">
                  {plan.category}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {plan.features.map((feature, i) => (
                  <div className="flex items-center gap-2" key={i}>
                    <img
                      src={tick}
                      alt="check"
                      className="w-4 h-4 bg-orange-300 rounded-full p-1"
                    />
                    <p className="font-inter tracking-tight text-[15px]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-auto">
                <button className="px-6 py-1 rounded-3xl bg-orange-200 text-[#EB6505] hover:bg-white">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Plans;
