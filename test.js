import axios from "axios";

const getData = async () => {
    const options = {
        method: "POST",
        url: "https://openai80.p.rapidapi.com/images/generations",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
                "f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0",
            "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        },
        data: {
            prompt: "A cute baby sea otter",
            n: 2,
            size: "1024x1024",
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

getData();
