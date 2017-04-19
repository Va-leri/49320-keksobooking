// js/map.js
'use strict';
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

// Отрисовка меток на карте
var pinsList = [];
var setPins = function () {
  var i;
  var fragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('.pin');
  for (i = 0; i < offerTitles.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    pin.setAttribute('style', 'left: ' + (appartments[i].location.x - 75 / 2) + 'px; top: ' + (appartments[i].location.y - 94) + 'px');
    pin.setAttribute('id', i);
    pinsList[i] = pin;
    var avatar = pin.querySelector('img');
    avatar.setAttribute('src', appartments[i].author.avatar);
    fragment.appendChild(pin);
  }
  pinTemplate.setAttribute('style', 'display: none;');
  document.querySelector('.tokyo__pin-map').appendChild(fragment);
};
setPins();

//Создание диалоговой панели по шаблону
var dialogTemplate = document.querySelector('#lodge-template').content;
var dialogPanel = dialogTemplate.querySelector('.dialog__panel').cloneNode(true);

//Установка выбранного объявления
var selectedAppartments;

//Функия подстановки типа жилья
var getOfferType = function (type) {
  var typeRus;
  switch (type) {
    case 'flat':
      typeRus = 'квартира';
      break;
    case 'bungalo':
      typeRus = 'бунгало';
      break;
    case 'house':
      typeRus = 'дом';
      break;
  }
  return typeRus;
};
//Функция вставки иконок удобств жилья
var featuresFragment = document.createDocumentFragment();
var feature;
var getOfferFeatures = function () {
  var i;
  for (i = 0; i < selectedAppartments.offer.features.length; i++) {
    feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + selectedAppartments.offer.features[i]);
    featuresFragment.appendChild(feature);
  }
  return featuresFragment;
};

//Заполнение диалоговой панели подробностей выбранных аппартаментов
var renderOfferDetails = function () {
  dialogPanel.querySelector('.lodge__title').textContent = selectedAppartments.offer.title;
  dialogPanel.querySelector('.lodge__address').textContent = selectedAppartments.offer.address;
  dialogPanel.querySelector('.lodge__price').innerHTML = selectedAppartments.offer.price + ' &#x20bd;/ночь';
  dialogPanel.querySelector('.lodge__type').textContent = getOfferType(selectedAppartments.offer.type);
  dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedAppartments.offer.guests + ' гостей в ' + selectedAppartments.offer.rooms + ' комнатах';
  dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedAppartments.offer.checkin + ', выезд до ' + selectedAppartments.offer.checkout;
  dialogPanel.querySelector('.lodge__features').innerHTML = '';
  dialogPanel.querySelector('.lodge__features').appendChild(getOfferFeatures());
  dialogPanel.querySelector('.lodge__description').textContent = selectedAppartments.offer.description;
  //Вставка аватара автора объявления
  var dialogTitle = document.querySelector('.dialog__title');
  var dialogAvatar = dialogTitle.children[0];
  dialogAvatar.setAttribute('src', selectedAppartments.author.avatar);
  //Замена диалоговой панели на актуальную
  var offerDialog = document.getElementById('offer-dialog');
  offerDialog.replaceChild(dialogPanel, offerDialog.querySelector('.dialog__panel'));
};


//по нажатию на любой из элементов .pin ему добавляется класс .pin--active
// открывается диалоговое окно
//var pinsList = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var activePin;
var id;
//Обработчик клика на .pin
var pinClickHandler = function (pin) {
  activePin = document.querySelector('.pin--active');
  if (activePin !== null) {
    activePin.classList.remove('pin--active');
  }
  activePin = pin.classList.add('pin--active');
  id = pin.getAttribute('id');
  selectedAppartments = appartments[id];
  dialog.classList.remove('hidden');
  renderOfferDetails();
};
//Добавляем обработчик открытия окна диалога
for (var i = 0; i < pinsList.length; i++) {
  pinsList[i].addEventListener('click', function () {
    pinClickHandler(this);
    });
  pinsList[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      pinClickHandler(this);
    }
  })
};


/*for (var i = 0; i < pinsList.length; i++) {
  pinsList[i].addEventListener('click', function () {
    activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
    }
    activePin = this.classList.add('pin--active');
    dialog.classList.remove('hidden');
  });
  pinsList[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activePin = document.querySelector('.pin--active');
      if (activePin !== null) {
        activePin.classList.remove('pin--active');
      }
      activePin = this.classList.add('pin--active');
      dialog.classList.remove('hidden');
    }
  });
};*/

// по нажатию на элемент .dialog__close диалоговое окно закрывается, у метки убирается класс pin--active
dialog.querySelector('.dialog__close').addEventListener('click', function () {
  closeDialog();
})

// функция закрытия диалога
var closeDialog = function() {
    dialog.classList.add('hidden');
    activePin = document.querySelector('.pin--active');
    activePin.classList.remove('pin--active');
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (dialog.classList.contains('hidden') === false) {
      closeDialog();
    } 
  }
});

