import {adForm, mapFilters, updateMainMarker, resetMapView, resetMarkers} from './map.js';
import {previewAvatar, previewPhotos} from './images-preview.js';
import {inputPrice, replacingAttribute} from './validator.js';

const ALERT_SHOW_TIME = 5000;

const main = document.querySelector('main');
const setMessage = document.querySelector('#success').content.querySelector('.success');
const errMessage = document.querySelector('#error').content.querySelector('.error');
const buttonErrMessage = errMessage.querySelector('.error__button');


function onSuccessMessage (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    document.querySelector('.success').remove();
  }
}
const successMessage = () => {
  const newSetMessage = setMessage.cloneNode(true);
  newSetMessage.style.zIndex = 1000;
  main.appendChild(newSetMessage);
  document.addEventListener('keydown', onSuccessMessage);
  newSetMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.success').remove();
  });
  adForm.reset();
  mapFilters.reset();
  updateMainMarker();
  resetMapView();
  resetMarkers();
  previewAvatar.src = 'img/muffin-grey.svg';
  inputPrice.setAttribute('placeholder', '1 000');
  previewPhotos.style.backgroundImage = '';
  replacingAttribute();
};


function onErrorMessage (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    document.querySelector('.error').remove();
  }
}
const errorMessage = () => {
  const newErrMessage = errMessage.cloneNode(true);
  newErrMessage.style.zIndex = 1000;
  main.appendChild(newErrMessage);
  document.addEventListener('keydown', onErrorMessage);
  newErrMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.error').remove();
  });
  buttonErrMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.error').remove();
  });
};


const showAlert = (message) => {
  let alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {showAlert, successMessage, errorMessage};
