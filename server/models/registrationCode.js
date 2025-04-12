import { connectDB } from "../config/db.js";
//registrationCode is is the parameter you want to get, and the value you find in this set to see if it exists in this set
export const getRegistrationCode = async (registrationCode) => {
  const db = await connectDB();
  const codeEntry = await db
    .collection("code_registration")
    .findOne({ registrationCode, isUsed: false });
  console.log("Found codeEntry in DB", codeEntry);
  return codeEntry;
};

export const markRegistrationCodeAsUsed = async (registrationCode)=>{
  const db = await connectDB();
  const result = await db.collection("code_registration").updateOne(
    { registrationCode },
    { $set: { isUsed: true } }
  );
  console.log("Update result:", result.modifiedCount);
  return result.modifiedCount === 1;//return 1 if it's success, otherwise return false.
}