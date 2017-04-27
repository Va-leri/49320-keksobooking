// pin.js
'use strict';

// Отрисовка меток на карте
window.pin = (function () {
  var setPins = function () {
    var i;
    var fragment = document.createDocumentFragment();
    var pinTemplate = document.querySelector('.pin');
    for (i = 0; i < window.data.offerTitles.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      pin.setAttribute('style', 'left: ' + (window.data.appartments[i].location.x - 75 / 2) + 'px; top: ' + (window.data.appartments[i].location.y - 94) + 'px');
      pin.setAttribute('id', i);
      var avatar = pin.querySelector('img');
      avatar.setAttribute('src', window.data.appartments[i].author.avatar);
      fragment.appendChild(pin);
      pin.addEventListener('click', function (evt) {
        pinClickHandler(evt.currentTarget);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          pinClickHandler(evt.currentTarget);
        }
      });
    }
    pinTemplate.setAttribute('style', 'display: none;');
    document.querySelector('.tokyo__pin-map').appendChild(fragment);
  }();
  var activePin;
  var pinId;
  var selectedAppartments;
  // Функция деактивации активного .pin
  var deactivatePin = function () {
    activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
    }
  };
  var activatePin = function (pin) {
    pin.classList.add('pin--active');
  };
  // Обработчик клика на .pin
  var pinClickHandler = function (pin) {
    deactivatePin();
    activatePin(pin);
    //activePin = pin.classList.add('pin--active');
    pinId = pin.getAttribute('id');
    selectedAppartments = window.data.appartments[pinId];
    window.card.dialog.classList.remove('hidden');
    window.card.renderOfferDetails(selectedAppartments);
  };
  return {
    deactivatePin: deactivatePin,
    activatePin: activatePin,
    selectedApparments: selectedAppartments
  }
})();
