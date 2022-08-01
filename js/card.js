const HOUSING_TYPES = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const HOUSING_ROOMS = {
  1: 'Одна комната',
  2: 'Две комнаты',
  3: 'Три комнаты',
};

const HOUSING_GUESTS = {
  2: 'Два гостя',
  1: 'Один гость',
  0: 'Не для гостей',
};


/**
 * Функция по созданию карточки
 *
 * @param {
    author: {
      avatar: string
    },
    offer: {
      title: string
      address: string
      price: int
      type: string
      rooms: int
      guests: int
      checkin: string
      checkout: string
      features: []
      description: string
      photos: []
    },
    location: {}
} = cardData
 */

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photoSrc;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '70');
    newPhoto.setAttribute('height', '70');
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

const renderCard = ({ author, offer }) => {
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;
  const cardFragment = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardFragment.cloneNode(true);

  const checkValue = (selector, value, attribute = 'textContent', additionalText='') => {
    if (value) {
      cardElement.querySelector(selector)[attribute] = `${value}${additionalText}`;
    } else {
      cardElement.querySelector(selector).remove();
    }
  };

  // checkValue('.popup__avatar'.src = avatar || '');
  cardElement.querySelector('.popup__avatar').src = avatar || '';
  checkValue('.popup__title', title || '');
  checkValue('.popup__text--address', address || '');
  checkValue('.popup__text--price', `${price} ${'₽/ночь'}` || '');
  checkValue('.popup__type', HOUSING_TYPES[type] || '');
  checkValue('.popup__text--capacity', `${HOUSING_ROOMS[rooms]}, ${HOUSING_GUESTS[guests]}`);
  checkValue('.popup__text--time', `${'Заезд после'} ${checkin}, ${'выезд до'} ${checkout}.`);
  // checkValue('.popup__features', features, .appendChild(createFeatures(offer.features)));
  checkValue('.popup__description', description || '');
  // checkValue('.popup__photo', photos);


  const cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (features) {
    cardFeatures.appendChild(createFeatures(features));
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  if (photos) {
    cardPhotos.appendChild(createPhotos(photos));
  } else {
    cardPhotos.remove();
  }

  return cardElement;
};


export { renderCard };
