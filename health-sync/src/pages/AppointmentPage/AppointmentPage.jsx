import React from "react";
import Header from "../../components/Header";
import LeftNavigation from "../../components/LeftNavigation";
import "./AppointmentPage.css";
export default function AppointmentPage() {
  return (
    <div className="appointPage-container">
      <Header className="headerCell" />
      <div className="nav-appintContent-container">
        <div className="pageNavigate">
          <LeftNavigation />
        </div>
        <div className="appointContent">
          <h1>Appointment Page</h1>
          <p>
            This is where you will schedule appointments, view your past
            appointments, and manage your schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
