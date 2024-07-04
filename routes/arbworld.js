import { Router } from "express";
import { moneyWay1x2 } from "../controllers/arbworld/moneyWay1x2.js";
import { moneyWayUnderOver } from "../controllers/arbworld/moneyUnderOver.js";
import { correctScore } from "../controllers/arbworld/correctScore.js";
import { getDroppingOdds1X2 } from "../controllers/arbworld/droppingOdds1x2.js";
import { getDroppingOddsUnderOver } from "../controllers/arbworld/droppingOddsUO.js";

const arbworldRouter = Router();

arbworldRouter.get("/moneyWay1x2", async (req, res) => {
  const moneyWay = await moneyWay1x2();
  res.json({ moneyWay });
});
arbworldRouter.get("/moneyWayUnderOver", async (req, res) => {
  const moneyWay = await moneyWayUnderOver();
  res.json({ moneyWay });
});
arbworldRouter.get("/correctScore", async (req, res) => {
  const moneyWay = await correctScore();
  res.json({ moneyWay });
});
arbworldRouter.get("/droppingOdds1X2", async (req, res) => {
  const droppingOdds = await getDroppingOdds1X2();
  res.json({ droppingOdds });
});
arbworldRouter.get("/droppingOddsUnderOver", async (req, res) => {
  const droppingOdds = await getDroppingOddsUnderOver();
  res.json({ droppingOdds });
});

export default arbworldRouter;
