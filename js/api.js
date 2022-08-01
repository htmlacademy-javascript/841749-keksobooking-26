import { showAlert } from './util.js';

const URL_GET_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_POST_SERVER = 'https://26.javascript.pages.academy/keksobooking';

/**
 * Функция по получению данных с сервера
 * @param {*} onSuccess -  callback вызывается при выполнение.
 */
const getData = (onSuccess) => {
  fetch(URL_GET_SERVER)
    .then((response) => response.json())
    .then((accomadations) => {
      onSuccess(accomadations);
    })
    .catch(() => {
      showAlert('Данные с сервера не пришли. Попробуйте ещё раз');
    });
};

/**
 *
 * @param {*} onSuccess
 * @param {*} body
 */
const sendData = (onSuccess, body) => {
  fetch(
    URL_POST_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };

