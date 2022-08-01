import { renderCard } from './card.js';

const MAIN_LAT = 35.6894;
const MAIN_LNG = 139.692;
const ZOOM = 12;
const NUMBERS_FOR_ROUNDING = 5;

const formAddress = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
  })
  .setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);


const resetButtonElement = document.querySelector('.ad-form__reset');
resetButtonElement.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: MAIN_LAT,
    lng: MAIN_LNG
  });
  map.setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG
  }, ZOOM);
});

/**
 * infoLocation - координаты основного пина, округленного после запятой до 5 символов
 * .value - значение выводящие в адресную строку инпута
 */

// const createMainPinLocation = () => {
formAddress.value = `${mainPinMarker.getLatLng().lat.toFixed(NUMBERS_FOR_ROUNDING)}, ${mainPinMarker.getLatLng().lng.toFixed(NUMBERS_FOR_ROUNDING)}`;
// const infoLocation = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;
// document.getElementById('address').value = infoLocation;
// };

/**
 * Событие отвечающие на движения пина и вывода информации в адресную строку.
 */
mainPinMarker.on('moveend', (evt) => {
  evt.target.getLatLng();
  document.getElementById('address')
    .value = `${mainPinMarker.getLatLng().lat.toFixed(NUMBERS_FOR_ROUNDING)}, ${mainPinMarker.getLatLng().lng.toFixed(NUMBERS_FOR_ROUNDING)}`;
});

// mainPinMarker.remove();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const renderPinsOnMap = (points) => {
  points.forEach((point) => {
    const { location } = point;
    const marker = L.marker(
      location,
      {
        icon,
      }
    );
    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(point));
  });
};

const clearRenderPinsOnMap = () => markerGroup.clearLayers();

export { renderPinsOnMap, clearRenderPinsOnMap };
