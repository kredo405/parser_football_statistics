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
import arbworld from './arbworld.js';

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

const betShoot = () => {
  let arrTrend = [];
  const options = {
    method: 'GET',
    url: 'https://www.betshoot.com/trends/',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".matchtrends")
    arrEl.forEach(el => {
      if(el) {
        let trends = [];
        let trendsColections = el.querySelectorAll('div');
        trendsColections.forEach(item => {
          trends.push(item.querySelector('.pright').querySelector('.trep').textContent)
        });

        arrTrend.push({
          match: el.querySelector('h3').textContent,
          trends: trends,
        })
      }
      
    })
 
    getOver25Tips(arrTrend)
  }).catch(function (error) {
    console.error(error);
  });

};

const getOver25Tips = (trends) => {
  let arrTipsOver25 = [];
  const options = {
    method: 'GET',
    url: 'https://www.betshoot.com/football/over-25-goals-tips/',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll("section")[0].querySelector('.ok').querySelectorAll('.mth');
    arrEl.forEach(el => {
      if(el) {
        arrTipsOver25.push({
          match: el.querySelector('.teams').textContent,
          odd: el.querySelector('.dcc').textContent,
        })
      }
      
    })
 
    getBTTSTips(trends, arrTipsOver25)
  }).catch(function (error) {
    console.error(error);
  });
}


const getBTTSTips = (trends, arrTipsOver25) => {
  let arrTipsBTTS = [];
  const options = {
    method: 'GET',
    url: 'https://www.betshoot.com/football/both-teams-to-score-tips/',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll("section")[0].querySelector('.ok').querySelectorAll('.mth');
    arrEl.forEach(el => {
      if(el) {
        arrTipsBTTS.push({
          match: el.querySelector('.teams').textContent,
          odd: el.querySelector('.dcc').textContent,
        })
      }
      
    })
 
    connectArr(trends, arrTipsOver25, arrTipsBTTS)
  }).catch(function (error) {
    console.error(error);
  });
}

const connectArr = (trends, arrTipsOver25, arrTipsBTTS) => {
  const res = {
    trends,
    arrTipsOver25,
    arrTipsBTTS
  }

  arbworld(res);
}

export default betShoot;

