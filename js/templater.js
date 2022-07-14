
// Задача
// Обратите внимание, в тексте задания вы будете встречать текст в фигурных скобках. Такой текст будет означать,
// что на месте этого текста должно появиться значение, которое вы возьмёте из данных. Например, в шаблоне может быть
// написано <div>{{x}}</div>, и это будет значить, что {{x}} нужно заменить на значение переменной x. Если переменная
// будет равна 100, то разметка должна выглядеть как <div>100</div>. Фигурные скобки в этой записи ничего не значат,
// они просто показывают, что закончилась разметка и в этом месте будут стоять данные. Сами фигурные скобки переносить в разметку не нужно.

// Подготовить код для генерации разметки похожих объявлений на основе данных.


// На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

// Выведите заголовок объявления offer.title в заголовок .popup__title.
// Выведите адрес offer.address в блок .popup__text--address.
// Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
// Квартира для flat
// Бунгало для bungalow
// Дом для house
// Дворец для palace
// Отель для hotel
// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
// Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
// Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

// Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.


// import {createAccomadations} from './data.js';

// const card = document.querySelector('#card');
// const content = card.content;
// console.log(content);
// const similarListAccomadations = content.createElement('div');
// similarListAccomadations.classList.add('popup-list'); // Создаём новый элемент
// console.log(similarListAccomadations);

// const cardTemplate = document.querySelector('#card') // Нашёл template в документе
//   .content // Получили содержимое, фрагмент
//   .querySelector('.popup-list'); // Нашёл нужный шаблон

// const offerCard = cardTemplate.cloneNode(true); // Склонировал карточку предложения
// cardTemplate.appendChild(offerCard); // Создал новую карточку предложения

// console.log(cardTemplate);

// const acomodationsData = createAccomadations(1);

// const similarAccomadations = acomodationsData; // Шаблоны предложений

// /**
//  * Функция создаёт определённое количество аналогичных размещений
//  * @param {string} - ключ передающий значение.
//  * @returns {Array} - возвращает определённое количество обьектов
//  */
// similarAccomadations.forEach((offer) => {
//   const offerCard = cardTemplate.cloneNode(true);
//   offerCard.querySelector('.popup__avatar').textContent = offer.avatar;
//   similarListAccomadations.appendChild(offerCard);
// });
// console.log(offerCard);














// const cardTemplate = document.querySelector('#card').content;
// console.log(cardTemplate);
// const featuresList = cardTemplate.querySelector('.popup__features');
// console.log(featuresList);

// featuresList.forEach((featuresListItem) => {
//   const isNecessary = FEATURS.some(
//     (FEATURS) => featuresListItem.classList.contains('popup__feature--' + FEATURS),
//   );
//   if(!isNecessary) {
//     featuresListItem.remove();
//   }
// });

// const userEmotions = [
//   'smile',
//   'crying',
// ];

const popupContainer = document.querySelector('.wrapper-popup');
console.log(popupContainer);
// const emojiList = emojiContainer.querySelectorAll('.emoji');

// emojiList.forEach((emojiListItem) => {
//   const isNecessary = userEmotions.some(
//     (userEmotion) => emojiListItem.classList.contains('emoji--' + userEmotion),
//   );

//   if (!isNecessary) {
//     emojiListItem.remove();
//   }
// });
