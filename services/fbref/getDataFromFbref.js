import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import puppeteer from 'puppeteer';
import { app } from '../../firebase.js';

export const getDataFromFbref = async (link, league) => {

    const db = getFirestore(app);
    const predictionsRef = collection(db, "fbref");

    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu',
            ],
        })

        let page = await browser.newPage();

        await page.goto(`${link}`, {
            waitUntil: 'domcontentloaded',
        });

        console.log(await page.content())

        const resultsSelector = '.stats_table';
        await page.waitForSelector(resultsSelector);

        let data = await page.evaluate(() => {
            const arrTableStats = []
            const arrSquadStatFor = []
            const arrSquadStatsAgainst = []
            document.querySelector('.switcher_content').querySelectorAll('.table_container')[1].querySelector('.stats_table').querySelector('tbody').querySelectorAll('tr').forEach(el => {
                const pos = el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').indexOf('Stats')
                arrTableStats.push({
                    rank: el.querySelector('[data-stat="rank"]').textContent.trim(),
                    team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(20, pos - 1).trim(),
                    home_games: el.querySelector('[data-stat="home_games"]').textContent.trim(),
                    home_wins: el.querySelector('[data-stat="home_wins"]').textContent.trim(),
                    home_ties: el.querySelector('[data-stat="home_ties"]').textContent.trim(),
                    home_losses: el.querySelector('[data-stat="home_losses"]').textContent.trim(),
                    home_goal_diff: el.querySelector('[data-stat="home_goal_diff"]').textContent.trim(),
                    home_points: el.querySelector('[data-stat="home_points"]').textContent.trim(),
                    home_points_avg: el.querySelector('[data-stat="home_points_avg"]').textContent.trim(),
                    home_goals_for: el.querySelector('[data-stat="home_goals_for"]').textContent.trim(),
                    home_goals_against: el.querySelector('[data-stat="home_goals_against"]').textContent.trim(),
                    home_xg_for: el.querySelector('[data-stat="home_xg_for"]').textContent.trim(),
                    home_xg_against: el.querySelector('[data-stat="home_xg_against"]').textContent.trim(),
                    home_xg_diff: el.querySelector('[data-stat="home_xg_diff"]').textContent.trim(),
                    home_xg_diff_per90: el.querySelector('[data-stat="home_xg_diff_per90"]').textContent.trim(),
                    away_games: el.querySelector('[data-stat="away_games"]').textContent.trim(),
                    away_wins: el.querySelector('[data-stat="away_wins"]').textContent.trim(),
                    away_ties: el.querySelector('[data-stat="away_ties"]').textContent.trim(),
                    away_losses: el.querySelector('[data-stat="away_losses"]').textContent.trim(),
                    away_goal_diff: el.querySelector('[data-stat="away_goal_diff"]').textContent.trim(),
                    away_points: el.querySelector('[data-stat="away_points"]').textContent.trim(),
                    away_points_avg: el.querySelector('[data-stat="away_points_avg"]').textContent.trim(),
                    away_goals_for: el.querySelector('[data-stat="away_goals_for"]').textContent.trim(),
                    away_goals_against: el.querySelector('[data-stat="away_goals_against"]').textContent.trim(),
                    away_xg_for: el.querySelector('[data-stat="away_xg_for"]').textContent.trim(),
                    away_xg_against: el.querySelector('[data-stat="away_xg_against"]').textContent.trim(),
                    away_xg_diff: el.querySelector('[data-stat="away_xg_diff"]').textContent.trim(),
                    away_xg_diff_per90: el.querySelector('[data-stat="away_xg_diff_per90"]').textContent.trim(),
                })
            })

            document.querySelector('#all_stats_squads_standard').querySelector('#div_stats_squads_standard_for').querySelector('tbody').querySelectorAll('tr').forEach(el => {
                const pos = el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').indexOf('Stats')
                arrSquadStatFor.push({
                    xg_per90: el.querySelector('[data-stat="xg_per90"]').textContent.trim(),
                    team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(20, pos - 1).trim(),
                })
            })

            document.querySelector('#all_stats_squads_standard').querySelector('#stats_squads_standard_against').querySelector('tbody').querySelectorAll('tr').forEach(el => {
                const pos = el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').indexOf('Stats')
                arrSquadStatsAgainst.push({
                    xg_per90: el.querySelector('[data-stat="xg_per90"]').textContent.trim(),
                    team: el.querySelector('[data-stat="team"]').querySelector('a').getAttribute('href').slice(20, pos - 1).trim(),
                })
            })


            return {
                tableStats: arrTableStats,
                squadStatFor: arrSquadStatFor,
                squadStatsAgainst: arrSquadStatsAgainst,
            }
        })

        console.log(data)
        await setDoc(doc(predictionsRef, `${league}`), {
            data: [data]
        });

        await browser.close();
    }
    catch (error) {
        console.log(error)
    }
};


