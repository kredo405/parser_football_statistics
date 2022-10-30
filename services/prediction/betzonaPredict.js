import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const betzonaPredict = async () => {
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
        url: `https://betzona.ru/bets-sport/prognozi-na-football`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const links = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".prognoz-selected-list")
        arrEl.forEach(el => {
            const pos = el.querySelector('.link_flex').querySelectorAll('div')[0].querySelector('.prognoz-match').textContent.indexOf('-')
            links.push({
                link:`https://betzona.ru${el.querySelector('.link_flex').getAttribute('href')}`,
                homeName: el.querySelector('.link_flex').querySelectorAll('div')[0].querySelector('.prognoz-match').textContent.slice(0, pos).trim(),
                awayName: el.querySelector('.link_flex').querySelectorAll('div')[0].querySelector('.prognoz-match').textContent.slice(pos + 1).trim(),
            });
        })
        
        return links
    }
    catch (error) {
        console.log(error);
    }
};
