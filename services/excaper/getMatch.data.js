import axios from "axios";
import { JSDOM } from "jsdom";

const desktopAgents = [
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

export const getMatchDataExcaper = async (link) => {
    const userAgent =
        desktopAgents[Math.floor(Math.random() * desktopAgents.length)];

    const options = {
        method: "GET",
        url: link,
        headers: {
            "User-Agent": userAgent,
        },
    };

    try {
        const response = await axios.request(options);
        const result = response.data;

        const dom = new JSDOM(result);
        const tabElements = dom.window.document.querySelectorAll(".tab");

        const outcomed = Array.from(tabElements).map((el) => {
            const link = el.getAttribute("data-tab").trim();
            const value = el.textContent.trim();

            const elem = dom.window.document.querySelector(`#${link}`);
            const itemElements = elem.querySelectorAll("tbody tr");

            const items = Array.from(itemElements).map((i) => ({
                market: i.querySelectorAll("td")[2].textContent.trim(),
                values: {
                    type: i.querySelectorAll("td")[0].textContent.trim(),
                    date: i.querySelectorAll("td")[1].textContent.trim(),
                    sum: i.querySelectorAll("td")[3].textContent.trim(),
                    change: i.querySelectorAll("td")[4].textContent.trim(),
                    time: i.querySelectorAll("td")[5].textContent.trim(),
                    score: i.querySelectorAll("td")[6].textContent.trim(),
                    odd: i.querySelectorAll("td")[7].textContent.trim(),
                    percentChange: i
                        .querySelectorAll("td")[8]
                        .textContent.trim(),
                    totalSum: i.querySelectorAll("td")[9].textContent.trim(),
                    percentOfMarket: i
                        .querySelectorAll("td")[10]
                        .textContent.trim(),
                },
            }));

            const teams = dom.window.document
                .querySelector(`h1`)
                .textContent.trim();

            return {
                market: value,
                values: items,
                teams: teams,
            };
        });

        return outcomed;
    } catch (error) {
        console.log(error);
        return []; // Вернуть пустой массив в случае ошибки
    }
};
