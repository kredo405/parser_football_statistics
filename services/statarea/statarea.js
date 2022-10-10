import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

 export const matchesStatArea = async () => {
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
        url: `http://www.statarea.com/predictions`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const matches = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".competition")
        arrEl.forEach(el => {
            if (el.querySelector('.header').querySelector('.name').textContent.trim() !== 'Advertisement') {
                const matchesLeague = [];
                el.querySelector('.body').querySelectorAll('.match').forEach(item => {
                    matchesLeague.push({
                        date: item.querySelector('.date').textContent.trim(),
                        homeTeam: item.querySelector('.matchrow').querySelector('.teams').querySelector('.hostteam').querySelector('.name')
                            .querySelector('a').textContent.trim(),
                        awayTeam: item.querySelector('.matchrow').querySelector('.teams').querySelector('.guestteam').querySelector('.name')
                            .querySelector('a').textContent.trim(),
                        homeGoals: item.querySelector('.matchrow').querySelector('.teams')
                            .querySelector('.hostteam').querySelector('.goals').textContent.trim(),
                        awayGoals: item.querySelector('.matchrow').querySelector('.teams')
                            .querySelector('.guestteam').querySelector('.goals').textContent.trim(),
                        likepositive: item.querySelector('.matchrow').querySelector('.like')
                            .querySelector('.likepositive').querySelector('.value').textContent.trim(),
                        likenegative: item.querySelector('.matchrow').querySelector('.like')
                            .querySelector('.likenegative').querySelector('.value').textContent.trim(),
                        predict: item.querySelector('.matchrow').querySelector('.tip')
                            .querySelector('.value').querySelector('div').textContent.trim(),
                        // percentHome: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('div')[1].querySelector('.value') ?
                        //     item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('div')[1].querySelector('.value').textContent.trim() : null,
                        // percentDraw: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[1].querySelector('.value').textContent.trim(),
                        // percentAway: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[2].querySelector('.value').textContent.trim(),
                        // percentHomeHT: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[3].querySelector('.value').textContent.trim(),
                        // percentDrawHT: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[4].querySelector('.value').textContent.trim(),
                        // percentAwayHT: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[5].querySelector('.value').textContent.trim(),
                        // percentOver25: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[7].querySelector('.value').textContent.trim(),
                        // percentOver35: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[8].querySelector('.value').textContent.trim(),
                        // percentBts: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[9].querySelector('.value').textContent.trim(),
                        // percentOts: item.querySelector('.inforow').querySelector('.coefrow')
                        //     .querySelectorAll('.coefbox')[10].querySelector('.value').textContent.trim(),
                        userVoteHome: item.querySelector('.userrow').querySelector('.vote')
                            .querySelector('.vote1').querySelector('.value').textContent.trim(),
                        userVoteDraw: item.querySelector('.userrow').querySelector('.vote')
                            .querySelector('.voteX').querySelector('.value').textContent.trim(),
                        userVoteAway: item.querySelector('.userrow').querySelector('.vote')
                            .querySelector('.vote2').querySelector('.value').textContent.trim(),
                    })
                })

                matches.push({
                    leagueName: el.querySelector('.header').querySelector('.name').textContent.trim(),
                    leagueLogo:  el.querySelector('.header').querySelector('.logo').querySelector('img').getAttribute('src').trim(),
                    matches: matchesLeague,
                });
            }      
        })

        return matches;
    }
    catch (error) {
        console.log(error);
    }
};