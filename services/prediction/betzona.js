import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const betzona = async (link) => {
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
        url: `${link}`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".forecast-description")
        arrEl.forEach(el => {
            matches.push({
                homeName: el.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.name').textContent,
                awayName: el.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.name').textContent,
                homeLogo: `https://betzona.ru${el.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
                awayLogo: `https://betzona.ru${el.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
                league: el.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[0].querySelector('.formatch_data_one').querySelector('.date').textContent,
                date: el.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[1].querySelector('.formatch_data_one').querySelector('.date').textContent,
                homePreview: {
                    info: el.querySelectorAll('.team-info')[0].querySelector('.info').querySelector('p').textContent,
                },
                awayPreview: {
                    info: el.querySelectorAll('.team-info')[1].querySelector('.info').querySelector('p').textContent,
                },
                forecast: {
                    text: el.querySelector('.forecast-info').querySelector('.bpdr').textContent,
                    bet: el.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.bet_name').textContent,
                    odd: el.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.ratio').textContent,
                }
            })
        })

        return matches
    }
    catch (error) {
        console.log(error);
    }
};
