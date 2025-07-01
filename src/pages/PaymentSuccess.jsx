import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Verifying...");

  //   useEffect(() => {
  //     const verifyPayment = async () => {
  //       try {
  //         const res = await axios.get(
  //           `https://your-backend.com/api/transactions/verify?session_id=${sessionId}`
  //         );
  //         if (res.data.paymentStatus === "success") {
  //           setStatus("Payment successful! Thank you.");
  //         } else {
  //           setStatus("Payment verification failed.");
  //         }
  //       } catch (error) {
  //         setStatus("Error verifying payment.");
  //         console.error(error);
  //       }
  //     };

  //     if (sessionId) {
  //       verifyPayment();
  //     }
  //   }, [sessionId]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-green-50 
     "
    >
      <div className="shadow-md p-8 rounded-md">
        {" "}
        <h2 className="text-xl font-bold text-green-700">
          Payment successfully completed
        </h2>
      </div>
    </div>
  );
};

export default PaymentSuccess;
