import React from "react";
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

  const handleLogoutClick = () => {
    localStorage.removeItem("doctor");
    navigate("/homePage");
  };
  // const doctor = JSON.parse(localStorage.getItem("doctor"));
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
            <img src="./dashboardIcon.svg" alt="dashboarIcon" />
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
            <img src="./appointmentsIcon.svg" alt="appointmentsIcon" />{" "}
            Appointment
          </button>
        </div>
        <div>
          <button
            className={location.pathname === "/doctorsPage" ? "active" : ""}
            onClick={() => {
              handleDoctorsClick();
            }}
          >
            <img src="./doctorIcon.svg" alt="doctorIcon" />
            Doctors
          </button>
        </div>
        <div>
          <button>
            <img src="./pentients.svg" alt="pentientsIcon" />
            Patients
          </button>
        </div>
        <div>
          <button>
            <img src="./messages.svg" alt="messagesIcon" />
            Messages
          </button>
        </div>
        <div>
          <button>
            <img src="./emergency.svg" alt="emergencyIcon" />
            Emergency
          </button>
        </div>
        <div>
          <button>
            <img src="./about.svg" alt="aboutIcon" />
            About
          </button>
        </div>
      </div>
      <div className="bottomList">
        <div>
          <button>
            <img src="./setting.svg" alt="settingIcon" />
            Password
          </button>
        </div>
        <div>
          <button>
            <img src="./helpCenter.svg" alt="helpCenterIcon" /> Help Center
          </button>
        </div>

        <div>
          <button
            className={location.pathname === "/homePage" ? "active" : ""}
            onClick={() => {
              handleLogoutClick();
            }}
          >
            <img src="./logOut.svg" alt="logOutIcon" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
