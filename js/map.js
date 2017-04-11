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

var offerFeatures = [
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
      'avatar' : 'img/avatars/user{{0' + (i+1) + '}}.png'
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
      'features' : '',
      'description' : '',
      'photos' : []
    },
    'location' : {
      'x' : 5,
      'y' : 5
    }
  }
}