// js/map.js
'use strict';
var offerTitles = [
  "Большая уютная квартира", 
  "Маленькая неуютная квартира", 
  "Огромный прекрасный дворец", 
  "Маленький ужасный дворец", 
  "Красивый гостевой домик", 
  "Некрасивый негостеприимный домик", 
  "Уютное бунгало далеко от моря", 
  "Неуютное бунгало по колено в воде"
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

var appartments = [];

for (var i = 0, i <= offerTitles.length, i++) {
  appartments[i] = {
    'author' : {
      'avatar' : 'img/avatars/user{{0' + (i+1) + '}}.png'
    },
    'offer' : {
      'title' : offerTitles[i],
      'address' : '{{location.x}}, {{location.y}}',
      'price' : Math.floor((1 - Math.random()) * 1000000),
      'type' : 5,
      'rooms' : Math.floor((1 - Math.random()) * 5),
      'guests' : Math.floor((1 - Math.random()) * 100),
      'checkin' : offerCheckins[Math.floor((1 - Math.random()) * 3)],
      'checkout' : offerCheckouts[Math.floor((1 - Math.random()) * 3)],
      'features' : '',
      'description' : '',
      'photos' : []
    },
    'location' : {
      'x' :
    }
  }
}