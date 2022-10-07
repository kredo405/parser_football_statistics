import axios from 'axios';
import express from 'express';
import cors from 'cors'
import moment from 'moment';

const getFixtures = (onlineBookmaker, betzona, footystat, arbworld) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: `${moment().format('YYYY-MM-DD')}`, timezone: 'Europe/Minsk' },
        headers: {
            'X-RapidAPI-Key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const data = response.data.response;
         // Creating express app
    const app = express()

    app.use(cors())

    // Sample api routes for testing
    app.get('/', (req, res) => {
      res.json("welcome to our server")
    });
    app.get('/matches', (req, res) => {
        res.json({ data })
      });
    app.get('/onlineBookmaker', (req, res) => {
      res.json({ onlineBookmaker })
    });
    app.get('/betzona', (req, res) => {
      res.json({ betzona })
    });
    app.get('/footystat', (req, res) => {
      res.json({ footystat })
    });
    app.get('/arbworld', (req, res) => {
      res.json({ arbworld })
    });
    // Port Number
    const port = 8000;

    // Server setup
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
    });
    }).catch(function (error) {
        console.error(error);
    });




}

export default getFixtures;
