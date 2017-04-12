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
      'address' : '{{location.x}}, {{location.y}}',
      'price' : getRandomInteger(1000, 1000000),
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
  
  for (var k = getRandomInteger(0, 5), j = 0; k < featuresList.length; k = k + getRandomInteger(1, featuresList.length - k), j++ ) {
    appartments[i].offer.features[j] = featuresList[k];
  };
}

/*var pin = document.createElement('div');
var avatar = document.createElement('img');
pin.className = 'pin';
pin.setAttribute('style', 'left: {{location.x}}px; top: {{location.y}}px');
pin.appendChild(avatar);
avatar.className = 'rounded';
avatar.setAttribute('')*/
var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('.pin');
for (var i = 0; i < offerTitles.length; i++) {
  var pin = pinTemplate.cloneNode(true);
  pin.setAttribute('style', 'left: ' + appartments[i].location.x +'px; top: ' + appartments[i].location.y +'px');
  var avatar = pin.querySelector('img');
  avatar.setAttribute('src', appartments[i].author.avatar);
  fragment.appendChild(pin);
}

document.querySelector('.tokyo__pin-map').appendChild(fragment);

var dialogTemplate = document.querySelector('#lodge-template').content;
var dialogPanel = dialogTemplate.querySelector('.dialog__panel').cloneNode(true);
var firstElement = appartments[0];
dialogPanel.querySelector('.lodge__title').textContent = firstElement.offer.title;
dialogPanel.querySelector('.lodge__address').textContent = firstElement.offer.address;  

document.replaceChild(dialogPanel, querySelector('.dialog__panel'));




