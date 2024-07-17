import { Router } from "express";
import { getMatchesNbBetPrematch } from "../controllers/nbbet/nbbet.js";
import { getMatchNbBetPrematch } from "../controllers/nbbet/nbbetMatch.js";
import { getMatchesNbBetPredict } from "../controllers/nbbet/nbbetPredict.js";
import { getSummary } from "../controllers/nbbet/nbetSummary.js";
import { getHisoryOdds } from "../controllers/nbbet/nbBetOdds.js";
import { getLastMatchesNbBet } from "../controllers/nbbet/nbBetLastMatches.js";

const nbBetRouter = Router();

nbBetRouter.get("/nbbetMatches", async (req, res) => {
  const matches = await getMatchesNbBetPrematch(req.query.timestamp);
  res.json({ matches });
});
nbBetRouter.get("/nbbetMatch", async (req, res) => {
  const match = await getMatchNbBetPrematch(req.query.link);
  res.json({ match });
});
nbBetRouter.get("/nbbetLastMatches", async (req, res) => {
  const match = await getLastMatchesNbBet(req.query.link);
  res.json({ match });
});
nbBetRouter.get("/nbbetPredict", async (req, res) => {
  const match = await getMatchesNbBetPredict(req.query.link);
  res.json({ match });
});
nbBetRouter.get("/nbbetSummary", async (req, res) => {
  const match = await getSummary(req.query.link);
  res.json({ match });
});
nbBetRouter.get("/historyOdds", async (req, res) => {
  const match = await getHisoryOdds(req.query.link);
  res.json({ match });
});

export default nbBetRouter;
