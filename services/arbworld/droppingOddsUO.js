import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const getDroppingOddsUnderOver = async () => {
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

    let rand = Math.floor(Math.random() * desktop_agents.length);

    const options = {
        method: 'GET',
        url: `https://arbworld.net/ru/padayushchiye-koeffitsiyenty/football-mnee-bolee-25-golov?hidden=&shown=&timeZone=%2B02%3A00&refreshInterval=60&order=Drop&min=0&max=100&day=Today`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".belowHeader")
        arrEl.forEach(el => {
            matches.push({
                leagueName: el.querySelector('.tleague').textContent.trim(),
                date: el.querySelector('.tdate').textContent.trim(),
                homeName: el.querySelector('.thome').textContent.trim(),
                homeAway: el.querySelector('.taway').textContent.trim(),
                money: el.querySelector('.tvol').textContent.trim().slice(2),
                oddsUnder: el.querySelectorAll('.odds_col')[0].textContent.trim(),
                oddsOver: el.querySelectorAll('.odds_col')[2].textContent.trim(),
            });
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};