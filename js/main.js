//==============
// Responsive menu
//==============

(function (window, document) {
var menu = document.getElementById('menu'),
    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

function toggleHorizontal() {
    [].forEach.call(
        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
        function(el){
            el.classList.toggle('pure-menu-horizontal');
        }
    );
}

function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains('open')) {
        toggleHorizontal();
        enableDropdowns();
    }
    else {
        toggleHorizontal();
        disableDropdowns();
    }
    menu.classList.toggle('open');
    // document.getElementById('menuIcon').classList.toggle('x');
}

function closeMenu() {
    if (menu.classList.contains('open')) {
        toggleMenu();
    }
}

var dropdownListener = function(el) {
  el.addEventListener('click', function (e) {
    el.classList.toggle('isOpen');
    el.querySelector('.pure-menu-children').classList.toggle('show-children');
  });
};

function enableDropdowns() {
  [].forEach.call(
      document.getElementById('menu').querySelectorAll('.pure-menu-has-children'),
      function(el){
          dropdownListener(el);
          el.classList.toggle('pure-menu-allow-hover');
      }
  );
}

function disableDropdowns() {
  [].forEach.call(
      document.getElementById('menu').querySelectorAll('.pure-menu-has-children'),
      function(el){
          el.removeEventListener('click', dropdownListener(el));
          el.classList.toggle('pure-menu-allow-hover');
      }
  );
}

document.getElementById('menuIcon').addEventListener('click', function (e) {
    toggleMenu();
});

window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);
