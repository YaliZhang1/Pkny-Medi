import express from "express";

import {
  createPatient,
  deletePatient,
  updatePatientById,
  getPatientById,
  getAllPatients
} from "../models/patients.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { registered, patientName, patientID, patientFile } = req.body;
    if (!registered || !patientFile || !patientID || !patientFile.length) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const existingPatient = await getPatientById(patientID);
    if (existingPatient) {
      return res.status(400).json({
        message:
          "Patient already exists, just modify the information of him/her.",
      });
    }
    const newPatient = await createPatient({
      registered,
      patientName,
      patientID,
      patientFile,
    });

    console.log("New patient added:", newPatient);
    res.status(201).json({ message: "Add new patient", patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    const { patientID } = req.body;
    if (!patientID) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    const deletedPatient = await deletePatient(patientID);
    if (!deletedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found, can't delete." });
    }
    res.status(200).json({ message: "Delete patient successfully", patientID });
  } catch (error) {
    res.status(500).json({ error: error.message, error: err });
  }
});


router.put("/", async (req, res) => {
  try {
    const { patientID, time, patientName, patientFile } = req.body;
    if (!patientID || (!time && !patientFile && !patientName)) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }
    const updatedPatient = await updatePatientById(patientID, {
      time,
      patientName,
      patientFile,
    });
    if (!updatedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found, can't update." });
    }
    res
      .status(200)
      .json({
        message: "Update patient successfully",
        patient: updatedPatient,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:patientID", async (req, res) => {
  try {
    const { patientID } = req.params;
    if (!patientID) {
      return res.status(400).json({ message: "Patient ID is required" });
    }
    const patient = await getPatientById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
