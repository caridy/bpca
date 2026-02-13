(function () {
  'use strict';

  var details = document.querySelectorAll('.faq-item');
  details.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      details.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
