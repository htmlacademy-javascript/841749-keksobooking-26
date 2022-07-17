const orderForm = document.querySelector('.ad-form');

const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
},false);

/**
 * Функция по проверки длины текта в заголовке объявления
 * @param {number} value - количество символов и пробелов в заголовке
 * @returns - прохождение проверки на длину текста
 */
const validateTitle = (value) => {
  const validateLength = value.length >= 30 && value.length <= 100;
  return validateLength;
};

pristine.addValidator(orderForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

/**
 * Функция по проверки до пустимых чисел
 * @param {number} value - число отвечающие за цену
 * @returns - прохождение проверки на максимальное число
 */
const validatePrice = (value) => {
  const maxAmount = 100000;
  return value <= maxAmount;
};

pristine.addValidator(orderForm.querySelector('#price'), validatePrice, 'до 100 000');


const numberOfRooms = orderForm.querySelector('[name="rooms"]');
const numberOfGuests = orderForm.querySelector('[name="capacity"]');
const roomСapacity = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

/**
 * Функция по сверке допустимого количество гостей и комнат
 * @returns - возвращает проверку возможности гостей и комнат
 */
const validateRoomCapacity = () => {
  const checkCapacity = roomСapacity[numberOfRooms.value].includes(numberOfGuests.value);
  return checkCapacity;
};

pristine.addValidator(numberOfRooms, validateRoomCapacity, 'Невыспитесь');
pristine.addValidator(numberOfGuests, validateRoomCapacity);

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
