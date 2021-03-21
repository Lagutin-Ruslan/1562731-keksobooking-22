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


const replacingAttribute = () => {
  optionCapacity.forEach((element) => {
    element.removeAttribute('selected');
    if (element.value === '1') {
      element.setAttribute('selected', 'selected');
    } else {
      element.removeAttribute('selected');
    }
  });
}
replacingAttribute();

const onRoomNumberChange = function(){
  if (capacity.value === '0' && roomNumber.value !== '100') {
    capacity.setCustomValidity('Данное количество гостей может расположиться в 100 комнатах')
  } else if (capacity.value === '1' && roomNumber.value === '100') {
    capacity.setCustomValidity('Данное количество гостей может расположиться в 1, 2 или 3 комнате')
  } else if (capacity.value === '2' && (roomNumber.value === '1' || roomNumber.value === '100')) {
    capacity.setCustomValidity('Данное количество гостей может расположиться в 2 или 3 комнатах')
  } else if (capacity.value === '3' && roomNumber.value !== '3') {
    capacity.setCustomValidity('Данное количество гостей может расположиться в 3 комнатах')
  } else {
    capacity.setCustomValidity('')
  }
  capacity.reportValidity();
};
capacity.addEventListener('change', onRoomNumberChange);
roomNumber.addEventListener('change', onRoomNumberChange);

export {inputPrice, replacingAttribute};
