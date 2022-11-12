import { getDataFromFbref } from "./getDataFromFbref.js"

export const fbref = () => {

    const arrLink = [
        {
            link: 'https://fbref.com/en/comps/9/Premier-League-Stats#results2022-202391_overall',
            league: 'Premier league'
        },
        {
            link: 'https://fbref.com/en/comps/13/Ligue-1-Stats#results2022-2023131_overall',
            league: 'Ligue 1'
        },
        {
            link: 'https://fbref.com/en/comps/20/Bundesliga-Stats#results2022-2023201_overall',
            league: 'Bundesliga'
        },
        {
            link: 'https://fbref.com/en/comps/11/Serie-A-Stats#results2022-2023111_overall',
            league: 'Serie A'
        },
        {
            link: 'https://fbref.com/en/comps/12/La-Liga-Stats#results2022-2023121_overall',
            league: 'La-Liga'
        },
    ]
    
    getDataFromFbref(arrLink[0].link, arrLink[0].league)
    
    setTimeout(() => {
        getDataFromFbref(arrLink[1].link, arrLink[1].league)
    }, 10000)
    
    setTimeout(() => {
        getDataFromFbref(arrLink[2].link, arrLink[2].league)
    }, 20000)
    
    setTimeout(() => {
        getDataFromFbref(arrLink[3].link, arrLink[3].league)
    }, 30000)
    
    setTimeout(() => {
        getDataFromFbref(arrLink[4].link, arrLink[4].league)
    }, 40000)
}

