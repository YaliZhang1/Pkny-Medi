import createError from "http-errors";
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import patientRouter from "./routes/patientsRoutes.js";



const app = express();
const PORT = process.env.PORT || 3001;
// app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use("/patients", patientRouter);

const startServer = async () => {
  try {
    const db = await connectDB();
    const collections = await db.listCollections().toArray();
   

    
    console.log("Collections in the database:");
    collections.forEach((collection) => {
      console.log(collection.name); // // print every collection
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
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();
