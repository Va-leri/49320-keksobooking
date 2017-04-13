// js/map.js
'use strict';
var getRandomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var offerTitles = [
  'Большая уютная квартира', 
  'Маленькая неуютная квартира', 
  'Огромный прекрасный дворец', 
  'Маленький ужасный дворец', 
  'Красивый гостевой домик', 
  'Некрасивый негостеприимный домик', 
  'Уютное бунгало далеко от моря', 
  'Неуютное бунгало по колено в воде'
];
var offerTypes = [
  'flat',
  'house',
  'bungalo'
];

var offerCheckins = [
  '12:00',
  '13:00',
  '14:00'
];

var offerCheckouts = offerCheckins;

var featuresList = [
  'wifi', 
  'dishwasher', 
  'parking', 
  'washer', 
  'elevator', 
  'conditioner'
]

var appartments = [];

for (var i = 0; i < offerTitles.length; i++) {
  appartments[i] = {
    'author' : {
      'avatar' : 'img/avatars/user0' + (i+1) + '.png'
    },
    'offer' : {
      'title' : offerTitles[i],
      'address' : '',
      'price' : getRandomInteger(10, 10000) * 100,
      'type' : offerTypes[getRandomInteger(0, 2)],
      'rooms' : getRandomInteger(1, 5),
      'guests' : Math.floor((1 - Math.random()) * 100),
      'checkin' : offerCheckins[Math.floor(Math.random() * 3)],
      'checkout' : offerCheckouts[Math.floor(Math.random() * 3)],
      'features' : [],
      'description' : '',
      'photos' : []
    },
    'location' : {
      'x' : getRandomInteger(300, 900),
      'y' : getRandomInteger(100, 500)
    }
  };
  
  appartments[i].offer.address = appartments[i].location.x + ', ' + appartments[i].location.y;
  
  for (var k = getRandomInteger(0, 5), j = 0; k < featuresList.length; k = k + getRandomInteger(1, featuresList.length - k), j++ ) {
    appartments[i].offer.features[j] = featuresList[k];
  };
}

var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('.pin');
for (var i = 0; i < offerTitles.length; i++) {
  var pin = pinTemplate.cloneNode(true);
  pin.setAttribute('style', 'left: ' + appartments[i].location.x +'px; top: ' + appartments[i].location.y +'px');
  var avatar = pin.querySelector('img');
  avatar.setAttribute('src', appartments[i].author.avatar);
  fragment.appendChild(pin);
}
pinTemplate.setAttribute('style', 'display: none;');

document.querySelector('.tokyo__pin-map').appendChild(fragment);

var dialogTemplate = document.querySelector('#lodge-template').content;
var dialogPanel = dialogTemplate.querySelector('.dialog__panel').cloneNode(true);
var selectedAppartments = appartments[0];

var getOfferType = function(type) {
  var type;
  switch (type) {
    case 'flat' : type = 'квартира';
    break;
    case 'bungalo' : type = 'бунгало';
    break;
    case 'house' : type = 'дом'; 
    break;
  };
  return type;
};

var featuresFragment = document.createDocumentFragment();
var feature;
var getOfferFeatures = function() {
  for (var i = 0; i < selectedAppartments.offer.features.length; i++) {
    feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + selectedAppartments.offer.features[i]);
    featuresFragment.appendChild(feature);
  };
  return featuresFragment;
};

dialogPanel.querySelector('.lodge__title').textContent = selectedAppartments.offer.title;
dialogPanel.querySelector('.lodge__address').textContent = selectedAppartments.offer.address;  
//dialogPanel.querySelector('.lodge__price').innerHTML = selectedAppartments.offer.price + ' &#x20bd;/ночь';
dialogPanel.querySelector('.lodge__price').insertAdjacentHTML('afterbegin', selectedAppartments.offer.price + ' &#x20bd;/ночь');
dialogPanel.querySelector('.lodge__type').textContent = getOfferType(selectedAppartments.offer.type);
dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedAppartments.offer.guests + ' гостей в ' + selectedAppartments.offer.rooms + ' комнатах';
dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedAppartments.offer.checkin + ', выезд до ' + selectedAppartments.offer.checkout;
dialogPanel.querySelector('.lodge__features').appendChild(getOfferFeatures());
dialogPanel.querySelector('.lodge__description').textContent = selectedAppartments.offer.description;

var dialogTitle = document.querySelector('.dialog__title');
var dialogAvatar = dialogTitle.children[0];
dialogAvatar.setAttribute('src',selectedAppartments.author.avatar);

var offerDialog = document.getElementById('offer-dialog');
offerDialog.replaceChild(dialogPanel, offerDialog.querySelector('.dialog__panel'));




