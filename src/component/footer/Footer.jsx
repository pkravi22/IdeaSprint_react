import React from "react";

const footerLinks = [
  {
    title: "Product",
    links: ["Pricing", "Example", "Api", "Documentation"],
  },
  {
    title: "Product",
    links: ["FAQ", "Support & center", "Contact", "Status"],
  },
  {
    title: "Follow Us",
    links: ["Instagram", "Facebook", "Twitter"],
  },
];

const Footer = () => {
  return (
    <main className="bg-[#10151A] px-10 py-8 flex flex-col gap-12 md:gap-32">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Section */}
        <div className="flex-2">
          <div className="w-1/2">
            <p className="text-orange-500 text-xl font-medium">IdeaSprint.</p>
            <p className="text-white text-sm">
              Building professional startup demos in 24-72 hours. Help founders
              validate ideas, pitch investors, and secure funding with clickable
              prototypes.
            </p>
          </div>
        </div>

        {/* Right Section: Navigation */}
        <div className="flex-3 flex">
          {footerLinks.map((section, index) => (
            <div key={index} className="flex-1 flex flex-col gap-2">
              <h1 className="font-medium text-sm text-[#FF9C56] tracking-tight pb-2">
                {section.title}
              </h1>
              {section.links.map((link, i) => (
                <p
                  key={i}
                  className="font-normal text-sm text-white tracking-tight"
                >
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <p className="text-sm opacity-80 text-white">
          Copyright © 2020. IdeaSprint. All rights reserved.
        </p>
        <div className="flex gap-4">
          <p className="text-sm opacity-80 text-white">Privacy Policy</p>
          <p className="text-sm opacity-80 text-white">Terms & Conditions</p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
