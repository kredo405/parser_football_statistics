import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const matchSoccer365 = async (href) => {
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
        url: `https://soccer365.ru/${href}/&tab=prediction`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const match = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".live_body")
        arrEl.forEach(el => {
            const predicitons = [];
            el.querySelector('#prediction').querySelectorAll('.predict_text').forEach(item => {
                predicitons.push({
                    scoreHome: item.querySelector('.options').querySelector('.score1').textContent.trim(),
                    scoreAway: item.querySelector('.options').querySelector('.score2').textContent.trim(),
                    text: item.querySelector('.text').textContent.trim(),
                })
            })

            match.push({
                title: el.querySelector('#game_events').querySelector('.block_header').querySelector('h2').textContent.trim(),
                homeTeam: el.querySelector('.block_body_nopadding').querySelector('.left').querySelector('.live_game_ht').querySelector('a').textContent.trim(),
                awayTeam: el.querySelector('.block_body_nopadding').querySelector('.right').querySelector('.live_game_at').querySelector('a').textContent.trim(),
                homeLogo: el.querySelector('.block_body_nopadding').querySelector('.left').querySelector('.live_game_tlogo').querySelector('img').getAttribute('src').trim(),
                awayLogo: el.querySelector('.block_body_nopadding').querySelector('.right').querySelector('.live_game_tlogo').querySelector('img').getAttribute('src').trim(),
                homeGoal: el.querySelector('.block_body_nopadding').querySelector('.left').querySelector('.live_game_goal').querySelector('span').textContent.trim(),
                awayGoal: el.querySelector('.block_body_nopadding').querySelector('.right').querySelector('.live_game_goal').querySelector('span').textContent.trim(),
                odds: {
                    oddHomeWin: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[1] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[1].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddDraw: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[2] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[2].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddAwayWin: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[3].querySelector('a') ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[3].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddTotalU25: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[4] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[4].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddTotalO25: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[5] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[5].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddBtsYes: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[6] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[6].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                    oddBtsNo: el.querySelector('.adv_kef_wgt').querySelectorAll('td')[7] ? 
                    el.querySelector('.adv_kef_wgt').querySelectorAll('td')[7].querySelector('a').querySelector('.koeff').textContent.trim() : null,
                },
                percentOutcomes: {
                    home: el.querySelector('#prediction').querySelector('.charts_progress').querySelector('.charts_progress_1').querySelector('span').textContent.trim(),
                    draw: el.querySelector('#prediction').querySelector('.charts_progress').querySelector('.charts_progress_0').querySelector('span').textContent.trim(),
                    away: el.querySelector('#prediction').querySelector('.charts_progress').querySelector('.charts_progress_2').querySelector('span').textContent.trim(),
                },
                predictions: predicitons,

            });
        })

        return match
    }
    catch (error) {
        console.log(error);
    }
};
