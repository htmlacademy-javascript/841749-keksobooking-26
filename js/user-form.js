import { showAlert } from './util.js';
import { sendData } from './api.js';
import { showSuccessModal, showErrorModal } from './popup.js';

const MAX_AMOUNT_ACCOMMODATION =100000;
const minPriceAccommodation = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const orderFormElement = document.querySelector('.ad-form');
const typeAcomadationElement = orderFormElement.querySelector('#type');
const priceAccommodationElement = orderFormElement.querySelector('#price');
const submitButtonElement = orderFormElement.querySelector('.ad-form__submit');
const timeInFormElement = orderFormElement.querySelector('#timein');
const timeOutFormElement = orderFormElement.querySelector('#timeout');

const pristine = new Pristine(orderFormElement, {
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
  orderFormElement.style.borderColor = 'red';
  const validateLength = value.length >= 30 && value.length <= 100;
  return validateLength;
};

pristine.addValidator(orderFormElement.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

/**
 *  Функция синхронизируеи тип жилья с ценой за ночь
 */
const changesTypeSyncPrice = () => {
  priceAccommodationElement.placeholder = minPriceAccommodation[typeAcomadationElement.value];
  priceAccommodationElement.min = minPriceAccommodation[typeAcomadationElement.value];
};

typeAcomadationElement.addEventListener('change', changesTypeSyncPrice);

/**
 * Функция по проверки до пустимых чисел
 * @param {number} value - число отвечающие за цену
 * @returns - прохождение проверки на максимальное число
 */
const validatePrice = (value) => value <= MAX_AMOUNT_ACCOMMODATION && value >= minPriceAccommodation[typeAcomadationElement.value];

pristine.addValidator(orderFormElement.querySelector('#price'), validatePrice, 'до 100 000');

/**
 * Функция по синхронизации значений полей: время ЗАЕЗДА с временим ВЫЕЗДА.
 */
const changeCheckInTimeOut = () => {
  timeOutFormElement.value = timeInFormElement.value;
};

/**
 * Функция по синхронизация значений полей: время ВЫЕЗДА с временим ЗАЕЗДА.
 */
const changeCheckOutTimeIn = () => {
  timeInFormElement.value = timeOutFormElement.value;
};

timeInFormElement.addEventListener('change', changeCheckInTimeOut);
timeOutFormElement.addEventListener('change', changeCheckOutTimeIn);

const numberOfRooms = orderFormElement.querySelector('[name="rooms"]');
const numberOfGuests = orderFormElement.querySelector('[name="capacity"]');
const roomCapacity = {
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
  const checkCapacity = roomCapacity[numberOfRooms.value].includes(numberOfGuests.value);
  return checkCapacity;
};

pristine.addValidator(numberOfRooms, validateRoomCapacity, 'Невыспитесь');
pristine.addValidator(numberOfGuests, validateRoomCapacity);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

// document.querySelector('.ad-form__submit').onclick(() => {
//   ('.ad-form__submit').setAttribute(disabled);
// }

const setAccomadationsFormSubmit = (onSuccess) => {
  orderFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccessModal();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          showErrorModal();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


orderFormElement.addEventListener('reset', () => {
  pristine.reset();
});

/**
 * Добавляет обработчик сбрасывания формы добавления объявления
 */
const addAdFormResetListener = (cb) => {
  const onResetAdForm = () => {
    // adFormAvatarField.src = DEFAULT_AVATAR_URL;
    // adFormPhotoField.innerHTML = '';
    // adFormSlider.noUiSlider.reset();
    pristine.reset();
    changesTypeSyncPrice(minPriceAccommodation['flat']);
    cb();
  };
  orderFormElement.addEventListener('reset', onResetAdForm);
};

// Нажатие на кнопку "очистить" (reset-форма)
// const onButtonReset = (cb) => {
//   adFormReset.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     resetPage();
//     cb();
//   });
// };


export { setAccomadationsFormSubmit, addAdFormResetListener };
