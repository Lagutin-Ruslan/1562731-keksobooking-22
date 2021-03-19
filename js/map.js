/* global L:readonly */
/* global _:readonly */

import {getData} from './api.js';
import {filterOffer} from './filter.js';

const RERENDER_DELAY = 500;
const TypeName = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const adForm = document.querySelector('.ad-form');
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapBox = L.map('map-canvas');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const card = document.querySelector('#card').content.querySelector('.popup');

adForm.classList.add('ad-form--disabled');
for (let i = 0; i < fieldsetAdForm.length; i++) {
  fieldsetAdForm[i].disabled = true;
}

const elementsMapFilters = mapFilters.children;
mapFilters.classList.add('map__filters--disabled');
for (let i = 0; i < elementsMapFilters.length; i++) {
  elementsMapFilters[i].disabled = true;
}


const getMap = () => {
  mapBox.on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    for (let i = 0; i < fieldsetAdForm.length; i++) {
      fieldsetAdForm[i].disabled = false;
    }
    mapFilters.classList.remove('map__filters--disabled');
    for (let i = 0; i < elementsMapFilters.length; i++) {
      elementsMapFilters[i].disabled = false;
    }
  });

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
  return mapBox;
}
getMap();


const openstreetMap = getMap;

const resetMapView = () => {
  openstreetMap().setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);
};


const mainMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
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

address.setAttribute('readonly', 'readonly');
address.value = '35.68950, 139.6920';


const updateMainMarker = () => {
  marker.setLatLng(['35.6895', '139.692']).update();
  address.value = '35.6895' + ', ' + '139.692';
};


marker.on('moveend', (evt) => {
  let getLatLng = evt.target.getLatLng();
  address.value = getLatLng.lat.toFixed(5) + ', ' + getLatLng.lng.toFixed(5);
});


const similarOffer = (element) => {
  const newCard = card.cloneNode(true);

  const popupTitle = newCard.querySelector('.popup__title');
  if (element.offer.title === '') {
    popupTitle.classList.add('visually-hidden');
  } else {
    popupTitle.textContent = element.offer.title;
  }

  const popupTextAddress = newCard.querySelector('.popup__text--address');
  if (element.offer.address === '') {
    popupTextAddress.classList.add('visually-hidden');
  } else {
    popupTextAddress.textContent = element.offer.address;
  }

  const popupTextPrice = newCard.querySelector('.popup__text--price');
  if (element.offer.price === '') {
    popupTextPrice.classList.add('visually-hidden');
  } else {
    popupTextPrice.textContent = element.offer.price + ' Р/ночь';
  }

  const popupType = newCard.querySelector('.popup__type');
  if (element.offer.type === '') {
    popupType.classList.add('visually-hidden');
  } else {
    popupType.textContent = element.offer.type;
  }

  const popupTextCapacity = newCard.querySelector('.popup__text--capacity');
  if (element.offer.rooms === '' || element.offer.guests === ''
    || element.offer.rooms === undefined || element.offer.guests === undefined) {
    popupTextCapacity.classList.add('visually-hidden');
  } else {
    popupTextCapacity.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей.';
  }

  const popupTextTime = newCard.querySelector('.popup__text--time');
  if (element.offer.checkin === undefined || element.offer.checkout === undefined
    || element.offer.checkin === '' || element.offer.checkout === '') {
    popupTextTime.classList.add('visually-hidden');
  } else {
    popupTextTime.textContent =
    'Заезд после ' +
    element.offer.checkin +
    ' выезд до ' +
    element.offer.checkout;
  }

  const popupFeatures = newCard.querySelector('.popup__features');
  if (element.offer.features === '') {
    popupFeatures.classList.add('visually-hidden');
  } else {
    popupFeatures.textContent = element.offer.features;
  }

  const popupDescription = newCard.querySelector('.popup__description');
  if (element.offer.description === '') {
    popupDescription.classList.add('visually-hidden');
  } else {
    popupDescription.textContent = element.offer.description;
  }

  const popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  if (element.offer.photos === '' || element.offer.photos.length === 0) {
    popupPhotos.classList.add('visually-hidden');
  } else {
    element.offer.photos.forEach((photo) => {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      newCard.querySelector('.popup__photos').appendChild(img);
      img.src = photo;
      img.alt = 'Фотография жилья';
      img.width = '45';
      img.height = '40';
    });
  }

  const popupAvatar = newCard.querySelector('.popup__avatar');
  if (element.author.avatar === '') {
    popupAvatar.classList.add('visually-hidden');
  } else {
    popupAvatar.src = element.author.avatar;
  }


  const changeTypeName = () => {
    Object.keys(TypeName).forEach((value) => {
      if (element.offer.type === value) {
        newCard.querySelector('.popup__type').textContent = TypeName[`${value}`];
      }
    });
  }
  changeTypeName();
  return newCard;
};

let regularMarkers = [];
const getOffer = (data) => {
  filterOffer(data)
    .forEach((element) => {
      const pinMarker = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });
      const pin = L.marker(element.location, {
        icon: pinMarker,
      });
      pin.addTo(mapBox).bindPopup(similarOffer(element), {
        keepInView: true,
      });
      regularMarkers.push(pin);
    });
};

let data = [];
getData(
  (offers) => {
    data = offers;
    getOffer(offers);
    mapFilters.addEventListener('change', _.debounce(() => {
      for (let i = 0; i < regularMarkers.length; i++) {
        mapBox.removeLayer(regularMarkers[i]);
      }
      getOffer(offers);
    }, RERENDER_DELAY));
  },
  (err) => {
    () => err;
  },
);

const resetMarkers = () => getOffer(data);

export {similarOffer, adForm, updateMainMarker, mapFilters, resetMapView, resetMarkers};
