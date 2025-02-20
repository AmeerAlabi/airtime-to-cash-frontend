import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EnterBankDetails = () => {
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    if (storedPhone) {
      setPhone(storedPhone);
      fetchTransaction(storedPhone);
    } else {
      setError("No phone number found. Please start over.");
    }
  }, []);

  const fetchTransaction = async (phoneNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transaction-status/${phoneNumber}`);
      const data = await response.json();
      if (response.ok) {
        setTransaction(data);
      } else {
        setError("No transaction found. Please start over.");
      }
    } catch (error) {
      setError("Error fetching transaction.");
    }
  };

  const handleSubmit = async () => {
    if (!phone || !bankName || !accountNumber) {
      setError("All fields are required!");
      return;
    }
    if (phone.length !== 11 || !/^[0-9]+$/.test(phone)) {
      setError("Phone number must be exactly 11 digits and contain only numbers!");
      return;
    }
    if (accountNumber.length !== 10 || !/^[0-9]+$/.test(accountNumber)) {
      setError("Account number must be exactly 10 digits and contain only numbers!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/enter-bank-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, bankName, accountNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process payment.");
      }

      alert(data.message);
      navigate("/success");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Bank Details</h2>
        {transaction ? (
          <div className="mb-4 p-4 bg-gray-200 rounded-lg">
            <p className="text-lg font-semibold">Network: {transaction.network}</p>
            <p className="text-lg font-semibold">Amount: {transaction.amount}</p>
            <p className="text-lg font-semibold">Cash Value: ₦{transaction.cashValue}</p>
          </div>
        ) : (
          <p className="text-red-500 text-center">No transaction found.</p>
        )}
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-2 mt-4 rounded hover:bg-green-700"
        >
          {loading ? "Processing..." : "Submit Bank Details"}
        </button>
      </div>
    </div>
  );
};

export default EnterBankDetails;
