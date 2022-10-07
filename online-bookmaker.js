import axios from 'axios';
import cheerio from 'cheerio';
import express from 'express';
import cors from 'cors';
import puppeteer from "puppeteer";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import getFixtures from './getMatches.js';
import { collection, addDoc } from "firebase/firestore";

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

const onlineBookmaker = (betzona, footystat, arbworld) => {
  let arrRattingBookmaker = [];
  const options = {
    method: 'GET',
    url: 'https://online-bookmakers.com/ru/prognozy/futbol/',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".block-events")
    arrEl.forEach(el => {
        arrRattingBookmaker.push({
        nameHome: el.querySelector('.table-result').querySelectorAll('tr')[0].querySelector('.name').textContent,
        nameAway: el.querySelector('.table-result').querySelectorAll('tr')[1].querySelector('.name').textContent,
        predictionOne: el.querySelector('.table-result').querySelectorAll('tr')[0].querySelectorAll('td')[1].textContent,
        predictionTwo: el.querySelector('.table-result').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent,
        text: el.querySelector('.info-spicer').querySelector('p').textContent,
        date: el.querySelector('.wr-items').querySelector('data').textContent,
        league: el.querySelector('.wr-items').querySelector('.items').querySelector('.country').querySelector('a').textContent,
        logoHome: `https://online-bookmakers.com${el.querySelector('.table-result').querySelectorAll('tr')[0].querySelector('.name').querySelector('.team_logo').getAttribute('src')}`,
        logoAway: `https://online-bookmakers.com${el.querySelector('.table-result').querySelectorAll('tr')[1].querySelector('.name').querySelector('.team_logo').getAttribute('src')}`,
        })
    })
    fixString(arrRattingBookmaker, betzona, footystat, arbworld);
  }).catch(function (error) {
    console.error(error);
  });

};

const fixString = (arr, betzona, footystat, arbworld) => {
    let newArr = [];
    arr.forEach(el => {
        newArr.push({
            nameHome: el.nameHome.split('\t').join('').split('\n').join(''),
            nameAway: el.nameAway.split('\t').join('').split('\n').join(''),
            predictionOne: el.predictionOne.split('\t').join('').split('\n').join(''),
            predictionTwo: el.predictionTwo.split('\t').join('').split('\n').join(''),
            text: el.text.split('\t').join('').split('\n').join(''),
            date: el.date.split('\t').join('').split('\n').join(''),
            league: el.league.split('\t').join('').split('\n').join(''),
            logoHome: el.logoHome,
            logoAway: el.logoAway,
        })
        
    })
    getFixtures(newArr, betzona, footystat, arbworld );
}

export default onlineBookmaker;


