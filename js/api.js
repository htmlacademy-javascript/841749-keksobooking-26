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
 * Функция отправляющая данные на сервер
 * @param {*} onSuccess - callback вызывается при выполнение.
 * @param {*} body - формы данные, полученные методом FormData
 */
const sendData = (onSuccess, onFail, body) => {
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
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };

