import "./AuthPage.css";
import "../../styles/button.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/register";
import { login } from "../../api/login";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [registrationCode, setRegistrationCode] = useState(""); // For registration
  const [name, setName] = useState(""); // For registration
  const [password, setPassword] = useState(""); // For registration
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [consentGiven, setConsentGiven] = useState(false);
  const handlePrivacyPolicyPageClick = () => {
    navigate("/privacyPolicyPage");
  };

  const handleLogin = async () => {
    if (password.length !== 6) {
      alert("Please enter a 6-digit number");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    const userResponse = await login(email, password);

    if (userResponse.success) {
      const doctorData = userResponse.user;
      localStorage.setItem("doctor", JSON.stringify(doctorData)); //save doctor's info to localStorage
      alert(`Hello, welcome back, ${userResponse.user.name}`);
      window.gtag("event", "doctor_login",{
        method: "email", 
        user_group: "doctor" //or "Admin","Nurse",etc
      });
      navigate("/dashboard");
    } else {
      alert(
        userResponse.message || "Invalid email or password. Please try again."
      );
      window.gtag("event", "doctor_error_login");
      setPassword("");
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@healthsync\.com$/;
    if (!emailRegex.test(email)) {
      alert("Email must end with @healthsync.com");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!consentGiven) {
      alert("You must agree to the privacy policy before logging in.");
      return;
    }

    const userData = { registrationCode, name, email, password };
    const userResponse = await register(userData);

    if (userResponse.success) {
      alert("Registration successful! Please go to Login Form to Login");
    } else {
      alert(userResponse.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="page-container2">
      <div className="tab-buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login Form
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register Form
        </button>
      </div>

      {isLogin ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          inputRef={inputRef}
          consentGiven={consentGiven}
          setConsentGiven={setConsentGiven}
        />
      ) : (
        <RegisterForm
          registrationCode={registrationCode}
          setRegistrationCode={setRegistrationCode}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleRegister={handleRegister}
          consentGiven={consentGiven}
          setConsentGiven={setConsentGiven}
        />
      )}
    </div>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  inputRef,
}) {
  return (
    <div className="loginContainer">
      <div className="head-text">
        <h1>Login</h1>
        <p>Welcome! Please log in to your account.</p>
      </div>

      <div className="inputBox">
        <h3>Enter Your Work Email:</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@healthsync.com"
        />
        <h3>Enter Your Code:</h3>
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="000000"
          maxLength="6"
          ref={inputRef}
        />
      </div>

      <button className="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

function RegisterForm({
  registrationCode,
  setRegistrationCode,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleRegister,
  consentGiven,
  setConsentGiven,
}) {
  return (
    <div className="registerContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="head-text">
          <h1>Register</h1>
          <p>Welcome! Create a new account.</p>
        </div>
        <div className="inputBox">
          <h3>Enter Your Registration Code:</h3>
          <input
            type="text"
            value={registrationCode}
            onChange={(e) =>
              setRegistrationCode(e.target.value.replace(/\s+/g, ""))
            }
            required
            placeholder="Enter 12-character code"
            maxLength={12}
          />
          <h3>Enter Your User Name:</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/\s+/g, ""))}
            required
            placeholder="Your Name"
          />
          <h3>Enter Your Work Email:</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
            required
            placeholder="xxx@healthsync.com"
            pattern="^[a-zA-Z0-9._%+-]+@healthsync\.com$"
            title="Email must end with @healthsync.com"
          />
          <h3>Set Your Password:</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ""))}
            required
            placeholder="000000 (6 digits)"
            pattern="^\d{6}$"
            title="Password must be exactly 6 digits"
          />
          <h3>Repeat Your Password:</h3>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value.replace(/\s+/g, ""))
            }
            required
            placeholder="000000 (6 digits)"
            pattern="^\d{6}$"
            title="Password must be exactly 6 digits"
          />
        </div>
        <button className="button" type="submit">
          Register
        </button>{" "}
        <div className="policy">
          <input
            type="checkbox"
            id="gdpr-consent"
            required
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
          />
          <label for="gdpr-consent">
            I agree
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              the privacy policy
            </Link>{" "}
            and allow my personal data to be stored.
          </label>
        </div>
      </form>
    </div>
  );
}
