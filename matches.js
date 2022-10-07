import axios from 'axios';
import moment from 'moment';
import cheerio from 'cheerio';
import express from 'express';
import cors from 'cors';
import puppeteer from "puppeteer";
import proxy from 'express-http-proxy';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { getMatchesLive } from './services/soccerment/getMatchesLive.js';
import { getMatches } from './services/soccerment/getMatches.js';


const firebaseConfig = {
  apiKey: "AIzaSyBaCi843YIFKmo5MJDXHlk2tDm54xNVqsQ",
  authDomain: "kredo-bet.firebaseapp.com",
  projectId: "kredo-bet",
  storageBucket: "kredo-bet.appspot.com",
  messagingSenderId: "34405464606",
  appId: "1:34405464606:web:bb41227f9d4f4c03eb8c0f",
  measurementId: "G-M30NKH2EMH"
};

const getplayers = async () => {
  const desktop_agents = ['Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'];

  let rand = Math.floor(Math.random() * desktop_agents.length);

  const options = {
      method: 'GET',
      url: `https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2Fstats%2FSerie-A-Stats&div=div_stats_standard`,
      headers: {
          'User-Agent': desktop_agents[rand],
      }
  };
  try {
      const response = await axios.request(options)
      const result = await response.data
      const matches = [];
      const dom = new JSDOM(result)
      let arrEl = dom.window.document.querySelectorAll("tbody>tr")
      arrEl.forEach(el => {
        if (el.querySelector('[data-stat="player"]').querySelector('a')) {
          matches.standartStatsPlayers.push({
            player: el.querySelector('[data-stat="player"]').querySelector('a').textContent,
            position: el.querySelector('[data-stat="position"]').textContent,
            team: el.querySelector('[data-stat="team"]').querySelector('a').textContent,
            games: el.querySelector('[data-stat="games"]') ? el.querySelector('[data-stat="games"]').textContent : null,
            games_starts: el.querySelector('[data-stat="games_starts"]') ? el.querySelector('[data-stat="games_starts"]').textContent : null,
            minutes: el.querySelector('[data-stat="minutes"]').textContent,
            goals: el.querySelector('[data-stat="goals"]').textContent,
            assists: el.querySelector('[data-stat="assists"]').textContent,
            goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
            xg: el.querySelector('[data-stat="xg"]') ? el.querySelector('[data-stat="xg"]').textContent : null,
            xg_per90: el.querySelector('[data-stat="xg_per90"]') ? el.querySelector('[data-stat="xg_per90"]').textContent : null,
          })
        }
      });

      return matches;
  }
  catch (error) {
      console.log(error);
  }
};

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
// SoccerMents получение статистики
app.get('/players', async (req, res) => {
  const players = await getplayers()
  res.json({ players })
});
app.get('/onlineBookmaker', (req, res) => {
  res.json({ onlineBookmaker })
});
app.get('/betzona', (req, res) => {
  res.json({ betzona })
});
app.get('/footystat', (req, res) => {
  res.json({ footystat })
});
app.get('/arbworld', (req, res) => {
  res.json({ arbworld })
});
// Port Number
const port = 8000;

// Server setup
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});