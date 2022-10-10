import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const matchesFbref = async () => {
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
        url: `https://widgets.sports-reference.com/wg.fcgi?css=1&site=fb&url=%2Fen%2Fcomps%2F13%2FLigue-1-Stats&div=div_results2022-2023131_overall`,
        // headers: {
        //     'User-Agent': desktop_agents[rand],
        // }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".tbody>tr");
            arrEl.forEach(el => {
                matches.push({
                    team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(37, -6),
                    rank: el.querySelector('[data-stat="rank"]').textContent,
                    games: el.querySelector('[data-stat="games"]').textContent,
                    wins: el.querySelector('[data-stat="wins"]').textContent,
                    draws: el.querySelector('[data-stat="ties"]').textContent,
                    losses: el.querySelector('[data-stat="losses"]').textContent,
                    goals_for: el.querySelector('[data-stat="goals_for"]').textContent,
                    goals_against: el.querySelector('[data-stat="goals_against"]').textContent,
                    goal_diff: el.querySelector('[data-stat="goal_diff"]').textContent,
                    points: el.querySelector('[data-stat="points"]').textContent,
                    points_avg: el.querySelector('[data-stat="points_avg"]').textContent,
                    xg_for: el.querySelector('[data-stat="xg_for"]').textContent,
                    xg_against: el.querySelector('[data-stat="xg_against"]').textContent,
                    points: el.querySelector('[data-stat="xg_diff"]').textContent,
                    xg_diff_per90: el.querySelector('[data-stat="xg_diff_per90"]').textContent,
                });
            })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};