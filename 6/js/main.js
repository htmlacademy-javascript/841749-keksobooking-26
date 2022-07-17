import { createAccomadations } from './data.js';
import { renderCard } from './card.js';
// import { renderPinsOnMap } from './map.js';
import './user-form.js';

const ACCOMMODATION_COUNT = 10;
const acomodationsData = createAccomadations(ACCOMMODATION_COUNT);
renderCard(acomodationsData[0]);
