import express from "express";
import { createPatient, getPatientById } from "../models/patients.js";

const router = express.Router();

router.post("/patients", async (req, res) => {
  try {
    const newPatient = await createPatient(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;