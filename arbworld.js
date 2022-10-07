import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
import cors from 'cors';
import puppeteer from "puppeteer";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import footystats from './footystatPredict.js';

const firebaseConfig = {
  apiKey: "AIzaSyBaCi843YIFKmo5MJDXHlk2tDm54xNVqsQ",
  authDomain: "kredo-bet.firebaseapp.com",
  projectId: "kredo-bet",
  storageBucket: "kredo-bet.appspot.com",
  messagingSenderId: "34405464606",
  appId: "1:34405464606:web:bb41227f9d4f4c03eb8c0f",
  measurementId: "G-M30NKH2EMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const arbworld = () => {
  let arrMoneyWayArbworld1x2 = [];
  const options = {
    method: 'GET',
    url: 'https://arbworld.net/en/moneyway/football-1-x-2?hidden=&shown=&timeZone=%2B02%3A00&day=Today&refreshInterval=60&order=Percentage+on+sign&min=0&max=100',
  };

  axios.request(options).then(function (response) {
    //   console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".belowHeader")
    arrEl.forEach(el => {
      arrMoneyWayArbworld1x2.push({
        leagueName: el.querySelector('.tleague').textContent,
        date: el.querySelector('.tdate').textContent,
        homeName: el.querySelector('.thome').textContent,
        homeAway: el.querySelector('.taway').textContent,
        money: el.querySelector('.tvol').textContent,
        oddsHome: el.querySelectorAll('.odds_col_small')[0].textContent,
        oddsDraw: el.querySelectorAll('.odds_col_small')[1].textContent,
        oddsAway: el.querySelectorAll('.odds_col_small')[2].textContent,
        percentHome: el.querySelectorAll('.odds_col')[0].textContent,
        percentDraw: el.querySelectorAll('.odds_col')[1].textContent,
        percentAway: el.querySelectorAll('.odds_col')[2].textContent,
      })
    });
    getMoneyWayOverUnder(arrMoneyWayArbworld1x2);
  }).catch(function (error) {
    console.error(error);
  });

};

const getMoneyWayOverUnder = async (arrMoneyWayArbworld1x2) => {
  let arrMoneyWayArbworldOverUnder = [];
  const options = {
    method: 'GET',
    url: 'https://arbworld.net/en/moneyway/football-over-under-2-5?hidden=&shown=&timeZone=%2B02%3A00&day=Today&refreshInterval=60&order=Percentage+on+sign&min=0&max=100',
  };

  axios.request(options).then(function (response) {
    //   console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".belowHeader")
    arrEl.forEach(el => {
      arrMoneyWayArbworldOverUnder.push({
        leagueName: el.querySelector('.tleague').textContent,
        date: el.querySelector('.tdate').textContent,
        homeName: el.querySelector('.thome').textContent,
        homeAway: el.querySelector('.taway').textContent,
        money: el.querySelector('.tvol').textContent,
        oddsUnder: el.querySelectorAll('.odds_col_small')[0].textContent,
        oddsOver: el.querySelectorAll('.odds_col_small')[2].textContent,
        percentUnder: el.querySelectorAll('.odds_col')[0].textContent,
        percentOver: el.querySelectorAll('.odds_col')[1].textContent,
      })
    });
    getDroppingOdds1x2(arrMoneyWayArbworld1x2, arrMoneyWayArbworldOverUnder)
  }).catch(function (error) {
    console.error(error);
  });
}

const getDroppingOdds1x2 = async (arrMoneyWayArbworld1x2, arrMoneyWayArbworldOverUnder) => {
  let arrDroppingOdds1x2 = [];
  const options = {
    method: 'GET',
    url: 'https://arbworld.net/en/dropping-odds/football-1-x-2?hidden=&shown=&timeZone=%2B02%3A00&refreshInterval=60&order=Drop&min=0&max=100&day=Today',
  };

  axios.request(options).then(function (response) {
    //   console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".belowHeader")
    arrEl.forEach(el => {
      arrDroppingOdds1x2.push({
        leagueName: el.querySelector('.tleague').textContent,
        date: el.querySelector('.tdate').textContent,
        homeName: el.querySelector('.thome').textContent,
        homeAway: el.querySelector('.taway').textContent,
        money: el.querySelector('.tvol').textContent,
        oddsHome: el.querySelectorAll('.odds_col')[0].innerHTML,
        oddsDraw: el.querySelectorAll('.odds_col')[1].innerHTML,
        oddsAway: el.querySelectorAll('.odds_col')[2].innerHTML,
      })
    });
    getDroppingOddsOverUnder(arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2)
  }).catch(function (error) {
    console.error(error);
  });
}

const getDroppingOddsOverUnder = async (arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2) => {
  let arrDroppingOddsOverUnder = [];
  const options = {
    method: 'GET',
    url: 'https://arbworld.net/en/dropping-odds/football-over-under-2-5?hidden=&shown=&timeZone=%2B02%3A00&refreshInterval=60&order=Drop&min=0&max=100&day=Today',
  };

  axios.request(options).then(function (response) {
    //   console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".belowHeader")
    arrEl.forEach(el => {
      arrDroppingOddsOverUnder.push({
        leagueName: el.querySelector('.tleague').textContent,
        date: el.querySelector('.tdate').textContent,
        homeName: el.querySelector('.thome').textContent,
        homeAway: el.querySelector('.taway').textContent,
        money: el.querySelector('.tvol').textContent,
        oddsOver: el.querySelectorAll('.odds_col')[0].innerHTML,
        oddsUnder: el.querySelectorAll('.odds_col')[2].innerHTML,
      })
    });

    getCorrectScore(arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2, arrDroppingOddsOverUnder)
  }).catch(function (error) {
    console.error(error);
  });
}

const getCorrectScore = (arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2, arrDroppingOddsOverUnder) => {
  let arrCorectScore = [];
  const options = {
    method: 'GET',
    url: 'https://arbworld.net/ru/denezhnyye-potoki/football-tochnyy-rezultat',
  };

  axios.request(options).then(function (response) {
    //   console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".belowHeader")
    arrEl.forEach(el => {
      arrCorectScore.push({
        leagueName: el.querySelector('.tleague').textContent,
        date: el.querySelector('.tdate').textContent,
        teamName: el.querySelector('.thome').textContent,
        scores: [
          {score0_0: el.querySelectorAll('.odds_col')[0].querySelectorAll('div')[1].textContent},
          {score0_1: el.querySelectorAll('.odds_col')[1].querySelectorAll('div')[1].textContent},
          {score0_2: el.querySelectorAll('.odds_col')[2].querySelectorAll('div')[1].textContent},
          {score0_3: el.querySelectorAll('.odds_col')[3].querySelectorAll('div')[1].textContent},
          {score1_0: el.querySelectorAll('.odds_col')[4].querySelectorAll('div')[1].textContent},
          {score1_1: el.querySelectorAll('.odds_col')[5].querySelectorAll('div')[1].textContent},
          {score1_2: el.querySelectorAll('.odds_col')[6].querySelectorAll('div')[1].textContent},
          {score1_3: el.querySelectorAll('.odds_col')[7].querySelectorAll('div')[1].textContent},
          {score2_0: el.querySelectorAll('.odds_col')[8].querySelectorAll('div')[1].textContent},
          {score2_1: el.querySelectorAll('.odds_col')[9].querySelectorAll('div')[1].textContent},
          {score2_2: el.querySelectorAll('.odds_col')[11].querySelectorAll('div')[1].textContent},
          {score2_3: el.querySelectorAll('.odds_col')[12].querySelectorAll('div')[1].textContent},
          {score3_0: el.querySelectorAll('.odds_col')[13].querySelectorAll('div')[1].textContent},
          {score3_1: el.querySelectorAll('.odds_col')[14].querySelectorAll('div')[1].textContent},
          {score3_2: el.querySelectorAll('.odds_col')[15].querySelectorAll('div')[1].textContent},
          {score3_3: el.querySelectorAll('.odds_col')[16].querySelectorAll('div')[1].textContent},
        ]
      })
    });

    sortContent(arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2, arrDroppingOddsOverUnder, arrCorectScore)
  }).catch(function (error) {
    console.error(error);
  });
}


const sortContent = (arrMoneyWayArbworldOverUnder, arrMoneyWayArbworld1x2, arrDroppingOdds1x2, arrDroppingOddsOverUnder, arrCorectScore) => {

  const correctScore = arrCorectScore.map(el => {
    const pos =  el.teamName.indexOf('vs');

    const arr = el.scores.map(item => {
      let pos;
      for (let key in item) {
        pos = item[key].indexOf('%');
        return { [key]: item[key].slice(0, pos) }
      }
    })

    return {
      leagueName: el.leagueName,
      date: {
        day: el.date.slice(0, 6),
        time: el.date.slice(7, 15),
      },
      teamHome: el.teamName.slice(0, pos),
      teamAway: el.teamName.slice(pos + 2), 
      scores: arr
    }
  });

  const moneyWayOverUnder = arrMoneyWayArbworldOverUnder.map(el => {
    const posUnder = el.percentUnder.indexOf('%');
    const posOver = el.percentOver.indexOf('%');

    return {
      homeName: el.homeName,
      awayName: el.homeAway,
      money: el.money.replace(/[^0-9]/g, ''),
      leagueName: el.leagueName,
      date: {
        day: el.date.slice(0, 6),
        time: el.date.slice(7, 15),
      },
      oddsUnder: el.oddsUnder,
      oddsOver: el.oddsOver,
      percentUnder: el.percentUnder.slice(0, posUnder - 1),
      percentOver: el.percentOver.slice(0, posOver - 1),
    }
  });

  const moneyWay1x2 = arrMoneyWayArbworld1x2.map(el => {
    const posHome = el.percentHome.indexOf('%');
    const posDraw = el.percentDraw.indexOf('%');
    const posAway = el.percentAway.indexOf('%');

    return {
      homeName: el.homeName,
      awayName: el.homeAway,
      oddsHome: el.oddsHome,
      oddsDraw: el.oddsDraw,
      oddsAway: el.oddsAway,
      percentHome: el.percentHome.slice(0, posHome - 1),
      percentDraw: el.percentDraw.slice(0, posDraw - 1),
      percentAway: el.percentAway.slice(0, posAway - 1),
      money: el.money.replace(/[^0-9]/g, ''),
      leagueName: el.leagueName,
      date: {
        day: el.date.slice(0, 6),
        time: el.date.slice(7, 15),
      },
    }
  });

  const droppingOddsOverUnder = arrDroppingOddsOverUnder.map(el => {

    return {
      homeName: el.homeName,
      awayName: el.homeAway,
      money: el.money.replace(/[^0-9]/g, ''),
      leagueName: el.leagueName,
      date: {
        day: el.date.slice(0, 6),
        time: el.date.slice(7, 15),
      },
      oddsUnder: el.oddsUnder.split('<br>'),
      oddsOver: el.oddsOver.split('<br>'),
    }
  });

  const droppingOdds1x2 = arrDroppingOdds1x2.map(el => {

    return {
      homeName: el.homeName,
      awayName: el.homeAway,
      money: el.money.replace(/[^0-9]/g, ''),
      leagueName: el.leagueName,
      date: {
        day: el.date.slice(0, 6),
        time: el.date.slice(7, 15),
      },
      oddsHome: el.oddsHome.split('<br>'),
      oddsDraw: el.oddsDraw.split('<br>'),
      oddsAway: el.oddsAway.split('<br>'),
    }
  });

  // console.log(droppingOddsOverUnder)

  addDataInDB(moneyWayOverUnder, moneyWay1x2, droppingOddsOverUnder, droppingOdds1x2, correctScore);
}



const addDataInDB = async (moneyWayOverUnder, moneyWay1x2, droppingOddsOverUnder, droppingOdds1x2, correctScore) => {

  const data = {
    moneyWayOverUnder: moneyWayOverUnder,
    moneyWay1x2: moneyWay1x2,
    droppingOddsOverUnder: droppingOddsOverUnder,  
    droppingOdds1x2: droppingOdds1x2,
    correctScore: correctScore,
  }
  footystats(data);
}

export default arbworld;




















// парсим лайв матчи с flashscore

// (async () => {
//     // Поучаем список матчей live с сайта myScore
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("https://www.flashscore.com.ua/");
//     data = await page.evaluate(() => {
//         root = Array.from(document.querySelectorAll(".event__match--live"));
//         matches = root.map(match => ({
//             homeLogo: `https://www.flashscore.com${match.querySelector('.event__logo--home').getAttribute("src")}`,
//             awayLogo: `https://www.flashscore.com${match.querySelector('.event__logo--away').getAttribute("src")}`,
//             homeTeam: match.querySelector('.event__participant--home').textContent.trim(),
//             awayTeam: match.querySelector('.event__participant--away').textContent.trim(),
//             scoreHome: match.querySelector('.event__score--home').textContent.trim(),
//             scoreAway: match.querySelector('.event__score--away').textContent.trim(),
//             minutes: match.querySelector('.event__stage--block').textContent.trim(),
//         }));
//         return matches;
//     });
//     console.log(data)
//     await browser.close();
// })();



        // // Creating express app
        // const app = express()

        // app.use(cors())

        // // Sample api routes for testing
        // app.get('/', (req, res) => {
        //     res.json("welcome to our server")
        // });

        // app.get('/matches', (req, res) => {
        //     res.json({ data })

        // });


        // // Port Number
        // const port = 8000;

        // // Server setup
        // app.listen(port, () => {
        //     console.log(`Server running on port ${port}.`);
        // });
