import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const onlineBookmaker = async () => {
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
        url: `https://online-bookmakers.com/ru/prognozy/futbol/`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".block-events")
        arrEl.forEach(el => {
            matches.push({
                nameHome: el.querySelector('.table-result').querySelectorAll('tr')[0].querySelector('.name').textContent.trim(),
                nameAway: el.querySelector('.table-result').querySelectorAll('tr')[1].querySelector('.name').textContent.trim(),
                predictionOne: el.querySelector('.table-result').querySelectorAll('tr')[0].querySelectorAll('td')[1].textContent.trim(),
                predictionTwo: el.querySelector('.table-result').querySelectorAll('tr')[1].querySelectorAll('td')[1].textContent.trim(),
                text: el.querySelector('.info-spicer').querySelector('p').textContent.trim(),
                date: el.querySelector('.wr-items').querySelector('data').textContent.trim(),
                league: el.querySelector('.wr-items').querySelector('.items').querySelector('.country').querySelector('a').textContent,
                logoHome: `https://online-bookmakers.com${el.querySelector('.table-result').querySelectorAll('tr')[0].querySelector('.name').querySelector('.team_logo').getAttribute('src').trim()}`,
                logoAway: `https://online-bookmakers.com${el.querySelector('.table-result').querySelectorAll('tr')[1].querySelector('.name').querySelector('.team_logo').getAttribute('src').trim()}`,
            });
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};