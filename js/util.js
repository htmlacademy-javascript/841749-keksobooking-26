/**
 * Функция по получению случайного целого числа в заданном интервале, включительно
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random - ссылка на ресурс функции
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {number} - возращает случайно целое число в заданном интервале
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
 * @returns {number} - возращает случайно число в заданном интервале и возможно округление.
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
 * Функция осуществляет доступ к случайным элементам массива
 * @param {string} elements - название массива
 * @returns - возвращает случайные элемент или элементы массива
 */
const getRandomArrayElements = (elements) => {
  const randomQuantityValues = getRandomIntInclusive(0, elements.length -1 );
  const partIntegerArray = elements.slice(randomQuantityValues);
  return partIntegerArray.join(', ');
};


/**
 * Функция-генератор для получения уникальных идентификаторов в указанном диапозоне и без повторения.
 * https://up.htmlacademy.ru/profession/frontender/12/javascript/26/demos/7627#19
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @returns {string} - возвращает случайное значение
 */
function createRandomIdFromRangeGenerator(min, max) {
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

export {getRandomIntInclusive};
export {getRandomFloat};
export {getRandomArrayElement};
export {getRandomArrayElements};
export {createRandomIdFromRangeGenerator};
