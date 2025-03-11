import React from "react";
import Header from "../../components/Header";
import LeftNavigation from "../../components/LeftNavigation";
import "./DoctorsPage.css";
export default function DoctorsPage() {
  return (
    <div className="doctorsPage-container">
      <Header className="headerCell" />
      <div className="nav-doctorsContent-container">
        <div className="pageNavigate">
          <LeftNavigation />
        </div>
        <div className="doctorsContent">
            <h1>Doctors Page</h1>
          <p>
            This is where you will schedule Doctors, view your past Doctors, and manage your schedule.
  
          </p>
        </div>
      </div>
    </div>
  );
}
