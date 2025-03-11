import "./Login.css";
import "../../styles/button.css";
import { useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { checkUser } from "../../api/fetchUser";

export default function Login() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (value.length !== 6) {
      alert("Please enter 6 digit number");
      inputRef.current.focus();
      return;
    }

    const user = await checkUser(value);

    if (user) {
      alert(`Hello, welcome back, ${user.user.name}`);
      navigate("/dashboard");
    } else {
      alert("The number is invalid, please re-enter the 6-digit number.");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="page-container2">
    
      <div className="head-text">
        <h1>Login</h1>
        <p>Welcome! Please login to your account.</p>
      </div>

      <div className="inputBox">
        <h3>Enter Your Unique Number:</h3>
        <input
        ref = {inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          maxLength="6"
        />
        <h3>Enter the card.</h3>
      </div>
      <button className="button" onClick={handleLogin}>
        LOGIN</button>
    </div>
  );
}
