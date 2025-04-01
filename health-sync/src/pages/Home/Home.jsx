import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../../styles/button.css";

export default function Home() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/authPage");
  };
  return (
    <div className="page-container1">
      <div className="home-header">
        <img src="./logo.png" alt="Logo"/>
        <h1>
          Your National Health Database Fast, Secure, and Easy Access to Care
        </h1>
      </div>
      <div className="main">
        <div className="text">
          <p>
            Welcome to <br />
            Your Personal Health Hub!
          </p>
        </div>
        <div className="pic-button-group">
          <div className="pic-button-container">
            <img src="./doctor.png" alt="Doctor's picture"/>

            <button className="button" onClick={handleButtonClick}>
              MEDICAL STAFF
            </button>
          </div>
          <div className="pic-button-container">
            <img src="./patient.png" alt="Patient's picture"/>
            <button className="button" onClick={handleButtonClick}>
              PATIENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
