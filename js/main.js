import { debounce } from './util.js';
import { getMap, createMainPinLocation } from './map.js';
import { setAccomadationsFormSubmit, onButtonReset } from './user-form.js';
import { getData } from './api.js';
import { createArrayProposalFilter, redrawPinsOnMap } from './filter.js';


// Задержка отображения пинов на карте
const RERENDER_DELAY = 500;

getData((cards) => {
  createArrayProposalFilter(cards);
  redrawPinsOnMap(debounce(() => createArrayProposalFilter(cards), RERENDER_DELAY));
  onButtonReset(() => createArrayProposalFilter(cards));
});

getMap();
setAccomadationsFormSubmit();
createMainPinLocation();
