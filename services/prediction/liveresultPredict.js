import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const liveresultPredict = async (link) => {
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
        const dom = new JSDOM(result)
        const matches = [{
            text: dom.window.document.querySelector('#tab-tip').querySelector('.tip-page-tex').textContent.trim(),
            predict: dom.window.document.querySelector('#tab-tip').querySelector('.tip-page-rates-rate').querySelectorAll('div')[0].querySelectorAll('div')[0].textContent.trim(),
            percent: {
                winerHome: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[0].querySelectorAll('.forecast2-match-results-item')[0].querySelector('.legend').querySelector('.result').textContent.trim(),
                draw: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[0].querySelectorAll('.forecast2-match-results-item')[1].querySelector('.legend').querySelector('.result').textContent.trim(),
                winerAway: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[0].querySelectorAll('.forecast2-match-results-item')[2].querySelector('.legend').querySelector('.result').textContent.trim(),
                totlaOver: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[1].querySelectorAll('.forecast2-match-results-item')[0].querySelector('.legend').querySelector('.result').textContent.trim(),
                totalUnder: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[1].querySelectorAll('.forecast2-match-results-item')[1].querySelector('.legend').querySelector('.result').textContent.trim(),
                btsYes: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[2].querySelectorAll('.forecast2-match-results-item')[0].querySelector('.legend').querySelector('.result').textContent.trim(),
                btsNo: dom.window.document.querySelector('#tab-forecast').querySelector('.forecast2-match-results').querySelector('.order-2')
                    .querySelectorAll('.chart')[2].querySelectorAll('.forecast2-match-results-item')[1].querySelector('.legend').querySelector('.result').textContent.trim(),
            }

        }]

        return matches
    }
    catch (error) {
        console.log(error);
    }
};