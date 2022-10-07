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
import betzona from './getBetZona.js';

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

const footystats = (arbworld) => {
  let data = [];
  const options = {
    method: 'GET',
    url: 'https://footystats.org/predictions/',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".betData")
    arrEl.forEach(el => {
      if(el) {
        data.push({
            prediction: el.querySelector('.market-title').textContent,
            odd: el.querySelector('.odds').textContent,
            match: el.querySelector('.matchData').querySelectorAll('li')[0].querySelector('.data').textContent,
            date: el.querySelector('.matchData').querySelectorAll('li')[1].querySelector('.data').textContent,
            league: el.querySelector('.matchData').querySelectorAll('li')[2].querySelector('.data').textContent,
        })
      }
      
    })
    sortData(data, arbworld)
  }).catch(function (error) {
    console.error(error);
  });

};

const sortData = (data, arbworld) => {
  const arr = data.map(el => {
    let matchPos = el.match.indexOf('vs');
    return {
      homeName: el.match.slice(0, matchPos).trim(),
      awayName: el.match.slice(matchPos + 2).trim(),
      predict: el.prediction.slice(6),
      date: el.date,
      odd: el.odd.slice(4),
      league: el.league
    }
  });
  betzona(arr, arbworld)
}

export default footystats;

