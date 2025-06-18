import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import SignUp from "../pages/Auth";
import Header from "../component/navbar/Header";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp tab="signup" />} />
          <Route path="/signin" element={<SignUp tab="signin" />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
