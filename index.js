import express from "express";
import cors from "cors";
import nbBetRouter from "./routes/nbBet.js";
import soccer365Router from "./routes/soccer365.js";
import arbworldRouter from "./routes/arbworld.js";

const app = express();

app.use(cors());

// Sample api routes for testing
app.get("/", (req, res) => {
  res.json("welcome to our server");
});

app.use("/nbBet", nbBetRouter);
app.use("/soccer365", soccer365Router);
app.use("/arbworld", arbworldRouter);
// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
