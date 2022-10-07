import axios from 'axios';
import jsdom from "jsdom";
import moment from 'moment';
const { JSDOM } = jsdom;

export const getMatchesLive = async () => {
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
        url: `https://analytics.soccerment.com/en/live-results?date=${moment().format('YYYY-MM-DD')}`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matchesLive = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".in_match")
        arrEl.forEach(el => {
            matchesLive.push({
                homeTeam: el.querySelector('.teams').querySelector('.home_team').textContent.trim(),
                awayTeam: el.querySelector('.teams').querySelector('.away_team').textContent.trim(),
                homeLogo: el.querySelector('.teams').querySelector('.home_team').querySelector('.logo').getAttribute('src').trim(),
                awayLogo: el.querySelector('.teams').querySelector('.away_team').querySelector('.logo').getAttribute('src').trim(),
                score: el.querySelector('.teams').querySelector('.score').textContent,
                positionHome: el.querySelector('.stats_container').querySelector('.position').querySelector('.home').querySelector('.position').textContent.trim(),
                positionAway: el.querySelector('.stats_container').querySelector('.position').querySelector('.away').querySelector('.position').textContent.trim(),
            });
        })

        return matchesLive;
    }
    catch (error) {
        console.log(error);
    }
};