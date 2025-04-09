import express from "express";
import bcrypt from "bcryptjs";
import { getUserByWorkEmail, createUser } from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await getUserByWorkEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: err.message, error: err });
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
