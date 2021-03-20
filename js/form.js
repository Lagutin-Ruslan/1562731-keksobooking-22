import {successMessage, errorMessage} from './message.js';
import {adForm, updateMainMarker, mapFilters, resetMapView, resetMarkers} from './map.js';
import {sendData} from './api.js';
import {previewAvatar, previewPhotos} from './images-preview.js';
import {inputPrice, replacingAttribute} from './validator.js';

const adFormReset = adForm.querySelector('.ad-form__reset');


const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};
setUserFormSubmit(successMessage, errorMessage);


adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();

  mapFilters.reset();
  resetMapView();
  resetMarkers();

  adForm.reset();
  updateMainMarker();
  previewAvatar.src = 'img/muffin-grey.svg';
  inputPrice.setAttribute('placeholder', '1 000');
  previewPhotos.style.backgroundImage = '';
  replacingAttribute();
});
