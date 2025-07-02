import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useUser } from "../context/userContext";
import { FaSpinner } from "react-icons/fa";

const Payment = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const state = location.state || {};
  console.log(state);
  const {
    amount = 0,
    projectName = "",
    plan = "",
    demoRequestId = "",
    customerEmail = "",
    customerName = "",
  } = state;

  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentError("");

    try {
      if (!demoRequestId || !amount || !customerEmail) {
        throw new Error("Missing required payment information");
      }

      const Token = localStorage.getItem("token");
      console.log(Token);
      if (!Token) {
        throw new Error("Authentication Token not found");
      }

      const amountInSmallestUnit = Math.round(amount * 100);

      const backendUrl = "https://ideasprint-backend.onrender.com";

      const response = await axios.post(
        `${backendUrl}/api/transactions/checkout`,
        {
          amount: amount,
          currency: "usd",
          receiptEmail: customerEmail,
          demoSchemaId: demoRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error("Stripe checkout URL not received");
      }
    } catch (error) {
      console.error("Payment session creation failed:", error);
      setPaymentError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create payment session"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!state || Object.keys(state).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p>Redirecting to demo request form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Complete Your Payment
        </h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Project:</span>
              <span className="font-medium">{projectName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-sm">
                {demoRequestId || "Pending"}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="text-xl font-bold text-[#EB6505]">
                ${amount}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Name:</span> {customerName}
            </p>
            <p>
              <span className="text-gray-600">Email:</span> {customerEmail}
            </p>
          </div>
        </div>

        {paymentError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {paymentError}
            <button
              onClick={() => window.location.reload()}
              className="ml-2 text-[#EB6505] underline"
            >
              Try again
            </button>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className={`w-full py-3 flex items-center justify-center ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#EB6505] hover:bg-[#d45c04] text-white"
          } font-medium rounded-lg transition-colors`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            "Continue to Payment"
          )}
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          You'll be redirected to our secure payment gateway
        </p>
      </div>
    </div>
  );
};

export default Payment;
