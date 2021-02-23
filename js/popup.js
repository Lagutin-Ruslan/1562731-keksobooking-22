import {collectSimilarOffer} from './create-offer.js';

const card = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const similarOffer = collectSimilarOffer();

similarOffer.forEach((element) => {
  const newCard = card.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = element.offer.title;
  newCard.querySelector('.popup__text--address').textContent = element.offer.address;
  newCard.querySelector('.popup__text--price').textContent = element.offer.price + ' Р/ночь';
  newCard.querySelector('.popup__type').textContent = element.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей.';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout;
  newCard.querySelector('.popup__features').textContent = element.offer.features;
  newCard.querySelector('.popup__description').textContent = element.offer.description;
  newCard.querySelector('.popup__photo').src = element.offer.photos[0];
  newCard.querySelector('.popup__avatar').src = element.author.avatar;

  mapCanvas.appendChild(newCard);
});

