// card.js
'use strict';
window.card = (function () {
  // Создание диалоговой панели по шаблону
  var dialogTemplate = document.querySelector('#lodge-template').content;
  var dialogPanel = dialogTemplate.querySelector('.dialog__panel').cloneNode(true);

   // Функия подстановки типа жилья
  var getOfferType = function (type) {
    var typeInRussian;
    switch (type) {
      case 'flat':
        typeInRussian = 'квартира';
        break;
      case 'bungalo':
        typeInRussian = 'бунгало';
        break;
      case 'house':
        typeInRussian = 'дом';
        break;
    }
    return typeInRussian;
  };
  // Функция вставки иконок удобств жилья
  var featuresFragment = document.createDocumentFragment();
  var feature;
  var getOfferFeatures = function (selectedAppartments) {
    var i;
    for (i = 0; i < selectedAppartments.offer.features.length; i++) {
      feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + selectedAppartments.offer.features[i]);
      featuresFragment.appendChild(feature);
    }
    return featuresFragment;
  };

  // Заполнение диалоговой панели подробностей выбранных аппартаментов
  var renderOfferDetails = function (selectedAppartments) {
    dialogPanel.querySelector('.lodge__title').textContent = selectedAppartments.offer.title;
    dialogPanel.querySelector('.lodge__address').textContent = selectedAppartments.offer.address;
    dialogPanel.querySelector('.lodge__price').innerHTML = selectedAppartments.offer.price + ' &#x20bd;/ночь';
    dialogPanel.querySelector('.lodge__type').textContent = getOfferType(selectedAppartments.offer.type);
    dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedAppartments.offer.guests + ' гостей в ' + selectedAppartments.offer.rooms + ' комнатах';
    dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedAppartments.offer.checkin + ', выезд до ' + selectedAppartments.offer.checkout;
    dialogPanel.querySelector('.lodge__features').innerHTML = '';
    dialogPanel.querySelector('.lodge__features').appendChild(getOfferFeatures(selectedAppartments));
    dialogPanel.querySelector('.lodge__description').textContent = selectedAppartments.offer.description;
    // Вставка аватара автора объявления
    var dialogTitle = document.querySelector('.dialog__title');
    var dialogAvatar = dialogTitle.children[0];
    dialogAvatar.setAttribute('src', selectedAppartments.author.avatar);
    // Замена диалоговой панели на актуальную
    var offerDialog = document.getElementById('offer-dialog');
    offerDialog.replaceChild(dialogPanel, offerDialog.querySelector('.dialog__panel'));
  };

  var dialog = document.querySelector('.dialog');

  var dialogCloseButton = dialog.querySelector('.dialog__close');
  dialogCloseButton.addEventListener('click', function () {
    closeDialog();
    window.pin.deactivatePin();
  });

  // функция закрытия диалога
  var closeDialog = function () {
    dialog.classList.add('hidden');
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (dialog.classList.contains('hidden') === false) {
        closeDialog();
        window.pin.deactivatePin();
      }
    }
  })
  return {
    dialog: dialog,
    renderOfferDetails: renderOfferDetails
  }
})();
