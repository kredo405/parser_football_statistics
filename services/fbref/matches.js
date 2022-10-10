import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const matchesFbref = async () => {
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
        url: `https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F11%2Fschedule%2FSerie-A-Scores-and-Fixtures&div=div_sched_2022-2023_11_1`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".tbody>tr")
        arrEl.forEach(el => {
            matches.push({
                homeTeam: el.querySelector('[data-stat="home_team"]').querySelector('a').textContent,
                awayTeam: el.querySelector('[data-stat="away_team"]').querySelector('a').textContent,
                date: el.querySelector('[data-stat="date"]') ? el.querySelector('[data-stat="date"]').querySelector('a').textContent : null,
                time: el.querySelector('[data-stat="start_time"]').querySelector('.venuetime') ?
                    el.querySelector('[data-stat="start_time"]').querySelector('.venuetime').textContent :
                    el.querySelector('[data-stat="start_time"]').textContent,
                score: el.querySelector('[data-stat="score"]').querySelector('a') ?
                    el.querySelector('[data-stat="score"]').querySelector('a').textContent :
                    el.querySelector('[data-stat="score"]').textContent,
            });
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};