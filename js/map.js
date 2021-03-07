import {getData} from './api.js';

/* global L:readonly */
let adForm = document.querySelector('.ad-form');
let fieldsetAdForm = adForm.querySelectorAll('fieldset');

adForm.classList.add('ad-form--disabled');
for (let i = 0; i < fieldsetAdForm.length; i++) {
  fieldsetAdForm[i].disabled = true;
}

let mapFilters = document.querySelector('.map__filters');
let elementsMapFilters = mapFilters.children;

mapFilters.classList.add('map__filters--disabled');
for (let i = 0; i < elementsMapFilters.length; i++) {
  elementsMapFilters[i].disabled = true;
}

let mapBox = L.map('map-canvas')

mapBox.on('load', () => {
  /*загрузка карты переводит формы в активное состояние*/
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < fieldsetAdForm.length; i++) {
    fieldsetAdForm[i].disabled = false;
  }
  mapFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < elementsMapFilters.length; i++) {
    elementsMapFilters[i].disabled = false;
  }
})

mapBox.setView(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  10,
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapBox);


//добавляем главную метку

let mainMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

let marker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
    draggoble: true,
  },
  {
    icon: mainMarker,
    draggable: true,
  },
);
marker.addTo(mapBox);

let address = adForm.querySelector('#address');
address.setAttribute('readonly', 'readonly');
address.value = '35.68950, 139.6920';

//возврат главной метки при отправке + заполнение поля
let updateMarker = () => {
  marker.setLatLng(['35.6895', '139.692']).update();
  address.value = '35.6895' + ', ' + '139.692';
}

//координаты метки и запись в поле 'адрес'
marker.on('moveend', (evt) => {
  let getLatLng = evt.target.getLatLng();
  address.value = getLatLng.lat.toFixed(5) + ', ' + getLatLng.lng.toFixed(5);
});

//генерим несколько меток
let card = document.querySelector('#card').content.querySelector('.popup');

let similarOffer = (element) => {
  let newCard = card.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = element.offer.title;
  newCard.querySelector('.popup__text--address').textContent =
    element.offer.address;
  newCard.querySelector('.popup__text--price').textContent =
    element.offer.price + ' Р/ночь';
  newCard.querySelector('.popup__type').textContent = element.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent =
    element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей.';
  newCard.querySelector('.popup__text--time').textContent =
    'Заезд после ' +
    element.offer.checkin +
    ' выезд до ' +
    element.offer.checkout;
  newCard.querySelector('.popup__features').textContent =
    element.offer.features;
  newCard.querySelector('.popup__description').textContent =
    element.offer.description;

  newCard.querySelector('.popup__photos').innerHTML = '';
  element.offer.photos.forEach((photo) => {
    let img = document.createElement('img');
    img.classList.add('popup__photo');
    newCard.querySelector('.popup__photos').appendChild(img);
    img.src = photo;
    img.alt = 'Фотография жилья';
    img.width='45';
    img.height='40';
  });

  newCard.querySelector('.popup__avatar').src = element.author.avatar;

  return newCard;
};

getData(
  (data) => {
    data.forEach((elements) => {
      let pinMarker = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });

      let pin = L.marker(elements.location, {
        icon: pinMarker,
      });
      pin.addTo(mapBox).bindPopup(similarOffer(elements), {
        keepInView: true,
      });
    });
  },
  (err) => {
    () => (err);
  },
);

export {similarOffer, adForm, updateMarker, mapFilters};
