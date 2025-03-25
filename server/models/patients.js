import { connectDB } from "../config/db.js";
import { ObjectId } from 'mongodb';

export const createPatient = async (patientData) => {
  const db = await connectDB();
  const collection = db.collection("patients");

  const result = await collection.insertOne(patientData);
  return { _id: result.insertedId, ...patientData };
};

export const getPatientById = async (id) => {
    const db = await connectDB();
    const collection = db.collection("patients");

    const patient = await collection.findOne({ _id: id });
    return patient;
}