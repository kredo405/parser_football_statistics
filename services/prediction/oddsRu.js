import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const oodsRu = async () => {
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
        url: `https://odds.ru/football/forecasts/today/`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };

    try {
        const response = await axios.request(options)
        const result = await response.data
        const links = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll('.forecasts-post')

        arrEl.forEach(el => {
            links.push(`https://odds.ru${el.querySelector('.forecasts-post__header').getAttribute('href')}`);
        })

        const half = Math.ceil(links.length / 2);
        const firsArr = links.slice(0, half);
        const secondArr = links.slice(-half);

        const dataFirst = await getData(firsArr)
        const dataSecond = await getData(secondArr)

        return[...dataFirst, ...dataSecond];

    }
    catch (error) {
        console.log(error);
    }
};

const getData = async (arr) => {
    try {
        const response = arr.map(url => axios.get(url));
        const result = await Promise.all(response)
        const matches = [];
        result.forEach(el => {
            const dom = new JSDOM(el.data)
            let block = dom.window.document.querySelector(".forecasts-post-inherit__footer")
            matches.push({
                teamName: block.querySelector('.widget-match-bet__title').textContent.trim(),
                predict: block.querySelector('.widget-match-bet__middle-info-value').textContent.trim(),
            })
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
}
