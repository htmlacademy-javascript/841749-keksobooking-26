import {createAccomadations} from './data.js';
import './templater.js';
import './listener.js';
import './dom.js';

const ACCOMMODATION_COUNT = 10;
const acomodationsData = createAccomadations(ACCOMMODATION_COUNT);

export {acomodationsData};
