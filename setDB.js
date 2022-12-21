import { fbref } from "./services/fbref/fbref.js";
import { vprognoze } from "./services/prediction/vprognoze.js";
import { betteam } from './services/prediction/betteam.js';


const setDB = async () => {
    await vprognoze();
    await betteam();
    await fbref();
}

setDB()

