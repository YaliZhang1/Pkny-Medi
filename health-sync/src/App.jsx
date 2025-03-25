import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import MobileMenuPage from "./pages/MobileMenuPage/MobileMenuPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import DoctorsPage from "./pages/DoctorsPage/DoctorsPage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authPage" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mobileMenuPage" element={<MobileMenuPage />} />
          <Route path="/appointmentPage" element={<AppointmentPage />} />
          <Route path="/doctorsPage" element={<DoctorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
