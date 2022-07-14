const cardFragment = document.querySelector('#card').content;
console.log(cardFragment);
const cardTemplate = cardFragment.querySelector('.popup');
console.log(cardTemplate);

const cardWrap = document.createElement('div');
console.log(cardWrap);
cardWrap.classList.add('wrapper-popup');

const fragment = document.createDocumentFragment();

for (let i = 0; i < 3; i++) {
  const element = cardTemplate.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
  element.classList.add(`popup-${  i + 1}`); // Добавляем порядковый класс, который начинается с единицы, а не с нуля, поэтому 'i + 1'
  element.children[0].textContent = i; // Записываем содержимое
  fragment.appendChild(element);
}

cardWrap.appendChild(fragment);

