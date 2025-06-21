import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const DemoRequestForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectName: "",
    shortDescriptionOfIdea: "",
    targetAudience: "",
    designPreferences: "",
    purpose: "",
    coreFeaturesList: [""],
    coreFeatures: {
      auth: false,
      payment: false,
      aiSuggestions: false,
    },
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
    setErrorMessage(""); // Clear error on input change
  };
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log("selectedFiles ", selectedFiles);
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

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.coreFeaturesList];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      coreFeaturesList: newFeatures,
    });
    setErrorMessage(""); // Clear error on input change
  };

  const addFeature = () => {
    if (formData.coreFeaturesList.length < 5) {
      setFormData({
        ...formData,
        coreFeaturesList: [...formData.coreFeaturesList, ""],
      });
    }
  };

  const removeFeature = (index) => {
    if (formData.coreFeaturesList.length > 1) {
      const newFeatures = formData.coreFeaturesList.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        coreFeaturesList: newFeatures,
      });
    }
  };

  const validateForm = () => {
    if (!selectedPlan) {
      setErrorMessage("Please select a plan");
      return false;
    }

    if (formData.coreFeaturesList.filter((f) => f.trim()).length < 3) {
      setErrorMessage("Please add at least 3 core features");
      return false;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.projectName ||
      !formData.shortDescriptionOfIdea ||
      !formData.targetAudience ||
      !formData.purpose
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
      setErrorMessage("Authentication required. Please log in.");
      setIsSubmitting(false);
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) {
      setErrorMessage("Please select a plan");
      setIsSubmitting(false);
      return;
    }

    // Align payload with backend structure
    // Try this if the above doesn't work:
    const payload = {
      Fullname: formData.fullName,
      Email: formData.email,
      ProjectName: formData.projectName,
      ShortDescriptionOfIdea: formData.shortDescriptionOfIdea, // Use for idea description
      TargetAudience: formData.targetAudience,
      DesignPreferences: formData.designPreferences,
      Purpose: formData.purpose,

      // Handle core features properly
      CoreFeaturesList: formData.coreFeaturesList.filter(
        (feature) => feature.trim() !== ""
      ),

      // Send predefined features as separate fields
      AuthFeature: formData.coreFeatures.auth,
      PaymentFeature: formData.coreFeatures.payment,
      AISuggestionsFeature: formData.coreFeatures.aiSuggestions,

      TotalMoney: String(plan.price),
      Plan: plan.name,
    };

    // Debugging logs
    console.log("Token:", token);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const res = await axios.post(
        "https://ideasprint-backend.onrender.com/api/demo-schemas",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form submitted successfully:", res.data);
      //navigate("/thank-you");
    } catch (err) {
      // ... existing error handling ..
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const selectedPlanObject = plans.find((p) => p.id === selectedPlan);
  const totalPrice = selectedPlanObject ? selectedPlanObject.price : 0;

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="flex flex-col py-6 sm:py-8 mx-auto max-w-4xl w-full px-4 sm:px-6">
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
                <label
                  htmlFor="fullName"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
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
                <label
                  htmlFor="projectName"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Project/Startup Name
                </label>
                <input
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="Enter your project name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="shortDescriptionOfIdea"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Short Description of the Idea
                </label>
                <input
                  name="shortDescriptionOfIdea"
                  value={formData.shortDescriptionOfIdea}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 text-sm sm:text-base"
                  type="text"
                  placeholder="Describe your startup idea in a few sentences"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="targetAudience"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Target Audience
                </label>
                <textarea
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 px-4 py-3 h-24 text-sm sm:text-base"
                  placeholder="Who is your target audience?"
                  required
                ></textarea>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Core Features (3-5 Required)
            </h2>
            <div className="flex flex-col gap-3">
              {formData.coreFeaturesList.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className={`w-full text-center py-2.5 rounded-xl text-sm sm:text-base font-medium ${
                  formData.coreFeaturesList.length >= 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#EB6505] text-white hover:bg-[#d45c04]"
                }`}
                onClick={addFeature}
                disabled={formData.coreFeaturesList.length >= 5}
              >
                {formData.coreFeaturesList.length >= 5
                  ? "Maximum 5 features"
                  : "Add Feature"}
              </button>
            </div>
          </section>

          {/* Predefined Features */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Predefined Features
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

          {/* Design References */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Design References
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 border border-gray-300 rounded-md text-gray-500 flex justify-center items-center p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-500 text-sm sm:text-base">
                  Upload logos, sketches, or design references
                </p>
                <label className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg px-6 py-2 mt-3 text-sm sm:text-base cursor-pointer">
                  Choose Files
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                </label>

                <p className="text-gray-400 text-xs mt-2">
                  Maximum file size: 10MB
                </p>
                {files.length > 0 && (
                  <div className="mt-4 text-gray-600 text-sm text-left w-full">
                    <p className="font-medium mb-2">Selected Files:</p>
                    <ul className="list-disc list-inside">
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Design Preferences */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Design Preferences
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="designPreferences"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  Preferred UI Look (Optional)
                </label>
                <textarea
                  name="designPreferences"
                  value={formData.designPreferences}
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
                <label
                  htmlFor="purpose"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  What will you use this demo for?
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="user-testing">User Testing</option>
                  <option value="pitch">Pitch Presentation</option>
                  <option value="development">Development Reference</option>
                </select>
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
    </div>
  );
};

export default DemoRequestForm;