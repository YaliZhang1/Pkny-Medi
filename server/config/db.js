import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "medicalDatabase";
let db;
export const connectDB = async () => {
  if (db) {
    return db;
  }
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    console.log("Connected to Database:", db.databaseName);
    console.log("MongoDB connected");
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
};
