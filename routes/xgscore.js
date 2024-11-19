import { Router } from "express";
import { getXgStatistics } from "../controllers/xgscore/getStatistics.js";

const xgScoreRouter = Router();

xgScoreRouter.get("/xg", async (req, res) => {
  const matches = await getXgStatistics(req.query.league);
  res.json({ matches });
});

export default xgScoreRouter;
