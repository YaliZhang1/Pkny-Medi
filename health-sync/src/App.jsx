import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mobileMenuPage" element={<MobileMenuPage />} />
          <Route path="/appointmentPage" element={<AppointmentPage />} />
          <Route path="/doctorsPage" element={<DoctorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
