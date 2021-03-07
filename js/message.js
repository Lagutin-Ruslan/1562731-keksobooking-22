import {adForm, mapFilters, updateMarker} from './map.js';

//Сообщение об успешном создании объявления
let main = document.querySelector('main');
let setMessage = document.querySelector('#success').content.querySelector('.success');

let successMessage = () => {
  let newSetMessage = setMessage.cloneNode(true);
  newSetMessage.style.zIndex = 1000;
  main.appendChild(newSetMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      newSetMessage.classList.add('hidden');
    }
  });
  newSetMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    newSetMessage.classList.add('hidden');
  });
  adForm.reset();
  mapFilters.reset();
  updateMarker();
};

//Сообщение об ошибке создания объявления
let errMessage = document.querySelector('#error').content.querySelector('.error');
let buttonErrMessage = errMessage.querySelector('.error__button');

let errorMessage = () => {
  let newErrMessage = errMessage.cloneNode(true);
  newErrMessage.style.zIndex = 1000;
  main.appendChild(newErrMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      newErrMessage.classList.add('hidden');
    }
  });
  newErrMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    newErrMessage.classList.add('hidden');
  });
  buttonErrMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    newErrMessage.classList.add('hidden');
  });
};

//Сообщение об ошибке при загрузке инфы с сайта
const ALERT_SHOW_TIME = 5000;
let showAlert = (message) => {
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
