import { filterFormElement } from './filter.js';
import { renderCard } from './card.js';
import { avatarPreview, adFormPhoto, orderFormElement, changesTypeSyncPrice, createMainPinLocation, activateAd } from './user-form.js';
import { IMG_DEFAULT } from './picture.js';

const CENTER = {
  lat: 35.6894,
  lng: 139.692
};

const ZOOM = 12;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CENTER, {
    draggable: true,
    icon: mainPinIcon,
  }
);

const map = L.map('map-canvas');

const getMap = () => {
  map.on('load', () => {
    activateAd();
    createMainPinLocation(CENTER);
  })
    .setView(CENTER, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

mainPinMarker.addTo(map);

/**
 * Событие отвечающие на движения пина и вывода информации в адресную строку.
 */
const moveMainMarkerCoordinates = () => mainPinMarker.on('move', (evt) => {
  const points = evt.target.getLatLng();
  createMainPinLocation(points);
});
moveMainMarkerCoordinates();

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

// Очищение слоя с метками объявлений
const clearMarker = () => markerGroup.clearLayers();

/**
 * Форма и карта переходят в дефолтное состояние
 */
const resetPage = () => {
  mainPinMarker.setLatLng(CENTER);
  map.setView(CENTER, ZOOM);
  orderFormElement.reset();
  avatarPreview.src = IMG_DEFAULT;
  adFormPhoto.innerHTML = '';
  const resetMainPinMarker = mainPinIcon.getLatLng();
  createMainPinLocation(resetMainPinMarker);
  changesTypeSyncPrice();
  filterFormElement.reset();
  clearMarker();
};

const clearRenderPinsOnMap = () => markerGroup.clearLayers();

export { getMap, createMainPinLocation, renderPinsOnMap, clearRenderPinsOnMap, resetPage, mainPinMarker };
