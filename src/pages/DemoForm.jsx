import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthModal from "../modals/AuthModal";
import { MdOutlineCancel } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { useUser } from "../context/userContext";

async function uploadImageToCloudinary(file) {
  const cloudName = "diubxvdpu";
  const uploadPreset = "idea_sprint";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      const errorMsg = errorData.error?.message || "Unknown Cloudinary error";
      throw new Error(`Cloudinary upload failed: ${res.status} - ${errorMsg}`);
    }

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error(`Cloudinary upload error for ${file.name}:`, err);
    throw new Error(`Failed to upload ${file.name}: ${err.message}`);
  }
}
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 150,
    features: [
      "3-5 Interactive Screens",
      "Basic interaction",
      "Mobile responsive",
      "72-hour delivery",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 300,
    features: [
      "8-10 screens",
      "Advanced interactions",
      "Custom animations",
      "48-hour delivery",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 500,
    features: [
      "15+ screens",
      "Full user flow",
      "Premium animations",
      "24-hour delivery",
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

const DemoRequestForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const stored = localStorage.getItem("selectedPlan");
    if (stored) {
      return JSON.parse(stored);
    }

    return plans[0];
  });
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coreFeatures, setCoreFeatures] = useState([""]);
  const [featureError, setFeatureError] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState({});
  const [fileUploadErrors, setFileUploadErrors] = useState({});
  const [plan, setPlan] = useState(null);
  const { user } = useUser();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const featuresSectionRef = useRef(null);
  const username = JSON.parse(localStorage.getItem("user"));
  const email = localStorage.getItem("email");
  console.log("Username from localStorage:", username, email);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/authpage");
    }
  }, [navigate]);
  console.log("selectedPlan:", selectedPlan);

  //const { username, email } = user;
  const [formData, setFormData] = useState({
    Fullname: username,
    Email: email,
    ProjectName: "",
    ShortDescription: "",
    TargetAudience: "",
    DesignPreferences: "",
    Purpose: "",
    ShortDescriptionOfIdea: "",
    TotalMoney: "",
    Plan: "",
  });

  const purposeOptions = [
    { value: "fundraising", label: "Fundraising" },
    { value: "user-testing", label: "User Testing" },
    { value: "pitch", label: "Pitch Presentation" },
    { value: "development", label: "Development Reference" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      setErrorMessage("Some files exceed 10MB limit and were not added");
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    setFileUploadErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fileName];
      return newErrors;
    });
  };

  const addFeature = () => {
    if (coreFeatures.length < 5) {
      setCoreFeatures([...coreFeatures, ""]);
      setFeatureError("");
    } else {
      setFeatureError("Maximum 5 features allowed");
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...coreFeatures];
    updatedFeatures[index] = value;
    setCoreFeatures(updatedFeatures);
  };

  const removeFeature = (index) => {
    if (coreFeatures.length > 1) {
      const updatedFeatures = [...coreFeatures];
      updatedFeatures.splice(index, 1);
      setCoreFeatures(updatedFeatures);
    }
  };

  const validateForm = () => {
    if (!formData.Fullname.trim()) {
      setErrorMessage("Full name is required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      setErrorMessage("Valid email is required");
      return false;
    }

    if (!formData.ProjectName.trim()) {
      setErrorMessage("Project name is required");
      return false;
    }

    if (!formData.ShortDescription.trim()) {
      setErrorMessage("Short description is required");
      return false;
    }

    if (!formData.TargetAudience.trim()) {
      setErrorMessage("Target audience is required");
      return false;
    }

    if (!formData.Purpose) {
      setErrorMessage("Purpose is required");
      return false;
    }

    if (!formData.ShortDescriptionOfIdea.trim()) {
      setErrorMessage("Detailed description is required");
      return false;
    }

    const validFeatures = coreFeatures.filter((f) => f.trim() !== "");
    if (validFeatures.length < 3) {
      setFeatureError("At least 3 core features are required");

      if (featuresSectionRef.current) {
        featuresSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Add visual highlight
        featuresSectionRef.current.classList.add(
          "border-orange-500",
          "bg-orange-50"
        );
        setTimeout(() => {
          if (featuresSectionRef.current) {
            featuresSectionRef.current.classList.remove(
              "border-orange-500",
              "bg-orange-50"
            );
          }
        }, 3000);
      }

      return false;
    }

    if (!selectedPlan) {
      setErrorMessage("Please select a plan");
      return false;
    }

    return true;
  };

  const uploadFilesToCloudinary = async () => {
    const fileUrls = [];
    setFileUploadErrors({});

    for (const file of files) {
      try {
        const validFileTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
        ];
        if (!validFileTypes.includes(file.type)) {
          throw new Error(`Unsupported file type: ${file.type}`);
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error("File size exceeds 10MB limit");
        }

        setFileUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: "uploading", progress: 0 },
        }));

        const url = await uploadImageToCloudinary(file);
        fileUrls.push(url);

        setFileUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: "completed", progress: 100 },
        }));
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
        setFileUploadErrors((prev) => ({
          ...prev,
          [file.name]: err.message || "Upload failed",
        }));
        setFileUploadProgress((prev) => ({
          ...prev,
          [file.name]: { status: "error", progress: 0 },
        }));
        throw new Error(`File upload failed: ${file.name}`);
      }
    }

    return fileUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFeatureError("");
    setFileUploadErrors({});
    console.log(e);
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

    const plan = plans.find((p) => p.id === selectedPlan.id);
    if (!plan) {
      setErrorMessage("Please select a plan");
      setIsSubmitting(false);
      return;
    }

    try {
      let fileUrls = [];
      if (files.length > 0) {
        fileUrls = await uploadFilesToCloudinary();
      }

      const data = {
        Fullname: formData.Fullname,
        Email: formData.Email,
        ProjectName: formData.ProjectName,
        ShortDescription: formData.ShortDescription,
        TargetAudience: formData.TargetAudience,
        DesignPreferences: formData.DesignPreferences,
        Purpose: formData.Purpose,
        ShortDescriptionOfIdea: formData.ShortDescriptionOfIdea,
        coreFeatures: coreFeatures.filter((f) => f.trim() !== ""),
        TotalMoney: String(plan.price),
        Plan: plan.name,
        files: fileUrls.length > 0 ? fileUrls[0] : "",
      };

      const res = await axios.post(
        "https://ideasprint-backend.onrender.com/api/demo-schemas",
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/payment", {
        state: {
          amount: plan.price,
          projectName: formData.ProjectName,
          plan: plan.name,
          demoRequestId: res.data.data.id,
          customerEmail: formData.Email,
          customerName: formData.Fullname,
        },
      });
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );

      if (err.message.includes("File upload failed")) {
        setErrorMessage(
          "Some files failed to upload. Please check and try again."
        );
      } else if (err.response?.data?.error?.name === "ValidationError") {
        const errors = err.response.data.error.details.errors;
        const errorMessages = errors
          .map((e) => `${e.path[0]}: ${e.message}`)
          .join("\n");
        setErrorMessage(`Validation failed:\n${errorMessages}`);
      } else {
        setErrorMessage(
          err.response?.data?.error?.message ||
            "Failed to submit form. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("Selected plan:", selectedPlan);
  const selectedPlanObject = plans.find((p) => p.id === selectedPlan.id);
  console.log(selectedPlanObject);
  const totalPrice = selectedPlanObject ? selectedPlanObject.price : 0;
  console.log("Total Price:", totalPrice);

  return (
    <div className="min-h-screen bg-white font-sans relative">
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
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Full Name *
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
                  Email *
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

          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Project Details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2F2F2F] text-sm sm:text-base">
                  Project/Startup Name *
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
                  Short Description *
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
                  Detailed Description *
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
                  Target Audience *
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

          <section
            ref={featuresSectionRef}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 transition-all duration-300"
          >
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Core Features (3-5 Required)
            </h2>
            <div className="flex flex-col gap-3">
              {coreFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                    type="text"
                    placeholder={`Feature ${index + 1}${index < 3 ? " *" : ""}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    required={index < 3}
                  />
                  <button
                    type="button"
                    className={`text-red-500 hover:text-red-700 p-2 ${
                      coreFeatures.length <= 3
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => removeFeature(index)}
                    disabled={coreFeatures.length <= 3}
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
                </div>
              ))}

              {featureError && (
                <div className="text-red-500 text-sm mt-1">{featureError}</div>
              )}

              <button
                type="button"
                className={`w-full text-center py-2.5 rounded-xl text-sm sm:text-base font-medium ${
                  coreFeatures.length >= 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#EB6505] text-white hover:bg-[#d45c04]"
                }`}
                onClick={addFeature}
                disabled={coreFeatures.length >= 5}
              >
                {coreFeatures.length >= 5
                  ? "Maximum 5 features"
                  : "Add Feature"}
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Design References
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex-col gap-2 border border-gray-300 rounded-md text-gray-500 flex justify-center items-center p-6 text-center">
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

                <label className="cursor-pointer border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg px-6 py-2 mt-3 text-sm sm:text-base">
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    multiple
                  />
                </label>

                <p className="text-gray-400 text-xs mt-2">
                  Maximum file size: 10MB per file
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Files:
                  </h3>
                  <ul className="text-sm text-gray-600 flex flex-col gap-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                      >
                        <CiFileOn className="text-gray-500 flex-shrink-0" />
                        <span className="truncate flex-grow">{file.name}</span>

                        {fileUploadProgress[file.name]?.status ===
                          "uploading" && (
                          <div className="flex items-center text-xs text-blue-500">
                            <svg
                              className="animate-spin -ml-1 mr-1 h-4 w-4 text-blue-500"
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
                            Uploading...
                          </div>
                        )}

                        {fileUploadProgress[file.name]?.status ===
                          "completed" && (
                          <span className="text-xs text-green-500">
                            ✓ Uploaded
                          </span>
                        )}

                        {fileUploadErrors[file.name] && (
                          <span className="text-xs text-red-500">
                            {fileUploadErrors[file.name]}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeFile(file.name)}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label={`Remove file ${file.name}`}
                        >
                          <MdOutlineCancel />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Purpose
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Purpose"
                  className="font-medium text-[#2F2F2F] text-sm sm:text-base"
                >
                  What will you use this demo for? *
                </label>
                <select
                  name="Purpose"
                  value={formData.Purpose}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-gray-600 w-full px-4 py-3 text-sm sm:text-base"
                  required
                >
                  <option value="">Select purpose</option>
                  {purposeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-[#EB6505] text-lg sm:text-xl font-semibold uppercase mb-4">
              Plan Selection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPlan.id === plan.id
                      ? "border-2 border-[#EB6505] bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  onClick={() => setSelectedPlan(plan)}
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
                  disabled={isSubmitting}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
