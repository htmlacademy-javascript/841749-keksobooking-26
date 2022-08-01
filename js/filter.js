import { renderPinsOnMap, clearRenderPinsOnMap } from './map.js';

const DEFAULT_VALUE = 'any';
const ACCOMMODATION_COUNT = 10;

const filterPrice = {
  low: {
    min: 0,
    max: 9999
  },

  middle: {
    min: 10000,
    max: 49999
  },

  high: {
    min: 50000,
    max: 100000
  }
};

const filterFormElement = document.querySelector('.map__filters');
const filterFormListElement = filterFormElement.children;
const housingTypeElement = filterFormElement.querySelector('#housing-type');
const housingPriceElement = filterFormElement.querySelector('#housing-price');
const housingRoomsElement = filterFormElement.querySelector('#housing-rooms');
const housingGuestsElement = filterFormElement.querySelector('#housing-guests');
const housingFeaturesListElements = filterFormElement.querySelectorAll('.map__checkbox');

const chooseType = (accomadation) => housingTypeElement.value === DEFAULT_VALUE || accomadation?.offer?.type === housingTypeElement.value;
const choosePrice = (accomadation) => housingPriceElement.value === DEFAULT_VALUE || accomadation?.offer?.price >= filterPrice[housingPriceElement.value].min && accomadation.offer.price <= filterPrice[housingPriceElement.value].max;
const chooseRooms = (accomadation) => housingRoomsElement.value === DEFAULT_VALUE || accomadation?.offer?.rooms === +housingRoomsElement.value;
const chooseGuests = (accomadation) => housingGuestsElement.value === DEFAULT_VALUE || accomadation?.offer?.guests === +housingGuestsElement.value;

/**
 * Функция для фильтрации дополнительных удобств.
 */
const chooseFeatures = (accomadation) => Array.from(housingFeaturesListElements)
  .every((housingFeatureElement) => {
    if (!housingFeatureElement.checked) {
      return true;
    }
    if (!accomadation.offer.features) {
      return false;
    }
    return accomadation.offer.features.includes(housingFeatureElement.value);
  });

/**
 * Функция отфильтрованных данных.
 */
const createArrayProposalFilter = (accomadations) => {
  const proposalAccommodationArray = [];
  for (let i = 0; i <= accomadations.length; i++) {
    if (chooseType(accomadations[i]) &&
      choosePrice(accomadations[i]) &&
      chooseRooms(accomadations[i]) &&
      chooseGuests(accomadations[i]) &&
      chooseFeatures(accomadations[i])
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
}

/**
 * Функция переотрисовка пинов на карте.
 */
const redrawPinsOnMap = (proposalAccommodationArray) => {
  filterFormElement.addEventListener('change', () => {
    clearRenderPinsOnMap();
    proposalAccommodationArray();
  });
};

export { createArrayProposalFilter, redrawPinsOnMap, filterFormElement, filterFormListElement };
