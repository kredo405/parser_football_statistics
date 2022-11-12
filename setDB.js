import { fbref } from "./services/fbref/fbref.js";
import { vprognoze } from "./services/prediction/vprognoze.js";


vprognoze();

setTimeout(() => {
    fbref()
}, 10000)