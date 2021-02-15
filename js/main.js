//первая функция
let getRandomIntInclusive = function (min, max) { //источник https://developer.mozilla.org
  min = 0;
  max = Math.floor(max);

  if (max < min) {
    return ('Введённое число должно быть больше либо равно 0!');
  } else if (max === min) {
    return (0);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive();


//вторая функция
let getRandomInt = function (maxi, comma) {
  let random = Math.random();
  let maximum = maxi ++; //что бы сделать maxi включительно при расчете.
  if (maxi < 0) {
    return ('Введённое число должно быть больше либо равно 0!');
  }
  let sum = (random * maximum).toFixed(comma);
  return sum;
}
alert (getRandomInt());
