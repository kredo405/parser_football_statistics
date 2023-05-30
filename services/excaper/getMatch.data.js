import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
export const getMatchDataExcaper = async (link) => {
    const desktop_agents = [
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0",
    ];

    let rand = Math.floor(Math.random() * desktop_agents.length);

    const options = {
        method: "GET",
        url: `https://www.excapper.com/?action=game&id=32383104`,
        headers: {
            "User-Agent": desktop_agents[rand],
        },
    };

    try {
        const response = await axios.request(options);
        const result = await response.data;

        const outcomed = [];
        const tabs = [];
        const dom = new JSDOM(result);
        let arrEl = dom.window.document.querySelectorAll(".tab");
        arrEl.forEach((el) => {
            tabs.push({
                link: el.getAttribute("data-tab").trim(),
                value: el.textContent.trim(),
            });
        });

        tabs.forEach((el) => {
            const elem = dom.window.document.querySelector(`#${el.link}`);
            const items = [];

            elem.querySelectorAll("tbody").forEach((item) => {
                item.querySelectorAll("tr").forEach((i) => {
                    items.push({
                        type: i.querySelectorAll("td")[0].textContent.trim(),
                        date: i.querySelectorAll("td")[1].textContent.trim(),
                        market: i.querySelectorAll("td")[2].textContent.trim(),
                        sum: i.querySelectorAll("td")[3].textContent.trim(),
                        change: i.querySelectorAll("td")[4].textContent.trim(),
                        time: i.querySelectorAll("td")[5].textContent.trim(),
                        score: i.querySelectorAll("td")[6].textContent.trim(),
                        odd: i.querySelectorAll("td")[7].textContent.trim(),
                        percentChange: i
                            .querySelectorAll("td")[8]
                            .textContent.trim(),
                        totalSum: i
                            .querySelectorAll("td")[9]
                            .textContent.trim(),
                        percentOfMarket: i
                            .querySelectorAll("td")[10]
                            .textContent.trim(),
                    });
                });
            });

            outcomed.push({
                market: el.value,
                values: items,
            });
        });

        return outcomed;
    } catch (error) {
        console.log(error);
    }
};
