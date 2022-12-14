import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import puppeteer from 'puppeteer';
import { app } from '../../firebase.js';

export const vprognoze = async () => {

    const db = getFirestore(app);
    const predictionsRef = collection(db, "predictions");

    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
        })

        let page = await browser.newPage();

        await page.goto('https://vprognoze.ru/forecast/football/', {
            waitUntil: 'domcontentloaded',
        });

        await page.waitForTimeout(3000)

        const predictions = [];

        let data = await page.evaluate(async () => {

            let results = []
            let items = document.querySelectorAll('.forecast-preview')
            items.forEach((item) => {
                if (item.querySelector('.forecast-preview__author-stat').querySelectorAll('.forecast-preview__author-stat-item')[1].querySelectorAll('span')[1].textContent.slice(0, 1) === '+') {
                    results.push({
                        homeName: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_left').querySelector('.forecast-preview__team-name').innerText.trim(),
                        awayNAme: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_right').querySelector('.forecast-preview__team-name').innerText.trim(),
                        predict: item.querySelector('.forecast-preview__extra').querySelector('.forecast-preview__extra-bet').querySelectorAll('.forecast-preview__extra-bet-item')[0]
                            .querySelector('.forecast-preview__extra-bet-item-value').innerText.trim(),
                        text: item.querySelector('.forecast-preview__text').querySelector('.forecast-preview__text-inner').querySelector('div').innerText.trim()
                    })
                }
            })
            return results
        })

        predictions.push(...data);

        await page.click('.pagination.pagination_pages > a:nth-child(3)')
        await page.waitForTimeout(2000)

        let data1 = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.forecast-preview')
            items.forEach((item) => {
                if (item.querySelector('.forecast-preview__author-stat').querySelectorAll('.forecast-preview__author-stat-item')[1].querySelectorAll('span')[1].textContent.slice(0, 1) === '+') {
                    results.push({
                        homeName: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_left').querySelector('.forecast-preview__team-name').innerText.trim(),
                        awayNAme: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_right').querySelector('.forecast-preview__team-name').innerText.trim(),
                        predict: item.querySelector('.forecast-preview__extra').querySelector('.forecast-preview__extra-bet').querySelectorAll('.forecast-preview__extra-bet-item')[0]
                            .querySelector('.forecast-preview__extra-bet-item-value').innerText.trim(),
                        text: item.querySelector('.forecast-preview__text').querySelector('.forecast-preview__text-inner').querySelector('div').innerText.trim()
                    })
                }
            })
            return results
        })

        predictions.push(...data1);

        await page.click('.pagination.pagination_pages > a:nth-child(4)')
        await page.waitForSelector('.forecast-preview')
        await page.waitForTimeout(2000)

        let data2 = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.forecast-preview')
            items.forEach((item) => {
                if (item.querySelector('.forecast-preview__author-stat').querySelectorAll('.forecast-preview__author-stat-item')[1].querySelectorAll('span')[1].textContent.slice(0, 1) === '+') {
                    results.push({
                        homeName: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_left').querySelector('.forecast-preview__team-name').innerText.trim(),
                        awayNAme: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_right').querySelector('.forecast-preview__team-name').innerText.trim(),
                        predict: item.querySelector('.forecast-preview__extra').querySelector('.forecast-preview__extra-bet').querySelectorAll('.forecast-preview__extra-bet-item')[0]
                            .querySelector('.forecast-preview__extra-bet-item-value').innerText.trim(),
                        text: item.querySelector('.forecast-preview__text').querySelector('.forecast-preview__text-inner').querySelector('div').innerText.trim()
                    })
                }
            })
            return results
        })

        predictions.push(...data2);


        await page.click('.pagination.pagination_pages > a:nth-child(5)')
        await page.waitForSelector('.forecast-preview')
        await page.waitForTimeout(2000)

        let data3 = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.forecast-preview')
            items.forEach((item) => {
                if (item.querySelector('.forecast-preview__author-stat').querySelectorAll('.forecast-preview__author-stat-item')[1].querySelectorAll('span')[1].textContent.slice(0, 1) === '+') {
                    results.push({
                        homeName: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_left').querySelector('.forecast-preview__team-name').innerText.trim(),
                        awayNAme: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_right').querySelector('.forecast-preview__team-name').innerText.trim(),
                        predict: item.querySelector('.forecast-preview__extra').querySelector('.forecast-preview__extra-bet').querySelectorAll('.forecast-preview__extra-bet-item')[0]
                            .querySelector('.forecast-preview__extra-bet-item-value').innerText.trim(),
                        text: item.querySelector('.forecast-preview__text').querySelector('.forecast-preview__text-inner').querySelector('div').innerText.trim()
                    })
                }
            })
            return results
        })

        predictions.push(...data3);

        await setDoc(doc(predictionsRef, "vprognoze"), {
            data: [...predictions]
        });

        await browser.close();
    }
    catch (error) {
        console.log(error)
    }
};

