import { connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getAllPatients = async (doctorID) => {
  const db = await connectDB();
  const collection = db.collection("patients");
  const patients = await collection.find({ doctorID }).toArray();
  return patients;
};

export const createPatient = async ({
  registered,
  patientName,
  patientID,
  patientFile,
  doctorID,
}) => {
  console.log("I am here- createPatient function is running");
  const db = await connectDB();
  const collection = db.collection("patients");
  console.log(collection);
  const newPatient = {
    registered,
    patientName,
    patientID,
    patientFile,
    doctorID,
  };
  console.log("New patient data:", newPatient);
  const result = await collection.insertOne(newPatient);
  console.log("Inserted patient ID:", result.insertedId);
  return { _id: result.insertedId, ...newPatient };
};

export const deletePatient = async (id) => {
  const db = await connectDB();
  const collection = db.collection("patients");

  const result = await collection.deleteOne({ _id: id }); //
  return result.deletedCount > 0;
};

export const updatePatientById = async (id, updatedData) => {
  const db = await connectDB();
  const collection = db.collection("patients");

  let patientId;
  try {
    patientId = new ObjectId(id);
  } catch (error) {
    console.error("Invalid patient ID:", id);
    return null;
  }
  const result = await collection.updateOne(
    { _id: patientId },
    { $set: updatedData }
  );
  if (result.matchedCount === 0) return null;
  return await getPatientById(patientId);
};

export const getPatientById = async (id) => {
  const db = await connectDB();
  const collection = db.collection("patients");
  let patientId;
  try {
    patientId = new ObjectId(id);
  } catch (error) {
    console.error("Invalid patient ID:", id);
    return null;
  }
  const patient = await collection.findOne({ _id: patientId });
  return patient;
};
