import { Router } from "express";
import { getAllMatchesExcaper } from "../controllers/excaper/getAllMatchesPrematch.js";
import { getMatchDataExcaper } from "../controllers/excaper/getData.js";
import { getAllMatchesExcaperLive } from "../controllers/excaper/getAllMatchesLive.js";

const excaperRouter = Router();

excaperRouter.get("/prematch", async (req, res) => {
  const matches = await getAllMatchesExcaper();
  res.json({ matches });
});

excaperRouter.get("/live", async (req, res) => {
  const matches = await getAllMatchesExcaperLive();
  res.json({ matches });
});

excaperRouter.get("/match", async (req, res) => {
  const matches = await getMatchDataExcaper(req.query.link);
  res.json({ matches });
});

export default excaperRouter;
