import { showAlert } from './util.js';
import { sendData } from './api.js';

const MAX_AMOUNT_ACCOMMODATION =100000;
const minPriceAccommodation = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const orderForm = document.querySelector('.ad-form');
const typeAcomadation = orderForm.querySelector('#type');
const submitButton = orderForm.querySelector('.ad-form__submit');
// const priceAccommodation = orderForm.querySelector('#price');

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
const validatePrice = (value) => value <= MAX_AMOUNT_ACCOMMODATION && value >= minPriceAccommodation[typeAcomadation.value];

pristine.addValidator(orderForm.querySelector('#price'), validatePrice, 'до 100 000');

// const errorPrice = () => {
//   if(priceAccommodation > MAX_AMOUNT_ACCOMMODATION) {
//     `Цена ${[typeAcomadation.value]} не более ${MAX_AMOUNT_ACCOMMODATION}`
//   } else {
//     `Цена ${[typeAcomadation.value]} не меньше ${MAX_AMOUNT_ACCOMMODATION}`;
//   }
// };

// pristine.addValidator(errorPrice);

const numberOfRooms = orderForm.querySelector('[name="rooms"]');
const numberOfGuests = orderForm.querySelector('[name="capacity"]');
const roomСapacity = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setAccomadationsFormSubmit = (onSuccess) => {
  orderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

orderForm.addEventListener('reset', () => {
  pristine.reset();
});

export { setAccomadationsFormSubmit };
