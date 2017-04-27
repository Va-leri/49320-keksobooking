// data.js
'use strict';
window.data = (function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  var offerCheckouts = offerCheckins.slice();

  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var appartments = [];
  var createAppartmentsList = function () {
    var i;
    var j;
    var k;
    for (i = 0; i < offerTitles.length; i++) {
      appartments[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': offerTitles[i],
          'address': '',
          'price': getRandomInteger(10, 10000) * 100,
          'type': offerTypes[getRandomInteger(0, 2)],
          'rooms': getRandomInteger(1, 5),
          'guests': Math.floor((1 - Math.random()) * 100),
          'checkin': offerCheckins[Math.floor(Math.random() * 3)],
          'checkout': offerCheckouts[Math.floor(Math.random() * 3)],
          'features': [],
          'description': '',
          'photos': []
        },
        'location': {
          'x': getRandomInteger(300, 900),
          'y': getRandomInteger(100, 500)
        }
      };
      appartments[i].offer.address = appartments[i].location.x + ', ' + appartments[i].location.y;
      for (k = getRandomInteger(0, 5), j = 0; k < featuresList.length; k = k + getRandomInteger(1, featuresList.length - k), j++) {
        appartments[i].offer.features[j] = featuresList[k];
      }
    }
  };
  createAppartmentsList();
  return {
    appartments: appartments,
    offerTitles: offerTitles
  };
})();
