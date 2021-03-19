import {showAlert} from './message.js';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  let {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}
//GET
const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then (checkStatus)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch((error) => showAlert(error));
};
//POST

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
    })
    .catch (() => {
      onFail();
    });
}

export {getData, sendData};
