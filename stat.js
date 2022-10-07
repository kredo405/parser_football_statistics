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
import { async } from '@firebase/util';
import getFixtures from './getMatches.js';

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

const fbref = (onlineBookmaker, betzona, footystat, arbworld) => {
  let arr = [];

  const getStats = (country, league, id, logo, flag, urlMatches, urlStandartStatsPlayers, urlShootingStatsPlayers) => {

    let statistics = {
      leagueId: id,
      country: country,
      leagueName: league,
      logo: logo,
      flag: flag,
      matches: [],
      standartStatsPlayers: [],
      shootingStatsPlayers: [],
      // standartStatistics: [],
      // standartStatisticsOpponent: [],
      // leagueStatistics: [],
      // shootingStats: [],
      // shootingStatsOpponent: [],
    };

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

    let rand = Math.floor(Math.random() * arr.length);             
    // const options = {
    //   method: 'GET',
    //   url: `${urlLeagueTable}`,
    // };

    // axios.request(options).then(function (response) {
    //   // console.log(response.data);
    //   const dom = new JSDOM(response.data)
    //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
    //   arrEl.forEach(el => {
    //     statistics.leagueStatistics.push({
    //       team: el.querySelector('[data-stat="team"]').querySelector('a') ? el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6) : el.querySelector('[data-stat="team"]').textContent,
    //       rank: el.querySelector('[data-stat="rank"]').textContent,
    //       games: el.querySelector('[data-stat="games"]').textContent,
    //       wins: el.querySelector('[data-stat="wins"]').textContent,
    //       draws: el.querySelector('[data-stat="ties"]').textContent,
    //       losses: el.querySelector('[data-stat="losses"]').textContent,
    //       goals_for: el.querySelector('[data-stat="goals_for"]').textContent,
    //       goals_against: el.querySelector('[data-stat="goals_against"]').textContent,
    //       goal_diff: el.querySelector('[data-stat="goal_diff"]').textContent,
    //       points: el.querySelector('[data-stat="points"]').textContent,
    //       points_avg: el.querySelector('[data-stat="points_avg"]').textContent,
    //     })
    //   })

      // const options1 = {
      //   method: 'GET',
      //   url: `${urlStandartStats}`,
      // };

      // axios.request(options1).then(function (response) {
      //   // console.log(response.data);
      //   const dom = new JSDOM(response.data)
      //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
      //   arrEl.forEach(el => {
      //     statistics.standartStatistics.push({
      //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
      //       players_used: el.querySelector('[data-stat="players_used"]').textContent,
      //       avg_age: el.querySelector('[data-stat="avg_age"]').textContent,
      //       possession: el.querySelector('[data-stat="possession"]').textContent,
      //       cards_yellow: el.querySelector('[data-stat="cards_yellow"]').textContent,
      //       cards_red: el.querySelector('[data-stat="cards_red"]').textContent,
      //       goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
      //       assists_per90: el.querySelector('[data-stat="assists_per90"]').textContent,
      //       goals_assists_per90: el.querySelector('[data-stat="goals_assists_per90"]').textContent,
      //       goals_pens_per90: el.querySelector('[data-stat="goals_pens_per90"]').textContent,
      //       goals_assists_pens_per90: el.querySelector('[data-stat="goals_assists_pens_per90"]').textContent,
      //     })
      //   })

        // const options2 = {
        //   method: 'GET',
        //   url: `${urlStandartStatsOpponent}`,
        // };

        // axios.request(options2).then(function (response) {
        //   // console.log(response.data);
        //   const dom = new JSDOM(response.data)
        //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
        //   arrEl.forEach(el => {
        //     statistics.standartStatisticsOpponent.push({
        //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
        //       players_used: el.querySelector('[data-stat="players_used"]').textContent,
        //       avg_age: el.querySelector('[data-stat="avg_age"]').textContent,
        //       possession: el.querySelector('[data-stat="possession"]').textContent,
        //       cards_yellow: el.querySelector('[data-stat="cards_yellow"]').textContent,
        //       cards_red: el.querySelector('[data-stat="cards_red"]').textContent,
        //       goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
        //       assists_per90: el.querySelector('[data-stat="assists_per90"]').textContent,
        //       goals_assists_per90: el.querySelector('[data-stat="goals_assists_per90"]').textContent,
        //       goals_pens_per90: el.querySelector('[data-stat="goals_pens_per90"]').textContent,
        //       goals_assists_pens_per90: el.querySelector('[data-stat="goals_assists_pens_per90"]').textContent,
        //     })
        //   })

          // const options3 = {
          //   method: 'GET',
          //   url: `${urlShooting}`,
          // };

          // axios.request(options3).then(function (response) {
          //   // console.log(response.data);
          //   const dom = new JSDOM(response.data)
          //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
          //   arrEl.forEach(el => {
          //     statistics.shootingStats.push({
          //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
          //       players_used: el.querySelector('[data-stat="players_used"]').textContent,
          //       minutes_90s: el.querySelector('[data-stat="minutes_90s"]').textContent,
          //       goals: el.querySelector('[data-stat="goals"]').textContent,
          //       shots_total: el.querySelector('[data-stat="shots_total"]').textContent,
          //       shots_on_target: el.querySelector('[data-stat="shots_on_target"]').textContent,
          //       shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
          //       shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
          //       shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
          //       goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
          //       goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
          //     })
          //   })

            // const options4 = {
            //   method: 'GET',
            //   url: `${urlShootingOpponent}`,
            // };

            // axios.request(options4).then(function (response) {
            //   // console.log(response.data);
            //   const dom = new JSDOM(response.data)
            //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
            //   arrEl.forEach(el => {
            //     statistics.shootingStatsOpponent.push({
            //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
            //       players_used: el.querySelector('[data-stat="players_used"]').textContent,
            //       minutes_90s: el.querySelector('[data-stat="minutes_90s"]').textContent,
            //       goals: el.querySelector('[data-stat="goals"]').textContent,
            //       shots_total: el.querySelector('[data-stat="shots_total"]').textContent,
            //       shots_on_target: el.querySelector('[data-stat="shots_on_target"]').textContent,
            //       shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
            //       shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
            //       shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
            //       goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
            //       goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
            //     })
            //   })
              const options5 = {
                method: 'GET',
                url: `${urlStandartStatsPlayers}`,
                headers: {
                  'User-Agent': desktop_agents[rand],
                } 
              };

              axios.request(options5).then(function (response) {
                const dom = new JSDOM(response.data)
                let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                arrEl.forEach(el => {
                  if (el.querySelector('[data-stat="player"]').querySelector('a')) {
                    statistics.standartStatsPlayers.push({
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
                const options6 = {
                  method: 'GET',
                  url: `${urlMatches}`,
                  headers: {
                    'User-Agent': desktop_agents[rand],
                  } 
                };

                axios.request(options6).then(function (response) {
                  const dom = new JSDOM(response.data)
                  let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                  arrEl.forEach(el => {
                    if (el.querySelector('[data-stat="home_team"]').querySelector('a') && el.querySelector('[data-stat="away_team"]').querySelector('a')) {
                      statistics.matches.push({
                        homeTeam: el.querySelector('[data-stat="home_team"]').querySelector('a').textContent,
                        awayTeam: el.querySelector('[data-stat="away_team"]').querySelector('a').textContent,
                        date: el.querySelector('[data-stat="date"]') ? el.querySelector('[data-stat="date"]').querySelector('a').textContent : null,
                        time: el.querySelector('[data-stat="start_time"]').querySelector('.venuetime') ?
                          el.querySelector('[data-stat="start_time"]').querySelector('.venuetime').textContent :
                          el.querySelector('[data-stat="start_time"]').textContent,
                        score: el.querySelector('[data-stat="score"]').querySelector('a') ?
                          el.querySelector('[data-stat="score"]').querySelector('a').textContent :
                          el.querySelector('[data-stat="score"]').textContent,
                      })
                    }
                  });
                  const options7 = {
                    method: 'GET',
                    url: `${urlShootingStatsPlayers}`,
                    headers: {
                      'User-Agent': desktop_agents[rand],
                    } 
                  };

                  axios.request(options7).then(function (response) {
                    const dom = new JSDOM(response.data)
                    let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                    arrEl.forEach(el => {
                      if (el.querySelector('[data-stat="player"]').querySelector('a')) {
                        statistics.shootingStatsPlayers.push({
                          player: el.querySelector('[data-stat="player"]').querySelector('a').textContent,
                          position: el.querySelector('[data-stat="position"]').textContent,
                          team: el.querySelector('[data-stat="team"]').querySelector('a').textContent,
                          year: el.querySelector('[data-stat="birth_year"]').textContent,
                          shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
                          shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
                          shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
                          goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
                          goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
                        })
                      }
                    });
                    arr.push(statistics);
                  }).catch(function (error) {
                    console.error(error);
                  });
                }).catch(function (error) {
                  console.error(error);
                });
              }).catch(function (error) {
                console.error(error);
              });
  }

  const getStatsTop = (country, league, id, logo, flag, urlMatches, urlStandartStatsPlayers, urlShootingStatsPlayers) => {

    let statistics = {
      leagueId: id,
      country: country,
      leagueName: league,
      logo: logo,
      flag: flag,
      matches: [],
      standartStatsPlayers: [],
      shootingStatsPlayers: [],
      // standartStatistics: [],
      // standartStatisticsOpponent: [],
      // leagueStatistics: [],
      // shootingStats: [],
      // shootingStatsOpponent: [],
    };

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

    let rand = Math.floor(Math.random() * arr.length);     
    // const options = {
    //   method: 'GET',
    //   url: `${urlLeagueTable}`,
    // };

    // axios.request(options).then(function (response) {
    //   // console.log(response.data);
    //   const dom = new JSDOM(response.data)
    //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
    //   arrEl.forEach(el => {
    //     statistics.leagueStatistics.push({
    //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
    //       rank: el.querySelector('[data-stat="rank"]').textContent,
    //       games: el.querySelector('[data-stat="games"]').textContent,
    //       wins: el.querySelector('[data-stat="wins"]').textContent,
    //       draws: el.querySelector('[data-stat="ties"]').textContent,
    //       losses: el.querySelector('[data-stat="losses"]').textContent,
    //       goals_for: el.querySelector('[data-stat="goals_for"]').textContent,
    //       goals_against: el.querySelector('[data-stat="goals_against"]').textContent,
    //       goal_diff: el.querySelector('[data-stat="goal_diff"]').textContent,
    //       points: el.querySelector('[data-stat="points"]').textContent,
    //       points_avg: el.querySelector('[data-stat="points_avg"]').textContent,
    //       xg_for: el.querySelector('[data-stat="xg_for"]').textContent,
    //       xg_against: el.querySelector('[data-stat="xg_against"]').textContent,
    //       points: el.querySelector('[data-stat="xg_diff"]').textContent,
    //       xg_diff_per90: el.querySelector('[data-stat="xg_diff_per90"]').textContent,
    //     })
    //   })

      // const options1 = {
      //   method: 'GET',
      //   url: `${urlStandartStats}`,
      // };

      // axios.request(options1).then(function (response) {
      //   // console.log(response.data);
      //   const dom = new JSDOM(response.data)
      //   let arrEl = dom.window.document.querySelectorAll("tbody > tr")
      //   arrEl.forEach(el => {
      //     statistics.standartStatistics.push({
      //       team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
      //       players_used: el.querySelector('[data-stat="players_used"]').textContent,
      //       avg_age: el.querySelector('[data-stat="avg_age"]').textContent,
      //       possession: el.querySelector('[data-stat="possession"]').textContent,
      //       cards_yellow: el.querySelector('[data-stat="cards_yellow"]').textContent,
      //       cards_red: el.querySelector('[data-stat="cards_red"]').textContent,
      //       goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
      //       assists_per90: el.querySelector('[data-stat="assists_per90"]').textContent,
      //       goals_assists_per90: el.querySelector('[data-stat="goals_assists_per90"]').textContent,
      //       goals_pens_per90: el.querySelector('[data-stat="goals_pens_per90"]').textContent,
      //       goals_assists_pens_per90: el.querySelector('[data-stat="goals_assists_pens_per90"]').textContent,
      //       xg: el.querySelector('[data-stat="xg"]').textContent,
      //       npxg: el.querySelector('[data-stat="npxg"]').textContent,
      //       xa: el.querySelector('[data-stat="xa"]').textContent,
      //       npxg_xa: el.querySelector('[data-stat="npxg_xa"]').textContent,
      //       xg_per90: el.querySelector('[data-stat="xg_per90"]').textContent,
      //       xa_per90: el.querySelector('[data-stat="xa_per90"]').textContent,
      //       xg_xa_per90: el.querySelector('[data-stat="xg_xa_per90"]').textContent,
      //       npxg_per90: el.querySelector('[data-stat="npxg_per90"]').textContent,
      //       npxg_xa_per90: el.querySelector('[data-stat="npxg_xa_per90"]').textContent,
      //     })
      //   })

      //   const options2 = {
      //     method: 'GET',
      //     url: `${urlStandartStatsOpponent}`,
      //   };

      //   axios.request(options2).then(function (response) {
      //     // console.log(response.data);
      //     const dom = new JSDOM(response.data)
      //     let arrEl = dom.window.document.querySelectorAll("tbody > tr")
      //     arrEl.forEach(el => {
      //       statistics.standartStatisticsOpponent.push({
      //         team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
      //         players_used: el.querySelector('[data-stat="players_used"]').textContent,
      //         avg_age: el.querySelector('[data-stat="avg_age"]').textContent,
      //         possession: el.querySelector('[data-stat="possession"]').textContent,
      //         cards_yellow: el.querySelector('[data-stat="cards_yellow"]').textContent,
      //         cards_red: el.querySelector('[data-stat="cards_red"]').textContent,
      //         goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
      //         assists_per90: el.querySelector('[data-stat="assists_per90"]').textContent,
      //         goals_assists_per90: el.querySelector('[data-stat="goals_assists_per90"]').textContent,
      //         goals_pens_per90: el.querySelector('[data-stat="goals_pens_per90"]').textContent,
      //         goals_assists_pens_per90: el.querySelector('[data-stat="goals_assists_pens_per90"]').textContent,
      //         xg: el.querySelector('[data-stat="xg"]').textContent,
      //         npxg: el.querySelector('[data-stat="npxg"]').textContent,
      //         xa: el.querySelector('[data-stat="xa"]').textContent,
      //         npxg_xa: el.querySelector('[data-stat="npxg_xa"]').textContent,
      //         xg_per90: el.querySelector('[data-stat="xg_per90"]').textContent,
      //         xa_per90: el.querySelector('[data-stat="xa_per90"]').textContent,
      //         xg_xa_per90: el.querySelector('[data-stat="xg_xa_per90"]').textContent,
      //         npxg_per90: el.querySelector('[data-stat="npxg_per90"]').textContent,
      //         npxg_xa_per90: el.querySelector('[data-stat="npxg_xa_per90"]').textContent,
      //       })
      //     })

      //     const options3 = {
      //       method: 'GET',
      //       url: `${urlShooting}`,
      //     };

      //     axios.request(options3).then(function (response) {
      //       // console.log(response.data);
      //       const dom = new JSDOM(response.data)
      //       let arrEl = dom.window.document.querySelectorAll("tbody > tr")
      //       arrEl.forEach(el => {
      //         ;
      //         statistics.shootingStats.push({
      //           team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
      //           players_used: el.querySelector('[data-stat="players_used"]').textContent,
      //           minutes_90s: el.querySelector('[data-stat="minutes_90s"]').textContent,
      //           goals: el.querySelector('[data-stat="goals"]').textContent,
      //           shots_total: el.querySelector('[data-stat="shots_total"]').textContent,
      //           shots_on_target: el.querySelector('[data-stat="shots_on_target"]').textContent,
      //           shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
      //           shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
      //           shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
      //           goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
      //           goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
      //           xg: el.querySelector('[data-stat="xg"]').textContent,
      //           npxg: el.querySelector('[data-stat="npxg"]').textContent,
      //           npxg_per_shot: el.querySelector('[data-stat="npxg_per_shot"]').textContent,
      //           xg_net: el.querySelector('[data-stat="xg_net"]').textContent,
      //           npxg_net: el.querySelector('[data-stat="npxg_net"]').textContent,
      //         })
      //       })

      //       const options4 = {
      //         method: 'GET',
      //         url: `${urlShootingOpponent}`,
      //       };

      //       axios.request(options4).then(function (response) {
      //         // console.log(response.data);
      //         const dom = new JSDOM(response.data)
      //         let arrEl = dom.window.document.querySelectorAll("tbody > tr")
      //         arrEl.forEach(el => {
      //           statistics.shootingStatsOpponent.push({
      //             team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
      //             players_used: el.querySelector('[data-stat="players_used"]').textContent,
      //             minutes_90s: el.querySelector('[data-stat="minutes_90s"]').textContent,
      //             goals: el.querySelector('[data-stat="goals"]').textContent,
      //             shots_total: el.querySelector('[data-stat="shots_total"]') ? el.querySelector('[data-stat="shots_total"]').textContent : null,
      //             shots_on_target: el.querySelector('[data-stat="shots_on_target"]').textContent,
      //             shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
      //             shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
      //             shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
      //             goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
      //             goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
      //             xg: el.querySelector('[data-stat="xg"]').textContent,
      //             npxg: el.querySelector('[data-stat="npxg"]').textContent,
      //             npxg_per_shot: el.querySelector('[data-stat="npxg_per_shot"]').textContent,
      //             xg_net: el.querySelector('[data-stat="xg_net"]').textContent,
      //             npxg_net: el.querySelector('[data-stat="npxg_net"]').textContent,
      //           })
      //         })

              const options5 = {
                method: 'GET',
                url: `${urlStandartStatsPlayers}`,
                headers: {
                      'User-Agent': desktop_agents[rand],
                    } 
              };
              axios.request(options5).then(function (response) {
                const dom = new JSDOM(response.data)
                let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                arrEl.forEach(el => {
                  if (el.querySelector('[data-stat="player"]').querySelector('a')) {
                    statistics.standartStatsPlayers.push({
                      player: el.querySelector('[data-stat="player"]').querySelector('a').textContent,
                      position: el.querySelector('[data-stat="position"]').textContent,
                      team: el.querySelector('[data-stat="team"]').querySelector('a').textContent,
                      games: el.querySelector('[data-stat="games"]') ? el.querySelector('[data-stat="games"]').textContent : null,
                      games_starts: el.querySelector('[data-stat="games_starts"]') ? el.querySelector('[data-stat="games_starts"]').textContent : null,
                      minutes: el.querySelector('[data-stat="minutes"]') ? el.querySelector('[data-stat="minutes"]').textContent : null,
                      goals: el.querySelector('[data-stat="goals"]') ? el.querySelector('[data-stat="goals"]').textContent : null,
                      assists: el.querySelector('[data-stat="assists"]').textContent,
                      goals_per90: el.querySelector('[data-stat="goals_per90"]').textContent,
                      xg: el.querySelector('[data-stat="xg"]') ? el.querySelector('[data-stat="xg"]').textContent : null,
                      xg_per90: el.querySelector('[data-stat="xg_per90"]') ? el.querySelector('[data-stat="xg_per90"]').textContent : null,
                    })
                  }
                });

                const options6 = {
                  method: 'GET',
                  url: `${urlMatches}`,
                  headers: {
                    'User-Agent': desktop_agents[rand],
                  } 
                };

                axios.request(options6).then(function (response) {
                  const dom = new JSDOM(response.data)
                  let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                  arrEl.forEach(el => {
                    if (el.querySelector('[data-stat="home_team"]').querySelector('a') && el.querySelector('[data-stat="away_team"]').querySelector('a')) {
                      statistics.matches.push({
                        homeTeam: el.querySelector('[data-stat="home_team"]').querySelector('a').textContent,
                        awayTeam: el.querySelector('[data-stat="away_team"]').querySelector('a').textContent,
                        date: el.querySelector('[data-stat="date"]') ? el.querySelector('[data-stat="date"]').querySelector('a').textContent : null,
                        time: el.querySelector('[data-stat="start_time"]').querySelector('.venuetime') ?
                          el.querySelector('[data-stat="start_time"]').querySelector('.venuetime').textContent :
                          el.querySelector('[data-stat="start_time"]').textContent,
                        score: el.querySelector('[data-stat="score"]').querySelector('a') ?
                          el.querySelector('[data-stat="score"]').querySelector('a').textContent :
                          el.querySelector('[data-stat="score"]').textContent,
                      })
                    }
                  });

                  const options7 = {
                    method: 'GET',
                    url: `${urlShootingStatsPlayers}`,
                    headers: {
                      'User-Agent': desktop_agents[rand],
                    } 
                  };

                  axios.request(options7).then(function (response) {
                    const dom = new JSDOM(response.data)
                    let arrEl = dom.window.document.querySelectorAll("tbody>tr")
                    arrEl.forEach(el => {
                      if (el.querySelector('[data-stat="player"]').querySelector('a')) {
                        statistics.shootingStatsPlayers.push({
                          player: el.querySelector('[data-stat="player"]').querySelector('a').textContent,
                          position: el.querySelector('[data-stat="position"]').textContent,
                          team: el.querySelector('[data-stat="team"]').querySelector('a').textContent,
                          year: el.querySelector('[data-stat="birth_year"]').textContent,
                          shots_on_target_pct: el.querySelector('[data-stat="shots_on_target_pct"]').textContent,
                          shots_total_per90: el.querySelector('[data-stat="shots_total_per90"]').textContent,
                          shots_on_target_per90: el.querySelector('[data-stat="shots_on_target_per90"]').textContent,
                          goals_per_shot: el.querySelector('[data-stat="goals_per_shot"]').textContent,
                          goals_per_shot_on_target: el.querySelector('[data-stat="goals_per_shot_on_target"]').textContent,
                        })
                      }
                    });
                    arr.push(statistics);
                  }).catch(function (error) {
                    console.error(error);
                  });
                }).catch(function (error) {
                  console.error(error);
                });
              }).catch(function (error) {
                console.error(error);
              });
  }

  const leagues1 = [
    {
      country: 'Argentina',
      league: 'Liga Profesional Argentina',
      id: 128,
      flag: "https://media.api-sports.io/flags/ar.svg",
      logo: "https://media.api-sports.io/football/leagues/128.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2FPrimera-Division-Stats&div=div_results2022211_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2FPrimera-Division-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2FPrimera-Division-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2FPrimera-Division-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2FPrimera-Division-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F21%2Fschedule%2FPrimera-Division-Scores-and-Fixtures&div=div_sched_2022_21_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2Fstats%2FPremier-League-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2Fshooting%2FPremier-League-Stats&div=div_stats_shooting'
    },
    {
      country: 'Australia',
      league: 'A-League',
      id: 188,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F65%2F2022-2023%2F2022-2023-A-League-Men-Stats&div=div_results2022-2023650_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F65%2FA-League-Men-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F65%2FA-League-Men-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F65%2FA-League-Men-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F65%2FA-League-Men-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Austria',
      league: 'Bundesliga',
      id: 218,
      flag: "https://media.api-sports.io/flags/at.svg",
      logo: "https://media.api-sports.io/football/leagues/218.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2FAustrian-Bundesliga-Stats&div=div_results2022-2023560_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2FAustrian-Bundesliga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2FAustrian-Bundesliga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2FAustrian-Bundesliga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2FAustrian-Bundesliga-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2Fschedule%2FAustrian-Bundesliga-Scores-and-Fixtures&div=div_sched_2022-2023_56_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2Fstats%2FAustrian-Bundesliga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F56%2Fshooting%2FAustrian-Bundesliga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Belgium',
      league: 'Jupiler Pro League',
      id: 144,
      flag: "https://media.api-sports.io/flags/be.svg",
      logo: "https://media.api-sports.io/football/leagues/144.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2FBelgian-First-Division-A-Stats&div=div_results2022-2023370_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2FBelgian-First-Division-A-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2FBelgian-First-Division-A-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2FBelgian-First-Division-A-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2FBelgian-First-Division-A-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2Fschedule%2FBelgian-First-Division-A-Scores-and-Fixtures&div=div_sched_2022-2023_37_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2Fstats%2FBelgian-First-Division-A-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F37%2Fshooting%2FBelgian-First-Division-A-Stats&div=div_stats_shooting'
    },
    {
      country: 'Brazil',
      league: 'Serie A',
      id: 71,
      flag: "https://media.api-sports.io/flags/br.svg",
      logo: "https://media.api-sports.io/football/leagues/71.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2FSerie-A-Stats&div=div_results2022241_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2FSerie-A-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2FSerie-A-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2FSerie-A-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2FSerie-A-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2Fschedule%2FSerie-A-Scores-and-Fixtures&div=div_sched_2022_24_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2Fstats%2FSerie-A-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2Fshooting%2FSerie-A-Stats&div=div_stats_shooting'
    },
    {
      country: 'Brazil',
      league: 'Serie B',
      id: 72,
      flag: "https://media.api-sports.io/flags/br.svg",
      logoLeague: "https://media.api-sports.io/football/leagues/72.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2FSerie-B-Stats&div=div_results2022381_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2FSerie-B-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2FSerie-B-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2FSerie-B-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2FSerie-B-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2Fschedule%2FSerie-B-Scores-and-Fixtures&div=div_sched_2022_24_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F38%2Fstats%2FSerie-B-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F24%2Fshooting%2FSerie-B-Stats&div=div_stats_shooting'
    },
    {
      country: 'Chile',
      league: 'Primera División',
      id: 265,
      flag: "https://media.api-sports.io/flags/cl.svg",
      logo: "https://media.api-sports.io/football/leagues/265.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F35%2FPrimera-Division-Stats&div=div_results2022351_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F35%2FPrimera-Division-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F35%2FPrimera-Division-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F35%2FPrimera-Division-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F35%2FPrimera-Division-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },                      
    {
      country: 'China',
      league: 'Super League',
      id: 169,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F62%2FChinese-Super-League-Stats&div=div_results2022621_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F62%2FChinese-Super-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F62%2FChinese-Super-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F62%2FChinese-Super-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F62%2FChinese-Super-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Colombia',
      league: 'Primera A',
      id: 239,
      flag: "https://media.api-sports.io/flags/co.svg",
      logo: "https://media.api-sports.io/football/leagues/239.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F41%2FCategoria-Primera-A-Stats&div=div_results2022410_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F41%2FCategoria-Primera-A-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F41%2FCategoria-Primera-A-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F41%2FCategoria-Primera-A-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F41%2FCategoria-Primera-A-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Denmark',
      league: 'Superliga',
      id: 119,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2FSuperliga-Stats&div=div_results2022-2023500_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2FSuperliga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2FSuperliga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2FSuperliga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2FSuperliga-Stats&div=div_stats_squads_shooting_against',
      // fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fschedule%2FSuperliga-Scores-and-Fixtures&div=div_sched_2022-2023_50_1',
      // standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fstats%2FSuperliga-Stats&div=div_stats_standard',
      // shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fshooting%2FSuperliga-Stats&div=div_stats_shooting',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'England',
      league: 'Championship',
      id: 40,
      flag: "https://media.api-sports.io/flags/gb.svg",
      logo: "https://media.api-sports.io/football/leagues/40.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F10%2FChampionship-Stats&div=div_results2022-2023101_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F10%2FChampionship-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F10%2FChampionship-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F10%2FChampionship-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F10%2FChampionship-Stats&div=div_stats_squads_shooting_against',
      // fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fschedule%2FSuperliga-Scores-and-Fixtures&div=div_sched_2022-2023_50_1',
      // standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fstats%2FSuperliga-Stats&div=div_stats_standard',
      // shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F50%2Fshooting%2FSuperliga-Stats&div=div_stats_shooting',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'England',
      league: 'League One',
      id: 41,
      flag: "https://media.api-sports.io/flags/gb.svg",
      logo: "https://media.api-sports.io/football/leagues/41.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F15%2FLeague-One-Stats&div=div_results2022-2023151_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F15%2FLeague-One-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F15%2FLeague-One-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F15%2FLeague-One-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F15%2FLeague-One-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'England',
      league: 'League Two',
      id: 42,
      flag: "https://media.api-sports.io/flags/gb.svg",
      logo: "https://media.api-sports.io/football/leagues/42.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F16%2FLeague-Two-Stats&div=div_results2022-2023161_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F16%2FLeague-Two-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F16%2FLeague-Two-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F16%2FLeague-Two-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F16%2FLeague-Two-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'France',
      league: 'Ligue 2',
      id: 62,
      flag: "https://media.api-sports.io/flags/fr.svg",
      logo: "https://media.api-sports.io/football/leagues/62.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F60%2FLigue-2-Stats&div=div_results2022-2023601_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F60%2FLigue-2-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F60%2FLigue-2-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F60%2FLigue-2-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F60%2FLigue-2-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Germany',
      league: '2. Bundesliga',
      id: 79,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/79.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F33%2F2-Bundesliga-Stats&div=div_results2022-2023331_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F33%2F2-Bundesliga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F33%2F2-Bundesliga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F33%2F2-Bundesliga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F33%2F2-Bundesliga-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'India',
      league: 'Indian Super League',
      id: 323,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F82%2FIndian-Super-League-Stats&div=div_results2021-2022821_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F82%2FIndian-Super-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F82%2FIndian-Super-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F82%2FIndian-Super-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F82%2FIndian-Super-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Italy',
      league: 'Serie B',
      id: 136,
      flag: "https://media.api-sports.io/flags/it.svg",
      logo: "https://media.api-sports.io/football/leagues/136.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F18%2FSerie-B-Stats&div=div_results2022-2023181_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F18%2FSerie-B-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F18%2FSerie-B-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F18%2FSerie-B-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F18%2FSerie-B-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
  ];


  const leagues2 = [
    {
      country: 'Japan',
      league: 'J1 League',
      id: 98,
      flag: "https://media.api-sports.io/flags/jp.svg",
      logo: "https://media.api-sports.io/football/leagues/98.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F25%2FJ1-League-Stats&div=div_results2022251_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F25%2FJ1-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F25%2FJ1-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F25%2FJ1-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F25%2FJ1-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Mexico',
      league: 'Liga MX',
      id: 262,
      flag: "https://media.api-sports.io/flags/mx.svg",
      logo: "https://media.api-sports.io/football/leagues/262.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F31%2FLiga-MX-Stats&div=div_results2022-2023311_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F31%2FLiga-MX-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F31%2FLiga-MX-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F31%2FLiga-MX-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F31%2FLiga-MX-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Netherlands',
      league: 'Eredivisie',
      id: 88,
      flag: "https://media.api-sports.io/flags/nl.svg",
      logo: "https://media.api-sports.io/football/leagues/88.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F23%2FEredivisie-Stats&div=div_results2022-2023231_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F23%2FEredivisie-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F23%2FEredivisie-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F23%2FEredivisie-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F23%2FEredivisie-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Netherlands',
      league: 'Eerste Divisie',
      id: 89,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F51%2FEerste-Divisie-Stats&div=div_results2022-2023511_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F51%2FEerste-Divisie-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F51%2FEerste-Divisie-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F51%2FEerste-Divisie-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F51%2FEerste-Divisie-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Norway',
      league: 'Eliteserien',
      id: 103,
      flag: "https://media.api-sports.io/flags/no.svg",
      logo: "https://media.api-sports.io/football/leagues/103.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F28%2FEliteserien-Stats&div=div_results2022281_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F28%2FEliteserien-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F28%2FEliteserien-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F28%2FEliteserien-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F28%2FEliteserien-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Portugal',
      league: 'Primeira Liga',
      id: 94,
      flag: "https://media.api-sports.io/flags/pt.svg",
      logo: "https://media.api-sports.io/football/leagues/94.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F32%2FPrimeira-Liga-Stats&div=div_results2022-2023321_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F32%2FPrimeira-Liga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F32%2FPrimeira-Liga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F32%2FPrimeira-Liga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F32%2FPrimeira-Liga-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Russia',
      league: 'Premier League',
      id: 235,
      flag: "https://media.api-sports.io/flags/ru.svg",
      logo: "https://media.api-sports.io/football/leagues/235.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F30%2FRussian-Premier-League-Stats&div=div_results2022-2023301_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F30%2FRussian-Premier-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F30%2FRussian-Premier-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F30%2FRussian-Premier-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F30%2FRussian-Premier-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Scotland',
      league: 'Premiership',
      id: 179,
      flag: "https://media.api-sports.io/flags/gb.svg",
      logo: "https://media.api-sports.io/football/leagues/179.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F40%2FScottish-Premiership-Stats&div=div_results2022-2023400_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F40%2FScottish-Premiership-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F40%2FScottish-Premiership-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F40%2FScottish-Premiership-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F40%2FScottish-Premiership-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Spain',
      league: 'Segunda División',
      id: 141,
      flag: "https://media.api-sports.io/flags/es.svg",
      logo: "https://media.api-sports.io/football/leagues/141.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F17%2FSegunda-Division-Stats&div=div_results2022-2023171_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F17%2FSegunda-Division-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F17%2FSegunda-Division-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F17%2FSegunda-Division-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F17%2FSegunda-Division-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Sweden',
      league: 'Allsvenskan',
      id: 113,
      flag: "https://media.api-sports.io/flags/se.svg",
      logo: "https://media.api-sports.io/football/leagues/113.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F29%2FAllsvenskan-Stats&div=div_results2022291_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F29%2FAllsvenskan-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F29%2FAllsvenskan-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F29%2FAllsvenskan-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F29%2FAllsvenskan-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Switzerland',
      league: 'Super League',
      id: 207,
      flag: "https://media.api-sports.io/flags/ch.svg",
      logo: "https://media.api-sports.io/football/leagues/207.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F57%2FSwiss-Super-League-Stats&div=div_results2022-2023571_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F57%2FSwiss-Super-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F57%2FSwiss-Super-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F57%2FSwiss-Super-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F57%2FSwiss-Super-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Turkey',
      league: 'Süper Lig',
      id: 203,
      flag: "https://media.api-sports.io/flags/tr.svg",
      logo: "https://media.api-sports.io/football/leagues/203.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F26%2FSuper-Lig-Stats&div=div_results2022-2023261_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F26%2FSuper-Lig-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F26%2FSuper-Lig-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F26%2FSuper-Lig-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F26%2FSuper-Lig-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
  ]

  const leagueTop = [
    {
      country: 'England',
      league: 'Premier League',
      id: 39,
      flag: "https://media.api-sports.io/flags/gb.svg",
      logo: "https://media.api-sports.io/football/leagues/39.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2FPremier-League-Stats&div=div_results2022-202391_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2FPremier-League-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2FPremier-League-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2FPremier-League-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2FPremier-League-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2Fschedule%2FPremier-League-Scores-and-Fixtures&div=div_sched_2022-2023_9_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2Fstats%2FPremier-League-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F9%2Fshooting%2FPremier-League-Stats&div=div_stats_shooting'
    },
    {
      country: 'France',
      league: 'Ligue 1',
      id: 61,
      flag: "https://media.api-sports.io/flags/fr.svg",
      logo: "https://media.api-sports.io/football/leagues/61.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_results2022-2023131_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2Fschedule%2FLigue-1-Scores-and-Fixtures&div=div_sched_2022-2023_13_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2Fstats%2FLigue-1-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2Fshooting%2FLigue-1-Stats&div=div_stats_shooting'
    },
    {
      country: 'Germany',
      league: 'Bundesliga',
      id: 78,
      flag: "https://media.api-sports.io/flags/de.svg",
      logo: "https://media.api-sports.io/football/leagues/78.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2FBundesliga-Stats&div=div_results2022-2023201_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2FBundesliga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2FBundesliga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2FBundesliga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2FBundesliga-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2Fschedule%2FBundesliga-Scores-and-Fixtures&div=div_sched_2022-2023_20_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2Fstats%2FBundesliga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F20%2Fshooting%2FBundesliga-Stats&div=div_stats_shooting'
    },
    {
      country: 'Italy',
      league: 'Serie A',
      id: 135,
      flag: "https://media.api-sports.io/flags/it.svg",
      logo: "https://media.api-sports.io/football/leagues/135.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2FSerie-A-Stats&div=div_results2022-2023111_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2FSerie-A-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2FSerie-A-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2FSerie-A-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2FSerie-A-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2Fschedule%2FSerie-A-Scores-and-Fixtures&div=div_sched_2022-2023_11_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2Fstats%2FSerie-A-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2Fshooting%2FSerie-A-Stats&div=div_stats_shooting'
    },
    {
      country: 'Spain',
      league: 'La Liga',
      id: 140,
      flag: "https://media.api-sports.io/flags/es.svg",
      logo: "https://media.api-sports.io/football/leagues/140.png",
      // urlLeagueTable: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2FLa-Liga-Stats&div=div_results2022-2023121_overall',
      // urlStandartStats: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2FLa-Liga-Stats&div=div_stats_squads_standard_for',
      // urlStandartStatsOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2FLa-Liga-Stats&div=div_stats_squads_standard_against',
      // urlShooting: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2FLa-Liga-Stats&div=div_stats_squads_shooting_for',
      // urlShootingOpponent: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2FLa-Liga-Stats&div=div_stats_squads_shooting_against',
      fixtures: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fschedule%2FLa-Liga-Scores-and-Fixtures&div=div_sched_2022-2023_12_1',
      standartStatsPlayers: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fstats%2FLa-Liga-Stats&div=div_stats_standard',
      shootingStatsPlayer: 'https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F12%2Fshooting%2FLa-Liga-Stats&div=div_stats_shooting'
    },
  ]

  leagueTop.forEach(el => {
    getStatsTop(el.country, el.league, el.id, el.logo, el.flag, el.fixtures, el.standartStatsPlayers, el.shootingStatsPlayer);
  })

  setTimeout(() => {
    leagues1.forEach(el => {
      getStats(el.country, el.league, el.id, el.logo, el.flag, el.fixtures, el.standartStatsPlayers, el.shootingStatsPlayer,);
    })
  }, 50000);

  setTimeout(() => {
    leagues2.forEach(el => {
      getStats(el.country, el.league, el.id, el.logo, el.flag, el.fixtures, el.standartStatsPlayers, el.shootingStatsPlayer);
    })
  }, 100000);

  setTimeout(() => {
    getFixtures(onlineBookmaker, betzona, footystat, arbworld, arr)

  }, 150000)
};

export default fbref;
