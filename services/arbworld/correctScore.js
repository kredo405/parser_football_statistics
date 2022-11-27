import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const correctScore = async () => {
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
        url: `https://arbworld.net/ru/denezhnyye-potoki/football-tochnyy-rezultat?hidden=&shown=&timeZone=%2B02%3A00&day=Today&refreshInterval=60&order=Percentage+on+sign&min=0&max=100`,
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
            matches.push({
                leagueName: el.querySelector('.tleague').textContent.trim(),
                date: el.querySelector('.tdate').textContent.trim(),
                teamName: el.querySelector('.thome').textContent.trim(),
                scores: [
                    {
                        score0_0: {
                            odd: el.querySelectorAll('.odds_col')[0].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[0].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[0].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score0_1: {
                            odd: el.querySelectorAll('.odds_col')[1].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[1].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[1].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score0_2: {
                            odd: el.querySelectorAll('.odds_col')[2].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[2].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[2].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score0_3: {
                            odd: el.querySelectorAll('.odds_col')[3].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[3].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[3].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score1_0: {
                            odd: el.querySelectorAll('.odds_col')[4].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[4].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[4].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score1_1: {
                            odd: el.querySelectorAll('.odds_col')[5].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[5].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[5].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score1_2: {
                            odd: el.querySelectorAll('.odds_col')[6].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[6].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[6].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score1_3: {
                            odd: el.querySelectorAll('.odds_col')[7].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[7].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[7].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score2_0: {
                            odd: el.querySelectorAll('.odds_col')[8].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[8].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[8].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score2_1: {
                            odd: el.querySelectorAll('.odds_col')[9].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[9].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[9].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score2_2: {
                            odd: el.querySelectorAll('.odds_col')[10].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[10].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[10].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score2_3: {
                            odd: el.querySelectorAll('.odds_col')[11].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[11].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[11].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score3_0: {
                            odd: el.querySelectorAll('.odds_col')[12].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[12].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[12].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score3_1: {
                            odd: el.querySelectorAll('.odds_col')[13].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[13].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[13].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score3_2: {
                            odd: el.querySelectorAll('.odds_col')[14].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[14].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[14].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                    {
                        score3_3: {
                            odd: el.querySelectorAll('.odds_col')[15].querySelectorAll('div')[0].textContent.trim(),
                            percent: el.querySelectorAll('.odds_col')[15].querySelectorAll('div')[1].textContent.trim(),
                            money: el.querySelectorAll('.odds_col')[15].querySelectorAll('div')[2].textContent.trim(),
                        }
                    },
                ]
            });
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};