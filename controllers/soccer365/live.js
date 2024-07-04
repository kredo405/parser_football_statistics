import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const liveSoccer365 = async (href) => {
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
        url: `https://soccer365.ru/${href}/`,
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
            if (el.querySelector('#game_events').querySelector('.live_game_status') &&
                el.querySelector('#game_events').querySelector('.live_game_status').querySelector('b').textContent !== 'Завершен' &&
                el.querySelector('#game_events').querySelector('.live_game_status').querySelector('b').textContent !== 'Перенесен') {
                const matchReport = [];
                if (el.querySelector('#text_report_container') !== null) {
                    el.querySelectorAll('.text_report_item').forEach(item => {
                        matchReport.push({
                            minute: item.querySelector('.tmin').textContent.trim(),
                            img: item.querySelector('.ttype').querySelector('img').getAttribute('src').trim(),
                            text: item.querySelector('.ttext').textContent.trim()
                        })
                    })
                }

                match.push({
                    matchReport: matchReport,
                    shotsHome: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[0]
                        .querySelectorAll('.stats_inf')[0].textContent.trim(),
                    shotsAway: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[0]
                        .querySelectorAll('.stats_inf')[1].textContent.trim(),
                    shotsOnTargetHome: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[1]
                        .querySelectorAll('.stats_inf')[0].textContent.trim(),
                    shotsOnTargetAway: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[1]
                        .querySelectorAll('.stats_inf')[1].textContent.trim(),
                    possesiontHome: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[4]
                        .querySelectorAll('.stats_inf')[0].textContent.trim(),
                    possesionAway: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[0].querySelectorAll('.stats_item')[4]
                        .querySelectorAll('.stats_inf')[1].textContent.trim(),
                    attacksHome: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[1].querySelectorAll('.stats_item')[1]
                        .querySelectorAll('.stats_inf')[0].textContent.trim(),
                    attacksAway: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[1].querySelectorAll('.stats_item')[1]
                        .querySelectorAll('.stats_inf')[1].textContent.trim(),
                    attacksDangerHome: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[1].querySelectorAll('.stats_item')[2]
                        .querySelectorAll('.stats_inf')[0].textContent.trim(),
                    attacksDangerAway: el.querySelector('#clubs_stats').querySelectorAll('.stats_items')[1].querySelectorAll('.stats_item')[2]
                        .querySelectorAll('.stats_inf')[1].textContent.trim(),
                    lineupsHome: el.querySelector('#lineups').querySelector('#tm-players-position-view').querySelector('.ht_frm').textContent.trim(),
                    lineupsAway: el.querySelector('#lineups').querySelector('#tm-players-position-view').querySelector('.at_frm').textContent.trim(), 
                });
            }
        })

        return match
    }
    catch (error) {
        console.log(error);
    }
};
