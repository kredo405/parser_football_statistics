import express from 'express';
import cors from 'cors';
import { moneyWay1x2 } from './services/arbworld/moneyWay1x2.js';
import { moneyWayUnderOver } from './services/arbworld/moneyUnderOver.js';
import { correctScore } from './services/arbworld/correctScore.js';
import { onlineBookmaker } from './services/prediction/onlineBookmaker.js';
import { betzona } from './services/prediction/betzona.js';
import { getMatchesSoccer365 } from './services/soccer365/soccer365AllMatches.js';
import { matchSoccer365 } from './services/soccer365/matchSoccer365.js';
import { h2hSoccer365 } from './services/soccer365/h2h.js';
import { formSoccer365 } from './services/soccer365/form.js';
import { liveSoccer365 } from './services/soccer365/live.js';
import { lineupsSoccer365 } from './services/soccer365/lineups.js';


const app = express()

app.use(cors())

// Sample api routes for testing
app.get('/', (req, res) => {
  res.json("welcome to our server")
});

// получение матчей
app.get('/matchesLive', async (req, res) => {
  const matchesLive = await liveSoccer365(req.query.id)
  res.json({ matchesLive })
});
app.get('/matches', async (req, res) => {
  const matches = await getMatchesSoccer365()
  res.json({ matches })
});

// Статистика и прогнозы
app.get('/matchInfo', async (req, res) => {
  const match = await matchSoccer365(req.query.id)
  res.json({ match })
});
app.get('/h2h', async (req, res) => {
  const h2h = await h2hSoccer365(req.query.id)
  res.json({ h2h })
});
app.get('/form', async (req, res) => {
  const form = await formSoccer365(req.query.id)
  res.json({ form })
});

app.get('/lineups', async (req, res) => {
  const lineups = await lineupsSoccer365(req.query.id)
  res.json({ lineups })
});

// arbworld 
app.get('/moneyWay1x2', async (req, res) => {
  const moneyWay = await moneyWay1x2()
  res.json({ moneyWay })
});
app.get('/moneyWayUnderOver', async (req, res) => {
  const moneyWay = await moneyWayUnderOver()
  res.json({ moneyWay })
});
app.get('/correctScore', async (req, res) => {
  const moneyWay = await correctScore()
  res.json({ moneyWay })
});

// Прогнозы
app.get('/onlineBookmaker', async (req, res) => {
  const predicitons = await onlineBookmaker()
  res.json({ predicitons })
});

app.get('/betzona', async (req, res) => {
  const predicitons = await betzona()
  res.json({ predicitons })
});

// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});