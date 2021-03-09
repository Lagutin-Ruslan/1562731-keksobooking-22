import {getRandom, getRandomDecimal} from './util.js';

//Объекты
const OFFER_TYPES = [
  {palace: 'Дворец'},
  {flat: 'Квартира'},
  {house: 'Дом'},
  {bungalow: 'Бунгало'},
];

const OFFER_CHECK = [
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
  'Сдаётся жильё',
  'Посуточная аренда',
  'Длительная аренда',
  'Бюджетный вариант',
  'Выгодное предложение',
];
const OFFER_DESCRIPTIONS = [
  'На берегу моря.',
  'С видом на город.',
  'В частном сектаре.',
  'Рядом с парком.',
  'Рядом с метро.',
];
//массив случайной длины, без повторения значений
const createArr = ([...arr], maxLength) =>
  Array.from (
    {
      length: Math.min (arr.length, (1 + Math.random () * maxLength) | 0),
    },
    () => arr.splice ((Math.random () * arr.length) | 0, 1)[0] );

// функция шаблон для поиска объектов
const getRandomArrayElement = function (elements) {
  return elements[getRandom(0, elements.length - 1)];
};

let locationX = getRandomDecimal(35.65000, 35.70000, 5);
let locationY = getRandomDecimal(139.70000, 139.80000, 5);

const createOffer = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png',
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: locationX + ', ' + locationY,
      price: getRandom(100, 1000),
      type: Object.values(getRandomArrayElement(OFFER_TYPES))[0],
      rooms: getRandom(1, 5),
      guests: getRandom(2, 15),
      checkin: getRandomArrayElement(OFFER_CHECK),
      checkout: getRandomArrayElement(OFFER_CHECK),
      features: createArr(OFFER_FEATURES, 6),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: createArr(OFFER_PHOTOS, 3),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const SIMILAR_OFFER = 10;

const collectSimilarOffer = () => new Array(SIMILAR_OFFER).fill(null).map(() => createOffer());

export {collectSimilarOffer};
