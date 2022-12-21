import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import puppeteer from 'puppeteer';
import { app } from '../../firebase.js';

export const getDataFromMatches = async (link, league) => {

    const db = getFirestore(app);
    const predictionsRef = collection(db, "fbrefMatches");

    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu',
            ],
        })

        const page = await browser.newPage();

        await page.goto(`${link}`, {
            waitUntil: 'domcontentloaded',
        });

        console.log(await page.content())

        const resultsSelector = '.stats_table';
        await page.waitForSelector(resultsSelector);

        let data = await page.evaluate(() => {
            const matches = []

            document.querySelector('.stats_table').querySelector('tbody').querySelectorAll('tr').forEach(el => {
                if (el.querySelector('[data-stat="score"]').textContent !== '' && el.querySelector('[data-stat="home_team"]').textContent !== 'Home') {
                    const pos = el.querySelector('[data-stat="score"]').querySelector('a').getAttribute('href').indexOf('Stats')
                    matches.push({
                        date: el.querySelector('[data-stat="date"]').querySelector('a').textContent.trim(),
                        homeTeam: el.querySelector('[data-stat="home_team"]').querySelector('a').getAttribute('href').slice(20, pos - 5).trim(),
                        awayTeam: el.querySelector('[data-stat="away_team"]').querySelector('a').getAttribute('href').slice(20, pos - 5).trim(),
                        homeXg: el.querySelector('[data-stat="home_xg"]').textContent.trim(),
                        awayXg: el.querySelector('[data-stat="away_xg"]').textContent.trim(),
                        scoreHome: el.querySelector('[data-stat="score"]').querySelector('a').textContent.trim().slice(0, 1),
                        scoreAway: el.querySelector('[data-stat="score"]').querySelector('a').textContent.trim().slice(2),
                    })
                }
            })

            return matches
        })

        console.log(data)
        await setDoc(doc(predictionsRef, `${league}`), {
            data: [...data]
        });

        await browser.close();
    }
    catch (error) {
        console.log(error)
    }
};



