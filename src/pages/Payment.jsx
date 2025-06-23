import React from "react";
import { useLocation, useNavigate } from "react-router";

const Payment = () => {
  return (
    <div className="flex justify-center items-center  shadow-md rounded-md h-screen ">
      <div className="w-[300px] h-[200px]   shadow-md flex justify-center items-center">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-md">
          Continue to payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
