import { Router } from "express";
import { getMatchesStavkaTv } from "../controllers/stavkaTV/getMatchesStavkaTv.js";
import { getPredictionsStavkaTv } from "../controllers/stavkaTV/getPredictionsStavkaTv.js";

const stavkaTvRouter = Router();

stavkaTvRouter.get("/matches", async (req, res) => {
  const matches = await getMatchesStavkaTv(
    req.query.limit,
    req.query.dateFrom,
    req.query.dateTo
  );
  res.json({ matches });
});

stavkaTvRouter.get("/predictions", async (req, res) => {
  const predictions = await getPredictionsStavkaTv(
    req.query.link,
    req.query.limit
  );
  res.json({ predictions });
});

export default stavkaTvRouter;
