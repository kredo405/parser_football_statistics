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
import onlineBookmaker from './online-bookmaker.js';

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

const betzona = (footystat, arbworld) => {
  let arrBetZonaLinks = [];
  const options = {
    method: 'GET',
    url: 'https://betzona.ru/bets-sport/prognozi-na-football',
  };

  axios.request(options).then(function (response) {
    // console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".prognoz-selected-list")
    arrEl.forEach(el => {
      arrBetZonaLinks.push(`https://betzona.ru${el.querySelector('.link_flex').getAttribute('href')}`)
    });
    // console.log(arrBetZonaLinks);
    const half = Math.ceil(arrBetZonaLinks.length / 2); 
    const firsArr = arrBetZonaLinks.slice(0, half);
    const secondArr = arrBetZonaLinks.slice(-half);
    getData(firsArr, secondArr, footystat, arbworld);

  }).catch(function (error) {
    console.error(error);
  });

};

const getData = (firsArr, secondArr, footystat, arbworld) => {
  let requests = firsArr.map(url => axios.get(url));

  Promise.all(requests)
    .then(responses => {
      let dataPrediction = [];
      responses.forEach(el => {
        const dom = new JSDOM(el.data)
            let block = dom.window.document.querySelector(".forecast-description")
            dataPrediction.push({
              homeName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.name').textContent,
              awayName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.name').textContent,
              homeLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              awayLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              league: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[0].querySelector('.formatch_data_one').querySelector('.date').textContent,
              date: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[1].querySelector('.formatch_data_one').querySelector('.date').textContent,
              homePreview: {
                info: block.querySelectorAll('.team-info')[0].querySelector('.info').querySelector('p').textContent,
              },
              awayPreview: {
                info: block.querySelectorAll('.team-info')[1].querySelector('.info').querySelector('p').textContent,
              },
              forecast: {
                text: block.querySelector('.forecast-info').querySelector('.bpdr').textContent,
                bet: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.bet_name').textContent,
                odd: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.ratio').textContent,
              }
            })
      });
      getDataSecond(secondArr, dataPrediction, footystat, arbworld);
    }).catch(function (error) {
      console.error(error);
    });
}

const getDataSecond = (secondArr, dataPrediction, footystat, arbworld) => {
  let requests = secondArr.map(url => axios.get(url));

  Promise.all(requests)
    .then(responses => {
      let dataPredictionSecond = [];
      responses.forEach(el => {
        const dom = new JSDOM(el.data)
            let block = dom.window.document.querySelector(".forecast-description")
            dataPredictionSecond.push({
              homeName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.name').textContent,
              awayName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.name').textContent,
              homeLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              awayLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              league: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[0].querySelector('.formatch_data_one').querySelector('.date').textContent,
              date: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[1].querySelector('.formatch_data_one').querySelector('.date').textContent,
              homePreview: {
                info: block.querySelectorAll('.team-info')[0].querySelector('.info').querySelector('p').textContent,
              },
              awayPreview: {
                info: block.querySelectorAll('.team-info')[1].querySelector('.info').querySelector('p').textContent,
              },
              forecast: {
                text: block.querySelector('.forecast-info').querySelector('.bpdr').textContent,
                bet: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.bet_name').textContent,
                odd: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.ratio').textContent,
              }
            })
      });
      onlineBookmaker([...dataPrediction, ...dataPredictionSecond], footystat, arbworld);
    }).catch(function (error) {
      console.error(error);
    });
}

export default betzona;





