// const popup = document.querySelector('.popup');
// console.log(popup);
// const templateFragment = document.querySelector('#card').content; // Нашёл фрагмент с содержимым темплейта
// console.log(templateFragment);
// const template = templateFragment.querySelector('popup'); // В фрагменте нахожу нужный элемент
// console.log(template);
// const fragment = document.createDocumentFragment();
// console.log(fragment);
// for (let i = 0; i < 6; i++) {
//   const element = template.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
//   element.classList.add('offer-' + (i + 1)); // Добавляем порядковый класс, который начинается с единицы, а не с нуля, поэтому 'i + 1'
//   element.children[0].textContent = i; // Записываем содержимое
//   fragment.appendChild(element);
// }

// popup[1].appendChild(fragment);


// const cardFragment = document.querySelector('#card').content;
// console.log(cardFragment);
// const cardTemplate = cardFragment.querySelector('.popup');
// console.log(cardTemplate);


// const formButton = document.querySelector('.ad-form__submit');

// formButton.addEventListener('click', (evt) => {
//   // Отменяем действие по умолчанию
//   evt.preventDefault();
//   // Добавляем инструкции для события клика
//   console.log('Произошёл клик');
//   const cardWrap = document.createElement('div');
//   console.log(cardWrap);
//   cardWrap.classList.add('popup');
//   const element = cardTemplate.cloneNode(true);
//   console.log(element);
//   const elementAdd = element.appendChild(cardWrap);
//   console.log(elementAdd);
// });
