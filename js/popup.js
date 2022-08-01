import { getEscEvent } from './util.js';

const successPopupElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopupElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorPopupMessage = errorPopupElement.querySelector('.error__message');
const closeErrorButton = errorPopupElement.querySelector('.error__button');

const showSuccessModal = () => {
  document.body.appendChild(successPopupElement);
  const keydownHandler = (evt) => {
    if (getEscEvent(evt)) {
      evt.preventDefault();
      successPopupElement.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  successPopupElement.addEventListener('click', () => {
    successPopupElement.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

const showErrorModal = () => {
  errorPopupMessage.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(errorPopupElement);
  const keydownHandler = (evt) => {
    if (getEscEvent(evt)) {
      evt.preventDefault();
      errorPopupElement.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  closeErrorButton.addEventListener('click', () => {
    errorPopupElement.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
  errorPopupElement.addEventListener('click', () => {
    errorPopupElement.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

export { showSuccessModal, showErrorModal };
