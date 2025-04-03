import "./AuthPage.css";
import "../../styles/button.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/register";
import { login } from "../../api/login"; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  // const [code, setCode] = useState("");
  const [name, setName] = useState(""); // For registration
  const [password, setPassword] = useState(""); // For registration
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (password.length !== 6) {
      alert("Please enter a 6-digit number");
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    const userResponse = await login(email, password); 

    if (userResponse.success) {
      alert(`Hello, welcome back, ${userResponse.user.name}`);
      navigate("/dashboard");
    } else {
      alert(userResponse.message || "Invalid email or password. Please try again.");
      setPassword("");
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = { name, email, password };
    const userResponse = await register(userData);

    if (userResponse.success) {
      alert("Registration successful!");
      navigate("/dashboard");
    } else {
      alert(userResponse.message || "Registration failed. Please try again.");
    }
  };


  return (
    <div className="page-container2">
      <div className="tab-buttons" >
        <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>
          Login Form
        </button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>
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
        />
      ) : (
        <RegisterForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleRegister={handleRegister}
        />
      )}
    </div>
  );
}

function LoginForm({ email, setEmail, password, setPassword, handleLogin, inputRef }) {
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
          onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))}
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
  name, setName,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  handleRegister
}) {
  return (
    <div className="registerContainer">
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="head-text">
          <h1>Register</h1>
          <p>Welcome! Create a new account.</p>
        </div>

        <div className="inputBox">
          <h3>Enter Your User Name:</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Oscar"
          />
          <h3>Enter Your Work Email:</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="oscar@healthsync.com"
          />
          <h3>Set Your Password:</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="000000 (6 digits)"
            pattern="[0-9]{6}"
          />
          <h3>Repeat Your Password:</h3>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="000000 (6 digits)"
            pattern="[0-9]{6}"
          />
        </div>

        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
