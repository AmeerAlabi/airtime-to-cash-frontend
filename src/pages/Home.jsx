import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const calculateCashValue = (network, amount) => {
    const rates = { mtn: 0.9, glo: 0.85, airtel: 0.88, "9mobile": 0.87 };
    return amount * (rates[network] || 0.8);
  };

  const generateRecipientNumber = () => {
    return "081" + Math.floor(10000000 + Math.random() * 90000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cashValue = calculateCashValue(network, amount);
    const recipientNumber = generateRecipientNumber();
    
    try {
      const res = await axios.post("https://airtime-to-cash-backend.onrender.com/api/initiate-transaction", {
        phone,
        network,
        amount,
        recipientNumber,
        cashValue,
      });
      localStorage.setItem("userPhone", phone);
      navigate("/transaction", { state: res.data });
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Airtime to Cash</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        >
          <option value="">Select Network</option>
          <option value="mtn">MTN</option>
          <option value="glo">Glo</option>
          <option value="airtel">Airtel</option>
          <option value="9mobile">9Mobile</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded">Proceed</button>
      </form>
    </div>
  );
};

export default Home;
