import express from "express";
import cors from "cors";

import { getMatchesNbBetPrematch } from "./services/nbbet/nbbet.js";
import { getMatchNbBetPrematch } from "./services/nbbet/nbbetMatch.js";
import { getMatchesNbBetPredict } from "./services/nbbet/nbbetPredict.js";
import { getSummary } from "./services/nbbet/nbetSummary.js";


const app = express();

const TIMEOUT_MS = 20000;

app.use(cors());

// Sample api routes for testing
app.get("/", (req, res) => {
    res.json("welcome to our server");
});

// NbBet
app.get("/nbbetMatches", async (req, res) => {
    const matches = await getMatchesNbBetPrematch(req.query.timestamp);
    res.json({ matches });
});
app.get("/nbbetMatch", async (req, res) => {
    const match = await getMatchNbBetPrematch(req.query.link);
    res.json({ match });
});
app.get("/nbbetPredict", async (req, res) => {
    const match = await getMatchesNbBetPredict(req.query.link);
    res.json({ match });
});
app.get("/nbbetSummary", async (req, res) => {
    const match = await getSummary(req.query.link);
    res.json({ match });
});

// // Статистика и прогнозы
// app.get("/matchInfo", async (req, res) => {
//     const match = await matchSoccer365(req.query.id);
//     res.json({ match });
// });
// app.get("/h2h", async (req, res) => {
//     const h2h = await h2hSoccer365(req.query.id);
//     res.json({ h2h });
// });
// app.get("/form", async (req, res) => {
//     const form = await formSoccer365(req.query.id);
//     res.json({ form });
// });

// app.get("/lineups", async (req, res) => {
//     const lineups = await lineupsSoccer365(req.query.id);
//     res.json({ lineups });
// });

// // arbworld
// app.get("/moneyWay1x2", async (req, res) => {
//     const moneyWay = await moneyWay1x2();
//     res.json({ moneyWay });
// });
// app.get("/moneyWayUnderOver", async (req, res) => {
//     const moneyWay = await moneyWayUnderOver();
//     res.json({ moneyWay });
// });
// app.get("/correctScore", async (req, res) => {
//     const moneyWay = await correctScore();
//     res.json({ moneyWay });
// });
// app.get("/droppingOdds1X2", async (req, res) => {
//     const droppingOdds = await getDroppingOdds1X2();
//     res.json({ droppingOdds });
// });
// app.get("/droppingOddsUnderOver", async (req, res) => {
//     const droppingOdds = await getDroppingOddsUnderOver();
//     res.json({ droppingOdds });
// });

// Прогнозы
// app.get("/onlineBookmaker", async (req, res) => {
//     const predicitons = await onlineBookmaker();
//     res.json({ predicitons });
// });
// app.get("/sportAndBets", async (req, res) => {
//     const predicitons = await sportAndBets();
//     res.json({ predicitons });
// });
// app.get("/sportAndBetsPredict", async (req, res) => {
//     const predicitons = await sportAndBetsPredict(req.query.link);
//     res.json({ predicitons });
// });
// app.get("/legalbet", async (req, res) => {
//     const predicitons = await legalbet();
//     res.json({ predicitons });
// });
// app.get("/leagalbetPredict", async (req, res) => {
//     const predicitons = await leagalbetPredict(req.query.link);
//     res.json({ predicitons });
// });

// app.get("/oddsRu", async (req, res) => {
//     const predicitons = await oddsRu();
//     res.json({ predicitons });
// });
// app.get("/oddsRuPredict", async (req, res) => {
//     const predicitons = await oddsRuPredict(req.query.link);
//     res.json({ predicitons });
// });
// app.get("/betzona", async (req, res) => {
//     const predicitons = await betzonaPredict();
//     res.json({ predicitons });
// });
// app.get("/betzonaPredict", async (req, res) => {
//     const predicitons = await betzona(req.query.link);
//     res.json({ predicitons });
// });

// app.get("/liveresult", async (req, res) => {
//     const predicitons = await liveresult(req.query.link);
//     res.json({ predicitons });
// });

// app.get("/liveresultPredict", async (req, res) => {
//     const predicitons = await liveresultPredict(req.query.link);
//     res.json({ predicitons });
// });

// app.get("/stavkiprognozy", async (req, res) => {
//     const predicitons = await stavkiprognozy();
//     res.json({ predicitons });
// });

// app.get("/euroFootball", async (req, res) => {
//     const predicitons = await euroFootball();
//     res.json({ predicitons });
// });

// app.get("/euroFootballPredict", async (req, res) => {
//     const predicitons = await euroFootballPredict(req.query.link);
//     res.json({ predicitons });
// });

// app.get("/stavkiprognozyPredict", async (req, res) => {
//     const predicitons = await stavkiprognozyPredict(req.query.link);
//     res.json({ predicitons });
// });

app.use((req, res, next) => {
    res.status(504).send("Таймаут сервера");
});

// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
