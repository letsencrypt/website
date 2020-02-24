(function (window, document) {

const ESCAPE_KEY_CODE = 27;
const MENU_OPEN_CLASS = "open";

const MENU_ID = "menu";
const MENU_SELECTOR = `#${MENU_ID}`;

// Applied to NAV_MENU_PARENTs when they're active/open.
const NAV_MENU_ACTIVE_CLASS = "pure-menu-active";
const NAV_MENU_ACTIVE_SELECTOR = `.${NAV_MENU_ACTIVE_CLASS}`;

// Applied to nav menu items that are parents of a sub-menu
const NAV_MENU_PARENT_CLASS = "pure-menu-has-children";
const NAV_MENU_PARENT_SELECTOR = `.${NAV_MENU_PARENT_CLASS}`;

// The containing <ul> of a sub-menu's items
const NAV_MENU_CHILD_CLASS = "pure-menu-children";
const NAV_MENU_CHILD_SELECTOR = `.${NAV_MENU_CHILD_CLASS}`;

const NAV_LINK_CLASS = "pure-menu-link";
const NAV_LINK_SELECTOR = `.${NAV_LINK_CLASS}`;

const menu = document.getElementById(MENU_ID);
const WINDOW_CHANGE_EVENT = ("onorientationchange" in window) ? "orientationchange" : "resize";

function toggleMenu() {
  [].forEach.call(
    document.getElementById(MENU_ID).querySelectorAll(".custom-can-transform"),
      function(el) {
        el.classList.toggle("pure-menu-horizontal");
      }
  );
  menu.classList.toggle(MENU_OPEN_CLASS);
}

function openNavMenu(el) {
  el.classList.add(NAV_MENU_ACTIVE_CLASS);
  el.querySelector(`${NAV_MENU_PARENT_SELECTOR} > ${NAV_LINK_SELECTOR}`)
    .setAttribute("aria-expanded", true);
}

function closeNavMenu(el) {
  el.classList.remove(NAV_MENU_ACTIVE_CLASS);
  el.querySelector(`${NAV_MENU_PARENT_SELECTOR} > ${NAV_LINK_SELECTOR}`)
    .setAttribute("aria-expanded", false);
}

function closeAllNavMenus() {
  [].forEach.call(
    menu.querySelectorAll(NAV_MENU_ACTIVE_SELECTOR), function(el) {
      closeNavMenu(el);
    }
  );
}

function closeHamburgerMenu() {
  if (menu.classList.contains(MENU_OPEN_CLASS)) {
    toggleMenu();
  }
}

function onMenuItemClick(e) {
  let shouldOpen = !this.classList.contains(NAV_MENU_ACTIVE_CLASS);
  closeAllNavMenus();
  if (shouldOpen) {
    openNavMenu(this);
  }
}

document.getElementById("menuIcon").addEventListener("click", function (e) {
  // Don't propagate to the document-level click listener, since that closes the menu
  e.stopPropagation();
  toggleMenu();
});

[].forEach.call(
  document.getElementById(MENU_ID).querySelectorAll(NAV_MENU_PARENT_SELECTOR), function(el) {
    el.addEventListener("click", onMenuItemClick);
  }
);

window.addEventListener(WINDOW_CHANGE_EVENT, function() {
	closeAllNavMenus();
	closeHamburgerMenu();
});

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

document.addEventListener("click", function(e) {
  if (!e.target.closest(MENU_SELECTOR)) {
    closeAllNavMenus();
    closeHamburgerMenu();
  }
});

document.addEventListener("keyup", function(e) {
  if (e.keyCode === ESCAPE_KEY_CODE) {
    closeAllNavMenus();
    closeHamburgerMenu();
  }
});

})(this, this.document);
