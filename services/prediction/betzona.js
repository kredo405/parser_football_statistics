import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const betzona = async () => {
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
            links.push(`https://betzona.ru${el.querySelector('.link_flex').getAttribute('href')}`);
        })

        const half = Math.ceil(links.length / 2); 
        const firsArr = links.slice(0, half);
        const secondArr = links.slice(-half);

        const dataFirst = await getData(firsArr)
        const dataSecond = await getData(secondArr)

        return [...dataFirst, ...dataSecond];
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
            let block = dom.window.document.querySelector(".forecast-description")
            matches.push({
              homeName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.name').textContent,
              awayName: block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.name').textContent,
              homeLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_left').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              awayLogo: `https://betzona.ru${block.querySelector('.head').querySelector('.formatch').querySelector('.formatch_right').querySelector('.formatch_name').querySelector('.img_box').querySelector('.img_team').getAttribute('src')}`,
              league: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[0].querySelector('.formatch_data_one').querySelector('.date').textContent,
              date: block.querySelector('.head').querySelector('.formatch_data').querySelector('.list_formatch_data').querySelectorAll('li')[1].querySelector('.formatch_data_one').querySelector('.date').textContent,
              homePreview: {
                info: block.querySelectorAll('.team-info')[0].querySelector('.info').querySelector('p').textContent,
              },
              awayPreview: {
                info: block.querySelectorAll('.team-info')[1].querySelector('.info').querySelector('p').textContent,
              },
              forecast: {
                text: block.querySelector('.forecast-info').querySelector('.bpdr').textContent,
                bet: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.bet_name').textContent,
                odd: block.querySelector('.forecast-info').querySelector('.bet').querySelector('.bet-info').querySelector('.ratio').textContent,
              }
            })
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
  }