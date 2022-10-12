import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const h2hSoccer365 = async (href) => {
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
        url: `https://soccer365.ru/${href}/&tab=stats_games`,
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
            match.push({
                matches: el.querySelector('#result_data_h2h').querySelector('.h2h_main_left').querySelector('.games_value').textContent.trim(),
                homeWin: el.querySelector('#result_data_h2h').querySelector('.h2h_main_right').querySelectorAll('.h2h_stats_item')[0].querySelector('.inf_vleft')
                    .querySelector('div').querySelector('span').textContent.trim(),
                awayWin: el.querySelector('#result_data_h2h').querySelector('.h2h_main_right').querySelectorAll('.h2h_stats_item')[0].querySelector('.inf_vright')
                    .querySelector('div').querySelector('span').textContent.trim(),
                homeGoalsAvg: el.querySelector('#result_data_h2h').querySelector('.h2h_main_right').querySelectorAll('.h2h_stats_item')[2].querySelector('.inf_vleft')
                    .querySelector('div').querySelector('span').textContent.trim(),
                awayGoalsAvg: el.querySelector('#result_data_h2h').querySelector('.h2h_main_right').querySelectorAll('.h2h_stats_item')[2].querySelector('.inf_vright')
                    .querySelector('div').querySelector('span').textContent.trim(),
            });
        })

        return match
    }
    catch (error) {
        console.log(error);
    }
};
