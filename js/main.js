import { debounce } from './util.js';
import { getMap, createMainPinLocation } from './map.js';
import { setAccomadationsFormSubmit, onButtonReset, disablePage } from './user-form.js';
import { getData } from './api.js';
import { createArrayProposalFilter, redrawPinsOnMap } from './filter.js';

const RERENDER_DELAY = 500; // Задержка отображения пинов на карте

disablePage();
getMap();
setAccomadationsFormSubmit();
createMainPinLocation();

getData((cards) => {
  createArrayProposalFilter(cards);
  redrawPinsOnMap(debounce(() => createArrayProposalFilter(cards), RERENDER_DELAY));
  onButtonReset(() => createArrayProposalFilter(cards));
});
