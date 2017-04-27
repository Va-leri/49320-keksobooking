// form.js
'use-strict';
(function () {
  // Поиск элементов формы:
  var timeField = document.getElementById('time');
  var timeoutField = document.getElementById('timeout');
  var typeField = document.getElementById('type');
  var priceField = document.getElementById('price');
  var formSubmitButton = document.querySelector('.form__submit');

  // Функция соответствия времени выезда времени заезда
  var setTime = function (referenceTime, variableTime) {
    variableTime.value = referenceTime.value;
  };
  // Обработка клика на time
  timeField.addEventListener('click', function () {
    setTime (timeField, timeoutField);
  });
  // Обработка клика на timeout
  timeoutField.addEventListener('click', function () {
    setTime (timeoutField, timeField);
  });

  // Установка минимальной цены в зависимости от выбранного типа жилья
  var setMinPrice = function (type) {
    var minPrice;
    switch (type) {
      case 'hut' :
        minPrice = '0';
        break;
      case 'flat' :
        minPrice = '1000';
        break;
      case 'palace' :
        minPrice = '10000';
        break;
    }
    priceField.min = minPrice;
    priceField.value = minPrice;
  };

  typeField.addEventListener('click', function () {
    setMinPrice(typeField.value);
  });

  var roomNumberField = document.getElementById('room_number');
  var guestsNumberField = document.getElementById('capacity');
  var roomNumber;
  var guestsNumber;

  var setGuestsNumber = function () {
    roomNumber = roomNumberField.value;
    guestsNumber = guestsNumberField.value;
    if (roomNumber === '2' || roomNumber === '100') {
      guestsNumberField.value = '3';
    } else {
      guestsNumberField.value = '0';
    }
  };
  setGuestsNumber();
  roomNumberField.addEventListener('click', function () {
    setGuestsNumber();
  });

  var setRoomsNumber = function () {
    roomNumber = roomNumberField.value;
    guestsNumber = guestsNumberField.value;
    if (guestsNumber === '3' && roomNumber !== '2' &&  roomNumber !== '100') {
      roomNumberField.value = '2';
    } else if (guestsNumber === '0' && roomNumber!== '1') {
      roomNumberField.value = '1';
    }
  };

  guestsNumberField.addEventListener('click', function () {
    setRoomsNumber();
  });

  var noticeForm = document.querySelector('.notice__form');

  var submitHandler = function (evt) {
    noticeForm.reset();
  };

  noticeForm.addEventListener('submit', submitHandler);

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.classList.add('invalid');
  }, true);
})();