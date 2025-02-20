import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600">🎉 Payment is Processing!</h2>
        <p className="text-gray-700 mt-2">
          Your request has been received. You will receive your payment shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
