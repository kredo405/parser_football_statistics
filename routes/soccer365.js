import { Router } from "express";
import { matchSoccer365 } from "../controllers/soccer365/matchSoccer365.js";
import { h2hSoccer365 } from "../controllers/soccer365/h2h.js";
import { formSoccer365 } from "../controllers/soccer365/form.js";
import { lineupsSoccer365 } from "../controllers/soccer365/lineups.js";

const soccer365Router = Router();

soccer365Router.get("/matchInfo", async (req, res) => {
  const match = await matchSoccer365(req.query.id);
  res.json({ match });
});
soccer365Router.get("/h2h", async (req, res) => {
  const h2h = await h2hSoccer365(req.query.id);
  res.json({ h2h });
});
soccer365Router.get("/form", async (req, res) => {
  const form = await formSoccer365(req.query.id);
  res.json({ form });
});

soccer365Router.get("/lineups", async (req, res) => {
  const lineups = await lineupsSoccer365(req.query.id);
  res.json({ lineups });
});

export default soccer365Router;
