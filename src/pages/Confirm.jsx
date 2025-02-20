import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmAirtime = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirmAirtime = async () => {
    if (!phone) {
      setError("Please enter your phone number!");
      return;
    }

    // console.log(" Sending confirmation for phone:", phone); 

    try {
      const response = await fetch("https://airtime-to-cash-backend.onrender.com/api/confirm-airtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log("Response from server:", data); 
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to confirm airtime.");
      }

      alert(data.message);
      navigate("/enter-bank-details");
    } catch (error) {
      console.error("Error confirming airtime:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Confirm Airtime</h2>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleConfirmAirtime}
          className="w-full bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700"
        >
          Confirm Airtime Sent
        </button>
      </div>
    </div>
  );
};

export default ConfirmAirtime;
