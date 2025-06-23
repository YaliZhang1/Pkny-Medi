import createError from "http-errors";
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import patientRouter from "./routes/patientsRoutes.js";
import generateRegistrationCode from "./utils/registrationCodeGenerator.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use("/patients", patientRouter);

const seedRegistrationCodes = async (db) => {
  const collectionName = "code_registration";

  // Check if the collection exists
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === collectionName
  );

  if (!collectionExists) {
    console.log(
      "Seeding code_registration collection with random registration codes..."
    );

    const registrationCodes = [];
    for (let i = 0; i < 100; i++) {
      const code = generateRegistrationCode({ length: 12 });
      registrationCodes.push({ registrationCode: code, isUsed: false });
    }

    // Insert the generated registration codes into the database
    await db.collection(collectionName).insertMany(registrationCodes);
    console.log("Successfully seeded the code_registration collection.");
  } else {
    console.log(
      "code_registration collection already exists. Skipping seeding."
    );
  }
};

const startServer = async () => {
  try {
    const db = await connectDB();
    await seedRegistrationCodes(db); // Seed registration codes if necessary

    const collections = await db.listCollections().toArray();

    collections.forEach((collection) => {
      console.log(collection.name); // print every collection
    });
  } catch (err) {
    console.error("Database connection failed:", err);
  }

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(res.locals.error);
  });

  app.listen(PORT, () => {
    // console.log(`Server is running on http://localhost:${PORT}`);
     console.log(`Server started on port ${PORT}`);
  });
};
startServer();
