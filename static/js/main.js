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

[].forEach.call(
  document.getElementById('menu').querySelectorAll('.pure-menu-has-children'), function(el) {
    el.firstElementChild.addEventListener('click', function (e) {e.preventDefault();});
  }
);

window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);


function closeNavMenus(exclude) {
  [].forEach.call(
    menu.querySelectorAll('.pure-menu-active'), function(el) {
      if (el !== exclude) {
        el.classList.remove('pure-menu-active');
        el.querySelector('.pure-menu-has-children > .pure-menu-link').setAttribute('aria-expanded', false);
      }
    }
  );
}

// Initialize nav menu aria roles/state
menu.querySelector('.pure-menu-list').setAttribute('role', 'menubar');

[].forEach.call(
  menu.querySelectorAll('.pure-menu-link'), function(el) {
    el.setAttribute('role', 'menuitem');
    el.parentNode.setAttribute('role', 'none');

    if (el.parentNode.classList.contains('pure-menu-has-children')) {
      el.setAttribute('aria-haspopup', true);
      el.setAttribute('aria-expanded', false);

      var childMenu = el.parentNode.querySelector('.pure-menu-children');
      childMenu.setAttribute('role', 'menu');
      childMenu.setAttribute('aria-label', el.text);
    }
  }
);

menu.addEventListener('focusin', function(e) {
  if (e.target.classList.contains('pure-menu-link')) {
    var anchor = e.target;

    var listItem = anchor.parentNode;
    if (listItem.parentNode.classList.contains('pure-menu-children'))
      listItem = listItem.parentNode.parentNode;

    var listItemAnchor = listItem.querySelector('.pure-menu-link');

    closeNavMenus(listItem);

    if (listItem.classList.contains('pure-menu-has-children')) {
      listItem.classList.add('pure-menu-active');
      listItemAnchor.setAttribute('aria-expanded', true);
    }
  }
});


document.addEventListener('click', closeNavMenus);

document.addEventListener('focusin', function(e) {
  if (!e.target.classList.contains('pure-menu-link'))
    closeNavMenus();
});

document.addEventListener('keyup', function(e) {
  if (e.keyCode == 27 && e.target.classList.contains('pure-menu-link'))
    closeNavMenus();
});

})(this, this.document);
