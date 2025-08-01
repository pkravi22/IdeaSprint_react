import React, { useEffect, useState } from "react";
import { tick } from "../../constants/ImagePath";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext";

function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allPlans, setAllPlans } = useUser();
  const planInLocalStorage = localStorage.getItem("allPlans");
  useEffect(() => {
    const planInLocalStorage = localStorage.getItem("allPlans");

    if (planInLocalStorage) {
      const parsedPlans = JSON.parse(planInLocalStorage);
      setPlans(parsedPlans);
      setAllPlans(parsedPlans);
      setIsLoading(false);
    } else {
      const fetchPlans = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "https://ideasprint-backend.onrender.com/api/plans"
          );

          const transformedPlans = response.data.data.map((plan) => ({
            id: plan.id,
            documentId: plan.documentId,
            title: plan.name,
            price: `$${plan.price}`,
            duration: "/month",
            badge: plan.name === "Premium" ? "Most Popular" : null,
            category: getCategory(plan.name),
            features: getFeatures(plan.name),
            backendData: {
              createdAt: plan.createdAt,
              currency: plan.currency,
              publishedAt: plan.publishedAt,
              updatedAt: plan.updatedAt,
            },
          }));

          setPlans(transformedPlans);
          setAllPlans(transformedPlans);
          localStorage.setItem("allPlans", JSON.stringify(transformedPlans));
        } catch (err) {
          console.error("Error fetching plans:", err);
          setError("Failed to load plans. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPlans();
    }
  }, []);

  // Helper functions to map plan names to UI details
  const getCategory = (planName) => {
    switch (planName) {
      case "Basic":
        return "Perfect for early Validation";
      case "Standard":
        return "Great For user Testing";
      case "Premium":
        return "Ideal for pitching";
      case "Investor Pack":
        return "Perfect for fundraising";
      default:
        return "";
    }
  };

  const getFeatures = (planName) => {
    switch (planName) {
      case "Basic":
        return [
          "3-5 core screen",
          "Basic interactions",
          "Mobile responsive",
          "72-hour delivery",
        ];
      case "Standard":
        return [
          "8-10 screens",
          "Advanced interactions",
          "Custom animations",
          "48-hour delivery",
        ];
      case "Premium":
        return [
          "15+ screens",
          "Full user flow",
          "Premium animations",
          "24-hour delivery",
        ];
      case "Investor Pack":
        return [
          "Everything in Premium",
          "Pitch deck integration",
          "Analytics dashboard",
          "Priority support",
        ];
      default:
        return [];
    }
  };

  const handleChoosePlan = (plan) => {
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        ...plan,
        backendId: plan.id,
        documentId: plan.documentId,
      })
    );
    navigate("/demorequest");
  };

  if (isLoading) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading plans...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-100">
      <div className="py-8 px-4 sm:px-8 flex flex-col justify-center items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tighter font-inter font-medium text-[#2F2F2F] mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-[18px]">
            Professional demos tailored to your <br />
            needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center bg-white p-2 sm:p-6 rounded-xl items-center gap-6">
          {plans.map((plan) => (
            <div
              key={plan.documentId || plan.id}
              onClick={() => handleChoosePlan(plan)}
              className={`w-56 bg-white ${
                plan.title === "Premium" ? "h-80" : "h-72"
              } rounded-xl hover:bg-[#EB6505] active:bg-[#EB6505] flex flex-col gap-4 text-[#848199] hover:text-white active:text-white p-2 cursor-pointer transition-colors duration-300`}
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
                <button
                  className="px-6 py-1 rounded-3xl bg-orange-200 text-[#EB6505] hover:bg-white transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoosePlan(plan);
                  }}
                >
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
