import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Verifying...");
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [showHelp, setShowHelp] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `https://ideasprint-backend.onrender.com/api/transactions/confirm?session_id=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStatus("✅ Payment successful! Thank you.");
          setReceiptUrl(res.data.receiptUrl);
        } else {
          setStatus("❌ Payment verification failed.");
        }
      } catch (error) {
        setStatus("⚠️ Error verifying payment.");
        console.error(error);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, token]);

  const handleCopy = () => {
    if (receiptUrl) {
      navigator.clipboard.writeText(receiptUrl);
      alert("✅ Receipt link copied to clipboard!");
    }
  };

  const handleDownloadHelp = () => {
    // setShowHelp(true); // show instructions
    setTimeout(() => {
      window.open(receiptUrl, "_blank"); // open receipt
    }, 1000); // delay slightly for UX clarity
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
      <div className="bg-white p-8 shadow-lg rounded-md max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-green-700 mb-4">{status}</h2>

        {receiptUrl && (
          <>
            <p className="text-gray-600 mb-4">
              Your payment receipt is ready. You can view or download it below.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.open(receiptUrl, "_blank")}
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded"
              >
                View Receipt
              </button>

              <button
                onClick={handleDownloadHelp}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Download as PDF
              </button>

              <button
                onClick={handleCopy}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Copy Receipt Link
              </button>
            </div>
          </>
        )}

        {/* Simple Help Modal */}
        {showHelp && (
          <div className="mt-6 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative">
            <strong className="font-bold">Note:</strong>
            <span className="block sm:inline ml-1">
              After the receipt opens, press <b>Ctrl + P</b> (or <b>Cmd + P</b>{" "}
              on Mac), then choose <b>"Save as PDF"</b> to download it.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
