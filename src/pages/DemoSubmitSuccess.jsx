import React from "react";
import { CgCheck } from "react-icons/cg";

const SuccessMessage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <CgCheck size={40} className="bg-orange-500 rounded-lg text-white" />
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center">
        Submission Successful!
      </h1>
      <p className="text-gray-700 mt-3 text-center max-w-md">
        Your website requirement has been submitted successfully. <br />
        Now you can chill — we’ll make sure everything is taken care of in the
        best way.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessMessage;
