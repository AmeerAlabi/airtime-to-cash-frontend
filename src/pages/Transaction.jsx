import { useLocation, useNavigate } from "react-router-dom";

const Transaction = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="p-5">No transaction found</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold">Send Airtime</h1>
      <p className="text-lg">Send {state.transaction.amount} airtime to:</p>
      <p className="text-2xl font-bold text-blue-600">{state.transaction.recipientNumber}</p>
      <p className="mt-2">Expected Cash: ₦{state.transaction.cashValue}</p>
      <button
        onClick={() => navigate("/confirm", { state })}
        className="bg-blue-500 text-white mt-4 p-2 rounded"
      >
        I have sent the airtime
      </button>
    </div>
  );
};

export default Transaction;
