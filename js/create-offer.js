import {getRandom, getRandomDecimal} from './util.js';

//Объекты
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const OFFER_CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const OFFER_TITLES = [
  'Апартаменты',
  'Дом',
  'Пентхаус',
  'Котедж',
  'Баня',
];
const OFFER_DESCRIPTIONS = [
  'на берегу моря.',
  'с видом на город.',
  'в частном сектаре.',
  'рядом с парком.',
  'рядом с метро.',
];

// функция для поиска объектов
const getRandomArrayElement = (elements) => {
  return elements[getRandom(0, elements.length - 1)];
};

const createOffer = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + getRandom(1, 8) + '.png',
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES) + ' ' + getRandomArrayElement(OFFER_DESCRIPTIONS),
      address: '{{location.x}}, {{location.y}}',
      price: getRandom(100, 1000) + 'p.',
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandom(1, 5),
      guests: getRandom(2, 30),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      features: getRandomArrayElement(OFFER_FEATURES),
      photos: getRandomArrayElement(OFFER_PHOTOS),
    },
    location: {
      x: getRandomDecimal(35.65000, 35.70000, 5),
      y: getRandomDecimal(139.70000, 139.80000, 5),
    },
  };
};

const SIMILAR_OFFER = 10;

const collectSimilarOffer = new Array(SIMILAR_OFFER).fill(null).map(() => createOffer());
collectSimilarOffer();
