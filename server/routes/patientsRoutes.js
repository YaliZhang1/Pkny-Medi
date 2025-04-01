import express from "express";
import { ObjectId } from "mongodb";

import {
  createPatient,
  deletePatient,
  updatePatientById,
  getPatientById,
  getAllPatients,
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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let patientId;
    try {
      patientId = new ObjectId(id); // 确保 ID 是 MongoDB 的 ObjectId
    } catch (error) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedPatient = await deletePatient(patientId);

    if (!deletedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found, can't delete." });
    }
    res
      .status(200)
      .json({ message: "Delete patient successfully", deletedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { time, patientName, patientFile } = req.body;
    console.log("Received update request for ID:", id);

    if (!time && !patientFile && !patientName) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    let patientId;
    try {
      patientId = new ObjectId(id); // 确保 ID 是 MongoDB 的 ObjectId
    } catch (error) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    // 只更新传入的字段，避免覆盖未传的字段
    const updateFields = {};
    if (time !== undefined) updateFields.time = time;
    if (patientName !== undefined) updateFields.patientName = patientName;
    if (patientFile !== undefined) updateFields.patientFile = patientFile;

    const updatedPatient = await updatePatientById(patientId, updateFields);

    if (!updatedPatient) {
      return res
        .status(404)
        .json({ message: "Patient not found, can't update." });
    }

    res.status(200).json({
      message: "Update patient successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let patientId;
    try {
      patientId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const patient = await getPatientById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
