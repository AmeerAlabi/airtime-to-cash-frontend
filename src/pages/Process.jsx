import { useEffect } from "react";

const Processing = () => {
  useEffect(() => {
    setTimeout(() => {
      alert("Payment has been processed! 🎉");
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700">Processing Payment...</h1>
      <p className="text-lg text-gray-500 mt-2">Please wait, this may take a few seconds.</p>
    </div>
  );
};

export default Processing;
