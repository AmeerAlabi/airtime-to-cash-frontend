import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/";
import Confirm from "./pages/Confirm";
import BankDetails from "./pages/BankDetails";
import Processing from "./pages/Process";
import Transaction from "./pages/Transaction";
import Home from "./pages/Home";
import SuccessPage from "./pages/Sucess";
import ConfirmAirtime from "./pages/Confirm";
import EnterBankDetails from "./pages/BankDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/confirm" element={<ConfirmAirtime/>} />
        <Route path="/bank-details" element={<EnterBankDetails />} />
        {/* <Route path="/processing" element={<Processi />} /> */}
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/enter-bank-details" element={<BankDetails />} />
        <Route path="/success" element={<SuccessPage />} />

      </Routes>
    </Router>
  );
}

export default App;
