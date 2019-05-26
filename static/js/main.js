//==============
// Responsive menu
//==============

(function (window, document) {

const MENU_ID = "menu";
const MENU_SELECTOR = `#${MENU_ID}`;

const MENU_OPEN_CLASS = "open";

// Applied to NAV_MENU_PARENTs when they're active/open.
// Note that this doesn't not get applied with NAV_MENU_HOVERABLE.
const NAV_MENU_ACTIVE_CLASS = "pure-menu-active";
const NAV_MENU_ACTIVE_SELECTOR = `.${NAV_MENU_ACTIVE_CLASS}`;

// When applied to a NAV_MENU_PARENT_ item, the menu will toggle on hover
// (See https://purecss.io/menus/#dropdowns)
const NAV_MENU_HOVERABLE_CLASS = "pure-menu-allow-hover";

// Applied to nav menu items that are parents of a sub-menu
const NAV_MENU_PARENT_CLASS = "pure-menu-has-children";
const NAV_MENU_PARENT_SELECTOR = `.${NAV_MENU_PARENT_CLASS}`;

// The containing <ul> of a sub-menu's items
const NAV_MENU_CHILD_CLASS = "pure-menu-children";
const NAV_MENU_CHILD_SELECTOR = `.${NAV_MENU_CHILD_CLASS}`;

const NAV_LINK_CLASS = "pure-menu-link";
const NAV_LINK_SELECTOR = `.${NAV_LINK_CLASS}`;

const menu = document.getElementById(MENU_ID);
const WINDOW_CHANGE_EVENT = ("onorientationchange" in window) ? "orientationchange":"resize";

function toggleHorizontal() {
    [].forEach.call(
        document.getElementById(MENU_ID).querySelectorAll(".custom-can-transform"),
        function(el){
            el.classList.toggle("pure-menu-horizontal");
        }
    );
}

function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains("open")) {
        toggleHorizontal();
        enableDropdowns();
    }
    else {
        toggleHorizontal();
        disableDropdowns();
    }
    menu.classList.toggle(MENU_OPEN_CLASS);
    // document.getElementById('menuIcon').classList.toggle('x');
}

function openNavMenu(el) {
  closeAllNavMenus(el);
  el.classList.add(NAV_MENU_ACTIVE_CLASS);
  el.querySelector(`${NAV_MENU_PARENT_SELECTOR} > ${NAV_LINK_SELECTOR}`)
    .setAttribute("aria-expanded", true);
}

function closeNavMenu(el) {
  el.classList.remove(NAV_MENU_ACTIVE_CLASS);
  el.querySelector(`${NAV_MENU_PARENT_SELECTOR} > ${NAV_LINK_SELECTOR}`)
    .setAttribute("aria-expanded", false);
}

function closeAllNavMenus(exclude) {
  [].forEach.call(
    menu.querySelectorAll(NAV_MENU_ACTIVE_SELECTOR), function(el) {
      if (el !== exclude) {
        closeNavMenu(el);
      }
    }
  );
}

function enableDropdowns() {
  [].forEach.call(
      document.getElementById(MENU_ID).querySelectorAll(NAV_MENU_PARENT_SELECTOR),
      function(el){
        el.classList.add(NAV_MENU_HOVERABLE_CLASS);
        el.addEventListener("focusin", function() {
          openNavMenu(el);
        });
      }
  );
}

function disableDropdowns() {
  [].forEach.call(
      document.getElementById(MENU_ID).querySelectorAll(NAV_MENU_PARENT_SELECTOR),
      function(el){
        el.classList.remove(NAV_MENU_HOVERABLE_CLASS);
      }
  );
}

function closeMenu() {
  if (menu.classList.contains(MENU_OPEN_CLASS)) {
    closeAllNavMenus();
    toggleMenu();
  }
}

document.getElementById("menuIcon").addEventListener("click", function (e) {
  // Don't propagate to the document-level click listener, since that closes the menu
  e.stopPropagation();
  toggleMenu();
});

[].forEach.call(
  document.getElementById(MENU_ID).querySelectorAll(NAV_MENU_PARENT_SELECTOR), function(el) {
    el.firstElementChild.addEventListener("click", function (e) {e.preventDefault();});
  }
);

window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

// Initialize nav menu aria roles/state
menu.querySelector(".pure-menu-list").setAttribute("role", "menubar");

[].forEach.call(
  menu.querySelectorAll(NAV_LINK_SELECTOR), function(el) {
    el.setAttribute("role", "menuitem");
    el.parentNode.setAttribute("role", "none");

    if (el.parentNode.classList.contains(NAV_MENU_PARENT_CLASS)) {
      el.setAttribute("aria-haspopup", true);
      el.setAttribute("aria-expanded", false);

      var childMenu = el.parentNode.querySelector(NAV_MENU_CHILD_SELECTOR);
      childMenu.setAttribute("role", "menu");
      childMenu.setAttribute("aria-label", el.text);
    }
  }
);

enableDropdowns();

document.addEventListener("click", function(e) {
  if (!e.target.closest(MENU_SELECTOR)) {
    closeMenu();
  }
});

document.addEventListener("keyup", function(e) {
  if (e.keyCode === 27) {
    closeMenu();
  }
});

})(this, this.document);
