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
    url: 'https://betteam.pro/prognozy/futbol',
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    const dom = new JSDOM(response.data)
    let arrEl = dom.window.document.querySelectorAll(".main_table>tbody>tr")
    arrEl.forEach(el => {
      if(el) {
        arrTrend.push({
          match: el.querySelector('.teams').querySelector('.flex_center').querySelector('a').querySelectorAll('.teams_name')[0].textContent,
        })
      }
      
    });

    console.log(arrTrend)
 
    
  }).catch(function (error) {
    console.error(error);
  });

};

betShoot()


export default betShoot;

