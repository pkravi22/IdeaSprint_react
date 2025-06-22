import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthModal from "../modals/AuthModal";

const DemoRequestForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Fullname: "",
    Email: "",
    ProjectName: "",
    ShortDescription: "",
    TargetAudience: "",
    DesignPreferences: "",
    Purpose: "",
    ShortDescriptionOfIdea: "",
    coreFeatures: {
      auth: false,
      payment: false,
      aiSuggestions: false,
    },
    TotalMoney: "",
    Plan: "",
  });

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 300,
      features: [
        "Money Back Guarantee",
        "3-5 Interactive Screens",
        "Basic UI Design",
        "1 Round of Revisions",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 400,
      features: [
        "Everything in Basic",
        "5-8 Interactive Screens",
        "Enhanced UI Design",
        "2 Rounds of Revisions",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 500,
      features: [
        "Everything in Standard",
        "8-12 Interactive Screens",
        "Custom UI Design",
        "3 Rounds of Revisions",
      ],
    },
    {
      id: "investor",
      name: "Investor Pack",
      price: 750,
      features: [
        "Everything in Premium",
        "Pitch deck integration",
        "Analytics Dashboard",
        "Priority support",
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleFeatureToggle = (feature) => {
    setFormData({
      ...formData,
      coreFeatures: {
        ...formData.coreFeatures,
        [feature]: !formData.coreFeatures[feature],
      },
    });
  };

  const validateForm = () => {
    if (!selectedPlan) {
      setErrorMessage("Please select a plan");
      return false;
    }

    if (
      !formData.Fullname ||
      !formData.Email ||
      !formData.ProjectName ||
      !formData.ShortDescription ||
      !formData.ShortDescriptionOfIdea ||
      !formData.TargetAudience ||
      !formData.Purpose
    ) {
      setErrorMessage("Please fill all required fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setIsModalOpen(true);
      setErrorMessage("Authentication required. Please log in.");
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) {
      setErrorMessage("Please select a plan");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      Fullname: formData.Fullname,
      Email: formData.Email,
      ProjectName: formData.ProjectName,
      ShortDescription: formData.ShortDescription,
      TargetAudience: formData.TargetAudience,
      DesignPreferences: formData.DesignPreferences,
      Purpose: formData.Purpose,
      ShortDescriptionOfIdea: formData.ShortDescriptionOfIdea,
      coreFeatures: {
        auth: formData.coreFeatures.auth,
        payment: formData.coreFeatures.payment,
        aiSuggestions: formData.coreFeatures.aiSuggestions,
      },
      TotalMoney: String(plan.price),
      Plan: plan.name,
    };

    try {
      const res = await axios.post(
        "https://ideasprint-backend.onrender.com/api/demo-schemas",
        { data: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", res.data);
      navigate("/thank-you");
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );

      if (err.response?.data?.error?.message?.includes("must be unique")) {
        setErrorMessage("This email is already registered");
      } else {
        setErrorMessage("Failed to submit form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPlanObject = plans.find((p) => p.id === selectedPlan);
  const totalPrice = selectedPlanObject ? selectedPlanObject.price : 0;

  return (
    <div className="min-h-screen bg-white font-sans relative">
      <main className="flex flex-col py-6 sm:py-8 mx-auto max-w-4xl w-full px-4 sm:px-6">
        {/* Header Section */}
        <section className="flex flex-col justify-center items-start mb-6">
          <button
            onClick={() => navigate("/home")}
            className="text-[#EB6505] hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#2F2F2F] font-medium mt-2 tracking-tight">
            Submit Your Demo Request
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Tell us about your startup idea and we'll build a professional demo
            in 24-72 hours
          </p>
        </section>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Contact Information */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Full Name
                </label>
                <input
                  name="Fullname"
                  value={formData.Fullname}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Email
                </label>
                <input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 text-sm sm:text-base"
                  type="email"
                  placeholder="john@gmail.com"
                  required
                />
              </div>
            </div>
          </section>

          {/* Project Details */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Project Details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Project/Startup Name
                </label>
                <input
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="Enter your project name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Short Description
                </label>
                <input
                  name="ShortDescription"
                  value={formData.ShortDescription}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="Brief description of your project"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Detailed Description
                </label>
                <textarea
                  name="ShortDescriptionOfIdea"
                  value={formData.ShortDescriptionOfIdea}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 h-24 text-sm sm:text-base"
                  placeholder="Detailed description of your startup idea"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Target Audience
                </label>
                <textarea
                  name="TargetAudience"
                  value={formData.TargetAudience}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 h-24 text-sm sm:text-base"
                  placeholder="Who is your target audience?"
                  required
                ></textarea>
              </div>
            </div>
          </section>

          {/* Predefined Features */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Core Features
            </h2>
            <div className="flex flex-col gap-3">
              {Object.entries(formData.coreFeatures).map(
                ([feature, checked]) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={feature}
                      checked={checked}
                      onChange={() => handleFeatureToggle(feature)}
                      className="h-4 w-4 text-[#EB6505] rounded focus:ring-[#EB6505]"
                    />
                    <label
                      htmlFor={feature}
                      className="ml-2 text-gray-700 capitalize"
                    >
                      {feature.replace(/([A-Z])/g, " $1")}
                    </label>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Design Preferences */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Design Preferences
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Preferred UI Look
                </label>
                <textarea
                  name="DesignPreferences"
                  value={formData.DesignPreferences}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 h-24 text-sm sm:text-base"
                  placeholder="Describe your preferred colors, styles or reference websites"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Purpose */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Purpose
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  What will you use this demo for?
                </label>
                <input
                  name="Purpose"
                  value={formData.Purpose}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  placeholder="Purpose of this demo"
                  required
                />
              </div>
            </div>
          </section>

          {/* Plan Selection */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Plan Selection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-2 border-[#EB6505] bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg sm:text-xl font-medium text-[#2F2F2F]">
                      {plan.name}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-[#2F2F2F]">
                      ${plan.price}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#EB6505] flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2">
              <div className="p-4 border border-gray-200 rounded-md flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="font-medium text-lg">Total: ${totalPrice}</p>
                  <p className="text-gray-500 text-sm sm:text-base mt-1">
                    You'll be redirected to secure payment after submission
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-[#EB6505] hover:bg-[#d45c04] rounded-3xl px-6 py-3 text-white font-medium text-base w-full sm:w-auto transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!selectedPlan || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Submit & Pay"
                  )}
                </button>
              </div>
            </div>
          </section>
        </form>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2023 IdeaSprint. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-[#EB6505]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#EB6505]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#EB6505]">
              Contact Us
            </a>
          </div>
        </footer>
      </main>

      {isModalOpen && (
        <div className=" w-full min-h-screen bg-white  absolute flex justify-center items-center top-0 ">
          <AuthModal
            errorMessage={errorMessage}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default DemoRequestForm;