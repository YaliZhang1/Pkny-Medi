import { connectDB } from "../config/db.js";

export const createUser = async (userData) => {
  const db = await connectDB();
  const collection = db.collection("users");
  //insert user into collection
  const result = await collection.insertOne(userData);
  return { _id: result.insertedId, ...userData };
};

export const getUserByWorkEmail = async (userEmail) => {
  const db = await connectDB();
  const collection = db.collection("users");
  console.log(userEmail);
  const user = await collection.findOne({ email: userEmail });
  console.log("User found in DB:", user);
  return user;
};


