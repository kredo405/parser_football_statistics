import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const liveresult = async () => {
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
        url: `https://www.liveresult.ru/tips/football`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };

    try {
        const response = await axios.request(options)
        const result = await response.data
        const links = [];
        console.log(result)
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".tips-list-tip-col")
        arrEl.forEach(el => {
            links.push({
                link: `https://www.liveresult.ru${el.querySelector('.tips-list-tip-teams').getAttribute('href')}`,
                homeName: el.querySelectorAll('.tips-list-tip-teams-team')[0].textContent.trim(),
                awayName: el.querySelectorAll('.tips-list-tip-teams-team')[1].textContent.trim()
            });
        })
        return links
    }
    catch (error) {
        console.log(error);
    }
};