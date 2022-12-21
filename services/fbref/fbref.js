import { getDataFromFbref } from "./getDataFromFbref.js"
import { getDataFromMatches } from "./getDataFromMatches.js"

export const fbref = async () => {

    const arrLink = [
        {
            link: 'https://fbref.com/en/comps/9/Premier-League-Stats#results2022-202391_overall',
            linkMatches: 'https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures',
            league: 'Premier league'
        },
        {
            link: 'https://fbref.com/en/comps/13/Ligue-1-Stats#results2022-2023131_overall',
            linkMatches: 'https://fbref.com/en/comps/13/schedule/Ligue-1-Scores-and-Fixtures',
            league: 'Ligue 1'
        },
        {
            link: 'https://fbref.com/en/comps/20/Bundesliga-Stats#results2022-2023201_overall',
            linkMatches: 'https://fbref.com/en/comps/20/schedule/Bundesliga-Scores-and-Fixtures',
            league: 'Bundesliga'
        },
        {
            link: 'https://fbref.com/en/comps/11/Serie-A-Stats#results2022-2023111_overall',
            linkMatches: 'https://fbref.com/en/comps/11/schedule/Serie-A-Scores-and-Fixtures',
            league: 'Serie A'
        },
        {
            link: 'https://fbref.com/en/comps/12/La-Liga-Stats#results2022-2023121_overall',
            linkMatches: 'https://fbref.com/en/comps/12/schedule/La-Liga-Scores-and-Fixtures',
            league: 'La-Liga'
        },
    ]

    const getData = (link, linkMatches, league, timeoutfbref, timeoutMatches) => {
        setTimeout(() => {
            getDataFromFbref(link, league);
        }, timeoutfbref)
         
        setTimeout(() => {
            getDataFromMatches(linkMatches, league)
        }, timeoutMatches)
    }

    arrLink.forEach((el, i) => {
      getData(el.link, el.linkMatches, el.league, +`${i}0000`, +`${i + 6}0000`);
    })

}

