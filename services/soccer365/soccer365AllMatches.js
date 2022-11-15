import axios from 'axios';
import jsdom from "jsdom";
import moment from 'moment/moment.js';
const { JSDOM } = jsdom;

export const getMatchesSoccer365 = async () => {
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
        url: `https://soccer365.ru/online/&date=${moment().format('YYYY MM DD')}`,
        headers: {
            'User-Agent': desktop_agents[rand],
            'Time-Zone': 'Minsk/Amsterdam'
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matchesAndLeague = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".live_comptt_bd")
        console.log(result)
        arrEl.forEach(el => {
            if (el.querySelector('.block_header').querySelector('a')) {
                const matches = [];
                el.querySelectorAll('.game_block').forEach(item => {
                    matches.push({
                        id: item.id.slice(2),
                        link: item.querySelector('.game_link').getAttribute('href').trim(),
                        date: item.querySelector('.game_link').querySelector('.status').querySelector('span') ?
                            item.querySelector('.game_link').querySelector('.status').querySelector('span').textContent.trim() :
                            item.querySelector('.game_link').querySelector('.status').textContent.trim(),
                        homeTeam: item.querySelector('.game_link').querySelector('.result').querySelector('.ht').querySelector('.name').querySelector('div') ?
                            item.querySelector('.game_link').querySelector('.result').querySelector('.ht')
                                .querySelector('.name').querySelector('div').querySelector('span').textContent.trim() : null,
                        awayTeam: item.querySelector('.game_link').querySelector('.result').querySelector('.at').querySelector('.name').querySelector('div') ?
                            item.querySelector('.game_link').querySelector('.result').querySelector('.at')
                                .querySelector('.name').querySelector('div').querySelector('span').textContent.trim() : null,
                        homeLogo: item.querySelector('.game_link').querySelector('.result').querySelector('.ht')
                            .querySelector('.name').querySelector('div') ?
                            item.querySelector('.game_link').querySelector('.result').querySelector('.ht')
                                .querySelector('.name').querySelector('div').querySelector('img').getAttribute('src').trim() : null,
                        awayLogo: item.querySelector('.game_link').querySelector('.result').querySelector('.at')
                            .querySelector('.name').querySelector('div') ?
                            item.querySelector('.game_link').querySelector('.result').querySelector('.at')
                                .querySelector('.name').querySelector('div').querySelector('img').getAttribute('src').trim() : null,
                        homeGoals: item.querySelector('.game_link').querySelector('.result').querySelector('.ht')
                            .querySelector('.gls').textContent.trim(),
                        awayGoals: item.querySelector('.game_link').querySelector('.result').querySelector('.at')
                            .querySelector('.gls').textContent.trim(),
                    });
                })

                matchesAndLeague.push({
                    leagueName: el.querySelector('.block_header').querySelector('a').querySelector('div').querySelector('span').textContent.trim(),
                    leagueLogo: el.querySelector('.block_header').querySelector('a').querySelector('div').querySelector('img').getAttribute('src').trim(),
                    matches: matches,
                });
            }
        })

        return matchesAndLeague
    }
    catch (error) {
        console.log(error);
    }
};
