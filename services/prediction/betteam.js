import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import puppeteer from 'puppeteer';
import { app } from '../../firebase.js';

export const betteam = async () => {

    const db = getFirestore(app);
    const predictionsRef = collection(db, "predictions");

    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
        })

        let page = await browser.newPage();

        await page.goto('https://betteam.pro/prognozy/futbol', {
            waitUntil: 'domcontentloaded',
        });

        await page.waitForSelector('.main_table')

        await page.waitForTimeout(2000)

        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.main_table > tbody > tr')
            items.forEach((item) => {
                results.push({
                    teamHome: item.querySelector('.teams').querySelector('.teams_name').textContent.trim(),
                    teamAway: item.querySelector('.teams').querySelector('.teams_names') ? item.querySelector('.teams').querySelector('.teams_names').textContent.trim() : null,
                    predict: item.querySelector('.m_show').querySelector('.green.m_show') ? item.querySelector('.m_show').querySelector('.green.m_show').textContent.trim() : null
                })
            })
            return results
        })

        console.log(data)
        await setDoc(doc(predictionsRef, "betteam"), {
            data: [...data]
        });

        await browser.close();
    }
    catch (error) {
        console.log(error)
    }
};
