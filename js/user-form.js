import { sendData } from './api.js';
import { filterFormElement, filterFormListElement } from './filter.js';
import { showSuccessModal, showErrorModal } from './popup.js';
import { renderPhoto } from './picture.js';
import { resetPage, mainPinMarker } from './map.js';

const MAX_AMOUNT_ACCOMMODATION =100000;
const minPriceAccommodation = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const NUMBERS_FOR_ROUNDING = 5;

const orderFormElement = document.querySelector('.ad-form');
const adFormListElements = orderFormElement.children;
const typeAcomadationElement = orderFormElement.querySelector('#type');
const formAddress = orderFormElement.querySelector('#address');
const priceAccommodationElement = orderFormElement.querySelector('#price');
const submitButtonElement = orderFormElement.querySelector('.ad-form__submit');
const timeInFormElement = orderFormElement.querySelector('#timein');
const timeOutFormElement = orderFormElement.querySelector('#timeout');
const adFormReset = orderFormElement.querySelector('.ad-form__reset');

// Для фотографий
const adFormAvatar = document.querySelector('.ad-form-header__preview');
const adFormPhoto = document.querySelector('.ad-form__photo');
const avatarPreview = adFormAvatar.querySelector('img').cloneNode(true);
const avatarChooser = orderFormElement.querySelector('#avatar');
const photoChooser = orderFormElement.querySelector('#images');

const pristine = new Pristine(orderFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
},false);

/**
 *  Функция создаёт превью аватара
 */
const getAvatar = (result) => {
  const fragment = document.createDocumentFragment();
  avatarPreview.src = result;
  fragment.appendChild(avatarPreview);
  adFormAvatar.innerHTML = '';
  adFormAvatar.appendChild(fragment);
};

/**
 * Функция по созданию превью фотографии жилья
 * @param {*} result - вывод результата
 */
const getPhoto = (result) => {
  adFormPhoto.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const element = document.createElement('img');
  element.src = result;
  element.alt = 'Фото жилья';
  element.width = 70;
  element.height = 70;
  fragment.appendChild(element);
  adFormPhoto.appendChild(fragment);
};

const getAvatarPreview = () => renderPhoto(avatarChooser, getAvatar);
const getPhotoPreview = () => renderPhoto(photoChooser, getPhoto);

getAvatarPreview();
getPhotoPreview();

/**
 * Передача координат главной метки в поле "Адрес (координаты)"
 */
const createMainPinLocation = () => {
  formAddress.value = `${(mainPinMarker.getLatLng().lat).toFixed(NUMBERS_FOR_ROUNDING)}, ${(mainPinMarker.getLatLng().lng).toFixed(NUMBERS_FOR_ROUNDING)}`;
};

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

/**
 * Неактивное состояние страницы: формы "Ваше объявление" и фильтра для карты
 */
const disablePage = () => {
  orderFormElement.classList.add('ad-form--disabled');
  for (const elem of adFormListElements) {
    elem.setAttribute('disabled', 'disabled');
  }
  filterFormElement.classList.add('map__filters--disabled');
  for (const elem of filterFormListElement) {
    elem.setAttribute('disabled', 'disabled');
  }
};

/**
 * Активное состояние формы "Ваше объявление"
 */
const activateAd = () => {
  orderFormElement.classList.remove('ad-form--disabled');
  for (const elem of adFormListElements) {
    elem.removeAttribute('disabled');
  }
  filterFormElement.classList.remove('map__filters--disabled');
  for (const elem of filterFormListElement) {
    elem.removeAttribute('disabled');
  }
};

/**
 * Функция блокировки кнопки в форме (submit)
 */
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Опубликовываю...';
};

/**
 * Функция разблокирующая кнопку в форме (submit)
 */
const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setAccomadationsFormSubmit = () => {
  orderFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccessModal();
          resetPage();
          unblockSubmitButton();
        },
        () => {
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
 * Функция очистка формы. Нажатие на кнопку "очистить" (reset-форма)
 */
const onButtonReset = (cb) => {
  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
    cb();
  });
};


export { adFormPhoto, avatarPreview, orderFormElement, changesTypeSyncPrice, setAccomadationsFormSubmit, onButtonReset, createMainPinLocation, disablePage, activateAd };
