import React, { useState } from "react";
import "../styles/leftNavigation.css";
import { useNavigate, useLocation } from "react-router-dom";
export default function LeftNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };
  const handleAppointmentsClick = () => {
    navigate("/appointmentPage");
  };
  const handleDoctorsClick = () => {
    navigate("/doctorsPage");
  };

  return (
    <div className="leftNavigationContainer">
      <div className="topList">
        <div>
          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => {
              handleDashboardClick();
            }}
          >
            <img src="./dashboardIcon.svg" />
            Dashboard
          </button>
        </div>
        <div>
          <button
            className={location.pathname === "/appointmentPage" ? "active" : ""}
            onClick={() => {
              handleAppointmentsClick();
            }}
          >
            <img src="./appointmentsIcon.svg" /> Appointment
          </button>
        </div>
        <div>
          <button
            className={location.pathname === "/doctorsPage" ? "active" : ""}
            onClick={() => {
              handleDoctorsClick();
            }}
          >
            <img src="./doctorIcon.svg" />
            Doctors
          </button>
        </div>
        <div>
          <button>
            <img src="./pentients.svg" />
            Patients
          </button>
        </div>
        <div>
          <button>
            <img src="./messages.svg" />
            Messages
          </button>
        </div>
        <div>
          <button>
            <img src="./emergency.svg" />
            Emergency
          </button>
        </div>
        <div>
          <button>
            <img src="./about.svg" />
            About
          </button>
        </div>
      </div>
      <div className="bottomList">
        <div>
          <button>
            <img src="./setting.svg" />
            Password
          </button>
        </div>
        <div>
          <button>
            <img src="./helpCenter.svg" alt="" /> Help Center
          </button>
        </div>
        <div>
          <button>
            <img src="./logOut.svg" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
