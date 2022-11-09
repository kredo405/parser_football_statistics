import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import puppeteer from 'puppeteer';

export const vprognoze = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
        })

        let page = await browser.newPage();

        await page.goto('https://vprognoze.ru/forecast/football/', {
            waitUntil: 'domcontentloaded',
        });

        console.log(await page.content());

        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.forecast-preview')
            items.forEach((item) => {
                results.push({
                    homeName: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_left').querySelector('.forecast-preview__team-name').innerText.trim(),
                    awayNAme: item.querySelector('.forecast-preview__teams').querySelector('.forecast-preview__team_right').querySelector('.forecast-preview__team-name').innerText.trim(),
                    predict: item.querySelector('.forecast-preview__extra').querySelector('.forecast-preview__extra-bet').querySelectorAll('.forecast-preview__extra-bet-item')[0]
                    .querySelector('.forecast-preview__extra-bet-item-value').innerText.trim(),
                    text: item.querySelector('.forecast-preview__text').querySelector('.forecast-preview__text-inner').querySelector('div').innerText.trim()
                })
            })
            return results
        })

        console.log(data)
        await browser.close();
    }
    catch (error) {
        console.log(error)
    }
};

