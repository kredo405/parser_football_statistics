import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const formSoccer365 = async (href) => {
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
        url: `https://soccer365.ru/${href}/&tab=form_teams`,
        headers: {
            'User-Agent': desktop_agents[rand],
        }
    };
    try {
        const response = await axios.request(options)
        const result = await response.data
        const match = [];
        const dom = new JSDOM(result)
        let arrEl = dom.window.document.querySelectorAll(".live_body")
        arrEl.forEach(el => {
            match.push({
                relaxationHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[0].textContent.trim(),
                relaxationAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[2].textContent.trim(),
                winsHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                winsAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                drawHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                drawAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                losesHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[4].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                losesAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[4].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                goalsForAvgHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[7].querySelectorAll('td')[0].textContent.trim(),
                goalsForAvgAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[7].querySelectorAll('td')[2].textContent.trim(),
                goalsAgainstAvgHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[8].querySelectorAll('td')[0].textContent.trim(),
                goalsAgainstAvgAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[8].querySelectorAll('td')[2].textContent.trim(),
                btsHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[10].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                btsAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[10].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                totalOverHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[11].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                totalOverAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[11].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                totalUnderHome: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[12].querySelectorAll('td')[0].querySelector('span').textContent.trim(),
                totalUnderAway: el.querySelectorAll('.compare')[0].querySelector('tbody').querySelectorAll('tr')[12].querySelectorAll('td')[2].querySelector('span').textContent.trim(),
                shotsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[0].querySelectorAll('td')[0].textContent.trim(),
                shotsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[0].querySelectorAll('td')[2].textContent.trim(),
                shotsVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[0].textContent.trim(),
                shotsVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[1].querySelectorAll('td')[2].textContent.trim(),
                shotsOnTargetHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[0].textContent.trim(),
                shotsOnTargetAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[2].querySelectorAll('td')[2].textContent.trim(),
                shotsOnTargetVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[0].textContent.trim(),
                shotsOnTargetVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[3].querySelectorAll('td')[2].textContent.trim(),
                possesionHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[4].querySelectorAll('td')[0].textContent.trim(),
                possesionAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[4].querySelectorAll('td')[2].textContent.trim(),
                possesionVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[5].querySelectorAll('td')[0].textContent.trim(),
                possesionVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[5].querySelectorAll('td')[2].textContent.trim(),
                cornersHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[6].querySelectorAll('td')[0].textContent.trim(),
                cornersAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[6].querySelectorAll('td')[2].textContent.trim(),
                cornersVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[7].querySelectorAll('td')[0].textContent.trim(),
                cornersVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[7].querySelectorAll('td')[2].textContent.trim(),
                foulsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[8].querySelectorAll('td')[0].textContent.trim(),
                foulsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[8].querySelectorAll('td')[2].textContent.trim(),
                foulsVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[9].querySelectorAll('td')[0].textContent.trim(),
                foulsVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[9].querySelectorAll('td')[2].textContent.trim(),
                ofsidesHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[10].querySelectorAll('td')[0].textContent.trim(),
                ofsidesAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[10].querySelectorAll('td')[2].textContent.trim(),
                ofsidesVsHome: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[11].querySelectorAll('td')[0].textContent.trim(),
                ofsidesVsAway: el.querySelectorAll('.compare')[1].querySelector('tbody').querySelectorAll('tr')[11].querySelectorAll('td')[2].textContent.trim(),
            });
        })

        return match
    }
    catch (error) {
        console.log(error);
    }
};
