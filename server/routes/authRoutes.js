import express from "express";
import bcrypt from "bcryptjs";
import { getUserByWorkEmail, createUser } from "../models/user.js";
import {
  getRegistrationCode,
  markRegistrationCodeAsUsed,
} from "../models/registrationCode.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { registrationCode, name, email, password } = req.body;
  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@healthsync\.com$/;
    const codeEntry = await getRegistrationCode(registrationCode);
    if (!codeEntry) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or used registration code" });
    }
    const success = await markRegistrationCodeAsUsed(registrationCode);
    if (!success) {
      console.warn("Registration code could not be marked as used");
    }
    if (!registrationCode || !name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email must be a valid @healthsync.com address",
        });
    }
    const existingUser = await getUserByWorkEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: newUser,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, message: err.message, error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByWorkEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Logged in successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message, err });
  }
});

export default router;
