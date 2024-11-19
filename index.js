import express from "express";
import cors from "cors";
import nbBetRouter from "./routes/nbBet.js";
import arbworldRouter from "./routes/arbworld.js";
import xgScoreRouter from "./routes/xgscore.js";
import mongoose from "mongoose";
import excaperRouter from "./routes/excaper.js";
import stavkaTvRouter from "./routes/stavkaTV.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   console.error("MongoDB URI is missing!");
//   process.exit(1); // Завершаем программу, если URI отсутствует
// }

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// Sample api routes for testing
app.get("/", (req, res) => {
  res.json("welcome to our server");
});

app.use("/nbBet", nbBetRouter);
app.use("/excaper", excaperRouter);
app.use("/arbworld", arbworldRouter);
app.use("/xgScore", xgScoreRouter);
app.use("/stavkatv", stavkaTvRouter);
// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
