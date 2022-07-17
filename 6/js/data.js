import {getRandomFloat} from './util.js';
import {getRandomIntInclusive} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getRandomArrayElements} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';

const TITLES = [
  'Если вы ищете ночлег, то любой ваш каприз нам по силам',
  'Мы ценим ваше время, всё по шаговой доступности',
  'Минимализм, только подчёркивает ваш деловой вкус',
  'Тёплое уютное гнёздышко, прилетайте к нам.',
  'Дёшево и не сердито. Практичность и прагматичность.',
  'Тут, как дома, всё с деланно с любовью'
];

const ACCOMMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Мы предоставляем наивысший сервис, наши клиенты не простые люди',
  'Идеальное место расположения в центре города, за считаные минуты вы окажитесь в нужном месте. Удобство и комфорт обеспечен.',
  'Наш интерьер не навясчивый, вы найдёте все необходимое.',
  'Рай для романтиков, созданный уют не оставит вас равнодушным',
  'Если вы турист, то вы попали по адресу. Всё культурное наследие в пошаговой доступности',
  'Экология и природа, вас не будет беспокоить быстрая жизнь города'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const Location = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000,
  DIGITS: 5
};

const createNumber = createRandomIdFromRangeGenerator(1, 10);

/**
 * Функция создаёт случайное жильё
 * @param {number} numberAvatar - случайное полученное число
 * @returns {Object} - cлучайных подбор проживания
 */
const createAccomadation = () => {
  const numberAvatar = createNumber();
  const location = {
    lat: getRandomFloat(Location.LAT_MIN, Location.LAT_MAX, Location.DIGITS),
    lng: getRandomFloat(Location.LNG_MIN, Location.LNG_MAX, Location.DIGITS)
  };
  return {
    author: {
      avatar: `img/avatars/user${(numberAvatar < 10) ? `0${numberAvatar}` : `${numberAvatar}`}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat} ${location.lng}`,
      price: getRandomIntInclusive(0, 100000),
      type: getRandomArrayElement(ACCOMMODATION_TYPES),
      rooms: getRandomIntInclusive(0, 10),
      guests: getRandomIntInclusive(0, 5),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArrayElements(FEATURS), // Создать для функция для возврата нескольких элементов массива
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElements(PHOTOS) // Создать для функция для возврата нескольких элементов массива
    },
    location
  };
};

/**
 * Функция создаёт разное количество жилья
 * @param {number} - число отвечающие за количество жилья.
 * @returns {Array} - возвращает определённое количество обьектов
 */
const createAccomadations = (count) => {
  const result = [];
  for (let index = 1; index <= count; index++) {
    const newAccomadation = createAccomadation(index);
    result.push(newAccomadation);
  }
  return result;
};

export {createAccomadations};
