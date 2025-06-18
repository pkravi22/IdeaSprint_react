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
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authpage" element={<AuthPage />} />
          <Route path="/authpage" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
