// import axios from 'axios';
// import moment from 'moment';
// import cheerio from 'cheerio';
import express from 'express';
import cors from 'cors';
// import puppeteer from "puppeteer";
// import proxy from 'express-http-proxy';
import jsdom from "jsdom";
// const { JSDOM } = jsdom;
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
// import { async } from '@firebase/util';
import { getMatchesLive } from './services/soccerment/getMatchesLive.js';
import { getMatches } from './services/soccerment/getMatches.js';
import { moneyWay1x2 } from './services/arbworld/moneyWay1x2.js';
import { moneyWayUnderOver } from './services/arbworld/moneyUnderOver.js';
import { correctScore } from './services/arbworld/correctScore.js';
import { onlineBookmaker } from './services/prediction/onlineBookmaker.js';
import { betzona } from './services/prediction/betzona.js';
import { matchesFbref } from './services/fbref/matches.js';


// const firebaseConfig = {
//   apiKey: "AIzaSyBaCi843YIFKmo5MJDXHlk2tDm54xNVqsQ",
//   authDomain: "kredo-bet.firebaseapp.com",
//   projectId: "kredo-bet",
//   storageBucket: "kredo-bet.appspot.com",
//   messagingSenderId: "34405464606",
//   appId: "1:34405464606:web:bb41227f9d4f4c03eb8c0f",
//   measurementId: "G-M30NKH2EMH"
// };


const app = express()

app.use(cors())

// Sample api routes for testing
app.get('/', (req, res) => {
  res.json("welcome to our server")
});

// SoccerMents получение матчей
app.get('/matchesLive', async (req, res) => {
  const matchesLive = await getMatchesLive()
  res.json({ matchesLive })
});
app.get('/matches', async (req, res) => {
  const matches = await getMatches()
  res.json({ matches })
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

app.get('/fbref', async (req, res) => {
  const predicitons = await matchesFbref()
  res.json({ predicitons })
});
// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});