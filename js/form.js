import {successMessage, errorMessage} from './message.js';
import {adForm, mapFilters, updateMarker} from './map.js';
import {sendData} from './api.js';

//работа с формой
let setUserFormSubmit = (onSuccess, onFail) => {
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
let adFormReset = adForm.querySelector('.ad-form__reset');

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  updateMarker();
});
