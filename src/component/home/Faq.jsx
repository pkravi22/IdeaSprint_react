import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How quickly can you deliver my demo?",
    answer:
      "Our turnaround time ranges from 24–72 hours depending on your selected plan. Premium and Investor Pack orders get priority delivery in 24–48 hours.",
  },
  {
    question: "What's included in the demo?",
    answer:
      "Your demo includes a clickable prototype, high-fidelity UI, and tailored user flows based on your input.",
  },
  {
    question: "Can I request changes after delivery?",
    answer:
      "Yes, we offer 2 rounds of revisions for every demo to make sure it aligns with your expectations.",
  },
  {
    question: "Is my idea protected?",
    answer:
      "Absolutely. We never share your concept, and we can sign an NDA upon request.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <main className="px-10 py-8 flex flex-col md:flex-row justify-center bg-[#F5F5F5] items-start gap-10">
      <div className="flex-1 flex flex-col gap-4">
        <p className="font-inter font-medium  text-4xl sm:text-6xl tracking-tighter text-[#2F2F2F]">
          Frequently <br /> Asked Question
        </p>
        <p className=" tracking-tighter  text-[#585858]">
          Everything you need to know <br /> about our demo building service
        </p>
      </div>

      <div className="flex-2 flex flex-col gap-4 w-full">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`bg-white rounded-xl cursor-pointer transition-all duration-300 ${
                isOpen ? "text-orange-500" : "text-[#2F2F2F]"
              } hover:text-orange-500  p-2 sm:p-4 flex flex-col gap-2`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
                <p className="font-inter font-bold text-md tracking-tight">
                  {faq.question}
                </p>
              </div>

              {isOpen && <p className="text-[#585858]">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default FAQ;
