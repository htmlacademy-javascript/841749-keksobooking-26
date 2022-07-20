import { createAccomadations } from './data.js';
import './user-form.js';
import { renderPinsOnMap } from './map.js';

const ACCOMMODATION_COUNT = 10;
const acomodationsData = createAccomadations(ACCOMMODATION_COUNT);

renderPinsOnMap(acomodationsData);
