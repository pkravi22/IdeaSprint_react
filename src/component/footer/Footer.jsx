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
    title: "Support",
    links: [
      { name: "FAQ", hash: "faq" },
      { name: "Support & center", link: "/contact-support" },
      { name: "Contact", link: "/contact-support" },
      { name: "Status", link: "/dashboard" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      {
        name: "Twitter",
        icon: <CiTwitter size={20} className="text-white" />,
        external: "https://twitter.com",
      },
      {
        name: "LinkedIn",
        icon: <CiLinkedin size={20} className="text-white" />,
        external: "https://linkedin.com",
      },
      {
        name: "Pinterest",
        icon: <AiOutlinePinterest size={20} className="text-white" />,
        external: "https://pinterest.com",
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
        } else {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    }
  };

  return (
    <main className="bg-[#10151A] px-10 py-8 flex flex-col gap-12 md:gap-32">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-2">
          <div className="w-full sm:w-2/3 flex flex-col gap-4 pl-2 md:pl-8">
            <p className="text-orange-500 text-3xl font-medium">IdeaSprint.</p>
            <p className="text-white text-md">
              Building professional startup demos in 24–72 hours. Help founders
              validate ideas, pitch investors, and secure funding with clickable
              prototypes.
            </p>
          </div>
        </div>

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
                if (link.external) {
                  return (
                    <a
                      key={i}
                      href={link.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-normal text-sm text-white tracking-tight flex items-center gap-2 cursor-pointer text-left hover:underline"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <p>{link.name}</p>
                    </a>
                  );
                } else if (link.hash) {
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
                } else if (link.link) {
                  return (
                    <button
                      key={i}
                      onClick={() => navigate(link.link)}
                      className="font-normal text-sm text-white tracking-tight flex items-center gap-2 cursor-pointer text-left"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <p>{link.name}</p>
                    </button>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      onClick={() => handleSectionClick("top")}
                      className="font-normal cursor-pointer text-sm text-white tracking-tight flex items-center gap-2"
                    >
                      <p>{link.name || link}</p>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <p className="text-sm opacity-80 text-white">
          © {year} IdeaSprint. All rights reserved.
        </p>
        <div className="flex gap-4">
          <p className="text-sm opacity-80 text-white cursor-pointer hover:underline">
            Privacy Policy
          </p>
          <p className="text-sm opacity-80 text-white cursor-pointer hover:underline">
            Terms & Conditions
          </p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
