import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const moneyWayUnderOver = async () => {
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
        url: `https://arbworld.net/ru/denezhnyye-potoki/football-mnee-bolee-25-golov`,
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
            const posUnder = el.querySelectorAll('.odds_col')[0].innerHTML.indexOf('<br>')
            const posOver = el.querySelectorAll('.odds_col')[1].innerHTML.indexOf('<br>')

            matches.push({
                leagueName: el.querySelector('.tleague').textContent.trim(),
                date: el.querySelector('.tdate').textContent.trim(),
                homeName: el.querySelector('.thome').textContent.trim(),
                homeAway: el.querySelector('.taway').textContent.trim(),
                money: el.querySelector('.tvol').textContent.trim().slice(2),
                oddsUnder: el.querySelectorAll('.odds_col_small')[0].textContent.trim(),
                oddsOver: el.querySelectorAll('.odds_col_small')[2].textContent.trim(),
                percentUnder: el.querySelectorAll('.odds_col')[0].textContent.trim(),
                percentOver: el.querySelectorAll('.odds_col')[1].textContent.trim(),
                moneyUnder: el.querySelectorAll('.odds_col')[0].innerHTML.slice(posUnder + 4),
                moneyOver: el.querySelectorAll('.odds_col')[1].innerHTML.slice(posOver + 4)
            });
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};