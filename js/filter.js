const DRAW_LIMITER = 10;
const MAX_PRICE_FILTER = 50000;
const MIN_PRICE_FILTER = 10000;

const typeField = document.querySelector('[name="housing-type"]');
const priceField = document.querySelector('[name="housing-price"]');
const roomsField = document.querySelector('[name="housing-rooms"]');
const guestsField = document.querySelector('[name="housing-guests"]');
const houseFeatures = document.querySelector('#housing-features');


const filterOffer = (offers) => {
  const filterOfferArray = []
  offers.some((element) => {
    if (filterOfferArray.length === DRAW_LIMITER) {
      return true;
    }
    if (typeFilter(element, typeField.value)
    && priceFilter(element, priceField.value)
    && roomsFilter(element, roomsField.value)
    && guestsFilter(element, guestsField.value)
    && featuresFilter(element)) {
      filterOfferArray.push(element);
      return false
    }
  });
  return filterOfferArray;
}

const typeFilter = (checkOffer, currentType) => {
  if (currentType === 'any' || currentType === checkOffer.offer.type) {
    return true;
  }
  return false;
};

const priceFilter = (checkOffer, currentPrice) => {
  switch (currentPrice) {
    case 'any':
      return true;
    case 'middle':
      return checkOffer.offer.price >= MIN_PRICE_FILTER && checkOffer.offer.price < MAX_PRICE_FILTER;
    case 'low':
      return checkOffer.offer.price <= MIN_PRICE_FILTER;
    case 'high':
      return checkOffer.offer.price >= MAX_PRICE_FILTER;
    default:
      return false;
  }
};

const roomsFilter = (checkOffer, currentRooms) => {
  switch (currentRooms) {
    case 'any':
      return true;
    case '1':
      return checkOffer.offer.rooms === 1;
    case '2':
      return checkOffer.offer.rooms === 2;
    case '3':
      return checkOffer.offer.rooms === 3;
    default:
      return false;
  }
};

const guestsFilter = (checkOffer, currentGuests) => {
  switch (currentGuests) {
    case 'any':
      return true;
    case '1':
      return checkOffer.offer.guests === 1;
    case '2':
      return checkOffer.offer.guests === 2;
    case '0':
      return checkOffer.offer.guests === 0;
    default:
      return false;
  }
};
const featuresFilter = (element) => {
  const checkedFeatures = houseFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((item) => {
    return element.offer.features.includes(item.value);
  });
};

export {filterOffer};
