const MAX_PRICE = 1000000;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

const inputTitle = document.querySelector('#title');
const inputType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const optionCapacity = capacity.querySelectorAll('option');



inputTitle.addEventListener('input', () => {
  inputTitle.reportValidity();
});


inputPrice.setAttribute('placeholder', '1 000');
inputType.addEventListener('change', (evt) => {
  const newType = evt.target.value;
  if (newType === 'bungalow') {
    inputPrice.setAttribute('placeholder', '0');
  } else if (newType === 'flat') {
    inputPrice.setAttribute('placeholder', '1 000');
  } else if (newType === 'house') {
    inputPrice.setAttribute('placeholder', '5 000');
  } else if (newType === 'palace') {
    inputPrice.setAttribute('placeholder', '10 000');
  }
});

inputPrice.addEventListener('input', () => {
  if (inputPrice.value > MAX_PRICE) {
    inputPrice.setCustomValidity('Максимальное значение — 1 000 000.');
  } else if (inputType.value === 'flat' && inputPrice.value < MIN_PRICE_FLAT) {
    inputPrice.setCustomValidity('Минимальная цена за ночь 1 000');
  } else if (inputType.value === 'house' && inputPrice.value < MIN_PRICE_HOUSE) {
    inputPrice.setCustomValidity('Минимальная цена за ночь 5 000');
  } else if (inputType.value === 'palace' && inputPrice.value < MIN_PRICE_PALACE) {
    inputPrice.setCustomValidity('Минимальная цена за ночь 10 000');
  } else {
    inputPrice.setCustomValidity('');
  }
  inputPrice.reportValidity();
});


timeIn.onchange = (evt) => {
  timeIn.value = evt.target.value
  timeOut.value = evt.target.value
}
timeOut.onchange = (evt) => {
  timeIn.value = evt.target.value
  timeOut.value = evt.target.value
}


const validationForm = () => {
  roomNumber.addEventListener('change', (evt) => {
    if (evt.target.value === '1') {
      optionCapacity.forEach((element) => {
        element.disabled = false;
        element.setAttribute('selected', 'selected')
        if (element.value !== '1') {
          element.disabled = true;
          element.removeAttribute('selected');
        } else {
          element.disabled = false;
          element.removeAttribute('selected');
        }
      });
    } else if (evt.target.value === '2') {
      optionCapacity.forEach((element) => {
        element.disabled = false;
        element.setAttribute('selected', 'selected');
        if (element.value !== '2' && element.value !== '1') {
          element.disabled = true;
          element.removeAttribute('selected');
        } else {
          element.disabled = false;
          element.removeAttribute('selected');
        }
      });
    } else if (evt.target.value === '3') {
      optionCapacity.forEach((element) => {
        element.disabled = false;
        element.setAttribute('selected', 'selected');
        if (element.value !== '3' && element.value !== '2' && element.value !== '1') {
          element.disabled = true;
          element.removeAttribute('selected');
        } else {
          element.disabled = false;
          element.removeAttribute('selected');
        }
      });
    } else if (evt.target.value === '100') {
      optionCapacity.forEach((element) => {
        element.disabled = false;
        element.setAttribute('selected', 'selected');
        if (element.value !== '0') {
          element.disabled = true;
          element.removeAttribute('selected');
        } else {
          element.disabled = false;
          element.removeAttribute('selected');
        }
      });
    }
    capacity.reportValidity();
  });
};
validationForm();

export {capacity, validationForm, inputPrice};
