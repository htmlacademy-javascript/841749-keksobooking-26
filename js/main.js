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

const ACCOMMODATION_COUNT = 10;

/**
 * Функция по получению случайного целого числа в заданном интервале, включительно
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random - ссылка на ресурс функции
 * @param {number} minValue - минимальное число
 * @param {number} maxValue - максимальное число
 * @returns {number} - возращает случайно целое число в заданном интервале
 * @returns {string} - описание: диапозон не может быть отрицательным
 */

const getRandomIntInclusive = (min, max) => {
  [min, max] = [max, min];
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

/**
 * Функция, возвращающая случайное число и возможно округление.
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random - ссылка на ресурс функции
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @param {number} digits -  количество цифр после десятичной запятой, если аргумент опущен, он считается равным 0.
 * @returns {string} - возращает случайно число в заданном интервале и возможно округление.
 * @returns {string} - описание: диапозон не может быть отрицательным
 */

const getRandomFloat = (min, max, digits) => {
  const RandomFloatNumber = (Math.random() * (max - min + 1) + min);
  const RandomFloatString = RandomFloatNumber.toFixed(digits);
  return parseFloat(RandomFloatString);
};

/**
 * Функция осуществляет доступ к случайному элементу массива
 * @param {string} elements - название массива
 * @returns - возвращает случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length -1 )];

/**
 * Функция-генератор для получения уникальных идентификаторов в указанном диапозоне и без повторения.
 * https://up.htmlacademy.ru/profession/frontender/12/javascript/26/demos/7627#19
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {string} - возвращает случайное значение
 */
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return () => {
    let currentValue = getRandomIntInclusive(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

/**
 * Функция создаёт случайное жильё
 * @param {number} numberAvatar - случайное полученное число
 * @returns {Object} - cлучайных подбор проживания
 */
const createAccomadation = (numberAvatar) => {
  const location = {
    lat: getRandomFloat(Location.LAT_MIN, Location.LAT_MAX, Location.DIGITS),
    lng: getRandomFloat(Location.LNG_MIN, Location.LNG_MAX, Location.DIGITS)
  };
  return {
    author: {
      avatar: `img/avatars/user${createRandomIdFromRangeGenerator(1, 10)((numberAvatar < 10) ? `0${numberAvatar}` : `${numberAvatar}`)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat} ${location.lng}`,
      price: getRandomIntInclusive(0, Number.max),
      type: getRandomArrayElement(ACCOMMODATION_TYPES),
      rooms: getRandomIntInclusive(0, Number.max),
      guests: getRandomIntInclusive(0, Number.max),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArrayElement(FEATURS),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS)
    },
    location
  };
};

// Десять случайных подборов проживания
const accomadation = Array.from({length: ACCOMMODATION_COUNT}, createAccomadation);
