import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiTwitter, CiLinkedin } from "react-icons/ci";
import { AiOutlinePinterest } from "react-icons/ai";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Pricing", hash: "pricing" },
      { name: "Example" },
      { name: "Api" },
      { name: "Documentation" },
    ],
  },
  {
    title: "Product",
    links: [
      { name: "FAQ", hash: "faq" },
      { name: "Support & center" },
      { name: "Contact" },
      { name: "Status" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "Twitter", icon: <CiTwitter size={20} className="text-white" /> },
      {
        name: "Linkedin",
        icon: <CiLinkedin size={20} className="text-white" />,
      },
      {
        name: "Pinterest",
        icon: <AiOutlinePinterest size={20} className="text-white" />,
      },
    ],
  },
];

const year = new Date().getFullYear();

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (hash) => {
    if (location.pathname === "/") {
      if (hash === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      } else {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate("/");
      setTimeout(() => {
        if (hash === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        } else {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100); // give DOM time to render
    }
  };

  return (
    <main className="bg-[#10151A] px-10 py-8 flex flex-col gap-12 md:gap-32">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Section */}
        <div className="flex-2">
          <div className="w-full sm:w-2/3 flex flex-col gap-4 pl-2 md:pl-8">
            <p className="text-orange-500 text-3xl font-medium">IdeaSprint.</p>
            <p className="text-white text-md">
              Building professional startup demos in 24-72 hours. Help founders
              validate ideas, pitch investors, and secure funding with clickable
              prototypes.
            </p>
          </div>
        </div>

        {/* Right Section: Navigation */}
        <div className="flex-3 flex flex-wrap gap-4">
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col gap-2 min-w-[120px]"
            >
              <h1 className="font-medium text-sm text-[#FF9C56] pb-2">
                {section.title}
              </h1>
              {section.links.map((link, i) => {
                if (typeof link === "string" || !link.hash) {
                  return (
                    <div
                      onClick={() => handleSectionClick("top")}
                      key={i}
                      className="font-normal cursor-pointer text-sm text-white tracking-tight flex items-center gap-2"
                    >
                      <p>{link.name || link}</p>
                    </div>
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSectionClick(link.hash)}
                    className="font-normal text-sm text-white tracking-tight flex items-center gap-2 cursor-pointer text-left"
                  >
                    {link.icon && <span>{link.icon}</span>}
                    <p>{link.name}</p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <p className="text-sm opacity-80 text-white">
          Copyright © {year}. IdeaSprint. All rights reserved.
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
