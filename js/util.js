//первая функция
const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return ('Введённое число должно быть больше либо равно 0!');
  } else if (max < min) {
    return ('max должно быть больше или равно min.');
  } else if (max === min) {
    return (min);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandom();

//вторая функция
const getRandomDecimal = (min, max, comma) => {
  if (min < 0 || max < 0) {
    return ('Введённое число должно быть больше либо равно 0!');
  } else if (max < min) {
    return ('max должен быть больше или равен min.');
  } else if (max === min) {
    return (min);
  }
  return (min + Math.random() * (max + 1 - min)).toFixed(comma);
};
getRandomDecimal();

export {getRandom, getRandomDecimal};
