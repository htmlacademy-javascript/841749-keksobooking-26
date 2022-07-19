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

  checkValue('.popup__avatar', avatar);
  checkValue('.popup__title', title);
  checkValue('.popup__text--address', address);
  checkValue('.popup__text--price', price, 'textContent', ' ₽/ночь');
  checkValue('.popup__type', type);
  checkValue('.popup__text--capacity', rooms, ' комнаты для ', guests, ' гостей');
  checkValue('.popup__text--time', 'Заезд после ', checkin, ', выезд до ', checkout);
  checkValue('.popup__features', features);
  checkValue('.popup__description', description);
  checkValue('.popup__photo', photos);

  return cardElement;
};

export { renderCard };
