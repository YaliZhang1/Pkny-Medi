import { connectDB } from "../config/db.js";

export const createPatient = async ({
  registered,
  patientName,
  patientID,
  patientFile,
}) => {
  console.log("I am here- createPatient function is running");
  const db = await connectDB();
  const collection = db.collection("patients");
 
  const newPatient = {
    registered,
    patientName,
    patientID,
    patientFile,
  };
  console.log("New patient data:", newPatient);
  const result = await collection.insertOne(newPatient);
  console.log("Inserted patient ID:", result.insertedId);
  return { _id: result.insertedId, ...newPatient };
};

export const deletePatient = async (patientData) => {
  const db = await connectDB();
  const collection = db.collection("patients");
  const result = await collection.deleteOne({ _id: patientData._id });
  return result.deletedCount > 0;
};

export const updatePatientById = async (id, updatedData) => {
  const db = await connectDB();
  const collection = db.collection("patients");
  const result = await collection.updateOne({ _id: id }, { $set: updatedData });
  if (result.matchedCount === 0) return null;
  return await getPatientById(id);
};

export const getPatientById = async (id) => {
  const db = await connectDB();
  const collection = db.collection("patients");
  const patient = await collection.findOne({ _id: id });
  return patient;
};
