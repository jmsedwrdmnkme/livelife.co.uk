//
// Bootstrap offcanvas navbar slide in for mobile
//

(function () {
  'use strict';

  document.querySelector('[data-bs-toggle="offcanvas"]').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open');
    document.querySelector('.navbar-toggler-icon').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
  });
})();
