import {successMessage, errorMessage} from './message.js';
import {adForm, updateMainMarker, mapFilters, resetMapView, resetMarkers} from './map.js';
import {sendData} from './api.js';
import {previewAvatar, previewPhotos} from './images-preview.js';
import {capacity, validationForm, inputPrice} from './validator.js';

const adFormReset = adForm.querySelector('.ad-form__reset');

//работа с формой
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

//работа кнопки reset
adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  //очистка фильтра
  mapFilters.reset();
  resetMapView();
  resetMarkers();
  //очистка формы
  adForm.reset();
  updateMainMarker();
  previewAvatar.src = 'img/muffin-grey.svg';
  capacity.value = '3';
  inputPrice.setAttribute('placeholder', '1 000');
  validationForm();
  let deleteImg = previewPhotos.querySelectorAll('img');
  for (let i = 0; i < deleteImg.length; i++) {
    deleteImg[i].remove();
  }
});
