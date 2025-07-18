import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/navbar/Header";
import AppRouter from "./routes/AppRouter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import AuthPage from "./component/authpage/AuthPage";
import DemoRequestForm from "./pages/DemoForm";
import DemoSubmitSuccess from "./pages/DemoSubmitSuccess";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import ContactSupport from "./pages/ContactSupoort";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative ">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authpage" element={<AuthPage />} />

          <Route path="/home" element={<Home />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancelled />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/demorequest" element={<DemoRequestForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thank-you" element={<DemoSubmitSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
