import { renderPinsOnMap, clearRenderPinsOnMap } from './map.js';

const ACCOMMODATION_COUNT = 10;

// const filterPrice = {
//   low: {
//     min: 0,
//     max: 9999,
//   },

//   middle: {
//     min: 10000,
//     max: 49999,
//   },

//   height: {
//     min: 50000,
//     max: 100000,
//   }
// };

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
// const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
// const housingFeatures = filterForm.querySelector('#housing-features');

const chooseType = (accomadation) => housingType.value === 'any' || accomadation.offer.type === housingType.value;
// const choosePrice = (accomadation) => housingPrice.value === 'any' || (accomadation.offer.price >= filterPrice[housingPrice.value].start && accomadation.offer.price <= filterPrice[housingPrice.value].end);
const chooseRooms = (accomadation) => housingRooms.value === 'any' || accomadation.offer.rooms === +housingRooms.value;
const chooseGuests = (accomadation) => housingGuests.value === 'any' || accomadation.offer.guests === +housingGuests.value;

/**
 * Функция фильтрации данных
 *
 *
 */

const createArrayProposalFilter = (accomadations) => {
  const  proposalAccommodationArray = [];
  for (let i = 0; i <= accomadations.length; i++ ) {
    if (chooseType(accomadations[i]) &&
        // choosePrice(accomadations[i]) &&
        chooseRooms(accomadations[i]) &&
        chooseGuests(accomadations[i])
    ) {
      if (proposalAccommodationArray.length < ACCOMMODATION_COUNT) {
        const filteredPins = proposalAccommodationArray;
        renderPinsOnMap(filteredPins);
        proposalAccommodationArray.push(accomadations[i]);
      } else {
        break;
      }
    }
  }


  return proposalAccommodationArray;
};

/**
 * Функция переотрисовка пинов на карте.
 */
const redrawPinsOnMap = (proposalAccommodationArray) => {
  filterForm.addEventListener('change', () => {
    clearRenderPinsOnMap();
    proposalAccommodationArray();
  });
};

export { createArrayProposalFilter, redrawPinsOnMap };
