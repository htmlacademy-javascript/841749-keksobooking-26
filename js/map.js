import { renderCard } from './card.js';

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
  })
  .setView({
    lat: 35.6894,
    lng: 139.692,
  }, 8);

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
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.6894,
    lng: 139.692,
  });
  map.setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);
});

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

// mainPinMarker.remove();

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
      .addTo(map)
      .bindPopup(renderCard(point));
  });
};

export { renderPinsOnMap };
